# Veo 3.1 - Technical Specifications & Prompt Guide

## Core Technical Specs
- **Resolution**: 720p (1280x720), 1080p (1920x1080), 4K (3840x2160)
- **Aspect Ratio**: 16:9 or 9:16
- **Duration**: 4, 6, or 8 seconds per clip
- **Max outputs per prompt**: 4 videos
- **Audio**: Native synchronized audio generation (dialogue, SFX, ambient)
- **Watermark**: SynthID digital watermarking

## Advanced Features
- Image-to-video animation
- "Ingredients to video" (reference images for consistent elements)
- "First and last frame" (transition between start/end images)
- Add/remove object from video
- Multi-person dialogue generation

## Prompt Formula
**[Cinematography] + [Subject] + [Action] + [Context] + [Style & Ambiance]**

### Cinematography Elements
- Camera movement: dolly shot, tracking shot, crane shot, aerial view, slow pan, POV shot
- Composition: wide shot, close-up, extreme close-up, low angle, two-shot
- Lens & focus: shallow depth of field, wide-angle lens, soft focus, macro lens, deep focus

### Audio Direction
- Dialogue: Use quotation marks (e.g., A woman says, "We have to leave now.")
- SFX: Describe sounds (e.g., SFX: thunder cracks in the distance)
- Ambient: Define soundscape (e.g., Ambient noise: the quiet hum of a starship bridge)

### Negative Prompting
- Describe what to exclude positively: "a desolate landscape with no buildings or roads" instead of "no man-made structures"

## Example Prompts
1. **Crane shot**: "Crane shot starting low on a lone hiker and ascending high above, revealing they are standing on the edge of a colossal, mist-filled canyon at sunrise, epic fantasy style, awe-inspiring, soft morning light."
2. **Shallow DOF**: "Close-up with very shallow depth of field, a young woman's face, looking out a bus window at the passing city lights with her reflection faintly visible on the glass, inside a bus at night during a rainstorm, melancholic mood with cool blue tones, moody, cinematic."
3. **Retro**: "Medium shot, a tired corporate worker, rubbing his temples in exhaustion, in front of a bulky 1980s computer in a cluttered office late at night. The scene is lit by the harsh fluorescent overhead lights and the green glow of the monochrome monitor. Retro aesthetic, shot as if on 1980s color film, slightly grainy."

## Preset Categories
- Cinematic/Film
- Documentary
- Commercial/Advertising
- Fantasy/Sci-Fi
- Nature/Landscape
- Character/Portrait
- Product Showcase
- Ambient/Atmospheric
