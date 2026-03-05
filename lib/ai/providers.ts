import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";

// Kimi (OpenAI-compatible)
const kimi = createOpenAI({
  baseURL: process.env.KIMI_BASE_URL || "https://api.moonshot.cn/v1",
  apiKey: process.env.KIMI_API_KEY,
});

// Qwen (OpenAI-compatible)
const qwen = createOpenAI({
  baseURL:
    process.env.QWEN_BASE_URL ||
    "https://dashscope.aliyuncs.com/compatible-mode/v1",
  apiKey: process.env.QWEN_API_KEY,
});

// Map provider string to AI SDK model
export function getLanguageModel(provider: string, modelId?: string) {
  switch (provider) {
    case "anthropic":
      return anthropic(modelId || "claude-sonnet-4-20250514");
    case "openai":
      return openai(modelId || "gpt-5.4");
    case "openai-thinking":
      return openai(modelId || "gpt-5.4", {
        reasoningEffort: "high",
      });
    case "openai-pro":
      return openai(modelId || "gpt-5.4-pro");
    case "google":
      return google(modelId || "gemini-2.0-flash");
    case "moonshot":
      return kimi(modelId || "moonshot-v1-128k");
    case "alibaba":
      return qwen(modelId || "qwen-plus");
    default:
      return openai("gpt-5.4");
  }
}

// Default conversation model (used by agents for chat)
export function getConversationModel() {
  return openai("gpt-5.4");
}

// Conversation model with reasoning (for complex tasks like Boost evaluation)
export function getReasoningModel() {
  return openai("gpt-5.4", {
    reasoningEffort: "high",
  });
}
