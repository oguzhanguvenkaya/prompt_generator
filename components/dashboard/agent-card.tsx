"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, Palette, Film, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { AgentId } from "@/lib/agents/types";

const iconMap = {
  "pen-tool": PenTool,
  "palette": Palette,
  "film": Film,
};

interface AgentCardProps {
  id: AgentId;
  name: string;
  description: string;
  icon: string;
  color: string;
  models: string[];
  lastPrompt?: string;
}

export function AgentCard({
  id,
  name,
  description,
  icon,
  color,
  models,
  lastPrompt,
}: AgentCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap] || PenTool;

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              color === "textcraft" && "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
              color === "pixelforge" && "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
              color === "motionlab" && "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-xs text-muted-foreground">{models.join(", ")}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {lastPrompt && (
          <p className="text-xs text-muted-foreground mt-3 truncate italic">
            Son: &ldquo;{lastPrompt}&rdquo;
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/agent/${id}`} className="w-full">
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Sohbete Başla
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
