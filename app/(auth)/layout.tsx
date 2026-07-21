import BrandMark from "@/components/brand/BrandMark";
import type { Metadata } from "next";
import Link from "next/link";

/**
 * Auth screens are transactional and thin — indexing them wastes crawl budget
 * and competes with the pages that should rank. Cascades to all children.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-faint absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="bg-glow-orb absolute left-1/2 top-1/4 size-[32rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mx-auto mb-8 flex w-fit items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <BrandMark className="size-9" />
          <span className="text-[0.95rem] font-bold tracking-tight text-foreground">
            BRAIN BOOMING
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
}
