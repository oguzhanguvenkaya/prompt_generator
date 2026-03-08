import { generateQueryEmbedding } from "@/lib/embeddings/openai";
import { rerankDocuments } from "@/lib/rerank/cohere";
import { vectorSearch } from "@/lib/search/hybrid-search";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { logger, withTiming } from "@/lib/utils/logger";

// Simple in-memory cache for query embeddings — avoids repeated OpenAI calls
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

export interface ResearchRequest {
  query: string;
  intent?: string;
  category: "text" | "image" | "video";
  targetModel?: string;
  domain?: string;
  maxResults?: number;
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

/**
 * Research pipeline: embedding search → rerank → LLM annotation
 */
export async function executeResearch(
  request: ResearchRequest
): Promise<ResearchResult> {
  const { query, intent, category, targetModel, domain, maxResults = 5 } = request;

  logger.info(MODULE, "━━━ Pipeline started ━━━", {
    query: query.slice(0, 100),
    intent: intent || "none",
    category,
    targetModel: targetModel || "any",
    domain: domain || "any",
  });

  const pipelineStart = Date.now();

  // 1. Enrich query with intent
  const enrichedQuery = intent ? `${query}. Intent: ${intent}` : query;

  // 2. Generate query embedding (with cache)
  let queryEmbedding = getCachedEmbedding(enrichedQuery);
  if (!queryEmbedding) {
    queryEmbedding = await withTiming(MODULE, "OpenAI embedding", () =>
      generateQueryEmbedding(enrichedQuery)
    );
    setCachedEmbedding(enrichedQuery, queryEmbedding);
  } else {
    logger.info(MODULE, "Embedding cache hit", { query: enrichedQuery.slice(0, 60) });
  }

  // 3. Vector search — top 10 candidates
  // targetModel filter skipped: LLM model names don't match DB model IDs.
  // domain filter applied when user explicitly selects (dropdown values match DB).
  const candidates = await withTiming(MODULE, "pgvector search", () =>
    vectorSearch({
      queryEmbedding,
      category,
      limit: 10,
      ...(domain && domain !== "general" ? { domain } : {}),
    })
  );

  logger.info(MODULE, "Vector search results", {
    candidateCount: candidates.length,
    topSimilarity: candidates[0]?.similarity?.toFixed(3) || "N/A",
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
  });

  if (rerankResults.length === 0) {
    logger.warn(MODULE, "All candidates below rerank threshold — pipeline ending");
    return {
      examples: [],
      searchSummary: "Yeterli benzerlikte örnek bulunamadı.",
    };
  }

  // 5. Map reranked results back to candidates
  const rankedCandidates = rerankResults.map((r) => ({
    ...candidates[r.index],
    relevanceScore: r.relevanceScore,
  }));

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
  });

  return {
    examples: annotated,
    searchSummary: summary,
  };
}

interface CandidateWithScore {
  prompt: string;
  negativePrompt?: string | null;
  description?: string | null;
  domain?: string | null;
  styleSet?: string | null;
  targetModel?: string | null;
  tags?: unknown;
  whyItWorks?: string | null;
  modelNotes?: string | null;
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

  logger.debug(MODULE, "Annotating examples with gpt-4o-mini", {
    exampleCount: candidates.length,
  });

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
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
    temperature: 0.3,
  });

  try {
    // Strip markdown code fences if present (gpt-4o-mini sometimes wraps in ```json)
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
