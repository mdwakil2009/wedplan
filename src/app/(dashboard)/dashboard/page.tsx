import { redirect } from "next/navigation";
import {
  dashboardHome,
  getDashboardSession,
  getRole,
} from "@/lib/dashboard-auth";

export const instant = false;

export default async function DashboardPage() {
  const session = await getDashboardSession();

  redirect(dashboardHome(getRole(session.user.role)));
}
