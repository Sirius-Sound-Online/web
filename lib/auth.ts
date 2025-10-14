import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/community",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    EmailProvider({
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        const { sendMail } = await import("@/lib/mailer");
        await sendMail({
          to: identifier,
          subject: "Your Sirius/Serious Sound magic link",
          html: `<p>Sign in to Sirius/Serious Sound:</p><p><a href="${url}">${url}</a></p>`,
        });
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role as "member" | "admin" | "partner";
        session.user.waitlistPosition = user.waitlistPosition;
      }
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.waitlistEntry.updateMany({
        where: { email: user.email ?? undefined },
        data: {
          userId: user.id,
        },
      });
    },
  },
};
