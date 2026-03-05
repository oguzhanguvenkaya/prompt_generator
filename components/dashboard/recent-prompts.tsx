"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";

interface RecentPrompt {
  id: string;
  prompt: string;
  agentId: string;
  agentName: string;
  targetModel: string;
  isFavorite: boolean;
  createdAt: string;
}

interface RecentPromptsProps {
  prompts?: RecentPrompt[];
}

export function RecentPrompts({ prompts = [] }: RecentPromptsProps) {
  if (!prompts.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Son Promptlar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Henüz üretilmiş prompt yok. Bir ajanla sohbet başlatarak ilk promptunuzu üretin.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Son Promptlar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {prompts.map((p) => (
          <div
            key={p.id}
            className="flex items-start gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors"
          >
            {p.isFavorite && <Star className="h-3.5 w-3.5 text-yellow-500 fill-current shrink-0 mt-0.5" />}
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">&ldquo;{p.prompt}&rdquo;</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-[10px]">
                  {p.agentName}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {p.targetModel}
                </Badge>
                <span className="text-[10px] text-muted-foreground">{p.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
