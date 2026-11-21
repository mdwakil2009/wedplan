import type { Service } from "@/lib/types/service";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000";

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
  id: string,
): Promise<Service | null> => {
  const response = await fetch(`${BASE_URL}/services/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch service");
  }

  return response.json();
};
