import Link from "next/link";
import { FiPlusCircle, FiShoppingBag } from "react-icons/fi";

import { Button } from "@/components/ui/button";

export default function VendorMyServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
            VENDOR
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
            My Services
          </h1>
          <p className="mt-1 text-sm text-[#817780]">
            All the services you offer to WedPlan customers.
          </p>
        </div>

        <Button
          render={<Link href="/dashboard/vendor/add-service" />}
          className="h-9 rounded-md bg-[#772D43] px-4 text-xs text-white hover:bg-[#612338]"
        >
          <FiPlusCircle className="mr-2 size-3.5" />
          Add Service
        </Button>
      </div>

      <div className="rounded-xl border border-[#EDE2E5] bg-white p-12 text-center shadow-[0_2px_12px_rgba(75,35,48,0.04)]">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#F8EFF0] text-[#772D43]">
          <FiShoppingBag className="size-5" />
        </div>
        <h2 className="mt-4 text-sm font-semibold text-[#292329]">
          You have no services yet
        </h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#817780]">
          Add your first service so customers can find and book you.
        </p>
        <Link
          href="/dashboard/vendor/add-service"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#772D43] hover:underline"
        >
          <FiPlusCircle className="size-3.5" />
          Add your first service
        </Link>
      </div>
    </div>
  );
}
