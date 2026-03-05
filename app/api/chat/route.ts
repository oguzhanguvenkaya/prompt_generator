import { streamText } from "ai";
import { getConversationModel } from "@/lib/ai/providers";
import { getAgent } from "@/lib/agents/registry";
import type { AgentId, ModelConfig } from "@/lib/agents/types";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, agentId, targetModel, modelConfig } = await req.json();

  const agent = getAgent(agentId as AgentId);

  // Build system prompt with model-specific rules
  let systemPrompt = agent.systemPrompt;
  if (modelConfig) {
    systemPrompt +=
      "\n\n" + agent.getModelSpecificPrompt(modelConfig as ModelConfig);
  }

  // Use GPT-5.4 as the default conversation model for all agents
  const model = getConversationModel();

  const result = streamText({
    model,
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
