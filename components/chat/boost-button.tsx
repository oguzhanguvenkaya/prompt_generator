"use client";

import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface BoostButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isRunning?: boolean;
}

export function BoostButton({ onClick, disabled, isRunning }: BoostButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isRunning}
      variant="outline"
      size="sm"
      className="gap-1.5 border-amber-500/50 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950"
    >
      <Zap className={`h-3.5 w-3.5 ${isRunning ? "animate-pulse" : ""}`} />
      {isRunning ? "Boost ediliyor..." : "Boost"}
    </Button>
  );
}
