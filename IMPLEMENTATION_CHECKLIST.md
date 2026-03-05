# Uygulama Kontrol Listesi

## Faz 1: Temel Altyapi (Hafta 1)
- [ ] `npx create-next-app@latest --typescript --tailwind --app --src-dir=false`
- [ ] shadcn/ui kurulumu: `npx shadcn@latest init`
- [ ] shadcn bilesenleri: button, card, input, textarea, dialog, select, scroll-area, tabs, sheet, skeleton, tooltip, sonner
- [ ] `pnpm add ai @ai-sdk/openai @ai-sdk/anthropic @ai-sdk/google`
- [ ] `pnpm add zustand dexie dexie-react-hooks zod lucide-react`
- [ ] `pnpm add react-markdown react-syntax-highlighter openai`
- [ ] `pnpm add -D vitest @testing-library/react`
- [ ] Dosya yapisi olustur (ARCHITECTURE.md Bolum 3)
- [ ] `lib/ai/providers.ts` - Multi-provider yapilandirmasi
- [ ] `lib/ai/models.ts` - Model tanimlari
- [ ] `lib/agents/types.ts` - Ajan tip tanimlari
- [ ] `lib/agents/text-craft.ts` - TextCraft ajan
- [ ] `lib/agents/registry.ts` - Ajan kayit defteri
- [ ] `app/api/chat/route.ts` - Streaming chat endpoint
- [ ] `lib/store/chat-store.ts` - Zustand sohbet store
- [ ] `components/chat/*` - Sohbet UI bilesenleri
- [ ] `app/agent/[agentId]/page.tsx` - Ajan sohbet sayfasi
- [ ] Temel streaming sohbet calisiyor mu? TEST

## Faz 2: Tum Ajanlar + Dashboard (Hafta 2)
- [ ] `lib/agents/pixel-forge.ts` - PixelForge ajan
- [ ] `lib/agents/motion-lab.ts` - MotionLab ajan
- [ ] `lib/agents/dimension-x.ts` - DimensionX ajan
- [ ] `components/dashboard/*` - Dashboard bilesenleri
- [ ] `app/page.tsx` - Dashboard ekrani
- [ ] `components/chat/model-selector.tsx` - Model secici
- [ ] `components/chat/prompt-output.tsx` - Prompt cikti bileseni
- [ ] `components/layout/*` - Header, sidebar
- [ ] `lib/db/*` - Dexie.js IndexedDB entegrasyonu
- [ ] `hooks/use-prompt-history.ts` - Gecmis hook'u
- [ ] 4 ajan arasinda gecis calisiyor mu? TEST

## Faz 3: Boost Ozelligi (Hafta 3)
- [ ] `lib/boost/orchestrator.ts` - Boost orkestrator
- [ ] `lib/boost/evaluators/text-evaluator.ts` - Metin degerlendirici
- [ ] `lib/boost/evaluators/image-evaluator.ts` - Gorsel degerlendirici
- [ ] `lib/boost/strategies.ts` - Iyilestirme stratejileri
- [ ] `app/api/boost/route.ts` - Boost SSE endpoint
- [ ] `app/api/boost/generate/route.ts` - Hedef modele gonder
- [ ] `app/api/boost/evaluate/route.ts` - Sonuc degerlendir
- [ ] `components/chat/boost-button.tsx` - Boost butonu
- [ ] `components/chat/boost-progress.tsx` - Ilerleme gosterimi
- [ ] `hooks/use-boost.ts` - Boost hook'u
- [ ] `lib/utils/rate-limiter.ts` - Rate limiter
- [ ] `lib/utils/cost-calculator.ts` - Maliyet hesaplama
- [ ] Boost dongusu dogru calisiyor mu? TEST

## Faz 4: Cilalanma + Deploy (Hafta 4)
- [ ] `app/settings/page.tsx` - Ayarlar ekrani
- [ ] `components/settings/*` - API anahtar ve tercih formlari
- [ ] `lib/store/usage-store.ts` - Maliyet takip store
- [ ] `components/dashboard/usage-stats.tsx` - Kullanim istatistikleri
- [ ] Prompt favorileri ozelligi
- [ ] Karanlik/acik tema (next-themes)
- [ ] Responsive kontrol (mobile + tablet)
- [ ] `lib/utils/crypto.ts` - API anahtar sifreleme
- [ ] Hata sinir bilesenleri (error boundaries)
- [ ] Loading/skeleton durumları
- [ ] `.env.local` ornegi -> `.env.example`
- [ ] `vercel.json` yapilandirmasi
- [ ] Vercel'e deploy
- [ ] Son kullanici testi
