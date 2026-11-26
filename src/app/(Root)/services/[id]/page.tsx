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

  // Authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/sign-in?redirect=${encodeURIComponent(`/services/${id}`)}`);
  }

  // Fetch service
  let service: Service | null = null;

  try {
    const data = await getServiceById(id);

    service = data as Service | null;
  } catch (error) {
    console.error("Service Details Error:", error);
  }

  if (!service) {
    notFound();
  }

  // Service availability
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
    <main className="min-h-screen bg-[#FFFCF9] pb-16 transition-colors duration-300 dark:bg-[#1D2421]">
      {/* Header */}
      <div className="border-b border-[#F1E4E6] bg-[#FBF3F2] dark:border-[#34413A] dark:bg-[#29332E]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#772D43] transition-colors hover:text-[#5F2034] dark:text-[#D9A58E]"
          >
            <FiArrowLeft className="size-4" />
            Back to all services
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* Left Section */}
          <div>
            <ServiceGallery
              images={service.images || []}
              name={service.serviceName}
            />

            {/* Service Details */}
            <section className="mt-8 rounded-3xl border border-[#F0E1E4] bg-white p-6 shadow-[0_12px_35px_rgba(72,31,44,0.05)] dark:border-[#34413A] dark:bg-[#29332E] sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF1F2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#772D43] dark:bg-[#49313A] dark:text-[#F0C3CF]">
                  <FiTag className="size-3" />
                  {service.category}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1FAF4] px-3 py-1.5 text-[10px] font-semibold text-[#2F8A57] dark:bg-[#244333] dark:text-[#9BD5AE]">
                  <FiCheckCircle className="size-3" />
                  Approved service
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-[#332229] dark:text-[#F5FAF6] sm:text-3xl lg:text-4xl">
                {service.serviceName}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#7C686E] dark:text-[#B2BDB5]">
                <span className="inline-flex items-center gap-1.5">
                  <FiMapPin className="size-3.5 text-[#B76E79] dark:text-[#D9A58E]" />
                  {service.location}
                </span>
              </div>

              <div className="mt-6 border-t border-[#F6ECEE] pt-6 dark:border-[#46534B]">
                <h2 className="text-sm font-semibold text-[#332229] dark:text-[#F5FAF6]">
                  About this service
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#7C686E] dark:text-[#B2BDB5]">
                  {service.description}
                </p>
              </div>
            </section>
          </div>

          {/* Right Section */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-3xl border border-[#F0E1E4] bg-white p-6 shadow-[0_18px_45px_rgba(72,31,44,0.08)] dark:border-[#34413A] dark:bg-[#29332E]">
              {/* Price */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A38E94] dark:text-[#9EADA3]">
                Starting from
              </p>

              <p className="mt-1 text-3xl font-bold tracking-tight text-[#772D43] dark:text-[#D9A58E]">
                ৳{price.toLocaleString("en-US")}
              </p>

              {/* Information */}
              <div className="mt-4 space-y-2 border-y border-[#F6ECEE] py-4 text-[11px] text-[#7C686E] dark:border-[#46534B] dark:text-[#B2BDB5]">
                <p className="flex items-start gap-2">
                  <FiCheckCircle className="mt-0.5 size-3.5 shrink-0 text-[#2F8A57]" />
                  Only approved and active services can be booked.
                </p>

                <p className="flex items-start gap-2">
                  <FiClock className="mt-0.5 size-3.5 shrink-0 text-[#B76E79] dark:text-[#D9A58E]" />
                  Your request stays pending until the vendor responds.
                </p>

                <p className="flex items-start gap-2">
                  <FiShield className="mt-0.5 size-3.5 shrink-0 text-[#B76E79] dark:text-[#D9A58E]" />
                  No payment is needed to send a booking request.
                </p>
              </div>

              {/* Booking Form */}
              <div className="mt-5">
                <h2 className="mb-3 text-sm font-semibold text-[#332229] dark:text-[#F5FAF6]">
                  Request a booking
                </h2>

                <BookingForm
                  serviceId={service._id}
                  serviceName={service.serviceName}
                  vendorName={service.vendor?.name}
                  vendorEmail={service.vendor?.email || ""}
                  vendorImage={service.vendor?.image}
                  vendorId={service.userEmail}
                  role={role}
                  userEmail={session.user.email}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
