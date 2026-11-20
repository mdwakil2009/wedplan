"use client";

import Link from "next/link";
import { FiShield } from "react-icons/fi";
import { GiDiamondRing } from "react-icons/gi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "@/lib/auth-client";

const DashboardSidebarHeader = () => {
  const { data: session, isPending } = useSession();

  const user = session?.user as
    | {
        name?: string;
        email?: string;
        image?: string | null;
        role?: string;
      }
    | undefined;

  const role = user?.role || "customer";

  const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

  const initials = (user?.name || "WedPlan User")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div>
      {/* Brand */}
      <Link href="/" className="group flex items-center gap-2.5 px-1">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#378A88] shadow-[0_6px_16px_rgba(0,0,0,0.18)] ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105">
          <GiDiamondRing className="size-5 text-[#C8F09A]" />
        </div>

        <div className="leading-none">
          <p className="text-[19px] font-bold tracking-tight text-white">
            WedPlan
          </p>
          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/45">
            Wedding Dashboard
          </p>
        </div>
      </Link>

      {/* Signed-in user */}
      {isPending ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.07] p-3">
          <div className="size-9 animate-pulse rounded-full bg-white/10" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-24 animate-pulse rounded bg-white/10" />
            <div className="h-2 w-32 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.07] p-3">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-9 ring-2 ring-white/15">
              {user?.image ? (
                <AvatarImage src={user.image} alt={user.name || "User"} />
              ) : null}
              <AvatarFallback className="bg-[#C8F09A] text-[11px] font-bold text-[#193F5B]">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-white">
                {user?.name || "User"}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-white/45">
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 border-t border-white/10 pt-2.5">
            <FiShield className="size-3 text-[#C8F09A]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C8F09A]">
              {formattedRole}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebarHeader;
