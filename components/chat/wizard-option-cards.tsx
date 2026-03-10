"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { SendHorizonal } from "lucide-react";
import type { WizardOption } from "@/lib/utils/parse-wizard-options";

interface WizardOptionCardsProps {
  options: WizardOption[];
  onSelect: (optionText: string) => void;
  disabled?: boolean;
}

function isCustomOption(option: WizardOption): boolean {
  const lower = option.label.toLowerCase();
  return (
    lower.includes("kendi") ||
    lower.includes("serbest") ||
    lower.includes("diğer") ||
    lower.includes("other") ||
    lower.includes("✏️") ||
    lower.includes("✍️")
  );
}

export function WizardOptionCards({ options, onSelect, disabled }: WizardOptionCardsProps) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customText, setCustomText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (customOpen) {
      inputRef.current?.focus();
    }
  }, [customOpen]);

  const handleCustomSubmit = () => {
    const trimmed = customText.trim();
    if (!trimmed) return;
    onSelect(trimmed);
    setCustomText("");
    setCustomOpen(false);
  };

  return (
    <div className="grid gap-1.5 mt-2">
      {options.map((option) => {
        const isCustom = isCustomOption(option);

        if (isCustom && !disabled) {
          return (
            <div key={option.key}>
              <button
                disabled={disabled}
                onClick={() => setCustomOpen(!customOpen)}
                className={cn(
                  "flex items-start gap-3 w-full text-left rounded-lg border px-3 py-2 transition-all",
                  customOpen
                    ? "border-primary/50 bg-accent"
                    : "cursor-pointer border-border hover:border-primary/50 hover:bg-accent active:scale-[0.98]"
                )}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold bg-primary text-primary-foreground">
                  {option.key}
                </span>
                <div className="min-w-0">
                  <span className="font-medium text-sm">{option.label}</span>
                  {option.description && (
                    <p className="text-xs mt-0.5 text-muted-foreground">{option.description}</p>
                  )}
                </div>
              </button>
              {customOpen && (
                <div className="mt-1.5 flex gap-2 items-end pl-9">
                  <textarea
                    ref={inputRef}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleCustomSubmit();
                      }
                    }}
                    placeholder="Kendi fikrinizi yazın..."
                    className="flex-1 min-h-[38px] max-h-[100px] resize-none rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/50"
                    rows={1}
                  />
                  <button
                    onClick={handleCustomSubmit}
                    disabled={!customText.trim()}
                    className={cn(
                      "shrink-0 h-[38px] w-[38px] rounded-md flex items-center justify-center transition-colors",
                      customText.trim()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          );
        }

        return (
          <button
            key={option.key}
            disabled={disabled}
            onClick={() => onSelect(option.raw)}
            className={cn(
              "flex items-start gap-3 w-full text-left rounded-lg border px-3 py-2 transition-all",
              disabled
                ? "opacity-50 cursor-default border-border"
                : "cursor-pointer border-border hover:border-primary/50 hover:bg-accent active:scale-[0.98]"
            )}
          >
            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                disabled
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground"
              )}
            >
              {option.key}
            </span>
            <div className="min-w-0">
              <span className={cn("font-medium text-sm", disabled && "text-muted-foreground")}>
                {option.label}
              </span>
              {option.description && (
                <p className={cn("text-xs mt-0.5", disabled ? "text-muted-foreground/70" : "text-muted-foreground")}>
                  {option.description}
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
