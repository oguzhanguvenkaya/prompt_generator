import fs from "node:fs";
import path from "node:path";

interface ResearchNewPrompt {
  id: string;
  model: string;
  model_type: string;
  category: string;
  subcategory: string;
  prompt_text: string;
  style_tags: string[];
  use_case: string;
  popularity_score: number;
  why_it_works?: string;
  model_specific_technique?: string;
}

type ResearchNewDataset = Record<string, ResearchNewPrompt[]>;

interface LoadResearchNewOptions {
  perModelLimit?: number;
}

type SeedPrompt = {
  category: "image" | "video";
  targetModel: string;
  prompt: string;
  tags: string[];
  quality: number;
  source: string;
  domain: string;
  styleSet?: string;
  description: string;
  whyItWorks?: string;
  modelNotes?: string;
  rating: number;
};

const DEFAULT_PER_MODEL_LIMIT = Infinity;

const MODEL_NAME_TO_TARGET_MODEL: Record<string, string> = {
  "Veo 3.1": "higgsfield-veo-3.1",
  "Kling 3.0": "kling-3.0",
  "Seedance 2.0": "seedance-2.0",
  "Seedream 2.0": "lovart-seedream-5.0",
  "Nano Banana Pro": "lovart-nano-banana-pro",
  Flux: "lovart-flux-2",
  "Recraft Image": "recraft-v3",
  "Recraft Vector": "recraft-v3",
};

function resolveResearchNewDatasetPath(): string | null {
  const candidate = path.join(
    process.cwd(),
    "research_new",
    "final_output",
    "master_prompts.json"
  );
  if (fs.existsSync(candidate)) return candidate;
  return null;
}

function normalizeLimit(limit: number): number {
  if (!Number.isFinite(limit)) return DEFAULT_PER_MODEL_LIMIT;
  const n = Math.floor(limit);
  if (n < 0) return 0;
  return n;
}

function inferDomain(p: ResearchNewPrompt): string {
  const context = [
    p.category,
    p.subcategory,
    p.use_case,
    ...(Array.isArray(p.style_tags) ? p.style_tags : []),
  ]
    .join(" ")
    .toLowerCase();

  if (
    /\b(ui|interface|dashboard|app icon|pictogram|icon|mobile app)\b/.test(
      context
    )
  ) {
    return "ui-design";
  }
  if (/\b(brand|logo|identity|corporate|campaign)\b/.test(context)) {
    return "branding";
  }
  if (/\b(social media|reel|tiktok|instagram|short[- ]form)\b/.test(context)) {
    return "social-media";
  }
  if (/\b(e-commerce|product|catalog|commercial|advertis|shop)\b/.test(context)) {
    return "e-commerce";
  }
  if (/\b(illustration|anime|manga|vector|watercolor|painterly|artistic)\b/.test(context)) {
    return "illustration";
  }
  if (/\b(portrait|fashion|lifestyle|photography|editorial|macro|studio)\b/.test(context)) {
    return "photography";
  }

  return "general";
}

function inferStyleSet(p: ResearchNewPrompt): string | undefined {
  const tags = (Array.isArray(p.style_tags) ? p.style_tags : [])
    .map((t) => t.toLowerCase());
  const haystack = tags.join(" ");

  if (/(vector|flat|icon|logo|outline|pictogram)/.test(haystack)) {
    return "vector";
  }
  if (/(anime|manga)/.test(haystack)) {
    return "anime";
  }
  if (/(cinematic|film)/.test(haystack)) {
    return "cinematic";
  }
  if (/(3d|isometric|render|stylized 3d)/.test(haystack)) {
    return "3d-render";
  }
  if (/(illustration|watercolor|painterly|artistic)/.test(haystack)) {
    return "illustration";
  }
  if (/(photorealistic|realistic|macro|studio|depth of field)/.test(haystack)) {
    return "photorealistic";
  }

  return undefined;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function normalizePrompt(
  raw: ResearchNewPrompt,
  targetModel: string
): SeedPrompt | null {
  const prompt = raw.prompt_text?.trim();
  if (!prompt) return null;

  const score = typeof raw.popularity_score === "number" ? raw.popularity_score : 8;
  const quality = clamp(score / 10, 0.5, 1);
  const rating = clamp(score / 2, 1, 5);

  const normalizedTags = [
    ...(Array.isArray(raw.style_tags) ? raw.style_tags : []),
    raw.use_case,
  ]
    .map((t) => t?.trim())
    .filter((t): t is string => Boolean(t))
    .slice(0, 10);

  const category = raw.model_type === "video" ? "video" : "image";
  const styleSet = inferStyleSet(raw);
  const description = `${raw.model} | ${raw.category}${raw.subcategory ? ` / ${raw.subcategory}` : ""}`;

  return {
    category,
    targetModel,
    prompt,
    tags: normalizedTags,
    quality,
    source: "research_new",
    domain: inferDomain(raw),
    ...(styleSet ? { styleSet } : {}),
    description: description.slice(0, 220),
    ...(raw.why_it_works ? { whyItWorks: raw.why_it_works.trim() } : {}),
    ...(raw.model_specific_technique
      ? { modelNotes: raw.model_specific_technique.trim() }
      : {}),
    rating,
  };
}

export function loadResearchNewPrompts(
  options: LoadResearchNewOptions = {}
): SeedPrompt[] {
  const datasetPath = resolveResearchNewDatasetPath();
  if (!datasetPath) {
    console.warn("[seed] research_new dataset not found; skipping research_new prompts.");
    return [];
  }

  const perModelLimit = normalizeLimit(
    options.perModelLimit ?? DEFAULT_PER_MODEL_LIMIT
  );
  if (perModelLimit === 0) return [];

  const raw = fs.readFileSync(datasetPath, "utf8");
  const parsed = JSON.parse(raw) as ResearchNewDataset;

  const result: SeedPrompt[] = [];
  const dedupe = new Set<string>();

  for (const [modelName, prompts] of Object.entries(parsed)) {
    const targetModel = MODEL_NAME_TO_TARGET_MODEL[modelName];
    if (!targetModel || !Array.isArray(prompts)) continue;

    const selected = [...prompts]
      .sort((a, b) => {
        const scoreA = typeof a.popularity_score === "number" ? a.popularity_score : 0;
        const scoreB = typeof b.popularity_score === "number" ? b.popularity_score : 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return (a.id || "").localeCompare(b.id || "");
      })
      .slice(0, perModelLimit);

    for (const item of selected) {
      const normalized = normalizePrompt(item, targetModel);
      if (!normalized) continue;
      const key = `${normalized.targetModel}::${normalized.prompt.toLowerCase()}`;
      if (dedupe.has(key)) continue;
      dedupe.add(key);
      result.push(normalized);
    }
  }

  return result;
}
