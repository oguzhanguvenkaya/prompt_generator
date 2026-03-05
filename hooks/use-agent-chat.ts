"use client";

import { useChat } from "ai/react";
import { useChatStore } from "@/lib/store/chat-store";
import type { AgentId } from "@/lib/agents/types";

export function useAgentChat(agentId: AgentId) {
  const { quickSettings } = useChatStore();

  const chat = useChat({
    api: "/api/chat",
    body: {
      agentId,
      targetModel: quickSettings.model,
      quickSettings,
    },
  });

  return chat;
}
