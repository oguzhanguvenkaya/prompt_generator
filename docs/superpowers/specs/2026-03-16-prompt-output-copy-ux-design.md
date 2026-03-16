# Prompt Output Copy UX

## Problem
Agent'in urettigini prompt (ana + negatif) chat'te iki ayri `<pre>` blogu olarak render ediliyor. Kullanici tek seferde kopyalayamiyor, ayrica bloklar tek satir yuksekliginde yana kaydirmali — okunabilirligi dusuk.

## Cozum
Markdown'dan ```prompt ve ```negative bloklarini parse et, mevcut PromptOutput bilesenini chat akisina entegre et. Tek "Kopyala" butonu her ikisini birlestirerek kopyalar.

## Kopyalama Formati
```
ana prompt metni

--neg
negatif prompt metni
```
Negatif prompt yoksa sadece ana prompt kopyalanir.

## Pre Stili
- `min-h-[7.5rem]` — minimum 5 satir gorunur
- `max-h-[20rem]` — ~15 satirdan sonra dikey scroll
- `whitespace-pre-wrap` — satir kirma aktif, yana kaydirma yok

## Dosyalar

### 1. `lib/utils/parse-prompt-blocks.ts` (Yeni)
Markdown content'ten prompt/negative code fence'leri cikarir.

Girdi: markdown string
Cikti: `{ segments: Array<TextSegment | PromptSegment> }`

- TextSegment: `{ type: "text", content: string }`
- PromptSegment: `{ type: "prompt", prompt: string, negativePrompt?: string }`

Parse mantigi: Regex ile ```prompt ... ``` ve hemen ardindan ```negative ... ``` bloklarini yakala. Aradaki metin text segment olarak kalir.

### 2. `components/chat/prompt-output.tsx` (Guncelleme)
- `handleCopy`: negativePrompt varsa `prompt + "\n\n--neg\n" + negativePrompt` birlestir
- `<pre>` class: `min-h-[7.5rem] max-h-[20rem] overflow-y-auto whitespace-pre-wrap`

### 3. `components/chat/chat-message.tsx` (Guncelleme)
- Assistant mesajlari icin `parsePromptBlocks(content)` cagir
- Prompt segmenti bulunursa: text → ReactMarkdown, prompt → PromptOutput
- Bulunmazsa: mevcut davranis (sadece ReactMarkdown)
