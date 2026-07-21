"use client";

import { Button } from "@/components/ui/button";
import { aiTools, allTools } from "@/config/constants";
import { toolIcons } from "@/config/toolIcons";
import { Activity, BarChart3, Clock, Sparkles, Wrench } from "lucide-react";
import Link from "next/link";

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

/** Resolves a stored tool slug back to its registry entry (stored slugs omit the "/"). */
function toolFor(slug: string) {
  return allTools.find((t) => t.href === `/${slug}`);
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BarChart3;
  label: string;
  value: string | number;
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
        {value}
      </p>
    </div>
  );
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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex items-center gap-4">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- avatar host varies by auth provider
          <img
            src={user.image}
            alt=""
            className="size-14 rounded-xl object-cover ring-2 ring-primary/30"
          />
        ) : (
          <span className="flex size-14 items-center justify-center rounded-xl bg-brand-gradient text-lg font-bold text-white ring-2 ring-primary/30">
            {initials}
          </span>
        )}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Welcome back, {user.name || "there"}
          </h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard icon={BarChart3} label="Total Uses" value={stats.totalUsage} />
        <StatCard
          icon={Sparkles}
          label="Favorite Tool"
          value={
            stats.mostUsedTool ? formatToolName(stats.mostUsedTool) : "None yet"
          }
        />
        <StatCard
          icon={Activity}
          label="Tools Used"
          value={new Set(recentResponses.map((r) => r.tool)).size}
        />
      </div>

      <section className="mt-10">
        <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Jump back in
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {aiTools.slice(0, 6).map((tool) => {
            const Icon = toolIcons[tool.icon];
            return (
              <Button key={tool.href} asChild variant="outline" size="sm">
                <Link href={tool.href}>
                  <Icon className="size-3.5" aria-hidden="true" />
                  {tool.shortTitle}
                </Link>
              </Button>
            );
          })}
        </div>
      </section>

      <section className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
        <h2 className="flex items-center gap-2 border-b border-border px-5 py-3.5 text-sm font-semibold text-foreground">
          <Clock className="size-4 text-muted-foreground" aria-hidden="true" />
          Recent Activity
        </h2>

        {recentResponses.length === 0 ? (
          <div className="px-5 py-14 text-center">
            <Wrench
              className="mx-auto mb-3 size-8 text-muted-foreground/40"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              No activity yet. Start using our AI tools!
            </p>
            <Button asChild variant="gradient" size="sm" className="mt-5">
              <Link href="/">Browse tools</Link>
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recentResponses.map((response) => {
              const tool = toolFor(response.tool);
              const Icon = tool ? toolIcons[tool.icon] : Wrench;
              return (
                <li key={response.id}>
                  <Link
                    href={tool?.href ?? "/"}
                    className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-secondary"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-foreground">
                          {formatToolName(response.tool)}
                        </span>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">
                          {timeAgo(response.createdAt)}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-muted-foreground">
                        {response.prompt}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
