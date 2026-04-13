import SignUpForm from "@/components/auth/SignUpForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Brain Booming",
  description: "Create your free Brain Booming account",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
