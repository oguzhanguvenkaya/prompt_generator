"use client";

import { useChat } from "ai/react";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";
import type { AgentId } from "@/lib/agents/types";
import { useChatStore } from "@/lib/store/chat-store";

interface ChatContainerProps {
  agentId: AgentId;
  agentColor?: string;
}

export function ChatContainer({ agentId, agentColor }: ChatContainerProps) {
  const { quickSettings } = useChatStore();

  const { messages, isLoading, append } = useChat({
    api: "/api/chat",
    body: {
      agentId,
      targetModel: quickSettings.model,
      modelConfig: null, // Will be populated from model configs
    },
  });

  const handleSubmit = (content: string) => {
    append({ role: "user", content });
  };

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        agentColor={agentColor}
      />
      <ChatInput
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={getPlaceholder(agentId)}
      />
    </div>
  );
}

function getPlaceholder(agentId: AgentId): string {
  switch (agentId) {
    case "text-craft":
      return "Ne tür bir metin/prompt üretmek istiyorsunuz?";
    case "pixel-forge":
      return "Nasıl bir görsel oluşturmak istiyorsunuz?";
    case "motion-lab":
      return "Nasıl bir video oluşturmak istiyorsunuz?";
    default:
      return "Mesajınızı yazın...";
  }
}
