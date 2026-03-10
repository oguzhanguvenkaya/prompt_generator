# Kling 3.0 - Technical Specifications & Prompt Guide

## Core Technical Specs
- **Duration**: Up to 15 seconds per clip
- **Multi-shot**: Up to 6 camera angles in a single generation
- **Resolution**: 1080p (standard), 4K output capable
- **Audio**: Native audio and dialogue generation
- **Character consistency**: Maintained across shots and movements
- **First/last frame control**: Seamless loops and transitions
- **API cost**: ~$0.12-$0.14 per video
- **Concurrent tasks**: 5-9 simultaneous

## Prompt Formula
**Scene → Characters → Action → Camera → Audio & Style**

### Layer 1: Scene (Context Anchor)
- Location (indoor/outdoor, city, nature, room type)
- Time of day or lighting condition
- Overall atmosphere

### Layer 2: Characters (Clear Roles)
- Use specific descriptors: "the woman in a red coat," "the barista"
- Avoid vague references like "someone" or "they"
- Reuse same descriptor consistently throughout

### Layer 3: Action (Timeline)
- Break movement into sequential steps
- Use time markers for longer scenes
- Describe progression: beginning → middle → end

### Layer 4: Camera (Cinematography)
- Shot type: wide, medium, close-up, macro
- Movement: push-in, orbit, pan, tracking, dolly
- Transitions: cut, shift focus, pull back

### Layer 5: Audio & Style (Atmosphere)
- Attribute dialogue to specific characters
- Specify tone, pace, and language
- Add ambient sound for realism

## Camera Movement Techniques
- Dolly push: "Slow dolly push into the subject's face"
- Tracking shot: "Camera tracks alongside the subject as they walk"
- Crane shot: "Camera cranes up to reveal the full environment"
- Handheld: "Shaky handheld camera movement with quick, imperfect pans"
- Rack focus: "Rack focus from foreground to background"
- Speed ramp: "Speed ramp from 40% to 100% as action intensifies"

## Audio Formatting
```
[Character A: Lead Detective, controlled serious voice]: "Let's stop pretending."
[Character B: Prime Suspect, sharp defensive voice]: "I already told you everything."
SFX: A massive power-up sound effect like a turbine spinning at max speed
```

## Negative Prompting
"No shake. Stable face. Braids intact. Outfit artifact free. No circular motion around object. No morphing textures."

Common negative prompts: blur, flicker, distorted faces, warped limbs, unrealistic proportions, blurry textures, morphing, deformed hands, extra fingers, mutation, ugly, disfigured, low quality, artifacts, glitch

## Time Code Control
- "First sequence (0-1 seconds): ..."
- "Second sequence (1-5 seconds): ..."
- "Third sequence (5-10 seconds): ..."

## Multi-Shot Example
```
Master Prompt: Joker begins his iconic dance descent down the stairs
Shot 1 (0-5 seconds): Man in red suit starts dancing at top of stairs, arms spreading wide
Shot 2 (5-10 seconds): Continuing wild dance down concrete steps, spinning and kicking
```

## Character Consistency Example
```
[Character A: Black-suited Agent with sharp features]
[Character B: Female Assistant with anxious expression]
A dim kitchen late at night. Only the refrigerator hum fills the silence.
```
