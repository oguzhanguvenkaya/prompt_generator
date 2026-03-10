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
 * Parses wizard option format: **a)** Label — description
 * Returns null if fewer than 2 options found.
 * Only takes the first complete set of options (stops when a key repeats).
 */
export function parseWizardOptions(content: string): ParsedWizardContent | null {
  const optionRegex = /\*\*([a-z])\)\*\*\s+(.+?)(?:\s[—–-]\s(.+))?$/gm;

  const options: WizardOption[] = [];
  const seenKeys = new Set<string>();
  let firstMatchIndex = -1;

  let match: RegExpExecArray | null;
  while ((match = optionRegex.exec(content)) !== null) {
    // Stop at first duplicate key — means a second set of options
    if (seenKeys.has(match[1])) break;
    seenKeys.add(match[1]);

    if (firstMatchIndex === -1) firstMatchIndex = match.index;
    options.push({
      key: match[1],
      label: match[2].trim(),
      description: match[3]?.trim() ?? "",
      raw: match[0],
    });
  }

  if (options.length < 2) return null;

  const intro = content.slice(0, firstMatchIndex).trim();

  return { intro, options };
}
