import { logger } from "@/lib/logger";
import ToolRun, { type ToolRunStatus } from "@/models/ToolRun";

export interface ToolRunFields {
  tool: string;
  authenticated: boolean;
  inputChars: number;
  outputChars?: number;
  latencyMs: number;
  aiLatencyMs?: number | null;
  format?: "structured" | "text" | null;
  status: ToolRunStatus;
}

/**
 * How long a metrics write may hold up a response. The connection runs with
 * `bufferCommands: false`, but a stalled one still waits out the driver's 30s
 * server-selection timeout — long enough for the platform to answer 504 in
 * place of a result the visitor already has.
 */
const WRITE_TIMEOUT_MS = 2_000;

/**
 * Writes one content-free usage record. See `models/ToolRun.ts` for what is
 * deliberately left out.
 *
 * Never rejects, and never waits longer than WRITE_TIMEOUT_MS. Metrics are not
 * worth a failed request: a visitor who got their result must not see an error
 * because a counter could not be written, and an error path that is already
 * reporting a failure must not have it replaced by a second one from here.
 */
export async function recordToolRun(fields: ToolRunFields): Promise<void> {
  // Copied field by field rather than passed through. The model is loosely
  // typed and excess-property checks do not apply to spreads, so a caller's
  // object that one day carries `text` would otherwise be written as-is. This
  // is the point that guarantees the collection stays content-free.
  const doc = {
    tool: fields.tool,
    authenticated: fields.authenticated,
    inputChars: fields.inputChars,
    outputChars: fields.outputChars ?? 0,
    latencyMs: fields.latencyMs,
    aiLatencyMs: fields.aiLatencyMs ?? null,
    format: fields.format ?? null,
    status: fields.status,
  };

  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      ToolRun.create(doc),
      new Promise<never>((_, reject) => {
        timer = setTimeout(
          () => reject(new Error(`ToolRun write exceeded ${WRITE_TIMEOUT_MS}ms`)),
          WRITE_TIMEOUT_MS,
        );
      }),
    ]);
  } catch (err: unknown) {
    logger.error("Tool run metrics error", err, {
      tool: fields.tool,
      status: fields.status,
    });
  } finally {
    clearTimeout(timer);
  }
}
