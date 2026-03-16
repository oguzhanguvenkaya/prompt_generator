export interface TextSegment {
  type: "text";
  content: string;
}

export interface PromptSegment {
  type: "prompt";
  prompt: string;
  negativePrompt?: string;
}

export type ContentSegment = TextSegment | PromptSegment;

/**
 * Parse markdown content to extract ```prompt and ```negative code fence blocks.
 * Returns segments in order: text parts as TextSegment, prompt blocks as PromptSegment.
 * A ```negative block immediately following a ```prompt block is merged into the same PromptSegment.
 *
 * Returns null if no prompt blocks found (caller should use default rendering).
 */
export function parsePromptBlocks(
  content: string
): { segments: ContentSegment[] } | null {
  // Match ```prompt\n...\n``` optionally followed by whitespace and ```negative\n...\n```
  const pattern =
    /```prompt\n([\s\S]*?)```(?:\s*```negative\n([\s\S]*?)```)?/g;

  const segments: ContentSegment[] = [];
  let lastIndex = 0;
  let foundAny = false;

  let match: RegExpExecArray | null;
  while ((match = pattern.exec(content)) !== null) {
    foundAny = true;

    // Text before this match
    if (match.index > lastIndex) {
      const text = content.slice(lastIndex, match.index).trim();
      if (text) {
        segments.push({ type: "text", content: text });
      }
    }

    const prompt = match[1].trim();
    const negativePrompt = match[2]?.trim() || undefined;

    segments.push({ type: "prompt", prompt, negativePrompt });
    lastIndex = match.index + match[0].length;
  }

  if (!foundAny) return null;

  // Remaining text after last match
  if (lastIndex < content.length) {
    const text = content.slice(lastIndex).trim();
    if (text) {
      segments.push({ type: "text", content: text });
    }
  }

  return { segments };
}
