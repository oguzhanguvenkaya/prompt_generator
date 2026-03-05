import { generateText } from "ai";
import { getReasoningModel } from "@/lib/ai/providers";

export async function evaluateVideoPrompt(
  prompt: string,
  targetModel: string
): Promise<{ score: number; feedback: string }> {
  const model = getReasoningModel();

  const { text } = await generateText({
    model,
    system: `You are an expert video generation prompt evaluator. Evaluate the prompt quality for ${targetModel}.

Score on a 0.0-1.0 scale across these dimensions:
1. Subject & Action (0-0.2): Are subject and movement clearly defined?
2. Camera Movement (0-0.25): Is camera behavior specified? (critical for video)
3. Temporal Flow (0-0.2): Is the progression over time described?
4. Mood & Atmosphere (0-0.15): Are mood, lighting, and atmosphere defined?
5. Technical Params (0-0.2): Duration, quality, model-specific settings?

Respond ONLY in JSON: {"score": number, "feedback": "string", "dimensions": {"subjectAction": number, "cameraMovement": number, "temporalFlow": number, "moodAtmosphere": number, "technicalParams": number}}`,
    prompt: `Evaluate this video prompt for ${targetModel}:\n\n${prompt}`,
  });

  try {
    return JSON.parse(text);
  } catch {
    return { score: 0.5, feedback: "Could not parse evaluation" };
  }
}
