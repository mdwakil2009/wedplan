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
  SidebarMenuSkeleton,
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

  const role: Role =
    session?.user.role === "admin" ||
    session?.user.role === "vendor" ||
    session?.user.role === "customer"
      ? session.user.role
      : "customer";
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
      <SidebarHeader className="p-3">
        <DashboardSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[10px] font-semibold tracking-[0.16em] text-[#A08E95]">
            {role.toUpperCase()} MENU
          </SidebarGroupLabel>

          <SidebarGroupContent>
            {isPending ? (
              <div className="space-y-1.5 px-1">
                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton showIcon />
                <SidebarMenuSkeleton showIcon />
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
                        className={`h-10 rounded-lg px-3 text-[13px] font-medium transition-colors ${
                          active
                            ? "bg-[#F8EFF0] text-[#772D43] shadow-[inset_2px_0_0_#772D43] hover:bg-[#F8EFF0] hover:text-[#772D43]"
                            : "text-[#5C5158] hover:bg-[#FBF5F4] hover:text-[#772D43]"
                        }`}
                      >
                        <Icon className="size-4" />
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

      <SidebarFooter className="border-t border-[#F0E7E8] p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-medium text-[#817780] transition-colors hover:bg-[#FBF5F4] hover:text-[#772D43]"
        >
          <FiArrowUpRight className="size-3.5" />
          Back to website
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[11px] font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <FiLogOut className="size-3.5" />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
