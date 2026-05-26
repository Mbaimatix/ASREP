import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import type { Role } from "@prisma/client";

/**
 * ASREP Africa — NextAuth v5 Configuration
 *
 * Uses Credentials provider with bcrypt-hashed passwords stored in PostgreSQL.
 * User role is injected into the JWT and available on the session object.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "ASREP Staff Login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@asrepafrica.org" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!passwordMatch) return null;

        // Update last login timestamp
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    // Inject role into JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.role = (user as { role: Role }).role;
      }
      return token;
    },

    // Expose role on the client session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as { role: Role }).role = token.role as Role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours — staff session
  },
});

// Type augmentation — makes session.user.role available globally
declare module "next-auth" {
  interface User {
    role: Role;
  }
  interface Session {
    user: {
      id: string;
      role: Role;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}
