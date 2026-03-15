import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-embedding-2-preview";
const DIMENSIONS = 768;
const BATCH_SIZE = 100;

function getClient(): GoogleGenAI {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY environment variable is not set");
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * L2 normalize a vector — required for MRL-truncated embeddings
 * to ensure cosine distance works correctly in pgvector.
 */
function l2Normalize(v: number[]): number[] {
  const norm = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
  return norm === 0 ? v : v.map((x) => x / norm);
}

/**
 * Generate embeddings for multiple texts (for indexing/seeding).
 * Uses RETRIEVAL_DOCUMENT task type for asymmetric retrieval.
 */
export async function generateEmbeddings(
  texts: string[]
): Promise<number[][]> {
  const ai = getClient();
  const allEmbeddings: number[][] = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const result = await ai.models.embedContent({
      model: MODEL,
      contents: batch,
      config: {
        taskType: "RETRIEVAL_DOCUMENT",
        outputDimensionality: DIMENSIONS,
      },
    });
    const embeddings = result.embeddings!.map((e) => l2Normalize(e.values!));
    allEmbeddings.push(...embeddings);
  }

  return allEmbeddings;
}

/**
 * Generate a single query embedding (for search).
 * Uses RETRIEVAL_QUERY task type for asymmetric retrieval.
 */
export async function generateQueryEmbedding(
  text: string
): Promise<number[]> {
  const ai = getClient();
  const result = await ai.models.embedContent({
    model: MODEL,
    contents: text,
    config: {
      taskType: "RETRIEVAL_QUERY",
      outputDimensionality: DIMENSIONS,
    },
  });
  return l2Normalize(result.embeddings![0].values!);
}

/**
 * Generate embedding for an image (cross-modal search).
 * The resulting vector lives in the same space as text embeddings,
 * enabling image-to-text retrieval.
 *
 * Uses REST API directly because the JS SDK has issues with
 * image inline_data serialization in the current version.
 */
export async function generateImageEmbedding(
  base64Data: string,
  mimeType: string
): Promise<number[]> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY environment variable is not set");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: `models/${MODEL}`,
        content: {
          parts: [{ inline_data: { mime_type: mimeType, data: base64Data } }],
        },
        outputDimensionality: DIMENSIONS,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(
      `Gemini Image Embedding API error (${response.status}): ${error}`
    );
  }

  const data = (await response.json()) as {
    embedding: { values: number[] };
  };
  return l2Normalize(data.embedding.values);
}
