import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiShield,
  FiTag,
  FiUser,
} from "react-icons/fi";

import BookingForm from "@/components/services/BookingForm";
import ServiceGallery from "@/components/services/ServiceGallery";
import { getServiceById } from "@/lib/action/service";
import { auth } from "@/lib/auth";
import type { Service } from "@/lib/types/service";

export const instant = false;

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Check user authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If user is not logged in, redirect to sign-in page
  if (!session) {
    redirect(`/sign-in?redirect=${encodeURIComponent(`/services/${id}`)}`);
  }

  // Fetch service details from backend API
  let service: Service | null = null;

  try {
    service = await getServiceById(id);
  } catch (error) {
    console.error("Service Details Fetch Error:", error);
  }

  if (!service) {
    notFound();
  }

  const status = String(service.status || "").toLowerCase();

  if (status !== "approved" && status !== "active") {
    notFound();
  }

  const role =
    session.user.role === "admin" || session.user.role === "vendor"
      ? session.user.role
      : "customer";

  const price = Number(service.price || 0);

  return (
    <main className="min-h-screen bg-[#FFFCF9] pb-16">
      <div className="border-b border-[#F1E4E6] bg-[#FBF3F2]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#772D43] transition-colors hover:text-[#5F2034]"
          >
            <FiArrowLeft className="size-4" />
            Back to all services
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div>
            <ServiceGallery
              images={service.images}
              name={service.serviceName}
            />

            <section className="mt-8 rounded-3xl border border-[#F0E1E4] bg-white p-6 shadow-[0_12px_35px_rgba(72,31,44,0.05)] sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF1F2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#772D43]">
                  <FiTag className="size-3" />
                  {service.category}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1FAF4] px-3 py-1.5 text-[10px] font-semibold text-[#2F8A57]">
                  <FiCheckCircle className="size-3" />
                  Approved service
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-[#332229] sm:text-3xl lg:text-4xl">
                {service.serviceName}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#7C686E]">
                <span className="inline-flex items-center gap-1.5">
                  <FiMapPin className="size-3.5 text-[#B76E79]" />
                  {service.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <FiUser className="size-3.5 text-[#B76E79]" />
                  {service.userEmail}
                </span>
              </div>

              <div className="mt-6 border-t border-[#F6ECEE] pt-6">
                <h2 className="text-sm font-semibold text-[#332229]">
                  About this service
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#7C686E]">
                  {service.description}
                </p>
              </div>
            </section>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-[#F0E1E4] bg-white p-6 shadow-[0_18px_45px_rgba(72,31,44,0.08)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A38E94]">
                Starting from
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-[#772D43]">
                ৳{price.toLocaleString("en-US")}
              </p>

              <div className="mt-4 space-y-2 border-y border-[#F6ECEE] py-4 text-[11px] text-[#7C686E]">
                <p className="flex items-start gap-2">
                  <FiCheckCircle className="mt-0.5 size-3.5 shrink-0 text-[#2F8A57]" />
                  Only approved and active services can be booked.
                </p>

                <p className="flex items-start gap-2">
                  <FiClock className="mt-0.5 size-3.5 shrink-0 text-[#B76E79]" />
                  Your request stays pending until the vendor responds.
                </p>

                <p className="flex items-start gap-2">
                  <FiShield className="mt-0.5 size-3.5 shrink-0 text-[#B76E79]" />
                  No payment is needed to send a booking request.
                </p>
              </div>

              <div className="mt-5">
                <h2 className="mb-3 text-sm font-semibold text-[#332229]">
                  Request a booking
                </h2>
                <BookingForm
                  serviceId={service._id}
                  serviceName={service.serviceName}
                  vendorEmail={service.userEmail}
                  vendorId={service.vendorId}
                  role={role}
                  userEmail={session.user.email}
                />
              </div>
            </section>
            <section className="rounded-2xl border border-[#F0E1E4] bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-[#FBF1F2] text-[#772D43]">
                  <FiUser className="size-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#A38E94]">
                    Vendor
                  </p>

                  <p
                    className="truncate text-sm font-semibold text-[#332229]"
                    title={service.userEmail}
                  >
                    {service.userEmail}
                  </p>
                </div>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[10px] text-[#7C686E]">
                <FiCheckCircle className="size-3.5 text-[#2F8A57]" />
                WedPlan service provider
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}