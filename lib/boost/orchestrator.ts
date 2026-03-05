import { generateText } from "ai";
import { getLanguageModel } from "@/lib/ai/providers";

interface BoostConfig {
  prompt: string;
  agentId: string;
  targetModel: string;
  maxIterations?: number;
  targetScore?: number;
}

interface BoostIteration {
  iteration: number;
  score: number;
  feedback: string;
  revisedPrompt: string;
}

export async function* boostPrompt(config: BoostConfig): AsyncGenerator<
  | { type: "iteration"; data: BoostIteration }
  | { type: "complete"; data: { finalPrompt: string; finalScore: number; iterations: BoostIteration[] } }
> {
  const { prompt, agentId, targetModel, maxIterations = 3, targetScore = 0.9 } = config;
  const iterations: BoostIteration[] = [];
  let currentPrompt = prompt;

  for (let i = 1; i <= maxIterations; i++) {
    // Step 1: Evaluate current prompt
    const evaluation = await evaluatePrompt(currentPrompt, agentId, targetModel);

    // Step 2: If score is good enough, stop
    if (evaluation.score >= targetScore) {
      const iterResult: BoostIteration = {
        iteration: i,
        score: evaluation.score,
        feedback: evaluation.feedback,
        revisedPrompt: currentPrompt,
      };
      iterations.push(iterResult);
      yield { type: "iteration", data: iterResult };
      yield {
        type: "complete",
        data: { finalPrompt: currentPrompt, finalScore: evaluation.score, iterations },
      };
      return;
    }

    // Step 3: Revise prompt based on feedback
    const revised = await revisePrompt(currentPrompt, evaluation.feedback, agentId, targetModel);

    const iterResult: BoostIteration = {
      iteration: i,
      score: evaluation.score,
      feedback: evaluation.feedback,
      revisedPrompt: revised,
    };
    iterations.push(iterResult);
    currentPrompt = revised;

    yield { type: "iteration", data: iterResult };
  }

  // Final evaluation
  const finalEval = await evaluatePrompt(currentPrompt, agentId, targetModel);
  yield {
    type: "complete",
    data: { finalPrompt: currentPrompt, finalScore: finalEval.score, iterations },
  };
}

async function evaluatePrompt(
  prompt: string,
  agentId: string,
  targetModel: string
): Promise<{ score: number; feedback: string }> {
  const model = getLanguageModel("anthropic");

  const categoryRubric = getCategoryRubric(agentId);

  const { text } = await generateText({
    model,
    system: `You are a prompt engineering evaluator. Evaluate the given prompt for a ${targetModel} model.

Scoring rubric (0.0-1.0):
${categoryRubric}

Respond in JSON format:
{"score": 0.0-1.0, "feedback": "specific improvement suggestions"}`,
    prompt: `Evaluate this prompt:\n\n${prompt}`,
  });

  try {
    const parsed = JSON.parse(text);
    return { score: parsed.score || 0.5, feedback: parsed.feedback || "No feedback" };
  } catch {
    return { score: 0.5, feedback: "Evaluation could not be parsed. Consider improving clarity and specificity." };
  }
}

async function revisePrompt(
  prompt: string,
  feedback: string,
  agentId: string,
  targetModel: string
): Promise<string> {
  const model = getLanguageModel("anthropic");

  const { text } = await generateText({
    model,
    system: `You are a prompt optimization expert. Revise the given prompt based on the feedback provided. The prompt is for a ${targetModel} model. Only output the revised prompt, nothing else.`,
    prompt: `Original prompt:\n${prompt}\n\nFeedback:\n${feedback}\n\nRevised prompt:`,
  });

  return text.trim();
}

function getCategoryRubric(agentId: string): string {
  switch (agentId) {
    case "text-craft":
      return `- Clarity and specificity (0.2)
- Role/task definition (0.2)
- Structure and formatting (0.2)
- Examples and constraints (0.2)
- Output format specification (0.2)`;
    case "pixel-forge":
      return `- Subject clarity (0.2)
- Style and mood description (0.2)
- Composition and framing (0.2)
- Technical details (lighting, color) (0.2)
- Model-specific optimization (0.2)`;
    case "motion-lab":
      return `- Subject and action clarity (0.2)
- Camera movement specification (0.25)
- Temporal flow description (0.2)
- Mood and atmosphere (0.15)
- Technical parameters (0.2)`;
    default:
      return `- Clarity (0.25)\n- Specificity (0.25)\n- Structure (0.25)\n- Completeness (0.25)`;
  }
}
