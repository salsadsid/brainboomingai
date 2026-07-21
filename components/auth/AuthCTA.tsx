"use client";

import { Button } from "@/components/ui/button";
import { BookmarkPlus } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthCTA() {
  const { data: session } = useSession();

  if (session?.user) return null;

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <BookmarkPlus className="size-4" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Want to save this result?
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Create a free account to keep your history and revisit results
            anytime.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2">
        <Button asChild size="sm" variant="gradient">
          <Link href="/signup">Sign up free</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href="/signin">Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
