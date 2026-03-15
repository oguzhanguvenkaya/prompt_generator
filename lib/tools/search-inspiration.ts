import { tool } from "ai";
import { z } from "zod";
import { executeResearch, type ReferenceImage } from "@/lib/research/research-pipeline";
import { logger } from "@/lib/utils/logger";

/**
 * Creates the search inspiration tool with optional reference images
 * injected from the chat context (user's image attachments).
 */
export function createSearchInspirationTool(referenceImages?: ReferenceImage[]) {
  return tool({
    description: `Prompt veritabanında ilham ve referans arar. Test edilmiş, yüksek kaliteli örnek promptlar, kurgu fikirleri ve stil referansları bulur. Kullanıcı referans görsel yüklediyse, görsellere benzer tarzda promptlar da arar (cross-modal search).

ZORUNLU KULLANIM: Prompt üretme aşamasına geldiğinde (kullanıcı onay verdikten sonra) bu aracı MUTLAKA çağır. Veritabanındaki gerçek örnekler promptun kalitesini dramatik şekilde artırır.

Çağır:
- Prompt üretmeden hemen önce (ZORUNLU)
- Yaratıcı kurgu/sahne ilhamı gerektiğinde
- Spesifik bir model için format referansı ararken
- Referans görsel yüklendiğinde benzer tarz bulmak için

Çağırma:
- Wizard'ın ilk adımlarında (konu henüz netleşmemişken)`,
    inputSchema: z.object({
      query: z
        .string()
        .describe(
          "Ne arıyoruz? Örn: 'product photography dramatic lighting'"
        ),
      intent: z
        .string()
        .optional()
        .describe(
          "Neden arıyoruz? Örn: 'valentines day product shoot inspiration'"
        ),
      category: z.enum(["text", "image", "video"]),
      targetModel: z.string().optional(),
      domain: z.string().optional(),
    }),
    execute: async ({ query, intent, category, targetModel, domain }) => {
      logger.info("TOOL", "search_inspiration called", {
        query: query.slice(0, 80),
        intent: intent || "none",
        category,
        targetModel: targetModel || "any",
        domain: domain || "any",
        referenceImageCount: referenceImages?.length || 0,
      });

      try {
        const result = await executeResearch({
          query,
          intent,
          category,
          targetModel,
          domain,
          referenceImages,
        });
        logger.info("TOOL", "search_inspiration result", {
          exampleCount: result.examples.length,
          summary: result.searchSummary,
        });
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        logger.error("TOOL", "search_inspiration failed", { error: message });
        return {
          examples: [],
          searchSummary: `Arama hatası: ${message}`,
        };
      }
    },
  });
}

// Default tool without reference images (backward compatible)
export const searchInspirationTool = createSearchInspirationTool();
