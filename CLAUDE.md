# CLAUDE.md — AI Agent Guardrails & Hallucination Prevention

**Version:** 1.0  
**Purpose:** Prevent AI/Claude hallucination by providing clear, fact-based requirements extracted from PRD, SRS, and Acceptance Criteria  
**Last Updated:** 24 Mei 2026  
**Audience:** Claude, AI coding assistants, team using AI to generate code/docs for Prime Property

---

## 📌 WHAT IS THIS DOCUMENT?

CLAUDE.md is a **guardrail document** to prevent AI agents (including Claude) from:

- **Hallucinating features** not in PRD/SRS/AC (e.g., "add image gallery")
- **Inventing requirements** not explicitly stated
- **Guessing about technical decisions** without source material
- **Deviating from design tokens** specified in get-design.md
- **Ignoring security requirements** from AGENTS.md

**How to use:** When asking Claude for code, designs, or decisions:

1. Reference this document
2. Ask Claude to verify its response against CLAUDE.md
3. If Claude suggests something not in these docs, ask "Is this in PRD/SRS/AC?"

---

## 🚨 CRITICAL TRUTH GATES — REFERENCE BEFORE DECIDING

### Gate 1: Feature Scope

| Feature                             | Explicitly In Scope? | Source                                       |
| ----------------------------------- | -------------------- | -------------------------------------------- |
| Landing Page                        | ✅ YES               | PRD 3.1, AC-2.1 to AC-2.3                    |
| About Us Page                       | ✅ YES               | PRD 3.1, AC-3.1                              |
| Contact Us Page                     | ✅ YES               | PRD 3.1, AC-4.1 to AC-4.2                    |
| Contact Form + Email                | ✅ YES               | PRD 4.1-4.5, SRS SI-001                      |
| Agent Login                         | ✅ YES               | PRD 3.1, AC-5.1                              |
| Property Listing Dashboard          | ✅ YES               | PRD 3.1, AC-7.1                              |
| Filter, Search, Pagination          | ✅ YES               | PRD 3.1, AC-7.2                              |
| Property Detail View                | ✅ YES               | PRD 3.1, AC-7.3                              |
| Create Property (Superadmin)        | ✅ YES               | PRD 3.1, AC-8.1                              |
| Update Property (Superadmin)        | ✅ YES               | PRD 3.1, AC-8.2                              |
| Delete Property (Soft)              | ✅ YES               | PRD 3.1, AC-8.3                              |
| Admin Management                    | ✅ YES               | PRD 3.1, AC-8.x (implied by Superadmin role) |
| Audit Logs                          | ✅ YES               | PRD 3.1, FR-AUDIT                            |
| **Image Upload**                    | ❌ OUT OF SCOPE      | PRD 3.2, AC-1.2, SRS 2.5                     |
| **Map-Based Search**                | ❌ OUT OF SCOPE      | PRD 3.2                                      |
| **Payment/Booking**                 | ❌ OUT OF SCOPE      | PRD 3.2                                      |
| **Public Listing with Full Filter** | ❌ OUT OF SCOPE      | PRD 3.2                                      |
| **Self-Registration for Agents**    | ❌ OUT OF SCOPE      | PRD 3.2, AC-5.1                              |
| **Archive/Restore Soft Deleted**    | ⚠️ OPTIONAL PHASE 2  | PRD 3.1, AC-8.3 note                         |

**Remember:** If Claude suggests a feature not in this list, **ask "Is this in PRD/SRS?"**

### Gate 2: Technology Stack

| Layer             | Decided                  | Why                                  | Fallback                                |
| ----------------- | ------------------------ | ------------------------------------ | --------------------------------------- |
| **Framework**     | Next.js 15+              | PRD rec., SRS 3.1, modern App Router | Don't use: Create React App, Nuxt       |
| **Language**      | TypeScript               | PRD rec., AGENTS.md 5.1, type safety | Don't use: JavaScript only              |
| **Styling**       | Tailwind CSS             | PRD rec., get-design.md tokens       | Don't use: CSS-in-JS, styled-components |
| **Database**      | Supabase PostgreSQL      | PRD rec., SRS 3.1                    | Don't use: MongoDB, Firebase            |
| **Auth**          | Custom (httpOnly cookie) | AC-5.1, AGENTS.md 6.1                | Don't use: Supabase Auth magic links    |
| **Validation**    | Zod                      | SRS 3.1, AGENTS.md 5.2               | Don't use: Joi, Yup                     |
| **Forms**         | React Hook Form          | SRS 3.1                              | Don't use: Formik                       |
| **Password Hash** | bcrypt (cost ≥10)        | AC-9.2, AGENTS.md 6.1                | Don't use: plaintext, MD5, weak hash    |

**Decision Rule:** Use stack from PRD section 1 line 8. If Claude suggests different tech, **ask "Is this from PRD recommendations?"**

### Gate 3: Design System (from get-design.md)

These are **FIXED**, not negotiable:

| Token              | Value          | Usage                       | Source                     |
| ------------------ | -------------- | --------------------------- | -------------------------- |
| Primary Black      | `#1A1A1A`      | Headers, text, backgrounds  | get-design.md line 7       |
| Accent Gold        | `#C9A961`      | CTAs, highlights, badges    | get-design.md line 10      |
| Accent Red         | `#B33A3A`      | Urgent, errors, destructive | get-design.md line 13      |
| Neutral White      | `#FFFFFF`      | Main background             | get-design.md line 16      |
| Soft Gray          | `#F5F5F5`      | Cards, secondary bg         | get-design.md line 17      |
| Typography         | Inter or Geist | All text                    | get-design.md line 40-41   |
| Breakpoint Mobile  | ≤640px         | Mobile layout               | get-design.md (responsive) |
| Breakpoint Tablet  | ≤1024px        | Tablet layout               | get-design.md (responsive) |
| Breakpoint Desktop | ≥1024px        | Desktop layout              | get-design.md (responsive) |

**If Claude suggests "let's use blue for primary":** **NO.** It must be black (#1A1A1A). Reference get-design.md line 7.

### Gate 4: Data Schema (Locked from AC-6.1 & SRS 5.1.2)

**Property fields MUST be:**

```
✅ id, nama_property, group (nullable), lebar, panjang, hadap (array),
   tipe, tingkat, price (BIGINT), carport, status, siap, maps_link,
   kawasan (array), unit (nullable), created_at, updated_at, deleted_at,
   created_by (FK users), is_highlight

❌ NO: image_url, image_gallery, thumbnail, etc
❌ NO: description (too free-form, focusing on tabular data)
❌ NO: video_url, virtual_tour_link (out of scope)
```

**User fields MUST be:**

```
✅ id, name, email, password_hash, role (enum: admin/superadmin),
   is_active, failed_login_count, locked_until, created_at, updated_at

❌ NO: profile_photo, bio, social_links
❌ NO: Two-factor authentication (not in AC)
```

**Price field RULES:**

- Store as BIGINT (integer rupiah, no float)
- Display as `Rp 1.350.000.000` (dot separator per AC-9.3)
- Never round or convert to float

**Source:** AC-6.1 (page 4-5), SRS 5.1.2, AGENTS.md 5.4.1

**If Claude suggests adding an `description` field to properties:** Ask "Is this in AC-6.1 property schema?"

### Gate 5: Authentication & Authorization (Iron-Clad Rules)

#### Rule 5.1: No Self-Registration

```
❌ DO NOT: Implement signup form for agents
❌ DO NOT: Allow users to create their own accounts
✅ DO: Only Superadmin can create Admin accounts via API endpoint
```

Source: AC-5.1 ("Tidak ada self-registration")

#### Rule 5.2: Session is httpOnly Cookie, NOT JWT

```
✅ DO: Store session in httpOnly cookie
     - httpOnly: true
     - Secure: true (production)
     - SameSite: Lax
     - maxAge: 30 days

❌ DO NOT: Use JWT tokens
❌ DO NOT: Store sensitive data in localStorage
❌ DO NOT: Return session data in API response body
```

Source: AC-5.1 ("Session disimpan di httpOnly cookie, SameSite=Lax, masa berlaku 30 hari")

#### Rule 5.3: Backend Authorization Check is MANDATORY

```
✅ DO: On EVERY mutation endpoint (POST, PUT, PATCH, DELETE):
   1. Verify session exists
   2. Check user.role === 'superadmin'
   3. If not superadmin, return 403 Forbidden
   4. Log attempt in audit trail

✅ DO: Test admin attempting direct POST /api/properties → 403

❌ DO NOT: Trust frontend UI hiding (e.g., "Edit button hidden for admin" is not security)
❌ DO NOT: Skip backend check if frontend looks valid
❌ DO NOT: Return 404 instead of 403 (leaks information)
```

Source: AC-5.2 ("Authorization WAJIB dicek di backend untuk setiap endpoint"), SRS SEC-008

#### Rule 5.4: Lockout After 5 Failed Logins

```
✅ DO: Track failed_login_count in users table
✅ DO: After 5 failures in 30 minutes → set locked_until = NOW + 15 minutes
✅ DO: Return user-friendly error: "Akun terkunci. Coba lagi dalam X menit."

❌ DO NOT: Allow login while locked_until > NOW
❌ DO NOT: Reveal that user exists (use generic "email or password wrong" message)
```

Source: AC-5.1 ("Setelah 5x gagal login dalam 30 menit, akun di-lockout sementara selama 15 menit")

#### Rule 5.5: Password Hash with bcrypt cost ≥ 10

```
✅ DO: const BCRYPT_COST = 12;
✅ DO: bcrypt.hash(password, BCRYPT_COST)

❌ DO NOT: Use SHA256, MD5, or plain-text
❌ DO NOT: Use bcrypt cost < 10
```

Source: AC-9.2 ("Password di-hash menggunakan bcrypt (cost factor ≥ 10)")

---

## 🎯 BEHAVIORAL RULES FOR CLAUDE

### When Claude Asks: "Should I add [feature] X?"

**Response Protocol:**

1. **Check this document first** → Is X in Scope column?
2. **If YES (in scope):** "Yes, it's in [AC section], proceed with implementation per SRS [section]"
3. **If NO (out of scope):** "No, PRD 3.2 explicitly excludes this. Focus on [in-scope features instead]"
4. **If UNCLEAR:** "It's not in PRD/SRS/AC. Propose it to product owner, don't guess."

**Example:**

- Claude: "Should I add a feature to upload property photos?"
- Response: "No. AC-1.2 states 'TIDAK ada fitur upload gambar.' Focus on tabular data instead."

### When Claude Suggests Tech Change

**Response Protocol:**

1. Check CLAUDE.md Gate 2 (Technology Stack)
2. Ask: "Is [suggested tech] mentioned in PRD section 1 line 8?"
3. If NO: "Use recommended stack (Next.js + Tailwind + Supabase). If you believe [tech] is better, document why and propose to team."
4. If YES: "Confirmed in recommendations. Proceed."

**Example:**

- Claude: "Let's use Prisma ORM for type-safe database queries"
- Response: "Prisma isn't mentioned in PRD recommendations. SRS recommends parameterized queries. Use Supabase client directly with typed queries. If Prisma helps, you can add it, but verify it doesn't conflict."

### When Claude Invents Data Fields

**Response Protocol:**

1. Ask: "Is [field] in AC-6.1 property schema?"
2. If NO: "Don't add it. Schema is locked. If needed, propose to product owner."
3. If YES: "Confirmed. Include it in database design."

**Example:**

- Claude: "I'll add an `seo_title` and `seo_description` field to properties"
- Response: "These aren't in AC-6.1 schema. Out of scope. Remove them."

### When Claude Ignores Security Requirement

**Response Protocol:**

1. Reference CLAUDE.md Gate 5 (Auth & Security Rules)
2. Ask: "Does this meet [requirement X] from AC/SRS/AGENTS.md?"
3. If NO: "Add/fix it. Reference [document section]."

**Example:**

- Claude writes login handler without lockout logic
- Response: "Missing Rule 5.4 (lockout after 5 failures). Add it per AC-5.1."

### When Claude Doesn't Match Design Tokens

**Response Protocol:**

1. Check CLAUDE.md Gate 3 (Design System)
2. Ask: "Is this color in get-design.md color palette?"
3. If NO: "Use official token instead. Reference get-design.md line [N]."

**Example:**

- Claude: "Let's use `#3498DB` (blue) for the CTA button"
- Response: "No. CTA must be Accent Gold (#C9A961) per get-design.md. Update it."

---

## 📊 HARD CONSTRAINTS (Cannot Be Changed Without Approval)

### Performance Constraints (AC-9.1, SRS PERF)

| Metric                 | Target               | Penalty                 |
| ---------------------- | -------------------- | ----------------------- |
| Landing page FCP       | < 1.5s on 4G         | Cannot submit if ≥1.5s  |
| Filter/search response | < 500ms (1000 props) | Cannot submit if ≥500ms |
| Lighthouse score       | ≥85                  | Cannot submit if <85    |

**If Claude says "performance optimization isn't critical":** YES IT IS. Non-negotiable per acceptance criteria.

### Security Constraints (AC-9.2, SRS SEC)

| Requirement                                  | Penalty for Violation |
| -------------------------------------------- | --------------------- |
| Admin cannot mutate (403 test)               | FAIL submission       |
| CSRF on all mutations                        | FAIL submission       |
| Rate limit (100 req/min global, 10/min auth) | FAIL submission       |
| Password bcrypt cost ≥10                     | FAIL submission       |
| Input validation (Zod)                       | FAIL submission       |
| HTTPS-only production                        | FAIL submission       |

**If Claude says "let's skip CSRF for now":** NO. It's required. AGENTS.md 6.3 has the implementation.

### Responsive Constraints (AC-9.4)

| Breakpoint      | Testing Requirement |
| --------------- | ------------------- |
| Mobile ≤640px   | Must test and pass  |
| Tablet ≤1024px  | Must test and pass  |
| Desktop ≥1024px | Must test and pass  |

**If Claude says "we'll test responsive later":** NO. Must be verified before submission (TC in SRS 12.2).

---

## ✅ FEATURE CHECKLIST (Verify Implementation)

### Public Website Features

```
☐ Landing Page
  ☐ Hero section with logo, tagline, CTA (black bg + gold button)
  ☐ Featured properties section (max 6, read-only)
  ☐ Value proposition section (3-4 items with icons)
  ☐ Footer with logo, contact, links
  ☐ Sticky header on all pages

☐ About Us Page
  ☐ Profile, visions, mission in Indonesian
  ☐ 2-column layout (desktop), single (mobile)

☐ Contact Us Page
  ☐ Contact info (address, phone, email, WhatsApp link)
  ☐ Optional: Google Maps embed
  ☐ Contact form (Name, Email, Phone, Message)
  ☐ Form validation (all required, email valid, phone min 10 digit)
  ☐ Rate limit: 3 submit/IP/hour
  ☐ Success toast: "Pesan terkirim, tim kami akan menghubungi Anda."
  ☐ Email notification to admin
```

### Authentication & Authorization

```
☐ Login Page (/agent/login)
  ☐ Email + Password fields
  ☐ Validation (email format, password min 6)
  ☐ Failed attempt counter (max 5 in 30 min)
  ☐ Lockout message if locked

☐ Session Management
  ☐ Cookie-based (httpOnly, Secure, SameSite=Lax, 30d)
  ☐ No JWT tokens
  ☐ Logout clears cookie

☐ Authorization
  ☐ Admin: Can only view, filter, search (no edit/delete UI)
  ☐ Superadmin: Can CRUD, manage admins, view audit logs
  ☐ Backend check on all mutations (403 if admin attempts CRUD)
```

### Property Dashboard

```
☐ Property Listing
  ☐ Table with columns: Nama, Group, Lebar×Panjang, Hadap, Tipe, Tingkat, Harga, Carport, Status, Siap, Kawasan
  ☐ Pagination (25/50/100 default 50)
  ☐ Sorting by: nama, harga, tanggal dibuat, status
  ☐ Status badges: In Stock (green), Sold Out (red), Siap Huni (yellow), Siap Kosong (purple)

☐ Search & Filter
  ☐ Search bar (nama_property, group, kawasan)
  ☐ Filter: kawasan, lebar min, hadap, harga max, tipe, status, siap, carport
  ☐ Real-time debounce 300ms
  ☐ Active filter chips (removable)
  ☐ Reset button
  ☐ URL query params (shareable)

☐ Detail View
  ☐ Display all property fields
  ☐ Google Maps button (if maps_link exists)
  ☐ For superadmin: Edit & Delete buttons
  ☐ For admin: No Edit/Delete buttons
```

### Superadmin Features

```
☐ Create Property
  ☐ Form with all fields (AC-6.1)
  ☐ Validation per AC-8.4 (nama min 3-100 chars, lebar > 0, price > 0, etc)
  ☐ Success toast + redirect + highlight new entry
  ☐ Optional: "Save & Add Another" button

☐ Update Property
  ☐ Pre-filled form
  ☐ Dirty state indicator
  ☐ Cancel button (no save)
  ☐ Audit log records changes

☐ Delete Property
  ☐ Modal confirmation: "Yakin hapus properti [nama]? Tindakan ini tidak dapat dibatalkan."
  ☐ Soft delete (set deleted_at)
  ☐ Deleted properties don't appear in listing
  ☐ Audit log records deletion

☐ Admin Management
  ☐ List of admins with status
  ☐ Create new admin
  ☐ Disable/enable admin (is_active toggle)
  ☐ Reset password for admin

☐ Audit Logs
  ☐ Table with: who, when, entity type, action, what changed
  ☐ Filterable by date, entity type, action, user
  ☐ Accessible to superadmin only
```

**Before submission, verify ALL checkboxes are checked and tested.**

---

## 🔍 VERIFICATION QUESTIONS BEFORE IMPLEMENTATION

Ask Claude these questions before accepting code:

1. **"Is this feature mentioned in PRD or SRS?"**
   - If NO → Don't implement
   - If YES → Proceed with SRS spec

2. **"Does this use the recommended tech stack?"**
   - Framework: Next.js? ✅ Yes/❌ No
   - Database: Supabase? ✅ Yes/❌ No
   - Styling: Tailwind? ✅ Yes/❌ No
   - Auth: httpOnly cookie? ✅ Yes/❌ No
   - Validation: Zod? ✅ Yes/❌ No

3. **"Does this match the design system (get-design.md)?"**
   - Colors: Only from palette? ✅ Yes/❌ No
   - Typography: Inter/Geist? ✅ Yes/❌ No
   - Responsive breakpoints: 640/1024? ✅ Yes/❌ No

4. **"Does this meet all security requirements?"**
   - Backend authorization check? ✅ Yes/❌ No
   - Password bcrypt cost ≥10? ✅ Yes/❌ No
   - CSRF protection? ✅ Yes/❌ No
   - Rate limiting? ✅ Yes/❌ No
   - Input validation with Zod? ✅ Yes/❌ No

5. **"Is the data schema matching AC-6.1?"**
   - All property fields present? ✅ Yes/❌ No
   - No extra fields added? ✅ Yes/❌ No
   - Price as BIGINT? ✅ Yes/❌ No
   - Soft delete field (deleted_at)? ✅ Yes/❌ No

6. **"Does this code follow AGENTS.md standards?"**
   - TypeScript strict? ✅ Yes/❌ No
   - Functions have return types? ✅ Yes/❌ No
   - Error handling proper? ✅ Yes/❌ No
   - Comments explain WHY? ✅ Yes/❌ No

---

## 📝 REFERENCE QUICK LINKS

| Document          | When to Use                                                  | Key Sections                                                       |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------------ |
| **PRD.md**        | Product decisions, feature scope, business goals             | 2. Tujuan Produk, 3. Scope, 5. User Stories, 6. Functional Req     |
| **SRS.md**        | Technical specifications, system design, API specs           | 3. System Architecture, 5. Data Requirements, 6. API Specification |
| **AC (PDF)**      | Acceptance criteria, design system, final definition of done | All sections (must match exactly)                                  |
| **get-design.md** | Colors, typography, components, responsive rules             | colors, typography, components sections                            |
| **AGENTS.md**     | Code standards, security implementation, architecture        | 5. Code Standards, 6. Security, 3. Project Structure               |
| **CLAUDE.md**     | This file! Guardrails and hallucination prevention           | All sections                                                       |

**If Claude generates something that contradicts these docs,** reference the specific document and ask for verification.

---

## 🚫 COMMON HALLUCINATIONS TO WATCH FOR

| Hallucination         | What Claude Might Say                                        | Correction                                                                                                     |
| --------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Image upload**      | "Let's add image upload for properties"                      | ❌ "No. AC-1.2 explicitly excludes image upload. Focus on tabular data."                                       |
| **Public listing**    | "Let's create a public properties listing page with filters" | ❌ "No. Only landing page shows 6 featured (read-only). Full listing is internal-only for Admin/Superadmin."   |
| **Map search**        | "Let's add map-based property search"                        | ❌ "No. PRD 3.2 excludes map-based search. Google Maps link only for detail view."                             |
| **Self-registration** | "Let's add agent signup page"                                | ❌ "No. AC-5.1 says no self-registration. Only Superadmin creates accounts."                                   |
| **JWT tokens**        | "Let's use JWT for authentication"                           | ❌ "No. AC-5.1 requires httpOnly cookie, not JWT. See AGENTS.md 6.1.2."                                        |
| **Blue colors**       | "Let's use blue (#3498DB) for buttons"                       | ❌ "No. CTA buttons must be Accent Gold (#C9A961). See get-design.md."                                         |
| **Float prices**      | "Let's store prices as decimal(10,2)"                        | ❌ "No. AC-6.1 requires BIGINT rupiah (no decimals). See AGENTS.md 5.4.1."                                     |
| **Admin CRUD UI**     | "Let's show Edit/Delete buttons for admin users"             | ❌ "No. AC-5.2 says Admin cannot mutate. UI hides buttons, but backend must enforce 403. See AGENTS.md 6.2.2." |
| **No rate limit**     | "Rate limiting isn't critical, let's skip it"                | ❌ "No. AC-9.2 requires rate limiting (100/min global, 10/min auth, 3/hour contact). Non-negotiable."          |
| **Optional security** | "Let's defer CSRF protection to Phase 2"                     | ❌ "No. AC-9.2 requires CSRF protection on all mutations. See AGENTS.md 6.3."                                  |

**If Claude suggests any of these, reference CLAUDE.md and correct it immediately.**

---

## 🎬 WORKFLOW: Using CLAUDE.md in Development

### Scenario 1: Claude Offers Feature Suggestion

```
👨‍💻 Developer: "Claude, should we add a favorites feature for logged-in agents?"

🤖 Claude: "Sure! It would be useful to track favorite properties. We could..."

👨‍💻 Developer: "Wait, check CLAUDE.md Gate 1. Is favorites in PRD/SRS/AC?"

🤖 Claude: "Checking... No, favorites isn't mentioned in PRD 3.1 (In Scope) or 3.2 (Out of Scope)."

👨‍💻 Developer: "Correct. Don't implement it. Let's focus on confirmed features like filter/search."
```

### Scenario 2: Claude Suggests Different Tech

```
🤖 Claude: "I recommend using MongoDB for flexibility with dynamic property fields."

👨‍💻 Developer: "Check CLAUDE.md Gate 2. Is MongoDB in PRD recommendations?"

🤖 Claude: "No, PRD section 1 line 8 recommends 'Next.js + Tailwind CSS + Supabase'. MongoDB isn't mentioned."

👨‍💻 Developer: "Stick with Supabase. If we need flexibility, we can use JSONB columns, but keep PostgreSQL."
```

### Scenario 3: Claude Adds Unexpected Data Fields

```
🤖 Claude: "I've added `property_description` and `seo_keywords` fields to improve SEO."

👨‍💻 Developer: "Check AC-6.1 property schema. Are these fields in the locked schema?"

🤖 Claude: "No, they're not in AC-6.1. I hallucinated these assumptions."

👨‍💻 Developer: "Remove them. Schema is locked. Property listing is data-first, tabular, not SEO-optimized."
```

### Scenario 4: Claude Forgets Authorization Check

```
🤖 Claude: "Created POST /api/properties endpoint for creating properties."

👨‍💻 Developer: "Check AGENTS.md 6.2.2 — does it verify backend authorization?"

🤖 Claude: "Oh, I only hid the UI button for admin. Backend doesn't check role."

👨‍💻 Developer: "Fix it. Add requirePermission('property.create') middleware. Admin attempting CRUD must get 403."
```

---

## 📋 BEFORE DEPLOYMENT CHECKLIST

Use this checklist **with** CLAUDE.md to verify before going live:

### PRD Compliance

- [ ] All features from PRD 3.1 (In Scope) are implemented
- [ ] No features from PRD 3.2 (Out of Scope) are present
- [ ] All user stories (PRD 5) are satisfied

### SRS Compliance

- [ ] All data requirements (SRS 5.1) match implemented schema
- [ ] All API endpoints (SRS 7) exist and match specs
- [ ] All security requirements (SRS 8) are enforced

### AC Compliance

- [ ] All acceptance criteria (AC-1 to AC-10) are met
- [ ] Design system matches AC-1 (colors, typography, layout)
- [ ] RBAC matches AC-5.2 (Admin read-only, Superadmin full access)
- [ ] Property schema matches AC-6.1 (exact fields)
- [ ] Filter/search matches AC-7.2 (all filters, 300ms debounce)

### Design Compliance

- [ ] All colors match get-design.md palette
- [ ] All typography uses Inter/Geist
- [ ] Responsive breakpoints: 640/1024 tested
- [ ] Logo placement correct (header, footer, dashboard)

### Security Compliance

- [ ] Authentication: httpOnly cookie, no JWT
- [ ] Authorization: Backend check on all mutations, 403 for admin CRUD
- [ ] CSRF: Protection on all POST/PUT/PATCH/DELETE
- [ ] Rate limiting: 100 global, 10 auth, 3 contact form
- [ ] Passwords: bcrypt cost ≥10
- [ ] Input validation: Zod on all endpoints
- [ ] Soft delete: No hard deletes

### Performance Compliance

- [ ] Landing page FCP < 1.5s
- [ ] Filter/search < 500ms for 1000 properties
- [ ] Lighthouse ≥85

---

**End of CLAUDE.md**

This document is your guardrail. When in doubt, **check it first.**
