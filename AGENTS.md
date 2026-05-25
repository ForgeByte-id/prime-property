# AGENTS.md — Prime Property Development Framework & Standards

**Version:** 1.0  
**Purpose:** Comprehensive development framework, architecture standards, and security guidelines for team developers building Prime Property Web Platform  
**Last Updated:** 24 Mei 2026  
**Source of Truth:** PRD.md, SRS.md, Acceptance Criteria v1.0, get-design.md

---

## 📌 EXECUTIVE SUMMARY

AGENTS.md adalah dokumen panduan komprehensif untuk memandu **Senior Programmer Full Stack** dalam mengembangkan Prime Property Web Platform dengan standar enterprise-grade. Dokumen ini mencakup 3 pilar utama (What-Why-How), overview teknis project, standard code, dan security best practices.

**Deadline:** 15 Juni 2026, 23:59 WIB  
**Tech Stack:** Next.js 15+ | TypeScript | Tailwind CSS | Supabase PostgreSQL  
**Target:** Full RBAC, security-first, role-based authorization, audit-ready

---

# BAGIAN 1: 3 PILAR UTAMA — WHAT-WHY-HOW

## 🎯 Pilar 1: WHAT — Apa yang Kami Bangun?

### 1.1 Definisi Produk

Prime Property Web Platform adalah **fullstack web application** yang terdiri dari:

1. **Public Website** (Landing, About, Contact)
   - Branding-focused, visitor acquisition oriented
   - Zero authentication
   - Contact form dengan email notification dan rate limiting

2. **Internal Agent Portal** (Authenticated)
   - Role-based access control (Admin, Superadmin)
   - Property listing dashboard dengan table, filter, search, pagination
   - CRUD management untuk Superadmin only
   - Audit logging untuk semua mutasi data

3. **Data Architecture**
   - Properti: Schema terstruktur dengan multi-enum fields (hadap, kawasan, siap)
   - Users: 2 role dengan permission yang ketat
   - Contact Messages: Form submissions dengan audit trail
   - Audit Logs: Change tracking untuk compliance

### 1.2 Key Features

| Feature                                | Scope           | Who                |
| -------------------------------------- | --------------- | ------------------ |
| Landing Page + Hero                    | ✅ In Scope     | Public             |
| Featured Properties (max 6, read-only) | ✅ In Scope     | Public             |
| About + Contact Pages                  | ✅ In Scope     | Public             |
| Contact Form + Email Notification      | ✅ In Scope     | Public             |
| Agent Login `/agent/login`             | ✅ In Scope     | Authenticated      |
| Dashboard Property Listing             | ✅ In Scope     | Admin + Superadmin |
| Filter, Search, Sort, Pagination       | ✅ In Scope     | Admin + Superadmin |
| Property Detail View                   | ✅ In Scope     | Admin + Superadmin |
| Create Property                        | ✅ In Scope     | Superadmin Only    |
| Update Property                        | ✅ In Scope     | Superadmin Only    |
| Delete Property (Soft)                 | ✅ In Scope     | Superadmin Only    |
| Admin Management                       | ✅ In Scope     | Superadmin Only    |
| Audit Logs                             | ✅ In Scope     | Superadmin Only    |
| Upload Gambar                          | ❌ Out of Scope | —                  |
| Payment/Booking                        | ❌ Out of Scope | —                  |
| Public Listing Pages                   | ❌ Out of Scope | —                  |

### 1.3 Target Users & Personas

| Persona        | Role          | Need                                                      | Access Level           |
| -------------- | ------------- | --------------------------------------------------------- | ---------------------- |
| Public Visitor | Anonymous     | Understand brand, submit inquiry, see featured properties | Public pages only      |
| Admin / Agent  | Internal User | View & filter properties for operational work             | Read-only dashboard    |
| Superadmin     | Power User    | Manage property data, user accounts, audit trail          | Full CRUD + admin mgmt |

---

## 💡 Pilar 2: WHY — Kenapa Kami Membangun Seperti Ini?

### 2.1 Business Objectives

1. **Establish Digital Presence**
   - Reason: Prime Property needs professional online branding
   - Metric: Fully responsive, Lighthouse ≥85
   - Deadline: 15 Juni 2026

2. **Enable Lead Capture**
   - Reason: Contact form untuk akuisisi leads dari website visitors
   - Metric: Form working, email notifications sent, rate limited
   - Security: IP-based rate limiting (3/hour), input sanitization

3. **Operationalize Data**
   - Reason: Centralized property inventory accessible to team internally
   - Metric: Dashboard with 50+ dummy properties, search <500ms, pagination working
   - Efficiency: No manual spreadsheet lookup needed

4. **Implement Access Control**
   - Reason: Protect sensitive data (pricing, property details) with role-based permission
   - Metric: Admin cannot mutate, 403 on direct API attempts, authorization backend-enforced
   - Compliance: Audit log untuk traceability

### 2.2 Technical Why

| Decision           | Rationale                                                             |
| ------------------ | --------------------------------------------------------------------- |
| Next.js App Router | Server-side rendering, API route simplicity, edge deployment ready    |
| TypeScript         | Type safety, documentation-as-code, catch bugs at compile time        |
| Tailwind CSS       | Rapid development, design token consistency, utility-first approach   |
| Supabase           | PostgreSQL managed, built-in auth, RLS capability, real-time optional |
| Zod Validation     | Server & client-side validation, type inference, DX                   |
| React Hook Form    | Minimal re-renders, form-state management, integration with Zod       |
| Bcrypt             | Password hashing industry standard, cost factor ≥10                   |
| httpOnly Cookies   | XSS protection, 30-day expiry, SameSite=Lax security                  |
| Soft Delete        | Data preservation, audit trail, recovery capability                   |

### 2.3 Design Philosophy

**Prime Property Design is:**

1. **Trustworthy & Executive** — Dark backgrounds (#1A1A1A), warm gold accents (#C9A961) convey stability
2. **Data-Driven** — Table-first, no image galleries, focus on property attributes (lebar, panjang, harga, status)
3. **Fast & Compact** — Minimal unnecessary UI, pagination 50 rows default, filter debounce 300ms
4. **Role-Aware** — UI different for Admin vs Superadmin; authorization backend-enforced
5. **Localized** — Bahasa Indonesia, Rp currency format, Asia/Jakarta timezone

---

## 🛠️ Pilar 3: HOW — Bagaimana Kami Membangun?

### 3.1 Project Structure

```
prime-property/
├── AGENTS.md                          # This file
├── CLAUDE.md                          # AI guardrails
├── PRD.md                             # Product requirements
├── SRS.md                             # System requirements
├── Acceptance_Criteria.pdf            # Final acceptance criteria
├── get-design.md                      # Design tokens & components
├── README.md                          # Setup, deployment, credentials
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── agent/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx       # Login form & logic
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx       # Property listing dashboard
│   │   │   │   ├── properties/
│   │   │   │   │   ├── page.tsx       # Listing view
│   │   │   │   │   ├── new/page.tsx   # Create (Superadmin)
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   ├── page.tsx   # Detail view
│   │   │   │   │   │   └── edit/page.tsx # Edit (Superadmin)
│   │   │   │   ├── admins/
│   │   │   │   │   └── page.tsx       # Admin mgmt (Superadmin)
│   │   │   │   └── audit-logs/
│   │   │   │       └── page.tsx       # Audit logs (Superadmin)
│   │   │
│   │   ├── (public)/
│   │   │   ├── page.tsx               # Landing page
│   │   │   ├── about/page.tsx         # About Us
│   │   │   ├── contact/page.tsx       # Contact Us
│   │   │   └── layout.tsx             # Public header layout
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login.ts           # Login endpoint
│   │   │   │   ├── logout.ts          # Logout endpoint
│   │   │   │   └── refresh.ts         # Session refresh
│   │   │   ├── properties/
│   │   │   │   ├── route.ts           # GET list, POST create (protected)
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── route.ts       # GET detail, PATCH update, DELETE
│   │   │   │   │   └── featured.ts    # GET featured for landing
│   │   │   ├── admins/
│   │   │   │   ├── route.ts           # GET list, POST create (Superadmin)
│   │   │   │   └── [id]/
│   │   │   │       ├── status.ts      # PATCH disable/enable
│   │   │   │       └── reset-password.ts # POST reset
│   │   │   ├── contact/
│   │   │   │   └── route.ts           # POST contact form
│   │   │   ├── audit-logs/
│   │   │   │   └── route.ts           # GET audit logs (Superadmin)
│   │   │   └── health.ts              # Health check
│   │   │
│   │   └── layout.tsx                 # Root layout
│   │
│   ├── components/
│   │   ├── public/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedProperties.tsx
│   │   │   ├── ValueProposition.tsx
│   │   │   └── ContactForm.tsx
│   │   │
│   │   ├── internal/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── PropertyTable.tsx
│   │   │   ├── PropertyFilter.tsx
│   │   │   ├── PropertyDetailDrawer.tsx
│   │   │   ├── PropertyForm.tsx
│   │   │   ├── AdminTable.tsx
│   │   │   ├── AuditLogTable.tsx
│   │   │   └── ConfirmModal.tsx
│   │   │
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Textarea.tsx
│   │       ├── Badge.tsx
│   │       ├── Toast.tsx
│   │       ├── Pagination.tsx
│   │       └── LoadingSpinner.tsx
│   │
│   ├── lib/
│   │   ├── db.ts                      # Supabase client initialization
│   │   ├── auth.ts                    # Auth utilities, session handling
│   │   ├── validation.ts              # Zod schemas for all entities
│   │   ├── formatting.ts              # Format IDR, dates, etc
│   │   ├── rate-limit.ts              # Rate limiting logic
│   │   ├── audit.ts                   # Audit log recording
│   │   └── constants.ts               # Brand colors, messages, enums
│   │
│   ├── middleware.ts                  # Auth middleware, CSRF check
│   ├── types/
│   │   ├── index.ts                   # Global type definitions
│   │   ├── property.ts
│   │   ├── user.ts
│   │   └── audit.ts
│   └── styles/
│       ├── globals.css                # Tailwind + custom CSS
│       └── theme.css                  # Color tokens
│
├── prisma/                            # Optional: if using Prisma instead of raw SQL
│   ├── schema.prisma
│   └── migrations/
│
├── tests/                             # Optional: unit & integration tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── public/
│   ├── logo.png
│   └── favicon.ico
│
├── .env.local.example
├── .env.production.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

### 3.2 Development Milestones

| Milestone                   | Duration | Key Deliverables                                                          |
| --------------------------- | -------- | ------------------------------------------------------------------------- |
| **M1: Foundation**          | Week 1   | Setup Next.js + Tailwind + Supabase, auth schema, theme tokens            |
| **M2: Public Pages**        | Week 1-2 | Landing, About, Contact pages; contact form; email integration            |
| **M3: Auth & RBAC**         | Week 2-3 | Login, session cookie, lockout logic, middleware, authorization           |
| **M4: Property Dashboard**  | Week 3-4 | Listing table, filter/search/sort, pagination, detail view, seed 50 dummy |
| **M5: Superadmin Features** | Week 4-5 | CRUD properties, admin management, audit logs                             |
| **M6: QA & Polish**         | Week 5-6 | Testing, performance tuning, responsive validation, README                |

### 3.3 Development Workflow

```
1. Setup Phase
   ├─ Create Supabase project
   ├─ Create Next.js app with TypeScript
   ├─ Install dependencies (Tailwind, React Hook Form, Zod, etc)
   ├─ Create theme tokens in CSS variables
   └─ Setup environment variables (.env.local)

2. Database Schema Phase
   ├─ Create users table (id, email, password_hash, role, is_active, locked_until, etc)
   ├─ Create properties table (all fields per AC-6.1)
   ├─ Create contact_messages table
   ├─ Create audit_logs table
   ├─ Create indexes for performance
   └─ Enable RLS (Row-Level Security) if using Supabase Auth

3. Authentication Phase
   ├─ Implement POST /api/auth/login (validation, bcrypt, lockout)
   ├─ Implement POST /api/auth/logout (clear cookie)
   ├─ Create auth middleware (verify session, extract user role)
   ├─ Create rate limiting middleware
   └─ Create CSRF middleware

4. Public Pages Phase
   ├─ Build public header, footer layouts
   ├─ Build landing page (hero, featured properties, value prop)
   ├─ Build about page
   ├─ Build contact page + form + email integration
   ├─ Test contact form validation + rate limiting
   └─ Optimize for Lighthouse ≥85

5. Internal Dashboard Phase
   ├─ Build internal header + sidebar
   ├─ Build property table (columns, sorting)
   ├─ Build filter panel (all filters per AC-7.2)
   ├─ Build search implementation (debounce 300ms)
   ├─ Build pagination (25/50/100 default 50)
   ├─ Build detail drawer/modal
   ├─ Seed 50+ dummy properties
   └─ Test Admin read-only access

6. Superadmin Features Phase
   ├─ Build create property form + validation
   ├─ Build update property form + dirty state
   ├─ Build delete modal + soft delete
   ├─ Build admin management table
   ├─ Build password reset logic
   ├─ Build audit log table + filtering
   ├─ Create audit log recording middleware
   └─ Test all CRUD operations

7. QA & Deployment Phase
   ├─ Test all acceptance criteria
   ├─ Test responsive (mobile, tablet, desktop)
   ├─ Test performance (FCP, search <500ms)
   ├─ Test security (403 for Admin, CSRF, rate limit, XSS)
   ├─ Create seed script for dummy data
   ├─ Write README with setup instructions
   ├─ Deploy to production (Vercel/Railway/etc)
   └─ Provide live URL + demo credentials
```

### 3.4 Team Roles & Responsibilities

| Role                  | Responsibility                                                 |
| --------------------- | -------------------------------------------------------------- |
| **Senior Full Stack** | Architect, database design, auth, API routes, security audit   |
| **Frontend Dev**      | UI components, responsive design, forms, state management      |
| **Backend Dev**       | API business logic, validation, audit logging, performance     |
| **QA Engineer**       | Test cases, acceptance criteria verification, security testing |
| **DevOps**            | Deployment, env setup, monitoring, database backups            |

---

# BAGIAN 2: OVERVIEW PROJECT

## 4.1 Project Characteristics

| Aspect                   | Detail                                                          |
| ------------------------ | --------------------------------------------------------------- |
| **Type**                 | Fullstack Web Application (Next.js)                             |
| **Scope**                | Public website + internal portal with RBAC                      |
| **Users**                | Public visitors, Admin agents, Superadmin                       |
| **Data Volume**          | ~1000 properties max (initial 50+ dummy)                        |
| **Complexity**           | Medium (auth, RBAC, filter/search optimization required)        |
| **Performance Critical** | Landing page <1.5s FCP, search <500ms                           |
| **Security Critical**    | RBAC enforcement, audit logging, rate limiting, CSRF protection |
| **Language**             | Indonesian UI, TypeScript codebase                              |

## 4.2 Critical Requirements (Must Have)

### Authentication & Authorization

```typescript
// ✅ MUST: All /agent/* endpoints except /agent/login protected
// ✅ MUST: Session stored in httpOnly cookie (SameSite=Lax, 30d expiry)
// ✅ MUST: Backend check role on every mutation endpoint (POST/PUT/DELETE)
// ✅ MUST: Admin attempting CRUD → 403 Forbidden
// ✅ MUST: 5 failed login attempts → 15 min lockout
// ✅ MUST: Password hashed with bcrypt cost ≥10
// ❌ MUST NOT: Self-registration; only superadmin can create admin accounts
// ❌ MUST NOT: Frontend-only authorization (always backend check)
```

### Data Integrity

```typescript
// ✅ MUST: price stored as BIGINT rupiah (no float)
// ✅ MUST: soft delete (deleted_at not null) for all deletes
// ✅ MUST: All field validations match AC-8.4 (nama min 3, lebar > 0, etc)
// ✅ MUST: Audit log records who, when, what changed for every mutation
// ✅ MUST: created_by links to users table (superadmin who created entry)
// ❌ MUST NOT: Hard delete from database
// ❌ MUST NOT: Direct price field update without validation
```

### Performance

```typescript
// ✅ MUST: FCP landing page < 1.5s on 4G
// ✅ MUST: Filter/search < 500ms for 1000 properties
// ✅ MUST: Lighthouse Performance Score ≥ 85
// ✅ MUST: Debounce search 300ms (prevent excessive DB calls)
// ✅ MUST: Pagination default 50 rows (options 25/50/100)
// ✅ MUST: Database indexes on: (nama_property, kawasan, harga, status, tipe)
// ❌ MUST NOT: Load all properties client-side (use pagination)
// ❌ MUST NOT: Unoptimized images (use next/image)
```

### Security

```typescript
// ✅ MUST: Rate limit 100 req/min/IP global
// ✅ MUST: Rate limit 10 req/min/IP auth endpoints
// ✅ MUST: Rate limit 3 contact form submit/IP/hour
// ✅ MUST: CSRF protection on all mutations
// ✅ MUST: Input sanitization (prevent XSS, SQL injection)
// ✅ MUST: HTTPS only in production
// ✅ MUST: Secure cookie flag (Secure, httpOnly, SameSite=Lax)
// ❌ MUST NOT: Store password in plaintext
// ❌ MUST NOT: Log sensitive data (passwords, API keys)
// ❌ MUST NOT: Disable CORS for non-public endpoints
```

---

# BAGIAN 3: SENIOR PROGRAMMER FULL STACK STANDARD CODE

## 5.1 Code Style & Conventions

### 5.1.1 TypeScript Rules

```typescript
// ✅ DO: Strict mode enabled, no any
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "target": "ES2020",
    "module": "ESNext"
  }
}

// ✅ DO: Define explicit types for all functions
export async function getProperty(id: string): Promise<Property | null> {
  // ...
}

// ✅ DO: Use discriminated unions for complex types
type AuthResult =
  | { success: true; user: User; token: string }
  | { success: false; error: string; code: string };

// ❌ DON'T: Use any without explicit justification
const data: any = response.data;  // ❌ BAD

// ❌ DON'T: Implicit return types on exported functions
export function calculatePrice(base: number) {  // ❌ Missing return type
  return base * 1.1;
}
```

### 5.1.2 Naming Conventions

```typescript
// ✅ DO: PascalCase for types, interfaces, enums
interface UserRole {}
type PropertyStatus = "in_stock" | "sold_out";
enum Role {
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

// ✅ DO: camelCase for variables, functions, methods
const propertyCount = 50;
function getPropertyByName(name: string) {}
const isAdmin = user.role === "superadmin";

// ✅ DO: UPPER_SNAKE_CASE for constants
const MAX_FAILED_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;
const FEATURE_FLAG_AUDIT_LOGS = true;

// ✅ DO: Descriptive names (no abbreviations)
const userRepository = new UserRepository();
const propertyFilterService = new PropertyFilterService();
const authenticationMiddleware = createAuthMiddleware();

// ❌ DON'T: Hungarian notation
const strName = "John"; // ❌ BAD
const isFinal = true; // ❌ BAD

// ❌ DON'T: Single letter variables (except i in loops)
const u = getUser(); // ❌ BAD
const p = getProperty(); // ❌ BAD
```

### 5.1.3 File Organization

```
src/
├── app/
│   └── api/
│       └── auth/
│           └── login.ts           // Single responsibility: login logic
│
├── lib/
│   ├── db/
│   │   ├── users.ts              // User-specific DB queries
│   │   ├── properties.ts          // Property-specific DB queries
│   │   └── audit-logs.ts          // Audit log DB queries
│   │
│   ├── services/
│   │   ├── auth.service.ts        // Auth business logic
│   │   ├── property.service.ts    // Property business logic
│   │   └── user.service.ts        // User management
│   │
│   ├── middleware/
│   │   ├── auth.ts                // Authentication check
│   │   ├── authorization.ts       // Role-based check
│   │   ├── rate-limit.ts          // Rate limiting
│   │   └── csrf.ts                // CSRF protection
│   │
│   └── utils/
│       ├── formatting.ts          // Format IDR, dates
│       ├── validation.ts          // Zod schemas
│       └── constants.ts           // Enums, constants

// ✅ DO: One concern per file
// ❌ DON'T: Mix business logic, DB, and UI in same file
```

### 5.1.4 Function Design

```typescript
// ✅ DO: Pure functions when possible
export function formatPrice(amount: number, locale: string = "id-ID"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// ✅ DO: Explicit error handling
export async function getPropertyById(id: string): Promise<Property> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) {
    throw new DatabaseError(error.message, { code: "PROPERTY_NOT_FOUND" });
  }

  return data as Property;
}

// ✅ DO: Validation at entry points
export async function createProperty(
  input: unknown,
  userId: string,
): Promise<{ id: string }> {
  const validated = PropertyCreateSchema.parse(input);
  const created = await propertyService.create(validated, userId);
  return { id: created.id };
}

// ❌ DON'T: Silent failures
async function getProperty(id) {
  try {
    return await db.properties.findById(id);
  } catch {
    // Silent fail 🚫
  }
}

// ❌ DON'T: Functions doing too much
async function handlePropertyRequest(req, res) {
  // Auth check, validation, DB query, formatting, response — all mixed 🚫
}
```

### 5.1.5 Comment Standards

```typescript
// ✅ DO: Explain WHY, not WHAT (code reads as WHAT)
// We soft-delete properties to maintain audit trail for compliance.
// This allows Superadmin to restore deleted entries if needed.
const deletedAt = new Date();
const updates = { deleted_at: deletedAt };

// ✅ DO: JSDoc for public functions
/**
 * Retrieves active properties matching filter criteria.
 *
 * @param filters - PropertyFilter object with optional kawasan, tipe, status
 * @param page - 1-indexed page number, default 1
 * @param perPage - Results per page (25, 50, or 100), default 50
 * @returns Promise resolving to paginated property list
 * @throws DatabaseError if query fails
 *
 * @example
 * const { items, total } = await getProperties(
 *   { tipe: 'villa', status: 'in_stock' },
 *   1,
 *   50
 * );
 */
export async function getProperties(
  filters: PropertyFilter,
  page: number = 1,
  perPage: number = 50,
): Promise<PaginatedResponse<Property>> {
  // ...
}

// ❌ DON'T: Obvious comments
const name = "John"; // Set name to John 🚫

// ❌ DON'T: Outdated comments
// TODO: Fix this later (from 3 months ago 🚫)
const value = calculateStuff(); // Was broken in v1.0 🚫
```

## 5.2 API Route Standards

### 5.2.1 Request Validation Pattern

```typescript
// lib/validation.ts
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const PropertyCreateSchema = z.object({
  nama_property: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter"),
  lebar: z
    .number()
    .positive("Lebar harus > 0")
    .multipleOf(0.01, "Max 2 desimal"),
  panjang: z
    .number()
    .positive("Panjang harus > 0")
    .multipleOf(0.01, "Max 2 desimal"),
  hadap: z
    .array(z.enum(["Utara", "Selatan", "Timur", "Barat"]))
    .min(1, "Setidaknya satu arah hadap"),
  price: z.number().int("Harga harus integer").positive("Harga harus > 0"),
  // ... other fields
});

// api/properties/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Extract body
    const body = await req.json();

    // 2. Validate with Zod
    const validated = PropertyCreateSchema.parse(body);

    // 3. Check auth & authorization
    const user = await getSessionUser(req);
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (user.role !== "superadmin")
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    // 4. Process request
    const property = await propertyService.create(validated, user.id);

    // 5. Record audit log
    await auditLog.record({
      actor_user_id: user.id,
      entity_type: "property",
      entity_id: property.id,
      action: "create",
      new_values: property,
      timestamp: new Date(),
      ip_address: req.headers.get("x-forwarded-for") || "unknown",
    });

    // 6. Return response
    return NextResponse.json(
      { success: true, id: property.id },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }

    if (error instanceof RateLimitError) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    console.error("[POST /api/properties]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
```

### 5.2.2 Authorization Pattern

```typescript
// lib/middleware/authorization.ts
export function requireRole(...allowedRoles: UserRole[]) {
  return async function authorizationMiddleware(req: NextRequest) {
    const user = await getSessionUser(req);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!allowedRoles.includes(user.role)) {
      console.warn(
        `[AUTH] User ${user.id} attempted unauthorized access to ${req.nextUrl.pathname}`,
      );
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return null; // Continue processing
  };
}

// api/properties/[id]/route.ts
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // Check authorization FIRST
  const authError = await requireRole("superadmin")(req);
  if (authError) return authError;

  // Rest of handler...
}
```

### 5.2.3 Error Response Standardization

```typescript
// lib/errors.ts
export class ValidationError extends Error {
  constructor(
    public message: string,
    public fields?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor(message: string = "Forbidden") {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class DatabaseError extends Error {
  constructor(
    public message: string,
    public context?: Record<string, any>,
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

// api/error-handler.ts
export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ValidationError) {
    return NextResponse.json(
      { error: "Validation failed", fields: error.fields },
      { status: 400 },
    );
  }

  if (error instanceof AuthenticationError) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  if (error instanceof AuthorizationError) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }

  if (error instanceof DatabaseError) {
    console.error("[DB ERROR]", error.message, error.context);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  console.error("[UNEXPECTED ERROR]", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
```

## 5.3 React Component Standards

### 5.3.1 Component Structure

```typescript
// ✅ DO: Functional components with explicit types
interface PropertyTableProps {
  properties: Property[];
  onRowClick?: (id: string) => void;
  isLoading?: boolean;
}

export function PropertyTable({
  properties,
  onRowClick,
  isLoading = false,
}: PropertyTableProps): React.ReactElement {
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        {/* Table content */}
      </table>
    </div>
  );
}

// ✅ DO: Separate concerns into smaller components
export function PropertyTableRow({ property, onClick }: {
  property: Property;
  onClick?: (id: string) => void;
}) {
  return (
    <tr
      onClick={() => onClick?.(property.id)}
      className="cursor-pointer hover:bg-gray-50"
    >
      <td>{property.nama_property}</td>
      <td>{formatPrice(property.price)}</td>
      <td><StatusBadge status={property.status} /></td>
    </tr>
  );
}

// ✅ DO: Use composition for UI logic
function PropertyTableWithFilter() {
  const [filters, setFilters] = useState<PropertyFilter>({});
  const { data, isLoading } = usePropertyList(filters);

  return (
    <div>
      <PropertyFilter onChange={setFilters} />
      <PropertyTable properties={data ?? []} isLoading={isLoading} />
    </div>
  );
}

// ❌ DON'T: God components
function PropertyDashboard() {
  // Handles: loading, filtering, sorting, pagination, modal, form, etc all at once 🚫
}

// ❌ DON'T: Implicit prop types
export function PropertyTable(props) {  // No type 🚫
  return <table>{props.data.map(...)}</table>;
}
```

### 5.3.2 State Management

```typescript
// ✅ DO: useState for local component state
function PropertyFilter() {
  const [kawasan, setKawasan] = useState<string[]>([]);
  const [hargaMax, setHargaMax] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {/* Filter UI */}
    </div>
  );
}

// ✅ DO: useEffect for side effects with dependency array
useEffect(() => {
  if (!filters) return; // Guard clause

  const timer = setTimeout(() => {
    searchProperties(filters);
  }, 300); // Debounce

  return () => clearTimeout(timer); // Cleanup
}, [filters]); // Explicit dependency

// ✅ DO: Custom hooks for reusable logic
function usePropertyFilter() {
  const [filters, setFilters] = useState<PropertyFilter>({});
  const { data, isLoading } = usePropertyList(filters);

  const updateFilter = useCallback((key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return { filters, updateFilter, data, isLoading };
}

// ❌ DON'T: useEffect without dependency array
useEffect(() => {
  fetchData();  // Runs on every render 🚫
});

// ❌ DON'T: Complex state logic in components
function PropertyForm() {
  const [formData, setFormData] = useState({...huge nested object...});
  // 200 lines of form state management 🚫
}
```

### 5.3.3 Form Handling with React Hook Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface PropertyCreateFormProps {
  onSuccess?: (id: string) => void;
}

export function PropertyCreateForm({ onSuccess }: PropertyCreateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PropertyCreateInput>({
    resolver: zodResolver(PropertyCreateSchema),
    defaultValues: {
      carport: false,
      status: 'in_stock',
    },
  });

  const onSubmit = async (data: PropertyCreateInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const { id } = await response.json();
      toast.success('Properti berhasil ditambahkan');
      reset();
      onSuccess?.(id);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Gagal membuat properti');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Nama Properti</label>
        <input
          {...register('nama_property')}
          disabled={isSubmitting}
          className={`w-full p-2 border rounded ${
            errors.nama_property ? 'border-red-500' : ''
          }`}
        />
        {errors.nama_property && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nama_property.message}
          </p>
        )}
      </div>

      {/* More form fields */}

      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="bg-gold text-black px-4 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Menyimpan...' : 'Simpan Properti'}
      </button>
    </form>
  );
}
```

## 5.4 Database Query Standards

### 5.4.1 Query Patterns

```typescript
// lib/db/properties.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

// ✅ DO: Type-safe queries with explicit selects
export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .select(
      `
      id,
      nama_property,
      lebar,
      panjang,
      hadap,
      tipe,
      tingkat,
      price,
      carport,
      status,
      siap,
      maps_link,
      kawasan,
      unit,
      created_at,
      updated_at,
      created_by
    `,
    )
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error) throw new DatabaseError(error.message);
  return data as Property;
}

// ✅ DO: Parameterized queries (Supabase handles this)
export async function getPropertiesByKawasan(
  kawasan: string[],
): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .in("kawasan", kawasan) // Parameterized
    .is("deleted_at", null)
    .order("nama_property", { ascending: true });

  if (error) throw new DatabaseError(error.message);
  return data as Property[];
}

// ✅ DO: Pagination with offset
export async function getPropertiesPaginated(
  filters: PropertyFilter,
  page: number = 1,
  perPage: number = 50,
): Promise<PaginatedResponse<Property>> {
  let query = supabase
    .from("properties")
    .select("*", { count: "exact" })
    .is("deleted_at", null);

  // Apply filters
  if (filters.kawasan?.length) {
    query = query.contains("kawasan", filters.kawasan);
  }
  if (filters.tipe) {
    query = query.eq("tipe", filters.tipe);
  }
  if (filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters.hargaMax) {
    query = query.lte("price", filters.hargaMax);
  }

  const offset = (page - 1) * perPage;
  const { data, error, count } = await query
    .order("nama_property", { ascending: true })
    .range(offset, offset + perPage - 1);

  if (error) throw new DatabaseError(error.message);

  return {
    items: data as Property[],
    total: count ?? 0,
    page,
    perPage,
    totalPages: Math.ceil((count ?? 0) / perPage),
  };
}

// ✅ DO: Transactions for data consistency
export async function updatePropertyAndAudit(
  propertyId: string,
  updates: Partial<Property>,
  userId: string,
): Promise<Property> {
  // Get current state for audit
  const oldProperty = await getPropertyById(propertyId);

  // Update property
  const { data, error } = await supabase
    .from("properties")
    .update({
      ...updates,
      updated_at: new Date(),
    })
    .eq("id", propertyId)
    .select()
    .single();

  if (error) throw new DatabaseError(error.message);

  // Record audit
  await supabase.from("audit_logs").insert({
    actor_user_id: userId,
    entity_type: "property",
    entity_id: propertyId,
    action: "update",
    previous_values: oldProperty,
    new_values: data,
    created_at: new Date(),
  });

  return data as Property;
}

// ❌ DON'T: SELECT * (explicitly list columns you need)
const { data } = await supabase.from("properties").select("*"); // ❌ BAD: Gets all columns

// ❌ DON'T: N+1 queries
for (const property of properties) {
  const user = await getUser(property.created_by); // ❌ Runs query per row
}

// Better: Join or batch fetch
const { data } = await supabase.from("properties").select(`
    *,
    users!created_by (id, name, email)
  `);
```

### 5.4.2 Soft Delete Pattern

```typescript
// ✅ DO: Soft delete with deleted_at
export async function deleteProperty(
  id: string,
  userId: string
): Promise<void> {
  const property = await getPropertyById(id);

  const { error } = await supabase
    .from('properties')
    .update({
      deleted_at: new Date(),
      updated_at: new Date(),
    })
    .eq('id', id);

  if (error) throw new DatabaseError(error.message);

  // Audit log
  await auditLog.record({
    actor_user_id: userId,
    entity_type: 'property',
    entity_id: id,
    action: 'delete',
    previous_values: property,
    new_values: null,
    timestamp: new Date(),
  });
}

// ✅ DO: Always filter out soft-deleted records
.is('deleted_at', null)  // In every query
```

---

# BAGIAN 4: SENIOR PROGRAMMER FULL STACK STANDARD SECURITY

## 6.1 Authentication Implementation

### 6.1.1 Password Security

```typescript
// lib/auth/password.ts
import bcrypt from "bcrypt";

const BCRYPT_COST_FACTOR = 12; // ≥10 per requirement

/**
 * Hash password using bcrypt with high cost factor.
 * @param password - Plain text password (min 6 chars)
 * @returns Promise resolving to hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_COST_FACTOR);
}

/**
 * Verify password against hash.
 * @param password - Plain text password to verify
 * @param hash - Hashed password from database
 * @returns Promise resolving to boolean
 */
export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// lib/auth/login.ts
export async function authenticateUser(
  email: string,
  password: string,
  ipAddress: string,
): Promise<AuthResult> {
  // 1. Validate email format
  if (!isValidEmail(email)) {
    return { success: false, error: "Email tidak valid" };
  }

  // 2. Find user
  const user = await getUserByEmail(email);
  if (!user) {
    // ⚠️ Return generic error (don't reveal if user exists)
    return { success: false, error: "Email atau password salah" };
  }

  // 3. Check if locked out
  if (user.locked_until && user.locked_until > new Date()) {
    const minutesLeft = Math.ceil(
      (user.locked_until.getTime() - Date.now()) / 60000,
    );
    return {
      success: false,
      error: `Akun terkunci. Coba lagi dalam ${minutesLeft} menit.`,
    };
  }

  // 4. Verify password
  const isValid = await verifyPassword(password, user.password_hash);
  if (!isValid) {
    // Track failed attempt
    const failedCount = (user.failed_login_count ?? 0) + 1;
    const now = new Date();

    let updates: any = { failed_login_count: failedCount };

    if (failedCount >= 5) {
      // Lock for 15 minutes
      updates.locked_until = new Date(now.getTime() + 15 * 60000);
      updates.failed_login_window_started_at = null;

      // Audit log security event
      await auditLog.record({
        actor_user_id: null,
        entity_type: "user",
        entity_id: user.id,
        action: "failed_login_lockout",
        ip_address: ipAddress,
        timestamp: now,
      });

      return {
        success: false,
        error: `Terlalu banyak upaya login gagal. Akun terkunci selama 15 menit.`,
      };
    }

    if (
      !user.failed_login_window_started_at ||
      now.getTime() - user.failed_login_window_started_at.getTime() > 30 * 60000
    ) {
      // Reset window if > 30 minutes
      updates.failed_login_window_started_at = now;
      updates.failed_login_count = 1;
    }

    await supabase.from("users").update(updates).eq("id", user.id);

    return { success: false, error: "Email atau password salah" };
  }

  // 5. Reset failed login counter on success
  if (user.failed_login_count > 0) {
    await supabase
      .from("users")
      .update({
        failed_login_count: 0,
        failed_login_window_started_at: null,
        locked_until: null,
        last_login_at: new Date(),
      })
      .eq("id", user.id);
  }

  // 6. Create session
  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as UserRole,
    },
  };
}
```

### 6.1.2 Session Cookie Management

```typescript
// lib/auth/session.ts
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "pp_session";
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface Session {
  userId: string;
  email: string;
  role: UserRole;
  issuedAt: number;
  expiresAt: number;
}

/**
 * Create and set secure session cookie.
 * ✅ httpOnly: Prevents XSS from accessing cookie
 * ✅ Secure: Only sent over HTTPS in production
 * ✅ SameSite=Lax: CSRF protection
 * ✅ 30-day expiry: As per requirement
 */
export async function setSessionCookie(user: {
  id: string;
  email: string;
  role: UserRole;
}): Promise<void> {
  const session: Session = {
    userId: user.id,
    email: user.email,
    role: user.role,
    issuedAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION,
  };

  // Encrypt session (optional but recommended)
  const encrypted = encryptSession(session);

  const cookieStore = await cookies();
  cookieStore.set({
    name: SESSION_COOKIE_NAME,
    value: encrypted,
    httpOnly: true, // ✅ Prevents XSS
    secure: process.env.NODE_ENV === "production", // ✅ HTTPS only
    sameSite: "lax", // ✅ CSRF protection
    maxAge: SESSION_DURATION / 1000, // 30 days in seconds
    path: "/",
  });
}

/**
 * Get and validate session from cookie.
 */
export async function getSession(req?: NextRequest): Promise<Session | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) return null;

  try {
    const session = decryptSession(sessionCookie.value);

    // Validate expiry
    if (session.expiresAt < Date.now()) {
      await clearSessionCookie();
      return null;
    }

    return session;
  } catch (error) {
    console.error("[Session] Decryption failed:", error);
    await clearSessionCookie();
    return null;
  }
}

/**
 * Clear session cookie (on logout).
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// ❌ DON'T: Store sensitive data in cookies
// ❌ DON'T: Use plain-text session data
// ❌ DON'T: Skip httpOnly flag (opens XSS vector)
```

## 6.2 Authorization & RBAC

### 6.2.1 Role-Based Access Control

```typescript
// lib/auth/authorization.ts

export type UserRole = "admin" | "superadmin";

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    "property.view",
    "property.filter",
    "property.search",
    "property.detail",
  ],
  superadmin: [
    "property.view",
    "property.filter",
    "property.search",
    "property.detail",
    "property.create",
    "property.update",
    "property.delete",
    "user.create",
    "user.update",
    "user.delete",
    "audit_log.view",
  ],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function requirePermission(permission: string) {
  return async function middleware(req: NextRequest) {
    const session = await getSession(req);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!hasPermission(session.role, permission)) {
      console.warn(
        `[RBAC] User ${session.userId} denied permission: ${permission}`,
      );
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return null; // Continue
  };
}
```

### 6.2.2 Backend Authorization Check (Critical!)

```typescript
// api/properties/[id]/route.ts
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  // ✅ MUST: Check authorization on EVERY mutation
  const authMiddleware = requirePermission("property.update");
  const authError = await authMiddleware(req);
  if (authError) return authError;

  // Get authenticated user
  const session = await getSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = PropertyUpdateSchema.parse(body);

    // Business logic
    const updated = await propertyService.update(
      params.id,
      validated,
      session.userId,
    );

    // Audit log
    await auditLog.record({
      actor_user_id: session.userId,
      entity_type: "property",
      entity_id: params.id,
      action: "update",
      new_values: updated,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

// ❌ DON'T: Trust frontend-only checks
// ❌ DON'T: Store authorization in JWT/token without backend validation
// ❌ DON'T: Allow admins to bypass RBAC via direct API calls
```

## 6.3 CSRF Protection

### 6.3.1 CSRF Token Implementation

```typescript
// lib/csrf.ts
import crypto from "crypto";

const CSRF_TOKEN_LENGTH = 32;
const CSRF_HEADER_NAME = "x-csrf-token";

/**
 * Generate CSRF token.
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString("hex");
}

/**
 * Store CSRF token in secure cookie (httpOnly but readable server-side).
 */
export async function setCsrfToken(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "csrf_token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
}

/**
 * Verify CSRF token from request header.
 * ✅ Token from header must match cookie value
 */
export async function verifyCsrfToken(req: NextRequest): Promise<boolean> {
  const cookieStore = await cookies();
  const storedToken = cookieStore.get("csrf_token")?.value;
  const headerToken = req.headers.get(CSRF_HEADER_NAME);

  if (!storedToken || !headerToken) {
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(storedToken),
    Buffer.from(headerToken),
  );
}

// middleware.ts
export async function middleware(request: NextRequest) {
  // Skip CSRF check for GET, HEAD, OPTIONS
  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    return NextResponse.next();
  }

  // Check CSRF for mutations
  if (!(await verifyCsrfToken(request))) {
    console.warn(
      `[CSRF] Failed: ${request.method} ${request.nextUrl.pathname}`,
    );
    return NextResponse.json(
      { error: "CSRF validation failed" },
      { status: 403 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/agent/:path*"],
};
```

## 6.4 Rate Limiting

### 6.4.1 Rate Limit Implementation

```typescript
// lib/rate-limit.ts
interface RateLimitRecord {
  ip: string;
  endpoint: string;
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

export type RateLimitConfig = {
  maxRequests: number;
  windowMs: number; // Time window in milliseconds
};

/**
 * Check rate limit. Returns true if request is allowed.
 * @param ip - Client IP address
 * @param endpoint - API endpoint or identifier
 * @param config - Rate limit configuration
 */
export function checkRateLimit(
  ip: string,
  endpoint: string,
  config: RateLimitConfig,
): boolean {
  const key = `${ip}:${endpoint}`;
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record) {
    // First request
    rateLimitStore.set(key, {
      ip,
      endpoint,
      count: 1,
      resetTime: now + config.windowMs,
    });
    return true;
  }

  if (now > record.resetTime) {
    // Window expired, reset
    record.count = 1;
    record.resetTime = now + config.windowMs;
    return true;
  }

  // Within window
  record.count++;
  return record.count <= config.maxRequests;
}

// Rate limit configs per AC-9.2 & SRS
export const RATE_LIMITS = {
  global: {
    maxRequests: 100,
    windowMs: 60 * 1000, // 1 minute
  },
  auth: {
    maxRequests: 10,
    windowMs: 60 * 1000, // 1 minute
  },
  contactForm: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
};

// middleware.ts
export async function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";

  // Apply global rate limit
  if (!checkRateLimit(ip, "global", RATE_LIMITS.global)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Apply specific rate limit for auth endpoints
  if (request.nextUrl.pathname.includes("/auth/")) {
    if (!checkRateLimit(ip, "auth", RATE_LIMITS.auth)) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        { status: 429 },
      );
    }
  }

  return NextResponse.next();
}
```

### 6.4.2 Contact Form Rate Limit

```typescript
// api/contact/route.ts
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    // Check contact form rate limit (3/hour per IP)
    if (!checkRateLimit(ip, "contact_form", RATE_LIMITS.contactForm)) {
      return NextResponse.json(
        { error: "Terlalu banyak pesan. Coba lagi nanti." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const validated = ContactFormSchema.parse(body);

    // Save to database
    const { error } = await supabase.from("contact_messages").insert({
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      message: validated.message,
      ip_address: ip,
      user_agent: req.headers.get("user-agent"),
    });

    if (error) throw new DatabaseError(error.message);

    // Send email
    await sendContactEmail(validated);

    return NextResponse.json(
      {
        success: true,
        message: "Pesan terkirim, tim kami akan menghubungi Anda.",
      },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}
```

## 6.5 Input Validation & Sanitization

### 6.5.1 Input Validation with Zod

```typescript
// lib/validation.ts
import { z } from "zod";

// ✅ DO: Define schemas for all inputs
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .max(128, "Password terlalu panjang"),
});

export const PropertyCreateSchema = z.object({
  nama_property: z
    .string()
    .min(3, "Minimal 3 karakter")
    .max(100, "Maksimal 100 karakter")
    .trim(),
  lebar: z.number().positive("Lebar harus > 0"),
  panjang: z.number().positive("Panjang harus > 0"),
  hadap: z
    .array(z.enum(["Utara", "Selatan", "Timur", "Barat"]))
    .min(1, "Pilih setidaknya satu arah hadap"),
  price: z.number().int("Harga harus integer").positive("Harga harus > 0"),
  carport: z.boolean(),
  status: z.enum(["in_stock", "sold_out"]),
  siap: z.enum(["siap_huni", "siap_kosong", "siap_huni_renovasi"]),
  tipe: z.enum(["ruko", "villa"]),
  tingkat: z.number().positive().max(10),
  // ... other fields
});

// ✅ DO: Validate on entry point
export async function createProperty(input: unknown, userId: string) {
  const validated = PropertyCreateSchema.parse(input);
  // Proceed with validated data...
}

// ❌ DON'T: Skip validation
function createProperty(input: any) {
  const property = {
    name: input.name, // Direct use without validation 🚫
    price: input.price,
  };
}
```

### 6.5.2 Output Sanitization & Escaping

```typescript
// ✅ DO: Escape HTML in output (React does this by default)
function PropertyCard({ property }: { property: Property }) {
  return (
    <div>
      {/* React auto-escapes: <Property.name> */}
      <h2>{property.nama_property}</h2>
      <p>{property.unit}</p>
    </div>
  );
}

// ✅ DO: Use dangerouslySetInnerHTML sparingly (and sanitize)
import DOMPurify from 'isomorphic-dompurify';

function RichText({ content }: { content: string }) {
  const sanitized = DOMPurify.sanitize(content);
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitized }} />
  );
}

// ❌ DON'T: Render user input without escaping
<div>{property.unit}</div> // If unit can contain <script>, it's dangerous 🚫

// ❌ DON'T: Use dangerouslySetInnerHTML without sanitizing
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // XSS vector 🚫
```

## 6.6 Secure Dependencies & Supply Chain

```json
// package.json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "typescript": "^5.0.0",
    "zod": "^3.22.0",
    "react-hook-form": "^7.48.0",
    "@hookform/resolvers": "^3.3.0",
    "bcrypt": "^5.1.0",
    "@supabase/supabase-js": "^2.38.0",
    "tailwindcss": "^3.3.0",
    "isomorphic-dompurify": "^2.3.0"
  }
}

// ✅ DO: Regular dependency updates
npm audit
npm update

// ✅ DO: Use lock file (package-lock.json)
// ❌ DON'T: Use wildcard versions in dependencies
// ❌ DON'T: Ignore npm audit warnings
```

## 6.7 Logging & Monitoring (Production)

```typescript
// lib/logger.ts
type LogLevel = "debug" | "info" | "warn" | "error";

export function log(
  level: LogLevel,
  message: string,
  context?: Record<string, any>,
) {
  const timestamp = new Date().toISOString();

  // ✅ DO: Include context for debugging
  console.log(
    JSON.stringify({
      timestamp,
      level: level.toUpperCase(),
      message,
      ...context,
    }),
  );

  // In production, send to external logging service (Sentry, LogRocket, etc)
  if (process.env.NODE_ENV === "production") {
    // Send to logging service
  }
}

// ✅ DO: Log security events
export function logSecurityEvent(
  event: string,
  userId?: string,
  context?: Record<string, any>,
) {
  log("warn", `[SECURITY] ${event}`, {
    userId,
    ...context,
    timestamp: new Date(),
  });
}

// Usage
logSecurityEvent("failed_login_attempt", userId, { attempt: 5, ip });
logSecurityEvent("unauthorized_access_attempt", userId, {
  endpoint: "/api/properties",
  method: "POST",
});

// ❌ DON'T: Log sensitive data
log("info", "User login", { password: user.password }); // 🚫
log("info", "API call", { apiKey: process.env.SECRET_KEY }); // 🚫
```

---

## 📋 CHECKLIST SEBELUM PRODUCTION

- [ ] TypeScript strict mode enabled
- [ ] All route handlers have type signatures
- [ ] All API routes check authorization at backend
- [ ] Session cookie is httpOnly + Secure + SameSite=Lax
- [ ] Password hashed with bcrypt cost ≥10
- [ ] CSRF protection on all mutations
- [ ] Rate limiting implemented (global, auth, contact)
- [ ] Input validation with Zod on all endpoints
- [ ] Output HTML-escaped (default React behavior)
- [ ] SQL injection prevented (using ORM/parameterized queries)
- [ ] Soft delete implemented (no hard deletes)
- [ ] Audit logging records all mutations
- [ ] Error messages don't leak sensitive info
- [ ] Environment variables not committed
- [ ] Database indexes created for performance
- [ ] Tests pass (unit, integration, security)
- [ ] Lighthouse score ≥85
- [ ] Responsive tested on mobile/tablet/desktop
- [ ] README includes setup instructions
- [ ] Demo credentials provided
- [ ] HTTPS enabled in production

---

**End of AGENTS.md**

This document is the source of truth for development standards and architecture decisions. Developers should refer to this document regularly during implementation.
