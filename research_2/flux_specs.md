# Flux - Technical Specifications & Prompt Guide

## Model Variants
| Model | Parameters | Steps | Use Case |
|-------|-----------|-------|----------|
| FLUX.1 [schnell] | - | 1-4 steps | Fast prototyping, real-time apps |
| FLUX.1 [dev] | - | 20-50 steps | Community LoRAs, quality output |
| FLUX 1.1 [pro] Ultra | - | - | Up to 4-megapixel, "Raw" mode |
| FLUX.2 [pro] | 32B | - | Latest gen, JSON prompting, HEX color |
| FLUX.2 [dev] | 32B | Configurable | Open-weight, LoRA training |
| FLUX Kontext | - | - | Image editing, character consistency |
| FLUX.2 Klein 4B | 4B | - | Consumer GPU (RTX 3090/4070) |
| FLUX.2 Klein 9B | 9B | - | Consumer GPU |

## Text Encoder Architecture
- FLUX.1: Dual encoder (CLIP + T5-XXL 4.6B)
- FLUX.2: Mistral Small 3.2 (24B VLM)
- FLUX.2 Klein: Qwen3 encoders

## Key Difference from Stable Diffusion
- FLUX wants NATURAL LANGUAGE, not keyword lists
- NO negative prompts (guidance-distilled architecture)
- NO weight syntax like (word:1.5) or (emphasis)++

## Prompt Structure (Token Weight Order)
1. **Subject first** - What is the image of?
2. **Action or pose** - What is the subject doing?
3. **Environment** - Where is this happening?
4. **Lighting** - How is the scene lit?
5. **Style and technical specs** - Camera, look, mood

## Prompt Length
- Sweet spot: **40-50 words**
- Under 10 words: model fills in from training data
- Over 200 words: model internally summarizes, parts may be dropped
- FLUX.1 [dev]: max 512 tokens
- FLUX.1 [schnell]: max 256 tokens

## Negative Prompting Alternative
Instead of: `negative_prompt: "blurry, low quality, bad hands"`
Use: `"sharp focus, crisp detail, accurate hands, natural proportions"`

## FLUX.2 Special Features
- **JSON prompting**: Structured prompt format
- **HEX color specification**: Exact color control
- **Raw mode** (FLUX 1.1 Pro Ultra): Candid, less-processed photography aesthetics

## Example Prompts
1. **Portrait**: "Portrait of a middle-aged marathon runner catching his breath, sweat on his forehead, city street at dawn with empty storefronts behind him, soft backlight with cool blue tones, shot on Sony A7IV with 85mm f/1.8 lens"
2. **Natural language**: "A woman in a red silk dress standing barefoot on a sandy beach at sunset, warm golden light behind her, shallow depth of field with soft bokeh across the water"

## Keyword-style (WRONG for Flux)
woman, red dress, beach, sunset, bokeh, 8k, masterpiece, best quality

## Natural language (CORRECT for Flux)
A woman in a red silk dress standing barefoot on a sandy beach at sunset, warm golden light behind her, shallow depth of field with soft bokeh across the water

## Use Case Categories
- Photorealistic portraits
- Product photography
- Architectural visualization
- Fashion/editorial
- Landscape/nature
- Abstract/artistic
- Character design
- Commercial advertising
