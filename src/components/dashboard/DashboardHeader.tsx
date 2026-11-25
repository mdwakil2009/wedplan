"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { authClient, useSession } from "@/lib/auth-client";

// The header title is based on the last part of the URL.
const pageTitles: Record<string, string> = {
  "": "Overview",
  users: "Manage Users",
  "manage-services": "Manage Services",
  transactions: "Transactions",
  "my-services": "My Services",
  "add-service": "Add Service",
  "booking-requests": "Booking Requests",
  subscription: "Subscription",
  profile: "Profile Settings",
  "my-bookings": "My Bookings",
};

const roleLabels: Record<string, string> = {
  admin: "Admin",
  vendor: "Vendor",
  customer: "Customer",
};

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const user = session?.user;

  const role =
    user?.role === "admin" || user?.role === "vendor" ? user.role : "customer";

  const segments = pathname.split("/").filter(Boolean);
  const pageSlug = segments[2] || "";
  const pageTitle = pageTitles[pageSlug] || "Dashboard";
  const roleLabel = roleLabels[role] || "Customer";

  const initials = (user?.name || "WedPlan User")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-[#E7EBF5] bg-white/95 px-4 backdrop-blur-md sm:px-6">
      <SidebarTrigger className="size-9 rounded-xl border border-[#E7EBF5] bg-white text-[#252B45] transition-colors duration-200 hover:bg-[#EEF4FF] hover:text-[#3A76EF] focus-visible:ring-2 focus-visible:ring-[#3A76EF]/35" />

      <div className="hidden h-7 w-px bg-[#E7EBF5] sm:block" />

      <div className="min-w-0 flex-1">
        <div className="hidden items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#A0A8BC] sm:flex">
          <span>Dashboard</span>
          <ChevronRight className="size-3" />
          <span className="text-[#3A76EF]">{roleLabel}</span>
        </div>

        <h1 className="truncate text-sm font-bold tracking-tight text-[#252B45] sm:text-[15px]">
          {pageTitle}
        </h1>
      </div>

      {isPending ? (
        <div className="flex items-center gap-2.5">
          <div className="size-9 animate-pulse rounded-full bg-[#EEF3FF]" />
          <div className="hidden space-y-1.5 sm:block">
            <div className="h-2.5 w-24 animate-pulse rounded bg-[#EEF3FF]" />
            <div className="h-2 w-16 animate-pulse rounded bg-[#F3F5FB]" />
          </div>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open account menu"
            className="flex items-center gap-2.5 rounded-xl border border-transparent px-1.5 py-1.5 text-left transition-colors duration-200 hover:border-[#E7EBF5] hover:bg-[#F9FAFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/35"
          >
            <Avatar className="size-9 border border-[#E7EBF5]">
              {user?.image ? (
                <AvatarImage src={user.image} alt={user.name || "User"} />
              ) : null}
              <AvatarFallback className="bg-[#EEF4FF] text-[11px] font-bold text-[#3A76EF]">
                {initials}
              </AvatarFallback>
            </Avatar>

            <span className="hidden min-w-0 sm:block">
              <span className="block max-w-[150px] truncate text-[13px] font-semibold text-[#252B45]">
                {user?.name || "WedPlan User"}
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A93A8]">
                {roleLabel}
              </span>
            </span>

            <ChevronDown className="hidden size-4 text-[#8A93A8] sm:block" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 rounded-2xl border-[#E7EBF5] p-1.5 shadow-[0_20px_50px_-20px_rgba(37,43,69,0.25)]"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-2">
                <span className="block truncate text-[13px] font-semibold text-[#252B45]">
                  {user?.name || "WedPlan User"}
                </span>
                <span className="mt-0.5 block truncate text-[11px] font-normal text-[#8A93A8]">
                  {user?.email || "No email"}
                </span>
                <span className="mt-2 inline-flex rounded-full bg-[#EEF4FF] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#3A76EF]">
                  {roleLabel}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/${role}`)}
                className="gap-2 rounded-xl px-2 py-2 text-[13px] text-[#252B45] focus:bg-[#EEF4FF] focus:text-[#252B45]"
              >
                <LayoutDashboard className="size-4 text-[#3A76EF]" />
                Dashboard
              </DropdownMenuItem>

              {role !== "admin" && (
                <DropdownMenuItem
                  onClick={() => router.push(`/dashboard/${role}/profile`)}
                  className="gap-2 rounded-xl px-2 py-2 text-[13px] text-[#252B45] focus:bg-[#EEF4FF] focus:text-[#252B45]"
                >
                  <Settings className="size-4 text-[#3A76EF]" />
                  Profile settings
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-[#EDF0F8]" />

            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="gap-2 rounded-xl px-2 py-2 text-[13px]"
            >
              <LogOut className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
