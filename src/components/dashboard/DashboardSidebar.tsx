"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import {
  FiArrowUpRight,
  FiBriefcase,
  FiCalendar,
  FiCreditCard,
  FiGrid,
  FiLogOut,
  FiPlusCircle,
  FiSettings,
  FiShoppingBag,
  FiUsers,
} from "react-icons/fi";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient, useSession } from "@/lib/auth-client";
import DashboardSidebarHeader from "./DashboardSidebarHeader";

type Role = "admin" | "vendor" | "customer";

type MenuItem = {
  label: string;
  href: string;
  icon: IconType;
};

// Each role only sees its own menu.
const roleBasedMenus: Record<Role, MenuItem[]> = {
  admin: [
    { label: "Overview", href: "/dashboard/admin", icon: FiGrid },
    { label: "Manage Users", href: "/dashboard/admin/users", icon: FiUsers },
    {
      label: "Manage Services",
      href: "/dashboard/admin/manage-services",
      icon: FiBriefcase,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: FiCreditCard,
    },
  ],
  vendor: [
    { label: "Overview", href: "/dashboard/vendor", icon: FiGrid },
    {
      label: "My Services",
      href: "/dashboard/vendor/my-services",
      icon: FiShoppingBag,
    },
    {
      label: "Add Service",
      href: "/dashboard/vendor/add-service",
      icon: FiPlusCircle,
    },
    {
      label: "Booking Requests",
      href: "/dashboard/vendor/booking-requests",
      icon: FiCalendar,
    },
    {
      label: "Subscription",
      href: "/dashboard/vendor/subscription",
      icon: FiCreditCard,
    },
    {
      label: "Profile Settings",
      href: "/dashboard/vendor/profile",
      icon: FiSettings,
    },
  ],
  customer: [
    { label: "Overview", href: "/dashboard/customer", icon: FiGrid },
    {
      label: "My Bookings",
      href: "/dashboard/customer/my-bookings",
      icon: FiCalendar,
    },
    {
      label: "Profile Settings",
      href: "/dashboard/customer/profile",
      icon: FiSettings,
    },
  ],
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const role: Role = (session?.user.role as Role) || "customer";
  const menuItems = roleBasedMenus[role];
  const homeHref = `/dashboard/${role}`;

  // Overview is active only on the exact home URL.
  // Other menu items stay active on their child pages too.
  const isActive = (href: string) => {
    if (href === homeHref) {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-3 pb-3 pt-5">
        <DashboardSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 pt-2">
          <SidebarGroupLabel className="mb-1 px-2 text-[10px] font-semibold tracking-[0.18em] text-white/40">
            {role.toUpperCase()} MENU
          </SidebarGroupLabel>

          <SidebarGroupContent>
            {isPending ? (
              <div className="space-y-1.5 px-1">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex h-10 items-center gap-2 rounded-lg px-3"
                  >
                    <div className="size-4 animate-pulse rounded bg-white/10" />
                    <div className="h-2.5 w-24 animate-pulse rounded bg-white/10" />
                  </div>
                ))}
              </div>
            ) : (
              <SidebarMenu className="gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={active}
                        tooltip={item.label}
                        className={`h-10 rounded-lg px-3 text-[13px] font-medium transition-all duration-200 ${
                          active
                            ? "bg-[#378A88] text-white shadow-[0_6px_16px_rgba(55,138,136,0.35)] hover:bg-[#378A88] hover:text-white"
                            : "text-white/65 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <Icon
                          className={`size-4 ${
                            active ? "text-white" : "text-white/60"
                          }`}
                        />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-1 border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium text-white/55 transition-colors hover:bg-white/10 hover:text-white"
        >
          <FiArrowUpRight className="size-3.5" />
          Back to website
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] font-medium text-[#FCA5A5] transition-colors hover:bg-white/10 hover:text-[#FECACA]"
        >
          <FiLogOut className="size-3.5" />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
