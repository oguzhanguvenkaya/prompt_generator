"use client";

import { ModelSelector } from "@/components/chat/model-selector";
import { StylePresets } from "./style-presets";
import { SizeSelector } from "./size-selector";
import { QualitySelector } from "./quality-selector";
import { CameraSelector } from "./camera-selector";
import { Select } from "@/components/ui/select";
import { useChatStore } from "@/lib/store/chat-store";
import { models, getModelsByCategory } from "@/lib/ai/models";
import type { AgentId, AgentCategory } from "@/lib/agents/types";

// Default presets per model (client-side fallback)
// Grouped by platform — models within the same platform share similar UI presets
const modelPresets: Record<string, {
  sizes: { label: string; width: number; height: number }[];
  qualities: { label: string; value: string; costMultiplier?: number }[];
  styles: { label: string; value: string }[];
}> = {
  // ─── Recraft ──────────────────────────────────────────────────
  "recraft-v3": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "4:3", width: 1024, height: 768 },
      { label: "16:9", width: 1024, height: 576 },
      { label: "9:16", width: 576, height: 1024 },
    ],
    qualities: [
      { label: "Clean", value: "clean" },
      { label: "Artistic", value: "artistic" },
    ],
    styles: [
      { label: "Fotorealistik", value: "realistic_image" },
      { label: "Dijital Art", value: "digital_illustration" },
      { label: "Vektör/SVG", value: "vector_illustration" },
      { label: "İkon", value: "icon" },
      { label: "El Çizimi", value: "hand_drawn" },
      { label: "Pixel Art", value: "pixel_art" },
      { label: "Sticker", value: "sticker" },
      { label: "Doodle", value: "doodle" },
    ],
  },

  // ─── Lovart (Gen AI Studio — ortak boyut/kalite) ──────────────
  "lovart-nano-banana-pro": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "High", value: "high" },
      { label: "Draft", value: "draft" },
    ],
    styles: [
      { label: "Fotoğraf", value: "photograph" },
      { label: "Resim", value: "painting" },
      { label: "3D Render", value: "3d_render" },
      { label: "Sketch", value: "sketch" },
    ],
  },
  "lovart-seedream-5.0": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
      { label: "4K", width: 2048, height: 2048 },
    ],
    qualities: [
      { label: "High", value: "high" },
      { label: "Draft", value: "draft" },
      { label: "300 DPI", value: "300dpi" },
    ],
    styles: [
      { label: "Fotoğraf", value: "photograph" },
      { label: "Resim", value: "painting" },
      { label: "Ticari Fotoğraf", value: "commercial" },
      { label: "Metin Render", value: "text_render" },
    ],
  },
  "lovart-seedream-4.5": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "High", value: "high" },
      { label: "Draft", value: "draft" },
      { label: "300 DPI", value: "300dpi" },
    ],
    styles: [
      { label: "Fotoğraf", value: "photograph" },
      { label: "Resim", value: "painting" },
      { label: "3D Render", value: "3d_render" },
    ],
  },
  "lovart-flux-2": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1440, height: 810 },
      { label: "9:16", width: 810, height: 1440 },
    ],
    qualities: [
      { label: "High", value: "high" },
      { label: "Draft", value: "draft" },
    ],
    styles: [
      { label: "Fotoğraf", value: "photograph" },
      { label: "Art", value: "art" },
      { label: "Grafik Tasarım", value: "graphic" },
    ],
  },
  "lovart-gpt-image-1": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1792, height: 1024 },
      { label: "9:16", width: 1024, height: 1792 },
    ],
    qualities: [
      { label: "High", value: "high" },
      { label: "Standard", value: "standard" },
    ],
    styles: [],
  },
  "lovart-gemini-imagen-3": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "High", value: "high" },
      { label: "Standard", value: "standard" },
    ],
    styles: [],
  },

  // ─── Leonardo AI (Gen AI Studio) ─────────────────────────────
  "leonardo-phoenix": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1280, height: 720 },
      { label: "9:16", width: 720, height: 1280 },
      { label: "4:3", width: 1024, height: 768 },
    ],
    qualities: [
      { label: "Ultra (5MP+)", value: "ultra" },
      { label: "Quality", value: "quality" },
      { label: "Fast", value: "fast" },
    ],
    styles: [
      { label: "Sinematik", value: "CINEMATIC" },
      { label: "Dinamik", value: "DYNAMIC" },
      { label: "Canlı", value: "VIBRANT" },
      { label: "İllüstrasyon", value: "ILLUSTRATION" },
      { label: "Fotoğraf", value: "PHOTOGRAPHY" },
      { label: "Portre", value: "PORTRAIT" },
      { label: "HDR", value: "HDR" },
      { label: "Bokeh", value: "BOKEH" },
      { label: "Minimalist", value: "MINIMALIST" },
      { label: "3D Render", value: "RENDER_3D" },
    ],
  },
  "leonardo-lucid-origin": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "Quality", value: "quality" },
      { label: "Fast", value: "fast" },
    ],
    styles: [
      { label: "Sinematik", value: "CINEMATIC" },
      { label: "Dinamik", value: "DYNAMIC" },
      { label: "Yaratıcı", value: "CREATIVE" },
      { label: "Grafik Tasarım", value: "GRAPHIC_DESIGN" },
    ],
  },
  "leonardo-lucid-realism": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "Quality", value: "quality" },
      { label: "Fast", value: "fast" },
    ],
    styles: [
      { label: "Fotoğraf", value: "PHOTOGRAPHY" },
      { label: "Portre", value: "PORTRAIT" },
      { label: "Stok Fotoğraf", value: "STOCK_PHOTO" },
      { label: "Pro B&W", value: "PRO_BW" },
    ],
  },
  "leonardo-kino-xl": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "Quality", value: "quality" },
      { label: "Fast", value: "fast" },
    ],
    styles: [
      { label: "Sinematik", value: "CINEMATIC" },
      { label: "Film Noir", value: "FILM" },
      { label: "Kasvetli", value: "MOODY" },
      { label: "Retro", value: "RETRO" },
    ],
  },
  "leonardo-lightning-xl": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "Fast", value: "fast" },
    ],
    styles: [
      { label: "Dinamik", value: "DYNAMIC" },
      { label: "İllüstrasyon", value: "ILLUSTRATION" },
      { label: "Anime", value: "ANIME" },
    ],
  },
  "leonardo-vision-xl": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "Quality", value: "quality" },
      { label: "Fast", value: "fast" },
    ],
    styles: [
      { label: "Fotoğraf", value: "PHOTOGRAPHY" },
      { label: "Portre", value: "PORTRAIT" },
      { label: "Makro", value: "MACRO" },
      { label: "Bokeh", value: "BOKEH" },
    ],
  },
  "leonardo-anime-xl": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "Quality", value: "quality" },
      { label: "Fast", value: "fast" },
    ],
    styles: [
      { label: "Anime", value: "ANIME" },
      { label: "İllüstrasyon", value: "ILLUSTRATION" },
      { label: "Eskiz (Renkli)", value: "SKETCH_COLOR" },
    ],
  },
  "leonardo-flux-kontext": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "Quality", value: "quality" },
      { label: "Fast", value: "fast" },
    ],
    styles: [],
  },
  "leonardo-ideogram-3": {
    sizes: [
      { label: "1:1", width: 1024, height: 1024 },
      { label: "16:9", width: 1344, height: 768 },
      { label: "9:16", width: 768, height: 1344 },
    ],
    qualities: [
      { label: "Quality", value: "quality" },
      { label: "Fast", value: "fast" },
    ],
    styles: [
      { label: "Tipografi", value: "typography" },
      { label: "Grafik Tasarım", value: "graphic" },
    ],
  },

  // ─── Kling AI ─────────────────────────────────────────────────
  "kling-3.0": {
    sizes: [
      { label: "16:9 (4K)", width: 3840, height: 2160 },
      { label: "9:16 (4K)", width: 2160, height: 3840 },
      { label: "1:1 (4K)", width: 2160, height: 2160 },
    ],
    qualities: [
      { label: "Standard", value: "standard" },
      { label: "Professional", value: "professional" },
    ],
    styles: [],
  },
  "kling-2.6": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "9:16", width: 1080, height: 1920 },
      { label: "1:1", width: 1080, height: 1080 },
    ],
    qualities: [
      { label: "Standard", value: "standard", costMultiplier: 1 },
      { label: "Professional", value: "professional", costMultiplier: 1.65 },
    ],
    styles: [],
  },
  "kling-o1": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "9:16", width: 1080, height: 1920 },
      { label: "1:1", width: 1080, height: 1080 },
    ],
    qualities: [
      { label: "Standard", value: "standard" },
      { label: "Professional", value: "professional" },
    ],
    styles: [],
  },

  // ─── Higgsfield (Multi-model Studio) ──────────────────────────
  "higgsfield-sora-2": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "9:16", width: 1080, height: 1920 },
      { label: "1:1", width: 1080, height: 1080 },
    ],
    qualities: [
      { label: "Standard", value: "standard" },
      { label: "MAX", value: "max" },
    ],
    styles: [
      { label: "Gerçekçi", value: "realistic" },
      { label: "Sinematik", value: "cinematic" },
      { label: "Sanatsal", value: "artistic" },
    ],
  },
  "higgsfield-sora-2-max": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "9:16", width: 1080, height: 1920 },
    ],
    qualities: [
      { label: "MAX", value: "max" },
    ],
    styles: [
      { label: "Gerçekçi", value: "realistic" },
      { label: "Sinematik", value: "cinematic" },
    ],
  },
  "higgsfield-veo-3.1": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "9:16", width: 1080, height: 1920 },
    ],
    qualities: [
      { label: "Standard", value: "standard" },
      { label: "Premium", value: "premium" },
    ],
    styles: [
      { label: "Sinematik", value: "cinematic" },
      { label: "Gerçekçi", value: "realistic" },
      { label: "Animasyon", value: "animation" },
    ],
  },
  "higgsfield-wan-2.5": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "9:16", width: 1080, height: 1920 },
    ],
    qualities: [
      { label: "480p", value: "480p" },
      { label: "720p", value: "720p" },
      { label: "1080p", value: "1080p" },
    ],
    styles: [
      { label: "Sinematografi", value: "cinematography" },
      { label: "Karakter", value: "character" },
      { label: "Dans", value: "dance" },
    ],
  },
  "higgsfield-kling-2.6": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "9:16", width: 1080, height: 1920 },
      { label: "1:1", width: 1080, height: 1080 },
    ],
    qualities: [
      { label: "Standard", value: "standard" },
      { label: "Professional", value: "professional" },
    ],
    styles: [],
  },
  "higgsfield-minimax": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "9:16", width: 1080, height: 1920 },
    ],
    qualities: [
      { label: "Standard", value: "standard" },
    ],
    styles: [],
  },
};

const textFrameworks = [
  { label: "CO-STAR", value: "co-star" },
  { label: "RISEN", value: "risen" },
  { label: "Serbest", value: "freeform" },
];

const textOutputFormats = [
  { label: "Markdown", value: "markdown" },
  { label: "JSON", value: "json" },
  { label: "Düz Metin", value: "plain" },
  { label: "XML Tags", value: "xml" },
];

// Duration options vary by model — Kling 3.0 supports 3-15s
const durationOptionsByModel: Record<string, { label: string; value: string }[]> = {
  "kling-3.0": [
    { label: "3s", value: "3s" },
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
    { label: "15s", value: "15s" },
  ],
  "kling-2.6": [
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
  ],
  "kling-o1": [
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
  ],
  "higgsfield-veo-3.1": [
    { label: "4s", value: "4s" },
    { label: "6s", value: "6s" },
    { label: "8s", value: "8s" },
  ],
  "higgsfield-wan-2.5": [
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
  ],
};
const defaultDurationOptions = [
  { label: "5s", value: "5s" },
  { label: "10s", value: "10s" },
];

interface QuickSettingsPanelProps {
  agentId: AgentId;
  category: AgentCategory;
}

export function QuickSettingsPanel({ agentId, category }: QuickSettingsPanelProps) {
  const { quickSettings, updateQuickSettings } = useChatStore();
  const categoryModels = getModelsByCategory(category);

  const currentModel = quickSettings.model || categoryModels[0]?.id || "";
  const presets = modelPresets[currentModel];

  return (
    <div className="border-b bg-muted/30 p-4 space-y-3">
      {/* Row 1: Model + basic settings */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Model
          </label>
          <ModelSelector
            models={categoryModels.map((m) => ({
              id: m.id,
              name: m.name,
              platformLabel: m.platformLabel,
            }))}
            value={currentModel}
            onChange={(id) => updateQuickSettings({ model: id, style: "", size: "1:1", quality: "standard" })}
          />
        </div>

        {/* Text-specific: Framework + Output Format */}
        {category === "text" && (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Framework
              </label>
              <Select
                value={quickSettings.framework}
                onChange={(e) => updateQuickSettings({ framework: e.target.value })}
                options={textFrameworks}
                className="w-[140px]"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
                Çıktı Formatı
              </label>
              <Select
                value={quickSettings.outputFormat}
                onChange={(e) => updateQuickSettings({ outputFormat: e.target.value })}
                options={textOutputFormats}
                className="w-[140px]"
              />
            </div>
          </>
        )}

        {/* Image/Video: Size + Quality */}
        {presets?.sizes && (
          <SizeSelector
            sizes={presets.sizes}
            selected={quickSettings.size}
            onChange={(label) => updateQuickSettings({ size: label })}
          />
        )}

        {presets?.qualities && (
          <QualitySelector
            options={presets.qualities}
            selected={quickSettings.quality}
            onChange={(value) => updateQuickSettings({ quality: value })}
          />
        )}

        {/* Video: Duration */}
        {category === "video" && (
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
              Süre
            </label>
            <div className="flex gap-1.5">
              {(durationOptionsByModel[currentModel] || defaultDurationOptions).map((d) => (
                <button
                  key={d.value}
                  onClick={() => updateQuickSettings({ duration: d.value })}
                  className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                    quickSettings.duration === d.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-input hover:bg-accent"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Row 2: Style presets (image/video) */}
      {presets?.styles && presets.styles.length > 0 && (
        <StylePresets
          presets={presets.styles}
          selected={quickSettings.style}
          onChange={(value) => updateQuickSettings({ style: value })}
        />
      )}

      {/* Row 3: Camera (video only) */}
      {category === "video" && (
        <CameraSelector
          selected={quickSettings.cameraMovement}
          onChange={(value) => updateQuickSettings({ cameraMovement: value })}
        />
      )}
    </div>
  );
}
