
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type Role = "admin" | "vendor" | "customer";

export function dashboardHome(role: Role) {
  return `/dashboard/${role}`;
}

export function getRole(role: string | null | undefined): Role {
  if (role === "admin" || role === "vendor" || role === "customer") {
    return role;
  }

  return "customer";
}

export async function getDashboardSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  // Check blocked user
  if (session.user.isBlocked) {
    redirect("/blocked");
  }

  return session;
}

export async function requireRole(role: Role) {
  const session = await getDashboardSession();
  const userRole = getRole(session.user.role);

  if (userRole !== role) {
    redirect(dashboardHome(userRole));
  }

  return session;
}
