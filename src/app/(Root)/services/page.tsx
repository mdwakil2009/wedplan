import { Suspense } from "react";
import { connection } from "next/server";
import { FiCheckCircle, FiShield } from "react-icons/fi";

import ServiceFilter from "@/components/services/ServiceFilter";
import ServicesSkeleton from "@/components/services/ServicesSkeleton";
import { getServices } from "@/lib/action/service";
import type { Service } from "@/lib/types/service";

export const metadata = {
  title: "Browse Wedding Services | WedPlan",
  description:
    "Discover approved wedding venues, photographers, decorators, caterers, makeup artists and more on WedPlan.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] transition-colors duration-300 dark:bg-[#1D2421]">
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesContent />
      </Suspense>

      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-8 text-xs text-[#9A858B] transition-colors duration-300 dark:text-[#B2BDB5]">
        <FiCheckCircle className="size-4 text-[#B76E79] dark:text-[#D9A58E]" />
        Every listed service is reviewed and approved by the WedPlan team.
      </div>
    </div>
  );
}

async function ServicesContent() {
  await connection();

  let services: Service[] = [];
  let hasError = false;

  try {
    services = await getServices();
  } catch (error) {
    console.error("Services Fetch Error:", error);
    hasError = true;
  }

  const liveServices = services.filter((service) => {
    const status = String(service.status || "").toLowerCase();

    return status === "approved" || status === "active";
  });

  return (
    <>
      {hasError && (
        <div className="mx-auto mb-5 flex max-w-7xl items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          <FiShield className="mt-0.5 size-4 shrink-0" />
          <p>
            We could not load the services right now. Please refresh the page or
            try again in a moment.
          </p>
        </div>
      )}

      <ServiceFilter services={liveServices} hasError={hasError} />
    </>
  );
}
