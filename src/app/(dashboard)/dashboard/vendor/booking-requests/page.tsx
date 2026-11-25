export const instant = false;
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { FiCalendar, FiMapPin, FiMessageSquare } from "react-icons/fi";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getVendorBookingsWithService, getUserById } from "@/lib/action/api";

import type { Booking } from "@/lib/types/service";

import BookingStatusButtons from "@/components/dashboard/Vendor/BookingStatusButtons";
import PageHeader from "@/components/dashboard/ui/PageHeader";
import StatusBadge from "@/components/dashboard/ui/StatusBadge";
import EmptyState from "@/components/dashboard/ui/EmptyState";

export default async function VendorBookingRequestsPage() {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  // Get Vendor JWT Token (Temporary Debugging)
  const tokenData = await auth.api.getToken({
    headers: requestHeaders,
  });
  console.log(tokenData.token);
  console.log("Token exists:", !!tokenData.token);
  console.log("Token type:", typeof tokenData.token);
  console.log("Token parts:", tokenData.token?.split(".").length);

  let bookings: Booking[] = [];

  if (session?.user?.id) {
    try {
      const vendorBookings = await getVendorBookingsWithService();

      bookings = await Promise.all(
        vendorBookings.map(async (booking: Booking) => {
          const customer = await getUserById(booking.customerId);

          return {
            ...booking,
            customer,
          };
        }),
      );
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Vendor Workspace"
        title="Booking Requests"
        description="Manage and review booking requests from your customers."
      />

      {/* Booking Requests */}
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-[#E7EBF5] bg-white p-5 shadow-[0_1px_2px_rgba(37,43,69,0.04)] sm:p-6">
          <EmptyState
            icon={FiCalendar}
            title="No booking requests yet"
            description="When a customer requests one of your services, their booking details will appear here."
          />
        </div>
      ) : (
        <div className="w-full space-y-4">
          {bookings.map((booking: Booking) => (
            <div
              key={booking._id}
              className="relative w-full overflow-hidden rounded-2xl border border-[#E7EBF5] bg-white shadow-[0_1px_2px_rgba(37,43,69,0.04)] transition-all duration-200 hover:border-[#C9D9FF] hover:shadow-[0_16px_36px_-24px_rgba(37,43,69,0.3)]"
            >
              {/* Left Accent */}
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#3A76EF]" />

              <div className="flex flex-row items-center justify-between gap-3 px-5 pb-0 pt-4 sm:px-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8A93A8]">
                    Booking Request
                  </p>

                  <h2 className="mt-0.5 text-base font-bold text-[#252B45]">
                    Customer Booking
                  </h2>
                </div>

                <StatusBadge status={booking.status} />
              </div>

              <div className="space-y-4 px-5 pb-5 pt-3 sm:px-6">
                {/* Booked Service Information */}
                {booking.service && (
                  <div className="flex flex-col gap-3 rounded-2xl border border-[#EDF0F8] bg-[#F9FAFF] p-3 sm:flex-row">
                    <div className="h-40 w-full shrink-0 overflow-hidden rounded-xl bg-[#EEF4FF] sm:h-28 sm:w-36">
                      <img
                        src={booking.service.images?.[0]}
                        alt={booking.service.serviceName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#3A76EF]">
                        Booked Service
                      </p>

                      <h3 className="text-base font-bold text-[#252B45]">
                        {booking.service.serviceName}
                      </h3>

                      <p className="text-xs text-[#7A839B]">
                        {booking.service.category}
                      </p>

                      <p className="text-sm font-bold text-[#3A76EF]">
                        ৳{booking.service.price.toLocaleString()}
                      </p>

                      <p className="text-xs text-[#7A839B]">
                        Service Location: {booking.service.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Customer Profile */}
                <div className="flex items-center gap-3 rounded-xl border border-[#EDF0F8] bg-[#FCFDFF] p-3">
                  <Avatar className="size-11 border-2 border-white shadow-sm">
                    <AvatarImage
                      src={booking.customer?.image || ""}
                      alt={booking.customer?.name || "Customer"}
                    />

                    <AvatarFallback className="bg-[#EEF4FF] font-bold text-[#3A76EF]">
                      {booking.customer?.name?.charAt(0).toUpperCase() || "C"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-[#252B45]">
                      {booking.customer?.name || "Unknown Customer"}
                    </h3>

                    <p className="truncate text-xs text-[#8A93A8]">
                      {booking.customer?.email || "No email available"}
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-2.5 rounded-xl border border-[#EDF0F8] p-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3A76EF]">
                      <FiCalendar className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A93A8]">
                        Event Date
                      </p>

                      <p className="truncate text-sm font-semibold text-[#252B45]">
                        {booking.eventDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 rounded-xl border border-[#EDF0F8] p-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3A76EF]">
                      <FiMapPin className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A93A8]">
                        Event Location
                      </p>

                      <p className="truncate text-sm font-semibold text-[#252B45]">
                        {booking.eventLocation}
                      </p>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-[#EDF0F8] p-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#EEF4FF] text-[#3A76EF]">
                        <FiMessageSquare className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8A93A8]">
                          Customer Message
                        </p>

                        <p className="truncate text-sm font-medium text-[#252B45]">
                          {booking.message}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Accept / Reject Buttons */}
                <BookingStatusButtons
                  bookingId={booking._id}
                  status={booking.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
