
import Link from "next/link";
import { FiShieldOff, FiMail } from "react-icons/fi";

export default function BlockedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EAF5F3] p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-red-500">
          <FiShieldOff className="size-8" />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-[#193F5B]">
          Account Blocked
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Your account has been blocked by the administrator.
          You cannot access the platform features right now.
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#EAF5F3] p-3 text-sm text-[#378A88]">
          <FiMail className="size-4" />
          Please contact the administrator for assistance.
        </div>

        <Link
          href="/sign-in"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#193F5B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#378A88]"
        >
          Back to Sign In
        </Link>

      </div>
    </div>
  );
}
