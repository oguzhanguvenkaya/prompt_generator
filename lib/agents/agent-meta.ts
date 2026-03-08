import { PenTool, Palette, Film, type LucideIcon } from "lucide-react";
import type { AgentId, AgentCategory } from "./types";

export interface AgentMeta {
  id: AgentId;
  name: string;
  category: AgentCategory;
  description: string;
  icon: LucideIcon;
  color: string;
  bgActive: string;
  defaultModel: string;
}

export const agentMetas: Record<AgentId, AgentMeta> = {
  "text-craft": {
    id: "text-craft",
    name: "TextCraft",
    category: "text",
    description: "LLM & Metin",
    icon: PenTool,
    color: "text-indigo-600 dark:text-indigo-400",
    bgActive: "bg-indigo-100 dark:bg-indigo-950",
    defaultModel: "claude-sonnet",
  },
  "pixel-forge": {
    id: "pixel-forge",
    name: "PixelForge",
    category: "image",
    description: "Görsel",
    icon: Palette,
    color: "text-pink-600 dark:text-pink-400",
    bgActive: "bg-pink-100 dark:bg-pink-950",
    defaultModel: "recraft-v3",
  },
  "motion-lab": {
    id: "motion-lab",
    name: "MotionLab",
    category: "video",
    description: "Video",
    icon: Film,
    color: "text-amber-600 dark:text-amber-400",
    bgActive: "bg-amber-100 dark:bg-amber-950",
    defaultModel: "kling-3.0",
  },
};

export const agentList = Object.values(agentMetas);
