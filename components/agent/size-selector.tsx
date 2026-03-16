"use client";

import { SettingDropdown } from "@/components/ui/setting-dropdown";

interface SizeOption {
  label: string;
  width: number;
  height: number;
}

const sizeDescriptions: Record<string, string> = {
  "16:9": "Geniş ekran — YouTube, sinema, kapak",
  "4:3": "Klasik oran — sunum, web banner",
  "5:4": "Hafif yatay — fotoğraf baskı",
  "1:1": "Kare format — Instagram, profil fotoğrafı",
  "4:5": "Hafif dikey — Instagram portre",
  "3:4": "Dikey klasik — Pinterest, poster",
  "9:16": "Dikey — TikTok, Reels, Stories",
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
      columns={2}
    />
  );
}
