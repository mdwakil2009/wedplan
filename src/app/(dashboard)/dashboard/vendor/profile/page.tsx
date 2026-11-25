import ProfileClient from "@/components/dashboard/ProfileClient";
import { requireRole } from "@/lib/dashboard-auth";

export const instant = false;

export default async function VendorProfilePage() {
  const session = await requireRole("vendor");
  const user = session.user;

  return (
    <div className="min-h-full bg-[#F9FAFF] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ProfileClient
          name={user.name ?? ""}
          email={user.email ?? ""}
          image={user.image}
          role={user.role ?? "vendor"}
        />
      </div>
    </div>
  );
}
