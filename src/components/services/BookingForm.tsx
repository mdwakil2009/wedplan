"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiLock,
  FiMapPin,
  FiMessageSquare,
  FiSend,
  FiShield,
} from "react-icons/fi";

import { toast } from "@/components/ui/toast";
import { createBooking } from "@/lib/action/createBooking";
import type { BookingState } from "@/lib/types/service";

type BookingFormProps = {
  serviceId: string;
  serviceName: string;
  vendorEmail: string;
  vendorId: string;
  role: string;
  userEmail: string;
};

export default function BookingForm({
  serviceId,
  serviceName,
  vendorEmail,
  vendorId,
  role,
  userEmail,
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<BookingState | null>(null);

  const isAdmin = role === "admin";

const isOwner =
  role === "vendor" &&
  (userEmail || "").toLowerCase() ===
    (vendorEmail || "").toLowerCase() &&
  Boolean(userEmail && vendorEmail);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await createBooking(formData);

    setResult(response);
    setIsSubmitting(false);

    if (response.success) {
      toast.add({
        title: "Booking request sent",
        description: response.message,
      });
    } else {
      toast.add({
        title: "Booking request failed",
        description: response.message,
      });
    }
  };

  if (isAdmin) {
    return (
      <Notice
        icon={<FiShield className="size-5" />}
        title="Admin accounts cannot book services"
        text="Booking requests are submitted by customers. Sign in with a customer account to request this service."
      />
    );
  }

  if (isOwner) {
    return (
      <Notice
        icon={<FiLock className="size-5" />}
        title="This is your own service"
        text="Vendors cannot book their own services. Manage this listing from your vendor dashboard instead."
        actionLabel="Go to vendor dashboard"
        actionHref="/dashboard/vendor"
      />
    );
  }

  if (result?.success) {
    return (
      <div className="rounded-2xl border border-[#CFE7D9] bg-[#F1FAF4] p-6 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-[#2F8A57] shadow-sm ring-1 ring-[#CFE7D9]">
          <FiCheckCircle className="size-6" />
        </div>

        <h3 className="mt-4 text-base font-semibold text-[#235C3D]">
          Request sent successfully
        </h3>

        <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#4F7A63]">
          {result.message}
        </p>

        <div className="mt-5 flex flex-col gap-2">
          {role === "customer" && (
            <Link
              href="/dashboard/customer/my-bookings"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#772D43] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#5F2034]"
            >
              View my bookings
              <FiArrowRight className="size-3.5" />
            </Link>
          )}

          <Link
            href="/services"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#D9BCC2] px-4 text-xs font-semibold text-[#772D43] transition-colors hover:bg-white"
          >
            Browse more services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="serviceId" value={serviceId} />
      <input type="hidden" name="vendorId" value={vendorId} />

      <div className="rounded-xl border border-[#F0E1E4] bg-[#FFF8F7] px-4 py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A38E94]">
          Booking request for
        </p>
        <p className="mt-1 line-clamp-1 text-sm font-semibold text-[#332229]">
          {serviceName}
        </p>
      </div>

      <div>
        <label
          htmlFor="eventDate"
          className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#5F4C52]"
        >
          <FiCalendar className="size-3.5 text-[#B76E79]" />
          Event date
        </label>

        <input
          id="eventDate"
          name="eventDate"
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          className="h-11 w-full rounded-xl border border-[#EDDEE0] bg-white px-3.5 text-sm text-[#332229] outline-none transition-all focus:border-[#B76E79] focus:ring-4 focus:ring-[#B76E79]/10"
        />
      </div>

      <div>
        <label
          htmlFor="eventLocation"
          className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#5F4C52]"
        >
          <FiMapPin className="size-3.5 text-[#B76E79]" />
          Event location
        </label>

        <input
          id="eventLocation"
          name="eventLocation"
          type="text"
          required
          placeholder="City, venue or full address"
          className="h-11 w-full rounded-xl border border-[#EDDEE0] bg-white px-3.5 text-sm text-[#332229] outline-none transition-all placeholder:text-[#B7A4A9] focus:border-[#B76E79] focus:ring-4 focus:ring-[#B76E79]/10"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#5F4C52]"
        >
          <FiMessageSquare className="size-3.5 text-[#B76E79]" />
          Additional message
          <span className="font-normal text-[#A38E94]">(optional)</span>
        </label>

        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Tell the vendor about your event..."
          className="w-full resize-none rounded-xl border border-[#EDDEE0] bg-white px-3.5 py-3 text-sm text-[#332229] outline-none transition-all placeholder:text-[#B7A4A9] focus:border-[#B76E79] focus:ring-4 focus:ring-[#B76E79]/10"
        />
      </div>

      {result && !result.success && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-700">
          <FiAlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>{result.message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#772D43] px-4 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#5F2034] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          "Sending request..."
        ) : (
          <>
            <FiSend className="size-3.5" />
            Send booking request
          </>
        )}
      </button>

      <p className="text-center text-[10px] leading-4 text-[#A38E94]">
        No payment is taken now. The vendor will accept or reject your request
        from their dashboard.
      </p>
    </form>
  );
}

function Notice({
  icon,
  title,
  text,
  actionLabel,
  actionHref,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#F0E1E4] bg-[#FFF8F7] p-5 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-white text-[#772D43] shadow-sm ring-1 ring-[#F0E1E4]">
        {icon}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-[#332229]">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-xs text-[11px] leading-5 text-[#8B767C]">
        {text}
      </p>

      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 inline-flex h-9 items-center justify-center rounded-lg bg-[#772D43] px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#5F2034]"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
