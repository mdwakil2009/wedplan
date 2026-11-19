import { requireRole } from "@/lib/dashboard-auth";

export const instant = false;

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("vendor");

  return <>{children}</>;
}
