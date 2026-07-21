import { GoogleGenAI } from "@google/genai";
import { logger } from "@/lib/logger";

let client: GoogleGenAI | null = null;

function getClient(): GoogleGenAI {
  if (client) return client;
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("API key for Google GenerativeAI is not set.");
  }
  client = new GoogleGenAI({ apiKey });
  return client;
}

const MODEL = "gemini-2.5-flash-lite";
const MAX_ATTEMPTS = 3;

/**
 * Upstream statuses worth retrying.
 *
 * 503 UNAVAILABLE and 500 INTERNAL are transient capacity problems on Google's
 * side, and a moment later the same request usually succeeds.
 *
 * 429 RESOURCE_EXHAUSTED is deliberately NOT here. On the free tier the binding
 * limit is `GenerateRequestsPerDayPerProjectPerModel` — a per-day allowance. No
 * sub-second backoff can clear that, so retrying only made the user wait longer
 * for the same refusal. Everything else (400 bad request, 403 revoked key, 404
 * unknown model) is deterministic and equally not worth repeating.
 */
const RETRYABLE_STATUSES = new Set([500, 503]);

/** Transient capacity problem upstream — worth trying again shortly. */
export class UpstreamBusyError extends Error {
  readonly retryable = true;
  constructor(message = "The AI provider is busy.") {
    super(message);
    this.name = "UpstreamBusyError";
  }
}

/**
 * The account's quota is spent. Distinct from `UpstreamBusyError` because the
 * remedy is completely different: waiting a moment does nothing, and telling a
 * user to "try again shortly" when the allowance resets tomorrow is a lie.
 */
export class QuotaExceededError extends Error {
  /** Seconds Google suggests waiting, when it says. */
  readonly retryAfterSeconds: number | null;
  constructor(retryAfterSeconds: number | null = null) {
    super("The AI provider quota has been exhausted.");
    this.name = "QuotaExceededError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

/** The SDK stringifies the HTTP status into the message; dig it back out. */
function statusOf(error: unknown): number | null {
  const message = error instanceof Error ? error.message : String(error);
  const match =
    message.match(/status:\s*(\d{3})/) ?? message.match(/"code":\s*(\d{3})/);
  return match ? Number(match[1]) : null;
}

/** Google appends e.g. "Please retry in 45.8s." to the quota message. */
function retryAfterOf(error: unknown): number | null {
  const message = error instanceof Error ? error.message : String(error);
  const match = message.match(/retry in ([\d.]+)s/i);
  return match ? Math.ceil(Number(match[1])) : null;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface GenerateOptions {
  /**
   * A Gemini `responseSchema`. When present the model is asked for JSON
   * matching it. Typed loosely so this module stays free of a compile-time
   * dependency on the per-tool schema definitions.
   */
  schema?: object;
}

/**
 * JSON is markedly more verbose than the prose these prompts used to return,
 * and a response cut off at the token limit is invalid JSON rather than merely
 * a short answer — the single likeliest cause of a parse failure downstream.
 */
const MAX_OUTPUT_TOKENS = 2048;
const MAX_OUTPUT_TOKENS_JSON = 4096;

export async function generateResponse(
  prompt: string,
  options: GenerateOptions = {},
): Promise<{ response: string; responseRaw: Record<string, unknown> }> {
  let lastError: unknown;

  const config = options.schema
    ? {
        maxOutputTokens: MAX_OUTPUT_TOKENS_JSON,
        responseMimeType: "application/json",
        responseSchema: options.schema,
      }
    : { maxOutputTokens: MAX_OUTPUT_TOKENS };

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const result = await getClient().models.generateContent({
        model: MODEL,
        contents: prompt,
        config,
      });

      const text = result.text;

      if (!text?.trim()) {
        throw new Error("No valid content returned from the API.");
      }

      return {
        response: text.trim(),
        responseRaw: result as unknown as Record<string, unknown>,
      };
    } catch (error) {
      lastError = error;
      const status = statusOf(error);

      // Surfaced as its own type on the first attempt: the quota is spent, so
      // there is nothing to wait for within this request.
      if (status === 429) {
        logger.error("Gemini quota exhausted", error, {
          retryAfterSeconds: retryAfterOf(error),
        });
        throw new QuotaExceededError(retryAfterOf(error));
      }

      if (status === null || !RETRYABLE_STATUSES.has(status)) throw error;

      if (attempt === MAX_ATTEMPTS) {
        logger.error("Gemini unavailable after retries", error, {
          attempts: MAX_ATTEMPTS,
          status,
        });
        throw new UpstreamBusyError();
      }

      // Exponential backoff with jitter. Kept short deliberately: the caller is
      // a user waiting on a request, and the failing attempts themselves return
      // in about a second, so three tries still land well inside the timeout.
      const backoff = 300 * 2 ** (attempt - 1) + Math.random() * 200;

      // Not routed through `logger` on purpose. logger.warn raises a Sentry
      // event, and a retry that then succeeds is a non-event — on the free
      // tier these happen constantly and would bury real errors in noise.
      // Only giving up entirely (above) is worth reporting.
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[gemini] ${status} on attempt ${attempt}/${MAX_ATTEMPTS}, retrying in ${Math.round(backoff)}ms`,
        );
      }

      await sleep(backoff);
    }
  }

  throw lastError;
}
