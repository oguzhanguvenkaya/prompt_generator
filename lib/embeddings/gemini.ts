import { GoogleGenAI } from "@google/genai";
import { logger } from "@/lib/utils/logger";

const MODEL = "gemini-embedding-2-preview";
const DIMENSIONS = 768;
const BATCH_SIZE = 100;
const MAX_IMAGE_BASE64_LENGTH = 4 * 1024 * 1024; // ~3MB decoded

function getClient(): GoogleGenAI {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY environment variable is not set");
  }
  return new GoogleGenAI({ apiKey });
}

function l2Normalize(v: number[]): number[] {
  const norm = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
  return norm === 0 ? v : v.map((x) => x / norm);
}

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

function cleanBase64(base64Data: string): string {
  let cleaned = base64Data.replace(/[\s\n\r]/g, "");
  if (cleaned.startsWith("data:")) {
    const commaIdx = cleaned.indexOf(",");
    if (commaIdx !== -1) {
      cleaned = cleaned.slice(commaIdx + 1);
    }
  }
  cleaned = cleaned.replace(/[^A-Za-z0-9+/=]/g, "");
  return cleaned;
}

function validateAndPrepareImage(base64Data: string, mimeType: string): string {
  let cleaned = cleanBase64(base64Data);

  if (cleaned.length > MAX_IMAGE_BASE64_LENGTH) {
    logger.warn("EMBEDDING", "Image too large for embedding API", {
      originalSizeKB: Math.round(cleaned.length / 1024),
      maxSizeKB: Math.round(MAX_IMAGE_BASE64_LENGTH / 1024),
      mimeType,
    });
    throw new Error(`Image too large: ${Math.round(cleaned.length / 1024)}KB base64 exceeds limit`);
  }

  if (cleaned.length < 100) {
    throw new Error(`Image base64 data too small (${cleaned.length} chars) — likely invalid`);
  }

  return cleaned;
}

export async function generateImageEmbedding(
  base64Data: string,
  mimeType: string
): Promise<number[]> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY environment variable is not set");
  }

  const preparedBase64 = validateAndPrepareImage(base64Data, mimeType);

  logger.debug("EMBEDDING", "Sending image to Gemini embedding API", {
    model: MODEL,
    mimeType,
    rawInputLength: base64Data.length,
    cleanedLength: preparedBase64.length,
    approxSizeKB: Math.round((preparedBase64.length * 3) / 4 / 1024),
    first20chars: preparedBase64.slice(0, 20),
  });

  const requestBody = {
    model: `models/${MODEL}`,
    content: {
      parts: [
        {
          inline_data: {
            mime_type: mimeType,
            data: preparedBase64,
          },
        },
      ],
    },
    taskType: "RETRIEVAL_QUERY",
    outputDimensionality: DIMENSIONS,
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:embedContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    logger.error("EMBEDDING", "Gemini image embedding API error", {
      status: response.status,
      mimeType,
      base64Length: preparedBase64.length,
      error: errorText.slice(0, 300),
    });
    throw new Error(
      `Gemini Image Embedding API error (${response.status}): ${errorText}`
    );
  }

  const data = (await response.json()) as {
    embedding: { values: number[] };
  };

  logger.debug("EMBEDDING", "Image embedding generated successfully", {
    dimensions: data.embedding.values.length,
  });

  return l2Normalize(data.embedding.values);
}
