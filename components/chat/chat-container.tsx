"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";
import type { ImageAttachment } from "./chat-input";
import type { AgentId } from "@/lib/agents/types";
import { useChatStore } from "@/lib/store/chat-store";

interface ChatContainerProps {
  agentId: AgentId;
  agentColor?: string;
  sessionId?: string;
  onSessionCreated?: (session: { id: string; title: string | null; createdAt: string }) => void;
}

export function ChatContainer({ agentId, agentColor, sessionId, onSessionCreated }: ChatContainerProps) {
  const { quickSettings } = useChatStore();
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [activeSessionId, setActiveSessionId] = useState(sessionId);
  const historyLoaded = useRef(false);
  const creatingSession = useRef(false);

  // Stable chat ID — never changes after mount. This prevents useChat from
  // resetting messages when activeSessionId changes (draft → real session).
  const chatId = useRef(sessionId ?? `draft-${Date.now()}`);

  // Ref always holds the latest sessionId — read by custom fetch at request time.
  const sessionIdRef = useRef(activeSessionId);
  sessionIdRef.current = activeSessionId;

  // Ref for settings — avoids transport recreation on every settings change
  const quickSettingsRef = useRef(quickSettings);
  quickSettingsRef.current = quickSettings;

  // Transport only recreates when agentId changes — settings injected via ref at request time
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        fetch: async (url, options) => {
          if (options?.body && typeof options.body === "string") {
            try {
              const body = JSON.parse(options.body);
              body.sessionId = sessionIdRef.current;
              body.agentId = agentId;
              body.targetModel = quickSettingsRef.current.model;
              body.quickSettings = quickSettingsRef.current;
              return globalThis.fetch(url, { ...options, body: JSON.stringify(body) });
            } catch {
              // fallback — send as-is
            }
          }
          return globalThis.fetch(url, options);
        },
      }),
    [agentId]
  );

  const { messages, status, sendMessage, setMessages } = useChat({
    id: chatId.current,
    transport,
    onError(error) {
      console.error("[ChatContainer] Stream error:", error.message);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Load message history once on mount (only if session exists)
  useEffect(() => {
    if (!activeSessionId || historyLoaded.current) return;
    historyLoaded.current = true;
    setLoadingHistory(true);
    fetch(`/api/sessions/${activeSessionId}/messages`)
      .then((res) => res.json())
      .then((dbMessages: Array<{ id: string; role: string; content: string; attachments?: unknown[] }>) => {
        const msgs: UIMessage[] = dbMessages.map((m) => ({
          id: m.id,
          role: m.role as UIMessage["role"],
          parts: [{ type: "text" as const, text: m.content }],
        }));
        if (msgs.length > 0) {
          setMessages(msgs);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingHistory(false));
  }, [activeSessionId, setMessages]);

  // Create session lazily on first message
  const ensureSession = useCallback(async (): Promise<string | null> => {
    if (activeSessionId) return activeSessionId;
    if (creatingSession.current) return null;
    creatingSession.current = true;
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, targetModel: quickSettings.model }),
      });
      if (!res.ok) return null;
      const session = await res.json();
      // Update both ref (immediate) and state (triggers re-render)
      sessionIdRef.current = session.id;
      setActiveSessionId(session.id);
      onSessionCreated?.(session);
      return session.id;
    } catch {
      return null;
    } finally {
      creatingSession.current = false;
    }
  }, [activeSessionId, agentId, quickSettings.model, onSessionCreated]);

  const handleSubmit = async (content: string, images?: ImageAttachment[]) => {
    const sid = await ensureSession();
    if (!sid) return;

    // sendMessage immediately — custom fetch reads sessionIdRef.current
    // which is already set (no need to wait for React re-render)
    if (images && images.length > 0) {
      const files = images.map((img) => ({
        type: "file" as const,
        mediaType: img.file.type,
        url: img.base64,
      }));
      sendMessage({ text: content, files });
    } else {
      sendMessage({ text: content });
    }
  };

  const handleOptionSelect = async (text: string) => {
    const sid = await ensureSession();
    if (!sid) return;
    sendMessage({ text });
  };

  const allowImages = agentId === "pixel-forge" || agentId === "motion-lab";

  if (loadingHistory) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
        <p className="text-sm text-muted-foreground mt-2">Sohbet yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        agentColor={agentColor}
        onOptionSelect={handleOptionSelect}
      />
      <ChatInput
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={getPlaceholder(agentId)}
        allowImages={allowImages}
      />
    </div>
  );
}

function getPlaceholder(agentId: AgentId): string {
  switch (agentId) {
    case "text-craft":
      return "Ne tür bir metin/prompt üretmek istiyorsunuz?";
    case "pixel-forge":
      return "Nasıl bir görsel oluşturmak istiyorsunuz? (Referans görsel de ekleyebilirsiniz)";
    case "motion-lab":
      return "Nasıl bir video oluşturmak istiyorsunuz? (Referans görsel/kare ekleyebilirsiniz)";
    default:
      return "Mesajınızı yazın...";
  }
}
