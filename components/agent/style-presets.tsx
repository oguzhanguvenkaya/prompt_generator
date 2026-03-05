"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface StylePresetsProps {
  presets: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export function StylePresets({ presets, selected, onChange }: StylePresetsProps) {
  if (!presets.length) return null;

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
        Stil
      </label>
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset) => (
          <Button
            key={preset.value}
            variant={selected === preset.value ? "default" : "outline"}
            size="sm"
            className={cn(
              "text-xs h-7",
              selected === preset.value && "ring-1 ring-primary"
            )}
            onClick={() => onChange(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
