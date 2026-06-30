import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";

import authConfig from "@/auth.config";
import clientPromise from "@/lib/mongodb-client";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

// SMTP port: 465 uses implicit TLS, 587 uses STARTTLS.
const emailPort = Number(process.env.EMAIL_SERVER_PORT ?? 465);

const config: NextAuthConfig = {
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise) as NextAuthConfig["adapter"],
  session: { strategy: "jwt" },
  providers: [
    Google,
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST ?? "smtp.gmail.com",
        port: emailPort,
        secure: emailPort === 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await dbConnect();
        const user = await User.findOne({
          email: credentials.email,
        }).select("+password");

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isValid) return null;

        if (!user.isActive) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id!;
        token.role = user.role ?? "user";
      }

      if (trigger === "update") {
        await dbConnect();
        const dbUser = await User.findById(token.id).select("role").lean<{
          role: "user" | "admin";
        }>();
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "user" | "admin";
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      await dbConnect();
      await User.findOneAndUpdate(
        { email: user.email },
        { $setOnInsert: { role: "user", isActive: true } },
        { upsert: false }
      );
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
