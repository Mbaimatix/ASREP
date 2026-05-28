import { defineConfig } from "prisma/config";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Prisma v7 configuration.
 * Manually loads DATABASE_URL from .env or .env.local so that
 * `npx prisma db push / migrate deploy / studio` work without
 * having to pass the env var on the command line.
 */
function loadDatabaseUrl(): string | undefined {
  // Try .env first (Prisma convention), then .env.local (Next.js convention)
  for (const file of [".env", ".env.local"]) {
    try {
      const content = readFileSync(resolve(process.cwd(), file), "utf-8");
      const match = content.match(/^DATABASE_URL\s*=\s*["']?([^"'\n]+)["']?/m);
      if (match?.[1]) return match[1].trim();
    } catch {
      // file doesn't exist — try next
    }
  }
  return process.env.DATABASE_URL;
}

export default defineConfig({
  schema: "./prisma/schema.prisma",

  datasource: {
    url: loadDatabaseUrl(),
  },
});
