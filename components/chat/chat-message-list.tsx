"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";
import { StreamingIndicator } from "./streaming-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "ai";

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  agentColor?: string;
}

export function ChatMessageList({ messages, isLoading, agentColor }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1 p-4">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>Sohbete başlamak için bir mesaj yazın.</p>
        </div>
      )}
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          role={message.role as "user" | "assistant"}
          content={message.content}
          agentColor={agentColor}
        />
      ))}
      {isLoading && <StreamingIndicator />}
      <div ref={bottomRef} />
    </ScrollArea>
  );
}
