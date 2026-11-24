
"use client";

import { useState } from "react";
import { createCheckoutSession } from "@/lib/action/api";

export default function UpgradeButton({
 
}: {
  userId: string;
  email: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    try {
      setLoading(true);

      const data = await createCheckoutSession();

      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        console.log("Checkout Error:", data);
        alert(data.message || "Failed to start payment");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="mt-6 w-full rounded-xl bg-[#378A88] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2D7472] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Redirecting to Stripe..." : "Upgrade to Premium"}
    </button>
  );
}
