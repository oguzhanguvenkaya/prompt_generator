"use client";

import { cn } from "@/lib/utils/cn";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  agentColor?: string;
}

export function ChatMessage({ role, content, agentColor }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3 py-4", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
          !isUser && agentColor
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "flex-1 space-y-2 overflow-hidden rounded-lg px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground max-w-[80%] ml-auto"
            : "bg-muted max-w-[80%]"
        )}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}
