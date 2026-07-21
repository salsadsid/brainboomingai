// models/GeneratedResponse.ts
import mongoose, { Document, Schema } from "mongoose";

// Define the Mongoose schema interface
interface GeneratedResponse extends Document {
  /** The full composed prompt sent upstream — kept for debugging/audit. */
  prompt: string;
  /**
   * What the user actually typed, before the tool's template wrapped it.
   *
   * Optional because rows written before prompts moved server-side have no
   * such value. Worth storing: history views were slicing the first 150 chars
   * of `prompt`, which is template boilerplate identical on every row.
   */
  text?: string;
  response: string;
  tool: string;
  responseRaw: Record<string, unknown>;
  userId: mongoose.Types.ObjectId | null;
}

// Define the schema for generated responses
const GeneratedResponseSchema = new Schema<GeneratedResponse>(
  {
    prompt: { type: String, required: true },
    text: { type: String },
    response: { type: String, required: true },
    tool: { type: String, required: true },
    responseRaw: { type: Object, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null, index: true },
  },
  { timestamps: true }
);

// Compound index: dashboard & admin user-detail queries
// e.g. find({ userId }).sort({ createdAt: -1 })
GeneratedResponseSchema.index({ userId: 1, createdAt: -1 });

// Compound index: queries filtering/grouping by tool
// e.g. aggregate $match by tool, or future per-tool stats
GeneratedResponseSchema.index({ tool: 1, createdAt: -1 });

// Single-field index: admin date-range counts
// e.g. countDocuments({ createdAt: { $gte: todayStart } })
GeneratedResponseSchema.index({ createdAt: -1 });

// Prevent model overwrite by checking if it exists
const GeneratedResponseModel =
  mongoose.models.GeneratedResponse ||
  mongoose.model<GeneratedResponse>(
    "GeneratedResponse",
    GeneratedResponseSchema
  );

export default GeneratedResponseModel;
