"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";
import type { ImageAttachment } from "./chat-input";
import type { AgentId } from "@/lib/agents/types";
import { buildMessageParts } from "@/lib/chat/message-parts";
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
  const initialSessionIdRef = useRef(sessionId);

  // Stable chat ID — never changes after mount.
  const chatId = useRef(sessionId ?? `draft-${agentId}`);

  // Ref always holds the latest sessionId — read by transport at request time.
  const sessionIdRef = useRef(activeSessionId);
  sessionIdRef.current = activeSessionId;

  // Ref for settings — avoids transport recreation on every settings change
  const quickSettingsRef = useRef(quickSettings);
  quickSettingsRef.current = quickSettings;

  // Ref for onSessionCreated callback — avoids stale closure in transport
  const onSessionCreatedRef = useRef(onSessionCreated);
  onSessionCreatedRef.current = onSessionCreated;

  // Session creation promise — shared between handleSubmit and transport fetch.
  // sendMessage is called IMMEDIATELY (optimistic UI), transport fetch awaits this
  // promise to ensure sessionId is available before the HTTP request fires.
  const sessionPromiseRef = useRef<Promise<string | null> | null>(null);

  const createSession = useCallback((): Promise<string | null> => {
    // Already have a session
    if (sessionIdRef.current) return Promise.resolve(sessionIdRef.current);
    // Session creation already in progress — return existing promise
    if (sessionPromiseRef.current) return sessionPromiseRef.current;

    sessionPromiseRef.current = (async () => {
      try {
        const res = await fetch("/api/sessions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ agentId, targetModel: quickSettingsRef.current.model }),
        });
        if (!res.ok) return null;
        const session = await res.json();
        sessionIdRef.current = session.id;
        setActiveSessionId(session.id);
        onSessionCreatedRef.current?.(session);
        return session.id;
      } catch {
        return null;
      } finally {
        sessionPromiseRef.current = null;
      }
    })();

    return sessionPromiseRef.current;
  }, [agentId]);

  // Transport — only recreates when agentId changes.
  // Request preparation awaits session creation before the HTTP request fires.
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: async ({ id, messages, body, trigger, messageId }) => {
          if (sessionPromiseRef.current) {
            await sessionPromiseRef.current;
          }

          return {
            body: {
              ...body,
              id,
              messages,
              trigger,
              messageId,
              sessionId: sessionIdRef.current,
              agentId,
              targetModel: quickSettingsRef.current.model,
              quickSettings: quickSettingsRef.current,
            },
          };
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

  // Debug: log status and message changes to diagnose stream rendering issues
  useEffect(() => {
    console.log("[ChatContainer] status=%s messages=%d chatId=%s", status, messages.length, chatId.current);
  }, [status, messages.length]);

  // Load message history once on mount — only for sessions that existed at mount time.
  useEffect(() => {
    const historySessionId = initialSessionIdRef.current;
    if (!historySessionId || historyLoaded.current) return;
    historyLoaded.current = true;
    setLoadingHistory(true);
    fetch(`/api/sessions/${historySessionId}/messages`)
      .then((res) => res.json())
      .then((dbMessages: Array<{ id: string; role: string; content: string; attachments?: unknown[] }>) => {
        const msgs: UIMessage[] = dbMessages.map((m) => ({
          id: m.id,
          role: m.role as UIMessage["role"],
          parts: buildMessageParts(m.content, m.attachments),
        }));
        if (msgs.length > 0) {
          setMessages(msgs);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingHistory(false));
  }, [setMessages]);

  // Send message: trigger session creation (non-blocking) then sendMessage immediately.
  // The optimistic user message (text + files) appears in UI instantly.
  // Transport request preparation will await session creation before firing the HTTP request.
  const handleSubmit = useCallback((content: string, images?: ImageAttachment[]) => {
    // Kick off session creation if needed (don't await — let transport handle it)
    if (!sessionIdRef.current) {
      createSession();
    }

    // Send IMMEDIATELY — optimistic message appears in UI with text + images
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
  }, [createSession, sendMessage]);

  const handleOptionSelect = useCallback((text: string) => {
    if (!sessionIdRef.current) {
      createSession();
    }
    sendMessage({ text });
  }, [createSession, sendMessage]);

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
