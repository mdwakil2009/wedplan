
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("WedPlan");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [jwt()],

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60, // 7 day
    },
  },

  user: {
    changeEmail: {
      enabled: true,
    },

    additionalFields: {
      role: {
        type: ["admin", "vendor", "customer"],
        input: true,
        defaultValue: "customer",
      },

      isBlocked: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: user.role === "vendor" ? "vendor" : "customer",
            },
          };
        },
      },

      update: {
        before: async (user, context) => {
          if (user.role === undefined) {
            return;
          }

          const currentRole = context?.context?.session?.user?.role;

          if (!currentRole) {
            return false;
          }

          return {
            data: {
              ...user,
              role: currentRole,
            },
          };
        },
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
