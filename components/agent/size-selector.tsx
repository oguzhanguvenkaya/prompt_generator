"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

interface SizeOption {
  label: string;
  width: number;
  height: number;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  selected: string;
  onChange: (label: string) => void;
}

export function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  if (!sizes.length) return null;

  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
        Boyut
      </label>
      <div className="flex flex-wrap gap-1.5">
        {sizes.map((size) => (
          <Button
            key={size.label}
            variant={selected === size.label ? "default" : "outline"}
            size="sm"
            className={cn("text-xs h-7 gap-1", selected === size.label && "ring-1 ring-primary")}
            onClick={() => onChange(size.label)}
          >
            <SizeIcon ratio={size.label} />
            {size.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function SizeIcon({ ratio }: { ratio: string }) {
  const getAspect = () => {
    switch (ratio) {
      case "1:1": return { w: 10, h: 10 };
      case "16:9": return { w: 14, h: 8 };
      case "9:16": return { w: 8, h: 14 };
      case "4:3": return { w: 12, h: 9 };
      case "3:4": return { w: 9, h: 12 };
      default: return { w: 10, h: 10 };
    }
  };
  const { w, h } = getAspect();
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0">
      <rect
        x={(16 - w) / 2}
        y={(16 - h) / 2}
        width={w}
        height={h}
        rx="1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
