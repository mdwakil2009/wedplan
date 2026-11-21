"use server";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function bookingAPI(bookingData: object) {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  return {
    response,
    data,
  };
}
//customer bookings
export const getVendorBookings = async (vendorId: string) => {
  const response = await fetch(
    `${BASE_URL}/vendor-bookings?vendorId=${vendorId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vendor bookings");
  }

  return response.json();
};
//user info
export const getUserById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

// Update Booking Status
export const updateBookingStatus = async (
  bookingId: string,
  status: "accepted" | "rejected"
) => {
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  return {
    success: response.ok && data.success,
    message: data.message,
  };
};

export const getCustomerBookings = async (customerId: string) => {
  const response = await fetch(
    `${BASE_URL}/customer-bookings?customerId=${customerId}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customer bookings");
  }

  return response.json();
};