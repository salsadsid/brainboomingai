import dbConnect from "@/lib/mongoose";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import User from "@/models/User";
import type { Metadata } from "next";
import Link from "next/link";
import ToggleActiveButton from "./ToggleActiveButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Manage Users — Admin",
};

export default async function AdminUsersPage() {
  await dbConnect();

  const users = await User.find()
    .sort({ createdAt: -1 })
    .select("name email role isActive createdAt image")
    .lean();

  // Get usage counts per user
  const usageCounts = await GeneratedResponseModel.aggregate([
    { $match: { userId: { $ne: null } } },
    { $group: { _id: "$userId", count: { $sum: 1 } } },
  ]);
  const usageMap = new Map(
    usageCounts.map((u: { _id: string; count: number }) => [
      String(u._id),
      u.count,
    ])
  );

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">
          All Users ({users.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-elevated">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Uses
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => {
              const userId = String(user._id);
              return (
                <tr
                  key={userId}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/users/${userId}`}
                      className="flex items-center gap-3 hover:underline"
                    >
                      <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {user.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {user.name || "Unnamed"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "border border-primary/25 bg-primary/10 text-primary"
                          : "border border-border bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {usageMap.get(userId) ?? 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <ToggleActiveButton
                      userId={userId}
                      isActive={user.isActive}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
