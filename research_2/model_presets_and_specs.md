# AI Model Presets & Technical Specifications
## Reference Guide for Prompt Generator System

> **Version**: 1.0 | **Date**: March 2026 | **Models**: Veo 3.1, Kling 3.0, Seedream 2.0, Nano Banana Pro, Flux, Seedance 2.0

---

## 1. Veo 3.1 (Google DeepMind)

### Model Overview
Veo 3.1 is Google's flagship video generation model with native audio generation capability. It is the first major video model to generate synchronized audio (dialogue, sound effects, ambient sound) alongside video, making it uniquely powerful for cinematic and commercial content.

### Technical Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| Max Resolution | 4K | 720p/1080p for standard, 4K for hero shots |
| Duration Range | 5s – 30s+ | 8s optimal for social, 30s for narrative |
| Aspect Ratios | 16:9, 9:16, 1:1 | 9:16 for YouTube Shorts/TikTok |
| Input Modes | T2V, I2V, Start/End Frame | S/E Frame for controlled transitions |
| Native Audio | Yes (unique feature) | Dialogue, SFX, ambient sound |
| Frame Rate | 24fps, 30fps | 24fps for cinematic look |
| Access | Google AI Studio, Vertex AI, Flow | Flow for consumer use |

### Prompt Formula
**[Cinematography] + [Subject] + [Action] + [Context/Setting] + [Style & Ambiance] + [Audio]**

The 5-element structure (plus audio) is the proven formula for consistent Veo 3.1 results. Audio cues should always be included as Veo 3.1 is the only model that natively generates synchronized sound.

### Prompt Modes

| Mode | Use Case | Key Instruction |
|------|----------|----------------|
| Text-to-Video (T2V) | Concept exploration, rapid prototyping | Full scene description |
| Image-to-Video (I2V) | Animating static frames | Describe motion only |
| Start/End Frame | Controlled transitions | Describe both frames + transition |
| Timestamp Prompting | Multi-shot sequences | [00:00-00:03] format |
| Ingredients to Video | Character/scene consistency | Reference images + scene description |

### Camera Movement Vocabulary

| Term | Effect | Best For |
|------|--------|----------|
| Dolly push/pull | Smooth forward/backward | Reveals, intimacy |
| Crane shot | Vertical ascent/descent | Epic reveals, scale |
| Tracking shot | Follows subject | Action, character movement |
| Handheld | Organic, documentary feel | Realism, urgency |
| Drone/aerial | Wide overhead | Landscapes, establishing shots |
| Arc/orbit | Circular movement | Product showcases, drama |
| Hitchcock zoom | Dolly + zoom opposite | Horror, psychological tension |

### Lighting Vocabulary

| Term | Mood | Best For |
|------|------|----------|
| Golden hour | Warm, romantic | Lifestyle, fashion, nature |
| Magic hour | Dramatic, transitional | Cinematic, editorial |
| Overcast | Soft, even | Portraits, documentary |
| Harsh fluorescent | Cold, institutional | Horror, corporate, retro |
| Venetian blind shadows | Film noir | Mystery, drama |
| Three-point lighting | Professional, clean | Commercial, interview |
| Backlight/rim light | Silhouette, halo | Fashion, product |

### Audio Cue Examples

| Scene Type | Audio Cue |
|-----------|-----------|
| Nature | "Gentle wind ambience building into orchestral score" |
| Urban | "Footsteps and distant traffic wash, muted indie guitar" |
| Horror | "Silence broken by a single, distant heartbeat" |
| Commercial | "Subtle ambient tone, no music" |
| Action | "Deep bass rumble, energy weapon sounds, explosion" |

### Timestamp Prompt Format
```
[00:00-00:02] Shot description. SFX: Sound description.
[00:02-00:04] Shot description. Emotion: Emotional note.
[00:04-00:06] Shot description. Audio: Music description.
[00:06-00:08] Shot description.
```

---

## 2. Kling 3.0 (Kuaishou)

### Model Overview
Kling 3.0 is Kuaishou's advanced video generation model with strong character consistency, cinematic quality, and support for both realistic and stylized (anime, cartoon) outputs. It offers advanced camera control and a creativity parameter for balancing realism vs. artistic interpretation.

### Technical Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| Max Resolution | 1080p | 720p for standard, 1080p for professional |
| Duration Range | 5s – 10s | 10s for narrative sequences |
| Aspect Ratios | 16:9, 9:16, 1:1 | 9:16 for TikTok/Reels |
| Input Modes | T2V, I2V, Character Reference | Character ref for consistency |
| Creativity Parameter | 0.5 – 1.0 | 0.5 = realistic, 1.0 = creative |
| Camera Control | Basic, Advanced | Advanced for complex movements |
| Style Support | Realistic, Anime, Cartoon, Cinematic | Strong anime generation |
| Access | Kling AI platform, API | Global access |

### Prompt Structure
**[Subject + Character Description] + [Action/Performance] + [Environment] + [Camera Movement] + [Style/Aesthetic] + [Lighting]**

Kling 3.0 responds well to detailed character descriptions and specific named cinematic techniques (e.g., "Hitchcock zoom", "Dutch angle").

### Creativity Parameter Guide

| Value | Output Style | Best For |
|-------|-------------|----------|
| 0.5 | Highly realistic, literal | Product shots, documentary |
| 0.7 | Balanced | Most use cases |
| 0.8 | Slightly stylized | Fashion, lifestyle |
| 1.0 | Highly creative | Art, music videos, abstract |

### Style Presets

| Style | Trigger Words | Best For |
|-------|--------------|----------|
| Cinematic | "cinematic color grade", "teal and orange", "film grain" | Drama, action |
| Anime | "anime style", "Studio Ghibli", "manga aesthetic" | Character, fantasy |
| Documentary | "documentary style", "natural lighting", "handheld" | Lifestyle, interview |
| Horror | "atmospheric", "flickering lights", "slow push" | Horror, thriller |
| Commercial | "TV commercial style", "brand video aesthetic" | Advertising |
| Music Video | "music video aesthetic", "dynamic cuts", "beat sync" | Entertainment |

### Camera Movement Vocabulary

| Term | Effect |
|------|--------|
| Dolly zoom (Hitchcock zoom) | Psychological tension |
| 360-degree orbit | Product showcase, drama |
| Aerial descent | Fantasy, establishing |
| Low-angle | Power, dominance |
| Dutch angle | Unease, tension |
| Tracking shot | Following action |
| Speed ramp | Slow-mo to fast |

---

## 3. Seedream 2.0 (ByteDance)

### Model Overview
Seedream 2.0 is ByteDance's bilingual (Chinese-English) image generation foundation model. It excels at text rendering in both languages, making it uniquely suited for Asian market content, bilingual marketing materials, and high-fidelity image generation across diverse styles.

### Technical Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| Max Resolution | 4K | 2K for commercial, 4K for print |
| Aspect Ratios | 1:1, 3:2, 2:3, 9:16, 16:9 | Match platform requirements |
| Language Support | Chinese + English (bilingual) | Native bilingual text rendering |
| Style Range | Photorealistic, Anime, Illustration, 3D, Abstract | Broad style coverage |
| Text Rendering | Excellent (both languages) | Best-in-class for Asian markets |
| Quality Levels | Standard, High, Ultra | Ultra for hero images |

### Prompt Structure
**[Subject] + [Composition/Angle] + [Style Anchor] + [Lighting] + [Quality Modifiers]**

Seedream 2.0 benefits from specific surface materials, light direction, and camera angle specifications. Style anchors (e.g., "Beatrix Potter", "Architectural Digest") are highly effective.

### Style Presets

| Style | Key Trigger Words | Use Case |
|-------|------------------|----------|
| E-commerce Product | "white background", "studio lighting", "commercial quality" | Product shots |
| Fashion Editorial | "editorial", "magazine aesthetic", "dramatic side lighting" | Fashion |
| Food Photography | "flat lay", "overhead", "food styling", "restaurant quality" | Food & beverage |
| Children's Illustration | "watercolor", "pastel colors", "Beatrix Potter" | Children's content |
| Architecture | "Architectural Digest", "wide angle", "golden hour" | Interior/exterior |
| Abstract Art | "fractal", "cosmic", "gallery-quality" | Art, backgrounds |
| Anime/Manga | "anime style", "manga aesthetic", "cel shading" | Entertainment |

### Lighting Presets

| Lighting Type | Description | Best For |
|--------------|-------------|----------|
| Natural window light | Soft, directional | Portraits, product |
| Studio three-point | Professional, controlled | Commercial |
| Golden hour | Warm, dramatic | Architecture, lifestyle |
| Flat diffused | Even, no shadows | E-commerce |
| Dramatic side | High contrast | Fashion, editorial |
| Overhead flat lay | Even, top-down | Food, product |

### E-commerce Specific Presets

| Preset | Settings | Notes |
|--------|----------|-------|
| White background | "pure white background, studio lighting, no shadows" | Standard e-commerce |
| Ghost mannequin | "invisible mannequin effect, clean white background" | Apparel |
| Lifestyle context | "natural setting, lifestyle photography" | Premium products |
| Flat lay | "overhead flat lay, styled composition" | Accessories, food |
| 360 product | "multiple angles, consistent lighting" | Detailed products |

---

## 4. Nano Banana Pro (Google Gemini 3 Pro Image)

### Model Overview
Nano Banana Pro (Gemini 3 Pro Image) is Google's most capable image generation model, built on the Gemini 3 architecture with deep reasoning before generation. It uniquely supports live web search, up to 14 reference images per prompt, and conversational refinement, making it ideal for complex, multi-reference creative projects.

### Technical Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| Max Resolution | 4K | 1K, 2K, 4K options |
| Aspect Ratios | 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 | Most comprehensive |
| Reference Images | Up to 14 per prompt | For style/character consistency |
| Context Window (Input) | 65,536 tokens | Large context for complex prompts |
| Context Window (Output) | 32,768 tokens | For detailed responses |
| Web Search | Yes (live) | For current products/events |
| Watermark | C2PA + SynthID | Content authentication |
| Text Rendering | 10+ languages | Including non-Latin scripts |

### Five Prompting Frameworks

**Framework 1: Text-to-Image**
Formula: `[Subject] + [Action] + [Location/Context] + [Composition] + [Style]`

**Framework 2: Multimodal (with references)**
Formula: `[Reference images] + [Relationship instruction] + [New scenario]`

**Framework 3: Real-time Web Search**
Formula: `[Source/Search request] + [Analytical task] + [Visual translation]`

**Framework 4: Text Rendering & Localization**
- Use quotes for desired text: `"Happy Birthday"`
- Specify font style: `"bold sans-serif"`
- Specify placement: `"centered at top"`

**Framework 5: Storyboarding & Sequences**
- Generate consistent character across multiple frames
- Use same character descriptor throughout

### Prompt Starters (Strong Verbs)
Always begin with: `Generate`, `Create`, `Edit`, `Transform`, `Design`, `Illustrate`, `Render`

### Named Lighting Techniques

| Technique | Effect | Best For |
|-----------|--------|----------|
| Rembrandt lighting | Triangle of light on cheek | Portraits, drama |
| Butterfly lighting | Shadow under nose | Fashion, glamour |
| Split lighting | Half face lit | Drama, character |
| Rim/backlight | Edge highlight | Fashion, product |
| Softbox | Even, diffused | Commercial, interview |
| Golden hour | Warm, directional | Lifestyle, outdoor |

### Reference Image Strategy

| Reference Count | Strategy | Use Case |
|----------------|----------|----------|
| 1 reference | Style transfer | Artistic consistency |
| 2-3 references | Character + environment | Scene building |
| 4-7 references | Multi-element composition | Complex scenes |
| 8-14 references | Full production design | Film/game concept art |

### Aspect Ratio Guide

| Ratio | Dimensions | Platform |
|-------|-----------|---------|
| 1:1 | Square | Instagram, social |
| 9:16 | Vertical | TikTok, Stories, Reels |
| 16:9 | Landscape | YouTube, presentations |
| 21:9 | Ultra-wide | Cinematic, desktop wallpaper |
| 4:5 | Portrait | Instagram feed |
| 3:2 | Standard photo | Print, web |

---

## 5. Flux (Black Forest Labs)

### Model Overview
Flux is Black Forest Labs' family of image generation models built on a 32-billion-parameter rectified flow transformer architecture. Unlike Stable Diffusion, Flux uses natural language processing (T5-XXL or Mistral Small 3.2) to understand prompts as sentences, not keyword lists. It does not support negative prompts.

### Model Variants

| Model | Parameters | Steps | Best For |
|-------|-----------|-------|---------|
| FLUX.1 [schnell] | - | 1-4 | Rapid prototyping, real-time |
| FLUX.1 [dev] | - | 20-50 | Community LoRAs, quality output |
| FLUX 1.1 [pro] Ultra | - | - | 4MP images, Raw mode |
| FLUX.2 [pro] | 32B | - | Latest gen, JSON prompting, HEX colors |
| FLUX.2 [dev] | 32B | Configurable | LoRA training, open-weight |
| FLUX Kontext | - | - | Image editing, character consistency |
| FLUX.2 Klein 4B | 4B | - | Consumer GPU (RTX 3090/4070) |
| FLUX.2 Klein 9B | 9B | - | Consumer GPU, higher quality |

### Technical Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| Max Resolution | 4MP (pro ultra) | Raw mode for less-processed look |
| Prompt Style | Natural language ONLY | No keyword lists |
| Negative Prompts | NOT SUPPORTED | Use positive phrasing |
| Weight Syntax | NOT SUPPORTED | No (word:1.5) or (emphasis)++ |
| Optimal Prompt Length | 40-50 words | Max 512 tokens (dev), 256 (schnell) |
| Text Encoder | T5-XXL (FLUX.1), Mistral 24B (FLUX.2) | Sentence understanding |
| Special Features | JSON prompting, HEX colors (FLUX.2) | Precise color control |

### Prompt Structure (Token Weight Order)
1. **Subject** — What is the image of? (highest weight)
2. **Action/Pose** — What is the subject doing?
3. **Environment** — Where is this happening?
4. **Lighting** — How is the scene lit?
5. **Style/Technical** — Camera, look, mood (lowest weight)

**Critical Rule**: Earlier tokens receive more weight. Always put the most important element first.

### Natural Language vs. Keyword Style

| Approach | Example | Result |
|----------|---------|--------|
| **WRONG** (keyword) | `woman, red dress, beach, sunset, bokeh, 8k` | Mediocre |
| **CORRECT** (natural) | `A woman in a red silk dress standing barefoot on a sandy beach at sunset, warm golden light behind her, shallow depth of field with soft bokeh across the water` | Excellent |

### Negative Prompt Alternative

| Instead of (negative) | Use (positive) |
|----------------------|----------------|
| "blurry, low quality" | "sharp focus, crisp detail" |
| "bad hands, deformed" | "accurate hands, natural proportions" |
| "overexposed" | "well-exposed, balanced lighting" |
| "flat, boring" | "dynamic composition, visual depth" |

### Camera/Lens Specifications (Highly Effective)

| Camera | Aesthetic | Best For |
|--------|-----------|---------|
| Sony A7IV + 85mm f/1.8 | Modern, sharp, shallow DOF | Portraits |
| Fujifilm GFX 100S + 110mm f/2 | Warm, medium format | Fashion, fine art |
| Canon EOS R5 + 100mm macro | Clinical, detailed | Product, nature |
| Leica M3 + 35mm Summicron | Documentary, grain | Street photography |
| Large format 4x5 film | Tonal range, classic | Landscape, fine art |
| Hasselblad 500C/M | Square, medium format | Fashion, portrait |

### FLUX.2 Special Features

| Feature | Usage | Example |
|---------|-------|---------|
| JSON prompting | Structured input | `{"subject": "...", "style": "..."}` |
| HEX color | Exact color control | `"painted in #FF6B35 and #004E89"` |
| Raw mode (pro ultra) | Candid, less-processed | Add "raw" or "candid" to prompt |

---

## 6. Seedance 2.0 (ByteDance)

### Model Overview
Seedance 2.0 is ByteDance's multimodal video generation model released in February 2026. It features a dual-branch diffusion transformer that processes visual and audio data simultaneously, an @reference system for granular element control, and physics-aware generation that simulates real-world forces.

### Technical Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| Max Resolution | 1080p (2K for pro) | Native 720p, upscaled to 1080p |
| Duration Range | 4s – 15s | 15s max for narrative sequences |
| Aspect Ratios | 16:9, 9:16, 1:1 | Match platform |
| Reference Files | Up to 12 per generation | 9 images + 3 video + 3 audio |
| @Reference System | Tag-based control | @Image1, @Video1, @Audio1 |
| Physics Simulation | Auto | Weight, friction, gravity, collision |
| Audio Generation | Native | Synchronized with visuals |
| Generation Time | 60-90 seconds | Varies by duration/resolution |
| Access | Jimeng (Dreamina) platform | ByteDance ecosystem |

### Three Core Prompt Frameworks

**Framework 1: Cinematic Single-Shot**
`Subject + Scene/Atmosphere + Action/Performance + Camera Movement + Style/Lighting`

**Framework 2: Multi-Shot Narrative**
`Shot 1 description -> "Cut to:" -> Shot 2 description -> "Cut to:" -> Shot 3 description`

Transition cues: `"Cut to:"`, `"Transition to:"`, `"Shift to:"`

**Framework 3: Reference-Driven Composition**
`Base description + @Image1 (character) + @Video1 (motion) + @Image2 (environment) + @Audio1 (rhythm)`

### Reference File Strategy

| Reference Type | Tag | Purpose | Quality Requirement |
|---------------|-----|---------|---------------------|
| Character image | @Image1 | Actor/character appearance | Min 1080p, clear face |
| Environment image | @Image2 | Location/setting | Min 1080p, full scene |
| Style image | @Image3 | Visual aesthetic | Any quality |
| Motion video | @Video1 | Camera/action reference | Clear action, 15s max |
| Music | @Audio1 | Rhythm/mood | Clear beat, 15s max |
| Dialogue | @Audio2 | Voice reference | Clear speech |

### Duration Strategy

| Duration | Use Case | Prompt Complexity |
|----------|----------|------------------|
| 4 seconds | Testing, loops, product reveals | Simple, single action |
| 5-10 seconds | Social media, ads, teasers | 1-2 shots, clear narrative |
| 10-15 seconds | Brand films, narrative sequences | 2-3 shots, story arc |

### Physics-Aware Prompt Keywords

| Physical Effect | Trigger Words | Example |
|----------------|--------------|---------|
| Liquid dynamics | "cascade", "pour", "splash", "ripple" | "water cascades over rocks" |
| Cloth physics | "billows", "flows", "ripples in wind" | "silk dress billows dramatically" |
| Particle effects | "dust motes", "sparks", "embers" | "dust motes drift in sunlight" |
| Explosion physics | "decompression", "shockwave", "debris" | "explosive decompression" |
| Weather | "rain-slicked", "snow-covered", "fog" | "rain-slicked cobblestones" |
| Breath/steam | "breath visible in cold air", "steam rising" | "breath visible in cold air" |

### Camera Control Vocabulary

| Movement | Effect | Syntax |
|----------|--------|--------|
| Dolly push | Intimacy, reveal | "camera slowly pushes in" |
| Dolly pull | Distance, reveal | "camera pulls back" |
| 360-degree orbit | Drama, showcase | "camera executes 360-degree orbit" |
| Barrel roll | Action, disorientation | "dramatic barrel roll" |
| Tracking | Following action | "camera tracks alongside" |
| Crane | Scale, epic | "crane shot ascending" |
| Handheld | Documentary | "documentary-style handheld" |

---

## Cross-Model Comparison

### Model Selection Guide

| Use Case | Best Model | Why |
|----------|-----------|-----|
| Cinematic video with audio | Veo 3.1 | Native audio generation |
| Anime/stylized video | Kling 3.0 | Strong anime support |
| Asian market imagery | Seedream 2.0 | Bilingual text rendering |
| Complex multi-reference images | Nano Banana Pro | 14 reference images, web search |
| Photorealistic photography | Flux (FLUX.2 Pro) | Natural language, camera specs |
| Physics-accurate video | Seedance 2.0 | Physics simulation, @reference |
| Fast prototyping (image) | Flux schnell | 1-4 steps |
| E-commerce product images | Nano Banana Pro / Seedream 2.0 | Clean backgrounds, product focus |
| Social media video (vertical) | Kling 3.0 / Seedance 2.0 | 9:16 optimization |
| Multi-shot narrative video | Seedance 2.0 / Veo 3.1 | Multi-shot frameworks |

### Prompt Length Recommendations

| Model | Optimal Length | Max Length |
|-------|---------------|-----------|
| Veo 3.1 | 50-150 words | No hard limit |
| Kling 3.0 | 50-100 words | No hard limit |
| Seedream 2.0 | 30-80 words | No hard limit |
| Nano Banana Pro | 50-200 words | 65,536 tokens |
| Flux | 40-50 words | 512 tokens (dev) |
| Seedance 2.0 | 80-200 words | No hard limit |

### Universal Quality Modifiers

These modifiers work across all models to improve output quality:

| Modifier | Effect |
|----------|--------|
| "cinematic" | Film-like quality and composition |
| "photorealistic" | Realistic rendering |
| "high detail" | Increased detail level |
| "professional photography" | Commercial quality |
| "golden hour lighting" | Warm, flattering light |
| "shallow depth of field" | Bokeh, subject isolation |
| "film grain" | Organic, analog texture |
| "high contrast" | Dramatic tonal range |
| "editorial" | Magazine-quality aesthetic |
| "commercial quality" | Clean, polished output |

---

## Prompt Engineering Patterns

### The CO-STAR Framework (Universal)
- **C**ontext: Background information
- **O**bjective: What you want to achieve
- **S**tyle: Visual style/aesthetic
- **T**one: Mood/emotional quality
- **A**udience: Who is this for
- **R**esponse: Specific output requirements

### Component-Based Prompting
Break prompts into discrete components:
1. **Subject Component**: Who/what is the primary focus
2. **Action Component**: What is happening
3. **Environment Component**: Where/when
4. **Technical Component**: Camera, lens, lighting
5. **Style Component**: Aesthetic, mood, reference
6. **Audio Component** (video models): Sound design

### Successful Keyword Patterns

| Pattern | Example | Effect |
|---------|---------|--------|
| Camera + Subject | "Close-up of a woman" | Framing control |
| Lighting + Time | "Golden hour, late afternoon" | Mood setting |
| Style + Reference | "Studio Ghibli-inspired" | Aesthetic anchor |
| Material + Surface | "Matte black on marble" | Texture specificity |
| Emotion + Action | "Expression of wonder as she discovers" | Character depth |
| Speed + Motion | "Slow motion at the pour moment" | Temporal control |
| Audio + Silence | "No music. Audio: wind, heartbeat" | Tension building |
