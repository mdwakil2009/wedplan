
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
    <div className="mt-6 border-t border-slate-100 pt-5">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleStatus("accepted")}
          disabled={isPending}
          className="rounded-lg bg-[#378A88] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#286E6C] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Please wait..." : "Accept"}
        </button>

        <button
          onClick={() => handleStatus("rejected")}
          disabled={isPending}
          className="rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reject
        </button>
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
