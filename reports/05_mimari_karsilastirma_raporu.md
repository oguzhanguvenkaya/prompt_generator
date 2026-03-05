# Gen AI Prompt Generator -- Mimari Karsilastirma Raporu

**Rapor Tarihi:** 5 Mart 2026
**Kapsam:** Next.js + Vercel ortaminda 4 uzman AI ajanli (Text/LLM, Image, Video, 3D) Prompt Generator icin mimari seceneklerin karsilastirilmasi
**Hedef:** En uygun multi-agent orchestration yaklasiminin belirlenmesi

---

## Icindekiler

1. [Proje Gereksinimlerinin Ozeti](#1-proje-gereksinimlerinin-ozeti)
2. [Secenek 1: CrewAI / LangChain / LangGraph](#2-secenek-1-crewai--langchain--langgraph)
3. [Secenek 2: Vercel AI SDK (ai paketi)](#3-secenek-2-vercel-ai-sdk)
4. [Secenek 3: Claude Code Tarzi (MCP/Subagent Pattern)](#4-secenek-3-claude-code-tarzi)
5. [Secenek 4: Hibrit Yaklasimlar](#5-secenek-4-hibrit-yaklasimlar)
6. [Karsilastirma Matrisi](#6-karsilastirma-matrisi)
7. [Onerilen Mimari ve Gerekce](#7-onerilen-mimari-ve-gerekce)
8. [Uygulama Yol Haritasi](#8-uygulama-yol-haritasi)
9. [Kaynaklar](#9-kaynaklar)

---

## 1. Proje Gereksinimlerinin Ozeti

### Uygulama Tanimi

Kullanicilarin 4 farkli AI alani icin optimize edilmis promptlar uretmesini saglayan bir web uygulamasi:

| Ajan | Gorev | Hedef Modeller |
|------|-------|----------------|
| **Text/LLM Ajani** | Metin uretimi icin prompt optimizasyonu | ChatGPT, Claude, Gemini, Llama |
| **Image Ajani** | Gorsel uretimi icin prompt optimizasyonu | Midjourney, DALL-E 3, Stable Diffusion, Flux |
| **Video Ajani** | Video uretimi icin prompt optimizasyonu | Sora, Runway Gen-3, Kling, Veo 2 |
| **3D Ajani** | 3D model uretimi icin prompt optimizasyonu | Meshy, Tripo3D, Rodin Gen-2 |

### Kritik Teknik Gereksinimler

1. **Vercel Deployment:** Serverless fonksiyonlar, edge runtime uyumlulugu
2. **Streaming:** Chat UX icin real-time token streaming (SSE/WebSocket)
3. **Multi-Model API:** Claude, GPT, Gemini, Kimi K2.5, Qwen destegi
4. **Ajan Hafizasi:** Konusma gecmisi, kullanici tercihleri, oturum state yonetimi
5. **Tool Calling:** Ajanlarin harici araclar kullanabilmesi
6. **Dusuk Gecikme:** Cold start surelerinin minimum olmasi
7. **Maliyet Verimliligi:** Token kullaniminin optimize edilmesi

---

## 2. Secenek 1: CrewAI / LangChain / LangGraph

### 2.1 Genel Bakis

#### CrewAI
- **Ne:** Python tabanli multi-agent orchestration framework'u
- **Felsefe:** "Rol tabanli ajan isbirligi" -- her ajana rol, hedef ve backstory atanir
- **Mimari:** Agent -> Task -> Crew -> Process (sequential/hierarchical)
- **Surum:** CrewAI 0.x -> 1.x (2025 itibariyle)

#### LangChain
- **Ne:** LLM uygulamalari icin en populer framework (Python + JS/TS versiyonlari var)
- **Felsefe:** Zincir (chain) tabanli modular islem hatlari
- **Mimari:** Model -> Prompt -> Chain -> Agent -> Tool
- **Surum:** LangChain 0.3.x (Python), LangChain.js 0.3.x (TypeScript)

#### LangGraph
- **Ne:** LangChain ekibinin gelistirdigi graf tabanli agent orchestration
- **Felsefe:** Durum makinesi (state machine) olarak ajan workflow'lari
- **Mimari:** StateGraph -> Node -> Edge -> Conditional routing
- **Surum:** LangGraph 0.2.x (Python), LangGraph.js 0.2.x (TypeScript)

### 2.2 Vercel Deployment Uyumlulugu

| Kriter | CrewAI | LangChain | LangGraph |
|--------|--------|-----------|-----------|
| Dil | Yalnizca Python | Python + JS/TS | Python + JS/TS |
| Vercel Serverless | Calistirilabilir degil (native) | JS versiyonu calisir | JS versiyonu calisir |
| Edge Runtime | Hayir | Kismi | Kismi |
| Cold Start | 3-8 saniye (Python) | 1-3 saniye (JS) | 1-3 saniye (JS) |
| Bundle Size | Cok buyuk (Python deps) | Orta-buyuk | Orta |

**Kritik Sorun -- CrewAI:** CrewAI tamamen Python'dur ve Vercel'in Node.js/Edge runtime'inda dogal olarak calismaz. Vercel'de CrewAI kullanmak icin su workaround'lar gerekir:
- **Ayri Python backend** (FastAPI/Flask) deploy edip Vercel frontend'den API ile baglanmak
- **Modal, Railway, AWS Lambda (Python)** gibi ayri bir servis kullanmak
- Bu, mimari karmasikligi ve gecikmeyi arttirir

**LangChain.js / LangGraph.js:** JavaScript/TypeScript versiyonlari Vercel'de calisir, ancak:
- Python versiyonlarina kiyasla daha az olgun ve daha az ozellik icerirler
- Bazi provider entegrasyonlari eksik veya gecikmeli olabilir
- Bundle size hala buyuktur (tree-shaking sinirli)

### 2.3 Streaming Destegi

| Framework | Streaming | Yontem |
|-----------|-----------|--------|
| CrewAI | Sinirli | Callback mekanizmasi, native SSE desteği yok |
| LangChain.js | Var | `.stream()` metodu, SSE uyumlu |
| LangGraph.js | Var | `.streamEvents()`, node bazli streaming |

**Sorun:** CrewAI'nin streaming destegi cok sinirlidir. Crew seviyesinde callback'ler vardir, ancak fine-grained token-level streaming icin ek is gerekir. LangGraph.js'de streaming daha iyi entegredir, ancak Vercel AI SDK'nin `useChat` hook'lariyla dogrudan uyumlu degildir -- ek adaptasyon katmani gerekir.

### 2.4 Multi-Model API Destegi

| Provider | CrewAI | LangChain | LangGraph |
|----------|--------|-----------|-----------|
| OpenAI (GPT-4o, o3) | Evet | Evet | Evet |
| Anthropic (Claude) | Evet | Evet | Evet |
| Google (Gemini) | Evet | Evet | Evet |
| Kimi K2.5 (Moonshot) | Manuel | OpenAI-compat. | OpenAI-compat. |
| Qwen (Alibaba) | Manuel | OpenAI-compat. | OpenAI-compat. |
| Yerel Modeller | Ollama entegr. | Ollama/VLLM | Ollama/VLLM |

LangChain/LangGraph'in avantaji genis provider destegidlr. CrewAI de LLM katmaninda LangChain kullanir, dolayisiyla ayni destege erisir. Ancak tum frameworklerde Kimi ve Qwen gibi nicel saglayicilar icin OpenAI-uyumlu endpoint yapilandirmasi gerekir.

### 2.5 Ajan Hafizasi ve State Yonetimi

| Framework | Hafiza Tipleri | Kalicilik |
|-----------|---------------|-----------|
| CrewAI | Short-term, long-term, entity memory | Evet (embeddings + SQLite) |
| LangChain | ConversationBufferMemory, Summary, VectorStore | Evet (coklu backend) |
| LangGraph | Checkpointer (SQLite, PostgreSQL) | Evet (kalici state) |

**LangGraph'in Avantaji:** State yonetimi LangGraph'in en guclu yani. Her node gecisinde state snapshot'i alinabilir, "time travel" debugging yapilabilir ve conversation state'i kalici olarak saklanabilir. Ancak bu ozellikler karmasiklik getirir.

### 2.6 Avantajlar

- **CrewAI:** Hizli prototipleme, rol tabanli sezgisel tasarim, hazir ajan sablonlari
- **LangChain:** Genis ekosistem, binlerce entegrasyon, buyuk topluluk
- **LangGraph:** Karmasik workflow'lar icin en esnek yaklasim, state machine guclu

### 2.7 Dezavantajlar ve Sinirlamalar

1. **Overengineering Riski:** Bir prompt generator icin bu frameworkler asiri karmasik olabilir. Sizin ajanlarin temel gorevi "optimize edilmis prompt uretmek" -- bu, LLM cagrilarinin orchestration'indan ziyade iyi system prompt'lar ve chain-of-thought ile cozulebilir.

2. **Abstraksiyon Maliyeti:** LangChain ozellikle "abstraction over abstraction" yaklasimi nedeniyle elestirilir. Debugging zorlasir, hata mesajlari belirsizlesir.

3. **Versiyon Istikrarsizligi:** LangChain API'si sik degisir (breaking changes). Projenin uzun vadeli bakim maliyetini arttirir.

4. **Bundle Size:** LangChain.js tam paket ~2-5MB, Vercel serverless fonksiyon limiti (50MB sıkıştırılmamış) icinde kalsa da cold start'i etkiler.

5. **Maliyet:** Framework'un kendisi ucretsiz, ancak LangSmith (tracing/debugging) icin aylik 39 USD+ maliyet vardir. Ayri Python backend gerektiren CrewAI icin ek hosting maliyeti eklenmelidir.

### 2.8 Verdict

**Prompt Generator icin: ONERILEN DEGIL (overkill)**

Bu frameworkler, ajanlarin birbirleriyle etkilesime girdigi, karmasik tool-call zincirleri olan, gercek zamanli veri isleyen senaryolar icin idealdir. Prompt optimizasyonu gibi nispeten "dar" bir goreve sahip 4 uzman ajan icin asiri mimari karmasiklik getirir. LangGraph.js kismen dusunulebilir ancak daha iyi alternatifler vardir.

---

## 3. Secenek 2: Vercel AI SDK

### 3.1 Genel Bakis

Vercel AI SDK (npm: `ai`), Vercel ekibi tarafindan gelistirilen ve Next.js ile dogal entegrasyon icin optimize edilmis bir AI toolkit'idir.

**Temel Bilesenler:**
- **AI SDK Core:** `generateText()`, `streamText()`, `generateObject()`, `streamObject()`
- **AI SDK UI:** `useChat()`, `useCompletion()`, `useObject()` React hook'lari
- **AI SDK RSC:** React Server Components icin streamable UI
- **Provider Sistemi:** Takilabilir (pluggable) model provider'lar

**Guncel Surum:** AI SDK 4.x (2025-2026 itibariyle)

### 3.2 Vercel Deployment Uyumlulugu

| Kriter | Deger |
|--------|-------|
| Next.js Entegrasyonu | Native (birinci sinif destek) |
| Vercel Serverless | Tam uyumlu |
| Edge Runtime | Tam uyumlu |
| Cold Start | <500ms (cok hizli) |
| Bundle Size | ~200-400KB (tree-shakeable) |
| TypeScript | Birinci sinif destek |

**Bu en buyuk avantajdir.** Vercel AI SDK, Vercel platformu icin ozel olarak tasarlanmistir. Ek yapilandirma, adaptasyon katmani veya workaround gerekmez.

### 3.3 Streaming Destegi

Vercel AI SDK'nin streaming destegi best-in-class seviyesindedir:

```typescript
// Server tarafinda (Route Handler veya Server Action)
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic('claude-sonnet-4-20250514'),
    system: `Sen bir gorsel prompt uzmanisin. Kullanicinin
             taleplerini Midjourney/DALL-E icin optimize et.`,
    messages,
  });

  return result.toDataStreamResponse();
}

// Client tarafinda (React Component)
'use client';
import { useChat } from '@ai-sdk/react';

export function ImagePromptChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/image-agent',
  });

  return (
    <div>
      {messages.map(m => <div key={m.id}>{m.content}</div>)}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
      </form>
    </div>
  );
}
```

Streaming ozellikleri:
- **Token-level streaming:** Her token uretildikce client'a iletilir
- **Data stream protocol:** Metadata, tool calls ve text birlikte stream edilir
- **Backpressure handling:** Yavas client'lar icin otomatik akis kontrolu
- **Structured streaming:** `streamObject()` ile JSON nesneleri stream edilebilir

### 3.4 Multi-Model API Destegi

Vercel AI SDK'nin provider sistemi cok gucludur:

```typescript
// Resmi desteklenen providerlar
import { openai } from '@ai-sdk/openai';           // GPT-4o, o3, o4-mini
import { anthropic } from '@ai-sdk/anthropic';       // Claude Opus, Sonnet
import { google } from '@ai-sdk/google';             // Gemini 2.0, 2.5
import { mistral } from '@ai-sdk/mistral';           // Mistral Large
import { cohere } from '@ai-sdk/cohere';             // Command R+

// OpenAI-uyumlu providerlar (Kimi, Qwen, vb.)
import { createOpenAI } from '@ai-sdk/openai';

const kimi = createOpenAI({
  baseURL: 'https://api.moonshot.cn/v1',
  apiKey: process.env.KIMI_API_KEY,
});

const qwen = createOpenAI({
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: process.env.QWEN_API_KEY,
});

// Kullanim -- hepsi ayni arayuz
const result = await streamText({
  model: kimi('moonshot-v1-128k'),
  prompt: 'Optimize this prompt...',
});
```

| Provider | Paket | Durum |
|----------|-------|-------|
| OpenAI | `@ai-sdk/openai` | Resmi, tam destek |
| Anthropic | `@ai-sdk/anthropic` | Resmi, tam destek |
| Google (Gemini) | `@ai-sdk/google` | Resmi, tam destek |
| Mistral | `@ai-sdk/mistral` | Resmi |
| Cohere | `@ai-sdk/cohere` | Resmi |
| Amazon Bedrock | `@ai-sdk/amazon-bedrock` | Resmi |
| Azure OpenAI | `@ai-sdk/azure` | Resmi |
| Kimi K2.5 | `@ai-sdk/openai` (custom) | OpenAI-compat. |
| Qwen | `@ai-sdk/openai` (custom) | OpenAI-compat. |
| Groq | `@ai-sdk/groq` | Topluluk |
| Fireworks | `@ai-sdk/fireworks` | Topluluk |
| DeepSeek | `@ai-sdk/openai` (custom) | OpenAI-compat. |

**Buyuk avantaj:** Tum provider'lar ayni unified interface'i (`generateText`, `streamText`, vb.) kullanir. Provider degistirmek tek satirlik bir degisiklik.

### 3.5 Tool Calling ve Agent Yetenekleri

Vercel AI SDK, `maxSteps` parametresiyle cok adimli ajan dongulerini destekler:

```typescript
import { streamText, tool } from 'ai';
import { z } from 'zod';

const result = streamText({
  model: anthropic('claude-sonnet-4-20250514'),
  system: `Sen bir prompt optimizasyon ajansin...`,
  messages,
  maxSteps: 5, // Ajan dongusu - 5 adima kadar
  tools: {
    analyzePrompt: tool({
      description: 'Prompt kalitesini analiz eder',
      parameters: z.object({
        prompt: z.string(),
        targetModel: z.enum(['midjourney', 'dalle', 'sd', 'flux']),
      }),
      execute: async ({ prompt, targetModel }) => {
        // Prompt analiz mantigi
        return { score: 8.5, suggestions: [...] };
      },
    }),
    getStyleReference: tool({
      description: 'Stil referans bilgisi getirir',
      parameters: z.object({
        style: z.string(),
      }),
      execute: async ({ style }) => {
        // Veritabanindan stil bilgisi cek
        return { keywords: [...], examples: [...] };
      },
    }),
    formatOutput: tool({
      description: 'Ciktiyi hedef model formatina donusturur',
      parameters: z.object({
        prompt: z.string(),
        format: z.enum(['midjourney-v6', 'dalle3', 'sdxl', 'flux']),
      }),
      execute: async ({ prompt, format }) => {
        // Format donusumu
        return { formattedPrompt: '...' };
      },
    }),
  },
});
```

**Agent Loop Mekanizmasi:**
1. Model mesaji alir ve dusunur
2. Gerekirse tool call yapar (ornegin `analyzePrompt`)
3. Tool sonucunu alir, tekrar dusunur
4. Baska tool gerekirse tekrar cagirir (maxSteps'e kadar)
5. Final cevabi uretir

Bu, "akilli yonlendirme" ve "cok adimli optimizasyon" senaryolari icin yeterlidir.

### 3.6 Structured Output (Yapilandirilmis Cikti)

Prompt generator icin kritik bir ozellik -- ajanlarin yapilandirilmis cikti uretmesi:

```typescript
import { generateObject } from 'ai';
import { z } from 'zod';

const promptSchema = z.object({
  optimizedPrompt: z.string().describe('Optimize edilmis prompt'),
  negativePrompt: z.string().optional().describe('Negatif prompt (gorsel icin)'),
  parameters: z.object({
    model: z.string(),
    style: z.string().optional(),
    aspectRatio: z.string().optional(),
    cfgScale: z.number().optional(),
    steps: z.number().optional(),
  }),
  explanation: z.string().describe('Neden bu sekilde optimize edildi'),
  tips: z.array(z.string()).describe('Kullanim ipuclari'),
  score: z.number().min(0).max(10).describe('Tahmini kalite skoru'),
});

const result = await generateObject({
  model: anthropic('claude-sonnet-4-20250514'),
  schema: promptSchema,
  prompt: `Kullanici su prompti optimize etmek istiyor: "${userPrompt}"
           Hedef model: ${targetModel}`,
});

// result.object.optimizedPrompt -> string
// result.object.parameters -> tipli nesne
// result.object.tips -> string[]
```

Bu, frontend'de zengin UI bilesenlerini beslemek icin idealdir.

### 3.7 Ajan Hafizasi ve State Yonetimi

Vercel AI SDK yerlesik hafiza sistemi sunmaz, ancak entegrasyon kolaydır:

**Kisa Sureli Hafiza (Conversation State):**
```typescript
// useChat hook'u otomatik olarak mesaj gecmisini yonetir
const { messages, append } = useChat({
  api: '/api/chat',
  initialMessages: savedMessages, // Onceki konusmayi yukle
});
```

**Uzun Sureli Hafiza Secenekleri:**
- **Vercel KV (Redis):** Oturum bazli hafiza, hizli okuma/yazma
- **Vercel Postgres (Neon):** Kalici kullanici tercihleri, prompt gecmisi
- **Upstash:** Serverless Redis, rate limiting icin de kullanilir

**Hafiza Mimarisi Onerisi:**
```
Kullanici Tercihleri -> Vercel Postgres
Aktif Oturum State -> Vercel KV (Redis)
Prompt Gecmisi -> Vercel Postgres
Embedding Cache -> Upstash Vector
```

### 3.8 Avantajlar

1. **Sifir Yapilandirma:** Next.js + Vercel icin "it just works"
2. **Tip Guvenligi:** TypeScript-first tasarim, Zod schema entegrasyonu
3. **Streaming Best-in-Class:** Token-level streaming, structured streaming
4. **Kucuk Bundle:** Tree-shakeable, gereksiz kod dahil edilmez
5. **Unified Provider API:** Provider degistirmek tek satir
6. **React Hook'lari:** `useChat`, `useCompletion` -- UI entegrasyonu anlik
7. **Aktif Gelistirme:** Vercel ekibi tarafindan surekli guncellenir
8. **Server Actions Destegi:** Next.js App Router ile tam uyumlu
9. **Dusuk Cold Start:** Edge runtime destegi sayesinde <500ms
10. **Ucretsiz:** Acik kaynak, ek lisans maliyeti yok

### 3.9 Dezavantajlar ve Sinirlamalar

1. **Karmasik Agent Orchestration Sinirli:** Ajanlar arasi iletisim, delegasyon, hiyerarsik gorev dagitimi icin yerlesik mekanizma yok. `maxSteps` tek bir ajan icindeki donguyu yonetir, ajanlararasi degil.

2. **Workflow Grafigi Yok:** LangGraph gibi DAG-tabanli workflow tanimlama yok. Karmasik dallanma mantigi kodda yazilmali.

3. **Yerlesik Hafiza Yok:** Conversation memory, entity memory gibi ozellikleri kendiniz insa etmelisiniz.

4. **Vercel Lock-in Riski:** SDK teorik olarak herhangi bir Node.js ortaminda calisir, ancak en iyi Vercel'de calisir.

### 3.10 Verdict

**Prompt Generator icin: GUCLU ADAY (en yuksek uyumluluk)**

Vercel AI SDK, bu projenin gereksinimleriyle en yuksek uyuma sahiptir. Multi-agent orchestration icin ek mimari tasarim gerektirir, ancak "her ajan = ayri bir API route + ayri system prompt + ayri tool seti" yaklasimi ile bu sorun cozulebilir.

---

## 4. Secenek 3: Claude Code Tarzi (MCP/Subagent Pattern)

### 4.1 Genel Bakis

Claude Code'un mimarisi su bilesenlerden olusur:
- **Ana Ajan:** Kullanici ile dogrudan etkilesir, gorevleri yonlendirir
- **Sub-Agent'lar:** Spesifik gorevler icin spawn edilen uzman ajanlar
- **MCP (Model Context Protocol):** Harici araclar ve veri kaynaklari icin standart protokol
- **Skill'ler:** Onaylanmis, yeniden kullanilabilir gorev sablonlari
- **Tool'lar:** Dosya sistemi, terminal, arama gibi araclar

### 4.2 MCP Protokolunun Web Uygulamasinda Kullanimi

**MCP Nedir?**
Anthropic tarafindan gelistirilen Model Context Protocol, LLM'lerin harici araclar ve veri kaynaklariyla iletisim kurmasi icin standart bir protokoldur (JSON-RPC 2.0 tabanlı).

**Web App'te MCP Uygulanabilirligi:**

| Bileşen | Masaustu (Claude Code) | Web App (Next.js) |
|---------|----------------------|-------------------|
| MCP Server | Yerel stdio/SSE process | HTTP/SSE endpoint |
| MCP Client | CLI/Desktop app | Server-side Node.js |
| Transport | stdio (yerel), SSE | Yalnizca SSE/HTTP |
| Tool Discovery | Otomatik | Statik veya API-tabanli |

**Kisa Cevap:** MCP pattern'i web app'te teknik olarak uygulanabilir, ancak MCP'nin tam potansiyeli masaustu/yerel ortamlara yoneliktir. Web ortaminda MCP sunuculari HTTP endpoint'leri olarak calistirilmali ve guvenlik katmanlari eklenmalidir.

**MCP'nin Web'de Pratik Kullanimi:**
```typescript
// MCP-ilhamli tool tanimlama (Vercel AI SDK tool formatinda)
const imagePromptTools = {
  analyzImageStyle: tool({
    description: 'Gorsel stil analizi yapar',
    parameters: z.object({ description: z.string() }),
    execute: async ({ description }) => {
      // MCP-style harici servis cagrisi
      const response = await fetch('/api/mcp/style-analyzer', {
        method: 'POST',
        body: JSON.stringify({ description }),
      });
      return response.json();
    },
  }),
};
```

### 4.3 Subagent Pattern'in Web App'te Uygulanmasi

Claude Code'daki subagent pattern'i web app'te su sekilde uyarlanabilir:

```typescript
// Ajan Fabrikasi -- her ajan ayri yapilandirmayla olusturulur
function createAgent(config: AgentConfig) {
  return {
    id: config.id,
    systemPrompt: config.systemPrompt,
    model: config.model,
    tools: config.tools,

    async run(messages: Message[]) {
      return streamText({
        model: config.model,
        system: config.systemPrompt,
        messages,
        tools: config.tools,
        maxSteps: config.maxSteps ?? 3,
      });
    },
  };
}

// Orkestrator -- ana ajan
async function orchestrate(userMessage: string) {
  // 1. Kullanici niyetini tespit et
  const intent = await detectIntent(userMessage);

  // 2. Uygun alt ajana yonlendir
  switch (intent.type) {
    case 'text': return textAgent.run(messages);
    case 'image': return imageAgent.run(messages);
    case 'video': return videoAgent.run(messages);
    case '3d': return threeDAgent.run(messages);
    case 'multi': return handleMultiAgent(intent, messages);
  }
}
```

### 4.4 Avantajlar

1. **Esnek:** Tamamen kendi kontrolunuzde, framework bagimsiligi yok
2. **MCP Standardi:** Gelecekte MCP ekosistemi buyudukce entegrasyon kolaylasir
3. **Minimal Bagimlilik:** Sadece `ai` paketi + kendi kodunuz
4. **Anlasilir:** Soyutlama katmani minimalde, debugging kolay

### 4.5 Dezavantajlar

1. **Her Sey Sifirdan:** Orkestrasyon, hafiza, hata yonetimi, retry mantigi -- hepsini siz yazarsiniz
2. **MCP Olgunlugu:** Web ortaminda MCP henuz olgun degil, tooling sinirli
3. **Bakim Yuku:** Custom code ne kadar coksa, bakim o kadar zor
4. **Test Karmasikligi:** Custom orkestrasyon mantiginin kapsamli test edilmesi gerekir

### 4.6 Verdict

**Prompt Generator icin: ISIN PATTERN OLARAK KULLANILABILIR, TEK BASINA YETERSIZ**

MCP/subagent pattern'i, mimari tasarim prensibi olarak degerlidir. Ancak Vercel AI SDK ile birlestirilerek uygulanmasi gerekir -- tek basina tekerlek yeniden icat etmek anlamina gelir.

---

## 5. Secenek 4: Hibrit Yaklasimlar

### 5.1 Hibrit A: Vercel AI SDK + LangGraph.js Backend

```
Kullanici <-> Next.js Frontend (useChat)
         <-> Vercel AI SDK (streaming)
         <-> LangGraph.js (orkestrasyon)
         <-> LLM API'ler
```

**Avantajlar:**
- En iyi streaming (Vercel AI SDK) + en iyi orkestrasyon (LangGraph)
- Karmasik workflow'lar tanimlanabilir

**Dezavantajlar:**
- Iki framework'un entegrasyonu ek karmasiklik getirir
- LangGraph.js'in Vercel AI SDK ile streaming entegrasyonu sorunsuz degil
- Iki farkli soyutlama katmani = debugging kabusu
- **Bu proje icin overkill**

### 5.2 Hibrit B: Vercel AI SDK + Custom Orchestration (ONERILEN)

```
Kullanici <-> Next.js Frontend (useChat / useObject)
         <-> API Routes (ajan yonlendirme)
         <-> Vercel AI SDK Core (streamText / generateObject)
         <-> Multi-provider LLM API'ler
         <-> Vercel KV/Postgres (state/hafiza)
```

Bu yaklasim, Vercel AI SDK'yi temel alir ve MCP/subagent pattern'inden ilham alan custom orkestrasyon mantigi ekler.

**Mimari Detay:**

```typescript
// /lib/agents/types.ts
interface PromptAgent {
  id: 'text' | 'image' | 'video' | '3d';
  name: string;
  systemPrompt: string;
  model: LanguageModel;
  tools: Record<string, CoreTool>;
  outputSchema: z.ZodSchema;
}

// /lib/agents/image-agent.ts
export const imageAgent: PromptAgent = {
  id: 'image',
  name: 'Gorsel Prompt Uzmani',
  systemPrompt: `Sen bir gorsel AI prompt uzmanisin.
    Kullanicinin talebini analiz et ve hedef model icin
    optimize edilmis bir prompt uret.

    Bildigin modeller: Midjourney v6, DALL-E 3,
    Stable Diffusion XL, Flux.1, Ideogram v2.

    Her zaman su bilgileri iceren yapilandirilmis
    cikti uret:
    - Optimize edilmis ana prompt
    - Negatif prompt (varsa)
    - Onerilen parametreler
    - Aciklama ve ipuclari`,
  model: anthropic('claude-sonnet-4-20250514'),
  tools: {
    analyzeStyle: tool({ /* ... */ }),
    getModelCapabilities: tool({ /* ... */ }),
    suggestParameters: tool({ /* ... */ }),
  },
  outputSchema: imagePromptSchema,
};

// /app/api/chat/route.ts (Unified endpoint)
export async function POST(req: Request) {
  const { messages, agentId } = await req.json();

  // Ajan secimi
  const agent = agentId
    ? getAgent(agentId)
    : await detectAndRouteAgent(messages);

  // Streaming yanit
  const result = streamText({
    model: agent.model,
    system: agent.systemPrompt,
    messages,
    tools: agent.tools,
    maxSteps: 5,
  });

  return result.toDataStreamResponse();
}

// /app/api/generate/route.ts (Structured output endpoint)
export async function POST(req: Request) {
  const { prompt, agentId, targetModel } = await req.json();

  const agent = getAgent(agentId);

  const result = await generateObject({
    model: agent.model,
    schema: agent.outputSchema,
    messages: [{ role: 'user', content: prompt }],
    system: agent.systemPrompt,
  });

  return Response.json(result.object);
}
```

**Frontend Entegrasyonu:**
```typescript
// /app/components/PromptGenerator.tsx
'use client';
import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export function PromptGenerator() {
  const [activeAgent, setActiveAgent] = useState<AgentType>('text');

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    body: { agentId: activeAgent },
  });

  return (
    <div className="flex">
      {/* Ajan secim sidebar'i */}
      <AgentSelector active={activeAgent} onChange={setActiveAgent} />

      {/* Chat alani */}
      <ChatArea messages={messages} isLoading={isLoading} />

      {/* Input */}
      <PromptInput
        value={input}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

### 5.3 Hibrit C: Vercel AI SDK + Ayri Python Microservice

```
Kullanici <-> Next.js (Vercel)
         <-> Basit gorevler: Vercel AI SDK (dogrudan)
         <-> Karmasik gorevler: Python API (CrewAI/LangGraph)
                              (Railway/Modal/Fly.io'da)
```

**Avantajlar:**
- Python ekosisteminin tum gucunu kullanabilirsiniz
- Karmasik NLP islemleri, embedding islemleri Python'da daha kolay

**Dezavantajlar:**
- Iki ayri deployment, iki ayri infra maliyeti
- Network gecikme eklenir (50-200ms ekstra)
- **Bu proje icin kesinlikle gereksiz**

### 5.4 Verdict

**Hibrit B (Vercel AI SDK + Custom Orchestration): EN UYGUN YAKLASIM**

---

## 6. Karsilastirma Matrisi

| Kriter | CrewAI | LangChain.js | LangGraph.js | Vercel AI SDK | MCP Pattern | Hibrit B |
|--------|--------|-------------|-------------|---------------|-------------|----------|
| **Vercel Uyumlulugu** | 2/10 | 6/10 | 6/10 | **10/10** | 7/10 | **10/10** |
| **Streaming** | 3/10 | 7/10 | 7/10 | **10/10** | 5/10 | **10/10** |
| **Multi-Model API** | 7/10 | 8/10 | 8/10 | **9/10** | 6/10 | **9/10** |
| **Ajan Hafizasi** | 8/10 | 8/10 | **9/10** | 5/10 | 4/10 | 7/10 |
| **Tool Calling** | 7/10 | 8/10 | 8/10 | **9/10** | 7/10 | **9/10** |
| **Karmasiklik (dusuk=iyi)** | 3/10 | 4/10 | 4/10 | **8/10** | 6/10 | **8/10** |
| **Maliyet Verimliligi** | 4/10 | 6/10 | 6/10 | **9/10** | 8/10 | **9/10** |
| **TypeScript Destegi** | 1/10 | 7/10 | 7/10 | **10/10** | 8/10 | **10/10** |
| **Gelistirme Hizi** | 6/10 | 5/10 | 4/10 | **9/10** | 3/10 | **8/10** |
| **Uzun Vade Bakim** | 5/10 | 5/10 | 6/10 | **9/10** | 6/10 | **8/10** |
| | | | | | | |
| **TOPLAM** | **46** | **64** | **65** | **88** | **60** | **88** |

---

## 7. Onerilen Mimari ve Gerekce

### ONERI: Hibrit B -- Vercel AI SDK + Custom Agent Orchestration

### Neden Bu Yaklasim?

**1. Projenin Dogasi Basit Orkestrasyon Gerektirir**

Prompt Generator'daki "multi-agent" yapisi aslinda cok karmasik degildir:
- 4 uzman ajan var, ancak birbirleriyle isbirligi yapmak zorunda degiller
- Her ajan bagimsiz calisir: kullanici bir ajan secer, o ajan prompt optimize eder
- "Karmasik orkestrasyon" yerine "akilli yonlendirme" (routing) yeterlidir
- En karmasik senaryo: kullanici bir promptu birden fazla modele/ajana ayni anda optimize ettirmek istediginde paralel cagrilar yapmak

Bu senaryo icin CrewAI/LangGraph gibi agir frameworkler overkilldır.

**2. Vercel AI SDK Tum Teknik Gereksinimleri Karsilar**

- Streaming: En iyi sinif (`useChat` + `streamText`)
- Multi-model: Unified provider API ile tum model saglayicilari
- Tool calling: `maxSteps` ile cok adimli ajan dongusu
- Structured output: `generateObject` + Zod schema
- TypeScript: Dogal, tam tip guvenligi

**3. Maliyet ve Operasyonel Avantaj**

- Tek deployment (Vercel): Ek infra yok
- Framework lisans maliyeti: 0 USD
- Cold start: <500ms (kullanici deneyimi icin kritik)
- Bakim: Vercel ekibi tarafindan aktif olarak destekleniyor

**4. Gelecege Hazirlik**

- Vercel AI SDK hizla gelisen bir ekosistem
- Multi-agent yetenekleri her surumde genisliyor
- MCP entegrasyonu gelecekte eklenme olasiligi yuksek
- Provider eklemek tek satirlik degisiklik

### Onerilen Ust Duzey Mimari

```
prompt-generator/
├── app/
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Landing / ana sayfa
│   ├── (chat)/
│   │   ├── layout.tsx                # Chat layout (sidebar + main)
│   │   ├── page.tsx                  # Varsayilan chat (auto-detect ajan)
│   │   ├── text/page.tsx             # Text/LLM ajan sayfasi
│   │   ├── image/page.tsx            # Image ajan sayfasi
│   │   ├── video/page.tsx            # Video ajan sayfasi
│   │   └── 3d/page.tsx               # 3D ajan sayfasi
│   └── api/
│       ├── chat/route.ts             # Unified chat endpoint (streaming)
│       ├── generate/route.ts         # Structured output endpoint
│       └── history/route.ts          # Prompt gecmisi CRUD
│
├── lib/
│   ├── agents/
│   │   ├── types.ts                  # Ajan tip tanimlari
│   │   ├── registry.ts              # Ajan kayit ve fabrika
│   │   ├── router.ts                # Akilli yonlendirme (intent detection)
│   │   ├── text-agent.ts            # Text/LLM prompt uzmani
│   │   ├── image-agent.ts           # Gorsel prompt uzmani
│   │   ├── video-agent.ts           # Video prompt uzmani
│   │   └── 3d-agent.ts              # 3D prompt uzmani
│   ├── tools/
│   │   ├── prompt-analyzer.ts       # Prompt kalite analizi
│   │   ├── style-library.ts         # Stil kutuphanesi aracı
│   │   ├── model-capabilities.ts    # Model ozellik veritabani
│   │   └── parameter-suggester.ts   # Parametre onerici
│   ├── providers/
│   │   ├── index.ts                 # Provider yapilandirmasi
│   │   └── custom-providers.ts      # Kimi, Qwen vb. ozel providerlar
│   ├── memory/
│   │   ├── conversation.ts          # Konusma hafizasi (KV)
│   │   └── preferences.ts           # Kullanici tercihleri (Postgres)
│   └── schemas/
│       ├── text-prompt.ts           # Text cikti semasi
│       ├── image-prompt.ts          # Gorsel cikti semasi
│       ├── video-prompt.ts          # Video cikti semasi
│       └── 3d-prompt.ts             # 3D cikti semasi
│
├── components/
│   ├── chat/                        # Chat UI bilesenleri
│   ├── agents/                      # Ajan secim UI
│   └── prompt-output/               # Yapilandirilmis cikti gosterimi
│
└── config/
    ├── agents.ts                    # Ajan yapilandirmalari
    └── models.ts                    # Model listesi ve ozellikleri
```

### Provider Yapilandirma Ornegi

```typescript
// lib/providers/index.ts
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';

// Ana modeller (prompt optimizasyonu icin)
export const models = {
  // Prompt optimizasyonu icin ana model
  optimizer: anthropic('claude-sonnet-4-20250514'),

  // Hizli intent detection icin
  router: anthropic('claude-haiku-35-20241022'),

  // Alternatif optimizer'lar
  gpt4o: openai('gpt-4o'),
  gemini: google('gemini-2.0-flash'),
} as const;

// Kullanici-secimli hedef modeller (prompt'un optimize edilecegi modeller)
export const targetModels = {
  // Text/LLM hedefleri
  'chatgpt': { name: 'ChatGPT (GPT-4o)', provider: 'openai' },
  'claude': { name: 'Claude', provider: 'anthropic' },
  'gemini': { name: 'Gemini', provider: 'google' },

  // Gorsel hedefleri
  'midjourney-v6': { name: 'Midjourney v6.1', provider: 'midjourney' },
  'dalle3': { name: 'DALL-E 3', provider: 'openai' },
  'flux': { name: 'Flux.1', provider: 'black-forest-labs' },
  'sdxl': { name: 'Stable Diffusion XL', provider: 'stability' },

  // Video hedefleri
  'sora': { name: 'Sora', provider: 'openai' },
  'runway-gen3': { name: 'Runway Gen-3 Alpha', provider: 'runway' },
  'kling': { name: 'Kling AI', provider: 'kuaishou' },

  // 3D hedefleri
  'meshy': { name: 'Meshy', provider: 'meshy' },
  'tripo3d': { name: 'Tripo3D', provider: 'tripo' },
} as const;
```

---

## 8. Uygulama Yol Haritasi

### Faz 1: Temel Altyapi (1-2 Hafta)
- [ ] Next.js 15 + App Router projesi olustur
- [ ] Vercel AI SDK entegrasyonu
- [ ] Provider yapilandirmasi (Claude, GPT, Gemini)
- [ ] Temel chat UI (`useChat` ile)
- [ ] Ajan tip tanimlari ve fabrika sistemi

### Faz 2: Ajan Gelistirme (2-3 Hafta)
- [ ] Text/LLM ajani (system prompt + tools)
- [ ] Image ajani (system prompt + tools + negatif prompt)
- [ ] Video ajani (system prompt + tools)
- [ ] 3D ajani (system prompt + tools)
- [ ] Akilli yonlendirme (router) mantigi
- [ ] Structured output semalari (Zod)

### Faz 3: Gelismis Ozellikler (2-3 Hafta)
- [ ] Kullanici kimlik dogrulama (NextAuth.js)
- [ ] Prompt gecmisi (Vercel Postgres)
- [ ] Oturum hafizasi (Vercel KV)
- [ ] Kimi K2.5 ve Qwen entegrasyonu
- [ ] Model karsilastirma modu (ayni prompt, farkli modeller)

### Faz 4: Optimizasyon ve Lansman (1-2 Hafta)
- [ ] Rate limiting (Upstash)
- [ ] Error handling ve retry mantigi
- [ ] Analytics entegrasyonu
- [ ] Performance optimizasyonu
- [ ] Vercel deployment ve production ayarlari

### Tahmini Toplam Sure: 6-10 Hafta

---

## 9. Kaynaklar

| Kaynak | URL | Not |
|--------|-----|-----|
| Vercel AI SDK Dokumantasyonu | https://sdk.vercel.ai/docs | Resmi dokumanlar, en guncel |
| Vercel AI SDK GitHub | https://github.com/vercel/ai | Kaynak kod ve ornekler |
| Next.js App Router | https://nextjs.org/docs/app | App Router mimarisi |
| Anthropic Claude API | https://docs.anthropic.com | Claude entegrasyonu |
| OpenAI API | https://platform.openai.com/docs | GPT entegrasyonu |
| Google Gemini API | https://ai.google.dev/docs | Gemini entegrasyonu |
| MCP Spesifikasyonu | https://modelcontextprotocol.io | MCP standardi |
| LangGraph.js | https://langchain-ai.github.io/langgraphjs/ | Karsilastirma referansi |
| CrewAI Docs | https://docs.crewai.com | Karsilastirma referansi |
| Vercel KV | https://vercel.com/docs/storage/vercel-kv | Redis state yonetimi |
| Vercel Postgres | https://vercel.com/docs/storage/vercel-postgres | Kalici veri |

---

**Rapor Sonu**

> **Ozet Karar:** Vercel AI SDK + Custom Agent Orchestration (Hibrit B) yaklasimi, bu projenin tum gereksinimlerini karsilarken minimum karmasiklik ve maksimum Vercel uyumlulugu saglar. Framework bagimliligini minimize eder, gelecege hazir bir mimari sunar ve gelistirme hizini en ust duzeyde tutar.
