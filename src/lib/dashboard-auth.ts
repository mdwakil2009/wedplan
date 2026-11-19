import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type Role = "admin" | "vendor" | "customer";

// Every role has its own dashboard home page.
export function dashboardHome(role: Role) {
  return `/dashboard/${role}`;
}

// If the role is missing or unknown, treat the user as a customer.
export function getRole(role: string | null | undefined): Role {
  if (role === "admin" || role === "vendor" || role === "customer") {
    return role;
  }

  return "customer";
}

// Read the session on the server. Used by protected pages.
export async function getDashboardSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return session;
}

// Check the user's role before rendering a role's pages.
export async function requireRole(role: Role) {
  const session = await getDashboardSession();
  const userRole = getRole(session.user.role);

  if (userRole !== role) {
    redirect(dashboardHome(userRole));
  }

  return session;
}
