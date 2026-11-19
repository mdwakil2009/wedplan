import Image from "next/image";
import { FiUser } from "react-icons/fi";

import { requireRole } from "@/lib/dashboard-auth";

export default async function CustomerProfilePage() {
  const session = await requireRole("customer");
  const user = session.user;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          CUSTOMER
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          Profile Settings
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          Your account information on WedPlan.
        </p>
      </div>

      <div className="rounded-xl border border-[#EDE2E5] bg-white p-5 shadow-[0_2px_12px_rgba(75,35,48,0.04)] sm:p-6">
        <div className="flex items-center gap-3 border-b border-[#F0E7E8] pb-5">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border border-[#EDE2E5] object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8EFF0] text-[#772D43]">
              <FiUser className="size-5" />
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-[#292329]">
              {user.name}
            </h2>
            <p className="truncate text-xs text-[#817780]">{user.email}</p>
            <span className="mt-1 inline-block rounded-full bg-[#F8EFF0] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#772D43]">
              Customer
            </span>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#91858C]">
              Full Name
            </p>
            <p className="mt-1 text-sm text-[#292329]">{user.name}</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#91858C]">
              Email Address
            </p>
            <p className="mt-1 truncate text-sm text-[#292329]">{user.email}</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#91858C]">
              Account Type
            </p>
            <p className="mt-1 text-sm capitalize text-[#292329]">
              {user.role}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#F0E7E8] bg-[#FFFCF9] px-3 py-2.5 text-[11px] text-[#817780]">
          Profile editing will be added in a later step.
        </div>
      </div>
    </div>
  );
}
