export const instant = false;
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiMapPin,
  FiUser,
  FiActivity,
} from "react-icons/fi";

import { requireRole } from "@/lib/dashboard-auth";
import { getCustomerBookings } from "@/lib/action/api";
import type { Booking } from "@/lib/types/service";

import PageHeader from "@/components/dashboard/ui/PageHeader";
import StatCard from "@/components/dashboard/ui/StatCard";
import SectionCard from "@/components/dashboard/ui/SectionCard";
import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import EmptyState from "@/components/dashboard/ui/EmptyState";
import MiniBarChart from "@/components/dashboard/ui/MiniBarChart";
import QuickAction from "@/components/dashboard/ui/QuickAction";
import { Suspense } from "react";
import CustomerOverviewSkeleton from "@/components/dashboard/customer/CustomerOverviewSkeleton";

export default function CustomerOverviewPage() {
  return (
    <Suspense fallback={<CustomerOverviewSkeleton />}>
      <CustomerOverviewContent />
    </Suspense>
  );
}
 async function CustomerOverviewContent() {
  const session = await requireRole("customer");

  let bookings: Booking[] = [];

  try {
    bookings = await getCustomerBookings();
  } catch (error) {
    console.error("Failed to fetch customer bookings:", error);
  }

  // Booking Statistics
  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "rejected"
  ).length;

  // Recent Bookings
  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Your Wedding Journey"
        title="Overview"
        description={`Welcome back, ${session.user.name}. Let's plan your special day.`}
        action={
          <Link
            href="/services"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#3A76EF] px-4 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(58,118,239,0.9)] transition-all duration-200 hover:bg-[#2F63D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/40 focus-visible:ring-offset-2"
          >
            <FiShoppingBag className="size-4" />
            Browse Services
          </Link>
        }
      />

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Bookings"
          value={totalBookings}
          hint="All booking requests"
          icon={FiShoppingBag}
          tone="blue"
        />

        <StatCard
          label="Pending Bookings"
          value={pendingBookings}
          hint="Waiting for vendor response"
          icon={FiClock}
          tone="sky"
        />

        <StatCard
          label="Accepted Bookings"
          value={acceptedBookings}
          hint="Confirmed bookings"
          icon={FiCheckCircle}
          tone="mint"
        />

        <StatCard
          label="Rejected Bookings"
          value={rejectedBookings}
          hint="Rejected requests"
          icon={FiXCircle}
          tone="rose"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Recent Bookings */}
        <SectionCard
          className="lg:col-span-2"
          title="Recent bookings"
          description="Your latest booking requests"
          icon={FiCalendar}
          action={
            <Link
              href="/dashboard/customer/my-bookings"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#3A76EF] transition-colors hover:text-[#2F63D4]"
            >
              View all
              <FiArrowRight className="size-3.5" />
            </Link>
          }
        >
          {recentBookings.length === 0 ? (
            <EmptyState
              icon={FiCalendar}
              title="No bookings yet"
              description="Start exploring wedding services for your special day."
              action={
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#3A76EF] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2F63D4]"
                >
                  <FiShoppingBag className="size-3.5" />
                  Browse Services
                </Link>
              }
            />
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col gap-3 rounded-2xl border border-[#EDF0F8] bg-[#FCFDFF] p-3 transition-colors duration-200 hover:border-[#DCE6FF] hover:bg-white sm:flex-row sm:items-center"
                >
                  {/* Service Image */}
                  <div className="h-32 w-full overflow-hidden rounded-xl bg-[#EEF4FF] sm:size-20 sm:shrink-0">
                    {booking.service?.images?.[0] ? (
                      <img
                        src={booking.service.images[0]}
                        alt={booking.service.serviceName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#3A76EF]">
                        <FiShoppingBag className="size-6" />
                      </div>
                    )}
                  </div>

                  {/* Booking Details */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-[#252B45]">
                      {booking.service?.serviceName || "Wedding Service"}
                    </h3>

                    <p className="mt-1 text-xs text-[#7A839B]">
                      Vendor: {booking.vendor?.name || "Vendor"}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#5B6478]">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="size-3.5 text-[#3A76EF]" />
                        {booking.eventDate}
                      </span>

                      <span className="flex items-center gap-1">
                        <FiMapPin className="size-3.5 text-[#3A76EF]" />
                        {booking.eventLocation}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <StatusBadge status={booking.status} className="shrink-0" />
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Booking Status Overview */}
        <SectionCard
          title="Booking status"
          description="A quick breakdown of your requests."
          icon={FiActivity}
        >
          <MiniBarChart
            items={[
              {
                label: "Pending",
                value: pendingBookings,
                color: "bg-[#62C7FF]",
              },
              {
                label: "Accepted",
                value: acceptedBookings,
                color: "bg-[#6ED4B1]",
              },
              {
                label: "Rejected",
                value: rejectedBookings,
                color: "bg-[#F3A6A6]",
              },
            ]}
            emptyLabel="Your booking breakdown will appear here."
          />

          <div className="mt-6 rounded-xl border border-[#EDF0F8] bg-[#F9FAFF] p-4">
            <div className="flex items-center gap-2">
              <FiUser className="size-4 text-[#3A76EF]" />
              <p className="text-xs font-semibold text-[#252B45]">
                Planning tip
              </p>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-[#7A839B]">
              Keep your event date and location updated so vendors can respond
              faster to your requests.
            </p>
          </div>
        </SectionCard>
      </div>

      {/* Quick Actions */}
      <SectionCard
        title="Start planning"
        description="Find the right vendors and keep your bookings organised."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <QuickAction
            title="Browse Services"
            description="Discover wedding vendors"
            href="/services"
            icon={FiShoppingBag}
            tone="blue"
          />

          <QuickAction
            title="My Bookings"
            description="Track booking requests"
            href="/dashboard/customer/my-bookings"
            icon={FiCalendar}
            tone="purple"
          />

          <QuickAction
            title="My Profile"
            description="Manage your account details"
            href="/dashboard/customer/profile"
            icon={FiUser}
            tone="mint"
          />
        </div>
      </SectionCard>
    </div>
  );
}
