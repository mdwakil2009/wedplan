import { FiCalendar } from "react-icons/fi";

export default function VendorBookingRequestsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          VENDOR
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          Booking Requests
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          Accept or decline booking requests from customers.
        </p>
      </div>

      <div className="rounded-xl border border-[#EDE2E5] bg-white p-12 text-center shadow-[0_2px_12px_rgba(75,35,48,0.04)]">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#F8EFF0] text-[#772D43]">
          <FiCalendar className="size-5" />
        </div>
        <h2 className="mt-4 text-sm font-semibold text-[#292329]">
          No booking requests yet
        </h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#817780]">
          When a customer requests one of your services, it will appear here.
        </p>
      </div>
    </div>
  );
}
