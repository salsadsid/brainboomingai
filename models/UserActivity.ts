import mongoose, { Document, Schema } from "mongoose";

export interface IUserActivity extends Document {
  userId: mongoose.Types.ObjectId;
  action: string;
  tool: string | null;
  metadata: Record<string, unknown>;
  ip: string | null;
  createdAt: Date;
}

const UserActivitySchema = new Schema<IUserActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    action: { type: String, required: true, index: true },
    tool: { type: String, default: null },
    metadata: { type: Object, default: {} },
    ip: { type: String, default: null },
  },
  { timestamps: true }
);

UserActivitySchema.index({ userId: 1, createdAt: -1 });
UserActivitySchema.index({ action: 1, createdAt: -1 });

const UserActivity =
  mongoose.models.UserActivity ||
  mongoose.model<IUserActivity>("UserActivity", UserActivitySchema);

export default UserActivity;
