"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { IconType } from "react-icons";
import {
  FiBriefcase,
  FiCalendar,
  FiCreditCard,
  FiGrid,
  FiHome,
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
      <SidebarHeader className="px-3 pb-2 pt-5">
        <DashboardSidebarHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 pt-2">
          <SidebarGroupLabel className="mb-2 px-2 text-[10px] font-bold tracking-[0.18em] text-[#A0A8BC]">
            {role.toUpperCase()} MENU
          </SidebarGroupLabel>

          <SidebarGroupContent>
            {isPending ? (
              <div className="space-y-1.5 px-1">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex h-10 items-center gap-2 rounded-xl px-3"
                  >
                    <div className="size-4 animate-pulse rounded bg-[#EEF3FF]" />
                    <div className="h-2.5 w-24 animate-pulse rounded bg-[#EEF3FF]" />
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
                        className={`h-10 rounded-xl px-3 text-[13px] font-semibold transition-all duration-200 ${
                          active
                            ? "bg-[#3A76EF]! text-white! shadow-[0_10px_20px_-10px_rgba(58,118,239,0.9)] hover:bg-[#2F63D4]! hover:text-white!"
                            : "text-[#5B6478] hover:bg-[#EEF3FF] hover:text-[#252B45]"
                        }`}
                      >
                        <Icon
                          className={`size-4 transition-colors duration-200 ${
                            active
                              ? "text-white"
                              : "text-[#8A93A8] group-hover/menu-button:text-[#3A76EF]"
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

      <SidebarFooter className="gap-1 border-t border-[#E7EBF5] p-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold text-[#5B6478] transition-colors duration-200 hover:bg-[#EEF3FF] hover:text-[#3A76EF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/35"
        >
          <FiHome className="size-3.5" />
          Home
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[11px] font-semibold text-[#C93B3B] transition-colors duration-200 hover:bg-[#FEF0F0] hover:text-[#B02F2F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C93B3B]/25"
        >
          <FiLogOut className="size-3.5" />
          Logout
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
