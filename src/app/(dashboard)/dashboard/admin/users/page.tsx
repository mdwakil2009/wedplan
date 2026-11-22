import { requireRole } from "@/lib/dashboard-auth";
import { getAdminUsers } from "@/lib/action/api";

import AdminUsersTable from "@/components/dashboard/admin/AdminUsersTable";

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

      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#378A88]">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#193F5B] sm:text-3xl">
          Manage Users
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage customers, vendors and platform users.
        </p>
      </div>

      {/* Users Table */}
      <AdminUsersTable users={users} />

    </div>
  );
}