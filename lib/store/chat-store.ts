"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QuickSettings {
  model: string;
  size: string;
  quality: string;
  style: string;
  cameraMovement: string;
  duration: string;
  framework: string;
  outputFormat: string;
  // Advanced settings
  negativePrompt: string;
  seed: string;
  promptEnhance: boolean;
  // Domain filter for RAG retrieval
  domain: string;
  // Kling 3.0 creativity slider
  creativity: string;
}

interface ChatState {
  quickSettings: QuickSettings;
  sidebarCollapsed: boolean;
  // Track which agent the current quickSettings belong to
  lastAgentId: string;

  updateQuickSettings: (updates: Partial<QuickSettings>) => void;
  resetQuickSettings: () => void;
  setLastAgentId: (agentId: string) => void;
  hydrateSidebar: () => void;
  toggleSidebar: () => void;
}

const defaultQuickSettings: QuickSettings = {
  model: "",
  size: "1:1",
  quality: "standard",
  style: "",
  cameraMovement: "static",
  duration: "5s",
  framework: "co-star",
  outputFormat: "markdown",
  negativePrompt: "",
  seed: "",
  promptEnhance: false,
  domain: "general",
  creativity: "0.7",
};

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      quickSettings: { ...defaultQuickSettings },
      sidebarCollapsed: false,
      lastAgentId: "",

      updateQuickSettings: (updates) =>
        set((state) => ({
          quickSettings: { ...state.quickSettings, ...updates },
        })),

      resetQuickSettings: () =>
        set({ quickSettings: { ...defaultQuickSettings } }),

      setLastAgentId: (agentId: string) => set({ lastAgentId: agentId }),

      hydrateSidebar: () => {
        if (typeof window === "undefined") return;
        const stored = localStorage.getItem("sidebar-collapsed");
        if (stored == null) return;
        set({ sidebarCollapsed: stored === "true" });
      },

      toggleSidebar: () =>
        set((state) => {
          const next = !state.sidebarCollapsed;
          if (typeof window !== "undefined") {
            localStorage.setItem("sidebar-collapsed", String(next));
          }
          return { sidebarCollapsed: next };
        }),
    }),
    {
      name: "chat-quick-settings",
      // Only persist quickSettings and lastAgentId — sidebar has its own localStorage logic
      partialize: (state) => ({
        quickSettings: state.quickSettings,
        lastAgentId: state.lastAgentId,
      }),
    }
  )
);
