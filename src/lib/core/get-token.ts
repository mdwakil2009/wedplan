import { authClient } from "../auth-client";



export async function getJWTToken() {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Failed to get JWT token");
  }

  return data.token;
}
