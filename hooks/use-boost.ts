"use client";

import { useState, useCallback } from "react";

interface BoostState {
  isRunning: boolean;
  currentIteration: number;
  maxIterations: number;
  currentScore: number | null;
  status: "idle" | "running" | "completed" | "error";
  results: Array<{
    iteration: number;
    score: number;
    revisedPrompt: string;
    feedback: string;
  }>;
}

export function useBoost() {
  const [state, setState] = useState<BoostState>({
    isRunning: false,
    currentIteration: 0,
    maxIterations: 3,
    currentScore: null,
    status: "idle",
    results: [],
  });

  const startBoost = useCallback(async (prompt: string, agentId: string, targetModel: string) => {
    setState((s) => ({ ...s, isRunning: true, status: "running", currentIteration: 0, results: [] }));

    try {
      const response = await fetch("/api/boost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, agentId, targetModel }),
      });

      if (!response.ok) throw new Error("Boost failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No stream");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === "iteration") {
                setState((s) => ({
                  ...s,
                  currentIteration: data.iteration,
                  currentScore: data.score,
                  results: [...s.results, {
                    iteration: data.iteration,
                    score: data.score,
                    revisedPrompt: data.revisedPrompt,
                    feedback: data.feedback,
                  }],
                }));
              } else if (data.type === "complete") {
                setState((s) => ({
                  ...s,
                  isRunning: false,
                  status: "completed",
                  currentScore: data.finalScore,
                }));
              }
            } catch {
              // skip invalid JSON
            }
          }
        }
      }
    } catch {
      setState((s) => ({ ...s, isRunning: false, status: "error" }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isRunning: false,
      currentIteration: 0,
      maxIterations: 3,
      currentScore: null,
      status: "idle",
      results: [],
    });
  }, []);

  return { ...state, startBoost, reset };
}
