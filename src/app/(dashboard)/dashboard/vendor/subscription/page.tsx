export const instant = false;

import { FiCheck, FiCreditCard, FiStar } from "react-icons/fi";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getUserById } from "@/lib/action/api";
import UpgradeButton from "@/components/dashboard/Vendor/UpgradeButton";

import PageHeader from "@/components/dashboard/ui/PageHeader";
import StatusBadge from "@/components/dashboard/ui/StatusBadge";

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

export default async function VendorSubscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const { canceled } = await searchParams;

  if (canceled) {
    console.log("Order canceled. Continue browsing.");
  }

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
      <PageHeader
        eyebrow="Vendor Workspace"
        title="Subscription Plans"
        description="Choose the right plan to grow your wedding business."
      />

      {/* Current Plan */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#DCE6FF] bg-[#EEF4FF] p-4">
        <span className="flex size-10 items-center justify-center rounded-xl bg-white text-[#3A76EF] shadow-sm">
          <FiCreditCard className="size-5" />
        </span>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#7A839B]">
            Your Current Plan
          </p>

          <p className="text-xl font-bold text-[#252B45]">
            {isPremium ? "Premium" : "Free"}
          </p>
        </div>

        <StatusBadge
          status={isPremium ? "premium" : "free"}
          label={isPremium ? "Premium Member" : "Free Plan"}
          className="ml-auto"
        />
      </div>

      {/* Plans */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Free Plan */}
        <div className="rounded-2xl border border-[#E7EBF5] bg-white p-5 shadow-[0_1px_2px_rgba(37,43,69,0.04)] sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-[#252B45]">Free Plan</h2>

            <p className="mt-1 text-sm text-[#7A839B]">
              Start growing your wedding business.
            </p>
          </div>

          <div className="mt-5">
            <span className="text-3xl font-bold text-[#252B45]">৳0</span>

            <span className="text-sm text-[#7A839B]">/ forever</span>
          </div>

          <div className="mt-5 space-y-3">
            {freeFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <FiCheck className="size-4 shrink-0 text-[#3A76EF]" />

                <span className="text-sm text-[#5B6478]">{feature}</span>
              </div>
            ))}
          </div>

          <button
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-xl border border-[#E7EBF5] bg-[#F9FAFF] px-4 py-3 text-sm font-semibold text-[#8A93A8]"
          >
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="relative rounded-2xl border-2 border-[#3A76EF] bg-white p-5 shadow-[0_18px_40px_-24px_rgba(58,118,239,0.5)] sm:p-6">
          <span className="absolute -top-3 right-5 rounded-full bg-[#3A76EF] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Recommended
          </span>

          <div className="flex items-center gap-2">
            <FiStar className="size-5 text-[#3A76EF]" />

            <h2 className="text-lg font-bold text-[#252B45]">
              Premium Plan
            </h2>
          </div>

          <p className="mt-1 text-sm text-[#7A839B]">
            Unlock more opportunities for your business.
          </p>

          <div className="mt-5">
            <span className="text-3xl font-bold text-[#252B45]">৳999</span>

            <span className="text-sm text-[#7A839B]">/ month</span>
          </div>

          <div className="mt-5 space-y-3">
            {premiumFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <FiCheck className="size-4 shrink-0 text-[#3A76EF]" />

                <span className="text-sm text-[#5B6478]">{feature}</span>
              </div>
            ))}
          </div>

          {/* Premium Button */}
          {isPremium ? (
            <button
              disabled
              className="mt-6 w-full cursor-not-allowed rounded-xl bg-[#EEF4FF] px-4 py-3 text-sm font-semibold text-[#3A76EF]"
            >
              Current Premium Plan
            </button>
          ) : (
            <UpgradeButton
              userId={session.user.id}
              email={session.user.email}
            />
          )}
        </div>
      </div>

      {/* Notice */}
      <div className="rounded-2xl border border-[#E7EBF5] bg-white p-4">
        <p className="text-xs leading-5 text-[#7A839B]">
          Premium subscription payment will be processed securely through
          Stripe. Your Premium access will be activated after successful payment
          verification.
        </p>
      </div>
    </div>
  );
}
