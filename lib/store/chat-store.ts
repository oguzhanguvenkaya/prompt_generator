"use client";

import { create } from "zustand";
import type { AgentId } from "@/lib/agents/types";

interface ChatSession {
  id: string;
  agentId: AgentId;
  targetModel: string;
  title: string;
  createdAt: Date;
}

interface QuickSettings {
  model: string;
  size: string;
  quality: string;
  style: string;
  cameraMovement: string;
  duration: string;
  framework: string;
  outputFormat: string;
}

interface ChatState {
  currentSessionId: string | null;
  sessions: ChatSession[];
  quickSettings: QuickSettings;

  setCurrentSession: (id: string | null) => void;
  addSession: (session: ChatSession) => void;
  updateQuickSettings: (updates: Partial<QuickSettings>) => void;
  resetQuickSettings: () => void;
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
};

export const useChatStore = create<ChatState>((set) => ({
  currentSessionId: null,
  sessions: [],
  quickSettings: { ...defaultQuickSettings },

  setCurrentSession: (id) => set({ currentSessionId: id }),

  addSession: (session) =>
    set((state) => ({ sessions: [session, ...state.sessions] })),

  updateQuickSettings: (updates) =>
    set((state) => ({
      quickSettings: { ...state.quickSettings, ...updates },
    })),

  resetQuickSettings: () =>
    set({ quickSettings: { ...defaultQuickSettings } }),
}));
