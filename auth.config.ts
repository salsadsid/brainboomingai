import type { NextAuthConfig } from "next-auth";

// Minimal auth config for middleware (Edge Runtime compatible).
// Does NOT include providers or adapter — those are in auth.ts.
// This only defines the pages and callbacks needed for route protection.
export default {
  pages: {
    signIn: "/signin",
    error: "/error",
    verifyRequest: "/verify-request",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "admin";
      const { pathname } = nextUrl;

      if (pathname.startsWith("/dashboard")) {
        return isLoggedIn;
      }

      if (pathname.startsWith("/admin")) {
        return isLoggedIn && isAdmin;
      }

      return true;
    },
    // Map custom JWT fields to the session so middleware can read them.
    // Without this, token.role is never surfaced to req.auth.user.role.
    session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
  providers: [], // Providers are defined in auth.ts, not here
} satisfies NextAuthConfig;
