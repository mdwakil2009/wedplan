import { requireRole } from "@/lib/dashboard-auth";
import { getAdminServices } from "@/lib/action/api";
import AdminServicesTable from "@/components/dashboard/admin/AdminServicesTable";

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
      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#378A88]">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#193F5B] sm:text-3xl">
          Manage Services
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Review, approve, reject and manage vendor services.
        </p>
      </div>

      {/* Services Table */}
      <AdminServicesTable services={services} />
    </div>
  );
}