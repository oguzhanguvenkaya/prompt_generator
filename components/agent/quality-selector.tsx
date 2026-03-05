"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface QualityOption {
  label: string;
  value: string;
  costMultiplier?: number;
}

interface QualitySelectorProps {
  options: QualityOption[];
  selected: string;
  onChange: (value: string) => void;
}

export function QualitySelector({ options, selected, onChange }: QualitySelectorProps) {
  if (!options.length) return null;

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
        Kalite
      </label>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <Button
            key={opt.value}
            variant={selected === opt.value ? "default" : "outline"}
            size="sm"
            className={cn("text-xs h-7", selected === opt.value && "ring-1 ring-primary")}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
            {opt.costMultiplier && opt.costMultiplier > 1 && (
              <span className="ml-1 text-[10px] opacity-60">
                {opt.costMultiplier}x
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
