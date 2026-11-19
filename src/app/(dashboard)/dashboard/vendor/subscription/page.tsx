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
        <p className="text-[10px] font-semibold tracking-[0.18em] text-[#9A5269]">
          VENDOR
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#292329] sm:text-3xl">
          Subscription
        </h1>
        <p className="mt-1 text-sm text-[#817780]">
          View your current plan and available vendor features.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#EDE2E5] bg-white shadow-[0_2px_12px_rgba(75,35,48,0.04)]">
        <div className="border-b border-[#F0E7E8] bg-[#FFFCF9] p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#F8EFF0] text-[#772D43]">
                <FiCreditCard className="size-4" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#91858C]">
                  Current Plan
                </p>
                <p className="text-lg font-semibold text-[#292329]">Free</p>
              </div>
            </div>

            <span className="rounded-full bg-[#F8EFF0] px-2.5 py-1 text-[10px] font-semibold text-[#772D43]">
              ACTIVE
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs leading-5 text-[#817780]">
            You are using the free vendor plan. Paid plans will be available
            soon.
          </p>

          <ul className="mt-4 space-y-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-xs text-[#5C5158]"
              >
                <span className="flex size-4 items-center justify-center rounded-full bg-[#F8EFF0] text-[#772D43]">
                  <FiCheck className="size-2.5" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-[#F0E7E8] bg-[#FFFCF9] px-4 py-3 text-[11px] text-[#817780]">
        Subscription upgrades and payments will be connected in a later step.
      </div>
    </div>
  );
}
