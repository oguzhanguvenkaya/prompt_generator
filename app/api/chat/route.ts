import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { getConversationModel, getTextAgentModel } from "@/lib/ai/providers";
import { getAgent } from "@/lib/agents/registry";
import { addMessage, updateSessionTitle, getMessages } from "@/lib/db/queries";
import { getMessageAttachments, getMessageText } from "@/lib/chat/message-parts";
import { createSearchInspirationTool } from "@/lib/tools/search-inspiration";
import type { ReferenceImage } from "@/lib/research/research-pipeline";
import { trimMessages } from "@/lib/utils/context-window";
import { logger } from "@/lib/utils/logger";
import type { AgentId } from "@/lib/agents/types";

// Switched from "edge" to "nodejs" for reliable logging during development.
// Edge runtime can swallow stream callback logs in local dev.
// Switch back to "edge" for production deployment.
export const runtime = "nodejs";

interface QuickSettings {
  model: string;
  size: string;
  quality: string;
  style: string;
  cameraMovement: string;
  duration: string;
  framework: string;
  outputFormat: string;
  negativePrompt: string;
  seed: string;
  promptEnhance: boolean;
  domain: string;
  creativity: string;
}

function buildQuickSettingsContext(qs: QuickSettings, agentCategory: string): string {
  const lines: string[] = ["## Kullanıcının Seçili Ayarları"];
  if (qs.model) lines.push(`- Hedef Model: ${qs.model}`);
  if (qs.size) lines.push(`- Boyut: ${qs.size}`);
  if (qs.quality) lines.push(`- Kalite: ${qs.quality}`);
  if (qs.style) lines.push(`- Stil Preset: ${qs.style}`);
  if (agentCategory === "video") {
    if (qs.cameraMovement && qs.cameraMovement !== "static")
      lines.push(`- Kamera Hareketi: ${qs.cameraMovement}`);
    if (qs.duration) lines.push(`- Süre: ${qs.duration}`);
    if (qs.creativity) lines.push(`- Creativity: ${qs.creativity}`);
  }
  if (agentCategory === "text") {
    if (qs.framework) lines.push(`- Framework: ${qs.framework}`);
    if (qs.outputFormat) lines.push(`- Çıktı Formatı: ${qs.outputFormat}`);
  }
  if (qs.domain) lines.push(`- Referans Domain: ${qs.domain}`);
  if (qs.negativePrompt) lines.push(`- Negatif Prompt: ${qs.negativePrompt}`);
  if (qs.seed) lines.push(`- Seed: ${qs.seed}`);
  if (qs.promptEnhance) lines.push(`- Prompt İyileştirme: Açık`);
  lines.push("\nBu ayarları ürettiğin prompt'a yansıt. Kullanıcı bu parametreleri zaten seçti, tekrar sorma.");
  lines.push("Boyut ve kalite bilgisini prompt metnine EKLEME — bunlar API parametreleri olarak ayrı gönderilir.");
  lines.push(
    `search_inspiration aracını çağırırsan category='${agentCategory}', targetModel='${qs.model || "any"}', domain='${qs.domain || "general"}' kullan.`
  );
  return lines.join("\n");
}

export async function POST(req: Request) {
  const requestStart = Date.now();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { messages, agentId, targetModel, quickSettings, sessionId } = body as {
    messages: UIMessage[];
    agentId: string;
    targetModel?: string;
    quickSettings?: QuickSettings;
    sessionId?: string;
  };

  logger.info("CHAT", "━━━ New request ━━━", {
    agentId,
    targetModel: targetModel || "none",
    sessionId: sessionId || "new",
    messageCount: messages?.length || 0,
  });

  const agent = getAgent(agentId as AgentId);

  // Build system prompt with model-specific rules + quick settings
  let systemPrompt = agent.systemPrompt;
  if (targetModel) {
    systemPrompt += "\n\n" + agent.getModelSpecificPrompt(targetModel);
  }
  if (quickSettings) {
    systemPrompt += "\n\n" + buildQuickSettingsContext(quickSettings, agent.category);
  }

  logger.debug("CHAT", "System prompt built", {
    length: systemPrompt.length,
    hasQuickSettings: !!quickSettings,
    domain: quickSettings?.domain || "none",
  });

  // Save user message to DB if session exists
  if (sessionId) {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.role === "user") {
      const content = getMessageText(lastMsg.parts);
      const attachments = getMessageAttachments(lastMsg.parts);
      logger.debug("CHAT", "Saving user message to DB", {
        preview: content.slice(0, 80),
        attachmentCount: attachments.length,
      });

      await addMessage(
        sessionId,
        "user",
        content,
        attachments
      );

      // Auto-generate title from first user message
      const existing = await getMessages(sessionId);
      if (existing.length <= 1) {
        const title = content.slice(0, 50) || "Yeni sohbet";
        await updateSessionTitle(sessionId, title);
      }
    }
  }

  // Extract reference images from user messages for cross-modal search
  const referenceImages: ReferenceImage[] = [];
  for (const msg of messages) {
    if (msg.role !== "user" || !msg.parts) continue;
    for (const part of msg.parts) {
      if (part.type === "file" && typeof part.url === "string" && part.url.startsWith("data:")) {
        const commaIdx = part.url.indexOf(",");
        if (commaIdx === -1) continue;
        const meta = part.url.slice(5, commaIdx);
        const mimeType = meta.split(";")[0];
        if (!mimeType?.startsWith("image/")) continue;
        const base64 = part.url.slice(commaIdx + 1);
        referenceImages.push({ base64, mimeType });
      }
    }
  }

  if (referenceImages.length > 0) {
    logger.info("CHAT", "Reference images extracted for cross-modal search", {
      count: referenceImages.length,
      types: referenceImages.map(r => r.mimeType),
    });
  }

  const model = agent.category === "text" && targetModel
    ? getTextAgentModel(targetModel)
    : getConversationModel();

  try {
    const coreMessages = await convertToModelMessages(messages);
    const trimmedMessages = trimMessages(coreMessages);

    // Create tool with reference images injected for cross-modal search
    const searchTool = createSearchInspirationTool(
      referenceImages.length > 0 ? referenceImages : undefined
    );

    logger.info("CHAT", "Starting streamText", {
      model: targetModel || "gpt-5.4",
      tools: "search_inspiration",
      maxSteps: 3,
      trimmedMessageCount: trimmedMessages.length,
      hasReferenceImages: referenceImages.length > 0,
    });
    const result = streamText({
      model,
      system: systemPrompt,
      messages: trimmedMessages,
      tools: {
        search_inspiration: searchTool,
      },
      stopWhen: stepCountIs(3),
      experimental_download: async (downloads) => {
        // Handle data URLs inline instead of trying to fetch them
        return downloads.map(({ url }) => {
          if (url.protocol === "data:") {
            const dataUrl = url.toString();
            const commaIdx = dataUrl.indexOf(",");
            if (commaIdx === -1) return null;
            const meta = dataUrl.slice(5, commaIdx); // after "data:" before ","
            const mediaType = meta.split(";")[0] || undefined;
            const base64 = dataUrl.slice(commaIdx + 1);
            const data = new Uint8Array(Buffer.from(base64, "base64"));
            return { data, mediaType };
          }
          return null; // Let SDK handle non-data URLs normally
        });
      },
      onChunk: (() => {
        let textStartLogged = false;
        return ({ chunk }: { chunk: Record<string, unknown> }) => {
          if (chunk.type === "tool-call") {
            logger.info("STREAM", "Tool call chunk", {
              toolName: chunk.toolName,
              argsPreview: JSON.stringify(chunk.input).slice(0, 120),
            });
          } else if (chunk.type === "tool-result") {
            const res = chunk.output as unknown as Record<string, unknown> | undefined;
            logger.info("STREAM", "Tool result chunk", {
              toolName: chunk.toolName,
              exampleCount: Array.isArray(res?.examples) ? res.examples.length : "N/A",
            });
          } else if (chunk.type === "text-delta" && !textStartLogged) {
            textStartLogged = true;
            logger.info("STREAM", "Text streaming started");
          }
        };
      })(),
      async onStepFinish({ stepNumber, toolCalls, toolResults, text, finishReason }) {
        const elapsed = Date.now() - requestStart;
        const hasToolCalls = toolCalls && toolCalls.length > 0;
        logger.info("CHAT", `Step #${stepNumber} completed`, {
          elapsed: `${elapsed}ms`,
          finishReason: finishReason || "unknown",
          toolCalls: hasToolCalls ? toolCalls.map((tc) => tc.toolName).join(", ") : "none",
          toolResults: toolResults?.length || 0,
          textLength: text?.length || 0,
        });
      },
      async onFinish({ text, steps, usage }) {
        const elapsed = Date.now() - requestStart;
        const toolCallSteps = steps?.filter((s) => s.toolCalls && s.toolCalls.length > 0).length || 0;

        logger.info("CHAT", "━━━ Stream finished ━━━", {
          totalDuration: `${elapsed}ms`,
          steps: steps?.length || 0,
          toolCallSteps,
          textLength: text?.length || 0,
          tokens: usage ? `${usage.inputTokens}+${usage.outputTokens}` : "unknown",
        });

        if (sessionId && text) {
          await addMessage(sessionId, "assistant", text);
          logger.debug("CHAT", "Assistant message saved to DB");
        }
      },
    });

    logger.info("CHAT", "Stream created, sending response...");
    return result.toUIMessageStreamResponse();
  } catch (error) {
    const elapsed = Date.now() - requestStart;
    const message = error instanceof Error ? error.message : String(error);
    logger.error("CHAT", "━━━ Stream FAILED ━━━", {
      elapsed: `${elapsed}ms`,
      error: message,
    });
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
