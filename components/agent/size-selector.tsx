"use client";

import { SettingDropdown } from "@/components/ui/setting-dropdown";

interface SizeOption {
  label: string;
  width: number;
  height: number;
}

const sizeDescriptions: Record<string, string> = {
  "1:1": "Kare format — Instagram, profil fotoğrafı",
  "4:3": "Klasik oran — sunum, web banner",
  "16:9": "Geniş ekran — YouTube, sinema, kapak",
  "9:16": "Dikey — TikTok, Reels, Stories",
  "3:2": "Fotoğraf oranı — baskı, poster",
};

interface SizeSelectorProps {
  sizes: SizeOption[];
  selected: string;
  onChange: (label: string) => void;
}

export function SizeSelector({ sizes, selected, onChange }: SizeSelectorProps) {
  if (!sizes.length) return null;

  return (
    <SettingDropdown
      label="Boyut"
      tooltip="Görsel/video en-boy oranı. Platforma göre seç."
      options={sizes.map((s) => ({
        label: s.label,
        value: s.label,
        description: sizeDescriptions[s.label.split(" ")[0]] ?? `${s.width}×${s.height}`,
      }))}
      selected={selected}
      onChange={onChange}
    />
  );
}
