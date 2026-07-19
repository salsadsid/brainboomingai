import { Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Your Email",
};

export default function VerifyRequestPage() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 text-center">
      <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Mail className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        Check Your Email
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        A sign-in link has been sent to your email address. Click the link to
        sign in to your account.
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-500">
        If you don&apos;t see the email, check your spam folder.
      </p>
    </div>
  );
}
