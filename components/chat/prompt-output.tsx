"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check, Copy, Zap, Pencil, Star } from "lucide-react";

interface PromptOutputProps {
  prompt: string;
  negativePrompt?: string;
  onBoost?: () => void;
  onEdit?: () => void;
  onFavorite?: () => void;
  isFavorite?: boolean;
  boostScore?: number;
}

export function PromptOutput({
  prompt,
  negativePrompt,
  onBoost,
  onEdit,
  onFavorite,
  isFavorite,
  boostScore,
}: PromptOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="my-4 border-primary/20">
      <CardContent className="pt-4">
        <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          Üretilen Prompt
          {boostScore != null && (
            <span className="ml-2 text-primary">
              Skor: {(boostScore * 100).toFixed(0)}%
            </span>
          )}
        </div>
        <pre className="whitespace-pre-wrap text-sm bg-muted rounded-md p-3 font-mono">
          {prompt}
        </pre>
        {negativePrompt && (
          <>
            <div className="text-xs font-medium text-muted-foreground mt-3 mb-2 uppercase tracking-wider">
              Negatif Prompt
            </div>
            <pre className="whitespace-pre-wrap text-sm bg-muted rounded-md p-3 font-mono text-destructive">
              {negativePrompt}
            </pre>
          </>
        )}
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" onClick={handleCopy}>
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Kopyalandı" : "Kopyala"}
        </Button>
        {onBoost && (
          <Button variant="outline" size="sm" onClick={onBoost}>
            <Zap className="h-3 w-3" />
            Boost
          </Button>
        )}
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Pencil className="h-3 w-3" />
            Düzenle
          </Button>
        )}
        {onFavorite && (
          <Button variant="ghost" size="sm" onClick={onFavorite}>
            <Star className={`h-3 w-3 ${isFavorite ? "fill-current text-yellow-500" : ""}`} />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
