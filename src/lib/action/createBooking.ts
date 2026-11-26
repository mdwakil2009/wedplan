
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import type { BookingState } from "@/lib/types/service";
import { bookingAPI } from "./api";

export async function createBooking(
  formData: FormData
): Promise<BookingState> {
  try {
    // 1. Check user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false,
        message: "Please sign in first.",
      };
    }

    // 2. Check customer role
    if (session.user.role !== "customer") {
      return {
        success: false,
        message: "Only customers can book services.",
      };
    }

    // 3. Get form values
    const serviceId = String(
      formData.get("serviceId") || ""
    ).trim();

    const eventDate = String(
      formData.get("eventDate") || ""
    ).trim();

    const eventLocation = String(
      formData.get("eventLocation") || ""
    ).trim();

    const message = String(
      formData.get("message") || ""
    ).trim();

    // 4. Validate required fields
    if (!serviceId || !eventDate || !eventLocation) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // 5. Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate)) {
      return {
        success: false,
        message: "Please select a valid event date.",
      };
    }

    // 6. Validate actual calendar date
    const [year, month, day] = eventDate.split("-").map(Number);

    const validDate = new Date(
      Date.UTC(year, month - 1, day)
    );

    if (
      validDate.getUTCFullYear() !== year ||
      validDate.getUTCMonth() !== month - 1 ||
      validDate.getUTCDate() !== day
    ) {
      return {
        success: false,
        message: "Please select a valid event date.",
      };
    }

    // 7. Send booking request
    const { response, data } = await bookingAPI({
      serviceId,
      eventDate,
      eventLocation,
      message,
    });

    if (!response.ok || !data.success) {
      return {
        success: false,
        message:
          data.message || "Failed to send booking request.",
      };
    }

    // 8. Success response
    return {
      success: true,
      message:
        data.message ||
        "Your booking request has been sent successfully.",
    };
  } catch (error) {
    console.error("Booking Creation Error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    };
  }
}
