"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import type { BookingState } from "@/lib/types/service";
import { bookingAPI } from "./api";

export async function createBooking(formData: FormData): Promise<BookingState> {
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
    const vendorId = String(formData.get("vendorId") || "");
    const eventDate = String(formData.get("eventDate") || "");
    const eventLocation = String(formData.get("eventLocation") || "").trim();
    const message = String(formData.get("message") || "").trim();

    console.log("Booking Form Data:", {
      serviceId,
      vendorId,
      eventDate,
      eventLocation,
    });
    if (!serviceId || !vendorId || !eventDate || !eventLocation) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // API call
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
