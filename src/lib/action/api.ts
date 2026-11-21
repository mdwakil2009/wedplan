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

export const getUserById = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};