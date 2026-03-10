import { logger } from "@/lib/utils/logger";

const COHERE_RERANK_URL = "https://api.cohere.com/v2/rerank";
const RERANK_MODEL = "rerank-v3.5";

interface CohereRerankResult {
  index: number;
  relevance_score: number;
}

interface CohereRerankResponse {
  id: string;
  results: CohereRerankResult[];
}

export interface RerankResult {
  index: number;
  relevanceScore: number;
}

/**
 * Rerank documents against a query using Cohere Rerank v3.5.
 * Returns results sorted by relevance, filtered by threshold.
 */
export async function rerankDocuments(params: {
  query: string;
  documents: string[];
  topN?: number;
  relevanceThreshold?: number;
}): Promise<RerankResult[]> {
  const {
    query,
    documents,
    topN = 5,
    relevanceThreshold = 0.3,
  } = params;

  if (documents.length === 0) return [];

  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    throw new Error("COHERE_API_KEY environment variable is not set");
  }

  logger.debug("RERANK", "Calling Cohere rerank API", {
    documentCount: documents.length,
    topN,
    threshold: relevanceThreshold,
  });

  const response = await fetch(COHERE_RERANK_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      documents,
      model: RERANK_MODEL,
      top_n: topN,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    logger.error("RERANK", "Cohere API error", {
      status: response.status,
      error: error.slice(0, 200),
    });
    throw new Error(`Cohere Rerank API error (${response.status}): ${error}`);
  }

  const data: CohereRerankResponse = await response.json();

  const filtered = data.results
    .filter((r) => r.relevance_score >= relevanceThreshold)
    .map((r) => ({
      index: r.index,
      relevanceScore: r.relevance_score,
    }));

  logger.debug("RERANK", "Results", {
    rawCount: data.results.length,
    filteredCount: filtered.length,
    allScores: data.results.map((r) => r.relevance_score.toFixed(3)).join(", "),
  });

  return filtered;
}
