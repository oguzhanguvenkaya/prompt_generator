import { tool } from "ai";
import { z } from "zod";
import { executeResearch } from "@/lib/research/research-pipeline";
import { logger } from "@/lib/utils/logger";

export const searchInspirationTool = tool({
  description: `Prompt veritabanında ilham arar. Kullanıcının isteğine uygun örnek promptlar, kurgu fikirleri ve stil referansları bulur. Şu durumlarda kullan:
- Kullanıcı belirli bir konu/stil için prompt istediğinde
- Yaratıcı kurgu/sahne ilhamı gerektiğinde
- Spesifik bir model için örnek prompt formatı ararken
Her turda arama YAPMA — sadece gerçekten ilham/referans gerektiğinde kullan.`,
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
    });

    try {
      const result = await executeResearch({ query, intent, category, targetModel, domain });
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
