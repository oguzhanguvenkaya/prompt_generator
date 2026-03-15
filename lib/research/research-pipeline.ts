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

function getTargetModelFallbacks(targetModel: string): string[] {
  const fallbacks: string[] = [];

  // Legacy rows in some datasets use generic "lovart" instead of specific model IDs.
  if (targetModel.startsWith("lovart-")) {
    fallbacks.push("lovart");
  }

  // Keep a safe fallback for model-family compatibility.
  if (targetModel === "higgsfield-sora-2-max") {
    fallbacks.push("higgsfield-sora-2");
  }

  return [...new Set(fallbacks.filter((m) => m !== targetModel))];
}

async function fetchVectorCandidates(
  params: CandidateSearchParams
): Promise<SearchResult[]> {
  const { queryEmbedding, category, targetModel, domain, limit } = params;
  const baseParams = {
    queryEmbedding,
    category,
    limit,
    ...(domain && domain !== "general" ? { domain } : {}),
  };

  if (!targetModel) {
    return vectorSearch(baseParams);
  }

  const strictResults = await vectorSearch({ ...baseParams, targetModel });
  if (strictResults.length > 0) {
    return strictResults;
  }

  for (const fallbackModel of getTargetModelFallbacks(targetModel)) {
    const fallbackResults = await vectorSearch({
      ...baseParams,
      targetModel: fallbackModel,
    });
    if (fallbackResults.length > 0) {
      logger.warn(MODULE, "No strict model matches; used fallback model", {
        requestedModel: targetModel,
        fallbackModel,
        candidateCount: fallbackResults.length,
      });
      return fallbackResults;
    }
  }

  logger.warn(MODULE, "No model-specific matches; falling back to category/domain search", {
    requestedModel: targetModel,
    category,
    domain: domain || "general",
  });
  return vectorSearch(baseParams);
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

  // 4. Search — text embedding + image embeddings (if any)
  const allEmbeddings = [queryEmbedding, ...imageEmbeddings];
  const allCandidates = new Map<number, SearchResult>();

  for (const embedding of allEmbeddings) {
    const searchResults = await withTiming(MODULE, "hybrid search", () =>
      fetchVectorCandidates({
        queryEmbedding: embedding,
        category,
        ...(targetModel ? { targetModel } : {}),
        limit: 10,
        ...(domain && domain !== "general" ? { domain } : {}),
      })
    );
    for (const r of searchResults) {
      const existing = allCandidates.get(r.id);
      if (!existing || r.similarity > existing.similarity) {
        allCandidates.set(r.id, r);
      }
    }
  }

  const candidates = Array.from(allCandidates.values())
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 20);

  logger.info(MODULE, "Vector search results", {
    candidateCount: candidates.length,
    uniqueFromEmbeddings: allEmbeddings.length,
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

  if (candidates.length === 0) {
    logger.warn(MODULE, "No candidates found — pipeline ending early");
    return {
      examples: [],
      searchSummary: "Veritabanında uygun örnek bulunamadı.",
    };
  }

  // 4. Rerank with Cohere
  const documentsForRerank = candidates.map((c) => {
    const parts = [c.prompt];
    if (c.description) parts.push(c.description);
    if (c.domain) parts.push(`domain: ${c.domain}`);
    return parts.join(" | ");
  });

  let rankedCandidates: CandidateWithScore[];
  try {
    const rerankResults = await withTiming(MODULE, "Cohere rerank", () =>
      rerankDocuments({
        query: enrichedQuery,
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

    const mappedCandidates = rerankResults
      .map((r) => {
        const candidate = candidates[r.index];
        if (!candidate) return null;
        return {
          ...candidate,
          relevanceScore: r.relevanceScore,
        };
      })
      .filter(
        (c): c is SearchResult & { relevanceScore: number } => c !== null
      );

    if (mappedCandidates.length > 0) {
      rankedCandidates = mappedCandidates;
    } else {
      logger.warn(MODULE, "Rerank returned no usable matches; using vector similarity fallback");
      rankedCandidates = candidates.slice(0, maxResults).map((c) => ({
        ...c,
        relevanceScore: c.similarity,
      }));
    }
  } catch (err) {
    logger.warn(MODULE, "Cohere rerank unavailable; using vector similarity fallback", {
      error: err instanceof Error ? err.message : String(err),
    });
    rankedCandidates = candidates.slice(0, maxResults).map((c) => ({
      ...c,
      relevanceScore: c.similarity,
    }));
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

interface CandidateWithScore extends SearchResult {
  relevanceScore: number;
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
