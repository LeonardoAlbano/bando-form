# Bando Form

A production-ready, fullstack application built with **Next.js 16 (App Router)** to collect applications through a multi-step wizard and review them in a protected admin dashboard.

The goal of this project is to simulate a real-world funnel used by a mentor/consultant to collect detailed applications from potential clients, with proper security, validation and observability.

---

## Tech Stack

**Frontend & Runtime**

- [Next.js 16 (App Router)](https://nextjs.org/)  
- React 19  
- TypeScript  
- Tailwind CSS (via global styles)  

**Backend & Data**

- API Routes (App Router – `src/app/api`)  
- [Prisma](https://www.prisma.io/) as ORM  
- PostgreSQL (Supabase)  

**Auth & Security**

- [Auth.js / NextAuth](https://authjs.dev/) with **Credentials Provider**  
- Password hashing with **bcryptjs**  
- Environment-based admin credentials  
- Simple in-memory **rate limiting** for public endpoints  
- Validation with **Zod** (DTO schema)  

**Testing**

- [Vitest](https://vitest.dev/) for unit tests  
- Tests covering:
  - DTO / validation
  - Application service (domain/service layer)
  - Rate limiter

**Analytics**

- Microsoft Clarity  
- Google Tag Manager  

---

## Features

### 💡 Application Wizard (Public)

- Multi-step wizard guiding the user through:
  - Name
  - WhatsApp contact
  - Main challenge
  - Reaction when they get blocked
  - Perceived control level
  - Final fit decision and reason (YES / NO + optional reason)
- Submits data to `POST /api/applications`
- All input is validated on the server through a **Zod schema** before persisting.

### 🔐 Admin Authentication

- Admin-only login using **Auth.js Credentials Provider**.
- Email and password are not hard-coded; they are read from environment variables:

  ```bash
  ADMIN_EMAIL=...
  ADMIN_PASSWORD_HASH=...
  AUTH_SECRET=...
