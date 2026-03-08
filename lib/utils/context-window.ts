import type { ModelMessage } from "ai";

const DEFAULT_TOKEN_BUDGET = 80_000;
const CHARS_PER_TOKEN = 4; // conservative estimate

function estimateTokens(text: string): number {
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

function messageTokens(msg: ModelMessage): number {
  if (typeof msg.content === "string") {
    return estimateTokens(msg.content);
  }
  if (Array.isArray(msg.content)) {
    return msg.content.reduce((sum, part) => {
      if ("text" in part && typeof part.text === "string") {
        return sum + estimateTokens(part.text);
      }
      // For file/image parts, estimate based on actual data size
      if ("url" in part && typeof part.url === "string") {
        const url = part.url as string;
        if (url.startsWith("data:")) {
          // data URL — estimate from base64 length
          return sum + Math.max(200, Math.ceil(url.length / 4 / CHARS_PER_TOKEN));
        }
        return sum + 500; // hosted URL — moderate estimate
      }
      return sum + 100; // other non-text parts
    }, 0);
  }
  return 50; // fallback for tool results etc.
}

/**
 * Sliding window trimmer: keeps first 2 messages (context setup) + most recent messages within budget.
 * Returns trimmed array. If no trimming needed, returns original array.
 */
export function trimMessages(
  messages: ModelMessage[],
  tokenBudget: number = DEFAULT_TOKEN_BUDGET
): ModelMessage[] {
  if (messages.length <= 4) return messages;

  const totalTokens = messages.reduce((sum, m) => sum + messageTokens(m), 0);
  if (totalTokens <= tokenBudget) return messages;

  // Keep first 2 messages (greeting + initial intent)
  const preserved = messages.slice(0, 2);
  const preservedTokens = preserved.reduce(
    (sum, m) => sum + messageTokens(m),
    0
  );

  let remainingBudget = tokenBudget - preservedTokens;
  const recentMessages: ModelMessage[] = [];

  // Walk backwards from the end, adding messages until budget runs out
  for (let i = messages.length - 1; i >= 2; i--) {
    const tokens = messageTokens(messages[i]);
    if (tokens > remainingBudget) break;
    remainingBudget -= tokens;
    recentMessages.unshift(messages[i]);
  }

  const trimmed = [...preserved, ...recentMessages];
  const trimmedCount = messages.length - trimmed.length;
  if (trimmedCount > 0) {
    console.log(
      `[context-window] Trimmed ${trimmedCount} messages (${messages.length} → ${trimmed.length}), ~${totalTokens - (totalTokens - tokenBudget)} tokens`
    );
  }

  return trimmed;
}
