import mongoose from "mongoose";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 10;

const rateLimitSchema = new mongoose.Schema({
  ip: { type: String, required: true, index: true },
  count: { type: Number, default: 1 },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

const RateLimitModel =
  mongoose.models.RateLimit ||
  mongoose.model("RateLimit", rateLimitSchema);

export async function rateLimit(ip: string): Promise<{ success: boolean }> {
  const now = new Date();

  const entry = await RateLimitModel.findOneAndUpdate(
    { ip, expiresAt: { $gt: now } },
    { $inc: { count: 1 } },
    { new: true },
  );

  if (!entry) {
    await RateLimitModel.create({
      ip,
      count: 1,
      expiresAt: new Date(now.getTime() + WINDOW_SECONDS * 1000),
    });
    return { success: true };
  }

  return { success: entry.count <= MAX_REQUESTS };
}
