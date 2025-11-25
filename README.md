# Bando Application Wizard

Multi-step application form built with **Next.js App Router** for collecting detailed answers from prospects and reviewing them via a secure admin dashboard.

This project is designed as a client-facing application, with attention to security, performance and maintainability.

---

## Tech stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Language:** TypeScript
- **UI:** Tailwind CSS, shadcn/ui
- **Forms & Validation:**
  - React Hook Form
  - Zod (schema validation on client and server)
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** Auth.js / NextAuth (credentials provider)
- **Analytics (optional):**
  - Microsoft Clarity
  - Google Tag Manager
- **Other:**
  - Custom HTTP security headers via `next.config.ts`
  - Simple in-memory rate limiting for the public API

---

## Features

### Public application flow

- Multi-step wizard to collect:
  - Name
  - WhatsApp contact
  - Main challenge
  - Reaction to “block” situations
  - Perceived control level (1–5)
  - Final fit (“YES”/“NO”) and optional reason
- Client-side validation with Zod + React Hook Form.
- Answers are persisted in the browser (localStorage) so the user does not lose progress.
- Final submission is sent to `/api/applications` and stored in PostgreSQL via Prisma.

### Admin dashboard

- Protected admin route: `/dashboard`.
- Authentication using **NextAuth** (credentials provider) with:
  - Admin email and password loaded from environment variables.
  - JWT-based sessions and `role = "admin"` attached to the session.
- Server-side protection in the dashboard using `auth()` from `src/auth.ts`:
  - Only users with `session.user.role === "admin"` can access.
- Table view of all applications:
  - Ordered by creation date (newest first).
  - Shows date/time, name, WhatsApp, main challenge, control level and final fit.

### Security & hardening

- Sensitive configuration (database URLs, admin credentials, auth secret, analytics IDs) are **never hard-coded** and must be provided via environment variables.
- Custom HTTP security headers defined in `next.config.ts`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
- Basic rate limiting for `/api/applications` using an in-memory sliding window keyed by IP.
- Optional analytics (Clarity, GTM) are only loaded if the corresponding public env variables are set.

---

## Project structure

Main files and folders:

```txt
.
├─ prisma/
│  ├─ schema.prisma           # Application model and enum
│  ├─ migrations/             # Initial migration for the Application table
│  └─ prisma.config.ts        # Uses DIRECT_URL for CLI/migrations
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  │  └─ page.tsx          # Landing + application wizard entry
│  │  ├─ (admin)/
│  │  │  ├─ login/page.tsx    # Admin login screen
│  │  │  └─ dashboard/page.tsx# Protected admin dashboard
│  │  └─ api/
│  │     └─ applications/
│  │        └─ route.ts       # POST application endpoint (+ rate limiting, validation)
│  ├─ components/
│  │  ├─ wizard/              # Wizard steps + base layout
│  │  ├─ analytics/           # Clarity + GTM helpers
│  │  └─ ui/                  # Reusable UI components (shadcn/ui)
│  ├─ features/
│  │  └─ application/
│  │     └─ wizard/           # Wizard state hook, types, etc.
│  ├─ server/
│  │  ├─ application/         # Service + repository layer for Application
│  │  ├─ db/                  # Prisma client configured with PostgreSQL pool
│  │  └─ rate-limit.ts        # Simple in-memory rate limiter
│  └─ lib/
│     └─ application-client.ts# Client helper to POST applications to the API
├─ src/auth.ts                # NextAuth/Auth.js integration
├─ auth.config.ts             # Auth configuration (providers, callbacks)
├─ next-auth.d.ts             # TypeScript module augmentation for NextAuth
├─ next.config.ts             # Next.js config + security headers
└─ README.md
