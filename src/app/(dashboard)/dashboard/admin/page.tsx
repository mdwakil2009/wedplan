import Link from "next/link";
import {
  FiArrowRight,
  FiBriefcase,
  FiCreditCard,
  FiUsers,
} from "react-icons/fi";

import { requireRole } from "@/lib/dashboard-auth";

const stats = [
  { label: "Total Users", value: "0", icon: FiUsers, note: "No users yet" },
  { label: "Vendors", value: "0", icon: FiBriefcase, note: "No vendors yet" },
  {
    label: "Services",
    value: "0",
    icon: FiBriefcase,
    note: "No services yet",
  },
  {
    label: "Transactions",
    value: "0",
    icon: FiCreditCard,
    note: "No transactions yet",
  },
];

const quickLinks = [
  {
    title: "Manage Users",
    description: "Review accounts and their roles",
    href: "/dashboard/admin/users",
    icon: FiUsers,
  },
  {
    title: "Manage Services",
    description: "Review services added by vendors",
    href: "/dashboard/admin/manage-services",
    icon: FiBriefcase,
  },
  {
    title: "Transactions",
    description: "Follow payments across the platform",
    href: "/dashboard/admin/transactions",
    icon: FiCreditCard,
  },
];

export default async function AdminOverviewPage() {
  const session = await requireRole("admin");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          ADMIN CONTROL CENTER
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          Overview
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          Welcome back, {session.user.name}. Here is a summary of WedPlan.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
        <h2 className="text-sm font-semibold text-[#292329]">Quick actions</h2>
        <p className="mt-1 text-xs text-[#817780]">
          Jump to the area you want to manage.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-lg border border-[#F0E7E8] p-3 transition-colors hover:border-[#DCC8CE] hover:bg-[#FFFCF9]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-8 items-center justify-center rounded-md bg-[#F8EFF0] text-[#772D43]">
                    <Icon className="size-3.5" />
                  </div>
                  <FiArrowRight className="size-3.5 text-[#C5A4AC] transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2.5 text-xs font-semibold text-[#292329]">
                  {link.title}
                </p>
                <p className="mt-0.5 text-[10px] leading-4 text-[#817780]">
                  {link.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="rounded-lg border border-[#F0E7E8] bg-[#FFFCF9] px-4 py-3 text-[11px] text-[#817780]">
        Live user, service and transaction data will be connected in a later
        step.
      </div>
    </div>
  );
}
