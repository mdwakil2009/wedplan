
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { BookingState } from "@/lib/types/service";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createBooking(
  formData: FormData
): Promise<BookingState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "Please sign in first.",
      };
    }

  
    if (session.user.role !== "customer") {
      return {
        success: false,
        message: "Only customers can book services.",
      };
    }

    const serviceId = String(formData.get("serviceId") || "");
    const eventDate = String(formData.get("eventDate") || "");
    const eventLocation = String(formData.get("eventLocation") || "").trim();
    const message = String(formData.get("message") || "").trim();


    if (!serviceId || !eventDate || !eventLocation) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

  
    const response = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceId,
        customerId: session.user.id,
        eventDate,
        eventLocation,
        message,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Booking failed.",
      };
    }

    return {
      success: true,
      message: "Your booking request has been sent successfully.",
    };
  } catch (error) {
    console.error("Booking error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
