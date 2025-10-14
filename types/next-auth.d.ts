import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "member" | "admin" | "partner";
      waitlistPosition?: number | null;
    };
  }

  interface User {
    role?: "member" | "admin" | "partner";
    waitlistPosition?: number | null;
  }
}
