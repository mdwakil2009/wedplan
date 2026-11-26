import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { requireRole } from "@/lib/dashboard-auth";
import { getAdminOverview } from "@/lib/action/api";

import {
  FiUsers,
  FiUserCheck,
  FiUser,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiArrowRight,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

import PageHeader from "@/components/dashboard/ui/PageHeader";
import StatCard from "@/components/dashboard/ui/StatCard";
import SectionCard from "@/components/dashboard/ui/SectionCard";
import MiniBarChart from "@/components/dashboard/ui/MiniBarChart";
import QuickAction from "@/components/dashboard/ui/QuickAction";
import { Suspense } from "react";
import AdminOverviewSkeleton from "@/components/dashboard/admin/AdminOverviewSkeleton";
export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<AdminOverviewSkeleton />}>
      <AdminDashboardContent />
    </Suspense>
  );
}

async function AdminDashboardContent() {
  await requireRole("admin");

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  console.log("ADMIN JWT TOKEN:", tokenData.token);

  let stats = {
    totalUsers: 0,
    totalVendors: 0,
    totalCustomers: 0,
    totalServices: 0,
    pendingServices: 0,
    totalTransactions: 0,
  };

  try {
    stats = await getAdminOverview();
  } catch (error) {
    console.error("Failed to fetch admin overview:", error);
  }

  const approvedServices = Math.max(
    stats.totalServices - stats.pendingServices,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Admin Workspace"
        title="Platform Overview"
        description="Monitor your wedding marketplace, review service approvals and keep the community growing from one place."
        action={
          <Link
            href="/dashboard/admin/manage-services"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#3A76EF] px-4 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(58,118,239,0.9)] transition-all duration-200 hover:bg-[#2F63D4] hover:shadow-[0_14px_26px_-12px_rgba(58,118,239,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/40 focus-visible:ring-offset-2"
          >
            Manage Services
            <FiArrowRight className="size-4" />
          </Link>
        }
      />

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Users"
          value={stats.totalUsers}
          hint="Registered platform accounts"
          icon={FiUsers}
          tone="blue"
        />

        <StatCard
          label="Total Vendors"
          value={stats.totalVendors}
          hint="Wedding businesses onboard"
          icon={FiUserCheck}
          tone="sky"
        />

        <StatCard
          label="Total Customers"
          value={stats.totalCustomers}
          hint="Couples planning with WedPlan"
          icon={FiUser}
          tone="white"
        />

        <StatCard
          label="Total Services"
          value={stats.totalServices}
          hint="Listings across the marketplace"
          icon={FiBriefcase}
          tone="purple"
        />

        <StatCard
          label="Pending Services"
          value={stats.pendingServices}
          hint="Waiting for admin review"
          icon={FiClock}
          tone="amber"
        />

        <StatCard
          label="Total Transactions"
          value={stats.totalTransactions}
          hint="Recorded subscription payments"
          icon={FiDollarSign}
          tone="mint"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Platform composition */}
        <SectionCard
          className="lg:col-span-2"
          title="Platform activity"
          description="A live snapshot built from your current platform data."
          icon={FiActivity}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#8A93A8]">
                Community mix
              </h3>

              <div className="mt-4">
                <MiniBarChart
                  items={[
                    {
                      label: "Vendors",
                      value: stats.totalVendors,
                      color: "bg-[#62C7FF]",
                    },
                    {
                      label: "Customers",
                      value: stats.totalCustomers,
                      color: "bg-[#6ED4B1]",
                    },
                  ]}
                  emptyLabel="No community accounts yet."
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#8A93A8]">
                Service pipeline
              </h3>

              <div className="mt-4">
                <MiniBarChart
                  items={[
                    {
                      label: "Approved",
                      value: approvedServices,
                      color: "bg-[#3A76EF]",
                    },
                    {
                      label: "Pending",
                      value: stats.pendingServices,
                      color: "bg-[#A66DD4]",
                    },
                  ]}
                  emptyLabel="No services submitted yet."
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 border-t border-[#EDF0F8] pt-5 sm:grid-cols-3">
            <div className="rounded-xl bg-[#F9FAFF] p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8A93A8]">
                Community
              </p>
              <p className="mt-1.5 text-lg font-bold text-[#252B45]">
                {stats.totalUsers}
              </p>
            </div>

            <div className="rounded-xl bg-[#F9FAFF] p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8A93A8]">
                Listings
              </p>
              <p className="mt-1.5 text-lg font-bold text-[#252B45]">
                {stats.totalServices}
              </p>
            </div>

            <div className="rounded-xl bg-[#F9FAFF] p-3.5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8A93A8]">
                Approvals due
              </p>
              <p className="mt-1.5 text-lg font-bold text-[#252B45]">
                {stats.pendingServices}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Quick actions */}
        <SectionCard
          title="Quick actions"
          description="Jump straight into the areas you manage most."
          icon={FiTrendingUp}
        >
          <div className="space-y-3">
            <QuickAction
              title="Manage Users"
              description="Review roles, activity and access."
              href="/dashboard/admin/users"
              icon={FiUsers}
              tone="blue"
            />

            <QuickAction
              title="Manage Services"
              description="Approve, reject or update listings."
              href="/dashboard/admin/manage-services"
              icon={FiBriefcase}
              tone="purple"
            />

            <QuickAction
              title="View Transactions"
              description="Track subscription payment records."
              href="/dashboard/admin/transactions"
              icon={FiDollarSign}
              tone="mint"
            />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
