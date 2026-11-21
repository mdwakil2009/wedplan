import type { Service } from "@/lib/types/service";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function createServices(serviceData: object) {
  const response = await fetch(`${BASE_URL}/services`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serviceData),
  });

  const data = await response.json();

  return data;
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

export const getServiceById = async (id: string): Promise<Service | null> => {
  const response = await fetch(`${BASE_URL}/services/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch service");
  }

  return response.json();
};
