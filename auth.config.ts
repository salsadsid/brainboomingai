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
  },
  providers: [], // Providers are defined in auth.ts, not here
} satisfies NextAuthConfig;
