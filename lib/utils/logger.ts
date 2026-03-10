type LogLevel = "info" | "warn" | "error" | "debug";

const COLORS: Record<LogLevel, string> = {
  info: "\x1b[36m",   // cyan
  warn: "\x1b[33m",   // yellow
  error: "\x1b[31m",  // red
  debug: "\x1b[90m",  // gray
};
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

function log(level: LogLevel, module: string, message: string, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString().slice(11, 23);
  const color = COLORS[level];
  const metaStr = meta
    ? " " + Object.entries(meta)
        .map(([k, v]) => `${k}=${typeof v === "string" ? v : JSON.stringify(v)}`)
        .join(" ")
    : "";
  console.log(`${color}${BOLD}[${timestamp}]${RESET} ${color}[${module}]${RESET} ${message}${metaStr}`);
}

export const logger = {
  info: (module: string, message: string, meta?: Record<string, unknown>) =>
    log("info", module, message, meta),
  warn: (module: string, message: string, meta?: Record<string, unknown>) =>
    log("warn", module, message, meta),
  error: (module: string, message: string, meta?: Record<string, unknown>) =>
    log("error", module, message, meta),
  debug: (module: string, message: string, meta?: Record<string, unknown>) =>
    log("debug", module, message, meta),
};

/**
 * Measure and log the duration of an async operation.
 */
export async function withTiming<T>(
  module: string,
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = Date.now();
  logger.info(module, `${operation} started`);
  try {
    const result = await fn();
    const duration = Date.now() - start;
    logger.info(module, `${operation} completed`, { duration: formatDuration(duration) });
    return result;
  } catch (err) {
    const duration = Date.now() - start;
    const message = err instanceof Error ? err.message : String(err);
    logger.error(module, `${operation} failed`, { duration: formatDuration(duration), error: message });
    throw err;
  }
}
