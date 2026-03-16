// Client-safe model info for UI display — no API keys or secrets

// Platform = Gen AI Studio (Lovart, Leonardo AI, Higgsfield, Kling AI, Recraft)
// Model = Actual AI model within the platform (Phoenix, Kino XL, Sora 2, etc.)

export interface PlatformInfo {
  id: string;
  name: string;
  category: "text" | "image" | "video";
  description: string;
  website: string;
}

export interface ModelInfo {
  id: string;
  name: string;
  category: "text" | "image" | "video";
  platformId: string;        // Which platform/studio this model belongs to
  platformLabel: string;     // Display name of the platform
  provider: string;          // AI SDK provider key for API routing
  deprecated?: boolean;
}

// ─── Platforms (Gen AI Studios) ──────────────────────────────────
export const platforms: PlatformInfo[] = [
  // Image Platforms
  {
    id: "recraft",
    name: "Recraft",
    category: "image",
    description: "AI görsel üretim platformu — vektör, illüstrasyon, ikon",
    website: "https://www.recraft.ai",
  },
  {
    id: "lovart",
    name: "Lovart",
    category: "image",
    description: "20+ model entegre eden Gen AI stüdyo — MCoT motoru",
    website: "https://lovart.ai",
  },
  {
    id: "leonardo",
    name: "Leonardo AI",
    category: "image",
    description: "Profesyonel görsel üretim stüdyosu — Alchemy pipeline, 10+ model",
    website: "https://leonardo.ai",
  },
  // Video Platforms
  {
    id: "kling",
    name: "Kling AI",
    category: "video",
    description: "Kuaishou'nun video üretim platformu — native 4K, 60fps",
    website: "https://app.klingai.com",
  },
  {
    id: "higgsfield",
    name: "Higgsfield",
    category: "video",
    description: "Multi-model video platformu — Sora, Veo, WAN, Kling entegrasyonu",
    website: "https://higgsfield.ai",
  },
  {
    id: "bytedance",
    name: "ByteDance",
    category: "video",
    description: "Seedance — fizik simülasyonu, @reference sistemi, multi-shot",
    website: "https://jimeng.jianying.com",
  },
  // Text Platforms (direct providers)
  {
    id: "openai",
    name: "OpenAI",
    category: "text",
    description: "GPT-5.4 serisi — en yetenekli genel amaçlı modeller",
    website: "https://openai.com",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "text",
    description: "Claude 4 serisi — XML yapılandırılmış promptlar",
    website: "https://anthropic.com",
  },
  {
    id: "google",
    name: "Google",
    category: "text",
    description: "Gemini serisi — multimodal, uzun bağlam",
    website: "https://ai.google.dev",
  },
  {
    id: "moonshot",
    name: "Moonshot",
    category: "text",
    description: "Kimi K2.5 — Çince-İngilizce çift dil uzmanı",
    website: "https://moonshot.cn",
  },
  {
    id: "alibaba",
    name: "Alibaba",
    category: "text",
    description: "Qwen serisi — çok dilli, OpenAI-uyumlu API",
    website: "https://help.aliyun.com/zh/model-studio",
  },
];

// ─── Models ──────────────────────────────────────────────────────
export const models: ModelInfo[] = [
  // ═══ TEXT Models ═══════════════════════════════════════════════
  // OpenAI
  {
    id: "gpt-5.4",
    name: "GPT-5.4",
    category: "text",
    platformId: "openai",
    platformLabel: "OpenAI",
    provider: "openai",
  },
  {
    id: "gpt-5.4-thinking",
    name: "GPT-5.4 Thinking",
    category: "text",
    platformId: "openai",
    platformLabel: "OpenAI",
    provider: "openai-thinking",
  },
  {
    id: "gpt-5.4-pro",
    name: "GPT-5.4 Pro",
    category: "text",
    platformId: "openai",
    platformLabel: "OpenAI",
    provider: "openai-pro",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    category: "text",
    platformId: "openai",
    platformLabel: "OpenAI",
    provider: "openai",
    deprecated: true,
  },
  // Anthropic
  {
    id: "claude-sonnet",
    name: "Claude Sonnet 4",
    category: "text",
    platformId: "anthropic",
    platformLabel: "Anthropic",
    provider: "anthropic",
  },
  {
    id: "claude-opus",
    name: "Claude Opus 4",
    category: "text",
    platformId: "anthropic",
    platformLabel: "Anthropic",
    provider: "anthropic",
  },
  // Google
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    category: "text",
    platformId: "google",
    platformLabel: "Google",
    provider: "google",
  },
  // Moonshot
  {
    id: "kimi-k2.5",
    name: "Kimi K2.5",
    category: "text",
    platformId: "moonshot",
    platformLabel: "Moonshot",
    provider: "moonshot",
  },
  // Alibaba
  {
    id: "qwen",
    name: "Qwen",
    category: "text",
    platformId: "alibaba",
    platformLabel: "Alibaba",
    provider: "alibaba",
  },

  // ═══ IMAGE Models ═════════════════════════════════════════════
  {
    id: "recraft-v3",
    name: "Recraft V3",
    category: "image",
    platformId: "recraft",
    platformLabel: "Recraft",
    provider: "recraft",
  },
  {
    id: "lovart-nano-banana-pro",
    name: "Nano Banana Pro",
    category: "image",
    platformId: "lovart",
    platformLabel: "Lovart",
    provider: "lovart",
  },
  {
    id: "lovart-seedream-5.0",
    name: "Seedream 5.0",
    category: "image",
    platformId: "lovart",
    platformLabel: "Lovart",
    provider: "lovart",
  },
  {
    id: "lovart-flux-2",
    name: "Flux 2",
    category: "image",
    platformId: "lovart",
    platformLabel: "Lovart",
    provider: "lovart",
  },
  {
    id: "lovart-gpt-image-1",
    name: "GPT Image-1",
    category: "image",
    platformId: "lovart",
    platformLabel: "Lovart",
    provider: "lovart",
  },
  {
    id: "leonardo-phoenix",
    name: "Leonardo Phoenix",
    category: "image",
    platformId: "leonardo",
    platformLabel: "Leonardo AI",
    provider: "leonardo",
  },
  {
    id: "leonardo-ideogram-3",
    name: "Ideogram 3",
    category: "image",
    platformId: "leonardo",
    platformLabel: "Leonardo AI",
    provider: "leonardo",
  },

  // ═══ VIDEO Models ═════════════════════════════════════════════
  {
    id: "kling-3.0",
    name: "Kling 3.0",
    category: "video",
    platformId: "kling",
    platformLabel: "Kling AI",
    provider: "kling",
  },
  {
    id: "higgsfield-sora-2",
    name: "Sora 2",
    category: "video",
    platformId: "higgsfield",
    platformLabel: "Higgsfield",
    provider: "higgsfield",
  },
  {
    id: "higgsfield-veo-3.1",
    name: "Veo 3.1",
    category: "video",
    platformId: "higgsfield",
    platformLabel: "Higgsfield",
    provider: "higgsfield",
  },
  {
    id: "higgsfield-wan-2.5",
    name: "WAN 2.5",
    category: "video",
    platformId: "higgsfield",
    platformLabel: "Higgsfield",
    provider: "higgsfield",
  },
  {
    id: "seedance-2.0",
    name: "Seedance 2.0",
    category: "video",
    platformId: "bytedance",
    platformLabel: "ByteDance",
    provider: "bytedance",
  },
];

// ─── Query helpers ──────────────────────────────────────────────

export function getModelsByCategory(category: "text" | "image" | "video", includeDeprecated = false) {
  return models.filter((m) => m.category === category && (includeDeprecated || !m.deprecated));
}

export function getModelsByPlatform(platformId: string, includeDeprecated = false) {
  return models.filter((m) => m.platformId === platformId && (includeDeprecated || !m.deprecated));
}

export function getPlatformsByCategory(category: "text" | "image" | "video") {
  return platforms.filter((p) => p.category === category);
}

export function getModelById(id: string) {
  return models.find((m) => m.id === id);
}

export function getPlatformById(id: string) {
  return platforms.find((p) => p.id === id);
}
