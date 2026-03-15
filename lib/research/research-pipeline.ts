import { generateQueryEmbedding, generateImageEmbedding } from "@/lib/embeddings/gemini";
import { rerankDocuments } from "@/lib/rerank/cohere";
import { vectorSearch, hybridSearch, type SearchResult } from "@/lib/search/hybrid-search";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { logger, withTiming } from "@/lib/utils/logger";

// Simple in-memory cache for query embeddings — avoids repeated Gemini API calls
// for the same or very similar queries within a session.
const embeddingCache = new Map<string, { embedding: number[]; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCachedEmbedding(query: string): number[] | null {
  const entry = embeddingCache.get(query);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    embeddingCache.delete(query);
    return null;
  }
  return entry.embedding;
}

function setCachedEmbedding(query: string, embedding: number[]): void {
  // Keep cache small — evict oldest if > 50 entries
  if (embeddingCache.size > 50) {
    const oldest = embeddingCache.keys().next().value;
    if (oldest) embeddingCache.delete(oldest);
  }
  embeddingCache.set(query, { embedding, timestamp: Date.now() });
}

export interface ReferenceImage {
  base64: string;
  mimeType: string;
}

export interface ResearchRequest {
  query: string;
  intent?: string;
  category: "text" | "image" | "video";
  targetModel?: string;
  domain?: string;
  maxResults?: number;
  referenceImages?: ReferenceImage[];
}

export interface AnnotatedExample {
  prompt: string;
  negativePrompt?: string;
  relevanceScore: number;
  annotation: string;
  techniques: string[];
  adaptationHint: string;
  domain: string;
  styleSet?: string;
  targetModel?: string;
  whyItWorks?: string;
}

export interface ResearchResult {
  examples: AnnotatedExample[];
  searchSummary: string;
}

const MODULE = "RESEARCH";

interface CandidateSearchParams {
  queryEmbedding: number[];
  category: "text" | "image" | "video";
  targetModel?: string;
  domain?: string;
  limit: number;
}


interface CandidateWithScore extends SearchResult {
  relevanceScore: number;
}

const SIMILARITY_QUALITY_THRESHOLD = 0.5;

type FallbackLevel = "strict" | "drop-domain" | "drop-model" | "category-only";

async function searchWithExactFilters(
  embeddings: number[][],
  category: "text" | "image" | "video",
  targetModel?: string,
  domain?: string,
  limit: number = 10,
): Promise<SearchResult[]> {
  const allCandidates = new Map<number, SearchResult>();
  for (const embedding of embeddings) {
    const results = await vectorSearch({
      queryEmbedding: embedding,
      category,
      limit,
      ...(targetModel ? { targetModel } : {}),
      ...(domain && domain !== "general" ? { domain } : {}),
    });
    for (const r of results) {
      const existing = allCandidates.get(r.id);
      if (!existing || r.similarity > existing.similarity) {
        allCandidates.set(r.id, r);
      }
    }
  }
  return Array.from(allCandidates.values())
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 20);
}

async function rerankCandidates(
  candidates: SearchResult[],
  query: string,
  maxResults: number,
): Promise<CandidateWithScore[]> {
  if (candidates.length === 0) return [];

  const documentsForRerank = candidates.map((c) => {
    const parts = [c.prompt];
    if (c.description) parts.push(c.description);
    if (c.domain) parts.push(`domain: ${c.domain}`);
    return parts.join(" | ");
  });

  try {
    const rerankResults = await withTiming(MODULE, "Cohere rerank", () =>
      rerankDocuments({
        query,
        documents: documentsForRerank,
        topN: maxResults,
        relevanceThreshold: 0.3,
      })
    );

    logger.info(MODULE, "Rerank results", {
      inputCount: candidates.length,
      passedThreshold: rerankResults.length,
      scores: rerankResults.map((r) => r.relevanceScore.toFixed(3)).join(", ") || "none",
      topReranked: rerankResults.slice(0, 3).map((r) => ({
        index: r.index,
        score: r.relevanceScore.toFixed(3),
        promptPreview: candidates[r.index]?.prompt?.slice(0, 60) || "?",
      })),
    });

    return rerankResults
      .map((r) => {
        const candidate = candidates[r.index];
        if (!candidate) return null;
        return { ...candidate, relevanceScore: r.relevanceScore };
      })
      .filter((c): c is CandidateWithScore => c !== null);
  } catch (err) {
    logger.warn(MODULE, "Cohere rerank failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return [];
  }
}

async function fetchWithProgressiveFallback(
  allEmbeddings: number[][],
  category: "text" | "image" | "video",
  targetModel: string | undefined,
  domain: string | undefined,
  enrichedQuery: string,
  maxResults: number,
): Promise<{ candidates: SearchResult[]; rankedCandidates: CandidateWithScore[]; fallbackLevel: FallbackLevel }> {
  const hasDomain = !!(domain && domain !== "general");
  const hasModel = !!targetModel;

  const stages: { level: FallbackLevel; tm?: string; dom?: string }[] = [
    { level: "strict", tm: targetModel, dom: domain },
  ];

  if (hasDomain && hasModel) {
    stages.push({ level: "drop-domain", tm: targetModel, dom: undefined });
    stages.push({ level: "drop-model", tm: undefined, dom: domain });
    stages.push({ level: "category-only", tm: undefined, dom: undefined });
  } else if (hasDomain) {
    stages.push({ level: "drop-domain", tm: undefined, dom: undefined });
  } else if (hasModel) {
    stages.push({ level: "drop-model", tm: undefined, dom: undefined });
  }

  let bestCandidates: SearchResult[] = [];
  let bestRanked: CandidateWithScore[] = [];
  let bestLevel: FallbackLevel = "strict";

  for (const stage of stages) {
    if (stage.level !== "strict") {
      const reason = bestRanked.length === 0
        ? "rerank filtered all candidates"
        : `low similarity (${bestCandidates[0]?.similarity?.toFixed(3)})`;
      logger.info(MODULE, `⤵️ Fallback: ${stage.level}`, {
        reason,
        droppedDomain: stage.dom === undefined && hasDomain ? domain : undefined,
        droppedModel: stage.tm === undefined && hasModel ? targetModel : undefined,
      });
    }

    const candidates = await searchWithExactFilters(
      allEmbeddings, category, stage.tm, stage.dom,
    );
    logCandidates(candidates, allEmbeddings.length, stage.level);

    if (candidates.length === 0) continue;

    const topSimilarity = candidates[0]?.similarity ?? 0;
    const ranked = await rerankCandidates(candidates, enrichedQuery, maxResults);

    if (ranked.length > 0 && topSimilarity >= SIMILARITY_QUALITY_THRESHOLD) {
      return { candidates, rankedCandidates: ranked, fallbackLevel: stage.level };
    }

    if (candidates.length > bestCandidates.length || topSimilarity > (bestCandidates[0]?.similarity ?? 0)) {
      bestCandidates = candidates;
      bestRanked = ranked;
      bestLevel = stage.level;
    }
  }

  if (bestCandidates.length === 0) {
    logger.warn(MODULE, "No candidates found at any fallback level");
    return { candidates: [], rankedCandidates: [], fallbackLevel: "strict" };
  }

  if (bestRanked.length === 0) {
    logger.warn(MODULE, "No rerank matches at any level; using vector similarity scores");
    bestRanked = bestCandidates.slice(0, maxResults).map((c) => ({
      ...c,
      relevanceScore: c.similarity,
    }));
  }

  return { candidates: bestCandidates, rankedCandidates: bestRanked, fallbackLevel: bestLevel };
}

function logCandidates(candidates: SearchResult[], embeddingCount: number, level: string): void {
  logger.info(MODULE, `Vector search results [${level}]`, {
    candidateCount: candidates.length,
    uniqueFromEmbeddings: embeddingCount,
    topSimilarity: candidates[0]?.similarity?.toFixed(3) || "N/A",
    bottomSimilarity: candidates.length > 0 ? candidates[candidates.length - 1]?.similarity?.toFixed(3) : "N/A",
    topCandidates: candidates.slice(0, 3).map(c => ({
      id: c.id,
      similarity: c.similarity?.toFixed(3),
      domain: c.domain || "?",
      model: c.targetModel || "?",
      promptPreview: c.prompt?.slice(0, 60) || "?",
    })),
  });
}

/**
 * Research pipeline: embedding search → rerank → LLM annotation
 */
export async function executeResearch(
  request: ResearchRequest
): Promise<ResearchResult> {
  const { query, intent, category, targetModel, domain, maxResults = 5, referenceImages } = request;

  logger.info(MODULE, "━━━ Pipeline started ━━━", {
    query: query.slice(0, 100),
    intent: intent || "none",
    category,
    targetModel: targetModel || "any",
    domain: domain || "any",
    referenceImageCount: referenceImages?.length || 0,
  });

  const pipelineStart = Date.now();

  // 1. Enrich query with intent
  const enrichedQuery = intent ? `${query}. Intent: ${intent}` : query;

  // 2. Generate query embedding (with cache)
  let queryEmbedding = getCachedEmbedding(enrichedQuery);
  if (!queryEmbedding) {
    queryEmbedding = await withTiming(MODULE, "Gemini text embedding", () =>
      generateQueryEmbedding(enrichedQuery)
    );
    setCachedEmbedding(enrichedQuery, queryEmbedding);
  } else {
    logger.info(MODULE, "Embedding cache hit", { query: enrichedQuery.slice(0, 60) });
  }

  // 3. Generate image embeddings if reference images provided (non-fatal)
  const imageEmbeddings: number[][] = [];
  if (referenceImages?.length) {
    const maxImages = Math.min(referenceImages.length, 2);
    for (let i = 0; i < maxImages; i++) {
      try {
        const imgEmbed = await withTiming(MODULE, `Gemini image embedding [${i + 1}/${maxImages}]`, () =>
          generateImageEmbedding(referenceImages[i].base64, referenceImages[i].mimeType)
        );
        imageEmbeddings.push(imgEmbed);
      } catch (err) {
        logger.warn(MODULE, `Image embedding [${i + 1}/${maxImages}] failed — skipping`, {
          error: err instanceof Error ? err.message.slice(0, 150) : String(err),
          mimeType: referenceImages[i].mimeType,
          base64Length: referenceImages[i].base64.length,
        });
      }
    }
    if (imageEmbeddings.length === 0 && maxImages > 0) {
      logger.warn(MODULE, "All image embeddings failed — continuing with text-only search");
    } else if (imageEmbeddings.length > 0) {
      logger.info(MODULE, "Image embeddings generated", {
        succeeded: imageEmbeddings.length,
        attempted: maxImages,
      });
    }
  }

  // 4. Search + Rerank with progressive fallback
  const allEmbeddings = [queryEmbedding, ...imageEmbeddings];

  const { candidates, rankedCandidates, fallbackLevel } = await withTiming(
    MODULE,
    "search + rerank (with fallback)",
    () => fetchWithProgressiveFallback(
      allEmbeddings,
      category,
      targetModel,
      domain,
      enrichedQuery,
      maxResults,
    )
  );

  if (candidates.length === 0) {
    return {
      examples: [],
      searchSummary: "Veritabanında uygun örnek bulunamadı.",
    };
  }

  if (fallbackLevel !== "strict") {
    logger.info(MODULE, "Fallback was used", {
      finalLevel: fallbackLevel,
      originalDomain: domain || "general",
      originalModel: targetModel || "any",
    });
  }

  // 6. LLM Annotation
  const annotated = await withTiming(MODULE, "LLM annotation", () =>
    annotateExamples(rankedCandidates, enrichedQuery)
  );

  const totalDuration = Date.now() - pipelineStart;
  const summary = `${annotated.length} ilgili örnek bulundu${
    domain ? `, domain: ${domain}` : ""
  }${targetModel ? `, model: ${targetModel}` : ""}.`;

  logger.info(MODULE, "━━━ Pipeline completed ━━━", {
    totalDuration: `${totalDuration}ms`,
    examplesReturned: annotated.length,
    fallbackLevel,
    summary,
    returnedExamples: annotated.map((ex, i) => ({
      index: i + 1,
      score: ex.relevanceScore?.toFixed(3),
      domain: ex.domain,
      model: ex.targetModel || "any",
      promptPreview: ex.prompt.slice(0, 80),
      techniques: ex.techniques.slice(0, 3).join(", "),
    })),
  });

  return {
    examples: annotated,
    searchSummary: summary,
  };
}

async function annotateExamples(
  candidates: CandidateWithScore[],
  query: string
): Promise<AnnotatedExample[]> {
  const examplesText = candidates
    .map(
      (c, i) =>
        `[${i + 1}] Prompt: "${c.prompt}"${
          c.description ? `\nDescription: ${c.description}` : ""
        }${c.domain ? `\nDomain: ${c.domain}` : ""}${
          c.styleSet ? `\nStyle: ${c.styleSet}` : ""
        }${c.whyItWorks ? `\nWhy it works: ${c.whyItWorks}` : ""}`
    )
    .join("\n\n");

  logger.debug(MODULE, "Annotating examples with gpt-5-mini", {
    exampleCount: candidates.length,
  });

  const { text } = await generateText({
    model: openai("gpt-5-mini"),
    system: `You are a prompt engineering expert. Analyze the provided example prompts and generate educational annotations for each. Respond ONLY with valid JSON array.

For each example, provide:
- annotation: Why this example is relevant (1-2 sentences, Turkish)
- techniques: Array of notable techniques used (English, 2-4 items)
- adaptationHint: How the user can adapt this to their needs (1 sentence, Turkish)

Respond as JSON array matching the order of examples:
[{"annotation": "...", "techniques": ["..."], "adaptationHint": "..."}]`,
    prompt: `User query: "${query}"

Examples to annotate:
${examplesText}`,
  });

  try {
    // Strip markdown code fences if present (model may wrap JSON in ```json)
    const cleaned = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();
    const annotations = JSON.parse(cleaned) as {
      annotation: string;
      techniques: string[];
      adaptationHint: string;
    }[];

    logger.debug(MODULE, "Annotation parsed successfully", {
      annotationCount: annotations.length,
    });

    return candidates.map((c, i) => ({
      prompt: c.prompt,
      negativePrompt: c.negativePrompt ?? undefined,
      relevanceScore: c.relevanceScore,
      annotation: annotations[i]?.annotation ?? "",
      techniques: annotations[i]?.techniques ?? [],
      adaptationHint: annotations[i]?.adaptationHint ?? "",
      domain: c.domain ?? "general",
      styleSet: c.styleSet ?? undefined,
      targetModel: c.targetModel ?? undefined,
      whyItWorks: c.whyItWorks ?? undefined,
    }));
  } catch (err) {
    logger.error(MODULE, "Annotation JSON parse failed — using fallback", {
      error: err instanceof Error ? err.message : String(err),
      rawResponse: text.slice(0, 200),
    });
    return candidates.map((c) => ({
      prompt: c.prompt,
      negativePrompt: c.negativePrompt ?? undefined,
      relevanceScore: c.relevanceScore,
      annotation: "",
      techniques: [],
      adaptationHint: "",
      domain: c.domain ?? "general",
      styleSet: c.styleSet ?? undefined,
      targetModel: c.targetModel ?? undefined,
      whyItWorks: c.whyItWorks ?? undefined,
    }));
  }
}
