"use client";

import { Info } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

interface InfoTooltipProps {
  content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; placement: "top" | "bottom" } | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const updatePosition = useCallback(() => {
    if (!iconRef.current) return;
    const rect = iconRef.current.getBoundingClientRect();
    const tooltipHeight = 60; // approximate max height
    const tooltipWidth = 240;
    const gap = 6;

    // Default: above the icon
    let placement: "top" | "bottom" = "top";
    let top = rect.top - gap;
    let left = rect.left + rect.width / 2;

    // If not enough space above, go below
    if (rect.top < tooltipHeight + gap) {
      placement = "bottom";
      top = rect.bottom + gap;
    }

    // Clamp horizontal so tooltip doesn't overflow viewport
    const halfWidth = tooltipWidth / 2;
    if (left - halfWidth < 8) {
      left = halfWidth + 8;
    } else if (left + halfWidth > window.innerWidth - 8) {
      left = window.innerWidth - halfWidth - 8;
    }

    setCoords({ top, left, placement });
  }, []);

  const handleEnter = useCallback(() => {
    updatePosition();
    setShow(true);
  }, [updatePosition]);

  const handleLeave = useCallback(() => {
    setShow(false);
  }, []);

  // Update position on scroll/resize while visible
  useEffect(() => {
    if (!show) return;
    const update = () => updatePosition();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [show, updatePosition]);

  return (
    <>
      <span
        ref={iconRef}
        className="inline-flex items-center"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
      </span>
      {show && coords && createPortal(
        <span
          style={{
            position: "fixed",
            top: coords.placement === "top" ? coords.top : coords.top,
            left: coords.left,
            transform: coords.placement === "top"
              ? "translate(-50%, -100%)"
              : "translate(-50%, 0)",
          }}
          className="z-[9999] w-max max-w-[240px] rounded-md bg-popover text-popover-foreground shadow-lg border p-2 text-[11px] leading-snug animate-in fade-in zoom-in-95 duration-100"
        >
          {content}
        </span>,
        document.body
      )}
    </>
  );
}

interface SettingLabelProps {
  label: string;
  tooltip: string;
}

export function SettingLabel({ label, tooltip }: SettingLabelProps) {
  return (
    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
      {label}
      <InfoTooltip content={tooltip} />
    </label>
  );
}
