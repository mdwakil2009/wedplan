"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
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
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-[#E1E8ED] bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <SidebarTrigger className="text-[#193F5B] hover:bg-[#E4F3F1] hover:text-[#378A88]" />

      <div className="hidden h-8 w-px bg-[#E1E8ED] sm:block" />

      <div className="min-w-0 flex-1">
        <p className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[#87939E] sm:block">
          Dashboard / {roleLabel}
        </p>
        <h1 className="truncate text-sm font-semibold tracking-tight text-[#193F5B] sm:text-[15px]">
          {pageTitle}
        </h1>
      </div>

      <Link
        href="/"
        className="hidden items-center gap-1.5 rounded-lg border border-[#E1E8ED] bg-white px-3 py-2 text-xs font-medium text-[#193F5B] transition-colors hover:border-[#378A88] hover:text-[#378A88] md:inline-flex"
      >
        <ExternalLink className="size-3.5" />
        View site
      </Link>

      {isPending ? (
        <div className="flex items-center gap-2.5">
          <div className="size-9 animate-pulse rounded-full bg-[#E9EEF2]" />
          <div className="hidden space-y-1.5 sm:block">
            <div className="h-2.5 w-24 animate-pulse rounded bg-[#E9EEF2]" />
            <div className="h-2 w-16 animate-pulse rounded bg-[#E9EEF2]" />
          </div>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open account menu"
            className="flex items-center gap-2.5 rounded-xl border border-transparent px-1.5 py-1.5 text-left transition-colors hover:border-[#E1E8ED] hover:bg-[#F8FAFC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#378A88]/40"
          >
            <Avatar className="size-9 border border-[#E1E8ED]">
              {user?.image ? (
                <AvatarImage src={user.image} alt={user.name || "User"} />
              ) : null}
              <AvatarFallback className="bg-[#E4F3F1] text-[11px] font-semibold text-[#378A88]">
                {initials}
              </AvatarFallback>
            </Avatar>

            <span className="hidden min-w-0 sm:block">
              <span className="block max-w-[150px] truncate text-[13px] font-semibold text-[#193F5B]">
                {user?.name || "WedPlan User"}
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-[#87939E]">
                {roleLabel}
              </span>
            </span>

            <ChevronDown className="hidden size-4 text-[#87939E] sm:block" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-60 rounded-xl border-[#E1E8ED] p-1.5 shadow-[0_16px_40px_rgba(25,63,91,0.12)]"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-2 py-1.5">
                <span className="block truncate text-[13px] font-semibold text-[#193F5B]">
                  {user?.name || "WedPlan User"}
                </span>
                <span className="mt-0.5 block truncate text-[11px] font-normal text-[#87939E]">
                  {user?.email || "No email"}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => router.push(`/dashboard/${role}`)}
                className="gap-2 px-2 py-2 text-[13px] text-[#193F5B] focus:bg-[#E4F3F1] focus:text-[#193F5B]"
              >
                <LayoutDashboard className="size-4 text-[#378A88]" />
                Dashboard
              </DropdownMenuItem>

              {role !== "admin" && (
                <DropdownMenuItem
                  onClick={() => router.push(`/dashboard/${role}/profile`)}
                  className="gap-2 px-2 py-2 text-[13px] text-[#193F5B] focus:bg-[#E4F3F1] focus:text-[#193F5B]"
                >
                  <Settings className="size-4 text-[#378A88]" />
                  Profile settings
                </DropdownMenuItem>
              )}

              <DropdownMenuItem
                onClick={() => router.push("/")}
                className="gap-2 px-2 py-2 text-[13px] text-[#193F5B] focus:bg-[#E4F3F1] focus:text-[#193F5B]"
              >
                <ArrowUpRight className="size-4 text-[#378A88]" />
                Back to website
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-[#E1E8ED]" />

            <DropdownMenuItem
              variant="destructive"
              onClick={handleLogout}
              className="gap-2 px-2 py-2 text-[13px]"
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
