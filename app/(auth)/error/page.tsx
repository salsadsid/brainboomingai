"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const errorMessages: Record<string, string> = {
  Configuration: "There is a problem with the server configuration.",
  AccessDenied: "Access denied. You do not have permission to sign in.",
  Verification: "The verification link has expired or has already been used.",
  Default: "An unexpected error occurred. Please try again.",
};

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "Default";
  const message = errorMessages[error] ?? errorMessages.Default;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center">
      <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Authentication Error
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">{message}</p>
      <Link href="/signin">
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          Back to Sign In
        </Button>
      </Link>
    </div>
  );
}
