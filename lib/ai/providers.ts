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
      return openai(modelId || "gpt-5.4");
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

import { models } from "./models";

// Model ID → actual API model ID mapping for text models.
// Only needed when UI model ID differs from the actual API model ID.
const modelIdOverrides: Record<string, string> = {
  "claude-sonnet": "claude-sonnet-4-20250514",
  "claude-opus": "claude-opus-4-20250514",
  "gpt-4o": "gpt-4o",
  "gpt-5.4-thinking": "gpt-5.4",
  "gemini-pro": "gemini-2.5-pro",
  "kimi-k2.5": "kimi-k2.5",
  "qwen": "qwen-plus",
};

export function getTextAgentModel(targetModelId: string) {
  const modelInfo = models.find((m) => m.id === targetModelId);
  if (!modelInfo) return getLanguageModel("openai"); // fallback

  const actualModelId = modelIdOverrides[targetModelId] || targetModelId;
  return getLanguageModel(modelInfo.provider, actualModelId);
}

// Default conversation model (used by agents for chat)
export function getConversationModel() {
  return openai("gpt-5.4");
}

// Conversation model with reasoning (for complex tasks like Boost evaluation)
export function getReasoningModel() {
  return openai("gpt-5.4");
}
