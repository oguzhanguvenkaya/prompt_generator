"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { ChatContainer } from "@/components/chat/chat-container";
import { QuickSettingsPanel } from "@/components/agent/quick-settings-panel";
import { useChatStore } from "@/lib/store/chat-store";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PenTool, Palette, Film } from "lucide-react";
import Link from "next/link";
import type { AgentId, AgentCategory } from "@/lib/agents/types";

const agentMeta: Record<string, { name: string; category: AgentCategory; icon: React.ElementType; color: string; defaultModel: string }> = {
  "text-craft": { name: "TextCraft", category: "text", icon: PenTool, color: "text-indigo-600", defaultModel: "claude-sonnet" },
  "pixel-forge": { name: "PixelForge", category: "image", icon: Palette, color: "text-pink-600", defaultModel: "recraft-v3" },
  "motion-lab": { name: "MotionLab", category: "video", icon: Film, color: "text-amber-600", defaultModel: "kling-2.6" },
};

export default function AgentPage() {
  const params = useParams();
  const agentId = params.agentId as string;
  const meta = agentMeta[agentId];
  const { sessions, currentSessionId, updateQuickSettings } = useChatStore();

  useEffect(() => {
    if (meta) {
      updateQuickSettings({ model: meta.defaultModel });
    }
  }, [agentId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Bilinmeyen ajan: {agentId}</p>
      </div>
    );
  }

  const Icon = meta.icon;
  const agentSessions = sessions.filter((s) => s.agentId === agentId);

  return (
    <div className="h-screen flex flex-col">
      {/* Agent Header */}
      <div className="border-b bg-background px-4 py-3 flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <Icon className={`h-5 w-5 ${meta.color}`} />
        <h1 className="font-semibold">{meta.name}</h1>
        <span className="text-sm text-muted-foreground">— {getCategoryLabel(meta.category)} Prompt Uzmanı</span>
      </div>

      {/* Quick Settings */}
      <QuickSettingsPanel agentId={agentId as AgentId} category={meta.category} />

      {/* Main Area: Sidebar + Chat */}
      <div className="flex flex-1 min-h-0">
        <Sidebar
          sessions={agentSessions.map((s) => ({
            id: s.id,
            title: s.title,
            createdAt: s.createdAt.toISOString(),
          }))}
          currentSessionId={currentSessionId}
          agentId={agentId}
          onNewSession={() => {}}
        />
        <div className="flex-1 flex flex-col min-h-0">
          <ChatContainer agentId={agentId as AgentId} />
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
