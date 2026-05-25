# Setup & Initialization Guide - Prime Property Web Platform

Complete guide for initializing, configuring, and running the Prime Property Web Platform.

## System Requirements

- Node.js 18+ (use nvm if needed)
- npm or yarn
- Supabase PostgreSQL account
- SMTP provider or email service (Gmail, Resend, etc.)

## Quick Start (5 Minutes)

### 1. Clone Repository & Install Dependencies

```bash
cd /Users/devomnih/Project/prime-property
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example file to .env.local
cp .env.local.example .env.local

# Edit .env.local with these values:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - Email configuration
```

**Get Supabase keys:**

1. Open https://supabase.com/dashboard
2. Select your project
3. Go to Settings -> API and copy the URL and keys
4. Paste them into `.env.local`

### 3. Set Up Database Schema

```bash
# Run the migration SQL in the Supabase SQL editor
# File: src/lib/db/client.ts -> DATABASE_SCHEMA

# Copy the full SQL and run it in the Supabase dashboard:
# https://supabase.com/dashboard/project/YOUR-PROJECT/sql
```

**Or use the Supabase CLI:**

```bash
npm install -g supabase
supabase link --project-ref YOUR-PROJECT-REF
supabase migration up
```

### 4. Seed Dummy Data (Optional)

```bash
# Seed script:
# scripts/seed.js

# Run:
npm run db:seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Directory Structure

```text
prime-property/
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages: Landing, About, Contact
│   │   ├── (auth)/            # Internal pages: Dashboard, Login
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles + design tokens
│   │
│   ├── lib/
│   │   ├── db/                # Database client & schema
│   │   ├── middleware/        # Auth and RBAC middleware
│   │   ├── services/          # Business logic (future)
│   │   └── utils/             # Constants, formatting, validation
│   │
│   ├── types/                 # TypeScript type definitions
│   │
│   └── components/            # React components
│       ├── public/            # Public page components
│       ├── internal/          # Internal dashboard components
│       └── common/            # Shared components
│
├── public/                    # Static assets
├── tailwind.config.ts         # Design token configuration
├── tsconfig.json              # TypeScript configuration
└── .env.local.example         # Environment template
```

## Key Feature Status

### Phase 1: Foundation (Complete)

- [x] TypeScript setup
- [x] Design system (colors, typography, spacing)
- [x] Tailwind CSS configuration
- [x] Global layouts (public & auth)
- [x] Type definitions (User, Property, etc.)
- [x] Validation schemas (Zod)
- [x] Database schema definition
- [x] Authentication middleware
- [x] RBAC framework (Admin vs Superadmin)
- [x] Environment configuration

### Phase 2: Core Features (In Progress)

- [ ] Login API implementation
- [ ] Property listing & filtering
- [ ] Property CRUD operations
- [ ] Contact form & email
- [ ] Audit logging
- [ ] Admin management

### Phase 3: Polish & Deployment (Future)

- [ ] Unit & integration tests
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Lighthouse optimization
- [ ] Production deployment

## Security Checklist (AC-9.2, AGENTS.md 6)

Before production, verify:

- [ ] TypeScript strict mode is enabled
- [ ] All API routes enforce backend authorization
- [ ] Session cookie uses httpOnly + Secure + SameSite=Lax
- [ ] Passwords are hashed with bcrypt cost >= 10
- [ ] CSRF protection is enabled on all mutations
- [ ] Rate limiting is implemented
- [ ] Input validation uses Zod
- [ ] Output is HTML-escaped (React default)
- [ ] Environment variables are not committed
- [ ] Database indexes are created
- [ ] Error messages do not leak sensitive information

## Performance Targets (AC-9.1)

- Landing page FCP < 1.5s on 4G
- Filter/search < 500ms for 1000 properties
- Lighthouse Performance Score >= 85
- Search debounce 300ms
- Default pagination 50 rows

Test with:

```bash
# Lighthouse audit
npm run build && npm run start
# Open Chrome DevTools -> Lighthouse

# TypeScript verification
npm run type-check
```

## Localization (AC-9.3)

All user-facing UI uses Bahasa Indonesia:

- `LOCALE = "id-ID"`
- `CURRENCY = "IDR"`
- `TIMEZONE = "Asia/Jakarta"`
- Price format: `Rp 1.350.000.000` (dot thousands separator)
- Date format: `24 Mei 2026` or `24/05/2026`

Utilities are available in `src/lib/utils/formatting.ts`:

```typescript
import { formatCurrency, formatDate } from "@/lib/utils/formatting";

formatCurrency(1350000000); // "Rp 1.350.000.000"
formatDate(new Date()); // "24 Mei 2026"
```

## Deployment Checklist

### Before Deployment

1. Update `.env` with production values
2. Set `SESSION_COOKIE_SECURE=true`
3. Set `NODE_ENV=production`
4. Run `npm run build` and verify there are no errors
5. Run a security audit: `npm audit`
6. Test all critical flows manually
7. Verify HTTPS is enabled
8. Confirm database backups are automated

### Deployment Platform Options

**Vercel (recommended for Next.js):**

```bash
npm i -g vercel
vercel login
vercel deploy --prod
```

**Railway, Render, and Netlify are also supported.**

## Support & Documentation

- **PRD.md** - Product requirements and business goals
- **SRS.md** - System requirements and technical specifications
- **Prime_Property_Acceptance_Criteria.pdf** - Final acceptance criteria
- **AGENTS.md** - Development standards and security rules
- **get-design.md** - Design system and component specifications
- **CLAUDE.md** - AI guardrails and hallucination prevention

## Testing

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build

# Development
npm run dev
```

## Demo Credentials

**Admin User:**

- Email: `admin@primeproperty.id`
- Password: `AdminPassword123` (set during setup)

**Superadmin User:**

- Email: `superadmin@primeproperty.id`
- Password: `SuperadminPassword123` (set during setup)

_These are examples. Set actual credentials in production._

## Verification Checklist

After setup, verify:

- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000 loads the landing page
- [ ] Design system colors are correct (black, gold, red)
- [ ] Responsive layout works on mobile (<= 640px)
- [ ] TypeScript type-checks without errors
- [ ] Database schema is created in Supabase
- [ ] Environment variables load correctly
- [ ] API health check works: http://localhost:3000/api/health

## Troubleshooting

### Environment Variables Not Loading

```bash
# Verify .env.local exists and is readable
cat .env.local

# Restart the dev server
npm run dev
```

### Supabase Connection Error

```bash
# Check credentials
# Verify NEXT_PUBLIC_SUPABASE_URL format:
# https://your-project.supabase.co

# Verify keys match the Supabase dashboard
```

### TypeScript Errors

```bash
npm run type-check
# Check that tsconfig.json strict mode is enabled
```

### Tailwind Classes Not Applied

```bash
# Rebuild
npm run dev

# Check that tailwind.config.ts includes src/app/**
```

## Next Steps

1. **Implement Phase 2 features:**
   - Complete login logic with bcrypt
   - Property listing endpoint
   - Contact form with rate limiting

2. **Create database seed script:**
   - Generate 50+ dummy properties
   - Create demo accounts

3. **Build React components:**
   - PropertyTable with sorting & pagination
   - PropertyFilter panel
   - DetailDrawer

4. **Add tests:**
   - Unit tests for utilities
   - Integration tests for API
   - E2E tests with Playwright

5. **Deploy to staging:**
   - Verify on a production-like environment
   - Load test with 1000+ properties

---

**Last Updated:** May 25, 2026  
**Status:** Foundation Complete | Ready for Feature Development
