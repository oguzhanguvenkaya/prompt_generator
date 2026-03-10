import { db } from "@/lib/db/index";
import { sql } from "drizzle-orm";
import { logger } from "@/lib/utils/logger";

export interface SearchResult {
  id: number;
  category: string;
  targetModel: string | null;
  prompt: string;
  negativePrompt: string | null;
  domain: string | null;
  styleSet: string | null;
  description: string | null;
  tags: unknown;
  quality: number | null;
  whyItWorks: string | null;
  modelNotes: string | null;
  similarity: number;
}

interface VectorSearchParams {
  queryEmbedding: number[];
  category: "text" | "image" | "video";
  targetModel?: string;
  domain?: string;
  limit?: number;
}

const VALID_CATEGORIES = ["text", "image", "video"] as const;
const OPTIONAL_COLUMN_CACHE_TTL_MS = 10 * 60 * 1000;

interface OptionalColumns {
  whyItWorks: boolean;
  modelNotes: boolean;
}

let optionalColumnsCache: { value: OptionalColumns; timestamp: number } | null = null;

async function getOptionalColumns(): Promise<OptionalColumns> {
  if (
    optionalColumnsCache &&
    Date.now() - optionalColumnsCache.timestamp < OPTIONAL_COLUMN_CACHE_TTL_MS
  ) {
    return optionalColumnsCache.value;
  }

  try {
    const result = await db.execute(
      sql.raw(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
          AND table_name = 'prompt_datasets'
          AND column_name IN ('why_it_works', 'model_notes')
      `)
    );

    const columns = new Set(
      (result.rows as Array<{ column_name?: string }>)
        .map((r) => r.column_name)
        .filter(Boolean) as string[]
    );

    const value: OptionalColumns = {
      whyItWorks: columns.has("why_it_works"),
      modelNotes: columns.has("model_notes"),
    };

    optionalColumnsCache = { value, timestamp: Date.now() };
    return value;
  } catch (err) {
    logger.warn("VECTOR", "Optional column check failed; using compatibility mode", {
      error: err instanceof Error ? err.message : String(err),
    });

    const fallback: OptionalColumns = {
      whyItWorks: false,
      modelNotes: false,
    };
    optionalColumnsCache = { value: fallback, timestamp: Date.now() };
    return fallback;
  }
}

/**
 * Vector similarity search using pgvector cosine distance.
 * Returns top-N candidates for reranking.
 */
export async function vectorSearch(
  params: VectorSearchParams
): Promise<SearchResult[]> {
  const { queryEmbedding, category, targetModel, domain, limit = 10 } = params;

  const vectorLiteral = `[${queryEmbedding.join(",")}]`;

  if (!VALID_CATEGORIES.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }

  const conditions: string[] = [
    `category = '${category}'`,
    `embedding IS NOT NULL`,
  ];

  if (targetModel) {
    conditions.push(`target_model = ${sanitizeLiteral(targetModel)}`);
  }

  if (domain && domain !== "general") {
    conditions.push(`domain = ${sanitizeLiteral(domain)}`);
  }

  const whereClause = conditions.join(" AND ");
  const safeLimit = Math.min(Math.max(1, Math.floor(limit)), 50);
  const optionalColumns = await getOptionalColumns();
  const whyItWorksSelect = optionalColumns.whyItWorks
    ? `why_it_works as "whyItWorks"`
    : `NULL::text as "whyItWorks"`;
  const modelNotesSelect = optionalColumns.modelNotes
    ? `model_notes as "modelNotes"`
    : `NULL::text as "modelNotes"`;

  logger.debug("VECTOR", "Executing pgvector search", {
    category,
    targetModel: targetModel || "any",
    domain: domain || "any",
    limit: safeLimit,
    filters: conditions.length,
    optionalColumns,
  });

  const results = await db.execute(sql.raw(`
    SELECT
      id,
      category,
      target_model as "targetModel",
      prompt,
      negative_prompt as "negativePrompt",
      domain,
      style_set as "styleSet",
      description,
      tags,
      quality,
      ${whyItWorksSelect},
      ${modelNotesSelect},
      1 - (embedding <=> '${vectorLiteral}'::vector(1024)) as similarity
    FROM prompt_datasets
    WHERE ${whereClause}
    ORDER BY embedding <=> '${vectorLiteral}'::vector(1024)
    LIMIT ${safeLimit}
  `));

  const rows = results.rows as unknown as SearchResult[];
  logger.debug("VECTOR", "Search returned", {
    resultCount: rows.length,
    similarities: rows.map((r) => r.similarity?.toFixed(3)).join(", ") || "none",
  });

  return rows;
}

function sanitizeLiteral(value: string): string {
  const sanitized = value.replace(/'/g, "''").replace(/[\\;]/g, "");
  return `'${sanitized}'`;
}
