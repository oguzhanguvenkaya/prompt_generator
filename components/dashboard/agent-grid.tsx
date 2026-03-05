"use client";

import { AgentCard } from "./agent-card";

const agents = [
  {
    id: "text-craft" as const,
    name: "TextCraft",
    description: "LLM & Metin Üretimi — Claude, GPT, Gemini, Kimi, Qwen",
    icon: "pen-tool",
    color: "textcraft",
    models: ["Claude", "GPT-4o", "Gemini"],
  },
  {
    id: "pixel-forge" as const,
    name: "PixelForge",
    description: "Görsel Üretimi — Recraft, Lovart, Leonardo AI",
    icon: "palette",
    color: "pixelforge",
    models: ["Recraft V3", "Lovart", "Leonardo"],
  },
  {
    id: "motion-lab" as const,
    name: "MotionLab",
    description: "Video Üretimi — Kling, Higgsfield",
    icon: "film",
    color: "motionlab",
    models: ["Kling 2.6", "Higgsfield"],
  },
];

export function AgentGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} {...agent} />
      ))}
    </div>
  );
}
