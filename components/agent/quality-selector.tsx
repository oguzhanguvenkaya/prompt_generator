"use client";

import { SettingDropdown } from "@/components/ui/setting-dropdown";

interface QualityOption {
  label: string;
  value: string;
  costMultiplier?: number;
}

const qualityDescriptions: Record<string, string> = {
  clean: "Temiz, keskin detaylar, ticari kullanım",
  artistic: "Sanatsal dokunuş, yaratıcı ifade",
  standard: "Hızlı üretim, dengeli kalite",
  professional: "Profesyonel kalite, yüksek detay",
  high: "Yüksek çözünürlük, fazla detay",
  draft: "Hızlı taslak, düşük detay",
  ultra: "Maksimum çözünürlük (5MP+)",
  quality: "Yüksek kalite, yavaş üretim",
  fast: "Hızlı üretim, orta kalite",
  max: "En yüksek kalite ayarı",
  premium: "Premium kalite, en iyi sonuç",
  "300dpi": "Baskı kalitesi — 300 DPI çözünürlük",
  "480p": "SD çözünürlük — hızlı önizleme",
  "720p": "HD çözünürlük — orta kalite",
  "1080p": "Full HD — yüksek kalite",
};

interface QualitySelectorProps {
  options: QualityOption[];
  selected: string;
  onChange: (value: string) => void;
}

export function QualitySelector({ options, selected, onChange }: QualitySelectorProps) {
  if (!options.length) return null;

  return (
    <SettingDropdown
      label="Kalite"
      tooltip="Üretim kalitesi. Yüksek kalite = daha yavaş, daha detaylı."
      options={options.map((o) => ({
        label: o.label + (o.costMultiplier && o.costMultiplier > 1 ? ` (${o.costMultiplier}x)` : ""),
        value: o.value,
        description: qualityDescriptions[o.value] ?? "",
      }))}
      selected={selected}
      onChange={onChange}
    />
  );
}
