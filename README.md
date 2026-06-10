# ASREP Africa Website

**ASAL Research & Resilience Programme — Official Website**

Built for ASREP Africa, a Kenyan NGO headquartered in Isiolo County, advancing climate resilience,
peacebuilding, indigenous knowledge, and civic governance across Kenya's arid and semi-arid lands (ASALs).

---

## Tech Stack

- **Framework:** Next.js 16.2 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 + Framer Motion
- **CMS:** Sanity.io v5 (embedded Studio at `/studio`)
- **Auth:** NextAuth.js v5 + bcrypt
- **Database:** PostgreSQL (Neon) + Prisma v7
- **Payments:** Pesapal (M-Pesa / Card / PayPal)
- **Deployment:** Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Copy `.env.local` and fill in all credentials — see the file for full instructions.

## Sanity CMS Setup

1. Go to the Sanity project dashboard → **API** → create two tokens:
   - **ASREP Read** → Viewer permissions → copy value into `SANITY_API_READ_TOKEN`
   - **ASREP Write** → Editor permissions → copy value into `SANITY_API_WRITE_TOKEN`
2. Go to **API → CORS Origins** → add:
   - `http://localhost:3000` (development)
   - `https://asrepafrica.org` (production)
3. Add all four Sanity env vars to **Vercel → Project Settings → Environment Variables**
4. Create the client editor account: `npm run seed:editor`
5. Studio credentials are shared with the client through a secure channel — see internal handover doc.

> **⚠ SECURITY — ACTION REQUIRED:** The Studio password that was previously documented here has been removed from this file. If it was ever committed to the repository, **rotate the password immediately** in the Sanity Studio user settings. Treat any password that appeared in a public git history as compromised.

## Licence

(c) 2026 ASREP Africa. All rights reserved.
