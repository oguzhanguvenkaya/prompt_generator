"use client";

import { create } from "zustand";

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

  updateQuickSettings: (updates: Partial<QuickSettings>) => void;
  resetQuickSettings: () => void;
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

function getInitialSidebarCollapsed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("sidebar-collapsed") === "true";
}

export const useChatStore = create<ChatState>((set) => ({
  quickSettings: { ...defaultQuickSettings },
  sidebarCollapsed: getInitialSidebarCollapsed(),

  updateQuickSettings: (updates) =>
    set((state) => ({
      quickSettings: { ...state.quickSettings, ...updates },
    })),

  resetQuickSettings: () =>
    set({ quickSettings: { ...defaultQuickSettings } }),

  toggleSidebar: () =>
    set((state) => {
      const next = !state.sidebarCollapsed;
      localStorage.setItem("sidebar-collapsed", String(next));
      return { sidebarCollapsed: next };
    }),
}));
