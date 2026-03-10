"use client";

import { SettingDropdown } from "@/components/ui/setting-dropdown";

const styleDescriptions: Record<string, string> = {
  realistic_image: "Gerçek fotoğraf kalitesinde, detaylı ve doğal",
  digital_illustration: "Dijital çizim, canlı renkler",
  vector_illustration: "Düz renkler, temiz çizgiler, SVG uyumlu",
  icon: "Minimal ikon tasarımı, app/web uyumlu",
  hand_drawn: "Elle çizilmiş, organik karakalem/suluboya",
  pixel_art: "Retro piksel tarzı, 8-bit/16-bit",
  sticker: "Kalın konturlu, renkli çıkartma tarzı",
  doodle: "Rahat karalama tarzı çizimler",
  photograph: "Fotoğrafik gerçekçilik, doğal ışık",
  painting: "Resim tarzı, fırça darbeleri",
  "3d_render": "3D render, hacimli ve gerçekçi malzeme",
  sketch: "Karakalem/kurşun eskiz tarzı",
  photorealistic: "Hipergerçekçi fotoğraf kalitesi",
  digital_art: "Dijital sanat, modern ve yaratıcı",
  text_render: "Metin içeren görseller için optimize",
  infographic: "Bilgi grafiği, veri odaklı görsel",
  commercial: "Ticari fotoğrafçılık, ürün/reklam odaklı",
  CINEMATIC: "Sinematik çekim, dramatik ışık",
  DYNAMIC: "Hareketli, enerjik kompozisyon",
  VIBRANT: "Canlı ve doygun renkler",
  ILLUSTRATION: "Klasik illüstrasyon, kitap/dergi kalitesi",
  PHOTOGRAPHY: "Profesyonel fotoğrafçılık",
  PORTRAIT: "Portre odaklı, bokeh arka plan",
  HDR: "Yüksek dinamik aralık, detay zenginliği",
  BOKEH: "Bulanık arka plan, odak belirgin",
  MINIMALIST: "Sade, çok boşluk, modern",
  RENDER_3D: "3D modelleme ve render",
  typography: "Tipografi odaklı tasarım",
  graphic: "Grafik tasarım, düzen odaklı",
  cinematic: "Sinematik video, film kalitesi",
  realistic: "Gerçekçi video, doğal hareket",
  documentary: "Belgesel tarzı, otantik",
  slow_motion: "Ağır çekim, detaylı hareket",
  artistic: "Sanatsal video, deneysel",
  animation: "Animasyon tarzı, çizgi film",
  cinematography: "Profesyonel sinematografi",
  character: "Karakter odaklı, insan hareketi",
  dance: "Dans ve hareket odaklı, ritmik",
  physics: "Fizik simülasyonu, gerçekçi sıvı/kumaş/duman hareketi",
  product: "Ürün tanıtım, profesyonel sunum",
};

interface StylePresetsProps {
  presets: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}

export function StylePresets({ presets, selected, onChange }: StylePresetsProps) {
  if (!presets.length) return null;

  return (
    <SettingDropdown
      label="Stil"
      tooltip="Modelin stil presetleri. Prompt'a stil yönlendirmesi ekler."
      options={presets.map((p) => ({
        label: p.label,
        value: p.value,
        description: styleDescriptions[p.value] ?? "",
      }))}
      selected={selected}
      onChange={onChange}
      displayValue={presets.find((p) => p.value === selected)?.label ?? "Seç..."}
    />
  );
}
