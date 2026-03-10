# Nano Banana Pro (Gemini 3 Pro Image) - Technical Specifications & Prompt Guide

## Model Overview
- **Nano Banana Pro** = Gemini 3 Pro Image
- **Nano Banana 2** = Gemini 3.1 Flash Image
- Built on Gemini 3 family, uses deep reasoning before generating

## Core Technical Specs
| Spec | Nano Banana Pro | Nano Banana 2 |
|------|----------------|---------------|
| Context window (input) | 65,536 tokens | 131,072 tokens |
| Context window (output) | 32,768 tokens | 32,768 tokens |
| Resolution | 1K, 2K, 4K | 512px, 1K, 2K, 4K |
| Aspect ratios | 1:1, 3:2, 2:3, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 | All Pro + 1:4, 4:1, 1:8, 8:1 |
| Reference images | Up to 14 per prompt | Up to 14 per prompt |
| Live web search | Yes | Yes |
| Watermark | C2PA + SynthID | C2PA + SynthID |

## Five Prompting Frameworks

### 1. Text-to-Image Generation
**Formula**: [Subject] + [Action] + [Location/context] + [Composition] + [Style]

Example: "A striking fashion model wearing a tailored brown dress, sleek boots, and holding a structured handbag. Posing with a confident, statuesque stance, slightly turned. A seamless, deep cherry red studio backdrop. Medium-full shot, center-framed. Fashion magazine style editorial, shot on medium-format analog film, pronounced grain, high saturation, cinematic lighting effect."

### 2. Multimodal Generation (with references)
**Formula**: [Reference images] + [Relationship instruction] + [New scenario]

Example: "Using the attached napkin sketch as the structure and the attached fabric sample as the texture, transform this into a high-fidelity 3D armchair render. Place it in a sun-drenched, minimalist living room."

### 3. Real-time Web Search
**Formula**: [Source/Search request] + [Analytical task] + [Visual translation]

### 4. Text Rendering & Localization
- Use quotes for desired text: "Happy Birthday"
- Specify font style: "bold sans-serif"
- Specify placement: "centered at top"
- Supports 10+ languages

### 5. Storyboarding & Sequences
- Generate consistent character across multiple frames
- Use same character descriptor throughout

## Best Practices
- Be specific: concrete details on subject, lighting, composition
- Use positive framing: "empty street" not "no cars"
- Control camera: use photographic/cinematic terms ("low angle", "aerial view")
- Iterate: refine with follow-up prompts conversationally
- Start with strong verb: "Generate", "Create", "Edit", "Transform"

## Use Case Categories
- E-commerce product photography
- Fashion editorial
- Marketing mockups
- Poster/typographic design
- Storyboarding
- 3D renders
- Style transfer
- Illustration
- Architectural visualization
