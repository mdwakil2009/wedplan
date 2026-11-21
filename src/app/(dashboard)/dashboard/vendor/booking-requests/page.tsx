
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import {
  FiCalendar,
  FiMapPin,
  FiMessageSquare,
} from "react-icons/fi";

import {
  getVendorBookings,
  getUserById,
} from "@/lib/action/api";

import type { Booking } from "@/lib/types/service";

export default async function VendorBookingRequestsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let bookings: Booking[] = [];

  if (session?.user?.id) {
    try {
      const vendorBookings = await getVendorBookings(session.user.id);

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
    <div className="mx-auto w-full max-w-6xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#378A88]">
          Vendor Dashboard
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#193F5B] sm:text-3xl">
          Booking Requests
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage and review booking requests from your customers.
        </p>
      </div>

      {/* Booking Requests */}
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-14">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#E4F3F1] text-[#378A88]">
            <FiCalendar className="size-6" />
          </div>

          <h2 className="mt-4 text-base font-semibold text-[#193F5B]">
            No booking requests yet
          </h2>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            When a customer requests one of your services, their booking
            details will appear here.
          </p>
        </div>
      ) : (
       <div className="w-full space-y-5">
          {bookings.map((booking: Booking) => (
            <div
              key={booking._id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] sm:p-6"
            >
              {/* Left Accent Line */}
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#378A88] to-[#A8D5CD]" />

              {/* Booking Header */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                    New Request
                  </p>

                  <h2 className="mt-1 text-lg font-bold tracking-tight text-[#193F5B]">
                    Booking Request
                  </h2>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200/70 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold capitalize text-amber-700">
                  <span className="size-1.5 rounded-full bg-amber-500" />
                  {booking.status}
                </span>
              </div>

              {/* Customer Profile */}
              <div className="mt-6 flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="shrink-0 rounded-full bg-gradient-to-br from-[#378A88] via-[#A8D5CD] to-[#193F5B] p-[2px]">
                  <img
                    src={
                      booking.customer?.image ||
                      "/default-avatar.png"
                    }
                    alt={booking.customer?.name || "Customer"}
                    className="size-14 rounded-full border-2 border-white bg-white object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-[#193F5B]">
                    {booking.customer?.name || "Unknown Customer"}
                  </h3>

                  <p className="mt-1 truncate text-xs text-slate-500">
                    {booking.customer?.email || "No email available"}
                  </p>

                  <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#378A88]">
                    Customer
                  </p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="mt-6 space-y-5">
                {/* Event Date */}
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
                    <FiCalendar className="size-4" />
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-medium text-slate-400">
                      Event Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#193F5B]">
                      {booking.eventDate}
                    </p>
                  </div>
                </div>

                {/* Event Location */}
                <div className="flex items-start gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
                    <FiMapPin className="size-4" />
                  </div>

                  <div className="min-w-0 pt-0.5">
                    <p className="text-xs font-medium text-slate-400">
                      Event Location
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#193F5B]">
                      {booking.eventLocation}
                    </p>
                  </div>
                </div>

                {/* Customer Message */}
                {booking.message && (
                  <div className="flex items-start gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
                      <FiMessageSquare className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1 pt-0.5">
                      <p className="text-xs font-medium text-slate-400">
                        Customer Message
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {booking.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
