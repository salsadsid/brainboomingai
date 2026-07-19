import type { Metadata } from "next";

/**
 * Everything under (protected) is per-user or admin-only. Setting robots here
 * cascades to every child segment, so no individual page can forget it.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
