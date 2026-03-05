import { generateText } from "ai";
import { getReasoningModel } from "@/lib/ai/providers";

export async function evaluateTextPrompt(
  prompt: string,
  targetModel: string
): Promise<{ score: number; feedback: string }> {
  const model = getReasoningModel();

  const { text } = await generateText({
    model,
    system: `You are an expert LLM prompt evaluator. Evaluate the prompt quality for ${targetModel}.

Score on a 0.0-1.0 scale across these dimensions:
1. Clarity (0-0.2): Is the prompt unambiguous?
2. Specificity (0-0.2): Does it provide enough detail?
3. Structure (0-0.2): Is it well-organized with clear sections?
4. Examples (0-0.2): Does it include examples or constraints?
5. Output Format (0-0.2): Does it specify expected output?

Respond ONLY in JSON: {"score": number, "feedback": "string", "dimensions": {"clarity": number, "specificity": number, "structure": number, "examples": number, "outputFormat": number}}`,
    prompt: `Evaluate:\n\n${prompt}`,
  });

  try {
    return JSON.parse(text);
  } catch {
    return { score: 0.5, feedback: "Could not parse evaluation" };
  }
}
