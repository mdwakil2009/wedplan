import { requireRole } from "@/lib/dashboard-auth";
import { getAdminServices } from "@/lib/action/api";
import AdminServicesTable from "@/components/dashboard/admin/AdminServicesTable";
import PageHeader from "@/components/dashboard/ui/PageHeader";

export default async function AdminServicesPage() {
  await requireRole("admin");

  let services = [];

  try {
    services = await getAdminServices();
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Admin Workspace"
        title="Manage Services"
        description="Review, approve, reject and manage vendor services."
      />

      {/* Services Table */}
      <AdminServicesTable services={services} />
    </div>
  );
}
