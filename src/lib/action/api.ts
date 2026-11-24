
"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

async function checkActiveUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.isBlocked) {
    redirect("/blocked");
  }

  return session;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


// Booking API
export async function bookingAPI(bookingData: object) {
  await checkActiveUser();

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData.token}`,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  return {
    response,
    data,
  };
}

// Get User Info
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
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData.token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  return {
    success: response.ok && data.success,
    message: data.message,
  };
};


// Get Customer Bookings
export const getCustomerBookings = async () => {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const response = await fetch(
    `${BASE_URL}/customer-bookings`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customer bookings");
  }

  return response.json();
};


// Get Vendor Bookings With Service
export const getVendorBookingsWithService = async () => {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const response = await fetch(
    `${BASE_URL}/vendor-bookings-with-service`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vendor bookings");
  }

  return response.json();
};

// Get Vendor Bookings
export const getVendorBookings = async () => {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const response = await fetch(
    `${BASE_URL}/vendor-bookings`,
    {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vendor bookings");
  }

  return response.json();
};



// Admin Overview
export const getAdminOverview = async () => {
  const response = await fetch(`${BASE_URL}/admin-overview`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin overview");
  }

  return response.json();
};

// Get Admin Users
export const getAdminUsers = async () => {
  const response = await fetch(`${BASE_URL}/admin-users`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin users");
  }

  return response.json();
};

// Block / Unblock User
export const updateUserStatus = async (
  id: string,
  isBlocked: boolean
) => {
  const response = await fetch(`${BASE_URL}/admin-users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBlocked }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user status");
  }

  return response.json();
};

// Get All Admin Services
export const getAdminServices = async () => {
  const response = await fetch(`${BASE_URL}/admin-services`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin services");
  }

  return response.json();
};

// Approve / Reject Service
export const updateServiceStatus = async (
  id: string,
  status: string
) => {
  const response = await fetch(
    `${BASE_URL}/admin-services/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update service status");
  }

  return response.json();
};

// Active / Inactive Service
export const updateServiceActiveStatus = async (
  id: string,
  isActive: boolean
) => {
  const response = await fetch(
    `${BASE_URL}/admin-services/${id}/active`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update service availability");
  }

  return response.json();
};

// Delete Admin Service
export const deleteAdminService = async (id: string) => {
  const response = await fetch(`${BASE_URL}/services/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete service");
  }

  return response.json();
};

// Create Stripe Checkout Session
export async function createCheckoutSession(userId: string, email: string) {
  console.log("Checkout Data:", userId, email);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, email }),
    },
  );

  const data = await response.json();

  console.log("Checkout Response:", data);

  return data;
}
//verify payment
export async function verifyPayment(sessionId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/verify-payment`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    },
  );

  return response.json();
}


// Get JWT Token on Server
async function getServerJWTToken() {
  const data = await auth.api.getToken({
    headers: await headers(),
  });

  return data.token; 
}

// Get Admin Transactions
export const getAdminTransactions = async () => {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/admin-transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin transactions");
  }

  return response.json();
};



// Get My Services
export const getMyServices = async () => {
  await checkActiveUser();

  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/my-services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch my services");
  }

  return response.json();
};
