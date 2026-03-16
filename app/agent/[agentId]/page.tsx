"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatContainer } from "@/components/chat/chat-container";
import { QuickSettingsPanel } from "@/components/agent/quick-settings-panel";
import { useChatStore } from "@/lib/store/chat-store";
import type { AgentId, AgentCategory } from "@/lib/agents/types";
import { agentMetas } from "@/lib/agents/agent-meta";

interface SessionItem {
  id: string;
  title: string | null;
  createdAt: string;
}

export default function AgentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const agentId = params.agentId as string;
  const meta = agentMetas[agentId as AgentId];

  const sessionId = searchParams.get("session");
  const [sessions, setSessions] = useState<SessionItem[]>([]);
  const draftCounter = useRef(0);
  const pendingCreatedSessionIdRef = useRef<string | null>(null);
  const lastRouteSessionIdRef = useRef<string | null>(sessionId);
  const [chatKey, setChatKey] = useState(() =>
    sessionId ? `session-${sessionId}` : `draft-${draftCounter.current}`
  );

  // Fetch sessions from DB
  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch(`/api/sessions?agentId=${agentId}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch {
      // silently fail
    }
  }, [agentId]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Re-fetch sessions when tab becomes visible (instead of aggressive polling)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        fetchSessions();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Light polling only when tab is active — 30s interval
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchSessions();
      }
    }, 30000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      clearInterval(interval);
    };
  }, [fetchSessions]);

  // Only reset QuickSettings when the agent ACTUALLY changes, not on page refresh.
  // Persisted settings survive refresh; switching agents resets to defaults.
  useEffect(() => {
    if (!meta) return;
    const store = useChatStore.getState();
    if (store.lastAgentId === agentId) return; // Same agent — keep persisted settings
    store.resetQuickSettings();
    store.updateQuickSettings({ model: meta.defaultModel });
    store.setLastAgentId(agentId);
  }, [agentId, meta]);

  useEffect(() => {
    if (lastRouteSessionIdRef.current === sessionId) return;
    lastRouteSessionIdRef.current = sessionId;

    if (sessionId && pendingCreatedSessionIdRef.current === sessionId) {
      pendingCreatedSessionIdRef.current = null;
      return;
    }

    setChatKey(sessionId ? `session-${sessionId}` : `draft-${draftCounter.current}`);
  }, [sessionId]);

  // "Yeni Sohbet" just navigates to clean URL — no DB session created yet
  const handleNewSession = useCallback(() => {
    draftCounter.current += 1;
    pendingCreatedSessionIdRef.current = null;
    setChatKey(`draft-${draftCounter.current}`);
    router.push(`/agent/${agentId}`);
  }, [agentId, router]);

  // Called by ChatContainer when the first message creates a real session from a draft.
  // Update the URL, but keep the current ChatContainer instance alive so the active stream survives.
  const handleSessionCreated = useCallback((session: { id: string; title: string | null; createdAt: string }) => {
    pendingCreatedSessionIdRef.current = session.id;
    setSessions((prev) => {
      if (prev.some((item) => item.id === session.id)) return prev;
      return [session, ...prev];
    });
    window.history.replaceState(null, "", `/agent/${agentId}?session=${session.id}`);
  }, [agentId]);

  const handleDeleteSession = useCallback(async (id: string) => {
    try {
      await fetch(`/api/sessions/${id}`, { method: "DELETE" });
      setSessions((prev) => prev.filter((s) => s.id !== id));
      if (sessionId === id) {
        router.push(`/agent/${agentId}`);
      }
    } catch {
      // silently fail
    }
  }, [agentId, sessionId, router]);

  if (!meta) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Bilinmeyen ajan: {agentId}</p>
      </div>
    );
  }

  const Icon = meta.icon;

  return (
    <div className="flex flex-col h-full">
      {/* Agent info bar */}
      <div className="border-b bg-background px-4 py-2 flex items-center gap-3 shrink-0">
        <Icon className={`h-5 w-5 ${meta.color}`} />
        <h1 className="font-semibold">{meta.name}</h1>
        <span className="text-sm text-muted-foreground">— {getCategoryLabel(meta.category)} Prompt Uzmanı</span>
      </div>

      {/* Quick Settings */}
      <QuickSettingsPanel agentId={agentId as AgentId} category={meta.category} />

      {/* Session Sidebar + Chat */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          sessions={sessions.map((s) => ({
            id: s.id,
            title: s.title || "Yeni sohbet",
            createdAt: s.createdAt,
          }))}
          currentSessionId={sessionId}
          agentId={agentId}
          onNewSession={handleNewSession}
          onDeleteSession={handleDeleteSession}
        />
        <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
          <ChatContainer
            key={chatKey}
            agentId={agentId as AgentId}
            agentColor={meta.color}
            sessionId={sessionId ?? undefined}
            onSessionCreated={handleSessionCreated}
          />
        </div>
      </div>
    </div>
  );
}

function getCategoryLabel(category: AgentCategory): string {
  switch (category) {
    case "text": return "LLM & Metin";
    case "image": return "Görsel";
    case "video": return "Video";
  }
}
