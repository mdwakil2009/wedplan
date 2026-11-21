import { Suspense } from "react";
import Image from "next/image";
import { connection } from "next/server";
import {
  FiCheckCircle,
  FiHeart,
  FiShield,
  FiStar,
} from "react-icons/fi";

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
    <div className="min-h-screen bg-[#FFFCF9]">
      <section className="relative isolate overflow-hidden bg-[#2D111B]">
        <Image
          src="/images/background.photo3.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#240C15]/95 via-[#3A1722]/80 to-[#772D43]/35" />
        <div className="absolute -left-24 top-10 size-72 rounded-full bg-[#B76E79]/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-[#E8C7A9]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F6DDE1] backdrop-blur-sm">
              <FiHeart className="size-3" />
              Wedding marketplace
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your dream wedding,
              <span className="block italic text-[#F0C9CF]">
                beautifully matched.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Explore trusted wedding professionals, compare services and find
              the perfect team for every moment of your special day.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6">
              <span className="inline-flex items-center gap-2 text-[11px] font-medium text-white/75">
                <FiCheckCircle className="size-3.5 text-[#F0C9CF]" />
                Approved services only
              </span>

              <span className="inline-flex items-center gap-2 text-[11px] font-medium text-white/75">
                <FiShield className="size-3.5 text-[#F0C9CF]" />
                Verified vendors
              </span>

              <span className="inline-flex items-center gap-2 text-[11px] font-medium text-white/75">
                <FiStar className="size-3.5 text-[#F0C9CF]" />
                Curated for couples
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <Suspense fallback={<ServicesSkeleton />}>
          <ServicesContent />
        </Suspense>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#9A858B]">
          <FiCheckCircle className="size-4 text-[#B76E79]" />
          Every listed service is reviewed and approved by the WedPlan team.
        </div>
      </section>
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
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <FiShield className="mt-0.5 size-4 shrink-0" />
          <p>
            We could not load the services right now. Please refresh the page
            or try again in a moment.
          </p>
        </div>
      )}

      <ServiceFilter services={liveServices} />
    </>
  );
}
