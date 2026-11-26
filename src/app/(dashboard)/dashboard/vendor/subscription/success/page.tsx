
import { connection } from "next/server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";
import { getMySubscription } from "@/lib/action/api";

import {
  FiCheckCircle,
  FiArrowRight,
  FiShield,
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";

export default async function Success({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  await connection();

  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/dashboard/vendor/subscription");
  }

  // 1. Authenticate current user
  const requestHeaders = await headers();

  const tokenData = await auth.api.getToken({
    headers: requestHeaders,
  });

  if (!tokenData?.token) {
    redirect("/login");
  }

  const token = tokenData.token;

  let errorMessage = "";
  let session: Awaited<
    ReturnType<typeof stripe.checkout.sessions.retrieve>
  > | null = null;

  // 2. Retrieve Stripe session
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);

    if (
      session.status !== "complete" ||
      session.payment_status !== "paid" ||
      session.mode !== "payment"
    ) {
      errorMessage = "Your payment has not been completed yet.";
    }
  } catch (error) {
    console.error("Stripe Session Error:", error);
    errorMessage = "Unable to verify your payment session.";
  }

  // 3. Verify payment and activate Premium
  if (!errorMessage && session) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sessionId: session_id,
          }),
          cache: "no-store",
        }
      );

      const verificationResult = await response.json().catch(() => null);

      if (
        !response.ok ||
        !verificationResult?.success ||
        verificationResult.premiumActivated !== true
      ) {
        throw new Error(
          verificationResult?.message ||
            "Premium activation could not be confirmed."
        );
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);

      errorMessage =
        error instanceof Error
          ? error.message
          : "Payment verification failed. Please try again.";
    }
  }

  // 4. Confirm latest subscription from database
  if (!errorMessage) {
    try {
      const subscriptionResult = await getMySubscription(token);

      if (
        !subscriptionResult.success ||
        subscriptionResult.isPremium !== true
      ) {
        throw new Error("Premium activation could not be confirmed.");
      }
    } catch (error) {
      console.error("Subscription Status Error:", error);

      errorMessage =
        error instanceof Error
          ? error.message
          : "Unable to confirm your Premium subscription.";
    }
  }

  // 5. Show error UI
  if (errorMessage || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F9FAFF] px-4 py-6">
        <div className="w-full max-w-sm rounded-2xl border border-[#E7EBF5] bg-white p-6 text-center shadow-lg">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50">
            <FiAlertCircle className="size-7 text-red-500" />
          </div>

          <h1 className="mt-4 text-xl font-bold text-[#252B45]">
            Verification Pending
          </h1>

          <p className="mt-2 text-xs leading-5 text-[#7A839B]">
            {errorMessage ||
              "We could not confirm your payment. Please try again."}
          </p>

          <div className="mt-5 space-y-3">
            <Link
              href={`/dashboard/vendor/subscription/success?session_id=${encodeURIComponent(session_id)}`}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#3A76EF] px-4 text-xs font-semibold text-white transition hover:bg-[#2F63D4]"
            >
              <FiRefreshCw className="size-3.5" />
              Try Again
            </Link>

            <Link
              href="/dashboard/vendor/subscription"
              className="flex h-10 items-center justify-center rounded-lg border border-[#E7EBF5] text-xs font-semibold text-[#7A839B] transition hover:bg-[#F9FAFF]"
            >
              Back to Subscription
            </Link>
          </div>

          <p className="mt-4 text-[10px] leading-4 text-[#A0A8B8]">
            If your payment was successful but Premium is not activated,
            please contact support.
          </p>
        </div>
      </main>
    );
  }

  // 6. Payment information
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
    <main className="flex min-h-[70vh] items-center justify-center bg-[#F9FAFF] px-4 py-6">
      <div className="w-full max-w-sm rounded-2xl border border-[#E7EBF5] bg-white p-5 shadow-lg">

        {/* Header */}
        <div className="text-center">
          <FiCheckCircle className="mx-auto text-4xl text-[#3A76EF]" />

          <h1 className="mt-2 text-xl font-bold text-[#252B45]">
            Payment Successful!
          </h1>

          <p className="mt-1 text-xs text-[#7A839B]">
            Your payment has been received and Premium is activated.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
            <FiShield className="size-4" />
            Premium Activated
          </div>
        </div>

        {/* Amount */}
        <div className="my-4 rounded-xl bg-[#EEF4FF] p-3 text-center">
          <p className="text-xs text-[#3A76EF]">
            Amount Paid
          </p>

          <h2 className="text-2xl font-bold text-[#252B45]">
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
            <span className="text-[#7A839B]">Plan</span>

            <span className="font-semibold text-[#B47A17]">
              Premium
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#7A839B]">User Email</span>

            <span className="break-all text-right text-[#252B45]">
              {email || "N/A"}
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#7A839B]">
              Transaction Date
            </span>

            <span className="text-right text-[#252B45]">
              {date}
            </span>
          </div>

          <div>
            <p className="text-[#7A839B]">Transaction ID</p>

            <p className="mt-1 break-all text-[11px] text-[#252B45]">
              {session.id}
            </p>
          </div>

          <div className="flex justify-between border-t border-[#E7EBF5] pt-3">
            <span className="text-[#7A839B]">Payment Status</span>

            <span className="font-semibold text-green-600">
              Successful
            </span>
          </div>

          <div className="flex justify-between gap-3">
            <span className="text-[#7A839B]">
              Premium Activation
            </span>

            <span className="font-semibold text-green-600">
              Confirmed
            </span>
          </div>
        </div>

        {/* Dashboard Button */}
        <Link
          href="/dashboard/vendor"
          className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#3A76EF] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2F63D4]"
        >
          Back to Dashboard
          <FiArrowRight />
        </Link>
      </div>
    </main>
  );
}
