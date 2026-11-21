import Link from "next/link";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

export default function ServiceNotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-[#FFFCF9] px-4 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-[#F0E1E4] bg-white p-8 text-center shadow-[0_18px_45px_rgba(72,31,44,0.08)] sm:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-[#FBF1F2] text-[#772D43]">
          <FiSearch className="size-7" />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B76E79]">
          Service not found
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#332229]">
          This service is not available
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#8B767C]">
          The service you are looking for does not exist, is waiting for
          approval, or is no longer active. Explore our approved services
          instead.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href="/services"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#772D43] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#5F2034]"
          >
            <FiArrowLeft className="size-4" />
            Back to services
          </Link>

          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#D9BCC2] px-5 text-xs font-semibold text-[#772D43] transition-colors hover:bg-[#FBF1F2]"
          >
            Go to home
          </Link>
        </div>
      </div>
    </main>
  );
}
