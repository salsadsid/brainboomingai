import dbConnect from "@/lib/mongoose";
import UserActivity from "@/models/UserActivity";
import { Activity } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activity Feed - Admin - Brain Booming",
};

export default async function AdminActivityPage() {
  await dbConnect();

  const activities = await UserActivity.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .populate("userId", "name email")
    .lean();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5" />
          All Activity ({activities.length})
        </h2>
      </div>

      <div className="divide-y divide-slate-200 dark:divide-slate-700">
        {activities.map((item) => {
          const user = item.userId as { name?: string; email?: string } | null;
          return (
            <div
              key={String(item._id)}
              className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {user?.name || user?.email || "Unknown"}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">
                    {item.action}
                    {item.tool && ` - ${item.tool}`}
                  </span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
              {item.ip && (
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  IP: {item.ip}
                </p>
              )}
            </div>
          );
        })}
        {activities.length === 0 && (
          <div className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
            No activity recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}
