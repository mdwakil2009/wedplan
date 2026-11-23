import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "./auth";
import { jwtClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), jwtClient() ],
    baseURL: process.env.BETTER_AUTH_URL
})

export const { signIn, signUp, useSession } = authClient;