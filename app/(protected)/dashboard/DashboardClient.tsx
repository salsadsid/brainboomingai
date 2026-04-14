"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Clock,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";

interface DashboardProps {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
  recentResponses: {
    id: string;
    tool: string;
    prompt: string;
    createdAt: string;
  }[];
  recentActivity: {
    id: string;
    action: string;
    tool: string | null;
    createdAt: string;
  }[];
  stats: {
    totalUsage: number;
    mostUsedTool: string | null;
  };
}

function formatToolName(slug: string): string {
  return slug
    .replace(/^free-/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function DashboardClient({
  user,
  recentResponses,
  stats,
}: DashboardProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold ring-4 ring-indigo-500/20">
              {initials}
            </div>
          )}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Welcome back, {user.name || "there"}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Total Uses
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {stats.totalUsage}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Favorite Tool
            </span>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-white">
            {stats.mostUsedTool
              ? formatToolName(stats.mostUsedTool)
              : "None yet"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Tools Used
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {new Set(recentResponses.map((r) => r.tool)).size}
          </p>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700"
      >
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </h2>
        </div>

        {recentResponses.length === 0 ? (
          <div className="p-12 text-center">
            <User className="w-12 h-12 mx-auto text-slate-400 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              No activity yet. Start using our AI tools!
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {recentResponses.map((response) => (
              <div
                key={response.id}
                className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      {formatToolName(response.tool)}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {timeAgo(response.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                  {response.prompt}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
