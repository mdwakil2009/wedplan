
"use client";

import { useState } from "react";
import Image from "next/image";
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
  vendorName?: string;
  vendorEmail: string;
  vendorImage?: string;
  vendorId: string;
  role: string;
  userEmail: string;
};

export default function BookingForm({
  serviceId,
  serviceName,
  vendorName,
  vendorEmail,
  vendorImage,
  vendorId,
  role,
  userEmail,
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<BookingState | null>(null);

  const isAdmin = role === "admin";

  const isOwner =
    role === "vendor" &&
    userEmail?.toLowerCase() === vendorEmail?.toLowerCase() &&
    Boolean(userEmail && vendorEmail);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await createBooking(formData);

      setResult(response);

      toast.add({
        title: response.success
          ? "Booking Request Sent"
          : "Booking Request Failed",
        description: response.message,
      });
    } catch (error) {
      console.error("Booking Submission Error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setResult({
        success: false,
        message: errorMessage,
      });

      toast.add({
        title: "Booking Error",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
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
    <div className="space-y-4">
      {/* Vendor Information */}
     
{/* Vendor Information */}
<div className="rounded-2xl border border-[#F0E1E4] bg-[#FFFAF8] p-4 dark:border-[#46534B] dark:bg-[#29332E]">
  <div className="mb-4 flex items-center justify-between">
    <h3 className="text-xs font-semibold text-[#332229] dark:text-[#F5FAF6]">
      Vendor Information
    </h3>

    <span className="inline-flex items-center gap-1 rounded-full bg-[#F1FAF4] px-2 py-1 text-[9px] font-semibold text-[#2F8A57] dark:bg-[#244333] dark:text-[#9BD5AE]">
      <FiCheckCircle className="size-3" />
      Verified
    </span>
  </div>

  {/* Vendor Profile */}
  <div className="flex items-center gap-3">
    {/* Vendor Avatar */}
    <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E8D8C9] dark:bg-[#35413A]">
      {vendorImage ? (
        <img
          src={vendorImage}
          alt={vendorName || "Wedding Vendor"}
          className="size-full object-cover"
        />
      ) : (
        <span className="text-lg font-semibold text-[#79543F] dark:text-[#D9A58E]">
          {vendorName?.charAt(0)?.toUpperCase() || "V"}
        </span>
      )}
    </div>

    {/* Vendor Details */}
    <div className="min-w-0 flex-1">
      <p className="text-[9px] font-semibold uppercase tracking-[1.5px] text-[#A17B61] dark:text-[#D9A58E]">
        Meet Your Vendor
      </p>

      <p className="mt-0.5 truncate text-sm font-semibold text-[#382B23] dark:text-[#F5FAF6]">
        {vendorName || "Wedding Professional"}
      </p>

      <p className="mt-0.5 break-all text-xs text-[#82766B] dark:text-[#B2BDB5]">
        {vendorEmail || "Email unavailable"}
      </p>
    </div>
  </div>
</div>


      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="serviceId" value={serviceId} />
        <input type="hidden" name="vendorId" value={vendorId} />

        <div className="rounded-xl border border-[#F0E1E4] bg-[#FFF8F7] px-4 py-3 dark:border-[#46534B] dark:bg-[#29332E]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A38E94] dark:text-[#9EADA3]">
            Booking request for
          </p>

          <p className="mt-1 line-clamp-1 text-sm font-semibold text-[#332229] dark:text-[#F5FAF6]">
            {serviceName}
          </p>
        </div>

        {/* Event Date */}
        <div>
          <label
            htmlFor="eventDate"
            className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#5F4C52] dark:text-[#E2ECE8]"
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
            className="h-11 w-full rounded-xl border border-[#EDDEE0] bg-white px-3.5 text-sm text-[#332229] outline-none transition-all focus:border-[#B76E79] focus:ring-4 focus:ring-[#B76E79]/10 dark:border-[#46534B] dark:bg-[#1D2421] dark:text-white"
          />
        </div>

        {/* Event Location */}
        <div>
          <label
            htmlFor="eventLocation"
            className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#5F4C52] dark:text-[#E2ECE8]"
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
            className="h-11 w-full rounded-xl border border-[#EDDEE0] bg-white px-3.5 text-sm text-[#332229] outline-none transition-all placeholder:text-[#B7A4A9] focus:border-[#B76E79] focus:ring-4 focus:ring-[#B76E79]/10 dark:border-[#46534B] dark:bg-[#1D2421] dark:text-white"
          />
        </div>

        {/* Additional Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#5F4C52] dark:text-[#E2ECE8]"
          >
            <FiMessageSquare className="size-3.5 text-[#B76E79]" />
            Additional message
            <span className="font-normal text-[#A38E94]">
              (optional)
            </span>
          </label>

          <textarea
            id="message"
            name="message"
            rows={3}
            placeholder="Tell the vendor about your event..."
            className="w-full resize-none rounded-xl border border-[#EDDEE0] bg-white px-3.5 py-3 text-sm text-[#332229] outline-none transition-all placeholder:text-[#B7A4A9] focus:border-[#B76E79] focus:ring-4 focus:ring-[#B76E79]/10 dark:border-[#46534B] dark:bg-[#1D2421] dark:text-white"
          />
        </div>

        {/* Error Message */}
        {result && !result.success && (
          <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-700">
            <FiAlertCircle className="mt-0.5 size-4 shrink-0" />
            <p>{result.message}</p>
          </div>
        )}

        {/* Submit Button */}
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

        <p className="text-center text-[10px] leading-4 text-[#A38E94] dark:text-[#9EADA3]">
          No payment is taken now. The vendor will accept or reject your
          request from their dashboard.
        </p>
      </form>
    </div>
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
    <div className="rounded-2xl border border-[#F0E1E4] bg-[#FFF8F7] p-5 text-center dark:border-[#46534B] dark:bg-[#29332E]">
      <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-white text-[#772D43] shadow-sm ring-1 ring-[#F0E1E4] dark:bg-[#1D2421] dark:text-[#D9A58E] dark:ring-[#46534B]">
        {icon}
      </div>

      <h3 className="mt-3 text-sm font-semibold text-[#332229] dark:text-[#F5FAF6]">
        {title}
      </h3>

      <p className="mx-auto mt-1.5 max-w-xs text-[11px] leading-5 text-[#8B767C] dark:text-[#B2BDB5]">
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
