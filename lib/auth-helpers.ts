import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  return session.user;
}

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) redirect("/signin");
  if (session.user.role !== "admin") redirect("/");
  return session.user;
}
