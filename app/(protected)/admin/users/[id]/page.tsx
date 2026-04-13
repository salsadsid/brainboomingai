import dbConnect from "@/lib/mongoose";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import User from "@/models/User";
import UserActivity from "@/models/UserActivity";
import { ArrowLeft, Clock, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await dbConnect();

  const user = await User.findById(id)
    .select("name email role isActive createdAt image")
    .lean<{
      _id: string;
      name: string;
      email: string;
      role: string;
      isActive: boolean;
      createdAt: Date;
      image: string | null;
    }>();

  if (!user) notFound();

  const [responses, activity] = await Promise.all([
    GeneratedResponseModel.find({ userId: id })
      .sort({ createdAt: -1 })
      .limit(50)
      .select("tool prompt createdAt")
      .lean(),
    UserActivity.find({ userId: id })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(),
  ]);

  return (
    <div>
      <Link
        href="/admin/users"
        className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Users
      </Link>

      {/* User Info Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
            {user.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {user.name || "Unnamed"}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
            <div className="flex gap-2 mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                }`}
              >
                {user.role}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.isActive
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
          Joined {new Date(user.createdAt).toLocaleDateString()}
          {" | "}
          {responses.length} tool uses | {activity.length} activity records
        </p>
      </div>

      {/* Tool Usage */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Tool Usage ({responses.length})
          </h3>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {responses.map((r) => (
            <div
              key={String(r._id)}
              className="px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {r.tool}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(r.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-1">
                {r.prompt.slice(0, 120)}
              </p>
            </div>
          ))}
          {responses.length === 0 && (
            <p className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
              No tool usage recorded.
            </p>
          )}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Activity Log ({activity.length})
          </h3>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {activity.map((a) => (
            <div
              key={String(a._id)}
              className="px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-900 dark:text-white">
                  {a.action}
                  {a.tool && (
                    <span className="text-slate-500 dark:text-slate-400">
                      {" "}
                      - {a.tool}
                    </span>
                  )}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {new Date(a.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
          {activity.length === 0 && (
            <p className="px-6 py-8 text-center text-slate-500 dark:text-slate-400">
              No activity recorded.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
