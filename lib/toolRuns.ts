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
 * Writes one content-free usage record. See `models/ToolRun.ts` for what is
 * deliberately left out.
 *
 * Never rejects. Metrics are not worth a failed request: a visitor who got their
 * result must not see an error because a counter could not be written, and an
 * error path that is already reporting a failure must not have it replaced by a
 * second one from here.
 */
export async function recordToolRun(fields: ToolRunFields): Promise<void> {
  try {
    await ToolRun.create(fields);
  } catch (err: unknown) {
    logger.error("Tool run metrics error", err, {
      tool: fields.tool,
      status: fields.status,
    });
  }
}
