
export const instant = false;

import { connection} from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";

import {
  FiCheckCircle,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await connection();

  const { session_id } = await searchParams;

  if (!session_id) redirect("/");

  // Retrieve Stripe Session
  const session = await stripe.checkout.sessions.retrieve(session_id);

  // Check Payment
  if (
    session.status !== "complete" ||
    session.payment_status !== "paid"
  ) {
    redirect("/");
  }

  // Premium Activation
  let isPremiumActivated = false;
  let activationMessage = "Premium activation is pending.";

  try {
    // Get JWT Token
    const tokenData = await auth.api.getToken({
      headers: await headers(),
    });

    if (!tokenData?.token) {
      throw new Error("Authentication token not found.");
    }

    // Verify Payment
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verify-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify({
          sessionId: session_id,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    console.log("VERIFY STATUS:", response.status);
    console.log("VERIFY RESPONSE:", result);

    if (!response.ok || !result.success) {
      activationMessage =
        result.message || "Premium activation failed.";
    } else {
      isPremiumActivated = true;
      activationMessage = "Your Premium membership is now active.";
    }
  } catch (error) {
    console.error("Premium Activation Error:", error);

    activationMessage =
      error instanceof Error
        ? error.message
        : "Unable to activate Premium.";
  }

  // Payment Information
  const amount = (
    (session.amount_total || 0) / 100
  ).toLocaleString("en-BD");

  const date = new Date(
    session.created * 1000
  ).toLocaleString("en-BD");

  const email =
    session.customer_details?.email ||
    session.customer_email;

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] px-4 py-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#E1E8ED] bg-white p-5 shadow-lg">

        {/* Header */}
        <div className="text-center">
          <FiCheckCircle className="mx-auto text-4xl text-[#378A88]" />

          <h1 className="mt-2 text-xl font-bold text-[#193F5B]">
            Payment Successful!
          </h1>

          <p className="mt-1 text-xs text-[#87939E]">
            {activationMessage}
          </p>

          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FFF8E8] px-3 py-1 text-[11px] font-bold text-[#A47A28]">
            <FiStar />
            {isPremiumActivated
              ? "PREMIUM MEMBER"
              : "ACTIVATION PENDING"}
          </span>
        </div>

        {/* Amount */}
        <div className="my-4 rounded-xl bg-[#E4F3F1] p-3 text-center">
          <p className="text-xs text-[#378A88]">
            Amount Paid
          </p>

          <h2 className="text-2xl font-bold text-[#193F5B]">
            ৳{amount}
          </h2>

          <span className="text-xs font-semibold text-green-600">
            <FiCheckCircle className="mr-1 inline" />
            Paid
          </span>
        </div>

        {/* Payment Information */}
        <div className="space-y-3 text-xs">

          <div className="flex justify-between gap-3">
            <span className="text-[#87939E]">Plan</span>
            <span className="font-semibold text-[#A47A28]">
              Premium
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#87939E]">User Email</span>
            <span className="break-all text-right text-[#193F5B]">
              {email || "N/A"}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#87939E]">
              Transaction Date
            </span>
            <span className="text-right text-[#193F5B]">
              {date}
            </span>
          </div>

          <div>
            <p className="text-[#87939E]">Transaction ID</p>
            <p className="mt-1 break-all text-[11px] text-[#193F5B]">
              {session.id}
            </p>
          </div>

          <div className="flex justify-between border-t border-[#E1E8ED] pt-3">
            <span className="text-[#87939E]">Status</span>
            <span className="font-semibold text-green-600">
              Successful
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#87939E]">
              Premium Activation
            </span>

            <span
              className={
                isPremiumActivated
                  ? "font-semibold text-green-600"
                  : "font-semibold text-amber-600"
              }
            >
              {isPremiumActivated ? "Activated" : "Pending"}
            </span>
          </div>
        </div>

        {/* Dashboard Button */}
        <Link
          href="/dashboard/vendor"
          className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#378A88] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2D7472]"
        >
          Back to Dashboard
          <FiArrowRight />
        </Link>

      </div>
    </main>
  );
}
