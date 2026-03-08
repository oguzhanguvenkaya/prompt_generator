"use client";

import { useEffect, useRef, useCallback } from "react";
import { ChatMessage } from "./chat-message";
import { StreamingIndicator } from "./streaming-indicator";
import type { UIMessage } from "@ai-sdk/react";

interface ChatMessageListProps {
  messages: UIMessage[];
  isLoading: boolean;
  agentColor?: string;
  onOptionSelect?: (text: string) => void;
}

export function ChatMessageList({ messages, isLoading, agentColor, onOptionSelect }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);

  const handleScroll = useCallback(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const threshold = 100;
    userScrolledUp.current = el.scrollHeight - el.scrollTop - el.clientHeight > threshold;
  }, []);

  useEffect(() => {
    if (!userScrolledUp.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Find last assistant message index
  const lastAssistantIndex = messages.reduce(
    (acc, msg, i) => (msg.role === "assistant" ? i : acc),
    -1
  );

  return (
    <div ref={scrollAreaRef} onScroll={handleScroll} className="flex-1 p-4 overflow-y-auto">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>Sohbete başlamak için bir mesaj yazın.</p>
        </div>
      )}
      {messages.map((message, index) => {
        // Extract text content from parts
        const textContent = message.parts
          .filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join("");

        // Check for tool invocations
        const hasToolParts = message.parts.some((p) => p.type === "tool-invocation");
        const isToolOnly = !textContent.trim() && hasToolParts;

        // Skip assistant messages that only have tool calls (no visible text)
        if (message.role === "assistant" && isToolOnly) {
          return null;
        }

        return (
          <ChatMessage
            key={message.id}
            role={message.role as "user" | "assistant"}
            content={textContent}
            agentColor={agentColor}
            parts={message.parts}
            onOptionSelect={onOptionSelect}
            isLastAssistant={index === lastAssistantIndex}
            isStreaming={isLoading && index === lastAssistantIndex}
          />
        );
      })}
      {isLoading && <StreamingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
