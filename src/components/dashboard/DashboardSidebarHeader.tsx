"use client";

import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { FiUser, FiShield } from "react-icons/fi";

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

  const formattedRole =
    role.charAt(0).toUpperCase() + role.slice(1);

  if (isPending) {
    return (
      <div className="rounded-xl border border-[#F0E7E8] bg-white p-3.5">
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-12 w-12 rounded-xl bg-[#F5EBED]" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-24 rounded bg-[#F5EBED]" />
            <div className="h-2.5 w-32 rounded bg-[#F5EBED]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#F0E7E8] bg-white p-3.5 shadow-[0_2px_10px_rgba(75,35,48,0.04)] transition-all duration-300 hover:border-[#E6D2D8]">
      {/* Profile Information */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="shrink-0 rounded-xl bg-[#F8EFF0] p-1">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={44}
              height={44}
              className="h-11 w-11 rounded-lg object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#772D43] text-white">
              <FiUser className="h-5 w-5" />
            </div>
          )}
        </div>

        {/* Name & Email */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold tracking-tight text-[#30272C]">
            {user?.name || "User"}
          </h3>

          <p className="mt-0.5 truncate text-[11px] text-[#91858C]">
            {user?.email || "No email"}
          </p>

          {/* Role */}
          <div className="mt-1.5 flex items-center gap-1.5">
            <FiShield className="h-3 w-3 text-[#772D43]" />

            <span className="text-[10px] font-medium text-[#772D43]">
              {formattedRole}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#FFFCF9] px-2.5 py-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[#772D43]" />

        <p className="text-[10px] font-bold tracking-wide text-[#817780]">
          WEDPLAN ACCOUNT
        </p>

        <div className="ml-auto">
          <span className="text-[9px] font-semibold tracking-wider text-[#C5A4AC]">
            WP
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarHeader;