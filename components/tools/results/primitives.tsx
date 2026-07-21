import { Badge } from "@/components/ui/badge";
import type { Correction } from "@/lib/toolResults";
import { characterCount } from "@/utils/characterCount";
import { wordCount } from "@/utils/wordCount";
import { ArrowRight } from "lucide-react";

/**
 * Shared building blocks for the per-tool result views.
 *
 * Word and character counts are taken from the tool's actual output field.
 * They used to be computed over the model's raw HTML, so tag names counted as
 * words and every figure shown to the user was inflated.
 */

export function ResultBody({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 space-y-5 overflow-y-auto p-4">{children}</div>;
}

/** The whitespace-preserving block that holds a tool's primary text output. */
export function PrimaryText({ text }: { text: string }) {
  return (
    <p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed text-foreground">
      {text}
    </p>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </h3>
  );
}

/** Footer stat strip. `extra` carries the tool-specific figure, if any. */
export function ResultStats({
  text,
  extra,
}: {
  text: string;
  extra?: string | null;
}) {
  return (
    <p className="shrink-0 border-t border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">
      {[extra, `${wordCount(text)} words`, `${characterCount(text)} chars`]
        .filter(Boolean)
        .join(" · ")}
    </p>
  );
}

export function CorrectionList({ corrections }: { corrections: Correction[] }) {
  if (!corrections.length) return null;

  return (
    <div>
      <SectionLabel>Corrections</SectionLabel>
      <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {corrections.map((c, i) => (
          <li
            key={`${c.original}-${i}`}
            className="flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-2 text-sm"
          >
            <span className="text-muted-foreground line-through decoration-destructive/60">
              {c.original}
            </span>
            <ArrowRight
              className="size-3 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <span className="font-medium text-success">{c.corrected}</span>
            {c.type && (
              <Badge variant="outline" size="sm" className="ml-auto shrink-0">
                {c.type}
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BulletList({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  if (!items.length) return null;

  return (
    <div>
      <SectionLabel>{label}</SectionLabel>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="mt-[0.5rem] size-1.5 shrink-0 rounded-full bg-primary"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Score dial for the originality analyzer. Drawn with an SVG arc rather than a
 * chart library — one number does not justify a dependency.
 */
export function ScoreGauge({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(score)));
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circumference;

  // Low originality is the finding worth flagging, so the colour tracks it.
  const tone =
    clamped >= 70
      ? "text-success"
      : clamped >= 40
        ? "text-primary"
        : "text-destructive";

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            strokeWidth="7"
            className="stroke-border"
          />
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform="rotate(-90 44 44)"
            className={`${tone} stroke-current transition-[stroke-dasharray] duration-700`}
          />
        </svg>
        <span
          className={`absolute inset-0 flex items-center justify-center font-mono text-xl font-bold ${tone}`}
        >
          {clamped}
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">
          Originality score
        </p>
        <p className="text-xs text-muted-foreground">
          {clamped}/100 — higher means a more original, human voice
        </p>
      </div>
    </div>
  );
}
