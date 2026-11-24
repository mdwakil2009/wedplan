export const instant = false;
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { FiCalendar, FiMapPin, FiMessageSquare } from "react-icons/fi";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getVendorBookingsWithService, getUserById } from "@/lib/action/api";

import type { Booking } from "@/lib/types/service";

import BookingStatusButtons from "@/components/dashboard/Vendor/BookingStatusButtons";

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
      {/* Page Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#378A88]">
          Vendor Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#193F5B] sm:text-3xl">
          Booking Requests
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage and review booking requests from your customers.
        </p>
      </div>

      {/* Booking Requests */}
      {bookings.length === 0 ? (
        <Card className="rounded-2xl border-slate-200 shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88]">
              <FiCalendar className="size-5" />
            </div>

            <h2 className="mt-4 font-semibold text-[#193F5B]">
              No booking requests yet
            </h2>

            <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
              When a customer requests one of your services, their booking
              details will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="w-full space-y-4">
          {bookings.map((booking: Booking) => (
            <Card
              key={booking._id}
              className="relative w-full overflow-hidden rounded-xl border-slate-200/80 bg-white py-0 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Left Accent */}
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-[#378A88]" />

              <CardHeader className="flex flex-row items-center justify-between gap-3 px-5 pt-4 pb-0 sm:px-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Booking Request
                  </p>

                  <h2 className="mt-0.5 text-base font-bold text-[#193F5B]">
                    Customer Booking
                  </h2>
                </div>

                <Badge
                  variant="outline"
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize ${
                    booking.status === "pending"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : booking.status === "accepted"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-red-200 bg-red-50 text-red-600"
                  }`}
                >
                  {booking.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4 px-5 pt-3 pb-4 sm:px-6">
                {/* Booked Service Information */}
                {booking.service && (
                  <div className="flex flex-col gap-3 rounded-lg border border-[#D7EAE7] bg-[#F5FAF9] p-3 sm:flex-row">
                    <div className="h-40 w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-36">
                      <img
                        src={booking.service.images?.[0]}
                        alt={booking.service.serviceName}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1 space-y-1.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#378A88]">
                        Booked Service
                      </p>

                      <h3 className="text-base font-bold text-[#193F5B]">
                        {booking.service.serviceName}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {booking.service.category}
                      </p>

                      <p className="text-sm font-bold text-[#378A88]">
                        ৳{booking.service.price.toLocaleString()}
                      </p>

                      <p className="text-xs text-slate-500">
                        Service Location: {booking.service.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Customer Profile */}
                <div className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3">
                  <Avatar className="size-11 border-2 border-white shadow-sm">
                    <AvatarImage
                      src={booking.customer?.image || ""}
                      alt={booking.customer?.name || "Customer"}
                    />

                    <AvatarFallback className="bg-[#E4F3F1] font-semibold text-[#378A88]">
                      {booking.customer?.name?.charAt(0).toUpperCase() || "C"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-[#193F5B]">
                      {booking.customer?.name || "Unknown Customer"}
                    </h3>

                    <p className="truncate text-xs text-slate-500">
                      {booking.customer?.email || "No email available"}
                    </p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
                      <FiCalendar className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-400">Event Date</p>

                      <p className="truncate text-sm font-semibold text-[#193F5B]">
                        {booking.eventDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
                      <FiMapPin className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-slate-400">
                        Event Location
                      </p>

                      <p className="truncate text-sm font-semibold text-[#193F5B]">
                        {booking.eventLocation}
                      </p>
                    </div>
                  </div>

                  {booking.message && (
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
                        <FiMessageSquare className="size-4" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] text-slate-400">
                          Customer Message
                        </p>

                        <p className="truncate text-sm font-medium text-[#193F5B]">
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
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
