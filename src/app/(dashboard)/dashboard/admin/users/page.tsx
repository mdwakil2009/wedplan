import { Suspense } from "react";

import { requireRole } from "@/lib/dashboard-auth";
import { getAdminUsers } from "@/lib/action/api";

import AdminUsersTable from "@/components/dashboard/admin/AdminUsersTable";
import AdminUsersSkeleton from "@/components/dashboard/admin/AdminUsersSkeleton";
import PageHeader from "@/components/dashboard/ui/PageHeader";

export default function AdminUsersPage() {
  return (
    <Suspense fallback={<AdminUsersSkeleton />}>
      <AdminUsersContent />
    </Suspense>
  );
}

async function AdminUsersContent() {
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
      <AdminUsersTable users={users} />
    </div>
  );
}