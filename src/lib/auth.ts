import { betterAuth } from "better-auth";
import { memoryAdapter } from "@better-auth/memory-adapter";
import Database from "better-sqlite3";
import fs from "fs";
import os from "os";
import path from "path";

function getDatabase() {
  try {
    // In serverless environments (Vercel, AWS Lambda, Netlify), process.cwd() is read-only (/var/task).
    // Writing to process.cwd() will fail with EROFS. We use os.tmpdir() (/tmp) where writes are allowed.
    const isServerless = Boolean(
      process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.NETLIFY
    );
    const dbDir = isServerless ? os.tmpdir() : process.cwd();
    const dbPath = path.join(dbDir, "bazardor.db");

    // Copy initial repo database if present
    if (isServerless) {
      const repoDb = path.join(process.cwd(), "bazardor.db");
      if (!fs.existsSync(dbPath) && fs.existsSync(repoDb)) {
        try {
          fs.copyFileSync(repoDb, dbPath);
        } catch {
          // ignore copy error
        }
      }
    }

    const db = new Database(dbPath);

    // Auto-create schema tables if not present so fresh deployments never fail
    db.exec(`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" text not null primary key,
        "name" text not null,
        "email" text not null unique,
        "emailVerified" integer not null default 0,
        "image" text,
        "createdAt" date not null,
        "updatedAt" date not null
      );

      CREATE TABLE IF NOT EXISTS "session" (
        "id" text not null primary key,
        "expiresAt" date not null,
        "token" text not null unique,
        "createdAt" date not null,
        "updatedAt" date not null,
        "ipAddress" text,
        "userAgent" text,
        "userId" text not null references "user" ("id") on delete cascade
      );

      CREATE TABLE IF NOT EXISTS "account" (
        "id" text not null primary key,
        "accountId" text not null,
        "providerId" text not null,
        "userId" text not null references "user" ("id") on delete cascade,
        "accessToken" text,
        "refreshToken" text,
        "idToken" text,
        "accessTokenExpiresAt" date,
        "refreshTokenExpiresAt" date,
        "scope" text,
        "password" text,
        "createdAt" date not null,
        "updatedAt" date not null
      );

      CREATE TABLE IF NOT EXISTS "verification" (
        "id" text not null primary key,
        "identifier" text not null,
        "value" text not null,
        "expiresAt" date not null,
        "createdAt" date not null,
        "updatedAt" date not null
      );
    `);

    return db;
  } catch (err) {
    console.warn("better-sqlite3 could not be initialized, falling back to memory adapter:", err);
    const memoryStorage: Record<string, any[]> = {};
    return memoryAdapter(memoryStorage);
  }
}

const getBaseURL = () => {
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

const trustedOrigins = [
  "https://*.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
  ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
].filter(Boolean) as string[];

export const auth = betterAuth({
  database: getDatabase(),
  baseURL: getBaseURL(),
  secret: process.env.BETTER_AUTH_SECRET || "bazardor-super-secret-key-assignment-07-2026",
  trustedOrigins,
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
