"use client";

import { Button } from "@/components/ui/button";
import { BookmarkPlus, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AuthCTA() {
  const { data: session } = useSession();

  if (session?.user) return null;

  return (
    <div className="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-800">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookmarkPlus className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
            Want to save this result?
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Sign up to keep your history and access all your results anytime.
          </p>
          <div className="flex gap-2">
            <Link href="/signup">
              <Button
                size="sm"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Sign Up Free
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="sm" variant="outline" className="text-xs">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
