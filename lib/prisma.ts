import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

/**
 * Prisma v7 singleton for Next.js / Vercel.
 *
 * Prisma v7 requires a driver adapter — `new PrismaClient()` without one
 * throws "Using engine type 'client' requires adapter or accelerateUrl".
 *
 * pg.Pool accepts connectionString: undefined without throwing at creation
 * time, so this module can be safely imported during `next build` even when
 * DATABASE_URL is not yet in the environment. Actual queries at runtime will
 * use the DATABASE_URL that Vercel injects before any request is served.
 *
 * In development, the singleton is stored on globalThis to survive hot reloads.
 */

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient(): PrismaClient {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
