"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Plus } from "lucide-react";
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
}

export function Sidebar({ sessions, currentSessionId, agentId, onNewSession }: SidebarProps) {
  return (
    <div className="w-60 border-r bg-muted/30 flex flex-col h-full">
      <div className="p-3 border-b">
        <Button onClick={onNewSession} variant="outline" size="sm" className="w-full gap-1.5">
          <Plus className="h-3.5 w-3.5" />
          Yeni Sohbet
        </Button>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/agent/${agentId}?session=${session.id}`}
            >
              <div
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors",
                  currentSessionId === session.id && "bg-accent"
                )}
              >
                <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">{session.title || "Yeni sohbet"}</span>
              </div>
            </Link>
          ))}
          {sessions.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              Henüz sohbet yok
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
