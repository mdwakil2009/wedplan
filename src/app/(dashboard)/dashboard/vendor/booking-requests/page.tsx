import { FiCalendar } from "react-icons/fi";

export default function VendorBookingRequestsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#378A88]">
          Vendor
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#193F5B] sm:text-3xl">
          Booking Requests
        </h1>
        <p className="mt-1.5 text-sm text-[#87939E]">
          Accept or decline booking requests from customers.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E1E8ED] bg-white p-10 text-center shadow-[0_1px_2px_rgba(25,63,91,0.04)] sm:p-14">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#E4F3F1] text-[#378A88]">
          <FiCalendar className="size-6" />
        </div>
        <h2 className="mt-4 text-sm font-semibold text-[#193F5B]">
          No booking requests yet
        </h2>
        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#87939E]">
          When a customer requests one of your services, it will appear here.
        </p>
      </div>
    </div>
  );
}
