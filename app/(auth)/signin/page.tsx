import SignInForm from "@/components/auth/SignInForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Brain Booming",
  description: "Sign in to your Brain Booming account",
};

export default function SignInPage() {
  return <SignInForm />;
}
