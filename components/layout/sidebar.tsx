"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus, Trash2, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Session {
  id: string;
  title: string;
  createdAt: string;
}

interface SidebarProps {
  sessions: Session[];
  currentSessionId: string | null;
  agentId: string;
  onNewSession: () => void;
  onDeleteSession?: (sessionId: string) => void;
}

export function Sidebar({ sessions, currentSessionId, agentId, onNewSession, onDeleteSession }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(true);

  if (collapsed) {
    return (
      <div className="w-10 border-r bg-muted/30 flex flex-col items-center py-2 gap-2 shrink-0">
        <button
          onClick={() => setCollapsed(false)}
          className="p-1.5 rounded-md hover:bg-accent transition-colors"
          title="Sohbet listesini aç"
        >
          <PanelLeftOpen className="h-4 w-4 text-muted-foreground" />
        </button>
        <button
          onClick={onNewSession}
          className="p-1.5 rounded-md hover:bg-accent transition-colors"
          title="Yeni Sohbet"
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-56 border-r bg-muted/30 flex flex-col shrink-0">
      <div className="p-2 border-b flex items-center gap-1.5">
        <Button onClick={onNewSession} variant="outline" size="sm" className="flex-1 gap-1.5 h-7 text-xs">
          <Plus className="h-3 w-3" />
          Yeni Sohbet
        </Button>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 rounded-md hover:bg-accent transition-colors shrink-0"
          title="Kapat"
        >
          <PanelLeftClose className="h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </div>
      <ScrollArea className="flex-1 p-1.5">
        <div className="space-y-0.5">
          {sessions.map((session) => (
            <div key={session.id} className="group relative">
              <Link href={`/agent/${agentId}?session=${session.id}`}>
                <div
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs hover:bg-accent transition-colors pr-7",
                    currentSessionId === session.id && "bg-accent"
                  )}
                >
                  <MessageSquare className="h-3 w-3 shrink-0 text-muted-foreground" />
                  <span className="truncate">{session.title || "Yeni sohbet"}</span>
                </div>
              </Link>
              {onDeleteSession && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDeleteSession(session.id);
                  }}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
                  title="Sohbeti sil"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
          {sessions.length === 0 && (
            <p className="text-[10px] text-muted-foreground text-center py-3">
              Henüz sohbet yok
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
