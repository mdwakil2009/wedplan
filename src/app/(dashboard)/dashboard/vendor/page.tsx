
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiCreditCard,
  FiPlusCircle,
  FiShoppingBag,
  FiClock,
  FiTrendingUp,
  FiActivity,
  FiLayers,
} from "react-icons/fi";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { requireRole } from "@/lib/dashboard-auth";

import PageHeader from "@/components/dashboard/ui/PageHeader";
import StatCard from "@/components/dashboard/ui/StatCard";
import SectionCard from "@/components/dashboard/ui/SectionCard";
import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import EmptyState from "@/components/dashboard/ui/EmptyState";
import MiniBarChart from "@/components/dashboard/ui/MiniBarChart";
import QuickAction from "@/components/dashboard/ui/QuickAction";
import VendorOverviewSkeleton from "@/components/dashboard/Vendor/VendorOverviewSkeleton";
import { Suspense } from "react";
export const instant = false;

interface Service {
  _id: string;
  serviceName?: string;
  status?: string;
  category?: string;
  price?: number;
  createdAt?: string;
}
export default function VendorOverviewPage() {
  return (
    <Suspense fallback={<VendorOverviewSkeleton />}>
      <VendorOverviewContent />
    </Suspense>
  );
}
async function VendorOverviewContent() {
  const session = await requireRole("vendor");

  // Get JWT token from Better Auth
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  // Get latest subscription plan from MongoDB
  const userRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${session.user.id}`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
      cache: "no-store",
    }
  );

  const userData = userRes.ok ? await userRes.json() : null;

  const subscriptionPlan =
    userData?.user?.subscriptionPlan || "Free";

  const isPremium = subscriptionPlan.toLowerCase() === "premium";

  const subscriptionLabel = isPremium ? "Premium" : "Free";

  let services: Service[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-services`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenData.token}`,
        },
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();

      // Handle API response
      services = Array.isArray(data) ? data : data.services || [];
    } else {
      const errorData = await res.json().catch(() => null);

      console.error(
        "Failed to fetch vendor services:",
        res.status,
        errorData
      );
    }
  } catch (error) {
    console.error("Vendor services fetch error:", error);
  }

  const totalServices = services.length;

  const activeServices = services.filter(
    (service) =>
      service.status?.toLowerCase() === "active" ||
      service.status?.toLowerCase() === "approved"
  ).length;

  const pendingServices = services.filter(
    (service) => service.status?.toLowerCase() === "pending"
  ).length;

  const rejectedServices = services.filter(
    (service) => service.status?.toLowerCase() === "rejected"
  ).length;

  const recentServices = [...services]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 4);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Vendor Workspace"
        title="Dashboard Overview"
        description={`Welcome back, ${session.user.name}. Here's an overview of your wedding business.`}
        action={
          <Link
            href="/dashboard/vendor/add-service"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#3A76EF] px-4 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(58,118,239,0.9)] transition-all duration-200 hover:bg-[#2F63D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/40 focus-visible:ring-offset-2"
          >
            <FiPlusCircle className="size-4" />
            Add New Service
          </Link>
        }
      />

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Services"
          value={totalServices}
          hint="Services you've created"
          icon={FiShoppingBag}
          tone="purple"
        />

        <StatCard
          label="Active Services"
          value={activeServices}
          hint="Approved and visible"
          icon={FiCheckCircle}
          tone="mint"
        />

        <StatCard
          label="Pending Services"
          value={pendingServices}
          hint="Waiting for approval"
          icon={FiClock}
          tone="amber"
        />

        <StatCard
          label="Subscription"
          value={subscriptionLabel}
          hint="Your current membership"
          icon={FiCreditCard}
          tone="blue"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Service status */}
        <SectionCard
          title="Service status"
          description="How your portfolio is performing."
          icon={FiActivity}
        >
          <MiniBarChart
            items={[
              {
                label: "Approved",
                value: activeServices,
                color: "bg-[#6ED4B1]",
              },
              {
                label: "Pending",
                value: pendingServices,
                color: "bg-[#62C7FF]",
              },
              {
                label: "Rejected",
                value: rejectedServices,
                color: "bg-[#F3A6A6]",
              },
            ]}
            emptyLabel="Add your first service to see its status here."
          />

          <div className="mt-6 rounded-xl border border-[#EDF0F8] bg-[#F9FAFF] p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A93A8]">
                  Current plan
                </p>
                <p className="mt-1 text-sm font-bold text-[#252B45]">
                  {subscriptionLabel}
                </p>
              </div>

              <StatusBadge status={isPremium ? "premium" : "free"} />
            </div>

            <Link
              href="/dashboard/vendor/subscription"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#3A76EF] transition-colors hover:text-[#2F63D4]"
            >
              {isPremium ? "View plan" : "Upgrade plan"}
              <FiArrowRight className="size-3.5" />
            </Link>
          </div>
        </SectionCard>

        {/* Quick actions */}
        <SectionCard
          className="lg:col-span-2"
          title="Quick actions"
          description="Everything you need to manage your vendor account."
          icon={FiTrendingUp}
        >
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <QuickAction
              title="Add New Service"
              description="Showcase a new wedding service."
              href="/dashboard/vendor/add-service"
              icon={FiPlusCircle}
              tone="blue"
            />

            <QuickAction
              title="My Services"
              description="Manage your listings and approvals."
              href="/dashboard/vendor/my-services"
              icon={FiShoppingBag}
              tone="purple"
            />

            <QuickAction
              title="Booking Requests"
              description="Review and respond to customers."
              href="/dashboard/vendor/booking-requests"
              icon={FiCalendar}
              tone="mint"
            />
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#DCE6FF] bg-[#EEF4FF] p-4">
            <FiLayers className="mt-0.5 size-4 shrink-0 text-[#3A76EF]" />

            <div>
              <p className="text-xs font-bold text-[#252B45]">
                Keep your portfolio fresh
              </p>
              <p className="mt-1 text-[11px] leading-5 text-[#5B6478]">
                Approved services appear in customer search. Update your photos
                and pricing regularly to stay competitive.
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Recent services */}
      <SectionCard
        title="Recent services"
        description="A quick look at your latest service listings."
        icon={FiShoppingBag}
        action={
          <Link
            href="/dashboard/vendor/my-services"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#3A76EF] transition-colors hover:text-[#2F63D4]"
          >
            View all
            <FiArrowRight className="size-3.5" />
          </Link>
        }
      >
        {totalServices === 0 ? (
          <EmptyState
            icon={FiShoppingBag}
            title="No services yet"
            description="Start building your portfolio by adding your first service."
            action={
              <Link
                href="/dashboard/vendor/add-service"
                className="inline-flex items-center gap-2 rounded-xl bg-[#3A76EF] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2F63D4]"
              >
                <FiPlusCircle className="size-3.5" />
                Create Your First Service
              </Link>
            }
          />
        ) : (
          <div className="space-y-2.5">
            {recentServices.map((service) => (
              <div
                key={service._id}
                className="flex flex-col gap-3 rounded-xl border border-[#EDF0F8] bg-[#FCFDFF] p-3.5 transition-colors duration-200 hover:border-[#DCE6FF] hover:bg-white sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3A76EF]">
                    <FiShoppingBag className="size-4" />
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#252B45]">
                      {service.serviceName || "Wedding Service"}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#8A93A8]">
                      {service.category || "Uncategorised"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:justify-end">
                  <span className="text-sm font-bold text-[#252B45]">
                    ৳{Number(service.price || 0).toLocaleString()}
                  </span>

                  <StatusBadge status={service.status || "pending"} />
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}
