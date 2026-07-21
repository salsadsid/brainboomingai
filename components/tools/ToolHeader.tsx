import { Badge } from "@/components/ui/badge";
import { allTools } from "@/config/constants";
import { toolIcons } from "@/config/toolIcons";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Compact title bar for a tool page.
 *
 * Reads config/constants.ts rather than carrying its own copy of the titles —
 * the previous (tools)/layout.tsx held a parallel `toolsData` map with its own
 * titles, descriptions and emoji, which had already drifted from the registry.
 *
 * Renders the page's single <h1>, on the server, so the heading is in the
 * initial HTML rather than appearing after client hydration.
 */
export default function ToolHeader({ href }: { href: string }) {
  const tool = allTools.find((t) => t.href === href);
  if (!tool) return null;

  const Icon = toolIcons[tool.icon];

  return (
    <div className="mb-8">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="size-3.5" />
          </li>
          <li className="truncate text-foreground">{tool.shortTitle}</li>
        </ol>
      </nav>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {tool.title}
        </h1>
        <Badge variant="outline" size="sm" className="shrink-0">
          Free · No signup
        </Badge>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {tool.description}
      </p>
    </div>
  );
}
