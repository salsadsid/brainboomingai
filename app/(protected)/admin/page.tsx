import { allTools } from "@/config/constants";
import dbConnect from "@/lib/mongoose";
import ToolRun from "@/models/ToolRun";
import User from "@/models/User";
import UserActivity from "@/models/UserActivity";
import type { LucideIcon } from "lucide-react";
import { Activity, BarChart3, Gauge, Users, Wrench } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
};

/** One row of the per-tool breakdown, as the aggregate below shapes it. */
interface ToolStat {
  _id: string;
  runs: number;
  anonymous: number;
  errors: number;
  /** Null when no run in the window succeeded. */
  avgLatencyMs: number | null;
  avgAiLatencyMs: number | null;
}

function toolName(slug: string): string {
  return allTools.find((t) => t.href === `/${slug}`)?.shortTitle ?? slug;
}

function seconds(ms: number | null): string {
  return ms === null ? "—" : `${(ms / 1000).toFixed(1)}s`;
}

export default async function AdminOverviewPage() {
  await dbConnect();

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Usage comes from ToolRun, not GeneratedResponse: content is only stored for
  // signed-in users now, so counting that collection would silently report
  // signed-in traffic as if it were all traffic.
  const [
    totalUsers,
    newUsersThisWeek,
    totalToolUses,
    todayToolUses,
    toolStats,
    recentActivity,
  ] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ createdAt: { $gte: weekAgo } }),
    ToolRun.countDocuments({ status: "ok" }),
    ToolRun.countDocuments({ status: "ok", createdAt: { $gte: todayStart } }),
    ToolRun.aggregate<ToolStat>([
      { $match: { createdAt: { $gte: weekAgo } } },
      {
        $group: {
          _id: "$tool",
          runs: { $sum: 1 },
          anonymous: { $sum: { $cond: ["$authenticated", 0, 1] } },
          errors: { $sum: { $cond: [{ $eq: ["$status", "ok"] }, 0, 1] } },
          // Successful runs only — a failed run's timing says how long the
          // failure took, not how fast the tool is. $avg skips the nulls.
          avgLatencyMs: {
            $avg: { $cond: [{ $eq: ["$status", "ok"] }, "$latencyMs", null] },
          },
          avgAiLatencyMs: { $avg: "$aiLatencyMs" },
        },
      },
      { $sort: { runs: -1 } },
    ]),
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

      {/* Per-tool usage. Counts every visitor, signed in or not, and holds no
          content — see models/ToolRun.ts. */}
      <div className="mb-8 overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-3.5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Gauge className="size-4 text-muted-foreground" aria-hidden="true" />
            Tool usage, last 7 days
          </h2>
        </div>
        {toolStats.length === 0 ? (
          <div className="px-5 py-14 text-center text-sm text-muted-foreground">
            No runs recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-elevated">
                <tr>
                  {["Tool", "Runs", "Anonymous", "Avg time", "Model time", "Failed"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {toolStats.map((stat) => (
                  <tr
                    key={stat._id}
                    className="transition-colors hover:bg-secondary/30"
                  >
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">
                      {toolName(stat._id)}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-sm text-foreground">
                      {stat.runs.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-sm text-muted-foreground">
                      {Math.round((stat.anonymous / stat.runs) * 100)}%
                    </td>
                    <td className="px-5 py-3.5 font-mono text-sm text-muted-foreground">
                      {seconds(stat.avgLatencyMs)}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-sm text-muted-foreground">
                      {seconds(stat.avgAiLatencyMs)}
                    </td>
                    <td
                      className={`px-5 py-3.5 font-mono text-sm ${
                        stat.errors > 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                      }`}
                    >
                      {stat.errors.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
