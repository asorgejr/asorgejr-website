import winston from "winston";

const { combine, timestamp, errors, metadata, printf, colorize, json, splat } = winston.format;

type Env = "development" | "test" | "production";

const env = (process.env.NODE_ENV as Env) ?? "development";
const isProd = env === "production";

/**
 * Terminal formatter:
 * - colorized level
 * - message + selected metadata
 * - prints error stack when present
 */
const consoleFormat = printf((info) => {
  const { level, message, timestamp } = info;
  const meta = info.metadata && Object.keys(info.metadata).length ? info.metadata : undefined;

  // Winston puts error stack on `info.stack` when `errors({ stack: true })` is enabled
  const stack = (info as any).stack as string | undefined;

  const metaStr = meta ? `\n  meta: ${safeStringify(meta)}` : "";
  const stackStr = stack ? `\n  stack: ${stack}` : "";

  return `${timestamp} ${level}: ${message}${metaStr}${stackStr}`;
});

function safeStringify(obj: unknown) {
  // Handles circular refs safely without crashing logging
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (_k, v) => {
      if (typeof v === "object" && v !== null) {
        if (seen.has(v as object)) return "[Circular]";
        seen.add(v as object);
      }
      return v;
    },
    2
  );
}

const baseFormat = combine(
  splat(),
  timestamp({ format: isProd ? undefined : "YYYY-MM-DD HH:mm:ss.SSS" }),
  errors({ stack: true }),
  metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? (isProd ? "info" : "debug"),
  format: isProd ? combine(baseFormat, json()) : baseFormat,
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      // In dev, we apply color and the pretty formatter at the transport level
      format: isProd ? undefined : combine(colorize({ all: true }), consoleFormat),
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});

export default logger;
