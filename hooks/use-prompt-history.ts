"use client";

import { useState, useCallback } from "react";

interface PromptHistoryItem {
  id: string;
  prompt: string;
  agentId: string;
  targetModel: string;
  createdAt: Date;
}

export function usePromptHistory() {
  const [prompts, setPrompts] = useState<PromptHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addPrompt = useCallback((prompt: Omit<PromptHistoryItem, "id" | "createdAt">) => {
    const newPrompt: PromptHistoryItem = {
      ...prompt,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setPrompts((prev) => [newPrompt, ...prev]);
    return newPrompt;
  }, []);

  return { prompts, isLoading, addPrompt };
}
