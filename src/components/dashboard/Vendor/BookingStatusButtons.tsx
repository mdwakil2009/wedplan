"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateBookingStatus } from "@/lib/action/api";

type Props = {
  bookingId: string;
  status: string;
};

export default function BookingStatusButtons({
  bookingId,
  status,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleStatus = (newStatus: "accepted" | "rejected") => {
    setError("");

    startTransition(async () => {
      try {
        const result = await updateBookingStatus(
          bookingId,
          newStatus
        );

        if (!result.success) {
          throw new Error(result.message);
        }

        router.refresh();
      } catch (error) {
        console.error("Booking Status Error:", error);
        setError("Something went wrong. Please try again.");
      }
    });
  };

  if (status !== "pending") {
    return null;
  }

  return (
    <div className="mt-5 border-t border-[#EDF0F8] pt-5">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleStatus("accepted")}
          disabled={isPending}
          className="rounded-xl bg-[#3A76EF] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_-12px_rgba(58,118,239,0.9)] transition-all duration-200 hover:bg-[#2F63D4] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A76EF]/40"
        >
          {isPending ? "Please wait..." : "Accept"}
        </button>

        <button
          onClick={() => handleStatus("rejected")}
          disabled={isPending}
          className="rounded-xl border border-[#F8CACA] bg-[#FEF0F0] px-5 py-2.5 text-sm font-semibold text-[#C93B3B] transition-all duration-200 hover:border-[#C93B3B] hover:bg-[#C93B3B] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C93B3B]/30"
        >
          Reject
        </button>
      </div>

      {error && (
        <p className="mt-3 text-xs text-[#C93B3B]">
          {error}
        </p>
      )}
    </div>
  );
}
