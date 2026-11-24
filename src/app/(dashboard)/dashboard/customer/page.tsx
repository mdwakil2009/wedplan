export const instant = false;
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiShoppingBag,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiMapPin,
} from "react-icons/fi";

import { requireRole } from "@/lib/dashboard-auth";
import { getCustomerBookings } from "@/lib/action/api";
import type { Booking } from "@/lib/types/service";

export default async function CustomerOverviewPage() {
  const session = await requireRole("customer");

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  console.log("CUSTOMER JWT TOKEN:", tokenData.token);

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

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: FiShoppingBag,
      note: "All booking requests",
    },
    {
      label: "Pending Bookings",
      value: pendingBookings,
      icon: FiClock,
      note: "Waiting for vendor response",
    },
    {
      label: "Accepted Bookings",
      value: acceptedBookings,
      icon: FiCheckCircle,
      note: "Confirmed bookings",
    },
    {
      label: "Rejected Bookings",
      value: rejectedBookings,
      icon: FiXCircle,
      note: "Rejected requests",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#378A88]">
          Your Wedding Journey
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#193F5B] sm:text-3xl">
          Overview
        </h1>

        <p className="mt-1.5 text-sm text-[#87939E]">
          Welcome back, {session.user.name}. Let&apos;s plan your special day.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-[#E1E8ED] bg-white p-5 shadow-[0_1px_2px_rgba(25,63,91,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C8D6E0] hover:shadow-[0_12px_28px_rgba(25,63,91,0.08)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-[#87939E]">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-semibold tracking-tight text-[#193F5B]">
                    {stat.value}
                  </p>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88] transition-colors duration-200 group-hover:bg-[#378A88] group-hover:text-white">
                  <Icon className="size-5" />
                </div>
              </div>

              <p className="mt-3 border-t border-[#EEF2F6] pt-3 text-[11px] text-[#87939E]">
                {stat.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <section className="rounded-2xl border border-[#E1E8ED] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-[#193F5B]">
              Recent Bookings
            </h2>

            <p className="mt-1 text-xs text-[#87939E]">
              Your latest booking requests
            </p>
          </div>

          <Link
            href="/dashboard/customer/my-bookings"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#378A88] transition-colors hover:text-[#2C7371]"
          >
            View All
            <FiArrowRight />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="mt-5 rounded-xl bg-[#F8FAFC] px-5 py-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88]">
              <FiCalendar className="size-5" />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#193F5B]">
              No bookings yet
            </h3>

            <p className="mt-1 text-xs text-[#87939E]">
              Start exploring wedding services for your special day.
            </p>

            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#378A88] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2C7371]"
            >
              <FiShoppingBag />
              Browse Services
            </Link>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {recentBookings.map((booking) => (
              <div
                key={booking._id}
                className="flex flex-col gap-3 rounded-xl border border-[#E1E8ED] p-3 sm:flex-row sm:items-center"
              >
                {/* Service Image */}
                <div className="h-32 w-full overflow-hidden rounded-lg bg-slate-100 sm:size-20 sm:shrink-0">
                  {booking.service?.images?.[0] ? (
                    <img
                      src={booking.service.images[0]}
                      alt={booking.service.serviceName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#378A88]">
                      <FiShoppingBag className="size-6" />
                    </div>
                  )}
                </div>

                {/* Booking Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold text-[#193F5B]">
                    {booking.service?.serviceName || "Wedding Service"}
                  </h3>

                  <p className="mt-1 text-xs text-[#87939E]">
                    Vendor: {booking.vendor?.name || "Vendor"}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <FiCalendar />
                      {booking.eventDate}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiMapPin />
                      {booking.eventLocation}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                    booking.status === "pending"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : booking.status === "accepted"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : booking.status === "rejected"
                          ? "border-red-200 bg-red-50 text-red-600"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions */}
      <section className="rounded-2xl border border-[#E1E8ED] bg-white p-5 shadow-[0_1px_2px_rgba(25,63,91,0.04)] sm:p-6">
        <div>
          <h2 className="text-sm font-semibold text-[#193F5B]">
            Start Planning
          </h2>

          <p className="mt-1 text-xs text-[#87939E]">
            Find the right vendors and keep your bookings organised.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {/* Browse Services */}
          <Link
            href="/services"
            className="group flex items-center justify-between gap-3 rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#378A88]/40 hover:bg-white hover:shadow-[0_10px_24px_rgba(25,63,91,0.07)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white text-[#378A88] ring-1 ring-[#E1E8ED] transition-colors duration-200 group-hover:bg-[#378A88] group-hover:text-white group-hover:ring-[#378A88]">
                <FiShoppingBag className="size-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#193F5B]">
                  Browse Services
                </p>

                <p className="mt-1 text-[11px] text-[#87939E]">
                  Discover wedding vendors
                </p>
              </div>
            </div>

            <FiArrowRight className="size-4 shrink-0 text-[#87939E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#378A88]" />
          </Link>

          {/* My Bookings */}
          <Link
            href="/dashboard/customer/my-bookings"
            className="group flex items-center justify-between gap-3 rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#378A88]/40 hover:bg-white hover:shadow-[0_10px_24px_rgba(25,63,91,0.07)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-white text-[#378A88] ring-1 ring-[#E1E8ED] transition-colors duration-200 group-hover:bg-[#378A88] group-hover:text-white group-hover:ring-[#378A88]">
                <FiCalendar className="size-4" />
              </div>

              <div>
                <p className="text-xs font-semibold text-[#193F5B]">
                  My Bookings
                </p>

                <p className="mt-1 text-[11px] text-[#87939E]">
                  Track booking requests
                </p>
              </div>
            </div>

            <FiArrowRight className="size-4 shrink-0 text-[#87939E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#378A88]" />
          </Link>
        </div>
      </section>
    </div>
  );
}