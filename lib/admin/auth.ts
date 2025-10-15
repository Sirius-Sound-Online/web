import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Check if the current user is an admin
 * @param email - User email to check
 * @returns boolean indicating if user is admin
 */
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not configured in environment variables");
    return false;
  }
  return email.toLowerCase() === adminEmail.toLowerCase();
}

/**
 * Require admin access or redirect to home
 * Use this in Server Components
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !isAdmin(session.user.email)) {
    redirect("/");
  }

  return session;
}

/**
 * Check admin access without redirecting
 * Use this when you need to conditionally show/hide UI
 */
export async function checkAdminAccess(): Promise<boolean> {
  const session = await getServerSession(authOptions);
  return isAdmin(session?.user?.email);
}

/**
 * Get admin session or null
 * Use this when admin access is optional
 */
export async function getAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return null;
  }

  return session;
}
