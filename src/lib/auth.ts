import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db("WedPlan");

export const auth = betterAuth({
  user: {
    additionalFields: {
      role: {
        type: ["admin", "vendor", "customer"],
        input: true,
        defaultValue: "customer",
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // A public sign-up can only create a vendor or customer.
          // Admin accounts must be created manually in the database.
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
          // Users must not be able to promote themselves to admin
          // through the public update-user API.
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
  database: mongodbAdapter(db, {
    client,
  }),
});
