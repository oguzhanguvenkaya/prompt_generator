# AI Prompt Generator - Comprehensive Prompt Archive

> **Version**: 1.0 | **Date**: March 2026 | **Total Prompts**: 232

This archive contains categorized, rated prompt examples for 6 AI generation models. Each prompt includes quality ratings (1-5 stars), technique analysis, and model-specific notes to help the AI agent understand what works and why.

## Table of Contents

1. [Veo 3.1](#veo-31) — 44 prompts
2. [Kling 3.0](#kling-30) — 35 prompts
3. [Seedream 2.0](#seedream-20) — 42 prompts
4. [Nano Banana Pro](#nano-banana-pro) — 35 prompts
5. [Flux (FLUX.1 dev, FLUX.1 pro, FLUX.2)](#flux-flux1-dev-flux1-pro-flux2) — 41 prompts
6. [Seedance 2.0](#seedance-20) — 35 prompts

---

## Veo 3.1

### Key Techniques & Best Practices

1. Structured Prompting: Using a 5-part formula ([Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]) for optimal control.
2. Detailed Cinematography: Specifying camera movements (dolly, tracking, crane, pan, aerial, POV), shot types (close-up, medium, wide, extreme close-up), angles (low, high, eye-level), and lens/focus (shallow depth of field, wide-angle).
3. Rich Audio & Dialogue: Integrating dialogue with quotation marks, specific sound effects (SFX), ambient noise, and music with genre/mood descriptions.
4. Negative Prompting: Describing what to exclude to refine output.
5. Multi-step Workflows: Combining Veo 3.1 with Gemini 2.5 Flash Image for advanced techniques like dynamic transitions, consistent characters, and timestamp prompting.
6. Character Consistency: Using reference images and consistent text descriptions of distinctive features across multiple shots.
7. Lighting & Ambiance Control: Detailed descriptions of light sources, quality, direction, and color to define mood.
8. Object Count Specification: Understanding the model's limitations and specifying exact object counts when crucial.

### Model-Specific Tips

1. Veo 3.1 excels at generating realistic, synchronized sound, from multi-person conversations to precisely timed sound effects, all guided by the prompt.
2. The model has a deeper understanding of narrative structure and cinematic styles, enabling it to better depict character interactions and follow storytelling cues.
3. Improved image-to-video capabilities with greater prompt adherence and enhanced audio-visual quality.
4. Consistent elements with "ingredients to video" feature to maintain a consistent aesthetic across multiple shots using reference images.
5. Seamless transitions with "first and last frame" feature to generate natural video transitions between a provided start image and end image, complete with audio.
6. Add/remove object feature (currently uses Veo 2 model and does not generate audio) to introduce new objects or remove existing ones while preserving scene composition.
7. Timestamp prompting allows directing a complete, multi-shot sequence with precise cinematic pacing within a single generation.
8. Combining reference images with repeated text descriptions of distinctive features maintains visual consistency across sequences.
9. Veo 3.1 handles low-to-moderate object counts well (typically up to around 15 identical items with good fidelity); beyond that, precision drops.
10. Digital watermarking: All generated videos are marked with SynthID to indicate the content is AI-generated.

### Recommended Presets

| Parameter | Value | Notes |
|-----------|-------|-------|
| Resolution | 720p, 1080p, 4K | 4K for hero shots |
| Duration | 5s, 8s, 15s, 30s | 8s for social, 30s for narrative |
| Aspect Ratio | 16:9, 9:16, 1:1 | 9:16 for mobile/Shorts |
| Mode | T2V, I2V, S/E Frame | S/E for controlled transitions |
| Audio | Native generation | Always include audio cues |
| Prompt Formula | [Camera] + [Subject] + [Action] + [Context] + [Style+Audio] | 5-element structure |

### Prompt Examples (44 total)

**Categories Overview:**

| Category | Count | Avg Rating |
|----------|-------|------------|
| Adventure, Cinematic | 2 | ⭐⭐⭐⭐⭐ (5.0) |
| Architectural Visualization, Interior Design | 1 | ⭐⭐⭐⭐ (4.0) |
| Branding, Abstract | 1 | ⭐⭐⭐⭐ (4.0) |
| Cinematic, Cityscape | 1 | ⭐⭐⭐⭐ (4.0) |
| Cinematic, Landscape, Fantasy | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Commercial, Lifestyle | 2 | ⭐⭐⭐⭐ (4.0) |
| Commercial, Product | 1 | ⭐⭐⭐⭐ (4.0) |
| Corporate, Interview | 1 | ⭐⭐⭐⭐ (4.0) |
| Corporate, Retro | 1 | ⭐⭐⭐⭐ (4.0) |
| Corporate, Tech | 1 | ⭐⭐⭐⭐ (4.0) |
| Drama, Character Study | 1 | ⭐⭐⭐⭐ (4.0) |
| E-commerce, Product | 1 | ⭐⭐⭐⭐ (4.0) |
| Educational, Animation | 1 | ⭐⭐⭐⭐ (4.0) |
| Event, Recap | 1 | ⭐⭐⭐⭐ (4.0) |
| Fashion, Editorial | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Fashion, Lookbook | 1 | ⭐⭐⭐⭐ (4.0) |
| Film Noir, Character Study | 3 | ⭐⭐⭐⭐ (4.0) |
| Film Noir, Dialogue | 2 | ⭐⭐⭐⭐ (4.0) |
| Food, ASMR | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Horror, Atmospheric | 1 | ⭐⭐⭐⭐ (4.0) |
| Image-to-Video, Retro | 1 | ⭐⭐⭐⭐ (4.0) |
| Landscape, Cinematic, Fantasy | 1 | ⭐⭐⭐⭐ (4.0) |
| Music Video, Cinematic | 2 | ⭐⭐⭐⭐⭐ (5.0) |
| Nature, Documentary | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Nature, Science | 1 | ⭐⭐⭐⭐ (4.0) |
| Portrait, Cinematic | 2 | ⭐⭐⭐⭐ (4.0) |
| Product, Cinematic, Landscape | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Product, Commercial | 2 | ⭐⭐⭐⭐ (4.5) |
| Sci-Fi, Action | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Science Visualization, Abstract | 1 | ⭐⭐⭐⭐ (4.0) |
| Social Media, Meme | 1 | ⭐⭐⭐ (3.0) |
| Social Media, Montage | 1 | ⭐⭐⭐⭐ (4.0) |
| Sports, Gritty, Cinematic | 1 | ⭐⭐⭐⭐ (4.0) |
| Sports, Slow Motion | 1 | ⭐⭐⭐⭐ (4.0) |
| Travel, Landscape | 1 | ⭐⭐⭐⭐ (4.0) |
| Tutorial, How-to | 1 | ⭐⭐⭐⭐ (4.0) |

#### Adventure, Cinematic

**Prompt #1** ⭐⭐⭐⭐⭐ (5/5)

```
[00:00-00:02] Medium shot from behind a young female explorer with a leather satchel and messy brown hair in a ponytail, as she pushes aside a large jungle vine to reveal a hidden path.
[00:02-00:04] Reverse shot of the explorer's freckled face, her expression filled with awe as she gazes upon ancient, moss-covered ruins in the background. SFX: The rustle of dense leaves, distant exotic bird calls.
[00:04-00:06] Tracking shot following the explorer as she steps into the clearing and runs her hand over the intricate carvings on a crumbling stone wall. Emotion: Wonder and reverence.
[00:06-00:08] Wide, high-angle crane shot, revealing the lone explorer standing small in the center of the vast, forgotten temple complex, half-swallowed by the jungle. SFX: A swelling, gentle orchestral score begins to play.
```

**Why it works:** Uses timestamp prompting for a multi-shot sequence, building a narrative arc with varied camera work, sound effects, and emotional cues.

**Model notes:** Exemplifies advanced timestamp prompting for complex narratives.

**Prompt #2** ⭐⭐⭐⭐⭐ (5/5)

```
[00:00-00:02] Medium shot from behind a young explorer as she pushes aside a large jungle vine to reveal a hidden path, her leather satchel visible, messy brown ponytail.
[00:02-00:04] Reverse shot of the explorer's freckled face, expression filled with awe as she gazes upon ancient moss-covered ruins in the background. SFX: Dense leaves rustling, distant exotic bird calls.
[00:04-00:06] Tracking shot following the explorer as she steps into the clearing and runs her hand over intricate carvings on a crumbling stone wall. Emotion: Wonder and reverence.
[00:06-00:08] Wide high-angle crane shot revealing the lone explorer standing small in the center of the vast forgotten temple complex, half-swallowed by jungle. Audio: Gentle orchestral score begins to play.
```

**Why it works:** Uses timestamp prompting to create a multi-shot narrative with evolving camera angles, sound effects, and emotional progression.

**Model notes:** Ideal for multi-shot sequences with precise cinematic pacing.

#### Architectural Visualization, Interior Design

**Prompt #3** ⭐⭐⭐⭐ (4/5)

```
Slow dolly through a minimalist living room with floor-to-ceiling windows. Morning sun casting long, soft shadows across oak floors; clean white walls. Quiet interior ambience. No dialogue. No subtitles.
```

**Why it works:** Clear materials, light direction, and motion create a refined architectural visualization.

**Model notes:** Good for CG-like polish and detailed interior scenes.

#### Branding, Abstract

**Prompt #4** ⭐⭐⭐⭐ (4/5)

```
Abstract close-up of soft light sweeping over brushed metal. The light reveals a simple geometric logo etched into the surface. Minimalist, high-contrast studio look. Sub-bass whoosh and subtle sparkle chime. No dialogue. No subtitles.
```

**Why it works:** Describes motion and material with abstract elements and specific sound design for a brand intro.

**Model notes:** Effective for logo stings and abstract branding visuals.

#### Cinematic, Cityscape

**Prompt #5** ⭐⭐⭐⭐ (4/5)

```
Handheld tracking shot through a sunlit city alley at golden hour. Shallow depth of field; flares and dust motes. Warm amber grade, soft film grain. Footsteps and distant traffic wash; a muted indie guitar chord. No dialogue. No subtitles.
```

**Why it works:** Clear time of day, camera motion, and sound design create a believable urban atmosphere.

**Model notes:** Good for lyrical motion and atmospheric B-roll.

#### Cinematic, Landscape, Fantasy

**Prompt #6** ⭐⭐⭐⭐⭐ (5/5)

```
Crane shot starting low on a lone hiker standing at the edge of a massive canyon and ascending high above to reveal they are standing on the edge of a colossal, mist-filled canyon at sunrise. Epic fantasy style, awe-inspiring scale, soft morning light washing over the landscape. Audio: Gentle wind ambience building into a swelling orchestral score as the camera rises.
```

**Why it works:** Combines specific camera movement, detailed setting, mood, and synchronized audio to create an epic and awe-inspiring scene.

**Model notes:** Demonstrates advanced camera movement and audio integration.

#### Commercial, Lifestyle

**Prompt #7** ⭐⭐⭐⭐ (4/5)

```
Close-up of a woman taking her first sip of coffee on a small balcony overlooking a quiet city street. She's wrapped in a soft sweater, morning light grazing her face. Steam rises gently from the mug. Her shoulders drop slightly as the warmth hits. TV commercial style.
```

**Why it works:** Focuses on close-up composition, sensory details (steam, warmth), and a specific style (TV commercial) to evoke a feeling.

**Model notes:** Good for emotional intimacy and commercial aesthetics.

**Prompt #8** ⭐⭐⭐⭐ (4/5)

```
Medium shot of a woman in her 30s reading a book at a sunlit Parisian café, warm natural light streaming through tall windows. She looks up from her book and smiles slightly, noticing someone off-camera. Relaxed morning atmosphere, contemporary lifestyle photography. Audio: Gentle café ambience—quiet conversation, espresso machine hiss, light jazz in background.
```

**Why it works:** Creates a relaxed atmosphere with warm natural light, subtle action, and detailed ambient audio.

**Model notes:** Good for text-to-video (T2V) for concept exploration and rapid prototyping.

#### Commercial, Product

**Prompt #9** ⭐⭐⭐⭐ (4/5)

```
Medium shot of a tired office worker rubbing his temples at his desk in a cluttered 1980s office late at night. The scene is lit by harsh fluorescent overhead lights and the green glow of a monochrome monitor. Retro aesthetic, shot as if on 1980s color film, slightly grainy.
```

**Why it works:** Clear definition of camera framing, subject, action, setting, and style, providing all necessary details for Veo 3.1.

**Model notes:** Follows the 5-element prompt formula for consistent control.

#### Corporate, Interview

**Prompt #10** ⭐⭐⭐⭐ (4/5)

```
Medium close-up of a friendly founder in a bright studio with plants. Soft key light, gentle bounce, clean white backdrop accents. Static camera on tripod. She says, 'Welcome—here’s what we’re building.' Light room tone and soft piano notes. No subtitles.
```

**Why it works:** Simple composition, clear lighting, and short dialogue make for a professional brand introduction.

**Model notes:** Effective for talking-head style videos with controlled ambience.

#### Corporate, Retro

**Prompt #11** ⭐⭐⭐⭐ (4/5)

```
Medium shot, a tired corporate worker, rubbing his temples in exhaustion, in front of a bulky 1980s computer in a cluttered office late at night. The scene is lit by the harsh fluorescent overhead lights and the green glow of the monochrome monitor. Retro aesthetic, shot as if on 1980s color film, slightly grainy.
```

**Why it works:** Follows the 5-part formula ([Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]) with specific details on setting, lighting, and retro aesthetic.

**Model notes:** Good example of the structured prompt formula for consistent results.

#### Corporate, Tech

**Prompt #12** ⭐⭐⭐⭐ (4/5)

```
Over-the-shoulder shot of a designer at a minimal desk; monitor glow reflects in glasses. Neutral key light, cool grade. Quiet office ambience and subtle keyboard taps. She says, 'Prototype ready.' No subtitles.
```

**Why it works:** Clean blocking, specific lighting, and subtle audio cues create a professional B2B feel.

**Model notes:** Good for tech workspaces and corporate settings.

#### Drama, Character Study

**Prompt #13** ⭐⭐⭐⭐ (4/5)

```
Intimate close-up of a young adult at a rain-streaked window, soft backlight shaping silhouette. Slow push-in. Gentle piano and rain ambience. He whispers, 'I’m ready.' No subtitles.
```

**Why it works:** Strong lighting, restrained voiceover, and ambient sounds create an emotional and intimate character moment.

**Model notes:** Effective for emotional beats and story tone.

#### E-commerce, Product

**Prompt #14** ⭐⭐⭐⭐ (4/5)

```
360-degree product rotation of a luxury leather handbag on a white marble surface. Soft studio lighting with subtle shadows. The bag slowly rotates to reveal all angles. Clean white background. High-end fashion brand aesthetic. No text, no people. Audio: Subtle ambient tone.
```

**Why it works:** 360-degree rotation + specific surface material + clean background creates professional product showcase.

**Model notes:** Veo 3.1 handles product rotation well. Specifying 'no text, no people' prevents unwanted elements.

#### Educational, Animation

**Prompt #15** ⭐⭐⭐⭐ (4/5)

```
A clean animated chalkboard shows a simple solar eclipse diagram: Sun, Moon, Earth labeled. Smooth push-in as arrows animate to show movement. Flat, high-contrast classroom style with white lines on dark green. Soft chalk scratch and classroom ambience. Voice says, 'An eclipse happens when the Moon blocks the Sun.' No subtitles.
```

**Why it works:** Diagrammatic clarity, animated elements, and short narration are well-suited for educational content.

**Model notes:** Leverages Veo's native audio for explainer videos.

#### Event, Recap

**Prompt #16** ⭐⭐⭐⭐ (4/5)

```
Wide crowd shot at a tech conference as lights sweep the stage. Slow pan. Warm concert lighting with haze. Audience cheer, sub-bass thump. No dialogue. No subtitles.
```

**Why it works:** Distinct lighting, motion, and crowd sounds convey a live event atmosphere.

**Model notes:** Effective for event recaps and live vibes.

#### Fashion, Editorial

**Prompt #17** ⭐⭐⭐⭐⭐ (5/5)

```
Slow-motion tracking shot of a model in a flowing white silk dress walking through a field of tall golden wheat at magic hour. The fabric billows dramatically as she moves. Camera tracks alongside at eye level. Warm amber light, lens flare, Vogue editorial aesthetic.
```

**Why it works:** Slow motion + tracking shot + specific fabric behavior + magic hour lighting creates editorial-quality fashion content.

**Model notes:** Specifying fabric behavior (billows, flows) helps Veo 3.1 generate accurate cloth physics.

#### Fashion, Lookbook

**Prompt #18** ⭐⭐⭐⭐ (4/5)

```
Runway medium-wide of a model in a flowing linen suit, cream on cream. Slow tracking left. High-key studio light, soft shadows. Fabric rustle and faint catwalk crowd murmur. She says, 'Effortless for spring.' No subtitles.
```

**Why it works:** Captures movement, fabric texture, and ambient crowd sounds to convey a fashion context.

**Model notes:** Good for showcasing movement and texture in fashion lookbooks.

#### Film Noir, Character Study

**Prompt #19** ⭐⭐⭐⭐ (4/5)

```
Medium shot of a detective in his 40s with short gray hair, rectangular silver glasses, wearing rumpled brown suit. He sits behind his desk in a dimly lit office with venetian blind shadows across his face. Film noir aesthetic. He looks up as someone enters. Audio: Ceiling fan creaking, distant street noise.
```

**Why it works:** Detailed character description, specific setting and lighting (film noir, venetian blind shadows), and ambient audio create a strong mood.

**Model notes:** Good for establishing character and atmosphere with consistent elements.

**Prompt #20** ⭐⭐⭐⭐ (4/5)

```
Close-up of the same detective with short gray hair and rectangular silver glasses, now shown in profile as he lights a cigarette. The flame briefly illuminates his weathered face. Same dimly lit office, same film noir aesthetic. Audio: Lighter click, slow exhale.
```

**Why it works:** Maintains character consistency with repeated details, uses close-up for intimacy, and adds specific sound effects for realism.

**Model notes:** Demonstrates character consistency across shots using reference images and text.

**Prompt #21** ⭐⭐⭐⭐ (4/5)

```
Wide shot of the detective with short gray hair and rectangular silver glasses standing at his rain-streaked office window, silhouetted against neon signs outside. He holds a drink, looking out at the city. Film noir with strong backlighting. Audio: Rain pattering on window, distant jazz from neighboring building.
```

**Why it works:** Continues character consistency, uses wide shot for context, strong backlighting for dramatic effect, and detailed ambient audio.

**Model notes:** Effective for showing character in different contexts while maintaining consistency.

#### Film Noir, Dialogue

**Prompt #22** ⭐⭐⭐⭐ (4/5)

```
Using the provided images for the detective, the woman, and the office setting, create a medium shot of the detective behind his desk. He looks up at the woman and says in a weary voice, "Of all the offices in this town, you had to walk into mine."
```

**Why it works:** Uses reference images for character consistency and includes dialogue with specific tone, suitable for narrative scenes.

**Model notes:** Demonstrates 'ingredients to video' for consistent characters and dialogue.

**Prompt #23** ⭐⭐⭐⭐ (4/5)

```
Using the provided images for the detective, the woman, and the office setting, create a shot focusing on the woman. A slight, mysterious smile plays on her lips as she replies, "You were highly recommended."
```

**Why it works:** Continues character consistency with reference images and focuses on character expression and dialogue.

**Model notes:** Good for multi-shot scenes with consistent characters.

#### Food, ASMR

**Prompt #24** ⭐⭐⭐⭐⭐ (5/5)

```
Extreme close-up of a cast-iron pan as butter foams and a steak sears. Macro steam, micro bubbles. Overhead practical light; warm grade. Sizzle, soft kitchen clatter, no dialogue. No subtitles.
```

**Why it works:** Tight macro shot with detailed sound design (sizzle, clatter) creates a realistic ASMR experience.

**Model notes:** Excellent for micro-detail and sensory experiences.

#### Horror, Atmospheric

**Prompt #25** ⭐⭐⭐⭐ (4/5)

```
Slow push-in on an old Victorian mansion at the end of a fog-covered lane. Dead trees frame the shot. A single light flickers in an upstairs window. The camera moves imperceptibly slow, building dread. No music. Audio: Wind through bare branches, distant owl, creaking wood.
```

**Why it works:** Imperceptibly slow camera movement + atmospheric audio design + no music creates psychological tension.

**Model notes:** Veo 3.1 responds well to 'no music' and specific ambient sound instructions for horror atmosphere.

#### Image-to-Video, Retro

**Prompt #26** ⭐⭐⭐⭐ (4/5)

```
Animate this still image: a vintage poster of a cyclist on a coastal road. Add gentle paper texture flutter, subtle shadow movement, and a slow parallax dolly-in. Warm retro grade. Seaside wind and distant gulls. No dialogue. No subtitles.
```

**Why it works:** Specifies micro-motions and ambience to animate a still image while preserving its aesthetic.

**Model notes:** Demonstrates Image-to-Video capabilities for stylized breathing shots.

#### Landscape, Cinematic, Fantasy

**Prompt #27** ⭐⭐⭐⭐ (4/5)

```
Crane shot starting low on a lone hiker and ascending high above, revealing they are standing on the edge of a colossal, mist-filled canyon at sunrise, epic fantasy style, awe-inspiring, soft morning light.
```

**Why it works:** Uses specific camera movement (crane shot) and detailed environmental descriptions to create an epic, awe-inspiring scene with soft morning light.

**Model notes:** Demonstrates effective use of cinematography and context for grand scenes.

#### Music Video, Cinematic

**Prompt #28** ⭐⭐⭐⭐⭐ (5/5)

```
The camera performs a smooth 180-degree arc shot, starting with the front-facing view of the singer and circling around her to seamlessly end on the POV shot from behind her on stage. The singer sings "when you look me in the eyes, I can see a million stars."
```

**Why it works:** Utilizes precise camera movement for a dynamic transition and integrates dialogue/lyrics for synchronized audio, demonstrating the 'first and last frame' workflow.

**Model notes:** Excellent for dynamic transitions and audio synchronization.

**Prompt #29** ⭐⭐⭐⭐⭐ (5/5)

```
The camera performs a smooth 180-degree arc shot, starting with the front-facing view of the singer and circling around her to seamlessly end on the POV shot from behind her on stage. As the camera moves, the singer opens her eyes and turns slightly. The lighting shifts from dramatic spotlight to bright, energetic stage wash. She sings 'when you look me in the eyes, I can see a million stars.' Audio: Her voice carries throughout with increasing crowd energy as the camera reveals the audience.
```

**Why it works:** Provides a detailed camera path, describes visual changes (lighting shift), and integrates dialogue and evolving audio to create a seamless and emotional transition.

**Model notes:** Excellent for Start/End Frame (S/E) for controlled transitions and complex audio.

#### Nature, Documentary

**Prompt #30** ⭐⭐⭐⭐⭐ (5/5)

```
Macro close-up of a honeybee landing on a lavender flower in slow motion, wings still visible as a blur, golden afternoon light, pollen visible on its legs. Documentary style, BBC Earth aesthetic. Audio: Soft buzzing fades in, gentle breeze through lavender field.
```

**Why it works:** Macro detail + slow motion + specific lighting + documentary style reference creates a professional nature film feel.

**Model notes:** Veo 3.1 handles macro and slow motion exceptionally well. BBC Earth reference triggers high production quality.

#### Nature, Science

**Prompt #31** ⭐⭐⭐⭐ (4/5)

```
Macro time-slice of a desert cactus flower opening as sunlight sweeps across. Cinematic macro lens, shallow DOF, pastel color palette. Soft wind and a faint synth pad. No dialogue. No subtitles.
```

**Why it works:** Specific subject, lens, and color mood, combined with subtle audio, create a poetic science visualization.

**Model notes:** Effective for nature macros and time-slice effects.

#### Portrait, Cinematic

**Prompt #32** ⭐⭐⭐⭐ (4/5)

```
Close-up with very shallow depth of field, a young woman's face, looking out a bus window at the passing city lights with her reflection faintly visible on the glass, inside a bus at night during a rainstorm, melancholic mood with cool blue tones, moody, cinematic.
```

**Why it works:** Focuses on composition (close-up, shallow depth of field) and mood (melancholic, cool blue tones) to create an intimate, cinematic shot.

**Model notes:** Highlights the model's ability to handle lens effects and emotional ambiance.

**Prompt #33** ⭐⭐⭐⭐ (4/5)

```
Close-up of a woman's face looking out a bus window at passing city lights, her reflection faintly visible on the glass. Inside a bus at night during a rainstorm. Very shallow depth of field with bokeh from exterior lights. Melancholic mood with cool blue tones. Soft side lighting from window creates gentle shadows on her face. Moody, cinematic.
```

**Why it works:** Detailed description of lighting, mood, and composition to create an emotional and cinematic portrait.

**Model notes:** Emphasizes control over light sources, quality, direction, and color.

#### Product, Cinematic, Landscape

**Prompt #34** ⭐⭐⭐⭐⭐ (5/5)

```
A sleek smartwatch sits on a rugged rock near the edge of a mountain cliff. The camera begins close, then pulls back in a smooth, continuous drone-style shot. As it rises, a vast alpine landscape unfolds—jagged peaks, mist rolling through the valley, and golden sunrise light washing over everything. Cinematic and epic, emphasizing the contrast between modern technology and untamed nature.
```

**Why it works:** Combines product focus with cinematic landscape, using smooth drone-style camera movement and emphasizing contrast for an epic feel.

**Model notes:** Highlights the model's ability to handle complex camera movements and detailed scene descriptions.

#### Product, Commercial

**Prompt #35** ⭐⭐⭐⭐ (4/5)

```
The mountain logo on the tote bag subtly animates, with clean lines tracing the peaks from base to summit. The camera slowly zooms in, focusing on the logo movement. Audio: A gentle whooshing sound as the lines animate, followed by a soft, satisfying click.
```

**Why it works:** Animates a specific element (logo) with subtle camera movement and synchronized sound effects, ideal for product showcases.

**Model notes:** Demonstrates Image-to-Video (I2V) for animating static frames.

**Prompt #36** ⭐⭐⭐⭐⭐ (5/5)

```
On a matte black tabletop, a ceramic pour-over coffee dripper in glossy white steams gently. Slow dolly-in, macro detail on condensation. Three-point lighting with soft rim light, minimal reflections. High-contrast, modern commercial look. Ambient café hush and subtle kettle pour. She says, 'Meet our morning ritual.' No subtitles.
```

**Why it works:** Tight subject focus, controlled lighting, slow camera movement, and integrated voiceover create a polished commercial feel.

**Model notes:** Excellent for product hero shots, leveraging Veo's adherence and native ambience.

#### Sci-Fi, Action

**Prompt #37** ⭐⭐⭐⭐⭐ (5/5)

```
[00:00-00:03] Extreme close-up of a glowing blue eye, cybernetic iris dilating rapidly. SFX: Electronic hum, rapid data processing sounds.
[00:03-00:06] Pull back to reveal a humanoid android in a dark server room, surrounded by cascading holographic data streams. She raises her hand and the data swirls around her fingers.
[00:06-00:09] Wide shot: she turns to face the camera, expression neutral but intense. The room behind her erupts in blue light. Audio: Orchestral swell.
```

**Why it works:** Timestamp prompting with escalating scale (extreme close-up to wide) creates cinematic reveal structure.

**Model notes:** Timestamp format [00:00-00:03] is Veo 3.1's native multi-shot syntax for precise pacing control.

#### Science Visualization, Abstract

**Prompt #38** ⭐⭐⭐⭐ (4/5)

```
Close-up visualization of a simple water molecule model rotating in a dark studio. Cool blue rim light and subtle volumetric haze. Soft synth bed and a faint ‘ping’ as it completes a turn. Voice says, ‘H2O—simple, powerful.’ No subtitles.
```

**Why it works:** Single subject, controlled lighting, and restrained voiceover effectively convey a scientific concept.

**Model notes:** Useful for STEM shorts and abstract visualizations.

#### Social Media, Meme

**Prompt #39** ⭐⭐⭐ (3/5)

```
Medium handheld shot of a person pointing up and nodding in a bright living room. Natural light, playful vibe. Upbeat clap beat and room tone. No dialogue. No subtitles.
```

**Why it works:** Keeps the frame clean for post-production text and sets an upbeat tone with audio.

**Model notes:** Useful for meme/trend formats where text is added later.

#### Social Media, Montage

**Prompt #40** ⭐⭐⭐⭐ (4/5)

```
Fast three-beat montage: 1) close-up button press; 2) medium shot product in use; 3) wide shot satisfied user. Crisp snap sound for each beat, then a short swell. High-key lighting, modern color grade. She says, 'Done.' No subtitles.
```

**Why it works:** Explicit beat structure and sound cues help pace a quick montage for social media.

**Model notes:** Good for rhythmic audio and quick cuts for social hooks.

#### Sports, Gritty, Cinematic

**Prompt #41** ⭐⭐⭐⭐ (4/5)

```
Low-angle medium shot frames a boxer from below as he bounces in place before a match, lit by harsh overhead fluorescents. Sweat glistens on his jawline and neck, catching the cold light. His breath is slow and controlled, his shoulders rolling with each inhale. Huge crowd visible in background. Gritty, cinematic realism.
```

**Why it works:** Uses low-angle shot for power, detailed subject description (sweat, breath), and specific lighting (harsh fluorescents) to create a gritty, realistic sports scene.

**Model notes:** Effective for conveying power and realism through camera angles and details.

#### Sports, Slow Motion

**Prompt #42** ⭐⭐⭐⭐ (4/5)

```
Sideline medium shot as a soccer ball hits the net in slow motion; net ripples crisply. Cool stadium lights, shallow DOF. Crowd swell, thump of ball, whistle in distance. No subtitles.
```

**Why it works:** Focuses on a single decisive action in slow motion with iconic sounds for kinetic energy.

**Model notes:** Good for capturing sports micro-moments with impactful audio.

#### Travel, Landscape

**Prompt #43** ⭐⭐⭐⭐ (4/5)

```
Wide aerial sweep over terraced hills at sunrise. Mist drift, golden light. Smooth drone-style motion. Distant birds and morning insects. No dialogue. No subtitles.
```

**Why it works:** Clear landscape, time of day, and motion guide the composition and color for a sense of place.

**Model notes:** Effective for travel postcards and drone-style sweeps.

#### Tutorial, How-to

**Prompt #44** ⭐⭐⭐⭐ (4/5)

```
Overhead top-down of hands assembling a simple origami crane on a clean white desk. Even softbox lighting, high-contrast paper edges. Paper rustle ASMR. Voice says, 'Fold to center, then flip.' No subtitles.
```

**Why it works:** Top-down clarity, crisp details, and short instruction line make it suitable for tutorials.

**Model notes:** Good for step-by-step instructions and ASMR details.

---

## Kling 3.0

### Key Techniques & Best Practices

Anchor Subjects Early for Consistency** Define core subjects clearly at the beginning and maintain consistency across shots, especially for characters.. Define the Scene First (Context Anchor)** Location, time of day/lighting, overall atmosphere.. Describe Actions as a Timeline** Sequential actions, use time markers for longer scenes, physically realistic actions.. Describe Motion Explicitly** Explicit instructions for subject movement and camera behavior (tracking, following, freezing, panning).. Direct the Camera Like a Cinematographer** Shot type (wide, medium, close-up), movement (push-in, orbit, pan, tracking), transitions (cut, shift focus, pull back).. Image-to-Video Lock First, Then Move** Preserves identity, layout, and text details of the source image while introducing motion and depth.. Kling 3.0 Prompt Template** Scene → Characters → Action → Camera → Audio & Style. Lock Audio, Dialogue, and Tone Explicitly** Attribute dialogue to specific characters, specify tone, pace, and language, add ambient sound.. Specify Characters with Clear Roles** Unique and consistent character labels, explicit reference to who speaks or acts.. Take Advantage of Longer Durations** Flexible output up to 15 seconds, describe progression over time, actions, camera reactions, and scene transitions.. Think in Shots, Not Clips** Multi-shot generation, cinematic language (profile shots, macro close-ups, tracking shots, POV, shot-reverse-shot dialogue).. Use Native Audio Intentionally** Explicitly indicate who is speaking and when, supports multiple languages, dialects, accents, and multilingual code-switching.

### Model-Specific Tips

Avoid Overloading with Dialogue** Do not add too much dialogue or complex lyrics, especially for longer videos, to prevent chaotic results. Manage Dialogue in Long Videos** Place most dialogue at the beginning of 15-second videos; use non-speaking scenes towards the end to avoid sync issues. Use a Storyboard Image** Generate a 3x3 grid image as a visual storyboard, then use \"Generate the frames in sequence as per the storyboard\" prompt. Use the \"Elements\" Feature** Maintain character consistency across shots/videos by creating custom characters (e.g., `@character_name`). Use the \"Multi-shot\" Feature** Describe the entire sequence in one prompt or add individual prompts for each shot, specifying duration

### Recommended Presets

| Parameter | Value | Notes |
|-----------|-------|-------|
| Resolution | 720p, 1080p | 1080p for professional use |
| Duration | 5s, 10s | 10s for narrative sequences |
| Aspect Ratio | 16:9, 9:16, 1:1 | 9:16 for TikTok/Reels |
| Mode | Standard, Pro | Pro for character consistency |
| Camera Control | Basic, Advanced | Advanced for complex movements |
| Creativity | 0.5 (realistic) - 1.0 (creative) | 0.7 for balanced output |

### Prompt Examples (35 total)

**Categories Overview:**

| Category | Count | Avg Rating |
|----------|-------|------------|
| Animation Style | 2 | ⭐⭐⭐⭐ (4.0) |
| Anime, Character | 1 | ⭐⭐⭐⭐ (4.0) |
| Cinematic, Action | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Cinematic/Character Consistency | 1 | ⭐⭐⭐⭐ (4.0) |
| Cinematic/Dialogue | 14 | ⭐⭐⭐⭐ (4.5) |
| Cinematic/Emotional | 2 | ⭐⭐⭐ (3.0) |
| Cinematic/Multi-character | 1 | ⭐⭐⭐ (3.0) |
| Cinematic/Multi-shot | 1 | ⭐⭐⭐⭐ (4.0) |
| Cinematic/Multilingual | 2 | ⭐⭐⭐⭐⭐ (5.0) |
| Cinematic/Narrative | 3 | ⭐⭐⭐⭐⭐ (5.0) |
| Documentary, Interview | 1 | ⭐⭐⭐⭐ (4.0) |
| E-commerce/Branding | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Fantasy, Landscape | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Horror, Supernatural | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Image-to-Video/Subject Consistency | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Lifestyle, Social Media | 1 | ⭐⭐⭐⭐ (4.0) |
| Subject Consistency | 1 | ⭐⭐⭐⭐ (4.0) |

#### Animation Style

**Prompt #1** ⭐⭐⭐⭐ (4/5)

```
A man and his dog getting ready for a walk, Pixar style animation.
```

**Why it works:** Specifies a distinct animation style for the output.

**Model notes:** Shows the model's capability to adapt to different artistic styles.

**Prompt #2** ⭐⭐⭐⭐ (4/5)

```
A lonely old man making tea and remembering his late wife, claymation style.
```

**Why it works:** Specifies a distinct animation style and conveys a narrative.

**Model notes:** Demonstrates the model's ability to render in specific artistic styles.

#### Anime, Character

**Prompt #3** ⭐⭐⭐⭐ (4/5)

```
Anime style, a young female warrior with silver hair and glowing violet eyes stands on a cliff overlooking a burning city at sunset. Her tattered cape flows in the wind. She grips a glowing sword. Dramatic lighting, detailed background, Studio Ghibli-inspired color palette.
```

**Why it works:** Anime style specification + detailed character description + Studio Ghibli reference creates consistent anime aesthetic.

**Model notes:** Kling 3.0 has strong anime generation. Studio Ghibli reference triggers warm, painterly color palettes.

#### Cinematic, Action

**Prompt #4** ⭐⭐⭐⭐⭐ (5/5)

```
A motorcycle rider in a black leather jacket speeds through neon-lit city streets at night, rain-slicked roads reflecting colorful lights. Camera follows from behind then sweeps to a low side angle. Motion blur on background, rider in sharp focus. Cinematic color grade with teal and orange.
```

**Why it works:** Dynamic camera movement + motion blur technique + specific color grade creates high-energy cinematic action.

**Model notes:** Kling 3.0 excels at motion blur and dynamic camera transitions. Teal-orange grade is a reliable cinematic preset.

#### Cinematic/Character Consistency

**Prompt #5** ⭐⭐⭐⭐ (4/5)

```
@predator slowly walking behind him, a man is on stage doing stand-up comedy, he says 'He's behind me isn't he...', then slowly walks behind him and pushes him
```

**Why it works:** Demonstrates character consistency using the "Elements" feature and specific actions.

**Model notes:** Effective use of the `@` symbol for referencing custom characters.

#### Cinematic/Dialogue

**Prompt #6** ⭐⭐⭐⭐⭐ (5/5)

```
A dim kitchen late at night. Only the refrigerator hum fills the silence. A plate is set down too hard. Ceramic clinks sharply. [Character A: Exhausted Partner, trembling frustrated voice]: “You never listen to me.” Immediately, the other partner turns around, eyes wide. [Character B: Defensive Partner, shouting loudly]: “Because you never stop blaming!” The exhausted partner exhales shakily. [Exhausted Partner, voice cracking]: “I’m not blaming… I’m begging.” Silence. The defensive partner sighs heavily. [Defensive Partner, softly, regretful]: “I don’t know how to fix this.” A sad piano chord enters quietly.
```

**Why it works:** Establishes characters early, uses bold tone descriptions for realistic dialogues, clear sequence of events.

**Model notes:** Demonstrates multi-character dialogue and emotional nuance.

**Prompt #7** ⭐⭐⭐⭐⭐ (5/5)

```
A sleek modern interrogation room with cold LED lighting. Muted gray walls, a glass window, security cameras blinking red. Low atmospheric suspense music hums with deep bass drones. A detective in a navy suit leans forward slowly. His hands rest calmly on the table. [Character A: Lead Detective, controlled serious voice]: “Let’s stop pretending.” Immediately, the suspect shifts in their chair, tense. [Character B: Prime Suspect, sharp defensive voice]: “I already told you everything.” The detective slides a folder across the table. Paper scraping sound. [Lead Detective, calm but threatening tone]: “Then explain why your fingerprints are here.” The suspect’s breathing quickens. [Prime Suspect, voice trembling]: “That’s impossible…” The detective stands suddenly, chair scraping back. Music tightens with a rising pulse.
```

**Why it works:** Establishes characters and dialogue sequence clearly, uses keywords for pace and tonality, understands cinematic language, builds suspense.

**Model notes:** Effective use of environmental details and sound cues.

**Prompt #8** ⭐⭐⭐⭐ (4/5)

```
A busy kitchen in the morning. Cereal pouring. Coffee machine buzzing. Kids running footsteps. Backpack zippers. A mother flips toast quickly, stressed. [Character A: Mom, fast urgent voice]: “Shoes on! We’re leaving in five minutes!” Immediately, a little girl whines from the hallway. [Character B: Little Daughter, crying voice]: “I can’t find my sweater!” The older brother groans dramatically. [Character C: Older Brother, annoyed sarcastic tone]: “Because you never put it away.” Mom sighs heavily. [Mom, shouting louder]: “Nobody is fighting before 8 AM!” The dad walks in calmly sipping coffee. [Character D: Dad, sleepy amused voice]: “Good morning, team.” Mom turns sharply. [Mom, exhausted voice]: “Help.”
```

**Why it works:** Detailed character interactions, distinct voices and emotions, realistic scenario.

**Model notes:** Good example of managing multiple characters and their dialogue in a dynamic scene.

**Prompt #9** ⭐⭐⭐⭐ (4/5)

```
Inside a parked car at night. Rain tapping softly on the roof. Low lo-fi music playing from the speakers. A driver grips the steering wheel, nervous. [Character A: Driver Friend, hesitant voice]: “So… are you mad at me?” Immediately, the passenger stares out the window. [Character B: Passenger Friend, quiet cold tone]: “I don’t know.” The driver swallows. [Driver Friend, softly speaking]: “That’s worse than yes.” The passenger sighs deeply. [Passenger Friend, tired voice]: “I just didn’t expect it from you.”
```

**Why it works:** Captures a specific mood and emotional tension, uses environmental sounds, and distinct character voices.

**Model notes:** Highlights the model's ability to handle subtle emotional cues and atmospheric details.

**Prompt #10** ⭐⭐⭐⭐ (4/5)

```
A quiet park bench in the late afternoon. Birds chirping. Wind through trees. Soft acoustic guitar music. Two old friends sit side by side. One smiles softly. [Character A: Old Friend 1, warm nostalgic voice]: “It’s been… what, ten years?” Immediately, the other laughs quietly. [Character B: Old Friend 2, emotional voice]: “Too long.” Pause. [Old Friend 1, softly speaking]: “I missed you.” The other nods slowly. [Old Friend 2, whispering]: “Me too.”
```

**Why it works:** Evokes nostalgia and warmth, uses ambient sounds, and conveys emotional depth through dialogue.

**Model notes:** Good for generating emotionally resonant, character-driven scenes.

**Prompt #11** ⭐⭐⭐⭐ (4/5)

```
A scene with a family of four watching TV. Woman: "Wow, I didn't expect this plot at all." Man: "Yeah, it's totally unexpected. Never thought that would happen." Boy: "It's the best twist ever!" Girl: "I can't believe they did that."
```

**Why it works:** Demonstrates multi-character dialogue with corresponding camera cuts.

**Model notes:** Good for testing multi-character dialogue and camera switching.

**Prompt #12** ⭐⭐⭐⭐⭐ (5/5)

```
Warm sunlight washes over the old streets of Madrid. Outside a small street-side bakery, a female tourist and a male tourist in a blue shirt step up to the counter, both smiling politely. Female tourist (carefully, with a noticeable accent, in Spanish): 'Hola... perdón. ¿Como llegamos al centro?' The white-haired Spanish shop clerk turns slightly and gestures down the street, friendly and relaxed. Shop clerk (in Spanish): 'Todo recto, y luego a la derecha. No tiene pérdida.' The female tourist nods, slightly relieved. Female tourist (in Spanish): 'Ah, vale... gracias.' The male tourist smiles and adds, Male tourist (in Spanish): 'Perfecto, muchas gracias.' The shop clerk smiles back and gives a small nod. The two tourists turn and walk off together, following the direction he pointed, blending into the sunlit street.
```

**Why it works:** Detailed setting, character actions, and exact multi-language dialogue for a natural animated short.

**Model notes:** Highlights the model's ability to handle specific languages and accents.

**Prompt #13** ⭐⭐⭐⭐⭐ (5/5)

```
Cinematic sunset scene on a coastal balcony overlooking the sea. A young woman wearing a light linen dress leans on the railing as waves crash below. The camera slowly dolly-moves forward. She sighs softly and says, “I always forget how loud the ocean can be.” Shot 2: Cut to a medium close-up of a young man placing two cups of tea on the table, replying calmly, “That’s because you only notice it when you stop running.” Shot 3: Over-the-shoulder shot from behind the woman as she turns, smiles faintly, and asks, “And you? Do you ever stop?” Natural lighting, warm color grading, realistic facial expressions, gentle ambient wind and distant seagulls, cinematic realism.
```

**Why it works:** Uses multi-shot for different perspectives, detailed scene and character descriptions, includes audio and visual cues, and cinematic realism.

**Model notes:** Demonstrates multi-shot and cinematic intent with emotional depth.

**Prompt #14** ⭐⭐⭐⭐⭐ (5/5)

```
Shot 1: "A cinematic shot on a European villa’s terrace. A young Caucasian woman in a blue-and-white striped shirt and khaki shorts sits at a table. The camera slowly pushes in." Shot 2: "The woman swirls juice in her glass, gazing at the distant woods, and says, 'These trees will turn yellow in a month.'" Shot 3: "Close-up of a young Caucasian man in a white T-shirt, who whispers, 'But they'll be green again next summer.'" Shot 4: "The woman turns and smiles, 'Are you always this optimistic?' The man replies, 'Only about summers with you.'" Atmosphere: "High-quality, 4K, realistic textures, natural sunlight, with an emotional atmosphere."
```

**Why it works:** Multi-shot structure, detailed atmosphere, and character dialogue with emotional context.

**Model notes:** Good for complex scenes with multiple characters and emotional undertones.

**Prompt #15** ⭐⭐⭐⭐ (4/5)

```
Interior café scene during a rainy afternoon. The barista, speaking cheerfully: “Your drinks will be ready in just a moment.” The woman in the red coat, turning toward her friend, whispers: “I told you this place was worth the wait.” The man with glasses, smiling quietly, replies: “You were right this time.” Camera alternates between medium shots and close-ups, rain tapping softly against the windows, ambient café chatter in the background.
```

**Why it works:** Detailed setting, distinct character voices, and ambient sounds create a realistic scene.

**Model notes:** Effective use of audio and visual details for atmosphere.

**Prompt #16** ⭐⭐⭐⭐ (4/5)

```
Scene: "A cozy indoor home environment with a soft hum of an air conditioner in the background." Dialogue: Mother (in surprise): "Wow, I didn’t expect this plot at all!" Father (calmly): "Yeah, it’s totally unexpected, never thought that would happen." Boy (excited): "It’s the best twist ever!" Girl (nodding): "I can't believe they did that!" Additional Detail: "The dialogue is in clear English with realistic lip movements and expressions."
```

**Why it works:** Multi-character dialogue with emotional expressions and clear language specification.

**Model notes:** Demonstrates multi-character coreference and realistic lip movements.

**Prompt #17** ⭐⭐⭐⭐ (4/5)

```
Modern office hallway with low ambient noise. The woman in a navy blazer says confidently: “Send the proposal before noon.” The assistant responds quickly, slightly nervous: “Already queued for delivery.” Footsteps echo softly, voices clearly tied to the correct speakers, natural reverb and spatial audio.
```

**Why it works:** Realistic office setting, clear dialogue attribution, and detailed audio environment.

**Model notes:** Good for professional or corporate video generation.

**Prompt #18** ⭐⭐⭐⭐⭐ (5/5)

```
Warm family living room at night. The grandmother speaks in a slow regional dialect with a soft laugh: “Back in my day, we didn’t rush so much.” The teenager replies in casual modern slang: “Yeah, but things move faster now.” The mother chuckles quietly between them. Subtle background TV hum, realistic pauses, expressive facial movements, cozy lighting.
```

**Why it works:** Uses distinct dialects and slang, realistic family interaction, and detailed environmental cues.

**Model notes:** Demonstrates Kling 3.0's ability to handle diverse linguistic nuances.

**Prompt #19** ⭐⭐⭐⭐⭐ (5/5)

```
Shot 1 (6s): Handheld medium shot on a snowy hillside. @Male lead laughs nervously and says, “Maybe we chose the coldest place possible.” Shot 2 (9s): Camera pans to @Female lead smiling warmly: “At least we’ll remember it forever.” Natural camera shake, wind audio, cinematic realism, smooth transition between shots.
```

**Why it works:** Uses shot-level precision with time markers, character referencing, and detailed audio/visuals.

**Model notes:** Excellent for Omni Storyboard control and multi-shot cinematic realism.

#### Cinematic/Emotional

**Prompt #20** ⭐⭐⭐ (3/5)

```
a wizard laughing uncontrollably
```

**Why it works:** Simple prompt to generate strong emotional performance.

**Model notes:** Good for testing basic emotional expressions.

**Prompt #21** ⭐⭐⭐ (3/5)

```
a man crying uncontrollably
```

**Why it works:** Simple prompt to generate strong emotional performance.

**Model notes:** Good for testing basic emotional expressions.

#### Cinematic/Multi-character

**Prompt #22** ⭐⭐⭐ (3/5)

```
The woman smiles as the man, standing beside her, whispers something in her ear. The camera alternates between their faces.
```

**Why it works:** Focuses on character interaction and camera alternation.

**Model notes:** Simple example for multi-character coreference.

#### Cinematic/Multi-shot

**Prompt #23** ⭐⭐⭐⭐ (4/5)

```
Shot 1: "A wide shot of the woman walking through the park." Shot 2: "A close-up as she smiles and waves at a friend." Shot 3: "A tracking shot as she turns to look behind her, following the camera movement as she keeps walking."
```

**Why it works:** Clear shot descriptions and camera movements for a simple narrative.

**Model notes:** Basic multi-shot example focusing on camera work.

#### Cinematic/Multilingual

**Prompt #24** ⭐⭐⭐⭐⭐ (5/5)

```
The woman speaks in fluent French: 'Je t'aime,' as the man responds in English: 'I love you too.' The accent and lip-sync match perfectly.
```

**Why it works:** Explicitly defines languages and emphasizes perfect accent and lip-sync.

**Model notes:** Highlights Kling 3.0's multilingual capabilities.

**Prompt #25** ⭐⭐⭐⭐⭐ (5/5)

```
A small night market street in Tokyo illuminated by hanging lanterns. The vendor speaks in Japanese with a friendly tone: “今日は寒いですね。” A tourist responds in slightly accented Japanese: “はい、でも雰囲気が素敵です。” Her companion adds softly in English: “This feels like a movie scene.” Natural mouth movement, accurate lip sync, gentle crowd noise, light wind brushing fabric and paper lanterns.
```

**Why it works:** Rich environmental description, multi-language dialogue with accents, and detailed audio/visual cues.

**Model notes:** Excellent example of combining multilingual dialogue with atmospheric details.

#### Cinematic/Narrative

**Prompt #26** ⭐⭐⭐⭐⭐ (5/5)

```
Joker begins his iconic dance descent down the stairs, arms outstretched, pure chaotic joy.
```

**Why it works:** Describes progression over time, actions, camera reactions, and scene transitions for longer durations, demonstrating multi-shot capability.

**Model notes:** Shows how to break down a complex scene into multiple shots for better control.

**Prompt #27** ⭐⭐⭐⭐⭐ (5/5)

```
Scene: "A low-angle shot of a young woman running at full speed through a moonlit garden." Action: "As she runs, her skirt billows in the wind, and she holds a small white flower in her hand. Several people in vintage formal attire run parallel to her, creating a sense of chase." Camera Movement: "At the 8-second mark, the camera zooms into a close-up, then tracks her as she glances back at a young man, locking eyes for a brief moment." Ending: "In the final 3 seconds, the couple breaks through the crowd and runs toward the starry sky, the camera following their movement."
```

**Why it works:** Detailed narrative progression, specific camera movements, and clear time markers for a longer video.

**Model notes:** Leverages Kling 3.0's longer duration capabilities for complex storytelling.

**Prompt #28** ⭐⭐⭐⭐⭐ (5/5)

```
Wide tracking shot through a quiet train station at dawn. 0–4s: A young man walks briskly along the platform, breath visible in cold air. 5–9s: The camera accelerates slightly as he spots a woman ahead and slows down. 10–13s: Close-up as their eyes meet; background sound fades. 14–15s: The train doors close behind them as they smile softly. Muted color palette, cinematic pacing, natural movement, emotional restraint.
```

**Why it works:** Uses time markers for precise control over a longer narrative, detailed visual and audio cues, and emotional context.

**Model notes:** Excellent for continuous storytelling and dynamic scene progression.

#### Documentary, Interview

**Prompt #29** ⭐⭐⭐⭐ (4/5)

```
Medium shot of an elderly craftsman in his workshop, hands weathered and skilled, carefully carving wood with a chisel. Warm workshop lighting, sawdust in the air, tools hanging on the wall behind him. He looks up and smiles at the camera. Documentary style, natural lighting.
```

**Why it works:** Authentic character detail + natural setting + documentary style creates emotional, human-centered storytelling.

**Model notes:** Kling 3.0 captures authentic human moments well. 'Documentary style' triggers natural, unposed aesthetics.

#### E-commerce/Branding

**Prompt #30** ⭐⭐⭐⭐⭐ (5/5)

```
Morning sunlight fills a minimalist studio kitchen. The camera glides across a marble countertop toward a matte black coffee machine. Clean engraved lettering on the machine reads: “Brew Calm.” A soft voiceover begins: “Every morning deserves intention.” Steam rises naturally, reflections remain sharp, typography is crisp and readable.
```

**Why it works:** Focuses on product presentation, clear text rendering, and atmospheric details for advertising.

**Model notes:** Highlights native-level text rendering and product-focused video generation.

#### Fantasy, Landscape

**Prompt #31** ⭐⭐⭐⭐⭐ (5/5)

```
Aerial drone shot slowly descending into a mystical forest where ancient trees have glowing blue bioluminescent roots. Fireflies drift through shafts of moonlight. Mist clings to the forest floor. Ethereal, magical atmosphere. Fantasy film aesthetic.
```

**Why it works:** Aerial descent + bioluminescence + layered atmospheric elements (mist, fireflies, moonlight) creates immersive fantasy world.

**Model notes:** Kling 3.0 handles complex atmospheric layering well. Bioluminescence is a reliable visual trigger for magical aesthetics.

#### Horror, Supernatural

**Prompt #32** ⭐⭐⭐⭐⭐ (5/5)

```
A dark corridor in an abandoned hospital. A figure in a white dress stands at the far end, completely still. The camera slowly dolly-zooms toward her (Hitchcock zoom effect). Flickering fluorescent lights. She turns her head 180 degrees. Audio: Silence broken by a single, distant heartbeat.
```

**Why it works:** Hitchcock zoom reference + specific impossible action (180-degree head turn) + audio contrast creates maximum horror impact.

**Model notes:** Kling 3.0 can execute Hitchcock zoom (dolly zoom) effectively. Naming the technique gives precise results.

#### Image-to-Video/Subject Consistency

**Prompt #33** ⭐⭐⭐⭐⭐ (5/5)

```
Scene: "A close-up of a woman in a red dress standing by a scenic mountain lake. The camera orbits around her, capturing her face as she smiles warmly." Subject Consistency: "Throughout the video, the woman’s red dress and long brown hair remain consistent as the camera moves." Action: "The woman lifts her head and looks directly at the camera, smiling as if seeing an old friend after years."
```

**Why it works:** Combines image-to-video with strong subject consistency and emotional action.

**Model notes:** Ideal for advertising or branded content where visual details must be maintained.

#### Lifestyle, Social Media

**Prompt #34** ⭐⭐⭐⭐ (4/5)

```
Vertical format (9:16), a barista in a cozy café carefully pours latte art into a ceramic cup. Close-up of the pour, steam rising, warm amber lighting. Slow motion at the pour moment. Aesthetic and satisfying. Instagram Reels style.
```

**Why it works:** Vertical format specification + satisfying close-up action + slow motion moment creates viral-worthy social content.

**Model notes:** Kling 3.0 vertical format (9:16) optimized for TikTok/Instagram. 'Satisfying' keyword triggers smooth, pleasing motion.

#### Subject Consistency

**Prompt #35** ⭐⭐⭐⭐ (4/5)

```
The woman’s red dress remains the same throughout the video, even as the camera zooms and shifts around her.
```

**Why it works:** Explicitly states the need for subject consistency despite camera movements.

**Model notes:** Simple yet effective for testing subject consistency.

---

## Seedream 2.0

### Key Techniques & Best Practices

Explicit camera language (wide shot, close-up, tracking, push-in, zoom-in, aerial, horizontal, vertical).; Detailed scene descriptions (location, time, lighting, atmosphere).; Few-Shot Prompt: In the few-shot prompt, you provide AI with some reference images to mimic and create an output.; The best prompt is the one that describes the subject, background, overall environment, and color palette. To generate the best possible outcome, you can try different prompt types according to your requirements.; Specifying visual style (cinematic, sci-fi, anime, tones, contrast, focus).; Integrating sound (background music, rhythm, emotional progression, ambient sound).; Zero-Shot Prompt: It is the simplest type of prompt. Just clearly provide instructions and AI will create an image based on the input. For instance, provide a direct prompt like “a white cat standing near a window staring at a bird.”; Specific subject descriptions (who, clothing, age, emotion).; Continuous actions for fluid video.; Role-Based Prompt: In this type, you prompt the AI to play a certain role. For example, you can ask the tool to create a picture of a model standing in the middle of a busy road, just like a picture a professional photographer would take. This type is more efficient for tools like ChatGPT.; Negative Prompting: In this type, you simply mention instructions about what to avoid. You can add words like “no bright colors, avoid overhead lighting,” etc.; Contextual Prompt: Contextual prompting includes providing detailed information for the tool to understand the input better.; Six-part prompt structure: Scene, Subject, Action, Camera, Style, Sound.

### Model-Specific Tips

Real-time web search was not available in the previous models. Now, Seedream 5.0 has optional real-time web search integration. When you activate this option, the tool searches the web engine, gathers information online based on the provided data, and generates an output according to the current trends.; Improved Character Consistency; Multimodal input support: text-to-video, reference-based camera movement, audio-synced generation, multi-asset blended generation.; Seedance 2.0 understands 'storyboards' and benefits from a six-part prompt structure.; Seedream has introduced its latest model Seedream 5.0. It is more powerful than Seedream 4.0. Here are the updates introduced in this model for better AI image generation.; Real-Time Web Search; Seedream 5.0 ensures stability in the features of a character across multiple generations. Usually, AI models may subtly change the hairstyle, eye shape, or other features. The new Seedream model ensures consistency regardless of the number of revisions to achieve the final output.; Seedream 4.0 usually allows its users to add up to 6 reference images to create an AI image. With Seedream 5.0, users can upload up to 15 images at a single time. This helps the user describe their requirements better. With enhanced understanding, the AI tool can generate accurate outputs.; If camera is not specified, the system decides automatically, which may lead to random results.; Increased Number of Reference Images; Seedance 2.0 supports synchronization between music and visuals.

### Recommended Presets

| Parameter | Value | Notes |
|-----------|-------|-------|
| Resolution | 512px, 1K, 2K, 4K | 2K for commercial use |
| Aspect Ratio | 1:1, 3:2, 2:3, 9:16, 16:9 | Match platform requirements |
| Language | Chinese, English, Bilingual | Bilingual for Asian markets |
| Style | Photorealistic, Anime, Illustration, 3D | Match use case |
| Quality | Standard, High, Ultra | Ultra for hero images |

### Prompt Examples (42 total)

**Categories Overview:**

| Category | Count | Avg Rating |
|----------|-------|------------|
| Abstract, Art | 1 | ⭐⭐⭐⭐ (4.0) |
| Architecture, Interior | 1 | ⭐⭐⭐⭐ (4.0) |
| E-commerce, Product Photography | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Food Photography | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Illustration, Children's Book | 1 | ⭐⭐⭐⭐ (4.0) |
| Portrait, Fashion | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| anime/illustration | 5 | ⭐⭐⭐⭐ (4.0) |
| artistic | 5 | ⭐⭐⭐⭐ (4.0) |
| cgi/3d render | 5 | ⭐⭐⭐⭐ (4.0) |
| cinematic | 11 | ⭐⭐⭐⭐⭐ (4.5) |
| e-commerce | 5 | ⭐⭐⭐⭐ (4.0) |
| photorealistic | 5 | ⭐⭐⭐⭐ (4.0) |

#### Abstract, Art

**Prompt #1** ⭐⭐⭐⭐ (4/5)

```
Abstract digital art inspired by the cosmos. Swirling nebulae in deep purple, electric blue, and gold. Microscopic and macroscopic scales merged. Intricate fractal patterns within the cosmic clouds. Dark background with pinpoints of light. High detail, gallery-quality digital artwork.
```

**Why it works:** Scale contrast (microscopic/macroscopic) + specific color palette + fractal reference creates complex abstract imagery.

**Model notes:** Seedream 2.0 handles abstract cosmic imagery well. Fractal reference adds mathematical precision to organic forms.

#### Architecture, Interior

**Prompt #2** ⭐⭐⭐⭐ (4/5)

```
Interior architectural photography of a modern minimalist living room. Floor-to-ceiling windows overlooking a forest. Neutral palette: white walls, warm wood floors, cream linen sofa. Late afternoon golden light streaming in. Architectural Digest style. Wide angle lens perspective.
```

**Why it works:** Specific architectural elements + color palette + publication reference + lighting time creates professional interior visualization.

**Model notes:** Architectural Digest reference is a strong quality trigger for Seedream 2.0 interior shots.

#### E-commerce, Product Photography

**Prompt #3** ⭐⭐⭐⭐⭐ (5/5)

```
Professional product photography of a minimalist white ceramic coffee mug on a light oak wooden surface. Soft natural window light from the left, creating gentle shadows. Clean and modern aesthetic. White background with subtle texture. Shot from a 45-degree angle. High resolution, commercial quality.
```

**Why it works:** Specific surface material + light direction + angle + commercial quality modifier creates professional e-commerce imagery.

**Model notes:** Seedream 2.0 excels at product photography. Specifying light direction and surface material dramatically improves quality.

#### Food Photography

**Prompt #4** ⭐⭐⭐⭐⭐ (5/5)

```
Overhead flat lay of a rustic Italian pasta dish in a ceramic bowl. Fresh basil leaves, cherry tomatoes, parmesan shavings. Worn wooden table surface. Soft diffused natural light. Moody, warm tones. Food styling with scattered ingredients around the bowl. Restaurant quality photography.
```

**Why it works:** Flat lay specification + specific ingredients + surface texture + food styling instruction creates appetizing food content.

**Model notes:** Seedream 2.0 food photography is exceptional. Overhead/flat lay angle consistently produces the best results.

#### Illustration, Children's Book

**Prompt #5** ⭐⭐⭐⭐ (4/5)

```
Whimsical children's book illustration of a small fox wearing a tiny backpack, exploring a magical mushroom forest. Watercolor style with soft pastel colors. Warm, inviting atmosphere. Detailed but gentle linework. Suitable for ages 3-8. Inspired by classic Beatrix Potter illustrations.
```

**Why it works:** Age-appropriate specification + watercolor style + specific illustration reference creates consistent children's book aesthetic.

**Model notes:** Beatrix Potter reference is a reliable trigger for classic children's illustration style in Seedream 2.0.

#### Portrait, Fashion

**Prompt #6** ⭐⭐⭐⭐⭐ (5/5)

```
Editorial fashion portrait of a woman with natural curly hair wearing a structured blazer in deep burgundy. Shot against a textured concrete wall. Dramatic side lighting creating strong shadows. High fashion magazine aesthetic. Sharp focus on face, slight background blur. Film photography look.
```

**Why it works:** Specific clothing description + dramatic lighting direction + magazine aesthetic reference creates editorial-quality portrait.

**Model notes:** Seedream 2.0 handles complex lighting and fashion aesthetics well. Film photography look adds authentic texture.

#### anime/illustration

**Prompt #7** ⭐⭐⭐⭐ (4/5)

```
Anime-style portrait of a mysterious sorceress with glowing runes and a dark forest backdrop. Surrounded by floating leaves with ethereal fog in the background. The atmosphere is enigmatic with dramatic lighting.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #8** ⭐⭐⭐⭐ (4/5)

```
A cartoon illustration of a fox rendered in bold pen-and-ink line art with heavy cross-hatching and stippling, overlaid with flat, watercolor-style color washes and subtle halftone texture. Use a slightly muted, desaturated palette. Overall composition should balance impactful line work and washes with a polished digital finish reminiscent of traditional print illustration.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #9** ⭐⭐⭐⭐ (4/5)

```
Anime-style image of a superhero team in dynamic action poses. The team has 5 members with 2 girls and three boys ready for action. Exaggerated facial expressions with everyone crossing their hands. The overall mood should be exciting with high contrast shadows.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #10** ⭐⭐⭐⭐ (4/5)

```
Create an image of a cartoon character standing in the middle of a road in the future with flying cars. The background should have robots working on food carts. Use a bright neon color palette. Make it anime-style.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #11** ⭐⭐⭐⭐ (4/5)

```
Turn (insert a reference image) the image into a ghibli style portrait with the girl riding a bike in the middle of a street with the background of Japanese homes. Natural lighting with warm hues.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

#### artistic

**Prompt #12** ⭐⭐⭐⭐ (4/5)

```
Create an oil painting of a serene countryside landscape, with rolling hills and a clear blue sky. It should be a wide-shot painting with warm colors.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #13** ⭐⭐⭐⭐ (4/5)

```
Using the provided reference photo, recreate the same person as a highly detailed Black INK hand-drawn sketch, exactly like a ballpoint pen illustration. Preserve the exact facial likeness and maintain the original clothing. Fine pen line work, cross-hatching, layered strokes, and controlled shading to create depth and realism. The background must be plain white or very lightly textured paper. No colors other than blue ink are allowed anywhere in the image.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #14** ⭐⭐⭐⭐ (4/5)

```
Landscape painting of an autumn day in the thick woods, falling leaves in a golden and red hue, sunlight penetrating the foliage, twisting forest trail, oil paint style, painterly brushwork, realistic shadows and lights, warm color scheme, ultra-detailed, high-resolution, warm and cozy atmosphere.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #15** ⭐⭐⭐⭐ (4/5)

```
Realistic view of a rustic wooden table, fruit on it, a glass of water, a ceramic vase, soft directional light, shadows and textures, oil painting style, high realism, subtle reflections, ultra-definition, calm and timeless mood, 4K resolution, pensive and serene atmosphere.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #16** ⭐⭐⭐⭐ (4/5)

```
Abstract expressionism painting of a cityscape, vibrant colors, dynamic brushstrokes, emotional intensity.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

#### cgi/3d render

**Prompt #17** ⭐⭐⭐⭐ (4/5)

```
Design a 3D character based on Pixar animation; a young happy adventurer with expressive eyes and playful attitude wearing a slightly worn-out backpack. Soft cinematic light, smooth textures, detailed, but soft and subtle, and vivid colors.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #18** ⭐⭐⭐⭐ (4/5)

```
Create a realistic 3D environment of a futuristic city plaza at nightfall, wet sidewalks with neon lights, and interior lights in the shops. Real glass, metal, and concrete should be used, and the lighting should be moving and cinematic.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #19** ⭐⭐⭐⭐ (4/5)

```
A 3D portrait of a friendly-looking middle-aged man, facial features a soft texture with a few flaws, hands in their natural form, soft shadows with warm light, slightly exaggerated proportions such as a stop-motion figure, and handcrafted, playful appearance.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #20** ⭐⭐⭐⭐ (4/5)

```
Create a 3D isometric image of a comfortable modern living room, wood, sun rays coming in through the large windows, soft fabrics on the couch and cushions, bookshelf with some books scattered, plants inside, warm lighting ambiance, natural shadows, natural sense of space, consideration of scale and viewpoint.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #21** ⭐⭐⭐⭐ (4/5)

```
Make a 3D render of a luxury sports car parked on a mountain road at golden hour, the reflection on polished surfaces, treads on tires and brake calipers, the dust on the car, the soft sunlight playing along curves, real-world environment with rocks and trees, cinematic wide-angle shot.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

#### cinematic

**Prompt #22** ⭐⭐⭐⭐ (4/5)

```
Create a dramatic closeup of a woman with terror in her eyes and ready to run. Dark lighting setup with a tense mood.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #23** ⭐⭐⭐⭐ (4/5)

```
Generate an image of a soldier running with a bomb in his hand and a tank behind him. Create an intense environment with dust on the soldier’s face. It should be a wide shot with dramatic lighting showing explosions and smoke around the tank behind the soldier.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #24** ⭐⭐⭐⭐ (4/5)

```
Create a post-apocalyptic cityscape at dusk with a person standing in the middle of the road. Smoke coming from the buildings fills the air. The background includes cars colliding with each other. Cinematic wide-angle composition, realistic textures, dynamic lighting, desaturated colors with warm highlights, and moody atmosphere.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #25** ⭐⭐⭐⭐ (4/5)

```
An aerial shot of a girl standing alongside a beautiful white horse on a mountain with lots of flowers. The overall mood is happy and exciting. Blue sky and a panoramic view of the whole mountain. Add golden hour sunlight casting dramatic shadows everywhere.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #26** ⭐⭐⭐⭐ (4/5)

```
Soft, high-contrast portrait with the subject is next to a large, sheer-curtained window with a cup of coffee in hand and a subtle warm smile. Natural soft light illuminates one side of the face while the other falls into a deep, velvety shadow. Muted, warm color grade, peaceful, contemplative mood.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #27** ⭐⭐⭐⭐⭐ (5/5)

```
A rainy Tokyo street at night, neon lights flickering, wet pavement reflecting the glow
```

**Why it works:** Specific location, time, lighting, and atmosphere details.

**Model notes:** Seedance 2.0 (Seedream 2.0) benefits from highly detailed scene descriptions.

**Prompt #28** ⭐⭐⭐⭐⭐ (5/5)

```
A young agent wearing a black trench coat, looking tense
```

**Why it works:** Detailed character description including clothing and emotion.

**Model notes:** Detailed subject descriptions ensure character consistency.

**Prompt #29** ⭐⭐⭐⭐⭐ (5/5)

```
He quickly moves through the crowd, whispers into his earpiece, and glances back
```

**Why it works:** Continuous and descriptive actions for fluid video.

**Model notes:** Avoid single actions; use continuous movements for natural video generation.

**Prompt #30** ⭐⭐⭐⭐⭐ (5/5)

```
Start with a wide shot, track the protagonist’s movement, and finish with a push-in close-up
```

**Why it works:** Explicit camera movements for controlled video output.

**Model notes:** Specifying camera language is a key advantage of Seedance 2.0; otherwise, results may be random.

**Prompt #31** ⭐⭐⭐⭐⭐ (5/5)

```
Cool-toned cinematic style, high contrast, shallow depth of field
```

**Why it works:** Specific visual style elements for desired aesthetic.

**Model notes:** Seedance 2.0 allows detailed control over visual texture and mood.

**Prompt #32** ⭐⭐⭐⭐⭐ (5/5)

```
Deep electronic music, gradually intensifying as the camera pushes forward
```

**Why it works:** Integration of sound with visual progression.

**Model notes:** Seedance 2.0 supports synchronization between music and visuals.

#### e-commerce

**Prompt #33** ⭐⭐⭐⭐ (4/5)

```
The product image should contain high-resolution product images, a solid package design, product benefits and promotional text with a color scheme of dominating dark and light green.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #34** ⭐⭐⭐⭐ (4/5)

```
A fashioned flat lay of a high-end skin care company. White marble surface. There are three glass skincare bottles that are loosely placed in a triangle shape. Far left diffused light on the window. Light pink and creamy color scheme in the entire.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #35** ⭐⭐⭐⭐ (4/5)

```
Gold bracelet on textured platform, brass accents catching warm directional light, shallow depth with blurred industrial elements in background, feminine luxury vibes.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #36** ⭐⭐⭐⭐ (4/5)

```
Cold brew coffee being poured into a glass with ice, catching droplets and movement, condensation on the glass visible, summer afternoon light, refreshing and appealing atmosphere.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #37** ⭐⭐⭐⭐ (4/5)

```
Create a magazine cover similar to Vogue magazine with (insert your magazine name) written on it. Use the (insert an image) as the cover image. Maintain her pose and facial expression, style her in a chic outfit with a flowing coat, soft golden hour lighting to highlight her features, cinematic color grading, realistic skin and hair textures, bold typography placeholders for title and headlines, dynamic composition.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

#### photorealistic

**Prompt #38** ⭐⭐⭐⭐ (4/5)

```
Female marine biologist on research vessel deck, weathered face with genuine smile, holding water sampling equipment, ocean horizon in background, golden hour side lighting, documentary photography style, sense of dedication and expertise
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #39** ⭐⭐⭐⭐ (4/5)

```
Turn (provide a reference image) this picture into a professional headshot. The person should be wearing a neat dark grey suit with a tie and a clean hairstyle. Keep the background minimal. Sharp focus on eyes, natural skin texture, subtle smile, high resolution, and clean composition.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #40** ⭐⭐⭐⭐ (4/5)

```
Extreme macro photography of honey being poured from a wooden dipper onto a slice of bread. The honey strand catches warm backlight, showing its amber transparency. Tiny air bubbles are visible inside the pour. The background is soft and out of focus with warm kitchen tones. Natural morning window light from the right. Shallow depth of field, no text, no props outside the pour and bread.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #41** ⭐⭐⭐⭐ (4/5)

```
Leather watch on textured concrete block, brass accents catching warm directional light, shallow depth with blurred industrial elements in background, masculine luxury positioning.
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

**Prompt #42** ⭐⭐⭐⭐ (4/5)

```
A male model sliding down a stairway with a skateboard. The time is around dusk with a greyish sky. The pattern on the skateboard matches with the colors of the model’s shirt. Make it look stylish and unique. 
```

**Why it works:** Detailed description, specific style elements.

**Model notes:** Seedream 5.0 compatible. Focus on detailed descriptions for better output.

---

## Nano Banana Pro

### Key Techniques & Best Practices

For Nano Banana Pro, the most effective prompts are highly detailed and specific. They often include information about the subject, setting, mood, lighting, and even technical camera settings. Using strong, descriptive language and specifying a desired artistic style or medium can significantly improve the quality of the generated image. The model also responds well to prompts that are structured like a scene description from a screenplay.

### Model-Specific Tips

Nano Banana Pro has a unique ability to interpret and render complex lighting and atmospheric conditions with a high degree of realism. It also excels at capturing and conveying human emotion in portraits. Unlike other models, it seems to be particularly responsive to prompts that include specific camera and lens information, which can be used to fine-tune the final image. It can also generate non-photorealistic images, including illustrations and abstract art, with a high level of detail.

### Recommended Presets

| Parameter | Value | Notes |
|-----------|-------|-------|
| Resolution | 1K, 2K, 4K | 4K for print/large format |
| Aspect Ratio | 1:1, 3:2, 2:3, 4:3, 9:16, 16:9, 21:9 | 21:9 for cinematic |
| Reference Images | Up to 14 per prompt | Use for style/character consistency |
| Web Search | On/Off | On for current events/products |
| Prompt Start | 'Generate', 'Create', 'Edit', 'Transform' | Always start with strong verb |
| Framework | Subject + Action + Location + Composition + Style | 5-element formula |

### Prompt Examples (35 total)

**Categories Overview:**

| Category | Count | Avg Rating |
|----------|-------|------------|
| Architecture, Exterior | 1 | ⭐⭐⭐⭐ (4.0) |
| Art/Voxel | 1 | ⭐⭐⭐⭐ (4.0) |
| Creative/Abstract | 1 | ⭐⭐⭐⭐ (4.0) |
| Data Visualization | 1 | ⭐⭐⭐⭐ (4.0) |
| E-commerce | 1 | ⭐⭐⭐⭐ (4.0) |
| E-commerce, Apparel | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Gaming | 2 | ⭐⭐⭐⭐ (4.0) |
| General | 7 | ⭐⭐⭐⭐ (4.0) |
| Graphic Design | 1 | ⭐⭐⭐⭐ (4.0) |
| Illustration, Editorial | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Marketing, Social Media | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Portrait, Professional | 1 | ⭐⭐⭐⭐ (4.0) |
| Portrait/Creative | 3 | ⭐⭐⭐⭐ (4.0) |
| Product Design | 1 | ⭐⭐⭐⭐ (4.0) |
| Product/E-commerce | 2 | ⭐⭐⭐⭐ (4.0) |
| Utility/Professional | 2 | ⭐⭐⭐⭐ (4.0) |
| Web Development | 2 | ⭐⭐⭐⭐ (4.0) |
| abstract | 1 | ⭐⭐⭐⭐ (4.0) |
| cinematic | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| e-commerce | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| illustration | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| landscape | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| portrait | 1 | ⭐⭐⭐⭐⭐ (5.0) |

#### Architecture, Exterior

**Prompt #1** ⭐⭐⭐⭐ (4/5)

```
Architectural visualization of a modern sustainable home. Curved organic forms, living green roof, large floor-to-ceiling windows. Surrounded by native landscaping. Golden hour lighting. Shot from a low angle looking up. Photorealistic render quality. Architectural photography aesthetic.
```

**Why it works:** Sustainable architecture keywords + organic forms + golden hour + low angle creates aspirational architectural imagery.

**Model notes:** Nano Banana Pro handles architectural visualization with photorealistic quality. Low angle shots emphasize scale and grandeur.

#### Art/Voxel

**Prompt #2** ⭐⭐⭐⭐ (4/5)

```
I want to create a voxel-art style image.
```

**Why it works:** A prompt to create a voxel-art style image, showcasing Gemini 3.0's ability to generate images in a specific artistic style.

#### Creative/Abstract

**Prompt #3** ⭐⭐⭐⭐ (4/5)

```
Present a clear, 45° top-down isometric miniature 3D cartoon scene of [CITY], featuring its most iconic landmarks and architectural elements. Use soft, refined textures with realistic PBR materials and gentle, lifelike lighting and shadows. Integrate the current weather conditions directly into the city environment to create an immersive atmospheric mood.
Use a clean, minimalistic composition with a soft, solid-colored background.

At the top-center, place the title "[CITY]" in large bold text, a prominent weather icon beneath it, then the date (small text) and temperature (medium text). All text must be centered with consistent spacing, and may subtly overlap the tops of the buildings.
```

**Why it works:** Detailed description of subject, action, location, composition, and style.

#### Data Visualization

**Prompt #4** ⭐⭐⭐⭐ (4/5)

```
I want to generate a dashboard for visualizing cryptocurrency data.
```

**Why it works:** A prompt to generate a dashboard for visualizing cryptocurrency data, demonstrating Gemini 3.0's ability to create data-driven interfaces.

#### E-commerce

**Prompt #5** ⭐⭐⭐⭐ (4/5)

```
Build me a store in the theme and style of {argument name="theme_en" default="Thanksgiving Charlie Brown"}.
```

**Why it works:** A succinct prompt to build a store interface themed in the style of Thanksgiving Charlie Brown, suitable as a web storefront design.

#### E-commerce, Apparel

**Prompt #6** ⭐⭐⭐⭐⭐ (5/5)

```
Professional e-commerce product shot of a navy blue linen blazer displayed on an invisible mannequin (ghost mannequin effect). Clean white background. Soft studio lighting with no harsh shadows. Show front view with lapels, buttons, and pocket details clearly visible. Commercial product photography quality.
```

**Why it works:** Ghost mannequin specification + clean background + detail visibility instruction creates professional apparel e-commerce imagery.

**Model notes:** Nano Banana Pro excels at ghost mannequin/invisible mannequin technique. Clean white background is the optimal e-commerce preset.

#### Gaming

**Prompt #7** ⭐⭐⭐⭐ (4/5)

```
I want to design the landing page for a new {argument name="product_type_en" default="AI game"}. We want it to look futuristic and use as many animations as possible.
```

**Why it works:** An English prompt used inside a Claude Code skill that asks Gemini 3 Pro to design a futuristic, animation-rich landing page for a new AI game.

**Prompt #8** ⭐⭐⭐⭐ (4/5)

```
I want to build a Zelda-themed web page.
```

**Why it works:** A prompt to create a Zelda-themed web page, showcasing Gemini 3.0's ability to generate a design based on a well-known visual style.

#### General

**Prompt #9** ⭐⭐⭐⭐ (4/5)

```
I want to create a 3D scene with a specified object and lighting.
```

**Why it works:** A prompt to create a 3D scene with a specified object and lighting, demonstrating Gemini 3.0's ability to generate 3D graphics.

**Prompt #10** ⭐⭐⭐⭐ (4/5)

```
I want to create a 3D animation with a specified object and motion path.
```

**Why it works:** A prompt to create a 3D animation with a specified object and motion path, demonstrating Gemini 3.0's ability to generate animated 3D graphics.

**Prompt #11** ⭐⭐⭐⭐ (4/5)

```
I want to create a 3D game with specified characters, environment, and gameplay mechanics.
```

**Why it works:** A prompt to create a 3D game with specified characters, environment, and gameplay mechanics, demonstrating Gemini 3.0's ability to generate complex interactive experiences.

**Prompt #12** ⭐⭐⭐⭐ (4/5)

```
I want to create a 3D simulation of a physical system with specified parameters and initial conditions.
```

**Why it works:** A prompt to create a 3D simulation of a physical system with specified parameters and initial conditions, demonstrating Gemini 3.0's ability to generate scientific visualizations.

**Prompt #13** ⭐⭐⭐⭐ (4/5)

```
I want to create a 3D model of a building from architectural plans.
```

**Why it works:** A prompt to create a 3D model of a building from architectural plans, demonstrating Gemini 3.0's ability to work with technical drawings.

**Prompt #14** ⭐⭐⭐⭐ (4/5)

```
I want to create a 3D model of a human from a photograph.
```

**Why it works:** A prompt to create a 3D model of a human from a photograph, demonstrating Gemini 3.0's ability to work with image data.

**Prompt #15** ⭐⭐⭐⭐ (4/5)

```
I want to create a 3D model of a car from a sketch.
```

**Why it works:** A prompt to create a 3D model of a car from a sketch, demonstrating Gemini 3.0's ability to work with hand-drawn images.

#### Graphic Design

**Prompt #16** ⭐⭐⭐⭐ (4/5)

```
I want to generate a set of icons with a specified style and color palette.
```

**Why it works:** A prompt to generate a set of icons with a specified style and color palette, demonstrating Gemini 3.0's ability to create consistent visual assets.

#### Illustration, Editorial

**Prompt #17** ⭐⭐⭐⭐⭐ (5/5)

```
Editorial illustration for a technology magazine article about artificial intelligence. A human hand and a robotic hand reaching toward each other, fingertips almost touching (inspired by Michelangelo's Creation of Adam). Clean, modern graphic style with a limited palette of deep blue, white, and electric teal. Suitable for magazine cover.
```

**Why it works:** Cultural reference (Michelangelo) + specific color palette + publication context creates conceptually rich editorial illustration.

**Model notes:** Nano Banana Pro's reasoning capability allows it to interpret cultural references and translate them into modern visual contexts.

#### Marketing, Social Media

**Prompt #18** ⭐⭐⭐⭐⭐ (5/5)

```
Create a vibrant Instagram-ready promotional image for a summer smoothie brand. A tall glass filled with layered tropical smoothie (mango, pineapple, coconut) with a paper straw and fresh fruit garnish. Shot from a 45-degree angle on a bright turquoise surface. Playful, colorful, Gen Z aesthetic. Include space for text overlay at the top.
```

**Why it works:** Platform-specific (Instagram) + demographic targeting (Gen Z) + text overlay space instruction creates marketing-ready content.

**Model notes:** Nano Banana Pro's multimodal understanding allows platform-specific optimization. 'Space for text overlay' is a useful composition instruction.

#### Portrait, Professional

**Prompt #19** ⭐⭐⭐⭐ (4/5)

```
Professional LinkedIn headshot of a confident business professional in their 30s. Clean navy blue blazer, subtle smile, direct eye contact with camera. Soft neutral background (light gray or off-white). Rembrandt lighting setup. Sharp focus on face, slight shoulder blur. Corporate professional aesthetic.
```

**Why it works:** Platform-specific (LinkedIn) + lighting technique name (Rembrandt) + professional context creates credible business portrait.

**Model notes:** Named lighting techniques (Rembrandt, butterfly, split) give Nano Banana Pro precise lighting control.

#### Portrait/Creative

**Prompt #20** ⭐⭐⭐⭐ (4/5)

```
Render an 8K ultrarealistic close shot of a woman (face characteristics 100% same as uploaded image) with windswept black hair partially covering one eye. A sharp diagonal natural light beam illuminates her elevated gaze, showcasing her light irises, high cheekbones, and glossy lips. Deep shadows envelop the rest of her face and the environment, creating a dark, cinematic, editorial mood.
```

**Why it works:** Detailed description of subject, action, location, composition, and style.

**Prompt #21** ⭐⭐⭐⭐ (4/5)

```
{
  "image_generation_prompt": {
    "subject": {
      "type": "Young woman",
      "hair": "Long, silky blonde hair, straight with slight wave, center part, cascading over shoulders",
      "facial_features": {
        "expression": "Pouty lips, alluring gaze, soft makeup",
        "eyes": "Light colored, defined with eyeliner"
      },
      "body_type": "Slender, fit physique"
    },
    "attire": {
      "headwear": "Large, dark brown faux fur trapper hat (ushanka style) with ear flaps",
      "clothing": "Tight-fitting black sleeveless top or bodysuit with a scoop neckline"
    },
    "accessories": [
      "Gold chain bracelet with clover motifs (Van Cleef & Arpels Alhambra style) on right wrist",
      "Delicate necklace",
      "Manicure with light polish"
    ],
    "pose_and_action": {
      "type": "Mirror selfie",
      "arms": "Right arm raised horizontally across the chest with hand framing the chin; Left arm raised holding the camera",
      "framing": "Upper body shot"
    },
    "technical_details": {
      "camera_prop": "White compact digital point-and-shoot camera held in hand",
      "lighting": "Harsh, direct camera flash creating a bright lens flare and strong highlights",
      "aesthetic": "Y2K aesthetics, vintage digital camera vibe, flash photography, candid social media style",
      "background": "Neutral, plain beige or off-white wall, slightly shadowed"
    }
  }
}
```

**Why it works:** Detailed description of subject, action, location, composition, and style.

**Prompt #22** ⭐⭐⭐⭐ (4/5)

```
{
  "style": {
    "type": "hyperrealistic caricature",
    "lighting": "soft studio lighting",
    "mood": "serious, dramatic",
    "details": "exaggerated facial proportions, smooth skin texture, painterly realism"
  },
  "subject": {
    "type": "older man",
    "features": {
      "hair": "light blond, voluminous, swept to the side with dramatic flow",
      "face": "large exaggerated cheeks and chin, deep frown lines, pronounced brows, slightly drooping eyelids",
      "expression": "stern, pouting, serious"
    },
    "clothing": {
      "outfit": "dark formal suit",
      "shirt": "light-colored dress shirt",
      "tie": "light blue textured tie"
    },
    "pose": "straight posture, facing forward"
  },
  "background": {
    "type": "plain dark gradient",
    "atmosphere": "studio portrait, minimalistic"
  },
  "camera": {
    "angle": "straight-on",
    "depth_of_field": "shallow, soft background",
    "focus": "sharp on face"
  }
}
```

**Why it works:** Detailed description of subject, action, location, composition, and style.

#### Product Design

**Prompt #23** ⭐⭐⭐⭐ (4/5)

```
Design a 3D product experience page for a luxury wristwatch.
**Target users:** wealthy customers, watch enthusiasts, and business people aged 30–50.
**Brand tone:** Luxury × Tech (a modern, sophisticated high-end feel).
Scroll experience (5 sections):
Hero section – the wristwatch slowly appears from darkness into light while rotating. Implement holographic effects and Fresnel reflections with custom shaders.
Detail zoom – close-up of the dial. Use GLSL to achieve metallic reflections, parallax mapping, and real-time glossiness.
Mechanism breakdown – the watch disassembles and the internal movement floats in space. Use a displacement shader for an energy-field effect and add glow effects to each part.
Material experience – switch between different material variations. Express metalness, glass refraction, and the matte texture of titanium with PBR shaders in a physically based way.
Ending – the watch reassembles, with an abstract gradient mesh background made with a custom shader. Apply post-processing such as bloom and depth of field.
**Tech stack:** Next.js 15 + Three.js + React Three Fiber + GLSL (custom shaders) + react-postprocessing + Lenis.
Shader requirements:
Fresnel reflection shader (rim-light effect)
PBR material shader (roughness, metallic, AO)
Holographic shader (iridescent interference effect)
Displacement shader (waving and distortion effects)
Custom background shader (gradient noise)
Post-process: Bloom, ChromaticAberration, DepthOfField, Vignette.
Please propose specific numerical values for:
Scroll range of each section (from, to)
Camera position (x, y, z) and rotation (x, y, z) for each section
GLSL shader uniform values (e.g., uFresnelPower, uDisplacementStrength, uGradientColor1, uGradientColor2)
Post-processing effect parameters (e.g., bloom intensity, DoF focusDistance, vignette darkness)
```

**Why it works:** A long, detailed Japanese prompt for designing a luxury 3D product experience web page for high-end watches, using Next.js, Three.js, React Three Fiber, GLSL, and specific scroll sections and shader requirements.

#### Product/E-commerce

**Prompt #24** ⭐⭐⭐⭐ (4/5)

```
Create a 9-image Instagram feed for this product in the same aesthetic. Use different locations, angles, and compositions, incorporating people, animals, nature, and various environments while maintaining a cohesive visual style.
```

**Why it works:** Detailed description of subject, action, location, composition, and style.

**Prompt #25** ⭐⭐⭐⭐ (4/5)

```
Create an editorial photoreal 3x3 storyboard contact sheet for a high end beauty e commerce ad featuring only the following products: {{product_main}} and {{product_secondary}}

Background {{background}}.  
Lighting  {{lighting}}.  

generate as one evenly spaced 3x3 grid.  

{{panels}}
```

**Why it works:** Detailed description of subject, action, location, composition, and style.

#### Utility/Professional

**Prompt #26** ⭐⭐⭐⭐ (4/5)

```
A high resolution biometric ID photograph of the person in the input image, preserving the exact facial structure, identity, and key features.

The final image size is exactly 35 x 45 millimeters at 300 DPI (approximately 413 x 531 pixels). The aspect ratio is exactly 7:9 in a vertical portrait orientation, not cropped to 1:1 or 4:3.

The head height from chin to crown occupies about 70 to 80 percent of the total image height, with around 3 to 5 millimeters of space between the top of the head and the upper edge of the frame.

The subject is perfectly centered in the frame, shown from the top of the shoulders to just above the head. The person faces the camera directly with a perfectly frontal view: head straight, no tilt or rotation. Eyes are fully open and looking directly into the camera. Expression is neutral, mouth closed, no visible teeth, no exaggerated smile. Both ears and both sides of the face are clearly visible.

The subject is wearing a simple, plain, dark top (for example a dark crew neck t shirt or a simple collared shirt) with no logos, text, or distracting patterns. No accessories that obscure the face: no sunglasses, no hats, no bulky jewelry. Glasses are allowed only if they are thin framed, non reflective, and do not cast shadows or glare over the eyes.

The background is a clean, solid light neutral color, such as light gray or off white, with no texture, patterns, or gradients. Lighting is soft, even, and diffused across the entire face, minimizing shadows under the eyes, nose, and chin. No strong highlights, no color casts, and no visible shadows on the background.

Shot with a 50mm or 85mm lens at around f/5.6 to ensure full facial sharpness. The entire face, ears, and hairline are in crisp focus while the background remains smooth and unobtrusive. Skin texture looks natural and realistic, with true to life skin tones.

Color grading is minimal and compliant with biometric standards: no filters, no stylized color grading, no exaggerated contrast or saturation. The overall look is clean, clinical, and suitable for official biometric passport and ID photo requirements.
```

**Why it works:** Detailed description of subject, action, location, composition, and style.

**Prompt #27** ⭐⭐⭐⭐ (4/5)

```
A professional, high-resolution profile photo, maintaining the exact facial structure, identity, and key features of the person in the input image. The subject is framed from the chest up, with ample headroom. The person looks directly at the camera. They are styled for a professional photo studio shoot, wearing a premium smart casual blazer in a subtle charcoal gray. The background is a solid '#562226' neutral studio color. Shot from a high angle with bright and airy soft, diffused studio lighting, gently illuminating the face and creating a subtle catchlight in the eyes, conveying a sense of clarity. Captured on an 85mm f/1.8 lens with a shallow depth of field, exquisite focus on the eyes, and beautiful, soft bokeh. Observe crisp detail on the fabric texture of the blazer, individual strands of hair, and natural, realistic skin texture. The atmosphere exudes confidence, professionalism, and approachability. Clean and bright cinematic color grading with subtle warmth and balanced tones, ensuring a polished and contemporary feel.
```

**Why it works:** Detailed description of subject, action, location, composition, and style.

#### Web Development

**Prompt #28** ⭐⭐⭐⭐ (4/5)

```
Help me build a hello world page.

Help me build a hello world page with {argument name="style_en" default="Linear"} style.

Help me build a hello world page with {argument name="style_en" default="Linear"} style.
```

**Why it works:** Three simple prompts for Gemini 3.0 that show how adding style and imagery—specifically a Linear-style design and an image prompt—changes the quality of a generated hello world page.

**Prompt #29** ⭐⭐⭐⭐ (4/5)

```
I want to build a web page with a custom color palette, layout, and font.

I want to build a web page with a custom color palette, layout, and font.

I want to build a web page with a custom color palette, layout, and font.
```

**Why it works:** A prompt for creating a web page with a custom color palette, layout, and font, demonstrating Gemini 3.0's ability to interpret and apply specific design instructions.

#### abstract

**Prompt #30** ⭐⭐⭐⭐ (4/5)

```
A vibrant, abstract explosion of color and light. The image should be a dynamic interplay of swirling, organic shapes and sharp, geometric lines. The color palette is a mix of neon pinks, electric blues, and deep purples. The texture is a combination of smooth, glossy surfaces and rough, grainy elements. The overall feeling is one of energy and movement. 3D render, Octane Render, 4k.
```

**Why it works:** This prompt gives the AI a lot of creative freedom while still providing clear guidelines on color, shape, and texture. The mention of 3D rendering software (Octane Render) can also influence the style.

**Model notes:** Nano Banana Pro can generate stunning abstract images. It is not limited to photorealism and can create unique and imaginative visuals based on abstract concepts.

#### cinematic

**Prompt #31** ⭐⭐⭐⭐⭐ (5/5)

```
A cinematic shot of a lone astronaut standing on a desolate, alien planet. The sky is a swirling vortex of nebulae in shades of deep purple and magenta. Two moons hang in the sky, one casting a soft, ethereal glow. The astronaut, clad in a sleek, futuristic suit, looks out at the vast, unknown landscape. The ground is a cracked, dark terrain, with strange, crystalline formations jutting out. The mood is one of awe and isolation. 16k, sharp focus, f/2.8, Canon EOS R5.
```

**Why it works:** This prompt is highly detailed, specifying the subject, setting, mood, and even technical camera settings. This level of detail helps the AI to generate a precise and high-quality image.

**Model notes:** Nano Banana Pro excels at interpreting complex scenes and detailed lighting instructions. The mention of specific camera settings seems to enhance the realism.

#### e-commerce

**Prompt #32** ⭐⭐⭐⭐⭐ (5/5)

```
A minimalist, professional product shot of a sleek, modern smartwatch. The watch face displays a vibrant, abstract design. The watch is placed on a clean, white background, with a soft, diffused light from the side creating a gentle shadow. The image should be sharp, clean, and ready for an e-commerce website. Shot on a Sony A7R IV, 90mm macro lens, f/8.
```

**Why it works:** This prompt is perfect for e-commerce as it clearly defines the product, the desired aesthetic (minimalist, professional), and the background. The technical details guide the AI to create a commercially viable image.

**Model notes:** This model is particularly good at creating clean, well-lit product images. It understands the nuances of commercial photography and can produce images that require minimal post-processing.

#### illustration

**Prompt #33** ⭐⭐⭐⭐⭐ (5/5)

```
A charming, whimsical illustration of a fox reading a book in a cozy, cluttered library. The style is reminiscent of classic children’s book illustrations, with soft colors and a warm, inviting atmosphere. The fox wears a pair of reading glasses and a cozy sweater. The library is filled with books, with a fireplace crackling in the background. Watercolor and ink on textured paper.
```

**Why it works:** This prompt clearly defines the subject, setting, and desired artistic style. The mention of specific media (watercolor and ink on textured paper) is a powerful instruction for the AI.

**Model notes:** This model can emulate a wide range of artistic styles, including traditional media like watercolor. It can create charming and detailed illustrations that are perfect for storytelling.

#### landscape

**Prompt #34** ⭐⭐⭐⭐⭐ (5/5)

```
An epic, breathtaking landscape of the Scottish Highlands at sunrise. A thick fog blankets the valleys, with the peaks of the mountains piercing through. The rising sun casts a warm, golden light on the scene. A lone stag stands on a ridge, silhouetted against the sky. The image should be wide-angle, capturing the vastness of the landscape. Fujifilm GFX 100S, 23mm f/4.
```

**Why it works:** This prompt paints a vivid picture for the AI, using evocative language (epic, breathtaking, thick fog) and specifying the time of day and a key focal point (the lone stag).

**Model notes:** This model is excellent at generating atmospheric and realistic landscapes. It is particularly adept at rendering complex weather conditions like fog and the warm light of sunrise.

#### portrait

**Prompt #35** ⭐⭐⭐⭐⭐ (5/5)

```
A dramatic, black and white portrait of an elderly man with deep wrinkles and a thoughtful expression. The lighting is high-contrast, with one side of his face in shadow. He wears a simple, dark turtleneck sweater. The background is a plain, dark gray. The focus is on his eyes, which convey a sense of wisdom and experience. Hasselblad X1D II 50C, 80mm f/1.9.
```

**Why it works:** This prompt uses strong emotional and descriptive words (dramatic, deep wrinkles, thoughtful expression) to guide the AI in creating a powerful portrait. The black and white specification is a key creative choice.

**Model notes:** Nano Banana Pro has a remarkable ability to capture and convey human emotion. It also handles monochrome palettes with a high degree of sophistication, creating rich and nuanced black and white images.

---

## Flux (FLUX.1 dev, FLUX.1 pro, FLUX.2)

### Key Techniques & Best Practices

The most effective prompting techniques for Flux include using the Subject + Action + Style + Context framework, prioritizing word order, and building upon the prompt with enhancement layers (visual, technical, atmospheric). It is also recommended to use structured descriptions, avoid negative prompts by rephrasing them positively, and integrate text using quotation marks.

### Model-Specific Tips

Flux understands natural language, so it is better to use clear, descriptive sentences instead of keyword-heavy prompts. The model pays more attention to the beginning of the prompt, so place the most important elements first. Flux can also generate readable text in images when the text, its placement, and style are clearly described in the prompt.

### Recommended Presets

| Parameter | Value | Notes |
|-----------|-------|-------|
| Model Variant | schnell (1-4 steps), dev (20-50), pro ultra, FLUX.2 | Match quality need |
| Steps | 1-4 (schnell), 20-50 (dev) | More steps = higher quality |
| Resolution | Up to 4MP (pro ultra) | Raw mode for less processed look |
| Prompt Length | 40-50 words optimal | Max 512 tokens (dev), 256 (schnell) |
| Prompt Style | Natural language ONLY | No keyword lists, no weight syntax |
| Negative Prompts | NOT SUPPORTED | Use positive phrasing instead |
| Prompt Order | Subject > Action > Environment > Lighting > Style | Earlier = more weight |

### Prompt Examples (41 total)

**Categories Overview:**

| Category | Count | Avg Rating |
|----------|-------|------------|
| Abstract/Contrasting | 1 | ⭐⭐⭐⭐ (4.0) |
| Animated Magic (Studio Ghibli Style) | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Character | 1 | ⭐⭐⭐⭐ (4.0) |
| Character-focused | 1 | ⭐⭐⭐⭐ (4.0) |
| Color Control (Gradient) | 1 | ⭐⭐⭐⭐ (4.0) |
| Color Control (HEX) | 1 | ⭐⭐⭐⭐ (4.0) |
| Comic Strip | 1 | ⭐⭐⭐⭐ (4.0) |
| Commercial, Advertising | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Concept Art, Fantasy | 1 | ⭐⭐⭐⭐ (4.0) |
| Context-focused | 1 | ⭐⭐⭐⭐ (4.0) |
| Dynamic Sports (Mountain Biking) | 1 | ⭐⭐⭐⭐ (4.0) |
| Dynamic Sports (Rally Racing) | 1 | ⭐⭐⭐⭐ (4.0) |
| Enhanced/Cinematic | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| General/Structured Prompt | 1 | ⭐⭐⭐⭐ (4.0) |
| Infographics | 1 | ⭐⭐⭐⭐ (4.0) |
| Interior/Object | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Landscape | 4 | ⭐⭐⭐⭐ (4.0) |
| Landscape, Fine Art | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Modern Smartphone Photography (Ballet) | 1 | ⭐⭐⭐⭐ (4.0) |
| Multi-Language | 1 | ⭐⭐⭐⭐ (4.0) |
| Nature | 1 | ⭐⭐⭐⭐ (4.0) |
| Nature Documentary | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Object/Text | 1 | ⭐⭐⭐⭐ (4.0) |
| Portrait | 1 | ⭐⭐⭐⭐ (4.0) |
| Portrait, Photorealistic | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Product, Minimalist | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Professional Photography | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Retro/Character | 1 | ⭐⭐⭐⭐ (4.0) |
| Sci-Fi/Fantasy | 1 | ⭐⭐⭐⭐ (4.0) |
| Space/Cinematic | 1 | ⭐⭐⭐⭐ (4.0) |
| Still Life | 1 | ⭐⭐⭐⭐ (4.0) |
| Street Art / Animation (Spider-Verse Style) | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Street Photography (Film Noir) | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Street Photography, Documentary | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Style-focused | 1 | ⭐⭐⭐⭐ (4.0) |
| Technical-focused | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Text Integration | 1 | ⭐⭐⭐⭐ (4.0) |
| Typography/Design | 1 | ⭐⭐⭐⭐⭐ (5.0) |

#### Abstract/Contrasting

**Prompt #1** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Uses strong contrasting elements to create a visually striking image.

**Model notes:** Contrasting colors and aesthetics make images more striking and memorable.

#### Animated Magic (Studio Ghibli Style)

**Prompt #2** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Combines two distinct artistic styles, uses active language, and includes numerous stylistic and technical details (light bloom, cel shading, volumetric god rays, specific references).

**Model notes:** Demonstrates Flux's ability to blend styles and interpret detailed artistic instructions.

#### Character

**Prompt #3** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Detailed, conversational prompt that uses natural language instead of comma-separated tags.

**Model notes:** Natural language prompts work well with Flux.

#### Character-focused

**Prompt #4** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Follows the character-focused pattern: Detailed character -> Action -> Style -> Context.

**Model notes:** Illustrates how to build a prompt step-by-step for character-centric images.

#### Color Control (Gradient)

**Prompt #5** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Applies gradients by specifying start and end colors.

**Model notes:** FLUX.2 can generate gradients.

#### Color Control (HEX)

**Prompt #6** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Uses HEX color codes for precise color matching.

**Model notes:** FLUX.2 supports precise color matching using hex codes.

#### Comic Strip

**Prompt #7** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Defines character and maintains consistency across panels for sequential art.

**Model notes:** FLUX.2 can create consistent comic panels.

#### Commercial, Advertising

**Prompt #8** ⭐⭐⭐⭐⭐ (5/5)

```
Luxury watch advertisement style photo. A Submariner-style dive watch resting on wet black volcanic rock, ocean spray in the background. Dramatic overcast sky. Close-up macro shot showing dial details, bezel, and water droplets on crystal. Shot on Canon EOS R5 with 100mm macro lens. High contrast, dramatic lighting.
```

**Why it works:** Advertising style reference + environmental storytelling + macro detail + specific camera creates premium product advertising imagery.

**Model notes:** FLUX handles luxury product photography exceptionally. Wet surfaces and water droplets add premium visual texture.

#### Concept Art, Fantasy

**Prompt #9** ⭐⭐⭐⭐ (4/5)

```
A vast underground crystal cavern where enormous amethyst formations grow from the floor and ceiling, lit by bioluminescent organisms living within the crystals. A tiny human figure stands at the entrance for scale. Concept art style, painterly, cinematic lighting. Inspired by Roger Dean album artwork.
```

**Why it works:** Scale contrast (tiny human) + bioluminescence + specific artist reference (Roger Dean) creates immersive concept art.

**Model notes:** FLUX.1 dev is optimal for concept art with artist style references. Roger Dean reference triggers organic, surreal fantasy aesthetics.

#### Context-focused

**Prompt #10** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Follows the context-focused pattern: Setting -> Atmospheric conditions -> Style -> Technical specs.

**Model notes:** Good for generating detailed landscapes and architectural scenes.

#### Dynamic Sports (Mountain Biking)

**Prompt #11** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Specifies camera and mounting, intense action, detailed environmental interaction, and advanced photographic effects (lens flares, wide-angle, RAW capture, motion blur).

**Model notes:** Effective for high-energy sports photography with detailed environmental interaction.

#### Dynamic Sports (Rally Racing)

**Prompt #12** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Specifies camera, active action, environmental details, and technical settings (HDR mode) for dynamic scenes.

**Model notes:** Good for action-oriented scenes and capturing dynamic elements.

#### Enhanced/Cinematic

**Prompt #13** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Excellent use of enhancement layers, including visual (golden sunlight, deep blue Earth tones), technical (shallow depth of field, 85mm lens), and atmospheric (wonder and achievement) details.

**Model notes:** Shows the power of detailed, layered prompts for high-quality results.

#### General/Structured Prompt

**Prompt #14** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Follows the Subject + Action + Style + Context framework, providing a clear and detailed description.

**Model notes:** Demonstrates the effectiveness of the core FLUX framework.

#### Infographics

**Prompt #15** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Generates infographics with clean typography and structured layouts.

**Model notes:** FLUX.2 can generate infographics.

#### Interior/Object

**Prompt #16** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Clearly defines placement of elements in foreground, middle ground, and background for depth.

**Model notes:** FLUX.1 allows defining placement of objects in different layers.

#### Landscape

**Prompt #17** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Demonstrates the importance of specific details for improved image generation.

**Model notes:** FLUX.1 responds best to precise and clear language.

**Prompt #18** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Describes a soft transition between contrasting elements, affecting mood and visual flow.

**Model notes:** The type of transition affects the mood and visual flow of the image.

**Prompt #19** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Specifies camera type to mimic real-world photography style and quality.

**Model notes:** Specifying a camera helps FLUX.1 mimic the style and quality of real-world photography.

**Prompt #20** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Specifies shot type for desired composition and scene capture.

**Model notes:** Shot types influence the overall composition.

#### Landscape, Fine Art

**Prompt #21** ⭐⭐⭐⭐⭐ (5/5)

```
A lone pine tree silhouetted against a dramatic sunset sky over the Scottish Highlands. Layers of purple and orange clouds. Foreground heather in soft focus. Shot on large format 4x5 film camera. Long exposure, slight motion in clouds. Ansel Adams compositional style with color.
```

**Why it works:** Large format film reference + Ansel Adams compositional reference + layered atmospheric elements creates fine art landscape.

**Model notes:** FLUX.1 Pro Ultra's Raw mode enhances film photography aesthetics. Large format film reference triggers high tonal range.

#### Modern Smartphone Photography (Ballet)

**Prompt #22** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Specifies modern camera and mode, detailed subject and context, and advanced photographic effects (lens flare, color grading, lighting).

**Model notes:** Shows how to achieve specific photographic looks with modern camera settings.

#### Multi-Language

**Prompt #23** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Prompting in a native language can produce more culturally authentic results.

**Model notes:** FLUX.2 understands multiple languages.

#### Nature

**Prompt #24** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Uses dynamic and active language to create a sense of movement and drama.

**Model notes:** Active language helps FLUX.1 create dynamic and energetic images.

#### Nature Documentary

**Prompt #25** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Highly specific technical foundation (camera, lens, aperture), active language for the main subject, and detailed environmental storytelling (light interaction, atmospheric conditions). Uses brackets for emphasis.

**Model notes:** Flux responds well to active language and understands context and nuance due to T5 and CLIP encoders. High-resolution output on Nebius AI Studio enhances detail.

#### Object/Text

**Prompt #26** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Uses transparent material to create a visually interesting effect and depth.

**Model notes:** FLUX.1 can create images with transparent materials like glass.

#### Portrait

**Prompt #27** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Uses lens specification to control depth of field and focus.

**Model notes:** Lenses control field of view and depth of field.

#### Portrait, Photorealistic

**Prompt #28** ⭐⭐⭐⭐⭐ (5/5)

```
Portrait of a 35-year-old Japanese woman with shoulder-length black hair, wearing a simple white linen shirt, standing in a sunlit Tokyo apartment. Warm morning light through sheer curtains. Shot on Fujifilm GFX 100S with 110mm f/2 lens. Shallow depth of field, soft bokeh. Natural, unposed moment.
```

**Why it works:** Specific camera model + lens specs + natural light source + unposed instruction creates authentic photorealistic portrait.

**Model notes:** FLUX.2 responds exceptionally to specific camera/lens combinations. Fujifilm cameras trigger characteristic warm, film-like rendering.

#### Product, Minimalist

**Prompt #29** ⭐⭐⭐⭐⭐ (5/5)

```
Minimalist product photography of a matte black wireless earphone case on a pure white background. Perfect studio lighting with subtle gradient shadow. The case is open, revealing the earphones inside. Shot from a 30-degree overhead angle. Apple product photography aesthetic. Ultra clean, no distractions.
```

**Why it works:** Apple product photography reference is the gold standard for minimalist product shots. Specific angle + shadow instruction creates depth.

**Model notes:** FLUX.2 Pro handles minimalist product photography with exceptional cleanliness. Apple reference triggers precise, controlled lighting.

#### Professional Photography

**Prompt #30** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Combines advanced photography controls (lens, aperture, lighting style) with context for a highly specific output.

**Model notes:** Demonstrates the model's capability for fine-grained control over photographic elements.

#### Retro/Character

**Prompt #31** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Focuses on character and style, using descriptive adjectives for visual impact.

**Model notes:** Demonstrates how to combine different stylistic elements effectively.

#### Sci-Fi/Fantasy

**Prompt #32** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Uses natural language and structured descriptions for a complex scene, incorporating visual and atmospheric layers.

**Model notes:** Highlights the model's ability to handle imaginative settings.

#### Space/Cinematic

**Prompt #33** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Combines subject, action, style, and context with emotional tone, showcasing enhancement layers.

**Model notes:** Good example of using natural language for evocative imagery.

#### Still Life

**Prompt #34** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Adds textures and reflections for realism and depth.

**Model notes:** Textures and reflections make images more lifelike and engaging.

#### Street Art / Animation (Spider-Verse Style)

**Prompt #35** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Combines a strong artistic style reference with dynamic action, unique visual effects (gravity shifts, halftone dots), and specific animation techniques.

**Model notes:** Excellent for generating stylized, dynamic, and complex animated scenes.

#### Street Photography (Film Noir)

**Prompt #36** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Uses specific high-end camera and lens, detailed atmospheric conditions, and strong stylistic elements (film noir, processing simulation, contrast).

**Model notes:** Demonstrates fine control over photographic style and mood, suitable for artistic street photography.

#### Street Photography, Documentary

**Prompt #37** ⭐⭐⭐⭐⭐ (5/5)

```
Black and white street photography in 1960s New York City. A crowded intersection in Manhattan, steam rising from a grate, yellow cabs, people in period clothing rushing past. Shot on Leica M3 with 35mm Summicron lens. High contrast, grain, decisive moment style. Henri Cartier-Bresson influence.
```

**Why it works:** Historical period + specific camera (Leica M3) + master photographer reference (Cartier-Bresson) creates authentic documentary aesthetic.

**Model notes:** FLUX handles historical period photography with high accuracy. Leica camera references trigger characteristic documentary style.

#### Style-focused

**Prompt #38** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Follows the style-focused pattern: Artistic reference -> Subject -> Context -> Technical execution.

**Model notes:** Effective for artistic interpretations and style transfers.

#### Technical-focused

**Prompt #39** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Follows the technical-focused pattern: Subject -> Background -> Lighting -> Lens/settings, with precise camera details.

**Model notes:** Ideal for generating professional photography with specific technical controls.

#### Text Integration

**Prompt #40** ⭐⭐⭐⭐ (4/5)

```

```

**Why it works:** Clearly describes text content, placement, and style for readable text in images.

**Model notes:** FLUX can generate readable text when described clearly.

#### Typography/Design

**Prompt #41** ⭐⭐⭐⭐⭐ (5/5)

```

```

**Why it works:** Generates clean typography and product marketing materials.

**Model notes:** FLUX.2 excels at typography and design-related prompts.

---

## Seedance 2.0

### Key Techniques & Best Practices



### Model-Specific Tips



### Recommended Presets

| Parameter | Value | Notes |
|-----------|-------|-------|
| Resolution | 720p (native), 1080p (upscaled), 2K (pro) | 1080p for most uses |
| Duration | 4s, 5-10s, 10-15s | 15s max for narrative sequences |
| Aspect Ratio | 16:9, 9:16, 1:1 | Match platform |
| Reference Files | Up to 12 (9 images + 3 video + 3 audio) | Use @reference tags |
| Framework | Single-shot, Multi-shot, Reference-driven | Choose by complexity |
| Physics | Auto-simulated | Describe physical properties for accuracy |
| Audio | Native generation | Include audio cues in prompt |

### Prompt Examples (35 total)

**Categories Overview:**

| Category | Count | Avg Rating |
|----------|-------|------------|
| Action and Physics | 4 | ⭐⭐⭐⭐⭐ (4.8) |
| Brand, Corporate | 1 | ⭐⭐⭐⭐ (4.0) |
| Cinematic | 3 | ⭐⭐⭐⭐ (4.3) |
| Cinematic & Film | 4 | ⭐⭐⭐⭐⭐ (4.8) |
| Cinematic Storytelling | 3 | ⭐⭐⭐⭐⭐ (4.7) |
| Cinematic, Drama | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Commercial, Food & Beverage | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Creative & Experimental | 3 | ⭐⭐⭐⭐ (4.0) |
| Hyper-Realism | 4 | ⭐⭐⭐⭐⭐ (4.8) |
| Music Video, Abstract | 1 | ⭐⭐⭐⭐ (4.0) |
| Nature, Wildlife | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Product & Commercial | 4 | ⭐⭐⭐⭐ (4.5) |
| Sci-Fi, Action | 1 | ⭐⭐⭐⭐⭐ (5.0) |
| Social Media Viral | 4 | ⭐⭐⭐⭐ (4.5) |

#### Action and Physics

**Prompt #1** ⭐⭐⭐⭐⭐ (5/5)

```
A red rally car racing through a forest. It hits a puddle, and water sprays toward the camera. 2K resolution, shaky-cam effect. Sound of a high-RPM engine and splashing water.
```

**Why it works:** Seedance 2.0 excels at rendering physics, especially collisions and speed. Describing the 'water sprays' and 'shaky-cam effect' enhances the dynamic feel. Specific audio cues ('high-RPM engine', 'splashing water') add realism.

**Model notes:** Seedance 2.0 wins on weight in physics simulations. Describe friction and specific movements. Use specific sound adjectives.

**Prompt #2** ⭐⭐⭐⭐ (4/5)

```
A tower of colorful glass blocks being hit by a bowling ball. The blocks scatter with realistic gravity. 2K resolution, high-speed camera style. Sound of a heavy thud and glass clinking.
```

**Why it works:** Demonstrates Seedance 2.0's ability to handle realistic gravity and scattering. 'High-speed camera style' enhances the impact. Specific sound effects ('heavy thud', 'glass clinking') contribute to the immersive experience.

**Model notes:** Seedance 2.0 wins on weight in physics simulations. Describe friction and specific movements. Use specific sound adjectives.

**Prompt #3** ⭐⭐⭐⭐⭐ (5/5)

```
A basketball player jumping for a dunk. The jersey ripples in the wind. The camera follows the player from the ground up. 2K resolution, cinematic lighting. Sound of sneakers squeaking on wood and the rim rattling.
```

**Why it works:** Captures dynamic sports motion with realistic details like 'jersey ripples'. Cinematic lighting and specific camera movement ('follows the player from the ground up') enhance the visual. Accurate sound effects ('sneakers squeaking', 'rim rattling') add authenticity.

**Model notes:** Seedance 2.0 wins on weight in physics simulations. Describe friction and specific movements. Use specific sound adjectives.

**Prompt #4** ⭐⭐⭐⭐⭐ (5/5)

```
A surfer riding a massive 20-foot wave. The spray of the ocean is captured in 2K detail. Sound of a roaring ocean and the board cutting through water.
```

**Why it works:** Highlights Seedance 2.0's capability to render detailed water effects and large-scale natural phenomena. High resolution and specific sound descriptions ('roaring ocean', 'board cutting through water') create a powerful scene.

**Model notes:** Seedance 2.0 wins on weight in physics simulations. Describe friction and specific movements. Use specific sound adjectives.

#### Brand, Corporate

**Prompt #5** ⭐⭐⭐⭐ (4/5)

```
A team of diverse professionals in a modern open-plan office collaborating around a large screen. Energy is positive and focused. Natural light from floor-to-ceiling windows. Camera starts wide showing the full team, then slowly pushes in to a medium shot of two colleagues sharing a moment of discovery. Corporate brand video aesthetic. Audio: Soft ambient office sounds, subtle uplifting background music.
```

**Why it works:** Diversity specification + camera movement from wide to medium + emotional moment (discovery) creates authentic corporate brand content.

**Model notes:** Seedance 2.0 handles group dynamics and multi-person scenes well. Camera push-in to intimate moment is a reliable brand video technique.

#### Cinematic

**Prompt #6** ⭐⭐⭐⭐ (4/5)

```
These are the opening and closing frames of a tavern martial arts fight scene. Based on these two scenes, please generate a smooth sequence of a woman in black fighting several assassins. Use storyboarding techniques and switch between different perspectives to give the entire footage a more rhythmic and cinematic feel.
```

**Why it works:** Utilizes storyboarding and multi-perspective shots for a dynamic fight scene. Focus on smooth transitions and cinematic rhythm. Effective for complex action sequences.

**Model notes:** Seedance 2.0 excels at following chronological instructions and multi-shot narratives. Use the [00-05s] structure for precise timelines.

**Prompt #7** ⭐⭐⭐⭐⭐ (5/5)

```
Style: Hollywood Professional Racing Movie (Le Mans style), cinematic night, rain, high-stakes sport. Duration: 15s. [00–05s] Shot 1: The Veteran (Interior / Close-up) Rain lashes the windshield of a high-tech race car on a track. The veteran driver (in helmet) looks over, calm and focused. Dashboard lights reflect on his visor. Dialogue Cue: He gives a subtle nod and mouths, ‘Let’s go.’ [05–10s] Shot 2: The Challenger (Interior / Close-up) Cut to the rival car next to him. The younger driver grips the wheel tightly, breathing heavily. Eyes wide with adrenaline. Dialogue Cue: He whispers ‘Focus’ to himself. [10–15s] Shot 3: The Green Light (Wide Action) The starting lights turn green. Both cars accelerate in perfect sync on the wet asphalt. Water sprays into the camera lens. Motion blur stretches the stadium lights into long streaks of color.
```

**Why it works:** Detailed chronological instructions with specific shot breakdowns and dialogue cues guide the AI effectively. Strong stylistic references ('Le Mans style') and atmospheric details ('rain lashes') create a high-impact cinematic sequence.

**Model notes:** Seedance 2.0 excels at following chronological instructions and multi-shot narratives. Use the [00-05s] structure for precise timelines.

**Prompt #8** ⭐⭐⭐⭐ (4/5)

```
Cinematic action movie feel, continuous long take. A female warrior in a black high-tech tactical bodysuit stands in the center of an abandoned industrial factory. The camera follows her in a smooth tracking shot. She delivers a sharp roundhouse kick that sends a zombie flying, then transitions seamlessly into precise one-handed handgun fire, muzzle flash lighting the dark environment.
```

**Why it works:** Emphasizes continuous long take and smooth tracking shot for cinematic feel. Detailed action sequence with visual effects ('muzzle flash lighting') creates a dynamic scene.

**Model notes:** Seedance 2.0 excels at following chronological instructions and multi-shot narratives. Use the [00-05s] structure for precise timelines.

#### Cinematic & Film

**Prompt #9** ⭐⭐⭐⭐⭐ (5/5)

```
Sweeping drone shot ascending from a misty valley floor, slowly revealing a vast mountain range at sunrise, golden light breaking through clouds and casting long shadows across pine forests, orchestral grandeur, National Geographic documentary quality, ultra-smooth camera movement
```

**Why it works:** Upward camera motion creates tension and release. Referencing 'National Geographic documentary quality' significantly enhances production value. Effective about 9/10 times.

**Model notes:** Best settings: 16:9, 12-15 seconds, 1080p

**Prompt #10** ⭐⭐⭐⭐⭐ (5/5)

```
Extreme close-up of a young woman's face, eyes slowly opening to reveal reflected city lights, a single tear rolling down her cheek catching the light, shallow depth of field with bokeh background, intimate and emotional, Blade Runner cinematography style, warm amber and cool blue color contrast
```

**Why it works:** Seedance 2.0 excels at capturing small facial details and emotional subtleties. The 'Blade Runner' reference establishes a strong, filmic color palette. High shareability factor.

**Model notes:** Best settings: 16:9, 8-10 seconds, 1080p

**Prompt #11** ⭐⭐⭐⭐ (4/5)

```
A martial artist performing a spinning kick in slow motion, silk ribbons trailing from their wrists creating spiral patterns in the air, ancient temple courtyard setting with cherry blossom petals falling, dramatic side-angle tracking shot, Crouching Tiger Hidden Dragon aesthetic, golden hour backlighting creating silhouette effect
```

**Why it works:** Model handles complex body mechanics well. Silk ribbons add visual flow and can mask minor imperfections in motion rendering. Atmospheric details enhance the scene.

**Model notes:** Best settings: 16:9, 10-12 seconds, 1080p

**Prompt #12** ⭐⭐⭐⭐⭐ (5/5)

```
A detective in a trench coat walking down a rain-soaked alley at night, neon signs reflecting in puddles creating streaks of red and blue light, steam rising from a manhole, slow dolly shot following from behind, film noir style, high contrast with deep shadows, 1940s meets cyberpunk
```

**Why it works:** Seedance 2.0 excels with neon reflections on wet surfaces, often rivaling hand-crafted VFX. High contrast and unique stylistic blends ('1940s meets cyberpunk') yield strong, atmospheric results.

**Model notes:** Best settings: 21:9, 10-15 seconds, 1080p

#### Cinematic Storytelling

**Prompt #13** ⭐⭐⭐⭐⭐ (5/5)

```
A multi-shot sequence of a knight in silver armor. Shot 1: Wide shot as he enters a dark cave with a torch. Shot 2: Close-up of his nervous eyes. Shot 3: He draws his sword, which glows blue. Low-angle tracking shot, 2K resolution. Sound of crackling fire and echoing footsteps.
```

**Why it works:** Seedance 2.0 handles multi-shot narrative logic well, maintaining character consistency across shots. Specific shot descriptions and audio cues enhance storytelling.

**Model notes:** Focus on textures for 2K resolution. Native audio engine triggered by sound adjectives.

**Prompt #14** ⭐⭐⭐⭐⭐ (5/5)

```
A three-shot sequence of a detective in a rainy futuristic city. Shot 1: Bird’s-eye view of neon streets. Shot 2: The detective lights a cigarette under a flickering light. Shot 3: He looks at a holographic photo. 2K sharpness, anamorphic lens flare. Sound of falling rain and distant sirens.
```

**Why it works:** Effective use of multi-shot sequence to build a narrative. Specific visual details like 'anamorphic lens flare' and atmospheric sounds create a strong cinematic mood.

**Model notes:** Focus on textures for 2K resolution. Native audio engine triggered by sound adjectives.

**Prompt #15** ⭐⭐⭐⭐ (4/5)

```
A sequence of a Victorian tailor at work. Shot 1: Macro shot of a needle piercing silk. Shot 2: The tailor’s face in profile, focused expression. Shot 3: He hangs the finished dress. Natural sunlight, 2K textures. Sound of fabric rustling and scissors snipping.
```

**Why it works:** Detailed shot descriptions guide the AI to create a coherent story. Focus on textures and natural lighting enhances realism. Specific audio cues add to the immersive experience.

**Model notes:** Focus on textures for 2K resolution. Native audio engine triggered by sound adjectives.

#### Cinematic, Drama

**Prompt #16** ⭐⭐⭐⭐⭐ (5/5)

```
A woman in her 40s sits alone at a kitchen table at 3 AM, hands wrapped around a cold coffee mug. Harsh overhead light, shadows under her eyes. She stares at a photograph on the table. The camera slowly pushes in. Her expression shifts from blank to grief. No music. Audio: Refrigerator hum, distant traffic, a single sob.
```

**Why it works:** Specific time (3 AM) + physical detail (cold coffee) + emotional progression + minimal audio creates powerful dramatic moment.

**Model notes:** Seedance 2.0's physics simulation handles subtle human micro-expressions. 'No music' instruction is critical for dramatic scenes.

#### Commercial, Food & Beverage

**Prompt #17** ⭐⭐⭐⭐⭐ (5/5)

```
A bartender's hands expertly muddle fresh mint leaves in a crystal glass, then pour sparkling water over ice, creating a cascade of bubbles. Close-up macro shot. Slow motion at the pour. Warm amber bar lighting. The finished mojito is garnished with a lime wheel. Premium cocktail bar aesthetic. Audio: Ice clinking, fizzing bubbles.
```

**Why it works:** Process-focused (muddling to finished drink) + macro slow motion + specific audio creates satisfying beverage commercial.

**Model notes:** Seedance 2.0's physics simulation is exceptional for liquid and bubble dynamics. Slow motion at pour moment is a reliable technique.

#### Creative & Experimental

**Prompt #18** ⭐⭐⭐⭐ (4/5)

```
Two streams of luminescent paint colliding in zero gravity, one electric blue and one molten gold, creating complex fractal patterns as they merge and separate, suspended droplets catching light like stars, extreme slow motion, abstract experimental art film, dark background making colors pop, mesmerizing and meditative
```

**Why it works:** Abstract content is culturally agnostic. Complementary vivid colors (electric blue and molten gold) create stunning frames. Useful for background footage for presentations or music tracks.

**Model notes:** Best settings: 1:1, 8-10 seconds, 1080p

**Prompt #19** ⭐⭐⭐⭐ (4/5)

```
A person walking through a doorway and emerging into an impossible M.C. Escher-inspired landscape where staircases lead in every direction including upside-down, gravity shifting with each step, dreamlike floating dust particles catching shafts of light, ethereal and disorienting, Christopher Nolan's Inception meets Studio Ghibli, smooth steady tracking shot following the walker
```

**Why it works:** Reference stacking (Escher, Inception, Ghibli) provides a rich pool of DNA for the model. Results are surreal and eye-catching, with a solid success rate for complex requests.

**Model notes:** Best settings: 16:9, 12-15 seconds, 1080p

**Prompt #20** ⭐⭐⭐⭐ (4/5)

```
A silhouette of a singer performing on a stage that extends into infinite darkness, colorful volumetric light beams cutting through artificial fog from behind, each lyric note creating visible sound waves rippling through the air as colored light, concert photography perspective from the crowd, Beyonce music video production value, dramatic and powerful energy
```

**Why it works:** Volumetric lighting and fog consistently create high-production-value, dramatic shots. Produces arena concert vibes without physical assets. 'Visible sound waves' add an experimental visual element.

**Model notes:** Best settings: 16:9 or 9:16, 10-15 seconds, 1080p

#### Hyper-Realism

**Prompt #21** ⭐⭐⭐⭐⭐ (5/5)

```
Close-up of a wagyu steak hitting a hot cast-iron skillet. You can see the fat rendering and bubbles of oil. 2K resolution, shallow depth of field. Sound of loud, aggressive sizzling.
```

**Why it works:** Focus on textures and specific actions ('fat rendering', 'bubbles of oil') leverages Seedance 2.0's ability to render details. Specific sound descriptions enhance realism.

**Model notes:** The ByteDance AI video model loves details like skin pores, wood grain, and liquid. Use specific sound adjectives.

**Prompt #22** ⭐⭐⭐⭐⭐ (5/5)

```
Slow-motion shot of cold milk being poured into black coffee. The white and brown liquids swirl in 2K detail. Sound of the liquid splashing and the glass clinking.
```

**Why it works:** Emphasizes liquid dynamics and detailed textures. Slow-motion enhances the visual appeal. Specific sound effects ('splashing', 'clinking') create an immersive experience.

**Model notes:** The ByteDance AI video model loves details like skin pores, wood grain, and liquid. Use specific sound adjectives.

**Prompt #23** ⭐⭐⭐⭐⭐ (5/5)

```
Extreme close-up of an old man’s face as he laughs. Every wrinkle moves naturally. Cinematic 3-point lighting, 2K resolution. Sound of a deep, gravelly laugh.
```

**Why it works:** Focus on natural movement of wrinkles and cinematic lighting enhances realism. Specific audio description ('deep, gravelly laugh') adds depth to the character.

**Model notes:** The ByteDance AI video model loves details like skin pores, wood grain, and liquid. Use specific sound adjectives.

**Prompt #24** ⭐⭐⭐⭐ (4/5)

```
Macro shot of a human eye with a digital iris. Tiny circuits move inside the pupil. 2K resolution, neon blue glow. Sound of a faint digital hum.
```

**Why it works:** Combines hyper-realistic detail with a futuristic element. Macro shot emphasizes intricate details. Specific lighting ('neon blue glow') and sound ('faint digital hum') create a unique aesthetic.

**Model notes:** The ByteDance AI video model loves details like skin pores, wood grain, and liquid. Use specific sound adjectives.

#### Music Video, Abstract

**Prompt #25** ⭐⭐⭐⭐ (4/5)

```
Abstract music video sequence: geometric shapes in neon pink, electric blue, and gold morph and dance in sync with an imagined beat. The shapes transition from 2D to 3D, casting dramatic shadows. Camera rotates 360 degrees around the central composition. Dark background. Hypnotic, rhythmic movement. Electronic music aesthetic.
```

**Why it works:** 2D-to-3D transition + color specification + 360-degree camera + rhythmic movement creates dynamic abstract music video content.

**Model notes:** Seedance 2.0 handles abstract geometric animation well. 360-degree camera rotation is a reliable dynamic movement technique.

#### Nature, Wildlife

**Prompt #26** ⭐⭐⭐⭐⭐ (5/5)

```
Shot 1: Extreme close-up of a wolf's amber eye reflecting a winter forest. Cut to: Medium shot of the wolf standing alert on a snow-covered ridge at dawn, breath visible in cold air. Cut to: Wide shot revealing a pack of five wolves moving through deep snow in single file, pine forest behind them. Audio: Wind, distant howl, crunching snow.
```

**Why it works:** Multi-shot structure (extreme close-up to wide) + breath visibility + pack behavior creates cinematic wildlife documentary.

**Model notes:** Seedance 2.0's physics simulation handles breath condensation and snow dynamics authentically. Multi-shot cuts use 'Cut to:' syntax.

#### Product & Commercial

**Prompt #27** ⭐⭐⭐⭐⭐ (5/5)

```
A premium wristwatch floating in mid-air, slowly rotating with precision, water droplets suspended around it catching the light like diamonds, pure black background with a single dramatic spotlight from above, extreme macro detail showing every texture on the watch face, high-end jewelry commercial aesthetic, ultra-smooth rotation
```

**Why it works:** Reliably produces professional-looking product shots. Floating rotation is a standard for product videos, and Seedance handles it smoothly. Water droplets add a luxurious feel.

**Model notes:** Best settings: 1:1 or 16:9, 8-10 seconds, 1080p

**Prompt #28** ⭐⭐⭐⭐⭐ (5/5)

```
A tall glass of iced coffee being poured in slow motion, rich dark coffee meeting swirling cream creating mesmerizing patterns, ice cubes clinking and shifting, condensation droplets on the glass surface, close-up shot transitioning to medium shot, warm cafe lighting, Starbucks commercial quality, appetizing and inviting mood
```

**Why it works:** Slow-motion pouring is a highly effective advertising format. The mesmerizing vortex pattern is hypnotic and loopable, boosting algorithmic distribution. Generates content indistinguishable from professional footage.

**Model notes:** Best settings: 16:9, 8-10 seconds, 1080p

**Prompt #29** ⭐⭐⭐⭐ (4/5)

```
A smartphone rising from its packaging, layers of protective film peeling away in satisfying slow motion, the screen illuminating to reveal a vibrant home screen, clean environment with soft directional lighting, Apple keynote presentation style, futuristic and aspirational
```

**Why it works:** The 'peeling away' effect is key for satisfying unboxing videos. Seedance 2.0 captures this palpable quality. Works well for consumer electronics with strong visual identities.

**Model notes:** Best settings: 9:16, 8-12 seconds, 1080p

**Prompt #30** ⭐⭐⭐⭐ (4/5)

```
Model walking on an infinite white cyclorama, wearing an oversized camel wool coat, fabric flowing with each step, camera tracking alongside at hip height, wind machine creating gentle fabric movement, clean editorial fashion photography style, soft diffused studio lighting, Zara campaign aesthetic
```

**Why it works:** Effective for e-commerce, focusing on fabric movement to entice purchases. Infinite white background keeps focus on the garment. Hip-height angle ideal for displaying fabric drape.

**Model notes:** Best settings: 9:16, 10-15 seconds, 1080p

#### Sci-Fi, Action

**Prompt #31** ⭐⭐⭐⭐⭐ (5/5)

```
Using @Image1 as the spaceship design reference and @Video1 for the explosion style, create: A massive battle cruiser emerges from hyperspace above an alien planet. Energy weapons fire in both directions. The ship takes a critical hit, hull breaching with explosive decompression. Camera executes a dramatic barrel roll around the ship. Cinematic VFX quality. Audio: Deep bass rumble, energy weapon sounds, explosion.
```

**Why it works:** @reference system for design consistency + specific physics event (decompression) + barrel roll camera creates VFX-quality sci-fi action.

**Model notes:** Seedance 2.0's @reference system is essential for consistent sci-fi design. Explosive decompression triggers accurate physics simulation.

#### Social Media Viral

**Prompt #32** ⭐⭐⭐⭐⭐ (5/5)

```
A perfect sphere of liquid mercury sitting on a mirror surface, slowly deforming under an invisible force into a cube shape, then morphing back to a sphere, reflections shifting with each transformation, seamless loop-ready motion, ASMR-satisfying aesthetic, macro lens extreme close-up, clean minimalist background
```

**Why it works:** Looping transformation videos perform exceptionally well on social media. The 'seamless loop-ready motion' instruction ensures the ending matches the beginning, crucial for continuous loops. Highly engaging and shareable.

**Model notes:** Best settings: 1:1 or 9:16, 6-8 seconds, 1080p

**Prompt #33** ⭐⭐⭐⭐ (4/5)

```
The Eiffel Tower reimagined as if it were made entirely of growing crystal formations, glowing from within with ethereal blue light, time-lapse of crystals spreading and growing across the structure, Parisian sunset in the background, magical realism style, drone shot slowly orbiting the tower
```

**Why it works:** 'What if' scenarios are highly shareable. The Eiffel Tower's lattice structure reinforces the crystalline growth pattern, making it visually compelling. Effective from the first or second generation.

**Model notes:** Best settings: 9:16, 10-15 seconds, 1080p

**Prompt #34** ⭐⭐⭐⭐ (4/5)

```
Split-screen transition: left side shows a plain coffee mug on a desk, right side reveals the same mug transforming into an ornate golden chalice with jewels, dramatic before-and-after reveal with a satisfying swipe transition, clean studio lighting on both sides, viral transformation trend style
```

**Why it works:** Before-and-after content performs well algorithmically. Split-screen layout immediately grabs attention. Results can be impressive when the sliding transition hits correctly.

**Model notes:** Best settings: 9:16, 6-8 seconds, 1080p

**Prompt #35** ⭐⭐⭐⭐⭐ (5/5)

```
A tiny detailed city built inside a glass jar, with miniature cars driving on roads and tiny lights in buildings turning on as day transitions to night, tilt-shift photography effect creating toy-like aesthetic, warm cozy lighting, gentle time-lapse, whimsical and enchanting mood, macro lens perspective
```

**Why it works:** Miniature worlds have universal appeal. The day-to-night transition adds a narrative element. Tilt-shift effect enhances the toy-size scale, creating a delightful and crafted feel.

**Model notes:** Best settings: 9:16, 12-15 seconds, 1080p

---
