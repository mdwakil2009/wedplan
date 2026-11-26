
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import type { BookingState } from "@/lib/types/service";
import { bookingAPI } from "./api";

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

    const serviceId = String(formData.get("serviceId") || "").trim();
    const vendorId = String(formData.get("vendorId") || "").trim();
    const eventDate = String(formData.get("eventDate") || "").trim();
    const eventLocation = String(
      formData.get("eventLocation") || ""
    ).trim();
    const message = String(formData.get("message") || "").trim();

    if (!serviceId || !vendorId || !eventDate || !eventLocation) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    const selectedDate = new Date(`${eventDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate < today
    ) {
      return {
        success: false,
        message: "Please select a valid future event date.",
      };
    }

    const { response, data } = await bookingAPI({
      serviceId,
      vendorId,
      customerId: session.user.id,
      eventDate,
      eventLocation,
      message,
    });

    if (!response.ok || !data.success) {
      return {
        success: false,
        message: data.message || "Failed to send booking request.",
      };
    }

    return {
      success: true,
      message: "Your booking request has been sent successfully.",
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
