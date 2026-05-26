import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

/**
 * Prisma v7 singleton — uses the PrismaPg driver adapter (required when
 * the datasource `url` has been moved out of schema.prisma to prisma.config.ts).
 *
 * Prevents "Too many database connections" in development by reusing a single
 * PrismaClient instance across hot reloads.
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  const url = process.env.DATABASE_URL;

  if (!url) {
    // Build-time or test environments without a live database.
    // Queries will throw at runtime, but import/compilation succeeds.
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }

  const pool = new pg.Pool({ connectionString: url });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adapter: adapter as any,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma: PrismaClient = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
