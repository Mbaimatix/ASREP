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

1. Go to https://www.sanity.io/organizations/oHgdKkPwZ/project/4cfxiux0/api
2. Create two API tokens:
   - **ASREP Read** → Viewer permissions → copy value into `SANITY_API_READ_TOKEN`
   - **ASREP Write** → Editor permissions → copy value into `SANITY_API_WRITE_TOKEN`
3. Go to **API → CORS Origins** → add:
   - `http://localhost:3000` (development)
   - `https://www.asrepafrica.org` (production)
   - `https://your-vercel-url.vercel.app` (Vercel preview)
4. Add all four Sanity env vars to **Vercel → Project Settings → Environment Variables**
5. Create the client editor account: `npm run seed:editor`
6. Share with the client:
   - URL: `https://www.asrepafrica.org/studio`
   - Login: `client@asrepafrica.org` / `ChangeMe123!`
   - **Ask them to change their password after first login**

## Licence

(c) 2026 ASREP Africa. All rights reserved.
