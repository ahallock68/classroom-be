import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";

const secret = process.env.BETTER_AUTH_SECRET;
const frontendUrl = process.env.FRONTEND_URL;

if (!secret) {
  throw new Error("BETTER_AUTH_SECRET environment variable is required");
}
if (!frontendUrl) {
  throw new Error("FRONTEND_URL environment variable is required");
}

export const auth = betterAuth({
  secret,
  trustedOrigins: [frontendUrl],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
        input: true,
      },
      imageCldPubId: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
});
