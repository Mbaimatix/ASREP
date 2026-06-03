import { defineConfig } from "prisma/config";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Prisma v7 configuration.
 * Only used by the Prisma CLI (db push, studio, etc.).
 * The runtime client reads DATABASE_URL directly from process.env
 * via the datasource block in schema.prisma.
 *
 * Loads DATABASE_URL from .env or .env.local so CLI commands work
 * without manually exporting the variable in your shell.
 */
function loadEnvFile() {
  for (const file of [".env", ".env.local"]) {
    try {
      const content = readFileSync(resolve(process.cwd(), file), "utf-8");
      for (const line of content.split("\n")) {
        const match = line.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*["']?(.+?)["']?\s*$/);
        if (match && !process.env[match[1]]) {
          process.env[match[1]] = match[2];
        }
      }
    } catch {
      // file doesn't exist — skip
    }
  }
}

loadEnvFile();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
