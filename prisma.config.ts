import { defineConfig } from "prisma/config";

/**
 * Prisma v7 configuration file.
 * The datasource `url` is specified here (not in schema.prisma).
 * See: https://www.prisma.io/docs/orm/reference/prisma-config-reference
 */
export default defineConfig({
  schema: "./prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL,
  },
});
