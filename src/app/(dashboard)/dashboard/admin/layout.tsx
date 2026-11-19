import { requireRole } from "@/lib/dashboard-auth";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("admin");

  return <>{children}</>;
}
