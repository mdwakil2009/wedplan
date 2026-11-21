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

export default async function CustomerMyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let bookings: Booking[] = [];

  if (session?.user?.id) {
    try {
      bookings = await getCustomerBookings(session.user.id);
    } catch (error) {
      console.error("Failed to fetch customer bookings:", error);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#378A88]">
          Customer
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#193F5B] sm:text-3xl">
          My Bookings
        </h1>

        <p className="mt-1.5 text-sm text-[#87939E]">
          Follow all your booking requests in one place.
        </p>
      </div>

      {/* Empty State */}
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-[#E1E8ED] bg-white p-10 text-center shadow-sm sm:p-14">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#E4F3F1] text-[#378A88]">
            <FiCalendar className="size-6" />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-[#193F5B]">
            No bookings yet
          </h2>

          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#87939E]">
            Your booking requests and confirmed bookings will appear here.
          </p>

          <Link
            href="/services"
            className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#378A88] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#2C7371]"
          >
            <FiShoppingBag className="size-3.5" />
            Browse services
          </Link>
        </div>
      ) : (
        /* Booking Cards */
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border border-[#E1E8ED] bg-white p-5 shadow-sm"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold text-[#193F5B]">
                  Booking Request
                </h2>

                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                    booking.status === "pending"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : booking.status === "accepted"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : booking.status === "rejected"
                          ? "border-red-200 bg-red-50 text-red-600"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Service Information */}
              {booking.service && (
                <div className="mt-4 flex flex-col gap-4 rounded-xl bg-slate-50 p-3 sm:flex-row">
                  {/* Service Image */}
                  <div className="h-44 w-full overflow-hidden rounded-lg bg-slate-200 sm:h-32 sm:w-44 sm:shrink-0">
                    <img
                      src={booking.service.images?.[0]}
                      alt={booking.service.serviceName}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Service Details */}
                  <div className="flex-1 space-y-2">
                    <p className="text-xs font-medium text-[#378A88]">
                      {booking.service.category}
                    </p>

                    <h3 className="text-lg font-semibold text-[#193F5B]">
                      {booking.service.serviceName}
                    </h3>

                    <div className="flex items-center gap-1.5 text-sm font-semibold text-[#378A88]">
                      <FiDollarSign />
                      {booking.service.price.toLocaleString("en-BD")} BDT
                    </div>

                    {/* Vendor Information */}
                    <div className="flex items-start gap-2 border-t border-slate-200 pt-2">
                      <FiUser className="mt-0.5 text-[#378A88]" />

                      <div>
                        <p className="text-xs text-slate-400">
                          Service Provider
                        </p>

                        <p className="text-sm font-medium text-[#193F5B]">
                          {booking.vendor?.name || "Vendor"}
                        </p>

                        <p className="text-xs text-slate-500">
                          {booking.vendor?.email || "Email unavailable"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Information */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {/* Event Date */}
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
                    <FiCalendar />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Event Date
                    </p>

                    <p className="text-sm font-medium text-[#193F5B]">
                      {booking.eventDate}
                    </p>
                  </div>
                </div>

                {/* Event Location */}
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#E4F3F1] text-[#378A88]">
                    <FiMapPin />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Event Location
                    </p>

                    <p className="text-sm font-medium text-[#193F5B]">
                      {booking.eventLocation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {booking.message && (
                <div className="mt-4 flex items-start gap-3 rounded-lg bg-slate-50 p-3">
                  <FiMessageSquare className="mt-0.5 text-[#378A88]" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Your Message
                    </p>

                    <p className="text-sm text-[#193F5B]">
                      {booking.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Request Date */}
              <div className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-xs text-slate-400">
                  Booking Request Date
                </p>

                <p className="text-sm text-slate-600">
                  {booking.createdAt
                    ? new Date(booking.createdAt).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )
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