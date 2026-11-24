
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { Service } from "@/lib/types/service";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export async function createServices(serviceData: object) {
  // Convert service data
  const {
    serviceName,
    category,
    price,
    location,
    description,
    images,
  } = serviceData as {
    serviceName: string;
    category: string;
    price: number;
    location: string;
    description: string;
    images: string[];
  };

  if (
    !serviceName?.trim() ||
    !category?.trim() ||
    price === undefined ||
    price === null ||
    !location?.trim() ||
    !description?.trim() ||
    !Array.isArray(images) ||
    images.length === 0
  ) {
    return {
      success: false,
      message: "Please fill in all required fields and upload at least one image.",
      status: 400,
    };
  }

  if (!Number.isFinite(Number(price)) || Number(price) < 0) {
    return {
      success: false,
      message: "Please enter a valid price.",
      status: 400,
    };
  }


  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const response = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData.token}`,
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  return {
    ...data,
    status: response.status,
  };
}
export const getServices = async (): Promise<Service[]> => {
  const response = await fetch(`${BASE_URL}/services`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch services");
  }

  const data = await response.json();

  return Array.isArray(data) ? (data as Service[]) : [];
};

export const getServiceById = async (
  id: string
): Promise<Service | null> => {
  const response = await fetch(`${BASE_URL}/services/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch service");
  }

  return response.json();
};


export async function deleteService(id: string) {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const response = await fetch(`${BASE_URL}/services/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  });

  const data = await response.json();

  return {
    ...data,
    success: response.ok && data.deletedCount > 0,
  };
}
// Update Service
export async function updateService(
  id: string,
  serviceData: object,
) {
  const {
    serviceName,
    category,
    price,
    location,
    description,
    images,
  } = serviceData as {
    serviceName: string;
    category: string;
    price: number;
    location: string;
    description: string;
    images: string[];
  };


  if (
    !serviceName?.trim() ||
    !category?.trim() ||
    price === undefined ||
    price === null ||
    !location?.trim() ||
    !description?.trim() ||
    !Array.isArray(images) ||
    images.length === 0
  ) {
    return {
      success: false,
      message: "Please fill in all required fields and upload at least one image.",
    };
  }

  if (!Number.isFinite(Number(price)) || Number(price) < 0) {
    return {
      success: false,
      message: "Please enter a valid price.",
    };
  }

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const response = await fetch(`${BASE_URL}/services/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData.token}`,
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  return {
    ...data,
    success: response.ok,
  };
}