const pricing: Record<string, { input: number; output: number }> = {
  "claude-sonnet": { input: 3, output: 15 },
  "claude-opus": { input: 15, output: 75 },
  "gpt-5.4": { input: 2, output: 8 },
  "gpt-5.4-thinking": { input: 2, output: 8 },
  "gpt-5.4-pro": { input: 30, output: 180 },
  "gemini-pro": { input: 1.25, output: 5 },
  "kimi-k2.5": { input: 1, output: 3 },
  "qwen": { input: 0.5, output: 1.5 },
};

export function calculateCost(
  model: string,
  inputTokens: number,
  outputTokens: number
): number {
  const price = pricing[model] || { input: 3, output: 15 };
  return (inputTokens / 1_000_000) * price.input + (outputTokens / 1_000_000) * price.output;
}

export function formatCost(usd: number): string {
  if (usd < 0.01) return `$${(usd * 100).toFixed(2)}¢`;
  return `$${usd.toFixed(4)}`;
}
