// auth.config.ts
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        console.log("DEBUG AUTH ENV", {
          adminEmail,
          hasPassword: !!adminPassword,
          adminPasswordPreview: adminPassword?.slice(0, 5),
        });

        if (!adminEmail || !adminPassword) {
          console.error(
            "Admin credentials are not set in environment variables."
          );
          return null;
        }

        if (email !== adminEmail) {
          console.log("AUTH FAILED: email mismatch");
          return null;
        }

        if (password !== adminPassword) {
          console.log("AUTH FAILED: password mismatch");
          return null;
        }

        const user = {
          id: "admin",
          name: "Administrator",
          email: adminEmail,
          role: "admin" as const,
        };

        console.log("AUTH OK for", user.email);

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: (User & { role?: string }) | null;
    }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session & { user: { role?: string } };
      token: JWT & { role?: string };
    }) {
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
  trustHost: true,
} satisfies NextAuthConfig;

export default authConfig;
