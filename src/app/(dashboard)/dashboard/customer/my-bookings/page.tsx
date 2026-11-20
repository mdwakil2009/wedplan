import Link from "next/link";
import { FiCalendar, FiShoppingBag } from "react-icons/fi";

export default function CustomerMyBookingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
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

      <div className="rounded-2xl border border-[#E1E8ED] bg-white p-10 text-center shadow-[0_1px_2px_rgba(25,63,91,0.04)] sm:p-14">
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
          className="mt-5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#378A88] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#2C7371] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#378A88]/40"
        >
          <FiShoppingBag className="size-3.5" />
          Browse services
        </Link>
      </div>
    </div>
  );
}
