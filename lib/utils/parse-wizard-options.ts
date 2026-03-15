export interface WizardOption {
  key: string;
  label: string;
  description: string;
  raw: string;
}

export interface ParsedWizardContent {
  intro: string;
  options: WizardOption[];
}

/**
 * Parses wizard option format from assistant messages.
 * Supports multiple formats:
 *   - **a)** Label — description  (bold, separate lines)
 *   - a) Label — description      (plain, separate lines)
 *   - **a)** Label — desc, **b)** Label — desc  (inline)
 *   - a) Label — desc, b) Label — desc          (inline)
 * Returns null if fewer than 2 options found.
 * Only takes the first complete set of options (stops when a key repeats).
 */
export function parseWizardOptions(content: string): ParsedWizardContent | null {
  const multiLineRegex = /(?:\*\*)?([a-z])\)(?:\*\*)?\s+(.+?)(?:\s[—–-]\s(.+))?$/gm;
  let options: WizardOption[] = [];
  let seenKeys = new Set<string>();
  let firstMatchIndex = -1;

  let match: RegExpExecArray | null;
  while ((match = multiLineRegex.exec(content)) !== null) {
    if (seenKeys.has(match[1])) break;
    seenKeys.add(match[1]);
    if (firstMatchIndex === -1) firstMatchIndex = match.index;
    options.push({
      key: match[1],
      label: match[2].trim().replace(/,\s*$/, ""),
      description: match[3]?.trim().replace(/,\s*$/, "") ?? "",
      raw: match[0],
    });
  }

  if (options.length >= 2) {
    const intro = content.slice(0, firstMatchIndex).trim();
    return { intro, options };
  }

  options = [];
  seenKeys = new Set<string>();
  firstMatchIndex = -1;

  const inlineRegex = /(?:\*\*)?([a-z])\)(?:\*\*)?\s+([^,]+?)(?:\s[—–-]\s([^,**]+?))?(?=,\s*(?:\*\*)?[a-z]\)|\s*$)/g;
  while ((match = inlineRegex.exec(content)) !== null) {
    if (seenKeys.has(match[1])) break;
    seenKeys.add(match[1]);
    if (firstMatchIndex === -1) firstMatchIndex = match.index;
    options.push({
      key: match[1],
      label: match[2].trim().replace(/,\s*$/, ""),
      description: match[3]?.trim().replace(/[.,]\s*$/, "") ?? "",
      raw: match[0],
    });
  }

  if (options.length >= 2) {
    const intro = content.slice(0, firstMatchIndex).trim();
    return { intro, options };
  }

  options = [];
  seenKeys = new Set<string>();
  firstMatchIndex = -1;

  const fallbackRegex = /(?:^|[,;]\s*)(?:\*\*)?([a-z])\)(?:\*\*)?\s+(.*?)(?=(?:[,;]\s*)(?:\*\*)?[a-z]\)|$)/gm;
  while ((match = fallbackRegex.exec(content)) !== null) {
    if (seenKeys.has(match[1])) break;
    seenKeys.add(match[1]);
    if (firstMatchIndex === -1) firstMatchIndex = match.index;
    const fullText = match[2].trim().replace(/[,;]\s*$/, "");
    const dashMatch = fullText.match(/^(.+?)\s[—–-]\s(.+)$/);
    options.push({
      key: match[1],
      label: dashMatch ? dashMatch[1].trim() : fullText,
      description: dashMatch ? dashMatch[2].trim() : "",
      raw: match[0].trim().replace(/^[,;]\s*/, ""),
    });
  }

  if (options.length >= 2) {
    let introEnd = firstMatchIndex;
    while (introEnd > 0 && /[,:;\s]/.test(content[introEnd - 1])) {
      introEnd--;
    }
    const intro = content.slice(0, introEnd).trim();
    return { intro, options };
  }

  return null;
}
