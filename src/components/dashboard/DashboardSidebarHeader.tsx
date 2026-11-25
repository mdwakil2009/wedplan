"use client";

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
    <div className="space-y-4">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-1">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[#3A76EF] text-white shadow-[0_10px_22px_-10px_rgba(58,118,239,0.8)]">
          <GiDiamondRing className="size-5" />
        </div>

        <div className="leading-none">
          <p className="text-[19px] font-extrabold tracking-tight text-[#252B45]">
            WedPlan
          </p>
          <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-[#8A93A8]">
            Wedding Workspace
          </p>
        </div>
      </div>

      {/* Signed-in user */}
      {isPending ? (
        <div className="flex items-center gap-3 rounded-2xl border border-[#E7EBF5] bg-white p-3 shadow-[0_1px_2px_rgba(37,43,69,0.04)]">
          <div className="size-9 animate-pulse rounded-full bg-[#EEF3FF]" />
          <div className="flex-1 space-y-2">
            <div className="h-2.5 w-24 animate-pulse rounded bg-[#EEF3FF]" />
            <div className="h-2 w-32 animate-pulse rounded bg-[#F3F5FB]" />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E7EBF5] bg-white p-3 shadow-[0_1px_2px_rgba(37,43,69,0.04)]">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-9 ring-2 ring-[#EEF4FF]">
              {user?.image ? (
                <AvatarImage src={user.image} alt={user.name || "User"} />
              ) : null}
              <AvatarFallback className="bg-[#EEF4FF] text-[11px] font-bold text-[#3A76EF]">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-[#252B45]">
                {user?.name || "User"}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-[#8A93A8]">
                {user?.email || "No email"}
              </p>
            </div>
          </div>

          <div className="mt-2.5 flex items-center gap-1.5 border-t border-[#EDF0F8] pt-2.5">
            <FiShield className="size-3 text-[#3A76EF]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#3A76EF]">
              {formattedRole}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebarHeader;
