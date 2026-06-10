/**
 * scripts/seed-editor.ts
 *
 * Creates (or updates) the client editor account in the database.
 * Run once after deploying:
 *
 *   SEED_PASSWORD=<strong-password> npx ts-node --project tsconfig.json scripts/seed-editor.ts
 *
 * Or via npm script:
 *
 *   SEED_PASSWORD=<strong-password> npm run seed:editor
 *
 * Required env vars:
 *   SEED_PASSWORD — must be set; no insecure default is provided
 * Optional:
 *   SEED_EMAIL    = client@asrepafrica.org
 *   SEED_NAME     = ASREP Client Editor
 *
 * Credentials are shared with the client through a secure channel — see internal handover doc.
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

// Prisma v7 requires a driver adapter — same construction as lib/prisma.ts.
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const email    = process.env.SEED_EMAIL    ?? "client@asrepafrica.org";
  const password = process.env.SEED_PASSWORD;
  const name     = process.env.SEED_NAME     ?? "ASREP Client Editor";

  if (!password) {
    console.error("❌  SEED_PASSWORD env var is required. Set it before running this script.");
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password as string, 12);

  const user = await prisma.user.upsert({
    where:  { email },
    update: { password: hashed, role: "EDITOR", name },
    create: { email, password: hashed, role: "EDITOR", name },
  });

  console.log(`✅  Editor account ready: ${user.email} (role: ${user.role})`);
  console.log(`    URL:      http://localhost:3000/admin/login`);
  console.log(`    Email:    ${user.email}`);
  console.log(`    Password: (the SEED_PASSWORD you provided — not echoed)`);
  console.log(`    ⚠️  Tell the client to change their password after first login.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
