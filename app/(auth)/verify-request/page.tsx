import { Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Your Email",
};

export default function VerifyRequestPage() {
  return (
    <div className="rounded-xl border border-border bg-card p-8 text-center">
      <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-xl bg-success/10 text-success">
        <Mail className="size-6" aria-hidden="true" />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Check Your Email
      </h1>
      <p className="text-muted-foreground mb-4">
        A sign-in link has been sent to your email address. Click the link to
        sign in to your account.
      </p>
      <p className="text-sm text-muted-foreground">
        If you don&apos;t see the email, check your spam folder.
      </p>
    </div>
  );
}
