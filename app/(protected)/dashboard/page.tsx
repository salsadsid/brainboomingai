import { requireAuth } from "@/lib/auth-helpers";
import dbConnect from "@/lib/mongoose";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import UserActivity from "@/models/UserActivity";
import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your activity and usage history",
};

export default async function DashboardPage() {
  const user = await requireAuth();

  await dbConnect();

  const [recentResponses, recentActivity, totalUsage] = await Promise.all([
    GeneratedResponseModel.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .limit(50)
      .select("tool prompt createdAt")
      .lean(),
    UserActivity.find({ userId: user.id })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(),
    GeneratedResponseModel.countDocuments({ userId: user.id }),
  ]);

  // Compute most used tool
  const toolCounts: Record<string, number> = {};
  for (const r of recentResponses) {
    toolCounts[r.tool] = (toolCounts[r.tool] || 0) + 1;
  }
  const mostUsedTool =
    Object.entries(toolCounts).sort(([, a], [, b]) => b - a)[0]?.[0] ?? null;

  return (
    <DashboardClient
      user={{
        name: user.name ?? "",
        email: user.email ?? "",
        image: user.image ?? null,
      }}
      recentResponses={recentResponses.map((r) => ({
        id: String(r._id),
        tool: r.tool,
        prompt: r.prompt.slice(0, 150),
        createdAt: r.createdAt.toISOString(),
      }))}
      recentActivity={recentActivity.map((a) => ({
        id: String(a._id),
        action: a.action,
        tool: a.tool,
        createdAt: a.createdAt.toISOString(),
      }))}
      stats={{
        totalUsage,
        mostUsedTool,
      }}
    />
  );
}
