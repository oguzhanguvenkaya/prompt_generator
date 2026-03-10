# AI Prompt Generator — Research Archive
## Multi-Agentic Prompt Generator System: Training Data & Reference Materials

> **Version**: 1.0 | **Date**: March 2026 | **Total Prompts**: 232 | **Models**: 6

---

## Archive Contents

This archive provides comprehensive training data and reference materials for a multi-agentic AI prompt generator system supporting 6 AI generation models.

### Files in This Archive

| File | Description | Primary Use |
|------|-------------|-------------|
| `prompt_archive.md` | 232 categorized, rated prompt examples | Agent training data, RAG database |
| `model_presets_and_specs.md` | Technical specs and presets for all 6 models | System configuration, parameter defaults |
| `prompt_techniques_and_patterns.md` | Analysis of what works and why | Agent reasoning, quality scoring |
| `processed_prompts_final.json` | Structured JSON of all prompts | Database import, API integration |
| `veo31_specs.md` | Veo 3.1 detailed specifications | Model-specific reference |
| `kling30_specs.md` | Kling 3.0 detailed specifications | Model-specific reference |
| `seedance_seedream_specs.md` | Seedance 2.0 & Seedream 2.0 specs | Model-specific reference |
| `nanobana_specs.md` | Nano Banana Pro specifications | Model-specific reference |
| `flux_specs.md` | Flux model family specifications | Model-specific reference |

---

## Prompt Statistics

| Model | Prompts | Categories | Avg Rating |
|-------|---------|-----------|------------|
| Veo 3.1 | 44 | 12 | 4.4/5 |
| Kling 3.0 | 35 | 10 | 4.3/5 |
| Seedream 2.0 | 42 | 8 | 4.2/5 |
| Nano Banana Pro | 35 | 9 | 4.4/5 |
| Flux | 41 | 10 | 4.5/5 |
| Seedance 2.0 | 35 | 9 | 4.5/5 |
| **TOTAL** | **232** | **58** | **4.4/5** |

---

## Category Coverage

### Image Generation Models (Seedream 2.0, Nano Banana Pro, Flux)

| Category | Models Covered |
|----------|---------------|
| E-commerce Product Photography | All 3 |
| Fashion & Editorial | All 3 |
| Portrait Photography | All 3 |
| Food & Beverage | Seedream, Nano Banana |
| Architecture & Interior | Seedream, Nano Banana |
| Illustration & Children's Book | All 3 |
| Abstract & Fine Art | All 3 |
| Concept Art & Fantasy | Flux, Nano Banana |
| Street Photography & Documentary | Flux |
| Marketing & Social Media | Nano Banana, Seedream |

### Video Generation Models (Veo 3.1, Kling 3.0, Seedance 2.0)

| Category | Models Covered |
|----------|---------------|
| Cinematic Drama | All 3 |
| Commercial & Advertising | All 3 |
| Nature & Documentary | Veo, Kling |
| Sci-Fi & Action | All 3 |
| Horror & Thriller | Veo, Kling |
| Music Video & Abstract | All 3 |
| Fashion & Lifestyle | Kling, Veo |
| Anime & Stylized | Kling |
| Brand & Corporate | Seedance, Veo |
| Social Media (Vertical) | Kling, Seedance |

---

## Quick Reference: Model Selection

| If the user wants... | Recommend |
|---------------------|-----------|
| Video with dialogue/audio | Veo 3.1 |
| Anime or stylized video | Kling 3.0 |
| Social media vertical video | Kling 3.0 or Seedance 2.0 |
| Physics-accurate video | Seedance 2.0 |
| Multi-reference video | Seedance 2.0 |
| Photorealistic images | Flux FLUX.2 Pro |
| E-commerce product images | Nano Banana Pro or Seedream 2.0 |
| Bilingual (Chinese/English) | Seedream 2.0 |
| Complex multi-reference images | Nano Banana Pro |
| Fast image prototyping | Flux schnell |
| Fine art / concept art | Flux dev or Nano Banana Pro |

---

## Key Insights for Agent Training

### What Consistently Earns 5 Stars

1. **Model-specific technique activation** — Using timestamp prompting for Veo, @reference for Seedance, camera specs for Flux
2. **Named style/artist references** — "Studio Ghibli", "Architectural Digest", "Leica M3"
3. **Specific lighting direction** — "soft natural window light from the left" beats "good lighting"
4. **Audio cues in video prompts** — Especially critical for Veo 3.1
5. **Subject-first ordering** — Critical for Flux, beneficial for all models
6. **Natural language sentences** — Especially for Flux, beneficial for all models

### What Consistently Fails

1. **Keyword lists** — Especially harmful for Flux
2. **Missing environment** — Subject floating in void
3. **Vague quality terms** — "beautiful, amazing, high quality" without specifics
4. **Contradictory styles** — Multiple incompatible aesthetic anchors
5. **Negative prompts in Flux** — Architecture doesn't support them
6. **Missing audio cues in Veo 3.1** — Wastes the model's unique capability

---

## Integration Notes for Prompt Generator System

### For the Main Agent (TextCraft/PixelForge/MotionLab)

The brainstorming workflow should:
1. Identify the target model first
2. Ask about use case/category to select relevant prompt templates
3. Use the 7-element structure as the question framework
4. Apply model-specific techniques based on selected model
5. Rate the generated prompt using the 5-star criteria

### For the Assistant Agent (RAG)

The assistant agent should index:
- `processed_prompts_final.json` for semantic similarity search
- `prompt_techniques_and_patterns.md` for technique recommendations
- `model_presets_and_specs.md` for parameter suggestions

### Recommended Database Schema

```json
{
  "prompt_id": "veo31_001",
  "model": "Veo 3.1",
  "category": "Cinematic, Landscape",
  "subcategory": "Fantasy",
  "prompt_text": "...",
  "rating": 5,
  "why_it_works": "...",
  "model_notes": "...",
  "techniques_used": ["timestamp_prompting", "audio_cues", "crane_shot"],
  "keywords": ["crane shot", "orchestral score", "epic"],
  "use_case": "narrative_video",
  "platform": "youtube",
  "duration": "8s",
  "aspect_ratio": "16:9"
}
```
