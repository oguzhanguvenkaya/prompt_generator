# Seedance 2.0 - Technical Specifications & Prompt Guide

## Core Technical Specs
- **Developer**: ByteDance (released February 2026)
- **Resolution**: Up to 1080p (native 720p, upscaled to 1080p; professional: 2K)
- **Duration**: 4-second clips up to 15-second sequences
- **Aspect ratios**: 16:9, 9:16, 1:1
- **Architecture**: Dual-branch diffusion transformer (simultaneous visual + audio)
- **Reference inputs**: Up to 12 files per generation
  - 9 images (characters, environments, style)
  - 3 video clips (up to 15 seconds total, for camera/action references)
  - 3 audio files (up to 15 seconds total, for music/dialogue/SFX)
- **@reference system**: Tag-based granular control
- **Physics simulation**: Weight distribution, friction, momentum, gravity, collision

## Three Core Prompt Frameworks

### Framework 1: Cinematic Single-Shot Structure
**Core Logic**: Subject + Scene/Atmosphere + Action/Performance + Camera Movement + Style/Lighting

Example: "A young woman in a red leather jacket stands at the edge of a rain-soaked rooftop at night, neon signs reflecting in puddles around her feet. She turns slowly toward the camera, wind catching her hair, as distant thunder rumbles. The camera pulls back in a smooth dolly movement, revealing the sprawling cyberpunk cityscape behind her. Cinematic lighting with high contrast, film grain texture, moody color grading with teal and orange tones."

### Framework 2: Multi-Shot Narrative Sequence
**Core Logic**: Shot 1 description -> Transition cue -> Shot 2 description -> Shot 3 description

Transition cues: "Cut to:", "Transition to:", "Shift to:"

Example: "Shot 1: Close-up of hands assembling a mechanical device, precise movements, overhead lighting casting sharp shadows. Cut to: Medium shot of an inventor's workshop cluttered with blueprints and tools, the device now complete on the workbench. Cut to: Wide shot through the workshop window as an explosion of light erupts from the device, illuminating the entire room."

### Framework 3: Reference-Driven Composition
**Core Logic**: Base description + @Image references + @Video references + @Audio references

Example: "A dancer performs contemporary choreography in an abandoned warehouse. Use @Image1 as the character reference. Reference @Video1 for the fluid movement style. Apply @Image2 for the industrial warehouse environment. Sync movement beats to @Audio1's musical rhythm. Camera executes a 360-degree orbit around the dancer."

## Technical Parameters

### Resolution & Aspect Ratio
- 16:9 (1920x1080): Cinematic, YouTube, documentary
- 9:16 (1080x1920): TikTok, Instagram Reels, mobile
- 1:1 (1080x1080): Instagram, social media

### Duration Strategy
- 4-second clips: Testing, loops, product reveals
- 5-10 seconds: Social media, ads
- 10-15 seconds: Narrative sequences, brand films

### Generation Time
- 60-90 seconds depending on duration and resolution

## Camera Control Vocabulary
- Dolly push/pull
- 360-degree orbit
- Tracking shot
- Handheld (documentary style)
- Crane shot
- Speed ramp

---

# Seedream 2.0 - Technical Specifications

## Core Technical Specs
- **Developer**: ByteDance
- **Type**: Native Chinese-English bilingual image generation
- **Architecture**: Foundation model for image generation
- **Strengths**: Text rendering in both Chinese and English, bilingual content

## Key Capabilities
- Bilingual text rendering (Chinese + English)
- High-fidelity image generation
- Diverse style support
- Strong prompt adherence

## Prompt Structure (General)
- Subject: Primary focus of the image
- Composition: Framing, angle, layout
- Style: One visual anchor (genre, medium, era)
- Lighting: Mood and atmosphere
- Quality modifiers: Resolution, detail level

## Use Case Categories
- Bilingual marketing materials
- Chinese/Asian market content
- E-commerce product imagery
- Illustration and art
- Fashion and lifestyle
- Architectural visualization
