import dbConnect from "@/lib/mongoose";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import User from "@/models/User";
import UserActivity from "@/models/UserActivity";
import type { LucideIcon } from "lucide-react";
import { Activity, BarChart3, Users, Wrench } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminOverviewPage() {
  await dbConnect();

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const [totalUsers, newUsersThisWeek, totalToolUses, todayToolUses, recentActivity] =
    await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: weekAgo } }),
      GeneratedResponseModel.countDocuments(),
      GeneratedResponseModel.countDocuments({ createdAt: { $gte: todayStart } }),
      UserActivity.find()
        .sort({ createdAt: -1 })
        .limit(20)
        .populate("userId", "name email")
        .lean(),
    ]);

  return (
    <div>
      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={totalUsers}
        />
        <StatCard
          icon={Users}
          label="New This Week"
          value={newUsersThisWeek}
        />
        <StatCard
          icon={BarChart3}
          label="Total Tool Uses"
          value={totalToolUses}
        />
        <StatCard
          icon={Wrench}
          label="Uses Today"
          value={todayToolUses}
        />
      </div>

      {/* Recent Activity */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-3.5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Activity className="size-4 text-muted-foreground" aria-hidden="true" />
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-border">
          {recentActivity.map((item) => {
            const user = item.userId as { name?: string; email?: string } | null;
            return (
              <div
                key={String(item._id)}
                className="px-5 py-3.5 transition-colors hover:bg-secondary"
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
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
          {recentActivity.length === 0 && (
            <div className="px-5 py-14 text-center text-sm text-muted-foreground">
              No activity recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
      <div className="flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="mt-3 font-mono text-2xl font-semibold text-foreground">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
