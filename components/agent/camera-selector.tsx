"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { AlertTriangle } from "lucide-react";

const cameraOptions = [
  { label: "Sabit Kamera", value: "static", icon: "📷", recommended: true },
  { label: "Yavaş Pan", value: "slow-pan", icon: "↔️" },
  { label: "Dolly In/Out", value: "dolly", icon: "↕️" },
  { label: "Tracking", value: "tracking", icon: "🎯" },
  { label: "Crane Up/Down", value: "crane", icon: "⬆️" },
  { label: "FPV Drone", value: "fpv-drone", icon: "🚁" },
  { label: "Orbit 360", value: "orbit", icon: "🔄" },
];

interface CameraSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

export function CameraSelector({ selected, onChange }: CameraSelectorProps) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
        Kamera Hareketi
      </label>
      <div className="flex flex-wrap gap-1.5">
        {cameraOptions.map((opt) => (
          <Button
            key={opt.value}
            variant={selected === opt.value ? "default" : "outline"}
            size="sm"
            className={cn(
              "text-xs h-7",
              selected === opt.value && "ring-1 ring-primary",
              opt.recommended && selected !== opt.value && "border-green-500/30"
            )}
            onClick={() => onChange(opt.value)}
          >
            <span className="mr-1">{opt.icon}</span>
            {opt.label}
            {opt.recommended && <span className="ml-1 text-[10px]">★</span>}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600 dark:text-amber-400">
        <AlertTriangle className="h-3 w-3" />
        <span>Kamera + karakter hareketi aynı anda önerilmez</span>
      </div>
    </div>
  );
}
