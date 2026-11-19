import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiHeart,
  FiShoppingBag,
} from "react-icons/fi";

import { requireRole } from "@/lib/dashboard-auth";

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
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          YOUR WEDDING JOURNEY
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          Overview
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          Welcome back, {session.user.name}. Let&apos;s plan your special day.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[#EDE2E5] bg-white p-5 shadow-[0_2px_12px_rgba(75,35,48,0.04)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#91858C]">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#292329]">
                    {stat.value}
                  </p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#F8EFF0] text-[#772D43]">
                  <Icon className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-[11px] text-[#A89CA2]">{stat.note}</p>
            </div>
          );
        })}
      </div>

      <section className="rounded-xl border border-[#EDE2E5] bg-white p-5 shadow-[0_2px_12px_rgba(75,35,48,0.04)]">
        <h2 className="text-sm font-semibold text-[#292329]">Start planning</h2>
        <p className="mt-1 text-xs text-[#817780]">
          Find the right vendors and keep your bookings organised.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <Link
            href="/services"
            className="group flex items-center justify-between rounded-lg border border-[#F0E7E8] p-4 transition-colors hover:border-[#DCC8CE] hover:bg-[#FFFCF9]"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#F8EFF0] text-[#772D43]">
                <FiShoppingBag className="size-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#292329]">
                  Browse Services
                </p>
                <p className="mt-0.5 text-[10px] text-[#817780]">
                  Discover trusted wedding vendors
                </p>
              </div>
            </div>
            <FiArrowRight className="size-3.5 text-[#C5A4AC] transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/dashboard/customer/my-bookings"
            className="group flex items-center justify-between rounded-lg border border-[#F0E7E8] p-4 transition-colors hover:border-[#DCC8CE] hover:bg-[#FFFCF9]"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#F8EFF0] text-[#772D43]">
                <FiCalendar className="size-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#292329]">
                  My Bookings
                </p>
                <p className="mt-0.5 text-[10px] text-[#817780]">
                  Track your booking requests
                </p>
              </div>
            </div>
            <FiArrowRight className="size-3.5 text-[#C5A4AC] transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <div className="rounded-lg border border-[#F0E7E8] bg-[#FFFCF9] px-4 py-3 text-[11px] text-[#817780]">
        Booking and saved vendor data will be connected in a later step.
      </div>
    </div>
  );
}
