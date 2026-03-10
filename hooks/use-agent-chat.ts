"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useChatStore } from "@/lib/store/chat-store";
import type { AgentId } from "@/lib/agents/types";
import { useMemo } from "react";

export function useAgentChat(agentId: AgentId) {
  const { quickSettings } = useChatStore();

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: {
          agentId,
          targetModel: quickSettings.model,
          quickSettings,
        },
      }),
    [agentId, quickSettings]
  );

  const chat = useChat({ transport });

  return chat;
}
