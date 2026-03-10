# Quality Improvements v2 — Model Routing, Pipeline, Metadata Sync

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix silent model fallback, improve research pipeline quality/cost, consolidate model metadata sources.

**Architecture:** Models.ts becomes single source of truth for model→provider mapping. Research pipeline gets basic in-memory cache and honest threshold. Context-window gets smarter image token estimation.

**Tech Stack:** Next.js 15, AI SDK v6, Zustand, Drizzle ORM, Neon PostgreSQL, OpenAI, Cohere

---

## Task 1: Complete Text Model Map — Eliminate Silent Fallback

Users selecting claude-opus, gpt-4o, gpt-5.4-thinking, gemini-pro, kimi-k2.5, qwen in TextCraft silently get gpt-5.4 because `textModelMap` doesn't cover them.

**Root cause:** `textModelMap` in providers.ts is a separate handwritten map that drifts from models.ts.

**Fix:** Generate the mapping FROM models.ts — each model already has `provider` field.

**Files:**
- Modify: `lib/ai/providers.ts`
- Read: `lib/ai/models.ts` (reference, no changes)

**Step 1: Replace textModelMap with dynamic lookup from models.ts**

In `lib/ai/providers.ts`, replace the static `textModelMap` and `getTextAgentModel` function:

```typescript
import { models } from "./models";

// Model ID → actual API model ID mapping for text models.
// Only needed when UI model ID differs from the actual API model ID.
const modelIdOverrides: Record<string, string> = {
  "claude-sonnet": "claude-sonnet-4-20250514",
  "claude-opus": "claude-opus-4-20250514",
  "gpt-4o": "gpt-4o",
  "gpt-5.4-thinking": "gpt-5.4",
  "gemini-pro": "gemini-2.5-pro",
  "kimi-k2.5": "kimi-k2.5",
  "qwen": "qwen-plus",
};

export function getTextAgentModel(targetModelId: string) {
  const modelInfo = models.find((m) => m.id === targetModelId);
  if (!modelInfo) return getLanguageModel("openai"); // fallback

  const actualModelId = modelIdOverrides[targetModelId] || targetModelId;
  return getLanguageModel(modelInfo.provider, actualModelId);
}
```

Remove the old `textModelMap` const.

**Step 2: Verify all 9 text models resolve correctly**

Manual trace:
- `gpt-5.4` → provider="openai", modelId="gpt-5.4" ✓
- `gpt-5.4-thinking` → provider="openai-thinking", override="gpt-5.4" ✓
- `gpt-5.4-pro` → provider="openai-pro", modelId="gpt-5.4-pro" ✓
- `gpt-4o` → provider="openai", override="gpt-4o" ✓
- `claude-sonnet` → provider="anthropic", override="claude-sonnet-4-20250514" ✓
- `claude-opus` → provider="anthropic", override="claude-opus-4-20250514" ✓
- `gemini-pro` → provider="google", override="gemini-2.5-pro" ✓
- `kimi-k2.5` → provider="moonshot", override="kimi-k2.5" ✓
- `qwen` → provider="alibaba", override="qwen-plus" ✓

**Step 3: Verify and commit**

Run: `npx next build 2>&1 | tail -10`

```bash
git add lib/ai/providers.ts
git commit -m "fix: complete text model routing — all 9 UI models map to correct providers

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 2: Research Pipeline — Raise Rerank Threshold + Add Basic Cache

Current: 0.01 threshold = nothing filtered. 3 API calls per invocation with zero caching.

**Files:**
- Modify: `lib/research/research-pipeline.ts`

**Step 1: Raise rerank threshold from 0.01 to 0.3**

In `research-pipeline.ts`, line 101:

```typescript
// Before:
relevanceThreshold: 0.01,

// After:
relevanceThreshold: 0.3,
```

0.3 is reasonable — filters out clearly irrelevant results while keeping moderate matches. Cohere rerank scores: 0-0.3 = weak, 0.3-0.7 = moderate, 0.7+ = strong.

**Step 2: Add in-memory embedding cache**

Add at the top of the file (after imports):

```typescript
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
```

**Step 3: Use cache in executeResearch**

Replace the embedding generation call (line 59):

```typescript
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
```

**Step 4: Verify and commit**

Run: `npx next build 2>&1 | tail -10`

```bash
git add lib/research/research-pipeline.ts
git commit -m "fix: raise rerank threshold to 0.3, add embedding cache (5min TTL)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 3: Smarter Image Token Estimation in Context Trimmer

Current: flat 100 tokens per image. A high-res base64 image can be 500K+ tokens worth of data. This causes the token budget to be wildly underestimated.

**Files:**
- Modify: `lib/utils/context-window.ts`

**Step 1: Estimate image tokens based on data URL size**

Replace the non-text part estimation (line 19):

```typescript
// For file/image parts, estimate based on actual data size
// OpenAI vision: ~85 tokens per 512x512 tile, minimum ~85 tokens
// Base64 data URLs: roughly 1 token per 4 chars of the URL string
if ("url" in part && typeof part.url === "string") {
  const url = part.url as string;
  if (url.startsWith("data:")) {
    // data URL — estimate from base64 length
    return sum + Math.max(200, Math.ceil(url.length / 4 / CHARS_PER_TOKEN));
  }
  return sum + 500; // hosted URL — moderate estimate
}
return sum + 100; // other non-text parts
```

This gives ~2500 tokens for a small image (~40KB base64) and ~125K tokens for a large one (~2MB base64). Much more realistic than flat 100.

**Step 2: Verify and commit**

Run: `npx next build 2>&1 | tail -10`

```bash
git add lib/utils/context-window.ts
git commit -m "fix: smarter image token estimation based on data URL size

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 4: Domain Filter — Pass to Vector Search When Available

Currently domain selection is cosmetic. The code intentionally skips filtering because "LLM-generated values won't match DB values". But our domain values come from a controlled dropdown (general, branding, e-commerce, etc.) — they DO match DB values.

**Fix:** Pass domain filter when it's NOT "general" (specific user selection). Keep the comment about targetModel filtering being skipped.

**Files:**
- Modify: `lib/research/research-pipeline.ts` (lines 63-72)

**Step 1: Pass domain to vectorSearch when explicitly selected**

Replace the vector search call:

```typescript
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
```

**Step 2: Verify and commit**

Run: `npx next build 2>&1 | tail -10`

```bash
git add lib/research/research-pipeline.ts
git commit -m "fix: pass domain filter to vector search when explicitly selected

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Task 5: Sync Model Config Seeds with models.ts

15+ image/video models in models.ts and agent supportedModels have NO corresponding model_configs seed entry. This affects any feature that relies on DB model configs.

**Files:**
- Modify: `lib/db/seed/model-configs.ts`
- Read: `lib/ai/models.ts` (reference)

**Step 1: Audit current model-configs.ts entries vs models.ts**

List all models in models.ts that are NOT in model-configs.ts. From the exploration:

Missing image models:
- `lovart-nano-banana-pro`, `lovart-seedream-5.0`, `lovart-seedream-4.5`
- `lovart-flux-2`, `lovart-gpt-image-1`, `lovart-gemini-imagen-3`
- `leonardo-kino-xl`, `leonardo-lightning-xl`, `leonardo-ideogram-3`
- `leonardo-lucid-origin`, `leonardo-lucid-realism`, `leonardo-vision-xl`
- `leonardo-anime-xl`, `leonardo-flux-kontext`

Missing video models:
- `higgsfield-sora-2-max`, `higgsfield-minimax`

**Step 2: Add missing model configs**

For each missing model, add a seed entry with:
- `id`: matching models.ts ID
- `category`: "image" or "video"
- `name`: matching models.ts name
- `provider`: matching models.ts provider
- `promptFormat`: "natural" (default for most)
- `supportedSizes`: from quick-settings-panel.tsx modelPresets (if exists)
- `qualityOptions`: from modelPresets
- `stylePresets`: from modelPresets
- `supportsNegativePrompt`: true for image models
- `maxPromptLength`: 1000 (reasonable default)
- `isActive`: true

Use quick-settings-panel.tsx `modelPresets` as the reference for sizes/qualities/styles — these are already tested in the UI.

**Step 3: Also fix the generic "lovart" entry**

The existing `lovart` entry in model-configs.ts should be removed or renamed — individual lovart-* models now have specific entries.

**Step 4: Verify and commit**

Run: `npx next build 2>&1 | tail -10`

```bash
git add lib/db/seed/model-configs.ts
git commit -m "fix: add 16 missing model config seeds to match models.ts registry

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

---

## Verification Checklist

1. `npx next build` — clean, no errors
2. TextCraft: select "Claude Opus" → log shows `model=claude-opus` (not gpt-5.4 fallback)
3. TextCraft: select "Kimi K2.5" → response comes from Kimi (different style than GPT)
4. PixelForge: send same query twice → second time embedding cache hit in logs
5. PixelForge: select "E-Ticaret" domain → search results biased toward e-commerce prompts
6. Dev logs: rerank threshold filtering out weak results (some "below threshold" logs)

---

## Out of Scope (Noted for Future)

- **Research pipeline full caching** — rerank and annotation caching (more complex, needs hash-based keys)
- **Model metadata single source** — merging model-configs DB table with models.ts into one source (architectural change)
- **Image trimming at client** — compressing images before sending (UX change, needs resize logic)
- **generated_prompts / boost_results** — schema tables exist but aren't connected to chat flow
