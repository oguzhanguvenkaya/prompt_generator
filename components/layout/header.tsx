"use client";

import { usePathname } from "next/navigation";
import { useChatStore } from "@/lib/store/chat-store";
import { Button } from "@/components/ui/button";
import { Menu, Home } from "lucide-react";
import { agentMetas } from "@/lib/agents/agent-meta";
import type { AgentId } from "@/lib/agents/types";

export function Header() {
  const pathname = usePathname();
  const toggleSidebar = useChatStore((s) => s.toggleSidebar);

  const agentPath = pathname.match(/^\/agent\/(.+?)(?:\?|$)/)?.[1];
  const agentInfo = agentPath ? agentMetas[agentPath as AgentId] : null;
  const info = agentInfo
    ? { label: agentInfo.name, icon: agentInfo.icon }
    : pathname === "/"
      ? { label: "Dashboard", icon: Home }
      : { label: "Prompt Generator", icon: Home };
  const Icon = info.icon;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
      <div className="flex h-12 items-center px-4 gap-3">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Page title / breadcrumb */}
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{info.label}</span>
        </div>

        <div className="flex-1" />
      </div>
    </header>
  );
}
