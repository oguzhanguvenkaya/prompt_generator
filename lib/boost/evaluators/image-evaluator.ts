import { generateText } from "ai";
import { getReasoningModel } from "@/lib/ai/providers";

export async function evaluateImagePrompt(
  prompt: string,
  targetModel: string
): Promise<{ score: number; feedback: string }> {
  const model = getReasoningModel();

  const { text } = await generateText({
    model,
    system: `You are an expert image generation prompt evaluator. Evaluate the prompt quality for ${targetModel}.

Score on a 0.0-1.0 scale across these dimensions:
1. Subject Clarity (0-0.2): Is the main subject clearly defined?
2. Style & Mood (0-0.2): Are artistic style and mood specified?
3. Composition (0-0.2): Are framing, perspective, and layout described?
4. Technical Details (0-0.2): Lighting, colors, texture details?
5. Model Optimization (0-0.2): Is the prompt formatted for the target model?

Respond ONLY in JSON: {"score": number, "feedback": "string", "dimensions": {"subjectClarity": number, "styleMood": number, "composition": number, "technicalDetails": number, "modelOptimization": number}}`,
    prompt: `Evaluate this image prompt for ${targetModel}:\n\n${prompt}`,
  });

  try {
    return JSON.parse(text);
  } catch {
    return { score: 0.5, feedback: "Could not parse evaluation" };
  }
}
