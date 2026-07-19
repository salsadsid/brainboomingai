import SignUpForm from "@/components/auth/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your free Brain Booming account",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
