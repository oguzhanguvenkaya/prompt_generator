"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, AlertTriangle } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { cn } from "@/lib/utils/cn";

const cameraCategories = [
  {
    label: "Temel",
    presets: [
      { label: "Sabit Kamera", value: "static", description: "Sabit çekim, hareket yok" },
      { label: "Pan Sol", value: "pan-left", description: "Kamera sola yatay kayma" },
      { label: "Pan Sağ", value: "pan-right", description: "Kamera sağa yatay kayma" },
      { label: "Tilt Yukarı", value: "tilt-up", description: "Kamera yukarı dikey kayma" },
      { label: "Tilt Aşağı", value: "tilt-down", description: "Kamera aşağı dikey kayma" },
    ],
  },
  {
    label: "Dolly & Zoom",
    presets: [
      { label: "Dolly In", value: "dolly-in", description: "Kamera nesneye yaklaşır" },
      { label: "Dolly Out", value: "dolly-out", description: "Kamera nesneden uzaklaşır" },
      { label: "Zoom In", value: "zoom-in", description: "Optik yakınlaştırma" },
      { label: "Zoom Out", value: "zoom-out", description: "Optik uzaklaştırma" },
      { label: "Push In", value: "push-in", description: "Hızlı ileri hareket" },
      { label: "Pull Out", value: "pull-out", description: "Hızlı geri çekilme" },
    ],
  },
  {
    label: "Orbital & Arc",
    presets: [
      { label: "Orbit 360", value: "orbit-360", description: "Nesne etrafında tam tur" },
      { label: "Arc Sol", value: "arc-left", description: "Sola doğru yay çizerek" },
      { label: "Arc Sağ", value: "arc-right", description: "Sağa doğru yay çizerek" },
      { label: "Lazy Susan", value: "lazy-susan", description: "Yavaş döner tabla hareketi" },
    ],
  },
  {
    label: "Crane & Jib",
    presets: [
      { label: "Crane Up", value: "crane-up", description: "Vinç ile yukarı kalkış" },
      { label: "Crane Down", value: "crane-down", description: "Vinç ile aşağı iniş" },
      { label: "Jib Up", value: "jib-up", description: "Jib kolu ile yukarı" },
      { label: "Jib Down", value: "jib-down", description: "Jib kolu ile aşağı" },
    ],
  },
  {
    label: "Sinematik",
    presets: [
      { label: "FPV Drone", value: "fpv-drone", description: "Birinci şahıs drone uçuşu" },
      { label: "Aerial Pullback", value: "aerial-pullback", description: "Havadan geri çekilme" },
      { label: "Tracking Shot", value: "tracking", description: "Nesneyi takip eden çekim" },
      { label: "Handheld", value: "handheld", description: "El kamerası, doğal titreme" },
      { label: "Dutch Angle", value: "dutch-angle", description: "Eğik açı, gerilim hissi" },
      { label: "Whip Pan", value: "whip-pan", description: "Hızlı yatay döndürme" },
      { label: "Crash Zoom", value: "crash-zoom", description: "Ani dramatik yakınlaştırma" },
      { label: "POV", value: "pov", description: "Birinci şahıs bakış açısı" },
    ],
  },
  {
    label: "Gelişmiş Sinematik",
    presets: [
      { label: "Hitchcock Zoom", value: "hitchcock-zoom", description: "Dolly back + zoom in — vertigo efekti" },
      { label: "Speed Ramp", value: "speed-ramp", description: "Yavaş→hızlı→yavaş geçiş" },
      { label: "Barrel Roll", value: "barrel-roll", description: "Kamera kendi ekseni etrafında döner" },
      { label: "Circular Arc", value: "circular-arc", description: "Konu etrafında dairesel hareket" },
      { label: "Match Cut", value: "match-cut", description: "Benzer şekil/hareket ile sahne geçişi" },
      { label: "Rack Focus", value: "rack-focus", description: "Ön plan→arka plan odak geçişi" },
      { label: "Split Diopter", value: "split-diopter", description: "İki farklı derinlikte aynı anda odak" },
    ],
  },
];

const allPresets = cameraCategories.flatMap((c) => c.presets);

interface CameraSelectorProps {
  selected: string;
  onChange: (value: string) => void;
}

export function CameraSelector({ selected, onChange }: CameraSelectorProps) {
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

  const selectedPreset = allPresets.find((p) => p.value === selected);

  return (
    <div ref={ref} className="relative">
      <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
        Kamera Hareketi
        <InfoTooltip content="Kamera hareketi stili. Static = sabit. Pan = yatay. Dolly = ileri/geri. Orbit = etrafında dönme." />
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md border transition-colors",
            open ? "border-primary bg-accent" : "border-input bg-background hover:bg-accent"
          )}
        >
          <span className="truncate max-w-[140px]">{selectedPreset?.label ?? "Seç..."}</span>
          <ChevronDown className={cn("h-3 w-3 shrink-0 transition-transform", open && "rotate-180")} />
        </button>
        <span className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-3 w-3" />
          <span className="hidden sm:inline">Kamera + karakter hareketi aynı anda önerilmez</span>
        </span>
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 w-[260px] max-h-[320px] overflow-y-auto rounded-md border bg-popover shadow-lg py-1">
          {cameraCategories.map((cat) => (
            <div key={cat.label}>
              <div className="px-3 py-1 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                {cat.label}
              </div>
              {cat.presets.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-1.5 text-xs text-left hover:bg-accent transition-colors",
                    selected === opt.value && "bg-accent font-medium"
                  )}
                >
                  <span className="flex-1">{opt.label}</span>
                  {opt.description && <InfoTooltip content={opt.description} />}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
