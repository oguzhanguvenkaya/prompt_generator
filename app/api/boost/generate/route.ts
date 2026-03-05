import { NextResponse } from "next/server";
import { generateText } from "ai";
import { getReasoningModel } from "@/lib/ai/providers";

export async function POST(req: Request) {
  const { prompt, feedback, agentId, targetModel } = await req.json();

  if (!prompt || !feedback) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const model = getReasoningModel();

  const { text } = await generateText({
    model,
    system: `You are a prompt optimization expert specializing in ${targetModel} prompts for ${agentId}. Revise the given prompt based on the evaluation feedback. Output ONLY the revised prompt, nothing else.`,
    prompt: `Original prompt:\n${prompt}\n\nFeedback:\n${feedback}\n\nRevised prompt:`,
  });

  return NextResponse.json({ revisedPrompt: text.trim() });
}
