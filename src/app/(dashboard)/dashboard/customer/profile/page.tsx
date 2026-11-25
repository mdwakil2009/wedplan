import { requireRole } from "@/lib/dashboard-auth";
import ProfileClient from "@/components/dashboard/ProfileClient";

export default async function CustomerProfilePage() {
  const session = await requireRole("customer");
  const user = session.user;

  return (
    <div className="mx-auto w-full max-w-3xl p-4 sm:p-6 lg:p-8">
      <ProfileClient
        name={user.name}
        email={user.email}
        image={user.image}
        role="customer"
      />
    </div>
  );
}
