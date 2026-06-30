"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Loader2 } from "lucide-react";
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
      await signIn("nodemailer", {
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

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
          <LogIn className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome Back
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Sign in to your Brain Booming account
        </p>
      </div>

      {/* Google */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogle}
        className="w-full mb-6 py-5 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">
            or
          </span>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          type="button"
          variant={mode === "credentials" ? "default" : "ghost"}
          size="sm"
          onClick={() => setMode("credentials")}
          className="flex-1 text-xs"
        >
          Email & Password
        </Button>
        <Button
          type="button"
          variant={mode === "magic" ? "default" : "ghost"}
          size="sm"
          onClick={() => setMode("magic")}
          className="flex-1 text-xs"
        >
          <Mail className="w-3 h-3 mr-1" />
          Magic Link
        </Button>
      </div>

      {mode === "credentials" ? (
        <form onSubmit={handleCredentials} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
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
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-5"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <LogIn className="w-4 h-4 mr-2" />
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
              placeholder="you@example.com"
              value={magicEmail}
              onChange={(e) => setMagicEmail(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            disabled={magicLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-5"
          >
            {magicLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Send Magic Link
          </Button>
          <p className="text-xs text-center text-slate-500 dark:text-slate-400">
            We&apos;ll send a sign-in link to your email
          </p>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
