import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "bazardor.db");
const db = new Database(dbPath);

export const auth = betterAuth({
  database: db,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "bazardor-super-secret-key-assignment-07-2026",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-client-secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo-github-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo-github-client-secret",
    },
  },
});
