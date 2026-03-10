"use client";

import { Select } from "@/components/ui/select";

interface ModelSelectorProps {
  models: { id: string; name: string; platformLabel: string }[];
  value: string;
  onChange: (modelId: string) => void;
}

export function ModelSelector({ models, value, onChange }: ModelSelectorProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={models.map((m) => ({
        label: m.name,
        value: m.id,
      }))}
      className="w-[260px]"
    />
  );
}
