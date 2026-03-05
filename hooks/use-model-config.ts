"use client";

import { useMemo } from "react";
import { getModelById } from "@/lib/ai/models";

export function useModelConfig(modelId: string) {
  const model = useMemo(() => getModelById(modelId), [modelId]);
  return model;
}
