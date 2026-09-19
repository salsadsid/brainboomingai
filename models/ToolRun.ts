import mongoose, { Document, Schema } from "mongoose";

/**
 * One row per call to a text tool — and nothing in it that could identify the
 * caller or reveal what they wrote.
 *
 * This exists so usage can be measured without keeping visitors' text. There is
 * deliberately no `text`, no `userId` and no `ip`: only which tool ran, how big
 * the job was, how long it took and whether it worked. That is enough to answer
 * "which tools are used?", "how slow is it?" and "how often does it fail?",
 * which is everything the product needs from an anonymous run.
 *
 * Signed-in history lives in `GeneratedResponse`; per-user audit lives in
 * `UserActivity`. Keep this collection free of both.
 */

export type ToolRunStatus = "ok" | "quota" | "busy" | "error";

export interface IToolRun extends Document {
  tool: string;
  /** Whether the caller was signed in. A boolean, never the id. */
  authenticated: boolean;
  inputChars: number;
  /** 0 when the run failed before producing output. */
  outputChars: number;
  /** Whole request, as the server saw it. */
  latencyMs: number;
  /** The model call alone; null when the run failed before it returned. */
  aiLatencyMs: number | null;
  /** Null when the run failed: no payload was produced. */
  format: "structured" | "text" | null;
  status: ToolRunStatus;
  createdAt: Date;
}

const ToolRunSchema = new Schema<IToolRun>(
  {
    tool: { type: String, required: true },
    authenticated: { type: Boolean, required: true },
    inputChars: { type: Number, required: true },
    outputChars: { type: Number, default: 0 },
    latencyMs: { type: Number, required: true },
    aiLatencyMs: { type: Number, default: null },
    format: { type: String, enum: ["structured", "text", null], default: null },
    status: {
      type: String,
      enum: ["ok", "quota", "busy", "error"],
      required: true,
    },
  },
  { timestamps: true }
);

// Global counters and "today" windows on the admin overview.
ToolRunSchema.index({ createdAt: -1 });

// Per-tool breakdown over a recent window.
ToolRunSchema.index({ tool: 1, createdAt: -1 });

const ToolRun =
  mongoose.models.ToolRun || mongoose.model<IToolRun>("ToolRun", ToolRunSchema);

export default ToolRun;
