import Link from "next/link";
import {
  FiXCircle,
  FiRefreshCw,
  FiArrowLeft,
} from "react-icons/fi";

export default function Cancel() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] px-4 py-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#E1E8ED] bg-white p-5 text-center shadow-lg">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <FiXCircle className="text-4xl text-red-500" />
        </div>

        <h1 className="mt-3 text-xl font-bold text-[#193F5B]">
          Payment Cancelled
        </h1>

        <p className="mt-2 text-xs leading-5 text-[#87939E]">
          Your payment was cancelled. No amount has been charged.
          You can try again whenever you're ready.
        </p>

        <div className="my-5 rounded-xl bg-[#F8FAFC] p-3">
          <p className="text-xs font-medium text-[#87939E]">
            Payment Status
          </p>
          <span className="mt-1 inline-block text-sm font-semibold text-red-500">
            ● Cancelled
          </span>
        </div>

        <Link
          href="/dashboard/vendor/subscription"
          className="flex items-center justify-center gap-2 rounded-lg bg-[#378A88] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2D7472]"
        >
          <FiRefreshCw /> Try Again
        </Link>

        <Link
          href="/dashboard/vendor"
          className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-[#87939E] hover:text-[#193F5B]"
        >
          <FiArrowLeft /> Back to Dashboard
        </Link>
      </div>
    </main>
  );
}