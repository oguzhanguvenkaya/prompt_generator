# Gen AI Prompt Generator Agent Orchestrator — Sistem Mimarisi

**Tarih:** 2026-03-05
**Versiyon:** 1.0
**Yazar:** Mimari Arastirma Ajani

---

## Icerik

1. [Genel Bakis](#1-genel-bakis)
2. [Teknoloji Yigini](#2-teknoloji-yigini)
3. [Dosya Yapisi](#3-dosya-yapisi)
4. [Frontend Mimarisi](#4-frontend-mimarisi)
5. [Backend Mimarisi](#5-backend-mimarisi)
6. [Ajan Sistemi Tasarimi](#6-ajan-sistemi-tasarimi)
7. [Boost Ozelligi Mimarisi](#7-boost-ozelligi-mimarisi)
8. [Veri Akis Diyagramlari](#8-veri-akis-diyagramlari)
9. [API Yonetimi ve Maliyet Kontrolu](#9-api-yonetimi-ve-maliyet-kontrolu)
10. [Uygulama Yol Haritasi](#10-uygulama-yol-haritasi)
11. [Acik Kaynak Referanslar](#11-acik-kaynak-referanslar)

---

## 1. Genel Bakis

### 1.1 Proje Tanimi

Kisisel kullanim icin tasarlanmis, 4 uzman ajandan olusan bir prompt uretici ve optimize edici web uygulamasi. Her ajan kullaniciyi soru-cevap yontemiyle yonlendirerek hedef AI modeli icin en uygun promptu olusturur. "Boost" ozelligi ile prompt hedef API uzerinde test edilip, sonuc degerlendirilip, otomatik olarak iyilestirilebilir.

### 1.2 4 Uzman Ajan

| Ajan | Alan | Hedef Modeller | Ikon |
|------|------|----------------|------|
| **TextCraft** | LLM / Metin Uretimi | Claude, GPT-4o, Gemini, Kimi K2.5, Qwen | Kalem |
| **PixelForge** | Gorsel Uretimi | DALL-E 3, Midjourney (via API), Stable Diffusion, Flux | Firca |
| **MotionLab** | Video Uretimi | Sora, Runway Gen-3, Kling, Pika, Luma | Film |
| **DimensionX** | 3D Model Uretimi | Meshy, Tripo3D, TripoSR, Rodin | Kup |

### 1.3 Temel Ozellikler

- Soru-cevap tabanli prompt olusturma
- Coklu API saglayici destegi
- Boost: Prompt test -> Degerlendir -> Yeniden optimize et
- Gercek zamanli streaming sohbet
- Oturum icinde ajan hafizasi
- Prompt gecmisi ve favoriler
- Panoya kopyalama

---

## 2. Teknoloji Yigini

### 2.1 Cekirdek Teknolojiler

| Katman | Teknoloji | Tercih Gerekceleri |
|--------|-----------|-------------------|
| **Framework** | Next.js 15 (App Router) | RSC destegi, API routes, Vercel uyumu |
| **Runtime** | Vercel (Serverless/Edge) | Sifir yapilandirma, streaming destegi |
| **AI SDK** | Vercel AI SDK 4.x | Multi-provider, streaming, tool calling, structured output |
| **UI** | shadcn/ui + Tailwind CSS 4 | Esnek, erisilebilir, ozellestirilmesi kolay |
| **State** | Zustand | Minimal API, middleware destegi, persist |
| **Depolama** | localStorage + IndexedDB (Dexie.js) | Sunucu tarafli DB gereksiz (kisisel kullanim) |
| **Dil** | TypeScript 5.x | Tip guvenligi, DX |
| **Paket Yonetici** | pnpm | Hizli, disk verimli |

### 2.2 Vercel AI SDK Secim Gerekceleri

Vercel AI SDK (ai paketi) su nedenlerle en uygun secimdir:

1. **Multi-Provider Destegi**: `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google` gibi resmi provider paketleri
2. **Streaming**: `streamText()` ve `streamObject()` ile native streaming
3. **Tool Calling**: Ajanlara arac tanimlama imkani (web arama, gorsel analiz vb.)
4. **Structured Output**: Zod sema ile tipli cikti
5. **useChat Hook**: Frontend icin hazir streaming sohbet hook'u
6. **Edge Uyumlulugu**: Vercel Edge Runtime uzerinde calisir

### 2.3 Neden Zustand?

- Redux'a gore cok daha az boilerplate
- Jotai'ye gore store organizasyonu daha net (agent bazli slice'lar)
- `persist` middleware ile localStorage entegrasyonu hazir
- React 19 / RSC uyumlu
- 1.1 KB gzipped

### 2.4 Neden localStorage + IndexedDB?

Kisisel kullanim senaryosunda sunucu tarafli veritabani gereksiz karmasiklik yaratir:

- **localStorage**: Ayarlar, API anahtarlari (sifrelenmis), basit tercihler
- **IndexedDB (Dexie.js)**: Prompt gecmisi, sohbet kayitlari, favoriler (buyuk veri)
- Gerekirse gelecekte Turso/SQLite'a gecis kolay (Dexie API'si benzer)

---

## 3. Dosya Yapisi

```
prompt-generator/
├── app/
│   ├── layout.tsx                    # Root layout (font, theme, providers)
│   ├── page.tsx                      # Dashboard (4 ajan paneli)
│   ├── globals.css                   # Tailwind + ozel stiller
│   │
│   ├── agent/
│   │   └── [agentId]/
│   │       └── page.tsx              # Ajan sohbet ekrani (dinamik route)
│   │
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts             # Ana sohbet API (streaming)
│   │   ├── boost/
│   │   │   ├── route.ts             # Boost orkestrasyon API
│   │   │   ├── evaluate/
│   │   │   │   └── route.ts         # Sonuc degerlendirme API
│   │   │   └── generate/
│   │   │       └── route.ts         # Hedef modele prompt gonderme
│   │   ├── models/
│   │   │   └── route.ts             # Mevcut model listesi ve durum
│   │   └── usage/
│   │       └── route.ts             # Maliyet ve kullanim takibi
│   │
│   └── settings/
│       └── page.tsx                  # API anahtarlari, tercihler
│
├── components/
│   ├── ui/                           # shadcn/ui bilesenler
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── scroll-area.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   ├── tabs.tsx
│   │   ├── textarea.tsx
│   │   └── tooltip.tsx
│   │
│   ├── chat/
│   │   ├── chat-container.tsx        # Ana sohbet konteyneri
│   │   ├── chat-input.tsx            # Mesaj girisi + gonder butonu
│   │   ├── chat-message.tsx          # Tek mesaj baloncugu
│   │   ├── chat-message-list.tsx     # Mesaj listesi (sanal kaydirma)
│   │   ├── streaming-indicator.tsx   # Yaziyor... animasyonu
│   │   ├── boost-button.tsx          # Boost tetikleyici
│   │   ├── boost-progress.tsx        # Boost ilerleme gosterimi
│   │   ├── prompt-output.tsx         # Son prompt gosterimi + kopyala
│   │   └── model-selector.tsx        # Hedef model secici
│   │
│   ├── dashboard/
│   │   ├── agent-card.tsx            # Tek ajan karti
│   │   ├── agent-grid.tsx            # 4 ajan grid duzeni
│   │   ├── recent-prompts.tsx        # Son uretilen promptlar
│   │   └── usage-stats.tsx           # Kullanim istatistikleri
│   │
│   ├── layout/
│   │   ├── header.tsx                # Ust bar (logo, nav, ayarlar)
│   │   ├── sidebar.tsx               # Sohbet gecmisi sidebar
│   │   └── theme-toggle.tsx          # Koyu/acik tema
│   │
│   └── settings/
│       ├── api-key-form.tsx          # API anahtar yonetimi
│       └── preferences-form.tsx      # Genel tercihler
│
├── lib/
│   ├── agents/
│   │   ├── types.ts                  # Ajan tip tanimlari
│   │   ├── registry.ts              # Ajan kayit defteri
│   │   ├── text-craft.ts            # TextCraft ajan tanimlamasi
│   │   ├── pixel-forge.ts           # PixelForge ajan tanimlamasi
│   │   ├── motion-lab.ts            # MotionLab ajan tanimlamasi
│   │   └── dimension-x.ts           # DimensionX ajan tanimlamasi
│   │
│   ├── ai/
│   │   ├── providers.ts             # Multi-provider yapilandirmasi
│   │   ├── models.ts                # Model tanimlari ve yetenekleri
│   │   ├── streaming.ts             # Streaming yardimci fonksiyonlari
│   │   └── tools.ts                 # Ajan araclari (web arama vb.)
│   │
│   ├── boost/
│   │   ├── orchestrator.ts          # Boost dongusu yonetimi
│   │   ├── evaluators/
│   │   │   ├── text-evaluator.ts    # Metin prompt degerlendirici
│   │   │   ├── image-evaluator.ts   # Gorsel sonuc degerlendirici
│   │   │   ├── video-evaluator.ts   # Video sonuc degerlendirici
│   │   │   └── model3d-evaluator.ts # 3D model degerlendirici
│   │   └── strategies.ts            # Iyilestirme stratejileri
│   │
│   ├── store/
│   │   ├── chat-store.ts            # Sohbet durumu (Zustand)
│   │   ├── settings-store.ts        # Ayarlar durumu
│   │   ├── history-store.ts         # Prompt gecmisi
│   │   └── usage-store.ts           # Kullanim/maliyet takibi
│   │
│   ├── db/
│   │   ├── index.ts                 # Dexie.js baslangic
│   │   ├── schema.ts                # IndexedDB sema
│   │   └── operations.ts           # CRUD islemleri
│   │
│   ├── utils/
│   │   ├── crypto.ts                # API anahtar sifreleme
│   │   ├── clipboard.ts             # Panoya kopyalama
│   │   ├── cost-calculator.ts       # Token/maliyet hesaplama
│   │   └── rate-limiter.ts          # Rate limiting
│   │
│   └── constants.ts                 # Sabitler
│
├── hooks/
│   ├── use-agent-chat.ts            # Ajan sohbeti hook'u
│   ├── use-boost.ts                 # Boost islemi hook'u
│   ├── use-prompt-history.ts        # Prompt gecmisi hook'u
│   └── use-copy-clipboard.ts        # Kopyalama hook'u
│
├── types/
│   ├── agent.ts                     # Ajan tipleri
│   ├── chat.ts                      # Sohbet tipleri
│   ├── prompt.ts                    # Prompt tipleri
│   ├── boost.ts                     # Boost tipleri
│   └── api.ts                       # API tipleri
│
├── public/
│   └── icons/                       # Ajan ikonlari
│
├── .env.local                       # API anahtarlari (gitignore'da)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Frontend Mimarisi

### 4.1 Dashboard Ekrani (`app/page.tsx`)

```
+------------------------------------------------------------------+
|  [Logo] Prompt Generator                    [Ayarlar] [Tema]     |
+------------------------------------------------------------------+
|                                                                    |
|  +------------------------+  +------------------------+           |
|  |    TextCraft            |  |    PixelForge           |          |
|  |    [Kalem Ikonu]        |  |    [Firca Ikonu]        |          |
|  |                         |  |                         |          |
|  |  LLM & Metin Uretimi   |  |  Gorsel Uretimi         |          |
|  |  Claude, GPT, Gemini   |  |  DALL-E, SD, Flux       |          |
|  |                         |  |                         |          |
|  |  Son: "Blog yazisi..."  |  |  Son: "Cyberpunk..."    |          |
|  |  [Sohbete Basla ->]     |  |  [Sohbete Basla ->]     |          |
|  +------------------------+  +------------------------+           |
|                                                                    |
|  +------------------------+  +------------------------+           |
|  |    MotionLab            |  |    DimensionX           |          |
|  |    [Film Ikonu]         |  |    [Kup Ikonu]          |          |
|  |                         |  |                         |          |
|  |  Video Uretimi          |  |  3D Model Uretimi       |          |
|  |  Sora, Runway, Kling    |  |  Meshy, Tripo, Rodin    |          |
|  |                         |  |                         |          |
|  |  Son: "Drone shot..."   |  |  Son: "Low-poly..."     |          |
|  |  [Sohbete Basla ->]     |  |  [Sohbete Basla ->]     |          |
|  +------------------------+  +------------------------+           |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  Son Promptlar                                                | |
|  |  [*] "Cinematic drone shot of Tokyo..." - MotionLab  2dk     | |
|  |  [*] "A whimsical 3D character..."     - DimensionX  15dk    | |
|  |  [*] "Write a technical blog post..."   - TextCraft   1sa    | |
|  +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

### 4.2 Ajan Sohbet Ekrani (`app/agent/[agentId]/page.tsx`)

```
+------------------------------------------------------------------+
|  [<- Geri]  PixelForge - Gorsel Prompt Uzmani     [Model: DALL-E]|
+------------------------------------------------------------------+
|  +--Gecmis--+  +--------------------------------------------+    |
|  | Oturum 1 |  |                                            |    |
|  | Oturum 2 |  |  [Bot] Merhaba! Gorsel prompt olusturmak   |    |
|  | Oturum 3 |  |  icin size yardimci olacagim.               |    |
|  |          |  |                                            |    |
|  |          |  |  Once su sorulari cevaplayin:               |    |
|  |          |  |  1. Ne tur bir gorsel istiyorsunuz?         |    |
|  |          |  |     (fotorealistik, dijital art, anime...) |    |
|  |          |  |  2. Ana konu/ozne nedir?                   |    |
|  |          |  |  3. Hangi model kullanacaksiniz?            |    |
|  |          |  |                                            |    |
|  |          |  |  [Siz] Fotorealistik bir portre, studio     |    |
|  |          |  |  isiklandirmasi, DALL-E 3 kullanacagim      |    |
|  |          |  |                                            |    |
|  |          |  |  [Bot] Harika! Birka c detay daha:          |    |
|  |          |  |  - Isik yonu ve renk sicakligi?             |    |
|  |          |  |  - Arka plan tercihi?                      |    |
|  |          |  |  - En-boy orani?                            |    |
|  |          |  |                                            |    |
|  |          |  |  +--------------------------------------+  |    |
|  |          |  |  | URETILEN PROMPT                      |  |    |
|  |          |  |  | "A photorealistic studio portrait..." |  |    |
|  |          |  |  | [Kopyala]  [Boost]  [Duzenle]        |  |    |
|  |          |  |  +--------------------------------------+  |    |
|  +----------+  +--------------------------------------------+    |
|                |  [Mesajinizi yazin...]          [Gonder ->]  |    |
+------------------------------------------------------------------+
```

### 4.3 Chat UI Bileseni Mimarisi

**shadcn/ui tabanli ozel sohbet bilesenleri** tercih edilmelidir. Hazir sohbet kutuphaneleri (chatscope, stream-chat-react vb.) geregindan fazla ozellik tasir ve ozellestirilmesi zordur.

Temel bilesenler:

```typescript
// components/chat/chat-container.tsx
// Ana konteyner - useChat hook'u ile Vercel AI SDK entegrasyonu

"use client";

import { useChat } from "ai/react";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";
import { BoostButton } from "./boost-button";
import { PromptOutput } from "./prompt-output";
import { ModelSelector } from "./model-selector";

interface ChatContainerProps {
  agentId: string; // "text-craft" | "pixel-forge" | "motion-lab" | "dimension-x"
}

export function ChatContainer({ agentId }: ChatContainerProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
    append,
  } = useChat({
    api: "/api/chat",
    body: { agentId, targetModel: selectedModel },
    onFinish: (message) => {
      // Prompt cikarilmissa prompt-output'u guncelle
      extractAndDisplayPrompt(message.content);
    },
  });

  // ... render
}
```

### 4.4 Streaming Gosterimi

Vercel AI SDK `useChat` hook'u streaming'i otomatik yonetir. Mesajlar token-by-token guncellenir:

```typescript
// Streaming donusumu icin ozel yaklasim gerekmiyor
// useChat hook'u bunu dahili olarak halleder

// Ancak ozel streaming gostergesi eklenebilir:
// components/chat/streaming-indicator.tsx

export function StreamingIndicator({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-muted-foreground">
      <div className="flex gap-1">
        <span className="animate-bounce delay-0 h-2 w-2 rounded-full bg-primary" />
        <span className="animate-bounce delay-150 h-2 w-2 rounded-full bg-primary" />
        <span className="animate-bounce delay-300 h-2 w-2 rounded-full bg-primary" />
      </div>
      <span className="text-sm">Ajan dusunuyor...</span>
    </div>
  );
}
```

### 4.5 Prompt Cikti Bileseni

```typescript
// components/chat/prompt-output.tsx

interface PromptOutputProps {
  prompt: string;
  targetModel: string;
  onBoost: () => void;
  onCopy: () => void;
  onEdit: (editedPrompt: string) => void;
}

export function PromptOutput({ prompt, targetModel, onBoost, onCopy, onEdit }: PromptOutputProps) {
  return (
    <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-primary">Uretilen Prompt</span>
        <span className="text-xs text-muted-foreground">Hedef: {targetModel}</span>
      </div>

      <div className="font-mono text-sm whitespace-pre-wrap mb-3">
        {prompt}
      </div>

      <div className="flex gap-2">
        <Button variant="default" size="sm" onClick={onBoost}>
          <Zap className="mr-1 h-4 w-4" />
          Boost
        </Button>
        <Button variant="outline" size="sm" onClick={onCopy}>
          <Copy className="mr-1 h-4 w-4" />
          Kopyala
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(prompt)}>
          <Pencil className="mr-1 h-4 w-4" />
          Duzenle
        </Button>
      </div>
    </div>
  );
}
```

---

## 5. Backend Mimarisi

### 5.1 API Route Tasarimi

```
/api/chat              POST  - Ana sohbet endpoint'i (streaming)
/api/boost             POST  - Boost orkestrasyon
/api/boost/generate    POST  - Hedef modele prompt gonder
/api/boost/evaluate    POST  - Sonucu degerlendir
/api/models            GET   - Mevcut model listesi
/api/usage             GET   - Kullanim istatistikleri
```

### 5.2 Ana Sohbet API'si (`app/api/chat/route.ts`)

```typescript
import { streamText, type CoreMessage } from "ai";
import { getProvider } from "@/lib/ai/providers";
import { getAgentConfig } from "@/lib/agents/registry";

export const runtime = "edge"; // Edge Runtime icin
export const maxDuration = 60; // 60 saniye timeout

export async function POST(req: Request) {
  const { messages, agentId, targetModel } = await req.json();

  // Ajan yapilandirmasini al
  const agentConfig = getAgentConfig(agentId);

  // Orkestrasyon LLM'ini belirle (ajan sohbeti icin her zaman Claude veya GPT kullanilir)
  const orchestratorModel = getProvider("anthropic")("claude-sonnet-4-20250514");

  // Sistem promptunu olustur
  const systemPrompt = agentConfig.buildSystemPrompt({
    targetModel,
    conversationPhase: detectPhase(messages), // intake | clarification | generation | refinement
  });

  const result = streamText({
    model: orchestratorModel,
    system: systemPrompt,
    messages: messages as CoreMessage[],
    tools: agentConfig.tools, // Ajan araclari
    maxSteps: 5, // Tool calling icin maksimum adim
    temperature: 0.7,
    onFinish: async ({ text, usage }) => {
      // Kullanim takibi (edge'de async)
      // usage-store'a kaydet
    },
  });

  return result.toDataStreamResponse();
}
```

### 5.3 Multi-Provider Yonetimi (`lib/ai/providers.ts`)

```typescript
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// API anahtarlari .env.local'dan veya istemciden gelir
// Kisisel kullanim: .env.local yeterli

export type ProviderName =
  | "openai"
  | "anthropic"
  | "google"
  | "kimi"
  | "qwen";

const providers = {
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),

  anthropic: createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  }),

  google: createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_AI_API_KEY,
  }),

  // Kimi ve Qwen OpenAI-uyumlu API sundugu icin
  // createOpenAI ile baseURL degistirerek kullanilir
  kimi: createOpenAI({
    apiKey: process.env.KIMI_API_KEY,
    baseURL: "https://api.moonshot.cn/v1",
  }),

  qwen: createOpenAI({
    apiKey: process.env.QWEN_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
  }),
};

export function getProvider(name: ProviderName) {
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Bilinmeyen provider: ${name}`);
  }
  return provider;
}
```

### 5.4 Model Tanimlari (`lib/ai/models.ts`)

```typescript
export interface ModelDefinition {
  id: string;
  provider: ProviderName;
  modelId: string;       // Provider'a gonderilecek model ID
  name: string;          // Gorunen ad
  category: AgentCategory[];
  capabilities: string[];
  costPer1kInput: number;  // USD cinsinden
  costPer1kOutput: number;
  maxTokens: number;
  supportsStreaming: boolean;
  supportsImages: boolean;
  supportsVideo: boolean;
}

export const MODELS: Record<string, ModelDefinition> = {
  // --- Metin Modelleri (TextCraft icin) ---
  "claude-sonnet-4": {
    id: "claude-sonnet-4",
    provider: "anthropic",
    modelId: "claude-sonnet-4-20250514",
    name: "Claude Sonnet 4",
    category: ["text"],
    capabilities: ["text-generation", "analysis", "code"],
    costPer1kInput: 0.003,
    costPer1kOutput: 0.015,
    maxTokens: 200000,
    supportsStreaming: true,
    supportsImages: true,
    supportsVideo: false,
  },
  "gpt-4o": {
    id: "gpt-4o",
    provider: "openai",
    modelId: "gpt-4o",
    name: "GPT-4o",
    category: ["text"],
    capabilities: ["text-generation", "analysis", "code", "vision"],
    costPer1kInput: 0.0025,
    costPer1kOutput: 0.01,
    maxTokens: 128000,
    supportsStreaming: true,
    supportsImages: true,
    supportsVideo: false,
  },
  // --- Gorsel Modelleri (PixelForge icin) ---
  "dall-e-3": {
    id: "dall-e-3",
    provider: "openai",
    modelId: "dall-e-3",
    name: "DALL-E 3",
    category: ["image"],
    capabilities: ["text-to-image"],
    costPer1kInput: 0, // Gorsel basina fiyat
    costPer1kOutput: 0,
    maxTokens: 4000,
    supportsStreaming: false,
    supportsImages: false,
    supportsVideo: false,
  },
  // ... diger modeller
};

// Kategoriye gore model filtrele
export function getModelsByCategory(category: AgentCategory): ModelDefinition[] {
  return Object.values(MODELS).filter(m => m.category.includes(category));
}
```

### 5.5 Rate Limiting (`lib/utils/rate-limiter.ts`)

Kisisel kullanim icin basit bir in-memory rate limiter yeterlidir:

```typescript
// Basit sliding window rate limiter
const rateLimits = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  provider: string,
  maxRequests: number = 10,
  windowMs: number = 60_000
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const key = provider;
  const entry = rateLimits.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfter: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true };
}
```

### 5.6 Oturum Durumu Yonetimi

```typescript
// lib/store/chat-store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChatSession {
  id: string;
  agentId: string;
  messages: Message[];
  generatedPrompts: GeneratedPrompt[];
  targetModel: string;
  createdAt: number;
  updatedAt: number;
}

interface ChatStore {
  sessions: Record<string, ChatSession>;
  activeSessionId: string | null;

  createSession: (agentId: string) => string;
  getSession: (sessionId: string) => ChatSession | undefined;
  addMessage: (sessionId: string, message: Message) => void;
  addGeneratedPrompt: (sessionId: string, prompt: GeneratedPrompt) => void;
  setActiveSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: {},
      activeSessionId: null,

      createSession: (agentId) => {
        const id = crypto.randomUUID();
        set((state) => ({
          sessions: {
            ...state.sessions,
            [id]: {
              id,
              agentId,
              messages: [],
              generatedPrompts: [],
              targetModel: getDefaultModel(agentId),
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          },
          activeSessionId: id,
        }));
        return id;
      },
      // ... diger metodlar
    }),
    {
      name: "prompt-gen-chat-store",
      // Buyuk veri icin IndexedDB'ye gecis
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

---

## 6. Ajan Sistemi Tasarimi

### 6.1 Ajan Tip Tanimlari (`lib/agents/types.ts`)

```typescript
export type AgentCategory = "text" | "image" | "video" | "3d";

export interface AgentConfig {
  id: string;
  name: string;
  category: AgentCategory;
  description: string;
  icon: string;
  color: string; // Tailwind renk sinifi

  // Sistem promptu olusturucu
  buildSystemPrompt: (context: AgentContext) => string;

  // Ajan araclari
  tools: Record<string, Tool>;

  // Konusma akisi tanimlari
  conversationFlow: ConversationFlow;

  // Desteklenen hedef modeller
  supportedModels: string[];
}

export interface AgentContext {
  targetModel: string;
  conversationPhase: ConversationPhase;
  previousPrompts?: string[]; // Onceki uretilen promptlar (iyilestirme icin)
  boostFeedback?: string;     // Boost sonucu geri bildirim
}

export type ConversationPhase =
  | "intake"          // Ilk bilgi toplama
  | "clarification"   // Detaylandirma sorulari
  | "generation"      // Prompt uretimi
  | "refinement"      // Iyilestirme
  | "boost";          // Boost dongusunde

export interface ConversationFlow {
  phases: {
    [K in ConversationPhase]: {
      description: string;
      requiredFields: string[];
      questions: QuestionTemplate[];
      transitionCondition: string; // LLM'in degerlendirmesi icin
    };
  };
}
```

### 6.2 Ornek Ajan: PixelForge (`lib/agents/pixel-forge.ts`)

```typescript
import { AgentConfig, AgentContext } from "./types";
import { z } from "zod";

export const pixelForgeAgent: AgentConfig = {
  id: "pixel-forge",
  name: "PixelForge",
  category: "image",
  description: "Gorsel uretimi icin optimize edilmis prompt uzmanı",
  icon: "paintbrush",
  color: "text-violet-500",

  supportedModels: ["dall-e-3", "stable-diffusion-xl", "flux-1-pro", "midjourney-v6"],

  buildSystemPrompt: (context: AgentContext) => {
    const basePrompt = `Sen "PixelForge" adinda bir gorsel prompt muhendisisin. Gorevin,
kullanicinin istedigini en yuksek kalitede gorsel promptlara donusturmektir.

## KIMLIGIN
- Gorsel sanat, fotografi, dijital tasarim konularinda uzmansin
- Diffusion modellerinin (DALL-E, Stable Diffusion, Flux, Midjourney) ic calisma
  prensiplerini bilirsin
- CLIP text encoder sinirlamalarini anlarsin
- Her modelin kendine ozgu prompt formatini bilirsin

## HEDEF MODEL: ${context.targetModel}

## MODEL-SPESIFIK KURALLAR
${getModelSpecificRules(context.targetModel)}

## KONUSMA KURALLARI
- Turkce konusursun ama promptlari INGILIZCE uretirsin (modeller Ingilizce'de daha iyi)
- Her zaman sorular sorarak baslarsın
- Kullanicinin seviyesine uyum saglarsın (baslangic vs uzman)
- Promptu olusturduktan sonra neden o kelimeleri sectigini aciklarsın

## PROMPT MUHENDISLIGI PRENSIPLERI
1. Ozne (Subject): Kim/ne? Detayli fiziksel tanimlama
2. Ortam (Environment): Nerede? Isik, hava, zaman
3. Stil (Style): Fotorealistik, dijital art, anime, oil painting...
4. Kompozisyon (Composition): Kamera acisi, cerceveleme, odak
5. Isik (Lighting): Dogal, studio, dramatik, siluet...
6. Renk (Color): Palet, kontrast, doygunluk
7. Kalite (Quality): Cozunurluk etiketleri, render motoru
8. Negatif (Negative): Ne OLMAMASI gerektigi (ayri alan icin)

## OLUMSUZLUK KURALI
- ASLA prompt icinde "without", "no", "not" kullanma
- Bunlar negative prompt alanina gider
- "not smiling" yerine "serious expression" kullan

## PROMPT SABLONU
[Stil] [Ozne detayi], [ortam], [isik], [renk], [kamera], [kalite etiketleri]`;

    // Faz-spesifik ek talimatlar
    const phaseInstructions = {
      intake: `
## MEVCUT FAZ: BILGI TOPLAMA
Kullaniciya su kategorilerde sorular sor:
1. Genel konsept/fikir nedir?
2. Stil tercihi (fotorealistik, illustrasyon, anime, abstract...)?
3. Ruh hali / atmosfer nasil olmali?
4. Herhangi bir referans gorsel veya sanatci referansi var mi?
Su anda prompt URETME, sadece bilgi topla.`,

      clarification: `
## MEVCUT FAZ: DETAYLANDIRMA
Toplanan bilgilere dayanarak spesifik detaylari sor:
- Isik yonu ve renk sicakligi
- Arka plan tercihi
- En-boy orani (1:1, 16:9, 9:16, 4:3)
- Ozel teknik gereksinimler
- Kamera acisi ve lens secimi
Yeterli bilgi toplandiysa prompt uretim fazina gec.`,

      generation: `
## MEVCUT FAZ: PROMPT URETIMI
Toplanan tum bilgileri kullanarak:
1. Tam promptu INGILIZCE olustur
2. Eger model destekliyorsa negative promptu ayri ver
3. Onerilen parametreleri listele (boyut, adim sayisi, CFG vb.)
4. Neden bu kelimeleri sectigini Turkce acikla
Promptu ozel bir formatta sun: \`\`\`prompt ... \`\`\` blogu icinde`,

      refinement: `
## MEVCUT FAZ: IYILESTIRME
Kullanici geri bildirimi dogrultusunda promptu guncelle.
- Degisiklikleri acikla
- Alternatifl er sun
- Onceki ve yeni versiyonu karsilastir`,

      boost: `
## MEVCUT FAZ: BOOST IYILESTIRME
Boost sonucu geri bildirim: ${context.boostFeedback || "Bekleniyor..."}
Bu geri bildirime dayanarak promptu iyilestir.
Neleri degistirdigini ve neden degistirdigini acikla.`,
    };

    return basePrompt + (phaseInstructions[context.conversationPhase] || "");
  },

  tools: {
    // Gorsel analiz araci (Boost icin)
    analyzeImage: {
      description: "Uretilen gorseli analiz eder ve geri bildirim verir",
      parameters: z.object({
        imageUrl: z.string().url(),
        originalPrompt: z.string(),
        criteria: z.array(z.string()),
      }),
    },
    // Stil referansi arama
    searchStyleReference: {
      description: "Sanat stili veya sanatci hakkinda bilgi arar",
      parameters: z.object({
        query: z.string(),
      }),
    },
  },

  conversationFlow: {
    phases: {
      intake: {
        description: "Temel bilgi toplama",
        requiredFields: ["concept", "style", "mood"],
        questions: [
          { field: "concept", question: "Ne tur bir gorsel olusturmak istiyorsunuz?" },
          { field: "style", question: "Stil tercihiniz nedir?" },
          { field: "mood", question: "Gorsel hangi atmosferi yansitmali?" },
        ],
        transitionCondition: "concept, style ve mood bilgileri alindi",
      },
      clarification: {
        description: "Detay toplama",
        requiredFields: ["lighting", "composition", "aspectRatio"],
        questions: [
          { field: "lighting", question: "Isiklandirma nasil olmali?" },
          { field: "composition", question: "Kamera acisi/cerceveleme tercihiniz?" },
          { field: "aspectRatio", question: "En-boy orani?" },
        ],
        transitionCondition: "Yeterli teknik detay toplandi",
      },
      generation: {
        description: "Prompt uretimi",
        requiredFields: [],
        questions: [],
        transitionCondition: "Prompt uretildi ve kullaniciya sunuldu",
      },
      refinement: {
        description: "Prompt iyilestirme",
        requiredFields: [],
        questions: [],
        transitionCondition: "Kullanici prompttan memnun",
      },
      boost: {
        description: "Otomatik iyilestirme",
        requiredFields: [],
        questions: [],
        transitionCondition: "Boost dongusu tamamlandi",
      },
    },
  },
};

function getModelSpecificRules(modelId: string): string {
  const rules: Record<string, string> = {
    "dall-e-3": `
- DALL-E 3 dogal dil promptlarini tercih eder (etiket listesi yerine)
- Maksimum prompt uzunlugu: ~4000 karakter
- Boyutlar: 1024x1024, 1024x1792, 1792x1024
- Stil: "natural" veya "vivid"
- DALL-E 3 promptu dahili olarak yeniden yazar, bunu goz onunde bulundur`,

    "stable-diffusion-xl": `
- SDXL virgul ile ayrilmis etiket formatini tercih eder
- Kalite etiketleri ekle: masterpiece, best quality, highly detailed
- Negative prompt onemli: lowres, bad anatomy, bad hands, cropped, worst quality
- CFG Scale genelde 7-12 arasi
- Adim sayisi: 30-50 arasi (DPM++ 2M Karras)`,

    "flux-1-pro": `
- Flux dogal dil ve etiket karisimini iyi isler
- Yuksek estetik kalite uretir
- Metin render edebilir (text in image)
- Guidance scale genelde 3.5-7 arasi`,

    "midjourney-v6": `
- Midjourney v6 dogal dil promptlarini tercih eder
- --ar parametresi ile en-boy orani
- --s (stylize) parametresi: 0-1000
- --c (chaos) parametresi: 0-100
- --q (quality) parametresi: .25, .5, 1
- --style raw icin daha az Midjourney etkisi`,
  };

  return rules[modelId] || "Standart prompt kurallari uygula.";
}
```

### 6.3 Ajan Kayit Defteri (`lib/agents/registry.ts`)

```typescript
import { textCraftAgent } from "./text-craft";
import { pixelForgeAgent } from "./pixel-forge";
import { motionLabAgent } from "./motion-lab";
import { dimensionXAgent } from "./dimension-x";
import type { AgentConfig } from "./types";

const agents: Record<string, AgentConfig> = {
  "text-craft": textCraftAgent,
  "pixel-forge": pixelForgeAgent,
  "motion-lab": motionLabAgent,
  "dimension-x": dimensionXAgent,
};

export function getAgentConfig(agentId: string): AgentConfig {
  const agent = agents[agentId];
  if (!agent) {
    throw new Error(`Bilinmeyen ajan: ${agentId}`);
  }
  return agent;
}

export function getAllAgents(): AgentConfig[] {
  return Object.values(agents);
}
```

### 6.4 Konusma Fazlari ve Gecisleri

Faz gecisi ajanin kendi yapay zekasi tarafindan belirlenir. Sistem promptundaki talimatlar LLM'e hangi fazda oldugunu ve ne zaman gecis yapmasi gerektigini soyler.

```
KONUSMA AKISI:

  [Baslangic]
      |
      v
  +--------+     Yeterli bilgi     +--------------+
  | INTAKE |---toplandiysa-------->| CLARIFICATION |
  +--------+                       +--------------+
      ^                                   |
      |                          Detaylar tamamsa
      |                                   |
      |                                   v
      |                            +----------+
      |                            | GENERATION|
      |                            +----------+
      |                                   |
      |                          Prompt uretildi
      |                                   |
      |                          +--------+--------+
      |                          |                  |
      |                          v                  v
      |                    +-----------+      +-------+
      +----Yeniden---------|REFINEMENT |      | BOOST |
           basla           +-----------+      +-------+
                                |                  |
                                v                  v
                          [Kullanici       [Otomatik
                           memnun]          iyilestirme
                                            dongusu]
```

### 6.5 Faz Algilama Mekanizmasi

```typescript
// lib/agents/phase-detector.ts

export function detectPhase(messages: Message[]): ConversationPhase {
  if (messages.length <= 1) return "intake";

  const lastAssistantMessage = messages
    .filter(m => m.role === "assistant")
    .at(-1);

  if (!lastAssistantMessage) return "intake";

  // Prompt blogu varsa generation fazindayiz
  if (lastAssistantMessage.content.includes("```prompt")) {
    return "generation";
  }

  // Boost geri bildirimi varsa
  if (lastAssistantMessage.content.includes("[BOOST_FEEDBACK]")) {
    return "boost";
  }

  // Mesaj sayisina gore kabaca tahmin
  const userMessages = messages.filter(m => m.role === "user").length;
  if (userMessages <= 2) return "intake";
  if (userMessages <= 4) return "clarification";

  return "refinement";
}
```

**NOT:** Yukaridaki sezgisel (heuristic) algilama basit bir baslangic noktasidir. Daha gelismis bir yaklasim olarak, LLM'den structured output ile mevcut fazi sormak mumkundur:

```typescript
// Gelismis faz algilama - LLM tabanlı
import { generateObject } from "ai";
import { z } from "zod";

async function detectPhaseWithLLM(messages: Message[]): Promise<ConversationPhase> {
  const { object } = await generateObject({
    model: orchestratorModel,
    schema: z.object({
      phase: z.enum(["intake", "clarification", "generation", "refinement"]),
      reasoning: z.string(),
    }),
    prompt: `Konusma gecmisine bak ve mevcut fazi belirle: ${JSON.stringify(messages.slice(-6))}`,
  });
  return object.phase;
}
```

---

## 7. Boost Ozelligi Mimarisi

### 7.1 Genel Akis

```
BOOST DONGUSU:

  [Kullanicinin Promptu]
          |
          v
  +------------------+
  | 1. HEDEF MODELE  |
  |    GONDER        |------> [Hedef API: DALL-E, Sora, vb.]
  +------------------+
          |
          v (Sonuc: gorsel/video/3D/metin)
  +------------------+
  | 2. SONUCU        |
  |    DEGERLENDIR   |------> [Degerlendirici LLM: GPT-4o vision]
  +------------------+
          |
          v (Degerlendirme raporu)
  +------------------+
  | 3. PROMPTU       |
  |    IYILESTIR     |------> [Prompt Muhendisi LLM]
  +------------------+
          |
          v
  +------------------+     Kalite yeterli mi?
  | 4. KARAR VER     |------- Evet --> [Son Prompt]
  +------------------+
          |
          Hayir (maks 3 iterasyon)
          |
          v
    [1. ADIMA DON]
```

### 7.2 Boost Orkestrator (`lib/boost/orchestrator.ts`)

```typescript
import { generateText, generateObject } from "ai";
import { z } from "zod";
import { getProvider } from "@/lib/ai/providers";

export interface BoostConfig {
  maxIterations: number;       // Varsayilan: 3
  qualityThreshold: number;    // 0-100, varsayilan: 80
  costLimit: number;           // USD cinsinden maks harcama
  evaluatorModel: string;      // Degerlendirici model (genelde GPT-4o)
  optimizerModel: string;      // Iyilestirici model (genelde Claude)
}

export interface BoostResult {
  originalPrompt: string;
  finalPrompt: string;
  iterations: BoostIteration[];
  totalCost: number;
  finalScore: number;
}

export interface BoostIteration {
  iterationNumber: number;
  prompt: string;
  result: GenerationResult;
  evaluation: EvaluationResult;
  improvedPrompt?: string;
  cost: number;
}

export async function runBoostLoop(
  agentId: string,
  prompt: string,
  targetModel: string,
  config: BoostConfig = defaultConfig
): Promise<BoostResult> {
  const iterations: BoostIteration[] = [];
  let currentPrompt = prompt;
  let totalCost = 0;

  for (let i = 0; i < config.maxIterations; i++) {
    // 1. Hedef modele prompt gonder
    const generationResult = await generateWithTargetModel(
      currentPrompt,
      targetModel
    );
    totalCost += generationResult.cost;

    // Maliyet limiti kontrolu
    if (totalCost > config.costLimit) {
      break;
    }

    // 2. Sonucu degerlendir
    const evaluation = await evaluateResult(
      currentPrompt,
      generationResult,
      agentId,
      config.evaluatorModel
    );
    totalCost += evaluation.cost;

    // 3. Kalite yeterli mi?
    if (evaluation.score >= config.qualityThreshold) {
      iterations.push({
        iterationNumber: i + 1,
        prompt: currentPrompt,
        result: generationResult,
        evaluation,
        cost: generationResult.cost + evaluation.cost,
      });
      break;
    }

    // 4. Promptu iyilestir
    const improved = await improvePrompt(
      currentPrompt,
      evaluation,
      agentId,
      targetModel,
      config.optimizerModel
    );
    totalCost += improved.cost;

    iterations.push({
      iterationNumber: i + 1,
      prompt: currentPrompt,
      result: generationResult,
      evaluation,
      improvedPrompt: improved.prompt,
      cost: generationResult.cost + evaluation.cost + improved.cost,
    });

    currentPrompt = improved.prompt;
  }

  return {
    originalPrompt: prompt,
    finalPrompt: currentPrompt,
    iterations,
    totalCost,
    finalScore: iterations.at(-1)?.evaluation.score ?? 0,
  };
}

const defaultConfig: BoostConfig = {
  maxIterations: 3,
  qualityThreshold: 80,
  costLimit: 1.0, // 1 USD
  evaluatorModel: "gpt-4o", // Vision destegi icin
  optimizerModel: "claude-sonnet-4-20250514",
};
```

### 7.3 Hedef Modele Gonderme

```typescript
// lib/boost/orchestrator.ts (devam)

interface GenerationResult {
  type: "text" | "image" | "video" | "3d";
  content: string;        // Metin icin cikti, gorsel/video/3D icin URL
  metadata: Record<string, unknown>;
  cost: number;
}

async function generateWithTargetModel(
  prompt: string,
  targetModel: string
): Promise<GenerationResult> {
  const modelDef = MODELS[targetModel];

  switch (modelDef.category[0]) {
    case "text": {
      // Metin modeli icin
      const provider = getProvider(modelDef.provider);
      const result = await generateText({
        model: provider(modelDef.modelId),
        prompt,
        maxTokens: 1000,
      });
      return {
        type: "text",
        content: result.text,
        metadata: { usage: result.usage },
        cost: calculateCost(result.usage, modelDef),
      };
    }

    case "image": {
      // DALL-E 3 ornegi
      if (modelDef.provider === "openai") {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt,
          n: 1,
          size: "1024x1024",
          quality: "hd",
          response_format: "url",
        });
        return {
          type: "image",
          content: response.data[0].url!,
          metadata: { revised_prompt: response.data[0].revised_prompt },
          cost: 0.08, // DALL-E 3 HD 1024x1024 fiyati
        };
      }
      // Diger gorsel modeller...
      break;
    }

    case "video": {
      // Video API'leri genelde asenkron calisir
      // Sora API ornegi (varsayimsal - API yapisina gore uyarlanmali)
      // Gercek implementasyon API dokumantasyonuna bagli
      return {
        type: "video",
        content: "video_generation_job_id",
        metadata: { status: "processing", estimatedTime: 120 },
        cost: 0.10,
      };
    }

    case "3d": {
      // 3D model API'leri (Meshy, Tripo vb.)
      return {
        type: "3d",
        content: "model_generation_job_id",
        metadata: { status: "processing" },
        cost: 0.05,
      };
    }
  }

  throw new Error(`Desteklenmeyen model kategorisi: ${modelDef.category}`);
}
```

### 7.4 Degerlendirme Sistemi

Her alan icin farkli degerlendirme kriterleri:

```typescript
// lib/boost/evaluators/image-evaluator.ts

import { generateObject } from "ai";
import { z } from "zod";

const ImageEvaluationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  criteria: z.object({
    promptAdherence: z.number().min(0).max(100)
      .describe("Prompt ile gorsel arasindaki uyum"),
    technicalQuality: z.number().min(0).max(100)
      .describe("Teknik kalite: cozunurluk, netlik, artefakt yoksugu"),
    composition: z.number().min(0).max(100)
      .describe("Kompozisyon: cerceveleme, denge, gorsel hiyerarsi"),
    aesthetics: z.number().min(0).max(100)
      .describe("Estetik: renk uyumu, isik kalitesi, genel cezbedicilik"),
    anatomyAccuracy: z.number().min(0).max(100)
      .describe("Anatomi dogrulugu: el, yuz, vücut oranlari"),
    textRendering: z.number().min(0).max(100)
      .describe("Metin okunabilirligi (eger gorsel metin iceriyorsa)"),
  }),
  strengths: z.array(z.string())
    .describe("Gorselin guclu yanlari"),
  weaknesses: z.array(z.string())
    .describe("Gorselin zayif yanlari / iyilestirilecek noktalar"),
  specificSuggestions: z.array(z.string())
    .describe("Promptu iyilestirmek icin spesifik oneriler"),
});

export async function evaluateImage(
  prompt: string,
  imageUrl: string,
  evaluatorModel: string
): Promise<EvaluationResult> {
  const provider = getProvider("openai"); // Vision icin GPT-4o

  const { object } = await generateObject({
    model: provider(evaluatorModel),
    schema: ImageEvaluationSchema,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Bu gorsel asagidaki prompt ile uretildi. Gorseli degerlendir.

PROMPT: "${prompt}"

Degerlendirme kriterleri:
1. Prompt ile uyum (prompt ne diyorsa gorsel onu gosteriyor mu?)
2. Teknik kalite (cozunurluk, netlik, artefaktlar)
3. Kompozisyon (cerceveleme, denge)
4. Estetik (renk, isik, genel etki)
5. Anatomi dogrulugu (insanlar varsa)
6. Metin okunabilirligi (metin varsa)

Her kriter 0-100 arasi puan ver. Guclu ve zayif yanlari listele.
Promptu iyilestirmek icin spesifik oneriler ver.`,
          },
          {
            type: "image",
            image: imageUrl,
          },
        ],
      },
    ],
  });

  return {
    score: object.overallScore,
    details: object,
    cost: 0.01, // Yakla sik maliyet
  };
}
```

```typescript
// lib/boost/evaluators/text-evaluator.ts

const TextEvaluationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  criteria: z.object({
    relevance: z.number().min(0).max(100)
      .describe("Prompt talimatlarıyla uyum"),
    quality: z.number().min(0).max(100)
      .describe("Dil kalitesi, akicilik, tutarlilik"),
    creativity: z.number().min(0).max(100)
      .describe("Yaraticilik ve ozgunluk"),
    structure: z.number().min(0).max(100)
      .describe("Yapi, organizasyon, format uyumu"),
    depth: z.number().min(0).max(100)
      .describe("Derinlik, detay seviyesi"),
  }),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  specificSuggestions: z.array(z.string()),
});
```

### 7.5 Prompt Iyilestirme

```typescript
// lib/boost/orchestrator.ts (devam)

async function improvePrompt(
  currentPrompt: string,
  evaluation: EvaluationResult,
  agentId: string,
  targetModel: string,
  optimizerModel: string
): Promise<{ prompt: string; cost: number }> {
  const agentConfig = getAgentConfig(agentId);

  const result = await generateText({
    model: getProvider("anthropic")(optimizerModel),
    system: `Sen bir prompt optimizasyon uzmanisın.
Hedef model: ${targetModel}
Alan: ${agentConfig.category}

Sana mevcut promptu, degerlendirme sonuclarini ve iyilestirme onerilerini verecegim.
Yeni bir optimize edilmis prompt uret.
SADECE yeni promptu dondur, aciklama yapma.`,

    prompt: `MEVCUT PROMPT:
${currentPrompt}

DEGERLENDIRME SKORU: ${evaluation.score}/100

ZAYIF YANLAR:
${evaluation.details.weaknesses.map((w: string) => `- ${w}`).join("\n")}

IYILESTIRME ONERILERI:
${evaluation.details.specificSuggestions.map((s: string) => `- ${s}`).join("\n")}

Yukaridaki geri bildirime dayanarak iyilestirilmis promptu uret.`,

    maxTokens: 2000,
  });

  return {
    prompt: result.text.trim(),
    cost: calculateCost(result.usage, MODELS[optimizerModel]),
  };
}
```

### 7.6 Boost UI Akisi

```typescript
// hooks/use-boost.ts

import { useState, useCallback } from "react";
import type { BoostResult, BoostIteration } from "@/lib/boost/orchestrator";

export function useBoost() {
  const [isRunning, setIsRunning] = useState(false);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [iterations, setIterations] = useState<BoostIteration[]>([]);
  const [result, setResult] = useState<BoostResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startBoost = useCallback(async (
    agentId: string,
    prompt: string,
    targetModel: string,
    maxIterations: number = 3
  ) => {
    setIsRunning(true);
    setCurrentIteration(0);
    setIterations([]);
    setResult(null);
    setError(null);

    try {
      // Boost API'sine istek gonder
      const response = await fetch("/api/boost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, prompt, targetModel, maxIterations }),
      });

      // Streaming SSE ile iterasyon guncellemeleri
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const events = chunk.split("\n\n").filter(Boolean);

        for (const event of events) {
          const data = JSON.parse(event.replace("data: ", ""));

          switch (data.type) {
            case "iteration_start":
              setCurrentIteration(data.iteration);
              break;
            case "generation_complete":
              // Uretim tamamlandi gosterimi
              break;
            case "evaluation_complete":
              setIterations(prev => [...prev, data.iteration]);
              break;
            case "complete":
              setResult(data.result);
              break;
            case "error":
              setError(data.message);
              break;
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata");
    } finally {
      setIsRunning(false);
    }
  }, []);

  const cancelBoost = useCallback(() => {
    // AbortController ile iptal
    setIsRunning(false);
  }, []);

  return {
    isRunning,
    currentIteration,
    iterations,
    result,
    error,
    startBoost,
    cancelBoost,
  };
}
```

---

## 8. Veri Akis Diyagramlari

### 8.1 Ana Sohbet Akisi

```
                    KULLANICI
                       |
                       | (mesaj gonderir)
                       v
              +------------------+
              |   ChatInput      |
              |   (React)        |
              +------------------+
                       |
                       | (useChat hook)
                       v
              +------------------+
              |  /api/chat       |
              |  (Edge Runtime)  |
              +------------------+
                       |
        +--------------+--------------+
        |                             |
        v                             v
+---------------+            +------------------+
| Agent         |            | Vercel AI SDK    |
| Registry      |            | streamText()     |
| (sistem       |            |                  |
|  promptu)     |            | Provider:        |
+---------------+            | Claude/GPT/      |
                             | Gemini           |
                             +------------------+
                                      |
                                      | (streaming tokens)
                                      v
                             +------------------+
                             |  useChat         |
                             |  (otomatik       |
                             |   guncelleme)    |
                             +------------------+
                                      |
                                      v
                             +------------------+
                             |  ChatMessageList |
                             |  (gercek zamanli |
                             |   render)        |
                             +------------------+
```

### 8.2 Boost Akisi

```
BOOST BUTONU TIKLANDI
        |
        v
+------------------+
|  /api/boost      |-----> SSE Stream baslat
|  (Node Runtime)  |
+------------------+
        |
        |  Iterasyon 1..N
        |
        v
+------------------+     +-------------------+
| 1. generateWith  |---->| Hedef API         |
|    TargetModel() |     | (DALL-E/Sora/...) |
+------------------+     +-------------------+
        |                         |
        |  <--- sonuc (URL) ------+
        v
+------------------+     +-------------------+
| 2. evaluate      |---->| Degerlendirici    |
|    Result()      |     | LLM (GPT-4o      |
+------------------+     | vision)           |
        |                +-------------------+
        |                         |
        |  <--- skor + geri ------+
        |        bildirim
        v
+------------------+
| 3. Skor >= 80?   |
+------------------+
    |           |
   Evet        Hayir
    |           |
    v           v
[BITIR]   +------------------+     +-------------------+
          | 4. improve       |---->| Optimizer LLM     |
          |    Prompt()      |     | (Claude Sonnet)   |
          +------------------+     +-------------------+
                  |                         |
                  |  <--- yeni prompt ------+
                  v
           [ADIM 1'E DON]
```

### 8.3 Veri Depolama Akisi

```
+------------------+     +------------------+     +------------------+
|   ZUSTAND        |     |   localStorage   |     |   IndexedDB      |
|   (Bellek)       |     |   (Kucuk veri)   |     |   (Buyuk veri)   |
+------------------+     +------------------+     +------------------+
|                  |     |                  |     |                  |
| - Aktif sohbet   |     | - API anahtarlar |     | - Sohbet gecmisi |
| - UI durumu      |     | - Tema tercihi   |     | - Prompt arsivi  |
| - Gecici sohbet  |     | - Son model      |     | - Boost sonuclari|
|   verileri       |     |   secimleri      |     | - Gorsel cache   |
|                  |     | - Rate limit     |     |                  |
|                  |     |   sayaclari      |     |                  |
+------------------+     +------------------+     +------------------+
        |                        |                        |
        | persist                |                        |
        | middleware             |                        |
        +----------->-----------+                        |
                                                         |
        Dexie.js ile IndexedDB CRUD <--------------------+
```

---

## 9. API Yonetimi ve Maliyet Kontrolu

### 9.1 API Anahtar Yonetimi

```typescript
// lib/utils/crypto.ts

// Tarayici tarafinda basit sifreleme (SubtleCrypto API)
// NOT: Bu "gercek guvenlik" degildir, sadece duz metin
// olarak saklanmasini engeller. Kisisel kullanim icin yeterli.

const ENCRYPTION_KEY = "prompt-gen-personal"; // Sabit anahtar

export async function encryptApiKey(plainKey: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainKey);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(ENCRYPTION_KEY.padEnd(32, "0").slice(0, 32)),
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    keyMaterial,
    data
  );

  // IV + sifreli veri birlikte dondur
  const combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
}

export async function decryptApiKey(encryptedKey: string): Promise<string> {
  // Ters islem...
}
```

### 9.2 Maliyet Takip Sistemi

```typescript
// lib/store/usage-store.ts

interface UsageEntry {
  timestamp: number;
  provider: string;
  model: string;
  operation: "chat" | "boost-generate" | "boost-evaluate" | "boost-optimize";
  inputTokens: number;
  outputTokens: number;
  cost: number; // USD
  agentId: string;
}

interface UsageStore {
  entries: UsageEntry[];
  dailyLimit: number; // USD
  monthlyLimit: number; // USD

  addEntry: (entry: Omit<UsageEntry, "timestamp">) => void;
  getDailyCost: () => number;
  getMonthlyCost: () => number;
  isOverDailyLimit: () => boolean;
  isOverMonthlyLimit: () => boolean;
  getCostByProvider: () => Record<string, number>;
  getCostByAgent: () => Record<string, number>;
}

export const useUsageStore = create<UsageStore>()(
  persist(
    (set, get) => ({
      entries: [],
      dailyLimit: 5.0,   // Varsayilan 5 USD/gun
      monthlyLimit: 50.0, // Varsayilan 50 USD/ay

      addEntry: (entry) => {
        set((state) => ({
          entries: [...state.entries, { ...entry, timestamp: Date.now() }],
        }));
      },

      getDailyCost: () => {
        const today = new Date().toDateString();
        return get().entries
          .filter(e => new Date(e.timestamp).toDateString() === today)
          .reduce((sum, e) => sum + e.cost, 0);
      },

      getMonthlyCost: () => {
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
        return get().entries
          .filter(e => e.timestamp >= monthStart)
          .reduce((sum, e) => sum + e.cost, 0);
      },

      isOverDailyLimit: () => get().getDailyCost() >= get().dailyLimit,
      isOverMonthlyLimit: () => get().getMonthlyCost() >= get().monthlyLimit,

      getCostByProvider: () => {
        const result: Record<string, number> = {};
        for (const entry of get().entries) {
          result[entry.provider] = (result[entry.provider] || 0) + entry.cost;
        }
        return result;
      },

      getCostByAgent: () => {
        const result: Record<string, number> = {};
        for (const entry of get().entries) {
          result[entry.agentId] = (result[entry.agentId] || 0) + entry.cost;
        }
        return result;
      },
    }),
    { name: "prompt-gen-usage-store" }
  )
);
```

### 9.3 Token/Maliyet Hesaplama

```typescript
// lib/utils/cost-calculator.ts

export function calculateCost(
  usage: { promptTokens: number; completionTokens: number },
  model: ModelDefinition
): number {
  const inputCost = (usage.promptTokens / 1000) * model.costPer1kInput;
  const outputCost = (usage.completionTokens / 1000) * model.costPer1kOutput;
  return Math.round((inputCost + outputCost) * 10000) / 10000; // 4 ondalik
}

// Gorsel/video/3D modelleri icin sabit fiyat tablosu
export const FIXED_COSTS: Record<string, number> = {
  "dall-e-3-standard-1024": 0.04,
  "dall-e-3-hd-1024": 0.08,
  "dall-e-3-standard-1792": 0.08,
  "dall-e-3-hd-1792": 0.12,
  // Video modelleri (yakla sik - API fiyatlama degiskendir)
  "sora-480p-5s": 0.10,
  "sora-720p-5s": 0.20,
  "sora-1080p-5s": 0.40,
  // 3D modelleri
  "meshy-text-to-3d": 0.05,
  "tripo-text-to-3d": 0.03,
};
```

---

## 10. Uygulama Yol Haritasi

### Faz 1: Temel Altyapi (1. Hafta)

**Hedef:** Tek ajanli (TextCraft) sohbet uygulamasi

| Gorev | Oncelik | Sure |
|-------|---------|------|
| Next.js 15 proje kurulumu (App Router) | P0 | 2 saat |
| shadcn/ui + Tailwind yapilandirmasi | P0 | 1 saat |
| Temel dosya yapisi olusturma | P0 | 1 saat |
| Vercel AI SDK entegrasyonu | P0 | 2 saat |
| Multi-provider yapilandirmasi | P0 | 3 saat |
| `/api/chat` endpoint (streaming) | P0 | 3 saat |
| Chat UI bilesenleri (shadcn tabanlı) | P0 | 4 saat |
| TextCraft ajan tanimlamasi (sistem promptu) | P0 | 3 saat |
| Temel Zustand store'lari | P0 | 2 saat |
| Panoya kopyalama ozelligi | P1 | 1 saat |

**Cikti:** TextCraft ile streaming sohbet yapilabilen MVP

### Faz 2: Tum Ajanlar + Dashboard (2. Hafta)

| Gorev | Oncelik | Sure |
|-------|---------|------|
| Dashboard ekrani (4 ajan karti) | P0 | 3 saat |
| PixelForge ajan tanimlamasi | P0 | 3 saat |
| MotionLab ajan tanimlamasi | P0 | 3 saat |
| DimensionX ajan tanimlamasi | P0 | 3 saat |
| Ajan kayit defteri ve router | P0 | 2 saat |
| Model secici bileseni | P0 | 2 saat |
| Prompt cikti bileseni (```prompt blogu) | P0 | 2 saat |
| Sohbet gecmisi sidebar | P1 | 3 saat |
| IndexedDB (Dexie.js) entegrasyonu | P1 | 3 saat |

**Cikti:** 4 uzman ajanli tam dashboard

### Faz 3: Boost Ozelligi (3. Hafta)

| Gorev | Oncelik | Sure |
|-------|---------|------|
| Boost orkestrator | P0 | 5 saat |
| Hedef modele gonderme (text + image) | P0 | 4 saat |
| Metin degerlendirici | P0 | 3 saat |
| Gorsel degerlendirici (GPT-4o vision) | P0 | 3 saat |
| Prompt iyilestirici | P0 | 3 saat |
| Boost UI (ilerleme gostergesi) | P0 | 3 saat |
| `/api/boost` endpoint (SSE) | P0 | 3 saat |
| Maliyet limiti kontrolu | P1 | 2 saat |
| Video degerlendirici | P2 | 3 saat |
| 3D model degerlendirici | P2 | 3 saat |

**Cikti:** Tam calisir Boost dongusu (metin + gorsel)

### Faz 4: Cilalanma + Vercel Deploy (4. Hafta)

| Gorev | Oncelik | Sure |
|-------|---------|------|
| Ayarlar ekrani (API anahtarlari) | P0 | 3 saat |
| Maliyet takip dashboard | P1 | 3 saat |
| Prompt favorileri | P1 | 2 saat |
| Karanlik/acik tema | P1 | 1 saat |
| Responsive tasarim kontrolu | P1 | 2 saat |
| Vercel deployment yapilandirmasi | P0 | 2 saat |
| Hata yonetimi ve geri bildirim | P0 | 3 saat |
| Performans optimizasyonu | P1 | 2 saat |
| Son testler ve hata duzeltmeleri | P0 | 4 saat |

**Cikti:** Production-ready Vercel deploy

---

## 11. Acik Kaynak Referanslar

### 11.1 Dogrudan Ilgili Projeler

| Proje | URL | Uygunluk |
|-------|-----|----------|
| **Vercel AI Chatbot** | github.com/vercel/ai-chatbot | Sohbet UI ve Vercel AI SDK entegrasyonu icin sablon |
| **Lobe Chat** | github.com/lobehub/lobe-chat | Multi-model sohbet UI, ajan sistemi referansi |
| **Open WebUI** | github.com/open-webui/open-webui | Coklu model yonetimi, sohbet arayuzu |
| **ChatGPT-Next-Web** | github.com/ChatGPTNextWeb/ChatGPT-Next-Web | Hızli deploy edilebilir sohbet UI |
| **LibreChat** | github.com/danny-avila/LibreChat | Multi-provider, ajan araclari, dosya yukleme |

### 11.2 Prompt Muhendisligi Araclari

| Proje | Uygunluk |
|-------|----------|
| **PromptPerfect** (promptperfect.jina.ai) | Prompt optimizasyon referansi |
| **AUTOMATIC1111/stable-diffusion-webui** | Gorsel prompt parametreleri referansi |
| **ComfyUI** | Gorsel islem akisi referansi |

### 11.3 Vercel AI Chatbot Sablon Yapisi

Vercel AI Chatbot sablonu (`github.com/vercel/ai-chatbot`) su acilardan referans olarak uygundur:

- `useChat` hook kullanimi
- Streaming mesaj gosterimi
- Mesaj balon tasarimi
- Markdown render
- Kod blogu goruntulemesi
- Dosya yukleme (gorsel analiz icin)

Ancak su acilardan farklilasmamiz gerekir:
- Auth sistemi (bizde yok, kaldirilacak)
- Veritabani (bizde localStorage/IndexedDB)
- Tek model yerine multi-model
- Prompt output bileseni (bizde ozel)
- Boost ozelligi (bizde ozel)

### 11.4 Onerilen Paket Listesi

```json
{
  "dependencies": {
    "next": "^15.2",
    "react": "^19.0",
    "react-dom": "^19.0",
    "ai": "^4.1",
    "@ai-sdk/openai": "^1.2",
    "@ai-sdk/anthropic": "^1.2",
    "@ai-sdk/google": "^1.2",
    "zustand": "^5.0",
    "dexie": "^4.0",
    "dexie-react-hooks": "^1.1",
    "zod": "^3.24",
    "lucide-react": "^0.470",
    "tailwindcss": "^4.0",
    "class-variance-authority": "^0.7",
    "clsx": "^2.1",
    "tailwind-merge": "^3.0",
    "react-markdown": "^9.0",
    "react-syntax-highlighter": "^15.6",
    "sonner": "^2.0",
    "openai": "^4.80"
  },
  "devDependencies": {
    "typescript": "^5.7",
    "@types/react": "^19.0",
    "@types/node": "^22.0",
    "vitest": "^3.0",
    "@testing-library/react": "^16.2",
    "prettier": "^3.4",
    "eslint": "^9.0",
    "eslint-config-next": "^15.2"
  }
}
```

---

## Ek: Onemli Tasarim Kararlari ve Gerekceleri

### Neden Edge Runtime (Chat) + Node Runtime (Boost)?

- **Chat API** icin Edge Runtime: Dusuk gecikme, global dagilim, streaming icin optimize
- **Boost API** icin Node Runtime: Uzun sureli islemler (video/3D uretim), dosya isleme, daha buyuk bellek limiti

### Neden Ayri Degerlendirici ve Optimizer Model?

- **Degerlendirici olarak GPT-4o**: Vision destegi (gorsel/video analiz), hizli, uygun maliyetli
- **Optimizer olarak Claude**: Uzun ve karmasik prompt uretiminde guclu, talimat takibinde ustun

### Neden Veritabani Yok?

- Kisisel kullanim senaryosunda sunucu tarafli DB gereksiz karmasiklik ekler
- localStorage (< 5MB) + IndexedDB (> 5MB) tarayici tarafinda tum ihtiyaclari karsilar
- Gelecekte Turso/SQLite eklenmesi gerekirse, Dexie.js API'si benzer bir CRUD arayuzu saglar
- Vercel serverless fonksiyonlari stateless calisir, yani sunucu tarafli in-memory state mumkun degildir

### Guvenlik Notlari (Kisisel Kullanim)

- API anahtarlari `.env.local` dosyasinda saklanir (sunucu tarafinda)
- Istemci tarafinda API anahtari GONDERILMEZ (tum API cagrilari sunucu tarafinda)
- Rate limiting kisisel abuseyi onlemek icin, harici saldirilara karsi degil
- CORS ve CSP header'lari yine de dogru yapilandirilmalidir

---

**Dokuman sonu.**
