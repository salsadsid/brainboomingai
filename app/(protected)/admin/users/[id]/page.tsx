import dbConnect from "@/lib/mongoose";
import GeneratedResponseModel from "@/models/GeneratedResponse";
import User from "@/models/User";
import UserActivity from "@/models/UserActivity";
import { ArrowLeft, Clock, Wrench } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

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
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Users
      </Link>

      {/* User Info Card */}
      <div className="bg-card rounded-xl border border-border p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-brand-gradient flex items-center justify-center text-white text-xl font-bold">
            {user.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {user.name || "Unnamed"}
            </h2>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex gap-2 mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.role === "admin"
                    ? "border border-primary/25 bg-primary/10 text-primary"
                    : "border border-border bg-secondary text-secondary-foreground"
                }`}
              >
                {user.role}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.isActive
                    ? "border border-success/25 bg-success/10 text-success"
                    : "border border-destructive/25 bg-destructive/10 text-destructive"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Joined {new Date(user.createdAt).toLocaleDateString()}
          {" | "}
          {responses.length} tool uses | {activity.length} activity records
        </p>
      </div>

      {/* Tool Usage */}
      <div className="bg-card rounded-xl border border-border mb-8">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Tool Usage ({responses.length})
          </h3>
        </div>
        <div className="divide-y divide-border">
          {responses.map((r) => (
            <div
              key={String(r._id)}
              className="px-6 py-3 hover:bg-secondary"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {r.tool}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate mt-1">
                {r.prompt.slice(0, 120)}
              </p>
            </div>
          ))}
          {responses.length === 0 && (
            <p className="px-6 py-8 text-center text-muted-foreground">
              No tool usage recorded.
            </p>
          )}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-card rounded-xl border border-border">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Activity Log ({activity.length})
          </h3>
        </div>
        <div className="divide-y divide-border">
          {activity.map((a) => (
            <div
              key={String(a._id)}
              className="px-6 py-3 hover:bg-secondary"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">
                  {a.action}
                  {a.tool && (
                    <span className="text-muted-foreground">
                      {" "}
                      - {a.tool}
                    </span>
                  )}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(a.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
          {activity.length === 0 && (
            <p className="px-6 py-8 text-center text-muted-foreground">
              No activity recorded.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
