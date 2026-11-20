import { FiCheck, FiCreditCard } from "react-icons/fi";

const features = [
  "Unlimited service listings",
  "Priority placement in search",
  "Booking request management",
  "Transaction history",
];

export default function VendorSubscriptionPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#378A88]">
          Vendor
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#193F5B] sm:text-3xl">
          Subscription
        </h1>
        <p className="mt-1.5 text-sm text-[#87939E]">
          View your current plan and available vendor features.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E1E8ED] bg-white shadow-[0_1px_2px_rgba(25,63,91,0.04)]">
        <div className="border-b border-[#E1E8ED] bg-[#F8FAFC] p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#E4F3F1] text-[#378A88]">
                <FiCreditCard className="size-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#87939E]">
                  Current Plan
                </p>
                <p className="text-xl font-semibold text-[#193F5B]">Free</p>
              </div>
            </div>

            <span className="rounded-full bg-[#C8F09A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#193F5B]">
              Active
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs leading-5 text-[#87939E]">
            You are using the free vendor plan. Paid plans will be available
            soon.
          </p>

          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 rounded-lg border border-[#E1E8ED] bg-[#F8FAFC] px-3 py-2.5 text-xs font-medium text-[#193F5B]"
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#E4F3F1] text-[#378A88]">
                  <FiCheck className="size-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#CFE7E4] bg-[#E4F3F1] px-4 py-3">
        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#378A88]" />
        <p className="text-[11px] leading-5 text-[#193F5B]">
          Subscription upgrades and payments will be connected in a later step.
        </p>
      </div>
    </div>
  );
}
