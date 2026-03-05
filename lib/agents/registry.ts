import { AgentConfig, AgentId } from "./types";
import { textCraftConfig } from "./text-craft";
import { pixelForgeConfig } from "./pixel-forge";
import { motionLabConfig } from "./motion-lab";

const agents: Record<AgentId, AgentConfig> = {
  "text-craft": textCraftConfig,
  "pixel-forge": pixelForgeConfig,
  "motion-lab": motionLabConfig,
};

export function getAgent(id: AgentId): AgentConfig {
  const agent = agents[id];
  if (!agent) throw new Error(`Unknown agent: ${id}`);
  return agent;
}

export function getAllAgents(): AgentConfig[] {
  return Object.values(agents);
}

export { agents };
