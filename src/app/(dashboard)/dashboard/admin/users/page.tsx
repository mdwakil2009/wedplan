import { requireRole } from "@/lib/dashboard-auth";
import { getAdminUsers } from "@/lib/action/api";

import AdminUsersTable from "@/components/dashboard/admin/AdminUsersTable";
import PageHeader from "@/components/dashboard/ui/PageHeader";

export default async function AdminUsersPage() {
  await requireRole("admin");

  let users = [];

  try {
    users = await getAdminUsers();
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Admin Workspace"
        title="Manage Users"
        description="Manage customers, vendors and platform users from one place."
      />

      {/* Users Table */}
      <AdminUsersTable users={users} />
    </div>
  );
}
