import { headers } from "next/headers";
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
} from "react-icons/fi";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default async function AdminDashboardPage() {
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

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FiUsers,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Vendors",
      value: stats.totalVendors,
      icon: FiUserCheck,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: FiUser,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Services",
      value: stats.totalServices,
      icon: FiBriefcase,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Pending Services",
      value: stats.pendingServices,
      icon: FiClock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Total Transactions",
      value: stats.totalTransactions,
      icon: FiDollarSign,
      color: "bg-pink-50 text-pink-600",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#378A88]">
          Admin Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#193F5B] sm:text-3xl">
          Overview
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Monitor users, services and platform activities.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="rounded-2xl border-slate-200 shadow-sm transition hover:shadow-md"
            >
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-[#193F5B]">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${card.color}`}
                >
                  <Icon className="size-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Platform Activity Overview */}
      <Card className="overflow-hidden rounded-2xl border-0 bg-[#193F5B] text-white shadow-lg">
        <CardContent className="p-5 sm:p-7">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8BD0C8]">
                Platform Insights
              </p>

              <h2 className="text-xl font-bold sm:text-2xl">
                Platform Activity Overview
              </h2>

              <p className="max-w-md text-sm leading-6 text-slate-300">
                Monitor your platform growth, user community, and service
                approval activity from one place.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 md:max-w-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-300">
                  Total Community
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {stats.totalUsers}
                </h3>

                <p className="mt-1 text-xs text-[#8BD0C8]">
                  Registered Users
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-slate-300">
                  Service Listings
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {stats.totalServices}
                </h3>

                <p className="mt-1 text-xs text-[#F5C77E]">
                  Total Services
                </p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mt-7 grid gap-5 sm:grid-cols-2">

            {/* Vendor Community */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">
                  Vendor Community
                </span>

                <span className="text-sm font-semibold text-[#8BD0C8]">
                  {stats.totalVendors}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#8BD0C8] transition-all"
                  style={{
                    width: `${
                      stats.totalUsers
                        ? (stats.totalVendors / stats.totalUsers) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Vendors registered on WedPlan
              </p>
            </div>

            {/* Pending Services */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">
                  Pending Approval
                </span>

                <span className="text-sm font-semibold text-[#F5C77E]">
                  {stats.pendingServices}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-[#F5C77E] transition-all"
                  style={{
                    width: `${
                      stats.totalServices
                        ? (stats.pendingServices / stats.totalServices) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Services waiting for admin review
              </p>
            </div>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}