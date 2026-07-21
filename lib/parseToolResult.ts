import { logger } from "@/lib/logger";
import {
  type GeneratePayload,
  type ToolResultSlug,
  toolResultSchemas,
} from "@/lib/toolResults";

/**
 * Turns raw model output into the payload the client renders.
 *
 * Every failure mode degrades to `{ format: "text" }` rather than throwing. A
 * tool that shows its answer as plain prose is a worse experience than a rich
 * one; a tool that shows an error because a bracket was missing is a broken
 * product. The realistic failures are:
 *
 *   - the response was truncated at the token limit, so the JSON is cut short
 *   - the model wrapped the JSON in ```json fences despite being told not to
 *   - `responseSchema` was ignored and prose came back
 *   - a field arrived with the wrong type, or is missing
 *
 * Deliberately no retry: a second call costs a quota-limited request for a
 * low-probability recovery, and the text fallback is already serviceable.
 */
export function parseToolResult(
  tool: ToolResultSlug,
  raw: string,
): GeneratePayload {
  const candidate = stripCodeFences(raw);

  let json: unknown;
  try {
    json = JSON.parse(candidate);
  } catch {
    logger.warn("Tool result was not valid JSON; falling back to text", {
      tool,
      length: raw.length,
      // Truncation is the usual cause, and it looks distinctive: valid-ish JSON
      // that simply stops. Recording it separates "cut off" from "ignored the
      // schema entirely" when reviewing how often the fallback fires.
      looksTruncated: candidate.trimStart().startsWith("{") && !candidate.trimEnd().endsWith("}"),
    });
    return { format: "text", content: raw };
  }

  const parsed = toolResultSchemas[tool].safeParse(json);
  if (!parsed.success) {
    logger.warn("Tool result did not match its schema; falling back to text", {
      tool,
      issues: parsed.error.issues.slice(0, 5).map((i) => ({
        path: i.path.join("."),
        code: i.code,
      })),
    });
    return { format: "text", content: raw };
  }

  return {
    format: "structured",
    tool,
    data: parsed.data,
  } as GeneratePayload;
}

/**
 * Models are told to return bare JSON but sometimes wrap it in a fenced block
 * anyway. Cheap to tolerate, and it converts a guaranteed fallback into a
 * structured result.
 */
function stripCodeFences(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed.startsWith("```")) return trimmed;
  return trimmed
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/, "")
    .trim();
}
