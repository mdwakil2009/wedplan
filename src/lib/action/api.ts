
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Check logged-in user and blocked status
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

// Get authenticated JWT token
async function getServerJWTToken() {
  await checkActiveUser();

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  if (!tokenData?.token) {
    throw new Error("Authentication token not found.");
  }

  return tokenData.token;
}

// Booking API
export async function bookingAPI(bookingData: object) {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookingData),
    cache: "no-store",
  });

  const data = await response.json();

  return {
    response,
    data,
  };
}

// Get User Info
export async function getUserById(userId: string) {
  const response = await fetch(
    `${BASE_URL}/users/${encodeURIComponent(userId)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();

  return data.user;
}


// Update Booking Status
export async function updateBookingStatus(
  bookingId: string,
  status: "accepted" | "rejected"
) {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
    cache: "no-store",
  });

  const data = await response.json();

  return {
    success: response.ok && data.success,
    message: data.message,
  };
}

// Get Customer Bookings
export async function getCustomerBookings() {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/customer-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch customer bookings");
  }

  return response.json();
}

// Get Vendor Bookings With Service
export async function getVendorBookingsWithService() {
  const token = await getServerJWTToken();

  const response = await fetch(
    `${BASE_URL}/vendor-bookings-with-service`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vendor bookings");
  }

  return response.json();
}

// Get Vendor Bookings
export async function getVendorBookings() {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/vendor-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vendor bookings");
  }

  return response.json();
}

// Admin Overview
export async function getAdminOverview() {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/admin-overview`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin overview");
  }

  return response.json();
}

// Get Admin Users
export async function getAdminUsers() {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/admin-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin users");
  }

  return response.json();
}

// Block / Unblock User
export async function updateUserStatus(
  id: string,
  isBlocked: boolean
) {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/admin-users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isBlocked }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update user status");
  }

  return data;
}

// Get All Admin Services
export async function getAdminServices() {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/admin-services`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch admin services");
  }

  return response.json();
}

// Approve / Reject Service
export async function updateServiceStatus(
  id: string,
  status: "pending" | "approved" | "rejected"
) {
  const token = await getServerJWTToken();

  const response = await fetch(
    `${BASE_URL}/admin-services/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update service status");
  }

  return data;
}

// Active / Inactive Service
export async function updateServiceActiveStatus(
  id: string,
  isActive: boolean
) {
  const token = await getServerJWTToken();

  const response = await fetch(
    `${BASE_URL}/admin-services/${id}/active`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ isActive }),
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update service availability");
  }

  return data;
}

// 
// Admin - Delete Service
export async function deleteAdminService(id: string) {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/admin-services/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete service");
  }

  return data;
}

// Create Stripe Checkout Session
export async function createCheckoutSession() {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/create-checkout-session`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create checkout session");
  }

  return data;
}

// Verify Payment
export async function verifyPayment(sessionId: string) {
  const token = await getServerJWTToken();

  const response = await fetch(`${BASE_URL}/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sessionId }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Payment verification failed");
  }

  return data;
}

// Get Admin Transactions
export async function getAdminTransactions() {
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
}

// Get My Services
export async function getMyServices() {
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
}

// Get Vendor Subscription Status
export async function getMySubscription(token: string) {
  const response = await fetch(`${BASE_URL}/my-subscription`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to get subscription status");
  }

  return response.json();
}
//6 data featured services
export const getFeaturedServices = async () => {
  const res = await fetch(`${BASE_URL}/featured-services`);

  if (!res.ok) {
    throw new Error("Failed to fetch featured services");
  }

  return res.json();
};