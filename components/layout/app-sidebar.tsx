"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useChatStore } from "@/lib/store/chat-store";
import {
  Sparkles,
  Home,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { agentList } from "@/lib/agents/agent-meta";

export function AppSidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useChatStore();

  return (
    <>
      {/* Mobile overlay */}
      {!sidebarCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <aside
      className={cn(
        "h-screen border-r bg-muted/30 flex flex-col shrink-0 transition-all duration-200 ease-in-out",
        "max-md:fixed max-md:z-40 max-md:shadow-lg",
        sidebarCollapsed
          ? "w-16 max-md:-translate-x-full"
          : "w-60"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-4 h-14 border-b shrink-0">
        <Sparkles className="h-5 w-5 text-primary shrink-0" />
        {!sidebarCollapsed && (
          <span className="font-semibold text-sm truncate">Prompt Generator</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {/* Home */}
        <Link href="/">
          <div
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors",
              pathname === "/" && "bg-accent font-medium"
            )}
            title="Dashboard"
          >
            <Home className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </div>
        </Link>

        {/* Separator */}
        <div className="pt-2 pb-1">
          {!sidebarCollapsed && (
            <span className="px-3 text-[10px] font-medium uppercase text-muted-foreground tracking-wider">
              Ajanlar
            </span>
          )}
        </div>

        {/* Agent links */}
        {agentList.map((agent) => {
          const isActive = pathname.startsWith(`/agent/${agent.id}`);
          const Icon = agent.icon;
          return (
            <Link key={agent.id} href={`/agent/${agent.id}`}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors",
                  isActive && `${agent.bgActive} font-medium`
                )}
                title={agent.name}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive ? agent.color : "text-muted-foreground")} />
                {!sidebarCollapsed && (
                  <div className="min-w-0">
                    <span className={cn("block truncate", isActive && agent.color)}>
                      {agent.name}
                    </span>
                    <span className="block text-[10px] text-muted-foreground truncate">
                      {agent.description}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t p-2 space-y-1 shrink-0">
        <Link href="/settings">
          <div
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent transition-colors",
              pathname === "/settings" && "bg-accent font-medium"
            )}
            title="Ayarlar"
          >
            <Settings className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Ayarlar</span>}
          </div>
        </Link>

        <div className="flex items-center gap-2 px-1">
          <ThemeToggle />
          {!sidebarCollapsed && (
            <span className="text-xs text-muted-foreground">Tema</span>
          )}
        </div>

        {/* Collapse toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleSidebar}
          className="w-full justify-center"
          title={sidebarCollapsed ? "Genişlet" : "Daralt"}
        >
          {sidebarCollapsed ? (
            <ChevronsRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronsLeft className="h-4 w-4" />
              <span className="ml-2 text-xs">Daralt</span>
            </>
          )}
        </Button>
      </div>
    </aside>
    </>
  );
}
