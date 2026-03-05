"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface BoostProgressProps {
  currentIteration: number;
  maxIterations: number;
  currentScore?: number;
  status: "running" | "completed" | "error";
}

export function BoostProgress({
  currentIteration,
  maxIterations,
  currentScore,
  status,
}: BoostProgressProps) {
  const progress = (currentIteration / maxIterations) * 100;

  return (
    <Card className="my-4 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className={`h-4 w-4 text-amber-600 ${status === "running" ? "animate-pulse" : ""}`} />
          <span className="text-sm font-medium">
            Boost — İterasyon {currentIteration}/{maxIterations}
          </span>
          {currentScore != null && (
            <span className="text-xs text-muted-foreground ml-auto">
              Skor: {(currentScore * 100).toFixed(0)}%
            </span>
          )}
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {status === "completed" && (
          <p className="text-xs text-green-600 mt-2">Boost tamamlandı!</p>
        )}
        {status === "error" && (
          <p className="text-xs text-destructive mt-2">Boost sırasında hata oluştu.</p>
        )}
      </CardContent>
    </Card>
  );
}
