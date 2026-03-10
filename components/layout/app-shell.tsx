"use client";

import { useEffect } from "react";
import { AppSidebar } from "./app-sidebar";
import { Header } from "./header";
import { useChatStore } from "@/lib/store/chat-store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const hydrateSidebar = useChatStore((state) => state.hydrateSidebar);

  useEffect(() => {
    hydrateSidebar();
  }, [hydrateSidebar]);

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
