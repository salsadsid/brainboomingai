import BrandMark from "@/components/brand/BrandMark";

export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5"
    >
      <BrandMark className="size-14 animate-glow-pulse" glow />
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  );
}
