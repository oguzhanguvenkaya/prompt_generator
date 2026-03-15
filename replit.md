# Prompt Generator

AI modelleri (LLM, görsel, video) için uzman ajanlarla prompt üretme uygulaması.

## Tech Stack
- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + @tailwindcss/typography
- **Database:** PostgreSQL via Neon serverless (@neondatabase/serverless) + Drizzle ORM
- **AI SDKs:** Vercel AI SDK (OpenAI, Anthropic, Google), @google/genai
- **State:** Zustand
- **UI:** Lucide icons, CVA, clsx, tailwind-merge

## Project Structure
- `app/` — Next.js App Router pages (dashboard, agent chat, settings)
- `components/` — Shared React components
- `hooks/` — Custom React hooks
- `lib/` — Utilities, DB schema, seed data, AI provider configs
- `drizzle/` — Database migrations

## Agents
- **TextCraft** — LLM & text generation (Claude, GPT-4o, Gemini, Kimi, Qwen)
- **PixelForge** — Image generation (Recraft V3, Lovart, Leonardo)
- **MotionLab** — Video generation (Kling 2.6, Higgsfield)

## Environment Variables
- `DATABASE_URL` — Neon PostgreSQL connection string
- `OPENAI_API_KEY` — OpenAI API
- `GOOGLE_AI_API_KEY` — Google AI API
- `COHERE_API_KEY` — Cohere API
- `QWEN_API_KEY` + `QWEN_BASE_URL` — Qwen model
- `KIMI_API_KEY` + `KIMI_BASE_URL` — Kimi model
- `RESEARCH_NEW_PER_MODEL` — Optional seed throttle

## Dev Server
- Runs on port 5000 (`next dev --turbopack -p 5000 -H 0.0.0.0`)
- Tailwind CSS v4 uses `@source not` directives in `app/globals.css` to exclude non-source directories from scanning
- `allowedDevOrigins: ["*.replit.dev"]` configured in `next.config.ts`

## Database Commands
- `npm run db:generate` — Generate migrations
- `npm run db:migrate` — Run migrations
- `npm run db:push` — Push schema
- `npm run db:seed` — Seed database
