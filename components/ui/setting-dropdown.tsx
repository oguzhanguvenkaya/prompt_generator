"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { InfoTooltip } from "./info-tooltip";
import { cn } from "@/lib/utils/cn";

export interface DropdownOption {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
}

interface SettingDropdownProps {
  label: string;
  tooltip: string;
  options: DropdownOption[];
  selected: string;
  onChange: (value: string) => void;
  displayValue?: string;
  /** Number of grid columns for the dropdown (default: 1 = list) */
  columns?: number;
}

export function SettingDropdown({ label, tooltip, options, selected, onChange, displayValue, columns = 1 }: SettingDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selectedOption = options.find((o) => o.value === selected);
  const display = displayValue ?? selectedOption?.label ?? label;
  const isGrid = columns > 1;

  return (
    <div ref={ref} className="relative">
      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
        {label}
        <InfoTooltip content={tooltip} />
      </label>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border transition-colors",
          open ? "border-primary bg-accent" : "border-input bg-background hover:bg-accent"
        )}
      >
        <span className="truncate max-w-[120px]">{display}</span>
        <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div
          className={cn(
            "absolute top-full left-0 mt-1 z-50 rounded-md border bg-popover shadow-lg",
            isGrid ? "p-1.5" : "min-w-[160px] max-h-[280px] overflow-y-auto py-1"
          )}
        >
          <div
            className={cn(isGrid && "grid gap-0.5")}
            style={isGrid ? { gridTemplateColumns: `repeat(${columns}, 1fr)` } : undefined}
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "text-xs hover:bg-accent transition-colors",
                  isGrid
                    ? "flex items-center justify-center rounded px-4 py-1.5 whitespace-nowrap"
                    : "flex items-center gap-2 w-full px-3 py-1.5 text-left",
                  selected === opt.value && "bg-accent font-medium"
                )}
              >
                {opt.icon}
                <span className={isGrid ? "" : "flex-1"}>{opt.label}</span>
                {opt.description && !isGrid && (
                  <InfoTooltip content={opt.description} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
