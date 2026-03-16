"use client";

import { useState } from "react";
import { ModelSelector } from "@/components/chat/model-selector";
import { StylePresets } from "./style-presets";
import { SizeSelector } from "./size-selector";
import { QualitySelector } from "./quality-selector";
import { CameraSelector } from "./camera-selector";
import { Select } from "@/components/ui/select";
import { useChatStore } from "@/lib/store/chat-store";
import { getModelsByCategory } from "@/lib/ai/models";
import type { AgentId, AgentCategory } from "@/lib/agents/types";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { SettingLabel } from "@/components/ui/info-tooltip";
import { SettingDropdown } from "@/components/ui/setting-dropdown";

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
      { label: "16:9", width: 1024, height: 576 },
      { label: "4:3", width: 1024, height: 768 },
      { label: "5:4", width: 1024, height: 819 },
      { label: "1:1", width: 1024, height: 1024 },
      { label: "4:5", width: 819, height: 1024 },
      { label: "3:4", width: 768, height: 1024 },
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
      { label: "16:9", width: 1344, height: 768 },
      { label: "4:3", width: 1152, height: 896 },
      { label: "1:1", width: 1024, height: 1024 },
      { label: "3:4", width: 896, height: 1152 },
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
      { label: "16:9", width: 1344, height: 768 },
      { label: "4:3", width: 1152, height: 896 },
      { label: "1:1", width: 1024, height: 1024 },
      { label: "3:4", width: 896, height: 1152 },
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
  "lovart-flux-2": {
    sizes: [
      { label: "16:9", width: 1440, height: 810 },
      { label: "4:3", width: 1152, height: 864 },
      { label: "1:1", width: 1024, height: 1024 },
      { label: "3:4", width: 864, height: 1152 },
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
      { label: "16:9", width: 1792, height: 1024 },
      { label: "4:3", width: 1344, height: 1024 },
      { label: "1:1", width: 1024, height: 1024 },
      { label: "3:4", width: 1024, height: 1344 },
      { label: "9:16", width: 1024, height: 1792 },
    ],
    qualities: [
      { label: "High", value: "high" },
      { label: "Standard", value: "standard" },
    ],
    styles: [
      { label: "Fotorealistik", value: "photorealistic" },
      { label: "Dijital Art", value: "digital_art" },
      { label: "Metin Iceren", value: "text_render" },
      { label: "Infografik", value: "infographic" },
    ],
  },
  // ─── Leonardo AI ─────────────────────────────────────────────
  "leonardo-phoenix": {
    sizes: [
      { label: "16:9", width: 1280, height: 720 },
      { label: "4:3", width: 1024, height: 768 },
      { label: "5:4", width: 1024, height: 819 },
      { label: "1:1", width: 1024, height: 1024 },
      { label: "4:5", width: 819, height: 1024 },
      { label: "3:4", width: 768, height: 1024 },
      { label: "9:16", width: 720, height: 1280 },
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
  "leonardo-ideogram-3": {
    sizes: [
      { label: "16:9", width: 1344, height: 768 },
      { label: "4:3", width: 1152, height: 896 },
      { label: "1:1", width: 1024, height: 1024 },
      { label: "3:4", width: 896, height: 1152 },
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
      { label: "4:3 (4K)", width: 2880, height: 2160 },
      { label: "1:1 (4K)", width: 2160, height: 2160 },
      { label: "3:4 (4K)", width: 2160, height: 2880 },
      { label: "9:16 (4K)", width: 2160, height: 3840 },
    ],
    qualities: [
      { label: "Standard", value: "standard" },
      { label: "Professional", value: "professional" },
    ],
    styles: [
      { label: "Sinematik", value: "cinematic" },
      { label: "Gercekci", value: "realistic" },
      { label: "Belgesel", value: "documentary" },
      { label: "Slow Motion", value: "slow_motion" },
    ],
  },
  // ─── Higgsfield ──────────────────────────────────────────────
  "higgsfield-sora-2": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "4:3", width: 1440, height: 1080 },
      { label: "1:1", width: 1080, height: 1080 },
      { label: "3:4", width: 1080, height: 1440 },
      { label: "9:16", width: 1080, height: 1920 },
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
  "higgsfield-veo-3.1": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "4:3", width: 1440, height: 1080 },
      { label: "1:1", width: 1080, height: 1080 },
      { label: "3:4", width: 1080, height: 1440 },
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
      { label: "4:3", width: 1440, height: 1080 },
      { label: "1:1", width: 1080, height: 1080 },
      { label: "3:4", width: 1080, height: 1440 },
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
  // ─── ByteDance ──────────────────────────────────────────────
  "seedance-2.0": {
    sizes: [
      { label: "16:9", width: 1920, height: 1080 },
      { label: "4:3", width: 1440, height: 1080 },
      { label: "1:1", width: 1080, height: 1080 },
      { label: "3:4", width: 1080, height: 1440 },
      { label: "9:16", width: 1080, height: 1920 },
    ],
    qualities: [
      { label: "Standard", value: "standard" },
      { label: "High", value: "high" },
    ],
    styles: [
      { label: "Sinematik", value: "cinematic" },
      { label: "Fizik Simülasyon", value: "physics" },
      { label: "Karakter Odaklı", value: "character" },
      { label: "Ürün", value: "product" },
    ],
  },
};

const domainOptions = [
  { label: "Genel", value: "general" },
  { label: "Branding", value: "branding" },
  { label: "E-Ticaret", value: "e-commerce" },
  { label: "Illüstrasyon", value: "illustration" },
  { label: "UI Tasarım", value: "ui-design" },
  { label: "Fotoğrafçılık", value: "photography" },
  { label: "Sosyal Medya", value: "social-media" },
];

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
  "higgsfield-sora-2": [
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
  ],
  "higgsfield-veo-3.1": [
    { label: "4s", value: "4s" },
    { label: "6s", value: "6s" },
    { label: "8s", value: "8s" },
    { label: "15s", value: "15s" },
    { label: "30s", value: "30s" },
  ],
  "higgsfield-wan-2.5": [
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
  ],
  "seedance-2.0": [
    { label: "4s", value: "4s" },
    { label: "5s", value: "5s" },
    { label: "10s", value: "10s" },
    { label: "15s", value: "15s" },
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
  const [showAdvanced, setShowAdvanced] = useState(false);
  const categoryModels = getModelsByCategory(category);

  const currentModel = quickSettings.model || categoryModels[0]?.id || "";
  const presets = modelPresets[currentModel];

  // Check if model supports negative prompt
  const supportsNegative = category === "image" || category === "video";

  return (
    <div className="border-b bg-muted/30 p-4 space-y-3">
      {/* Row 1: Model + basic settings */}
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <SettingLabel label="Model" tooltip="Prompt'un hedef AI modeli. Her modelin farklı güçlü yanları ve prompt kuralları var." />
          <ModelSelector
            models={categoryModels.map((m) => ({
              id: m.id,
              name: m.name,
              platformLabel: m.platformLabel,
            }))}
            value={currentModel}
            onChange={(id) => {
              const newPresets = modelPresets[id];
              const firstSize = newPresets?.sizes?.[0]?.label || "1:1";
              const firstQuality = newPresets?.qualities?.[0]?.value || "standard";
              updateQuickSettings({ model: id, style: "", size: firstSize, quality: firstQuality });
            }}
          />
        </div>

        {/* Domain filter for RAG retrieval */}
        <div>
          <SettingLabel label="Domain" tooltip="Örnek prompt'ların hangi alandan getiriliceğini belirler. Genel = tüm alanlar. Branding, e-ticaret vb. seçerek daha ilgili örnekler alırsın." />
          <Select
            value={quickSettings.domain}
            onChange={(e) => updateQuickSettings({ domain: e.target.value })}
            options={domainOptions}
            className="w-[140px]"
          />
        </div>

        {/* Text-specific: Framework + Output Format */}
        {category === "text" && (
          <>
            <div>
              <SettingLabel label="Framework" tooltip="CO-STAR → Context/Objective/Style/Tone/Audience/Response. RISEN → Role/Input/Steps/Expectation/Narrowing. Prompt yapılandırma şablonu." />
              <Select
                value={quickSettings.framework}
                onChange={(e) => updateQuickSettings({ framework: e.target.value })}
                options={textFrameworks}
                className="w-[140px]"
              />
            </div>
            <div>
              <SettingLabel label="Çıktı Formatı" tooltip="Markdown → Zengin metin. Plain Text → Düz metin. JSON → Yapılandırılmış veri. XML → Etiketli yapı." />
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
          <SettingDropdown
            label="Süre"
            tooltip="Video uzunluğu. Kısa süre = daha kaliteli. Model sınırlarına göre seçenekler değişir."
            options={(durationOptionsByModel[currentModel] || defaultDurationOptions).map((d) => ({
              label: d.label,
              value: d.value,
              description: `${d.label} video süresi`,
            }))}
            selected={quickSettings.duration}
            onChange={(value) => updateQuickSettings({ duration: value })}
          />
        )}

        {/* Kling 3.0 Creativity */}
        {currentModel === "kling-3.0" && (
          <div>
            <SettingLabel label="Creativity" tooltip="Düşük (0.5) = prompt'a sadık, gerçekçi. Yüksek (1.0) = yaratıcı özgürlük. Önerilen: 0.7 dengeli." />
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0.5}
                max={1.0}
                step={0.1}
                value={quickSettings.creativity !== "" ? Number(quickSettings.creativity) : 0.7}
                onChange={(e) => updateQuickSettings({ creativity: e.target.value })}
                className="w-[100px] h-1.5 accent-primary"
              />
              <span className="text-xs text-muted-foreground w-[30px]">
                {quickSettings.creativity !== "" ? Number(quickSettings.creativity) : 0.7}
              </span>
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

      {/* Row 4: Advanced Settings (collapsible — Leonardo AI inspired) */}
      {category !== "text" && (
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <Sparkles className="h-3 w-3" />
            Gelişmiş Ayarlar
            {showAdvanced ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showAdvanced && (
            <div className="mt-3 space-y-3 pl-1 border-l-2 border-muted ml-1">
              <div className="pl-3 space-y-3">
                {/* Negative Prompt */}
                {supportsNegative && (
                  <div>
                    <SettingLabel label="Negatif Prompt" tooltip="Görselde/videoda istemediğin şeyleri yaz. Örn: 'blurry, watermark, text'. Desteklemeyen modellerde etkisiz." />
                    <input
                      type="text"
                      value={quickSettings.negativePrompt}
                      onChange={(e) => updateQuickSettings({ negativePrompt: e.target.value })}
                      placeholder="blurry, low quality, deformed, watermark..."
                      className="w-full text-xs px-3 py-1.5 rounded-md border bg-background placeholder:text-muted-foreground/50"
                    />
                  </div>
                )}

                {/* Seed */}
                <div className="flex gap-4">
                  <div>
                    <SettingLabel label="Seed" tooltip="Aynı seed + aynı prompt = aynı sonuç. Tekrarlanabilir üretim için kullan. Boş bırakırsan rastgele." />
                    <input
                      type="text"
                      value={quickSettings.seed}
                      onChange={(e) => updateQuickSettings({ seed: e.target.value.replace(/\D/g, "") })}
                      placeholder="Rastgele"
                      className="w-[140px] text-xs px-3 py-1.5 rounded-md border bg-background placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Prompt Enhance toggle */}
                  <div>
                    <SettingLabel label="Prompt İyileştirme" tooltip="AI modeli prompt'unu otomatik zenginleştirir. Daha detaylı ve optimize edilmiş prompt üretir." />
                    <button
                      onClick={() => updateQuickSettings({ promptEnhance: !quickSettings.promptEnhance })}
                      className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                        quickSettings.promptEnhance
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background border-input hover:bg-accent"
                      }`}
                    >
                      {quickSettings.promptEnhance ? "Açık" : "Kapalı"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
