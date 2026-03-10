const OPENAI_EMBEDDING_URL = "https://api.openai.com/v1/embeddings";
const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIM = 1024;

interface OpenAIEmbeddingResponse {
  data: { embedding: number[]; index: number }[];
  usage: { prompt_tokens: number; total_tokens: number };
}

async function callOpenAIEmbed(texts: string[]): Promise<number[][]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const response = await fetch(OPENAI_EMBEDDING_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: texts,
      model: EMBEDDING_MODEL,
      dimensions: EMBEDDING_DIM,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI Embedding API error (${response.status}): ${error}`);
  }

  const data: OpenAIEmbeddingResponse = await response.json();
  return data.data
    .sort((a, b) => a.index - b.index)
    .map((d) => d.embedding);
}

/**
 * Generate embeddings for multiple texts (for indexing/seeding).
 * OpenAI supports up to 2048 inputs per request; we batch at 100 to be safe.
 */
export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const BATCH_SIZE = 100;
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const embeddings = await callOpenAIEmbed(batch);
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
  const [embedding] = await callOpenAIEmbed([text]);
  return embedding;
}
