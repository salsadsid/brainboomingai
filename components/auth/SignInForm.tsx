"use client";

import GoogleButton from "@/components/auth/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, LogIn, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [magicEmail, setMagicEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [mode, setMode] = useState<"credentials" | "magic">("credentials");

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password.");
      } else {
        toast.success("Welcome back!");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setMagicLoading(true);
    try {
      await signIn("email", {
        email: magicEmail,
        callbackUrl,
      });
    } catch {
      toast.error("Failed to send magic link.");
      setMagicLoading(false);
    }
  };

  const handleGoogle = () => {
    signIn("google", { callbackUrl });
  };

  const tabClass = (active: boolean) =>
    cn(
      "flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
      active
        ? "bg-background text-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground"
    );

  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <div className="mb-7 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome Back
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Sign in to your Brain Booming account
        </p>
      </div>

      <GoogleButton onClick={handleGoogle} />

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-card px-3 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
            or
          </span>
        </div>
      </div>

      {/* Segmented control replaces the two ghost/default buttons, which gave
          no clear indication of which mode was active. */}
      <div
        role="tablist"
        aria-label="Sign-in method"
        className="mb-6 flex gap-1 rounded-lg border border-border bg-muted p-1"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "credentials"}
          onClick={() => setMode("credentials")}
          className={tabClass(mode === "credentials")}
        >
          Email &amp; Password
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "magic"}
          onClick={() => setMode("magic")}
          className={tabClass(mode === "magic")}
        >
          Magic Link
        </button>
      </div>

      {mode === "credentials" ? (
        <form onSubmit={handleCredentials} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogIn className="size-4" />
            )}
            Sign In
          </Button>
        </form>
      ) : (
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="magic-email">Email</Label>
            <Input
              id="magic-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={magicEmail}
              onChange={(e) => setMagicEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={magicLoading}
            className="w-full"
          >
            {magicLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Mail className="size-4" />
            )}
            Send Magic Link
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            We&apos;ll send a sign-in link to your email
          </p>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
