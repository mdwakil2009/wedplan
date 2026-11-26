import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import {
  FiCalendar,
  FiShoppingBag,
  FiMapPin,
  FiMessageSquare,
  FiUser,
  FiDollarSign,
} from "react-icons/fi";

import { getCustomerBookings } from "@/lib/action/api";
import type { Booking } from "@/lib/types/service";

import PageHeader from "@/components/dashboard/ui/PageHeader";
import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import EmptyState from "@/components/dashboard/ui/EmptyState";
import { Suspense } from "react";
import CustomerMyBookingsSkeleton from "@/components/dashboard/customer/CustomerMyBookingsSkeleton";

export default function CustomerMyBookingsPage() {
  return (
    <Suspense fallback={<CustomerMyBookingsSkeleton />}>
      <CustomerMyBookingsContent />
    </Suspense>
  );
}

async function CustomerMyBookingsContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let bookings: Booking[] = [];

  if (session?.user?.id) {
    try {
      bookings = await getCustomerBookings();
    } catch (error) {
      console.error("Failed to fetch customer bookings:", error);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Customer Workspace"
        title="My Bookings"
        description="Follow all your booking requests in one place."
      />

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-[#E7EBF5] bg-white p-5 shadow-[0_1px_2px_rgba(37,43,69,0.04)] sm:p-6">
          <EmptyState
            icon={FiCalendar}
            title="No bookings yet"
            description="Your booking requests and confirmed bookings will appear here."
            action={
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#3A76EF] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#2F63D4]"
              >
                <FiShoppingBag className="size-3.5" />
                Browse services
              </Link>
            }
          />
        </div>
      ) : (
        /* Booking Cards */
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="overflow-hidden rounded-2xl border border-[#E7EBF5] bg-white p-5 shadow-[0_1px_2px_rgba(37,43,69,0.04)] transition-all duration-200 hover:border-[#C9D9FF] hover:shadow-[0_16px_36px_-24px_rgba(37,43,69,0.3)]"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-bold text-[#252B45]">
                  Booking Request
                </h2>

                <StatusBadge status={booking.status} />
              </div>

              {/* Service Information */}
              {booking.service && (
                <div className="mt-4 flex flex-col gap-4 rounded-2xl border border-[#EDF0F8] bg-[#F9FAFF] p-3 sm:flex-row">
                  {/* Service Image */}
                  <div className="h-44 w-full overflow-hidden rounded-xl bg-[#EEF4FF] sm:h-32 sm:w-44 sm:shrink-0">
                    <img
                      src={booking.service.images?.[0]}
                      alt={booking.service.serviceName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#3A76EF]">
                      {booking.service.category}
                    </p>

                    <h3 className="text-lg font-bold text-[#252B45]">
                      {booking.service.serviceName}
                    </h3>

                    <div className="flex items-center gap-1.5 text-sm font-bold text-[#3A76EF]">
                      <FiDollarSign className="size-4" />
                      {booking.service.price.toLocaleString("en-BD")} BDT
                    </div>

                    {/* Vendor Information */}
                    <div className="flex items-start gap-2 border-t border-[#E7EBF5] pt-2">
                      <FiUser className="mt-0.5 size-3.5 text-[#3A76EF]" />

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A93A8]">
                          Service Provider
                        </p>

                        <p className="text-sm font-semibold text-[#252B45]">
                          {booking.vendor?.name || "Vendor"}
                        </p>

                        <p className="text-xs text-[#7A839B]">
                          {booking.vendor?.email || "Email unavailable"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Information */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {/* Event Date */}
                <div className="flex items-center gap-3 rounded-xl border border-[#EDF0F8] p-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3A76EF]">
                    <FiCalendar className="size-4" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A93A8]">
                      Event Date
                    </p>

                    <p className="text-sm font-semibold text-[#252B45]">
                      {booking.eventDate}
                    </p>
                  </div>
                </div>

                {/* Event Location */}
                <div className="flex items-center gap-3 rounded-xl border border-[#EDF0F8] p-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#3A76EF]">
                    <FiMapPin className="size-4" />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A93A8]">
                      Event Location
                    </p>

                    <p className="text-sm font-semibold text-[#252B45]">
                      {booking.eventLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {booking.message && (
                <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#EDF0F8] bg-[#F9FAFF] p-3">
                  <FiMessageSquare className="mt-0.5 size-4 text-[#3A76EF]" />

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A93A8]">
                      Your Message
                    </p>

                    <p className="text-sm text-[#252B45]">{booking.message}</p>
                  </div>
                </div>
              )}

              {/* Request Date */}
              <div className="mt-4 border-t border-[#EDF0F8] pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A93A8]">
                  Booking Request Date
                </p>

                <p className="text-sm text-[#5B6478]">
                  {booking.createdAt
                    ? new Date(booking.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "Date unavailable"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
