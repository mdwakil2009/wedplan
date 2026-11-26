
"use client";

import { useState } from "react";
import { createCheckoutSession } from "@/lib/action/api";
import { toast } from "@/components/ui/toast";

export default function UpgradeButton({
}: {
  userId: string;
  email: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const data = await createCheckoutSession();

      if (!data.success || !data.url) {
        throw new Error(
          data.message || "Failed to start payment."
        );
      }

      toast.add({
        title: "Redirecting to Stripe",
        description: "Please wait while we prepare your payment.",
      });

      window.location.href = data.url;
    } catch (error) {
      console.error("Checkout Error:", error);

      toast.add({
        title: "Payment Error",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });

      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="mt-6 w-full rounded-xl bg-[#3A76EF] px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(58,118,239,0.9)] transition-all duration-200 hover:bg-[#2F63D4] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/40"
    >
      {loading ? "Redirecting to Stripe..." : "Upgrade to Premium"}
    </button>
  );
}
