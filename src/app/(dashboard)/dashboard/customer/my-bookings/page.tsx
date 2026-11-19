import Link from "next/link";
import { FiCalendar, FiShoppingBag } from "react-icons/fi";

export default function CustomerMyBookingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          CUSTOMER
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          My Bookings
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          Follow all your booking requests in one place.
        </p>
      </div>

      <div className="rounded-xl border border-[#EDE2E5] bg-white p-12 text-center shadow-[0_2px_12px_rgba(75,35,48,0.04)]">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#F8EFF0] text-[#772D43]">
          <FiCalendar className="size-5" />
        </div>
        <h2 className="mt-4 text-sm font-semibold text-[#292329]">
          No bookings yet
        </h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#817780]">
          Your booking requests and confirmed bookings will appear here.
        </p>
        <Link
          href="/services"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#772D43] hover:underline"
        >
          <FiShoppingBag className="size-3.5" />
          Browse services
        </Link>
      </div>
    </div>
  );
}
