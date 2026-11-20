import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import { requireRole } from "@/lib/dashboard-auth";

export const instant = false;

const stats = [
  {
    label: "Upcoming Bookings",
    value: "0",
    icon: FiCalendar,
    note: "No upcoming bookings",
  },
  {
    label: "Saved Vendors",
    value: "0",
    icon: FiHeart,
    note: "No saved vendors yet",
  },
  {
    label: "Total Bookings",
    value: "0",
    icon: FiShoppingBag,
    note: "No bookings yet",
  },
];

export default async function CustomerOverviewPage() {
  const session = await requireRole("customer");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
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

      <div className="grid gap-4 sm:grid-cols-3">
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

      <section className="rounded-2xl border border-[#E1E8ED] bg-white p-5 shadow-[0_1px_2px_rgba(25,63,91,0.04)] sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-[#193F5B]">
              Start planning
            </h2>
            <p className="mt-1 text-xs text-[#87939E]">
              Find the right vendors and keep your bookings organised.
            </p>
          </div>

          <span className="hidden rounded-full bg-[#E4F3F1] px-2.5 py-1 text-[10px] font-semibold text-[#378A88] sm:inline-block">
            Customer
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
                  Discover trusted wedding vendors
                </p>
              </div>
            </div>

            <FiArrowRight className="size-4 shrink-0 text-[#87939E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#378A88]" />
          </Link>

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
                  Track your booking requests
                </p>
              </div>
            </div>

            <FiArrowRight className="size-4 shrink-0 text-[#87939E] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#378A88]" />
          </Link>
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-xl border border-[#CFE7E4] bg-[#E4F3F1] px-4 py-3">
        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#378A88]" />
        <p className="text-[11px] leading-5 text-[#193F5B]">
          Booking and saved vendor data will be connected in a later step.
        </p>
      </div>
    </div>
  );
}
