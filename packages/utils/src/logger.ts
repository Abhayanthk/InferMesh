// ─── Log Levels ──────────────────────────────────────────────
export type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_COLORS: Record<LogLevel, string> = {
  debug: "\x1b[90m",  // gray
  info:  "\x1b[36m",  // cyan
  warn:  "\x1b[33m",  // yellow
  error: "\x1b[31m",  // red
};

const RESET = "\x1b[0m";

// ─── Logger ──────────────────────────────────────────────────
export class Logger {
  private context: string;
  private minLevel: LogLevel;

  private static LEVELS: LogLevel[] = ["debug", "info", "warn", "error"];

  constructor(context: string, minLevel: LogLevel = "info") {
    this.context = context;
    this.minLevel = minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return Logger.LEVELS.indexOf(level) >= Logger.LEVELS.indexOf(this.minLevel);
  }

  private format(level: LogLevel, message: string, data?: any): string {
    const ts = new Date().toISOString();
    const color = LOG_COLORS[level];
    const base = `${color}[${ts}] [${level.toUpperCase()}] [${this.context}]${RESET} ${message}`;
    return data ? `${base} ${JSON.stringify(data)}` : base;
  }

  debug(msg: string, data?: any) {
    if (this.shouldLog("debug")) console.debug(this.format("debug", msg, data));
  }

  info(msg: string, data?: any) {
    if (this.shouldLog("info")) console.info(this.format("info", msg, data));
  }

  warn(msg: string, data?: any) {
    if (this.shouldLog("warn")) console.warn(this.format("warn", msg, data));
  }

  error(msg: string, data?: any) {
    if (this.shouldLog("error")) console.error(this.format("error", msg, data));
  }
}

// ─── Factory ─────────────────────────────────────────────────
export function createLogger(context: string, minLevel?: LogLevel): Logger {
  return new Logger(context, minLevel);
}