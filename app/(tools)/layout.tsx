import React from "react";

/**
 * Shell for every tool route.
 *
 * Deliberately thin: the per-tool title, description and icon come from
 * <ToolHeader> inside each page, driven by config/constants.ts. This file used
 * to be a client component holding a hardcoded 90-line map of titles, emoji and
 * gradient pairs that duplicated — and had drifted from — the registry.
 */
export default function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="bg-grid-faint pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 [mask-image:linear-gradient(to_bottom,black,transparent)]"
      />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
