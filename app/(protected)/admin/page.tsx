import dbConnect from "@/lib/mongoose";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import User from "@/models/User";
import UserActivity from "@/models/UserActivity";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-indigo-500 to-purple-500"
          label="Total Users"
          value={totalUsers}
        />
        <StatCard
          icon={<Users className="w-5 h-5 text-white" />}
          gradient="from-green-500 to-emerald-500"
          label="New This Week"
          value={newUsersThisWeek}
        />
        <StatCard
          icon={<BarChart3 className="w-5 h-5 text-white" />}
          gradient="from-orange-500 to-red-500"
          label="Total Tool Uses"
          value={totalToolUses}
        />
        <StatCard
          icon={<Wrench className="w-5 h-5 text-white" />}
          gradient="from-cyan-500 to-blue-500"
          label="Uses Today"
          value={todayToolUses}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </h2>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {recentActivity.map((item) => {
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
              </div>
            );
          })}
          {recentActivity.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
              No activity recorded yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  gradient,
  label,
  value,
}: {
  icon: React.ReactNode;
  gradient: string;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-2">
        <div
          className={`w-10 h-10 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {label}
        </span>
      </div>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
