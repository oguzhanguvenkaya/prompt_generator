# Codebase Quality Improvements — Bug Fix, Dead Code Cleanup, UX Polish

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix confirmed bugs, remove dead code, stabilize UI — auth/security out of scope (3-5 user custom app).

**Architecture:** Bottom-up approach — shared config first, then backend fixes, then frontend stabilization, then dead code removal. No new features, only fixes and cleanup.

**Tech Stack:** Next.js 15 (App Router, Turbopack), AI SDK v5, Zustand, Drizzle ORM, Neon PostgreSQL, Tailwind CSS

---

## Task 1: Agent Metadata — Single Source of Truth

Agent metadata (name, icon, color, category, defaultModel) is duplicated in 3 files:
- `app/agent/[agentId]/page.tsx` (lines 18-22)
- `components/layout/app-sidebar.tsx` (lines 20-45)
- `components/layout/header.tsx` (lines 8-13)

**Files:**
- Create: `lib/agents/agent-meta.ts`
- Modify: `app/agent/[agentId]/page.tsx`
- Modify: `components/layout/app-sidebar.tsx`
- Modify: `components/layout/header.tsx`

**Step 1: Create shared agent metadata file**

```typescript
// lib/agents/agent-meta.ts
import { PenTool, Palette, Film, type LucideIcon } from "lucide-react";
import type { AgentId, AgentCategory } from "./types";

export interface AgentMeta {
  id: AgentId;
  name: string;
  category: AgentCategory;
  description: string;
  icon: LucideIcon;
  color: string;
  bgActive: string;
  defaultModel: string;
}

export const agentMetas: Record<AgentId, AgentMeta> = {
  "text-craft": {
    id: "text-craft",
    name: "TextCraft",
    category: "text",
    description: "LLM & Metin",
    icon: PenTool,
    color: "text-indigo-600 dark:text-indigo-400",
    bgActive: "bg-indigo-100 dark:bg-indigo-950",
    defaultModel: "claude-sonnet",
  },
  "pixel-forge": {
    id: "pixel-forge",
    name: "PixelForge",
    category: "image",
    description: "Görsel",
    icon: Palette,
    color: "text-pink-600 dark:text-pink-400",
    bgActive: "bg-pink-100 dark:bg-pink-950",
    defaultModel: "recraft-v3",
  },
  "motion-lab": {
    id: "motion-lab",
    name: "MotionLab",
    category: "video",
    description: "Video",
    icon: Film,
    color: "text-amber-600 dark:text-amber-400",
    bgActive: "bg-amber-100 dark:bg-amber-950",
    defaultModel: "kling-3.0",
  },
};

export const agentList = Object.values(agentMetas);
```

**Step 2: Update AgentPage to use shared metadata**

In `app/agent/[agentId]/page.tsx`:
- Remove local `agentMeta` const (lines 18-22)
- Remove `PenTool, Palette, Film` imports
- Import `agentMetas` from `@/lib/agents/agent-meta`
- Replace `agentMeta[agentId]` with `agentMetas[agentId as AgentId]`
- Pass `meta.color` to ChatContainer: `agentColor={meta.color}`

**Step 3: Update AppSidebar to use shared metadata**

In `components/layout/app-sidebar.tsx`:
- Remove local `navAgents` array (lines 20-45)
- Import `agentList` from `@/lib/agents/agent-meta`
- Replace `navAgents.map(...)` with `agentList.map(...)`

**Step 4: Update Header to use shared metadata**

In `components/layout/header.tsx`:
- Remove local `pageInfo` const (lines 8-13)
- Import `agentMetas` from `@/lib/agents/agent-meta`
- Build lookup from `agentMetas` dynamically

**Step 5: Verify and commit**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

```bash
git add lib/agents/agent-meta.ts app/agent/\[agentId\]/page.tsx components/layout/app-sidebar.tsx components/layout/header.tsx
git commit -m "refactor: extract agent metadata to single source of truth"
```

---

## Task 2: Model Routing — Connect getLanguageModel to Chat Route

Currently `app/api/chat/route.ts` always calls `getConversationModel()` which returns hardcoded `openai("gpt-5.4")`, ignoring the user's `targetModel` selection.

**Files:**
- Modify: `app/api/chat/route.ts` (lines 122, 129)
- Modify: `lib/ai/providers.ts` (line 43-44)

**Step 1: Update providers.ts — make getConversationModel accept optional provider**

```typescript
// lib/ai/providers.ts — replace getConversationModel:
export function getConversationModel(provider?: string) {
  if (provider) return getLanguageModel(provider);
  return openai("gpt-5.4");
}
```

Note: `getLanguageModel` already handles provider → model mapping. The `targetModel` from the frontend is actually a model config ID like "kling-3.0" or "claude-sonnet", not a provider string. We need a mapping layer.

Actually, looking at the actual flow: `targetModel` from frontend is things like "recraft-v3", "kling-3.0", "claude-sonnet". But these are *image/video model targets* — they're used for prompt generation guidance, NOT for the LLM that generates the prompts. The conversation LLM (gpt-5.4) is the one that WRITES prompts for these target models.

**REVISION:** The model routing is actually correct by design for image/video agents — the LLM (gpt-5.4) generates prompts FOR image/video models. `targetModel` tells the system prompt which model rules to apply, not which LLM to use.

For `text-craft` agent though, the model IS the conversation model (claude-sonnet, gpt-5.4, etc.).

**Step 1: Add text-agent model routing only**

In `app/api/chat/route.ts`, replace line 122:

```typescript
// Before:
const model = getConversationModel();

// After:
const isTextAgent = agent.category === "text";
const model = isTextAgent && targetModel
  ? getLanguageModel(targetModel)
  : getConversationModel();
```

But wait — `getLanguageModel` takes a `provider` string like "openai", not a model ID like "claude-sonnet". We need to map model IDs → provider + modelId.

**Step 1 (revised): Add model ID → provider mapping for text models**

In `lib/ai/providers.ts`, add a lookup for text model IDs:

```typescript
const textModelMap: Record<string, { provider: string; modelId?: string }> = {
  "claude-sonnet": { provider: "anthropic", modelId: "claude-sonnet-4-20250514" },
  "claude-haiku": { provider: "anthropic", modelId: "claude-haiku-4-5-20251001" },
  "gpt-5.4": { provider: "openai", modelId: "gpt-5.4" },
  "gpt-5.4-pro": { provider: "openai-pro", modelId: "gpt-5.4-pro" },
  "gemini-2.0-flash": { provider: "google", modelId: "gemini-2.0-flash" },
};

export function getTextAgentModel(targetModelId: string) {
  const entry = textModelMap[targetModelId];
  if (entry) return getLanguageModel(entry.provider, entry.modelId);
  return getLanguageModel("openai"); // fallback
}
```

**Step 2: Wire it in chat route**

In `app/api/chat/route.ts`:
- Add import: `import { getConversationModel, getTextAgentModel } from "@/lib/ai/providers";`
- Replace line 122:

```typescript
const model = agent.category === "text" && targetModel
  ? getTextAgentModel(targetModel)
  : getConversationModel();
```

**Step 3: Fix hardcoded log**

Replace line 129 `model: "gpt-5.4"` with:

```typescript
model: targetModel || "gpt-5.4",
```

**Step 4: Verify and commit**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

```bash
git add lib/ai/providers.ts app/api/chat/route.ts
git commit -m "fix: route text-craft model selection to correct LLM provider"
```

---

## Task 3: QuickSettings Agent Sızıntısı — Reset on Agent Switch

When switching from MotionLab to PixelForge, `cameraMovement: "dolly-in"` persists because only `model` is updated.

**Files:**
- Modify: `app/agent/[agentId]/page.tsx` (line 77)

**Step 1: Replace partial update with full reset + model override**

In `app/agent/[agentId]/page.tsx`, replace the `useEffect` at line 75-79:

```typescript
useEffect(() => {
  if (meta) {
    // Full reset prevents settings from leaking across agents
    const { resetQuickSettings, updateQuickSettings } = useChatStore.getState();
    resetQuickSettings();
    updateQuickSettings({ model: meta.defaultModel });
  }
}, [agentId]); // eslint-disable-line react-hooks/exhaustive-deps
```

Note: Using `getState()` instead of hook destructuring because this is a fire-and-forget effect — the component re-renders anyway from URL change.

**Step 2: Verify and commit**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

```bash
git add app/agent/\[agentId\]/page.tsx
git commit -m "fix: reset quick settings on agent switch to prevent cross-agent leakage"
```

---

## Task 4: Transport Stability — Use Ref Instead of useMemo Dependency

Transport recreates on every quickSettings change because the entire object is a dependency. This can break active streaming.

**Files:**
- Modify: `components/chat/chat-container.tsx` (lines 35-58)

**Step 1: Stabilize transport with refs**

Replace the transport `useMemo` block (lines 35-58) with:

```typescript
// Refs for values needed at request time — avoids transport recreation
const quickSettingsRef = useRef(quickSettings);
quickSettingsRef.current = quickSettings;

// Transport — only recreated when agentId changes
const transport = useMemo(
  () =>
    new DefaultChatTransport({
      api: "/api/chat",
      fetch: async (url, options) => {
        if (options?.body && typeof options.body === "string") {
          try {
            const body = JSON.parse(options.body);
            body.sessionId = sessionIdRef.current;
            body.agentId = agentId;
            body.targetModel = quickSettingsRef.current.model;
            body.quickSettings = quickSettingsRef.current;
            return globalThis.fetch(url, { ...options, body: JSON.stringify(body) });
          } catch {
            // fallback — send as-is
          }
        }
        return globalThis.fetch(url, options);
      },
    }),
  [agentId]
);
```

Remove `body` from DefaultChatTransport constructor — we inject everything in custom fetch.

**Step 2: Verify and commit**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

```bash
git add components/chat/chat-container.tsx
git commit -m "fix: stabilize transport — only recreate on agentId change, use refs for settings"
```

---

## Task 5: Auto-scroll Guard — Don't Hijack User Scroll

Currently `chat-message-list.tsx` scrolls to bottom on every message/isLoading change, even when user scrolled up.

**Files:**
- Modify: `components/chat/chat-message-list.tsx` (lines 17-21)

**Step 1: Add scroll-near-bottom detection**

Replace the existing scroll logic:

```typescript
export function ChatMessageList({ messages, isLoading, agentColor, onOptionSelect }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);

  // Detect if user has scrolled away from bottom
  const handleScroll = useCallback(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const threshold = 100; // px from bottom
    userScrolledUp.current = el.scrollHeight - el.scrollTop - el.clientHeight > threshold;
  }, []);

  // Auto-scroll only when near bottom
  useEffect(() => {
    if (!userScrolledUp.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);
```

Also add `useCallback` to imports and the `onScroll` handler to the ScrollArea:

```tsx
<ScrollArea ref={scrollAreaRef} onScroll={handleScroll} className="flex-1 p-4">
```

Note: Check if ScrollArea from shadcn/ui supports `ref` and `onScroll`. If it wraps a div, we may need to access the inner viewport. Check the component implementation.

**Step 2: Verify and commit**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

```bash
git add components/chat/chat-message-list.tsx
git commit -m "fix: auto-scroll only when user is near bottom of chat"
```

---

## Task 6: Textarea Auto-Grow

The textarea is fixed at 1 row. Long messages have poor UX.

**Files:**
- Modify: `components/chat/chat-input.tsx` (lines 119-128)

**Step 1: Add auto-grow handler**

Add after the existing `handleKeyDown`:

```typescript
const handleInput = useCallback(() => {
  const el = textareaRef.current;
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
}, []);
```

**Step 2: Wire to textarea**

Add `onInput={handleInput}` to the Textarea element. Also reset height on submit:

In `handleSubmit`, after `setInput("")`:
```typescript
if (textareaRef.current) textareaRef.current.style.height = "auto";
```

**Step 3: Verify and commit**

```bash
git add components/chat/chat-input.tsx
git commit -m "fix: textarea auto-grows with content up to max-height"
```

---

## Task 7: URL.createObjectURL Memory Leak

Object URLs are revoked on remove but not on unmount.

**Files:**
- Modify: `components/chat/chat-input.tsx`

**Step 1: Add cleanup useEffect**

Add `useEffect` import (already imported) and add after state declarations:

```typescript
// Cleanup object URLs on unmount
useEffect(() => {
  return () => {
    images.forEach((img) => URL.revokeObjectURL(img.preview));
  };
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

Note: We intentionally use `[]` deps — we only want cleanup on unmount. The `images` ref at unmount time is fine because React preserves the last state during cleanup.

Actually, `images` in the cleanup closure would be the initial empty array. We need a ref:

```typescript
const imagesRef = useRef(images);
imagesRef.current = images;

useEffect(() => {
  return () => {
    imagesRef.current.forEach((img) => URL.revokeObjectURL(img.preview));
  };
}, []);
```

**Step 2: Also revoke URLs in handleSubmit (images are sent, previews no longer needed)**

In `handleSubmit`, before `setImages([])`:
```typescript
images.forEach((img) => URL.revokeObjectURL(img.preview));
```

**Step 3: Verify and commit**

```bash
git add components/chat/chat-input.tsx
git commit -m "fix: revoke object URLs on unmount and submit to prevent memory leak"
```

---

## Task 8: UI Bug Fixes — Creativity Slider, Turkish Chars, Size Default, Streaming Indicator

Small but visible bugs grouped together.

**Files:**
- Modify: `components/agent/quick-settings-panel.tsx`
- Modify: `components/chat/chat-message-list.tsx`

**Step 1: Fix creativity slider falsy 0 bug**

In `quick-settings-panel.tsx`, replace lines 414 and 419:

```typescript
// Before: Number(quickSettings.creativity) || 0.7
// After:
value={quickSettings.creativity !== "" ? Number(quickSettings.creativity) : 0.7}

// Display:
{quickSettings.creativity !== "" ? Number(quickSettings.creativity) : 0.7}
```

**Step 2: Fix Turkish characters**

In `quick-settings-panel.tsx`:
- Line 451: `"Gelismis Ayarlar"` → `"Gelişmiş Ayarlar"`
- Line 496: Replace `"Acik"` / `"Kapali"` with `"Açık"` / `"Kapalı"`

**Step 3: Fix size default when switching models**

In `quick-settings-panel.tsx`, the model onChange (line 333) already resets size to `"1:1"`, but Kling has `"1:1 (4K)"`. Fix: set size to the first available option from presets instead of hardcoded "1:1".

Replace line 333:
```typescript
onChange={(id) => {
  const newPresets = modelPresets[id];
  const firstSize = newPresets?.sizes?.[0]?.label || "1:1";
  const firstQuality = newPresets?.qualities?.[0]?.value || "standard";
  updateQuickSettings({ model: id, style: "", size: firstSize, quality: firstQuality });
}}
```

**Step 4: Fix double streaming indicator**

In `chat-message-list.tsx`, the `<StreamingIndicator />` at line 65 shows when `isLoading` regardless of whether the last message is already streaming. The `ChatMessage` component already shows streaming state via `isStreaming` prop.

Replace line 65:
```typescript
{/* Only show standalone indicator when no assistant message is streaming yet */}
{isLoading && lastAssistantIndex === -1 && <StreamingIndicator />}
```

This ensures the indicator only shows before the first assistant response starts — once streaming text appears, the message itself handles the visual feedback.

**Step 5: Verify and commit**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

```bash
git add components/agent/quick-settings-panel.tsx components/chat/chat-message-list.tsx
git commit -m "fix: creativity slider, Turkish chars, size defaults, double streaming indicator"
```

---

## Task 9: Dead Code Cleanup

Remove confirmed unused files and code.

**Files:**
- Delete: `hooks/use-agent-chat.ts`
- Delete: `lib/utils/cost-calculator.ts` (verify first)
- Delete: `lib/embeddings/cohere.ts` (verify first)
- Modify: `lib/store/chat-store.ts` — remove `sessions`, `addSession`, `currentSessionId`, `setCurrentSession`
- Modify: `lib/agents/types.ts` — remove unused `ModelConfig` type (verify first)

**Step 1: Verify dead code — search for imports**

Run:
```bash
grep -r "use-agent-chat\|useAgentChat" --include="*.ts" --include="*.tsx" -l
grep -r "cost-calculator\|costCalculator" --include="*.ts" --include="*.tsx" -l
grep -r "embeddings/cohere\|from.*cohere" --include="*.ts" --include="*.tsx" -l
grep -r "addSession\|currentSessionId\|setCurrentSession" --include="*.ts" --include="*.tsx" -l
grep -r "ModelConfig" --include="*.ts" --include="*.tsx" -l
```

Only delete files with ZERO imports outside themselves.

**Step 2: Delete confirmed dead files**

```bash
rm hooks/use-agent-chat.ts
# Only if confirmed unused:
rm lib/utils/cost-calculator.ts
rm lib/embeddings/cohere.ts
```

**Step 3: Clean chat-store.ts**

Remove from interface and implementation:
- `currentSessionId: string | null;`
- `sessions: ChatSession[];`
- `setCurrentSession: (id: string | null) => void;`
- `addSession: (session: ChatSession) => void;`
- `ChatSession` interface (if only used by removed fields)

Keep: `quickSettings`, `sidebarCollapsed`, `updateQuickSettings`, `resetQuickSettings`, `toggleSidebar`

**Step 4: Remove unused ModelConfig from types.ts (if confirmed)**

**Step 5: Verify and commit**

Run: `npx next build 2>&1 | tail -5`
Expected: Build succeeds

```bash
git add -A
git commit -m "refactor: remove dead code — useAgentChat, cost-calculator, cohere embeddings, unused store fields"
```

---

## Task 10: Agent supportedModels Sync

`supportedModels` arrays in pixel-forge.ts and motion-lab.ts are subsets of models with switch cases. Sync them.

**Files:**
- Modify: `lib/agents/pixel-forge.ts` — update `supportedModels`
- Modify: `lib/agents/motion-lab.ts` — update `supportedModels`

**Step 1: Audit switch cases vs supportedModels**

For each agent, extract all case labels from `getModelSpecificPrompt` switch statement and compare with `supportedModels` array.

**Step 2: Update supportedModels to match switch cases**

Any model with a dedicated case block should be in `supportedModels`. Models without cases should use a generic default.

**Step 3: Verify and commit**

```bash
git add lib/agents/pixel-forge.ts lib/agents/motion-lab.ts
git commit -m "fix: sync supportedModels arrays with getModelSpecificPrompt switch cases"
```

---

## Task 11: Minor Backend Fixes

**Files:**
- Modify: `app/api/chat/route.ts` — fix experimental_download null return

**Step 1: Fix experimental_download return type**

Line 155 returns `null` for non-data URLs. AI SDK expects either a valid download or `undefined`. Replace:

```typescript
return null; // Let SDK handle non-data URLs normally
```

with:

```typescript
return undefined; // Let SDK handle non-data URLs normally
```

(Or check AI SDK docs — if `null` is acceptable, leave it.)

**Step 2: Verify and commit**

```bash
git add app/api/chat/route.ts
git commit -m "fix: minor backend fixes — experimental_download return type"
```

---

## Verification Checklist

After all tasks complete:
1. `npx next build` — clean build, no errors
2. Dev server starts: `npx next dev --turbopack`
3. Navigate between agents → settings reset properly
4. Send message in PixelForge → no cameraMovement in request payload
5. Type long message → textarea grows
6. Scroll up during streaming → stays in place
7. Creativity slider shows correct value
8. "Gelişmiş Ayarlar" and "Açık/Kapalı" display correct Turkish chars
9. Switch model (e.g., Kling) → size dropdown shows valid options
10. No console errors about dead imports

---

## Out of Scope (Noted but Deferred)

- Auth/rate limiting (3-5 user app, Vercel deploy)
- SQL injection in seed scripts (one-time admin operation)
- Research pipeline caching (optimization, not bug)
- Hybrid search naming (cosmetic)
- Wizard option detection (works for current Turkish UI)
- Session sidebar persistence (works, just reloads from API)
- usageStats table (harmless schema, might be used later)
