import { requireRole } from "@/lib/dashboard-auth";

export const instant = false;

export default async function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("customer");

  return <>{children}</>;
}
