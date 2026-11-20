import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiCreditCard,
  FiPlusCircle,
  FiShoppingBag,
  FiClock,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";

import { requireRole } from "@/lib/dashboard-auth";

export const instant = false;

interface Service {
  _id: string;
  serviceName?: string;
  status?: string;
  category?: string;
  price?: number;
}

export default async function VendorOverviewPage() {
  const session = await requireRole("vendor");

  const user = session.user as typeof session.user & {
    subscriptionPlan?: string;
  };

  let services: Service[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-services?email=${encodeURIComponent(
        session.user.email
      )}`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      services = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch vendor services:", error);
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

  const subscriptionPlan = user.subscriptionPlan || "Free";

  const stats = [
    {
      label: "Total Services",
      value: totalServices,
      description: "Services you've created",
      icon: FiShoppingBag,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Active Services",
      value: activeServices,
      description: "Approved services",
      icon: FiCheckCircle,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Pending Services",
      value: pendingServices,
      description: "Waiting for approval",
      icon: FiClock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Subscription",
      value: subscriptionPlan,
      description: "Your current membership",
      icon: FiCreditCard,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const quickLinks = [
    {
      title: "Add New Service",
      description: "Showcase a new wedding service to customers.",
      href: "/dashboard/vendor/add-service",
      icon: FiPlusCircle,
      color: "bg-[#E4F3F1] text-[#378A88]",
    },
    {
      title: "Booking Requests",
      description: "Review and manage customer booking requests.",
      href: "/dashboard/vendor/booking-requests",
      icon: FiCalendar,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Manage Subscription",
      description: "Explore plans and unlock premium benefits.",
      href: "/dashboard/vendor/subscription",
      icon: FiCreditCard,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#378A88]">
            Vendor Workspace
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#193F5B] sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#87939E]">
            Welcome back, {session.user.name}. Here&apos;s an overview of your
            wedding business.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/add-service"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#378A88] px-5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#2C7472] hover:shadow-md"
        >
          <FiPlusCircle size={17} />
          Add New Service
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-[#E5EBEF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <Icon size={20} />
                </div>

                <FiTrendingUp className="text-[#C1CDD5]" size={17} />
              </div>

              <p className="mt-5 text-sm font-medium text-[#87939E]">
                {stat.label}
              </p>

              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[#193F5B]">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-[#9AA6AF]">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-[#193F5B] p-6 sm:p-8">
        <div className="absolute -right-12 -top-16 size-56 rounded-full bg-[#378A88]/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-[#B9E3DE]">
              <FiStar size={13} />
              Your Vendor Journey
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
              Build your wedding business with WedPlan
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-white/65">
              Manage your services, grow your visibility, and connect with
              couples planning their special day.
            </p>
          </div>

          <Link
            href="/dashboard/vendor/my-services"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-[#193F5B] transition hover:bg-[#E4F3F1]"
          >
            Manage Services
            <FiArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight text-[#193F5B]">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-[#87939E]">
            Everything you need to manage your vendor account.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group rounded-2xl border border-[#E5EBEF] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#C9D9DF] hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${link.color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <FiArrowRight
                    size={17}
                    className="text-[#A5B1BA] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#378A88]"
                  />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-[#193F5B]">
                  {link.title}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-[#87939E]">
                  {link.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Service Summary */}
      <section className="rounded-2xl border border-[#E5EBEF] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-[#193F5B]">
              Your Services
            </h2>

            <p className="mt-1 text-sm text-[#87939E]">
              A quick look at your service portfolio.
            </p>
          </div>

          <Link
            href="/dashboard/vendor/my-services"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#378A88] transition hover:text-[#286B69]"
          >
            View All Services
            <FiArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-[#F8FAFC] p-4">
            <p className="text-xs text-[#87939E]">Total Services</p>
            <p className="mt-2 text-xl font-semibold text-[#193F5B]">
              {totalServices}
            </p>
          </div>

          <div className="rounded-xl bg-[#F0F8F6] p-4">
            <p className="text-xs text-[#6E9690]">Approved</p>
            <p className="mt-2 text-xl font-semibold text-[#378A88]">
              {activeServices}
            </p>
          </div>

          <div className="rounded-xl bg-[#FFF8ED] p-4">
            <p className="text-xs text-[#B28B53]">Pending Approval</p>
            <p className="mt-2 text-xl font-semibold text-[#B28B53]">
              {pendingServices}
            </p>
          </div>
        </div>

        {totalServices === 0 && (
          <div className="mt-5 rounded-xl border border-dashed border-[#DCE5EA] px-5 py-8 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88]">
              <FiShoppingBag size={21} />
            </div>

            <h3 className="mt-3 text-sm font-semibold text-[#193F5B]">
              No services yet
            </h3>

            <p className="mt-1 text-xs text-[#87939E]">
              Start building your portfolio by adding your first service.
            </p>

            <Link
              href="/dashboard/vendor/add-service"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#378A88] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#2C7472]"
            >
              <FiPlusCircle size={14} />
              Create Your First Service
            </Link>
          </div>
        )}
      </section>

    </div>
  );
}