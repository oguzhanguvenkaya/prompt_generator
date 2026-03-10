const COHERE_API_URL = "https://api.cohere.com/v2/embed";
const EMBEDDING_MODEL = "embed-v4.0";
const EMBEDDING_DIM = 1024;

interface CohereEmbedResponse {
  id: string;
  texts: string[];
  embeddings: { float: number[][] };
  meta: { api_version: { version: string } };
}

async function callCohereEmbed(
  texts: string[],
  inputType: "search_document" | "search_query"
): Promise<number[][]> {
  const apiKey = process.env.COHERE_API_KEY;
  if (!apiKey) {
    throw new Error("COHERE_API_KEY environment variable is not set");
  }

  const response = await fetch(COHERE_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      texts,
      model: EMBEDDING_MODEL,
      input_type: inputType,
      embedding_types: ["float"],
      output_dimension: EMBEDDING_DIM,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Cohere API error (${response.status}): ${error}`);
  }

  const data: CohereEmbedResponse = await response.json();
  return data.embeddings.float;
}

/**
 * Generate embeddings for multiple texts (for indexing/seeding).
 * Batches automatically — Cohere supports up to 96 texts per request.
 */
export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const BATCH_SIZE = 96;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const embeddings = await callCohereEmbed(batch, "search_document");
    allEmbeddings.push(...embeddings);
  }

  return allEmbeddings;
}

/**
 * Generate a single query embedding (for search).
 */
export async function generateQueryEmbedding(
  text: string
): Promise<number[]> {
  const [embedding] = await callCohereEmbed([text], "search_query");
  return embedding;
}
