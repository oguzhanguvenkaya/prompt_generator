"use client";

import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils/cn";
import { Bot, User } from "lucide-react";
import { parseWizardOptions } from "@/lib/utils/parse-wizard-options";
import { parsePromptBlocks } from "@/lib/utils/parse-prompt-blocks";
import { WizardOptionCards } from "./wizard-option-cards";
import { PromptOutput } from "./prompt-output";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  agentColor?: string;
  parts?: Array<{ type: string; [key: string]: unknown }>;
  onOptionSelect?: (text: string) => void;
  isLastAssistant?: boolean;
  isStreaming?: boolean;
}

export function ChatMessage({
  role,
  content,
  agentColor,
  parts,
  onOptionSelect,
  isLastAssistant,
  isStreaming,
}: ChatMessageProps) {
  const isUser = role === "user";

  const parsed = !isUser ? parseWizardOptions(content) : null;
  const showCards = parsed && !isStreaming;

  // Parse prompt/negative code fence blocks from assistant messages
  const promptBlocks = !isUser && !isStreaming ? parsePromptBlocks(content) : null;

  // Extract file/image parts from user messages
  const fileParts = parts?.filter((p) => p.type === "file") ?? [];
  const hasToolParts = parts?.some((p) => p.type === "tool-invocation") ?? false;

  return (
    <div className={cn("flex gap-3 py-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground",
          !isUser && agentColor
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>
      <div
        className={cn(
          "flex-1 space-y-2 overflow-hidden rounded-lg px-4 py-3 break-words",
          isUser
            ? "bg-primary/10 text-foreground max-w-[80%] ml-auto"
            : "bg-muted/50 max-w-[80%]"
        )}
      >
        {/* Image attachments from file parts */}
        {fileParts.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-2">
            {fileParts
              .filter((p) => typeof p.mediaType === "string" && (p.mediaType as string).startsWith("image/"))
              .map((p, i) => (
                <img
                  key={i}
                  src={p.url as string}
                  alt={`Image ${i + 1}`}
                  className="max-w-[200px] max-h-[200px] rounded-md object-cover"
                />
              ))}
          </div>
        )}
        {/* Tool invocation indicator */}
        {hasToolParts && isStreaming && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground py-1">
            <div className="h-3 w-3 rounded-full border-2 border-muted-foreground/40 border-t-transparent animate-spin" />
            <span>İlham arıyor...</span>
          </div>
        )}
        {content && content.trim() && (
          <>
            {promptBlocks ? (
              // Render parsed prompt blocks with PromptOutput component
              promptBlocks.segments.map((segment, i) =>
                segment.type === "text" ? (
                  <div key={i} className="prose prose-sm dark:prose-invert max-w-none overflow-hidden [&_pre]:overflow-x-auto [&_code]:break-all">
                    <ReactMarkdown>{segment.content}</ReactMarkdown>
                  </div>
                ) : (
                  <PromptOutput
                    key={i}
                    prompt={segment.prompt}
                    negativePrompt={segment.negativePrompt}
                  />
                )
              )
            ) : (
              // Default rendering: markdown + wizard option cards
              <>
                <div className="prose prose-sm dark:prose-invert max-w-none overflow-hidden [&_pre]:overflow-x-auto [&_code]:break-all">
                  <ReactMarkdown>
                    {showCards ? parsed.intro : content}
                  </ReactMarkdown>
                </div>
                {showCards && onOptionSelect && (
                  <WizardOptionCards
                    options={parsed.options}
                    onSelect={onOptionSelect}
                    disabled={!isLastAssistant}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
