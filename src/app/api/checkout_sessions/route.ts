
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/core/server";

export async function POST() {
  const userSession = await getSession();

  // Check user authentication
  if (!userSession?.user?.id || !userSession.user.email) {
    return NextResponse.json(
      { message: "Please login first" },
      { status: 401 },
    );
  }

  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],

      mode: "payment",

      customer_email: userSession.user.email,

      metadata: {
        userId: userSession.user.id,
      },

      success_url: `${origin}/dashboard/vendor/subscription/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/dashboard/vendor/subscription/cancel`,

      integration_identifier: "Wedding_Planning_001",
    });

    return NextResponse.redirect(session.url as string, 303);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));

    console.error("Checkout Error:", error.message);

    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
}
