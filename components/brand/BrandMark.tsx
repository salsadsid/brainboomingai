import { cn } from "@/lib/utils";
import { BRAIN_L, BRAIN_R, BRAIN_SPLIT } from "./brainPaths";

/**
 * The brand tile: gradient rounded square with the white brain glyph.
 *
 * The gradient comes from the CSS class rather than an SVG <linearGradient>,
 * so rendering several instances on one page cannot collide on element ids.
 */
export default function BrandMark({
  className,
  glow = false,
}: {
  /** Controls the tile size — pass width/height utilities, e.g. "size-10". */
  className?: string;
  glow?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[22%] bg-brand-gradient",
        glow && "shadow-glow",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="size-[62%]" fill="none">
        <path d={BRAIN_L} fill="#fff" />
        <path d={BRAIN_R} fill="#fff" />
        <line
          x1={BRAIN_SPLIT.x}
          y1={BRAIN_SPLIT.y1}
          x2={BRAIN_SPLIT.x}
          y2={BRAIN_SPLIT.y2}
          stroke="#a855f7"
          strokeWidth={BRAIN_SPLIT.width}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/** Tile plus wordmark. `as` keeps heading semantics out of the nav chrome. */
export function BrandLockup({
  className,
  tileClassName = "size-9",
  subtitle = "AI Tools",
}: {
  className?: string;
  tileClassName?: string;
  subtitle?: string | null;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark className={tileClassName} />
      <span className="flex flex-col leading-none">
        <span className="text-[0.95rem] font-bold tracking-tight text-foreground">
          BRAIN BOOMING
        </span>
        {subtitle && (
          <span className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {subtitle}
          </span>
        )}
      </span>
    </span>
  );
}
