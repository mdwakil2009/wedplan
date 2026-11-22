import { FiCheck, FiCreditCard, FiStar } from "react-icons/fi";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/action/api";

const freeFeatures = [
  "Maximum 3 active services",
  "Basic vendor dashboard",
  "Booking request management",
];

const premiumFeatures = [
  "Unlimited active services",
  "Premium vendor badge",
  "All free plan features",
  "Priority placement in search",
];

export default async function VendorSubscriptionPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const user = await getUserById(session.user.id);

  const isPremium = user.subscriptionPlan === "premium";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#378A88]">
          Vendor Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#193F5B] sm:text-3xl">
          Subscription Plans
        </h1>

        <p className="mt-1.5 text-sm text-[#87939E]">
          Choose the right plan to grow your wedding business.
        </p>
      </div>

      {/* Current Plan */}
      <div className="flex items-center gap-3 rounded-xl border border-[#CFE7E4] bg-[#E4F3F1] p-4">
        <FiCreditCard className="size-5 text-[#378A88]" />

        <div>
          <p className="text-xs font-medium text-[#87939E]">
            Your Current Plan
          </p>

          <p className="text-xl font-semibold text-[#193F5B]">
            {isPremium ? "Premium" : "Free"}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
            isPremium
              ? "bg-[#C8F09A] text-[#193F5B]"
              : "bg-[#E4F3F1] text-[#378A88]"
          }`}
        >
          {isPremium ? "Premium Member" : "Free Plan"}
        </span>
      </div>

      {/* Plans */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Free Plan */}
        <div className="rounded-2xl border border-[#E1E8ED] bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-[#193F5B]">
              Free Plan
            </h2>

            <p className="mt-1 text-sm text-[#87939E]">
              Start growing your wedding business.
            </p>
          </div>

          <div className="mt-5">
            <span className="text-3xl font-bold text-[#193F5B]">
              ৳0
            </span>

            <span className="text-sm text-[#87939E]"> / forever</span>
          </div>

          <div className="mt-5 space-y-3">
            {freeFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <FiCheck className="size-4 shrink-0 text-[#378A88]" />

                <span className="text-sm text-[#526779]">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          <button
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] px-4 py-3 text-sm font-semibold text-[#87939E]"
          >
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="relative rounded-2xl border-2 border-[#378A88] bg-white p-5 shadow-sm sm:p-6">
          <span className="absolute -top-3 right-5 rounded-full bg-[#378A88] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Recommended
          </span>

          <div className="flex items-center gap-2">
            <FiStar className="size-5 text-[#378A88]" />

            <h2 className="text-lg font-semibold text-[#193F5B]">
              Premium Plan
            </h2>
          </div>

          <p className="mt-1 text-sm text-[#87939E]">
            Unlock more opportunities for your business.
          </p>

          <div className="mt-5">
            <span className="text-3xl font-bold text-[#193F5B]">
              ৳999
            </span>

            <span className="text-sm text-[#87939E]"> / month</span>
          </div>

          <div className="mt-5 space-y-3">
            {premiumFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <FiCheck className="size-4 shrink-0 text-[#378A88]" />

                <span className="text-sm text-[#526779]">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Dynamic Premium Button */}
          <button
            disabled={isPremium}
            className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isPremium
                ? "cursor-not-allowed bg-[#E4F3F1] text-[#378A88]"
                : "bg-[#378A88] text-white hover:bg-[#2D7472]"
            }`}
          >
            {isPremium
              ? "Current Premium Plan"
              : "Upgrade to Premium"}
          </button>
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-xl border border-[#E1E8ED] bg-[#F8FAFC] p-4">
        <p className="text-xs leading-5 text-[#87939E]">
          Premium subscription payment will be processed securely through
          Stripe. Your Premium access will be activated after successful
          payment verification.
        </p>
      </div>
    </div>
  );
}