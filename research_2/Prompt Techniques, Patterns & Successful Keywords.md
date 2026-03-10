# Prompt Techniques, Patterns & Successful Keywords
## Agent Training Reference — What Works and Why

> This document analyzes successful prompt patterns across all 6 models to help the AI agent understand the underlying mechanics of effective prompting.

---

## Part 1: Universal Prompt Anatomy

Every successful prompt, regardless of model, contains some combination of these elements. The more precisely each element is defined, the better the output.

### The 7 Core Elements

| Element | Role | Example |
|---------|------|---------|
| **Subject** | Primary focus of the image/video | "A 35-year-old Japanese woman" |
| **Action/State** | What the subject is doing | "standing in a sunlit apartment" |
| **Environment** | Setting, location, time | "Tokyo, morning, sheer curtains" |
| **Composition** | Camera angle, framing, distance | "shot on Fujifilm GFX 100S, 110mm f/2" |
| **Lighting** | Light source, quality, direction | "warm morning light through sheer curtains" |
| **Style** | Aesthetic, mood, reference | "natural, unposed moment" |
| **Technical** | Resolution, quality, format | "shallow depth of field, soft bokeh" |

---

## Part 2: Model-Specific Techniques

### Veo 3.1 — What Makes It Work

**Unique Capability**: Native audio generation. Always include audio cues.

**Highest-Impact Techniques**:

1. **Timestamp Prompting** (Rating impact: +1.5 stars)
   - Format: `[00:00-00:03] Shot description. SFX: Sound.`
   - Creates multi-shot sequences with precise pacing
   - Best for: narrative videos, music videos, documentary

2. **Audio-First Design** (Rating impact: +1.0 star)
   - Include specific audio: "Audio: Gentle wind ambience building into orchestral score"
   - Specify absence: "No music. Audio: refrigerator hum, distant traffic"
   - Best for: emotional scenes, horror, commercial

3. **5-Element Formula** (Rating impact: +0.8 stars)
   - `[Camera] + [Subject] + [Action] + [Context] + [Style+Audio]`
   - Consistent structure prevents model guessing
   - Best for: all use cases

4. **Reference-Based Character Consistency** (Rating impact: +1.2 stars)
   - "Using the provided images for [character]..."
   - Maintains appearance across multiple shots
   - Best for: narrative series, character-driven content

**Power Words for Veo 3.1**:
- Camera: `crane shot`, `dolly push`, `handheld tracking`, `180-degree arc`
- Audio: `SFX:`, `Audio:`, `ambient`, `swelling orchestral score`
- Style: `cinematic`, `TV commercial style`, `documentary`, `film noir`
- Quality: `gritty realism`, `moody`, `awe-inspiring`

---

### Kling 3.0 — What Makes It Work

**Unique Capability**: Creativity parameter (0.5-1.0) and strong anime/stylized output.

**Highest-Impact Techniques**:

1. **Named Cinematic Techniques** (Rating impact: +1.2 stars)
   - "Hitchcock zoom (dolly zoom)", "Dutch angle", "speed ramp"
   - Kling 3.0 recognizes and executes named techniques precisely
   - Best for: horror, drama, action

2. **Style Reference Anchoring** (Rating impact: +1.0 star)
   - "Studio Ghibli-inspired", "BBC Earth aesthetic", "Vogue editorial"
   - Strong publication/studio references trigger quality presets
   - Best for: anime, documentary, fashion

3. **Creativity Parameter Calibration** (Rating impact: +0.8 stars)
   - Low (0.5): Product shots, realistic scenes
   - High (1.0): Abstract, artistic, experimental
   - Best for: all use cases

4. **Vertical Format Specification** (Rating impact: +0.6 stars)
   - "Vertical format (9:16)", "Instagram Reels style", "TikTok aesthetic"
   - Kling 3.0 optimizes composition for specified platform
   - Best for: social media content

**Power Words for Kling 3.0**:
- Camera: `Hitchcock zoom`, `Dutch angle`, `360-degree orbit`, `speed ramp`
- Style: `teal and orange color grade`, `film grain`, `anime style`, `cyberpunk`
- Quality: `cinematic realism`, `high contrast`, `motion blur`
- Platform: `Instagram Reels style`, `TikTok aesthetic`, `vertical format`

---

### Seedream 2.0 — What Makes It Work

**Unique Capability**: Bilingual text rendering (Chinese + English). Best for Asian markets.

**Highest-Impact Techniques**:

1. **Surface Material Specification** (Rating impact: +1.0 star)
   - "light oak wooden surface", "white marble", "worn wooden table"
   - Specific materials dramatically improve texture quality
   - Best for: product photography, food, interior

2. **Light Direction + Source** (Rating impact: +1.2 stars)
   - "Soft natural window light from the left"
   - "Warm amber bar lighting"
   - "Overhead flat lay lighting"
   - Best for: all photography styles

3. **Publication/Style Anchors** (Rating impact: +1.3 stars)
   - "Architectural Digest style", "Beatrix Potter illustrations", "Vogue editorial"
   - Strong publication references trigger quality presets
   - Best for: architecture, illustration, fashion

4. **Camera Angle Specification** (Rating impact: +0.8 stars)
   - "Shot from a 45-degree angle"
   - "Overhead flat lay"
   - "Wide angle lens perspective"
   - Best for: product, food, architecture

**Power Words for Seedream 2.0**:
- Surface: `white marble`, `light oak`, `worn wooden`, `ceramic`, `matte black`
- Light: `soft natural window light from the left`, `warm amber`, `diffused overhead`
- Style: `Architectural Digest`, `Beatrix Potter`, `restaurant quality`, `commercial quality`
- Angle: `45-degree angle`, `overhead flat lay`, `wide angle`, `macro close-up`

---

### Nano Banana Pro — What Makes It Work

**Unique Capability**: 14 reference images, live web search, deep reasoning before generation.

**Highest-Impact Techniques**:

1. **Strong Verb Openers** (Rating impact: +0.8 stars)
   - Always start with: `Generate`, `Create`, `Edit`, `Transform`, `Design`
   - Activates the model's reasoning-before-generation process
   - Best for: all use cases

2. **Cultural Reference Integration** (Rating impact: +1.5 stars)
   - "inspired by Michelangelo's Creation of Adam"
   - "Beatrix Potter illustrations"
   - "Roger Dean album artwork"
   - Nano Banana Pro's reasoning capability interprets and modernizes references
   - Best for: editorial, concept art, illustration

3. **Named Lighting Techniques** (Rating impact: +1.0 star)
   - "Rembrandt lighting setup", "butterfly lighting", "split lighting"
   - Named techniques give precise lighting control
   - Best for: portraits, fashion, commercial

4. **Platform + Demographic Targeting** (Rating impact: +0.7 stars)
   - "Instagram-ready", "LinkedIn headshot", "Gen Z aesthetic"
   - Nano Banana Pro optimizes composition and style for specified platform/audience
   - Best for: marketing, social media, professional content

5. **Text Overlay Space Instruction** (Rating impact: +0.6 stars)
   - "Include space for text overlay at the top"
   - "Leave lower third clear for subtitle"
   - Best for: marketing materials, social media

**Power Words for Nano Banana Pro**:
- Openers: `Generate`, `Create`, `Edit`, `Transform`, `Design`, `Illustrate`
- Lighting: `Rembrandt lighting`, `butterfly lighting`, `split lighting`, `softbox`
- Reference: `Michelangelo`, `Beatrix Potter`, `Architectural Digest`, `Vogue`
- Platform: `Instagram-ready`, `LinkedIn`, `Gen Z aesthetic`, `magazine cover`

---

### Flux — What Makes It Work

**Unique Capability**: Natural language understanding via Mistral 24B (FLUX.2). No negative prompts.

**Highest-Impact Techniques**:

1. **Subject-First Ordering** (Rating impact: +1.5 stars)
   - Always put the most important element first
   - Earlier tokens receive more weight
   - WRONG: "Golden light, bokeh, woman in red dress on beach"
   - CORRECT: "A woman in a red silk dress on a beach at sunset, golden light, bokeh"
   - Best for: all use cases

2. **Camera + Lens Specification** (Rating impact: +1.3 stars)
   - "Shot on Sony A7IV with 85mm f/1.8 lens"
   - "Fujifilm GFX 100S with 110mm f/2"
   - "Leica M3 with 35mm Summicron"
   - Specific camera/lens combinations trigger characteristic aesthetics
   - Best for: portraits, landscapes, documentary

3. **Natural Language Sentences** (Rating impact: +2.0 stars)
   - Write complete sentences, not keyword lists
   - Include spatial relationships: "standing in front of", "behind her"
   - Include material details: "red silk dress", "wet black volcanic rock"
   - Best for: all use cases

4. **Positive Phrasing** (Rating impact: +0.8 stars)
   - No negative prompts supported
   - Instead of "not blurry" → "sharp focus, crisp detail"
   - Instead of "no bad hands" → "accurate hands, natural proportions"
   - Best for: all use cases

5. **40-50 Word Sweet Spot** (Rating impact: +0.5 stars)
   - Under 10 words: model fills in from training data
   - 40-50 words: optimal control
   - Over 200 words: model summarizes, loses detail
   - Best for: all use cases

**Power Words for Flux**:
- Camera: `shot on [specific camera]`, `[focal length] lens`, `f/[aperture]`
- Lighting: `warm morning light`, `soft backlight`, `cool blue tones`, `golden hour`
- Style: `photorealistic`, `candid`, `unposed`, `natural moment`
- Quality: `sharp focus`, `crisp detail`, `natural proportions`, `accurate`

---

### Seedance 2.0 — What Makes It Work

**Unique Capability**: @reference system, physics simulation, dual-branch audio-visual processing.

**Highest-Impact Techniques**:

1. **@Reference System** (Rating impact: +2.0 stars)
   - `@Image1` for character, `@Image2` for environment, `@Video1` for motion, `@Audio1` for rhythm
   - Provides unprecedented visual consistency
   - Best for: brand content, character-driven narratives, music videos

2. **Physics Trigger Words** (Rating impact: +1.3 stars)
   - "breath visible in cold air", "rain-slicked roads", "cascade of bubbles"
   - Activates physics simulation for realistic motion
   - Best for: nature, action, product (liquids)

3. **Multi-Shot Cut Syntax** (Rating impact: +1.5 stars)
   - "Shot 1: ... Cut to: Shot 2: ... Cut to: Shot 3:"
   - Creates natural editorial cuts within single generation
   - Best for: narrative, documentary, brand films

4. **Audio-Visual Sync** (Rating impact: +1.2 stars)
   - "Sync the movement beats to @Audio1's musical rhythm"
   - "Audio: ice clinking, fizzing bubbles"
   - Dual-branch processing ensures perfect sync
   - Best for: music videos, commercials, product reveals

5. **Emotional Progression** (Rating impact: +1.0 star)
   - "Her expression shifts from blank to grief"
   - "Energy is positive and focused"
   - "Emotion: Wonder and reverence"
   - Best for: drama, character study, brand storytelling

**Power Words for Seedance 2.0**:
- Reference: `@Image1`, `@Video1`, `@Audio1`, `use as character reference`
- Physics: `cascade`, `billows`, `breath visible`, `rain-slicked`, `decompression`
- Cuts: `Cut to:`, `Transition to:`, `Shift to:`
- Camera: `dolly push`, `360-degree orbit`, `barrel roll`, `tracking shot`

---

## Part 3: Category-Specific Prompt Patterns

### E-commerce Product Photography

**Universal Pattern**:
```
[Product name + material] on [surface material]. [Lighting setup]. [Background]. 
[Camera angle]. [Style reference]. [Quality modifier].
```

**Best Models**: Nano Banana Pro, Seedream 2.0, Flux

**Key Words**:
- Background: `pure white background`, `seamless white`, `light oak surface`, `marble`
- Lighting: `soft studio lighting`, `three-point lighting`, `diffused natural light`
- Style: `commercial quality`, `Apple product photography aesthetic`, `Amazon product shot`
- Angle: `45-degree angle`, `overhead flat lay`, `eye-level`, `macro close-up`

**Rating Boosters**:
- Specify exact surface material (+0.5 stars)
- Name the lighting setup (+0.5 stars)
- Include "commercial quality" or brand reference (+0.7 stars)

---

### Cinematic Video

**Universal Pattern**:
```
[Camera movement] of [subject description], [action], [environment]. 
[Lighting]. [Style/color grade]. Audio: [sound design].
```

**Best Models**: Veo 3.1, Kling 3.0, Seedance 2.0

**Key Words**:
- Camera: `crane shot`, `dolly push`, `tracking shot`, `handheld`
- Grade: `teal and orange`, `warm amber`, `desaturated with selective color`
- Style: `cinematic`, `film grain`, `shallow depth of field`
- Audio (Veo): `swelling orchestral score`, `ambient hush`, `SFX:`

**Rating Boosters**:
- Specific camera movement name (+0.8 stars)
- Color grade specification (+0.5 stars)
- Audio cues (Veo 3.1 only) (+1.0 star)

---

### Portrait Photography

**Universal Pattern**:
```
[Shot type] of [subject description], [clothing/appearance]. 
[Location/background]. [Lighting technique]. [Camera/lens]. [Style].
```

**Best Models**: Flux, Nano Banana Pro, Seedream 2.0

**Key Words**:
- Shot: `close-up`, `medium shot`, `environmental portrait`
- Lighting: `Rembrandt lighting`, `soft side lighting`, `golden hour`
- Camera: `85mm f/1.8`, `50mm f/1.4`, `medium format`
- Style: `editorial`, `documentary`, `fashion magazine`

**Rating Boosters**:
- Named lighting technique (+1.0 star)
- Specific camera/lens (Flux) (+1.3 stars)
- Emotional context (+0.6 stars)

---

### Illustration & Art

**Universal Pattern**:
```
[Style anchor/medium] of [subject]. [Color palette]. [Mood/atmosphere]. 
[Detail level]. [Artist/publication reference].
```

**Best Models**: Nano Banana Pro, Seedream 2.0, Flux

**Key Words**:
- Medium: `watercolor`, `oil painting`, `digital art`, `ink illustration`
- Palette: `pastel colors`, `limited palette of [colors]`, `monochromatic`
- Reference: `Beatrix Potter`, `Studio Ghibli`, `Roger Dean`, `Monet`
- Detail: `intricate`, `detailed linework`, `loose brushwork`

**Rating Boosters**:
- Specific artist reference (+1.3 stars)
- Color palette specification (+0.7 stars)
- Medium specification (+0.8 stars)

---

### Food & Beverage

**Universal Pattern**:
```
[Shot angle] of [dish/drink description]. [Surface/setting]. 
[Lighting]. [Styling details]. [Quality reference].
```

**Best Models**: Seedream 2.0, Nano Banana Pro, Flux

**Key Words**:
- Angle: `overhead flat lay`, `45-degree angle`, `eye-level`
- Surface: `worn wooden table`, `marble surface`, `slate board`
- Styling: `scattered ingredients`, `garnished with`, `food styling`
- Quality: `restaurant quality`, `food magazine`, `editorial food photography`

**Rating Boosters**:
- Overhead/flat lay angle (+0.8 stars)
- Specific surface material (+0.6 stars)
- Food styling instruction (+0.7 stars)

---

### Sci-Fi & Fantasy

**Universal Pattern**:
```
[Environment description with scale]. [Subject/character]. [Lighting/atmosphere]. 
[Style reference]. [Technical quality].
```

**Best Models**: Flux, Nano Banana Pro, Kling 3.0

**Key Words**:
- Scale: `tiny human figure for scale`, `colossal`, `vast`
- Atmosphere: `bioluminescent`, `holographic`, `neon`, `ethereal`
- Style: `concept art`, `Roger Dean`, `cinematic VFX quality`
- Lighting: `volumetric light`, `rim light`, `dramatic contrast`

**Rating Boosters**:
- Scale contrast (tiny human vs. vast environment) (+1.0 star)
- Bioluminescence/light effects (+0.8 stars)
- Concept art style reference (+0.9 stars)

---

## Part 4: Prompt Failure Patterns (What NOT to Do)

### Common Mistakes by Model

| Model | Common Mistake | Why It Fails | Fix |
|-------|---------------|--------------|-----|
| Flux | Keyword lists | Model ignores, uses training defaults | Write natural sentences |
| Flux | Negative prompts | Architecture doesn't support them | Use positive phrasing |
| Flux | Subject at end | Low token weight, deprioritized | Put subject first |
| Flux | Weight syntax (word:1.5) | Completely ignored | Use descriptive language |
| Veo 3.1 | No audio cues | Misses unique capability | Always add Audio: section |
| Veo 3.1 | Vague camera | Model guesses, inconsistent | Specify exact movement |
| Kling 3.0 | No creativity setting | Default may not match intent | Set 0.5-1.0 explicitly |
| Seedance 2.0 | No @references | Loses visual consistency | Use @reference system |
| Seedance 2.0 | No cut syntax | Awkward transitions | Use "Cut to:" explicitly |
| Nano Banana Pro | Weak verb opener | Doesn't trigger reasoning | Start with Generate/Create |
| Seedream 2.0 | Generic lighting | Flat, uninspiring output | Specify direction + source |

### Universal Failure Patterns

1. **Overloading with contradictory styles**: "realistic anime watercolor oil painting" → Pick one anchor
2. **Burying the subject**: Long context before subject → Subject first, always
3. **Vague quality requests**: "high quality, beautiful, amazing" → Use specific technical terms
4. **Missing environment context**: Subject floating in void → Always specify setting
5. **No lighting specification**: Flat, uninspiring output → Always include lighting
6. **Too short (under 10 words)**: Model fills in from training data → Aim for 40-50 words minimum
7. **Too long (over 200 words for Flux)**: Model summarizes, loses detail → Keep within token limits

---

## Part 5: Prompt Rating Criteria

### 5-Star Rating System

| Rating | Criteria | Characteristics |
|--------|----------|----------------|
| ⭐⭐⭐⭐⭐ (5) | Exceptional | Unique technique, model-specific optimization, proven community success, covers all 7 elements |
| ⭐⭐⭐⭐ (4) | Strong | Covers most elements, clear structure, reliable output, good style reference |
| ⭐⭐⭐ (3) | Adequate | Basic structure, some specificity, consistent but not exceptional |
| ⭐⭐ (2) | Weak | Missing key elements, vague descriptions, inconsistent output |
| ⭐ (1) | Poor | Keyword list, no structure, contradictory elements |

### What Earns 5 Stars

A 5-star prompt typically has:
- All 7 core elements present
- Model-specific technique used (timestamp, @reference, camera spec)
- Specific style reference (artist, publication, camera model)
- Lighting specified with direction and quality
- Audio cues (for video models)
- Natural language (for Flux)
- Emotional/atmospheric context
- Technical quality modifiers
