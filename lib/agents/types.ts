export type AgentId = "text-craft" | "pixel-forge" | "motion-lab";
export type AgentCategory = "text" | "image" | "video";
export type ConversationPhase = "greeting" | "discovery" | "refinement" | "generation" | "boost";
export type PromptFormat = "natural" | "tags" | "structured";

export interface SizeOption {
  label: string;
  width: number;
  height: number;
}

export interface QualityOption {
  label: string;
  value: string;
  costMultiplier?: number;
}

export interface StylePreset {
  label: string;
  value: string;
  modelSpecific?: boolean;
}

export interface ModelConfig {
  id: string;
  name: string;
  category: AgentCategory;
  provider: string;
  promptFormat: PromptFormat;
  supportedSizes: SizeOption[];
  qualityOptions: QualityOption[];
  stylePresets: StylePreset[];
  supportsNegativePrompt: boolean;
  maxPromptLength: number;
  documentationUrl?: string;
  specificRules: string;
}

export interface AgentConfig {
  id: AgentId;
  name: string;
  description: string;
  category: AgentCategory;
  icon: string; // lucide icon name
  color: string; // tailwind color class
  supportedModels: string[]; // model config IDs
  defaultModel: string;
  systemPrompt: string;
  getModelSpecificPrompt: (modelId: string) => string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export interface GeneratedPrompt {
  prompt: string;
  negativePrompt?: string;
  parameters?: Record<string, unknown>;
}
