/**
 * scripts/seed-editor.ts
 *
 * Creates (or updates) the client editor account in the database.
 * Run once after deploying:
 *
 *   npx ts-node --project tsconfig.json scripts/seed-editor.ts
 *
 * Or via npm script:
 *
 *   npm run seed:editor
 *
 * Defaults (change via env vars before running if needed):
 *   SEED_EMAIL    = client@asrepafrica.org
 *   SEED_PASSWORD = ChangeMe123!
 *   SEED_NAME     = ASREP Client Editor
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email    = process.env.SEED_EMAIL    ?? "client@asrepafrica.org";
  const password = process.env.SEED_PASSWORD ?? "ChangeMe123!";
  const name     = process.env.SEED_NAME     ?? "ASREP Client Editor";

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where:  { email },
    update: { password: hashed, role: "EDITOR", name },
    create: { email, password: hashed, role: "EDITOR", name },
  });

  console.log(`✅  Editor account ready: ${user.email} (role: ${user.role})`);
  console.log(`    URL:      http://localhost:3000/admin/login`);
  console.log(`    Email:    ${user.email}`);
  console.log(`    Password: ${password}`);
  console.log(`    ⚠️  Tell the client to change their password after first login.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
