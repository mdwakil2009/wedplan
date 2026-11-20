import Image from "next/image";
import { FiUser } from "react-icons/fi";

import { requireRole } from "@/lib/dashboard-auth";

export const instant = false;

export default async function VendorProfilePage() {
  const session = await requireRole("vendor");
  const user = session.user;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#378A88]">
          Vendor
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#193F5B] sm:text-3xl">
          Profile Settings
        </h1>
        <p className="mt-1.5 text-sm text-[#87939E]">
          Your account information on WedPlan.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E1E8ED] bg-white shadow-[0_1px_2px_rgba(25,63,91,0.04)]">
        <div className="flex flex-col gap-4 border-b border-[#E1E8ED] bg-[#F8FAFC] p-5 sm:flex-row sm:items-center sm:p-6">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border-2 border-white object-cover ring-1 ring-[#E1E8ED]"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E4F3F1] text-[#378A88] ring-1 ring-[#CFE7E4]">
              <FiUser className="size-6" />
            </div>
          )}

          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-[#193F5B]">
              {user.name}
            </h2>
            <p className="mt-0.5 truncate text-xs text-[#87939E]">
              {user.email}
            </p>
            <span className="mt-2 inline-block rounded-full bg-[#E4F3F1] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#378A88]">
              Vendor
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#87939E]">
                Full Name
              </p>
              <p className="mt-1.5 text-sm font-medium text-[#193F5B]">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#87939E]">
                Email Address
              </p>
              <p className="mt-1.5 truncate text-sm font-medium text-[#193F5B]">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#87939E]">
                Account Type
              </p>
              <p className="mt-1.5 text-sm font-medium capitalize text-[#193F5B]">
                {user.role}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] px-4 py-3 text-[11px] leading-5 text-[#87939E]">
            Profile editing will be added in a later step.
          </div>
        </div>
      </div>
    </div>
  );
}
