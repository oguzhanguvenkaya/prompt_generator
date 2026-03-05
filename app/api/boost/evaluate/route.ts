import { NextResponse } from "next/server";
import { evaluateTextPrompt } from "@/lib/boost/evaluators/text-evaluator";
import { evaluateImagePrompt } from "@/lib/boost/evaluators/image-evaluator";
import { evaluateVideoPrompt } from "@/lib/boost/evaluators/video-evaluator";

export async function POST(req: Request) {
  const { prompt, agentId, targetModel } = await req.json();

  if (!prompt || !agentId || !targetModel) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  let result;
  switch (agentId) {
    case "text-craft":
      result = await evaluateTextPrompt(prompt, targetModel);
      break;
    case "pixel-forge":
      result = await evaluateImagePrompt(prompt, targetModel);
      break;
    case "motion-lab":
      result = await evaluateVideoPrompt(prompt, targetModel);
      break;
    default:
      return NextResponse.json({ error: "Unknown agent" }, { status: 400 });
  }

  return NextResponse.json(result);
}
