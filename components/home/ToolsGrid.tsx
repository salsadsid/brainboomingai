import type { ToolDef } from "@/config/constants";
import { toolIcons } from "@/config/toolIcons";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Server component. Cards previously animated in via framer-motion on scroll,
 * which meant the entire grid — the page's primary internal-linking surface —
 * shipped as a client bundle to fade in.
 */
/**
 * Icon chip tints, cycled across the grid so a row of cards is not a row of
 * identical indigo squares. Written as complete class strings because Tailwind
 * scans source text — an interpolated `bg-brand-${n}/10` would never be built.
 */
const CHIP_TINTS = [
  "bg-brand-1/10 text-brand-1 group-hover:bg-brand-1/20",
  "bg-brand-2/10 text-brand-2 group-hover:bg-brand-2/20",
  "bg-brand-3/10 text-brand-3 group-hover:bg-brand-3/20",
];

export default function ToolsGrid({
  tools,
  columns = 4,
}: {
  tools: ToolDef[];
  columns?: 3 | 4;
}) {
  const gridCols =
    columns === 3
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <ul className={`grid grid-cols-1 gap-4 ${gridCols}`}>
      {tools.map((tool, i) => {
        const Icon = toolIcons[tool.icon];
        return (
          <li
            key={tool.href}
            className="animate-fade-up"
            // Capped so the last card in a long list is not left waiting.
            style={{ animationDelay: `${Math.min(i, 7) * 50}ms` }}
          >
            <Link
              href={tool.href}
              className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-glow-inset transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-elevated hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`flex size-11 items-center justify-center rounded-lg transition-colors ${
                    CHIP_TINTS[i % CHIP_TINTS.length]
                  }`}
                >
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-primary"
                />
              </div>

              <h3 className="mt-4 text-[0.95rem] font-semibold text-foreground transition-colors group-hover:text-primary">
                {tool.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
