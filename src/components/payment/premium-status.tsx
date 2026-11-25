
"use client";

import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";

type PremiumStatusProps = {
  token: string;
  initialPremium: boolean;
};

export default function PremiumStatus({
  token,
  initialPremium,
}: PremiumStatusProps) {
  const [isPremium, setIsPremium] = useState(initialPremium);

  useEffect(() => {
    if (isPremium) return;

    let isMounted = true;

    const checkPremiumStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-subscription`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }
        );

        if (!response.ok) return;

        const result = await response.json();

        if (isMounted && result.success && result.isPremium) {
          setIsPremium(true);
        }
      } catch (error) {
        console.error("Premium Status Error:", error);
      }
    };

    checkPremiumStatus();

    const interval = setInterval(checkPremiumStatus, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [token, isPremium]);

  return (
    <span
      className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold ${
        isPremium
          ? "bg-green-50 text-green-700"
          : "bg-[#FFF8E8] text-[#B47A17]"
      }`}
    >
      <FiStar />
      {isPremium ? "PREMIUM MEMBER" : "ACTIVATION PENDING"}
    </span>
  );
}
