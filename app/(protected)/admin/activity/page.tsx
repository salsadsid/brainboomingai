import dbConnect from "@/lib/mongoose";
import UserActivity from "@/models/UserActivity";
import { Activity } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Activity Feed — Admin",
};

export default async function AdminActivityPage() {
  await dbConnect();

  const activities = await UserActivity.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .populate("userId", "name email")
    .lean();

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Activity className="w-5 h-5" />
          All Activity ({activities.length})
        </h2>
      </div>

      <div className="divide-y divide-border">
        {activities.map((item) => {
          const user = item.userId as { name?: string; email?: string } | null;
          return (
            <div
              key={String(item._id)}
              className="px-6 py-4 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-foreground">
                    {user?.name || user?.email || "Unknown"}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {item.action}
                    {item.tool && ` - ${item.tool}`}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              {item.ip && (
                <p className="text-xs text-muted-foreground mt-1">
                  IP: {item.ip}
                </p>
              )}
            </div>
          );
        })}
        {activities.length === 0 && (
          <div className="px-6 py-12 text-center text-muted-foreground">
            No activity recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}
