# SRS — Prime Property Web Platform & Internal Agent Portal

**Version:** 1.0  
**Product:** Prime Property Website + Internal Agent Portal  
**Language:** Bahasa Indonesia  
**Source of Truth:** Prime Property Acceptance Criteria v1.0, 24 Mei 2026  
**Recommended Stack:** Next.js + Tailwind CSS + Supabase

---

## 1. Introduction

## 1.1 Purpose

Dokumen Software Requirements Specification ini menjelaskan kebutuhan sistem Prime Property Web Platform & Internal Agent Portal secara teknis dan terstruktur. Dokumen ini menjadi acuan untuk implementasi, QA, deployment, dan verifikasi bounty.

## 1.2 Scope

Sistem terdiri dari:

1. Website publik:
   - Landing Page
   - About Us
   - Contact Us
2. Internal Agent Portal:
   - Login agent
   - Dashboard listing properti
   - Detail properti
   - CRUD properti khusus Superadmin
   - Admin management khusus Superadmin
   - Audit log khusus Superadmin
3. Supporting system:
   - Authentication
   - Authorization
   - Rate limiting
   - Email notification
   - Responsive UI
   - Data validation

## 1.3 Definitions

| Term | Definition |
|---|---|
| Admin | Role internal yang hanya dapat melihat, mencari, memfilter, dan melihat detail properti. |
| Superadmin | Role internal dengan akses penuh untuk CRUD properti dan mengelola akun admin. |
| Property Listing | Data properti Prime Property berbentuk field tabular tanpa upload gambar. |
| Audit Log | Catatan perubahan data yang menyimpan siapa, kapan, dan apa yang berubah. |
| Soft Delete | Penghapusan data dengan mengisi `deleted_at`, bukan menghapus permanen dari database. |
| FCP | First Contentful Paint. Target landing page < 1.5 detik di koneksi 4G. |

---

## 2. Overall Description

## 2.1 Product Perspective

Prime Property Web Platform adalah aplikasi web fullstack yang menyediakan interface publik dan portal internal. Sistem dapat dibangun sebagai monorepo Next.js dengan backend API route/server action dan Supabase sebagai database, authentication storage, dan optional edge functions.

## 2.2 Product Functions

Fungsi utama sistem:

1. Menampilkan halaman publik sesuai brand Prime Property.
2. Mengirim form kontak ke email admin.
3. Mengautentikasi user internal.
4. Menyimpan session aman di cookie.
5. Menerapkan role-based access control.
6. Menampilkan tabel properti dengan search, filter, sort, dan pagination.
7. Menampilkan detail properti.
8. Memungkinkan Superadmin membuat, mengubah, dan menghapus properti.
9. Memungkinkan Superadmin mengelola akun admin.
10. Mencatat audit log perubahan.

## 2.3 User Classes

| User Class | Description | Access |
|---|---|---|
| Public Visitor | Pengunjung website publik | Landing, About, Contact, submit contact form |
| Admin | Agent internal | View listing, filter/search, detail |
| Superadmin | Internal power user | Semua akses Admin + CRUD property + admin management + audit log |

## 2.4 Operating Environment

### Client

- Browser desktop modern: Chrome, Edge, Firefox, Safari versi 2 tahun terakhir.
- Browser mobile: Mobile Safari iOS 14+, Chrome Android.

### Server

- Node.js runtime sesuai versi Next.js yang digunakan.
- HTTPS production.
- Database PostgreSQL jika memakai Supabase.
- SMTP provider untuk email notification.

## 2.5 Design Constraints

1. UI wajib menggunakan Bahasa Indonesia.
2. Brand color wajib mengikuti Prime Property:
   - `#1A1A1A`
   - `#C9A961`
   - `#B33A3A`
   - `#FFFFFF`
   - `#F5F5F5`
3. Font modern sans-serif: Inter atau Geist.
4. Tidak ada upload gambar listing properti.
5. Listing berfokus pada data tabular compact.
6. Authorization wajib backend-side.

## 2.6 Assumptions and Dependencies

1. Data kontak perusahaan, alamat kantor, email admin, nomor telepon, WhatsApp, dan koordinat maps akan disediakan atau menggunakan placeholder yang mudah diganti melalui env/config.
2. Email provider tersedia untuk Contact Us notification.
3. Demo credential harus disediakan di README.
4. Minimal 50 dummy properties harus tersedia untuk verifikasi filter dan search.
5. Logo Prime Property tersedia sebagai asset.

---

## 3. System Architecture Recommendation

## 3.1 Recommended Stack

| Layer | Recommendation |
|---|---|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase PostgreSQL |
| Auth | Supabase Auth custom claims or custom session cookie |
| Validation | Zod |
| Forms | React Hook Form + Zod Resolver |
| Email | Resend, Nodemailer, or SMTP provider |
| Rate Limit | Upstash Redis, Supabase table counter, or middleware store |
| Deployment | Vercel / Netlify / Railway / Render |

## 3.2 High-Level Modules

```text
Public Web
├─ Landing Page
├─ About Page
├─ Contact Page
└─ Public Layout

Internal Portal
├─ Agent Login
├─ Dashboard Layout
├─ Property Listing
├─ Property Detail
├─ Property Create/Edit
├─ Admin Management
└─ Audit Logs

Backend/API
├─ Auth Service
├─ Property Service
├─ User Management Service
├─ Contact Service
├─ Audit Log Service
├─ Rate Limit Middleware
└─ Authorization Middleware
```

---

## 4. External Interface Requirements

## 4.1 User Interface Requirements

### UI-001 Public Header

Header publik harus sticky dan menampilkan logo serta navigasi sesuai acceptance criteria.

### UI-002 Internal Header

Header internal harus menampilkan:
- Logo.
- Nama user atau email.
- Role badge.
- Dropdown profil.
- Tombol logout.

### UI-003 Responsive Breakpoints

| Breakpoint | Width |
|---|---:|
| Mobile | ≤640px |
| Tablet | ≤1024px |
| Desktop | ≥1024px |

### UI-004 Form Error

Semua error validasi ditampilkan inline di bawah field dengan warna `#B33A3A`.

### UI-005 Toast

Sistem harus menyediakan toast untuk:
- Contact form sukses.
- Create property sukses.
- Update property sukses.
- Delete property sukses.
- Error umum.

## 4.2 Hardware Interface

Tidak ada hardware interface khusus.

## 4.3 Software Interface

### SI-001 Email Provider

Sistem harus dapat mengirim notifikasi email saat contact form sukses.

Input email:
- Nama
- Email
- Nomor HP
- Pesan
- Timestamp
- IP address

### SI-002 Google Maps

Embed Google Maps bersifat opsional jika koordinat tersedia. Link properti `maps_link` harus membuka Google Maps di tab baru.

## 4.4 Communication Interface

1. Semua komunikasi production menggunakan HTTPS.
2. Internal mutation endpoint menggunakan CSRF protection.
3. Cookie session production menggunakan secure flag.

---

## 5. Data Requirements

## 5.1 Database Tables

### 5.1.1 users

```sql
CREATE TYPE user_role AS ENUM ('admin', 'superadmin');

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  failed_login_count INTEGER NOT NULL DEFAULT 0,
  failed_login_window_started_at TIMESTAMPTZ NULL,
  locked_until TIMESTAMPTZ NULL,
  last_login_at TIMESTAMPTZ NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.1.2 properties

```sql
CREATE TYPE property_type AS ENUM ('ruko', 'villa');
CREATE TYPE property_status AS ENUM ('in_stock', 'sold_out');
CREATE TYPE property_ready_status AS ENUM ('siap_huni', 'siap_kosong', 'siap_huni_renovasi');

CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_property VARCHAR(100) NOT NULL,
  "group" VARCHAR(100) NULL,
  lebar NUMERIC(10,2) NOT NULL,
  panjang NUMERIC(10,2) NOT NULL,
  hadap TEXT[] NOT NULL,
  tipe property_type NOT NULL,
  tingkat NUMERIC(4,1) NOT NULL,
  price BIGINT NOT NULL,
  carport BOOLEAN NOT NULL DEFAULT FALSE,
  status property_status NOT NULL DEFAULT 'in_stock',
  siap property_ready_status NOT NULL,
  maps_link TEXT NULL,
  kawasan TEXT[] NOT NULL,
  unit VARCHAR(100) NULL,
  is_highlight BOOLEAN NOT NULL DEFAULT FALSE,
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ NULL
);
```

### 5.1.3 contact_messages

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(64) NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.1.4 audit_logs

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_user_id UUID NULL REFERENCES users(id),
  actor_name VARCHAR(100) NULL,
  actor_email VARCHAR(255) NULL,
  actor_role VARCHAR(30) NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID NULL,
  action VARCHAR(50) NOT NULL,
  previous_values JSONB NULL,
  new_values JSONB NULL,
  ip_address VARCHAR(64) NULL,
  user_agent TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5.1.5 sessions

Jika tidak memakai Supabase Auth session, gunakan table session custom.

```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ NULL
);
```

## 5.2 Indexing Requirements

```sql
CREATE INDEX idx_properties_deleted_at ON properties(deleted_at);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_tipe ON properties(tipe);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_created_at ON properties(created_at);
CREATE INDEX idx_properties_nama_property ON properties(nama_property);
CREATE INDEX idx_properties_kawasan_gin ON properties USING GIN(kawasan);
CREATE INDEX idx_properties_hadap_gin ON properties USING GIN(hadap);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

---

## 6. Functional Requirements

## 6.1 Public Landing Page

### REQ-PUB-001 Hero

**Description:** Sistem harus menampilkan hero section di landing page.

**Inputs:** Tidak ada.  
**Processing:** Load static content dan brand assets.  
**Outputs:** Hero dengan tagline dan CTA primer.

**Acceptance Criteria:**
- Background `#1A1A1A`.
- Aksen emas `#C9A961`.
- CTA emas dengan teks hitam.
- Logo menonjol.

### REQ-PUB-002 Featured Properties

**Description:** Sistem harus menampilkan maksimal 6 properti unggulan.

**Rules:**
- Read-only.
- Tanpa filter.
- Maksimal 6.
- Prefer `is_highlight = true` dan `status = in_stock`.
- Jika kurang dari 6 highlight, sistem boleh mengambil property in stock terbaru.

### REQ-PUB-003 Value Proposition

Sistem harus menampilkan 3–4 value proposition dengan ikon, judul, dan deskripsi singkat.

### REQ-PUB-004 Footer

Footer menampilkan logo, kontak singkat, dan link About/Contact.

---

## 6.2 About Page

### REQ-ABOUT-001 Content

Halaman harus menampilkan profil, visi, misi, dan nilai perusahaan dalam Bahasa Indonesia.

### REQ-ABOUT-002 Layout

- Desktop: 2 kolom.
- Mobile: 1 kolom.
- Tanpa interaksi kompleks.

---

## 6.3 Contact Page

### REQ-CON-001 Contact Information

Halaman harus menampilkan alamat, telepon, email, WhatsApp, dan optional maps.

### REQ-CON-002 Contact Form

Field:
- Nama
- Email
- Nomor HP
- Pesan

### REQ-CON-003 Contact Validation

| Field | Rule |
|---|---|
| Nama | Required |
| Email | Required, valid email |
| Nomor HP | Required, min 10 digit |
| Pesan | Required |

### REQ-CON-004 Contact Submission

Saat valid:
1. Simpan ke `contact_messages`.
2. Kirim email ke admin Prime Property.
3. Tampilkan toast: `Pesan terkirim, tim kami akan menghubungi Anda.`

### REQ-CON-005 Rate Limit

Maksimum 3 submit per IP per jam.

Jika rate limit tercapai, kembalikan error:

```http
429 Too Many Requests
```

---

## 6.4 Authentication

### REQ-AUTH-001 Login Page

Route login internal:

```text
/agent/login
```

### REQ-AUTH-002 Login Fields

Jika memakai password login:
- Email
- Password

Jika memakai OTP:
- Email
- OTP 6 digit

Rekomendasi implementasi: Email + Password.

### REQ-AUTH-003 Login Validation

- Email required dan valid.
- Password required.
- Akun harus aktif.
- Akun tidak sedang lockout.

### REQ-AUTH-004 Login Lockout

Jika 5 gagal login dalam 30 menit:
- `locked_until = now + 15 minutes`.
- Login ditolak sampai lockout selesai.

### REQ-AUTH-005 Session Cookie

Cookie session:
- httpOnly.
- SameSite=Lax.
- Lifetime 30 hari.
- Secure di production.

### REQ-AUTH-006 Logout

Logout:
- Revoke/delete session.
- Clear cookie.
- Redirect ke `/agent/login`.

---

## 6.5 Authorization

### REQ-RBAC-001 Backend Middleware

Setiap internal endpoint harus melewati:
1. Authentication middleware.
2. Authorization middleware berdasarkan role.

### REQ-RBAC-002 Admin Permission

Admin hanya boleh:
- GET property list.
- GET property detail.
- GET filtered/search property list.

### REQ-RBAC-003 Admin Forbidden Mutation

Admin yang mengakses endpoint mutasi harus mendapat:

```http
403 Forbidden
```

Endpoint mutasi meliputi:
- Create property.
- Update property.
- Delete property.
- Create admin.
- Enable/disable admin.
- Reset password admin.
- View audit logs, jika audit logs dibatasi superadmin only.

### REQ-RBAC-004 Superadmin Permission

Superadmin dapat mengakses seluruh fitur internal.

---

## 6.6 Property Listing

### REQ-PROP-001 List Properties

Endpoint list harus mengembalikan properti non-deleted secara default.

Default order: terbaru atau nama ascending. Rekomendasi: nama ascending untuk inventory readability.

### REQ-PROP-002 Table Columns

Tabel wajib menampilkan kolom:
- Nama
- Group
- Lebar × Panjang
- Hadap
- Tipe
- Tingkat
- Harga
- Carport
- Status
- Siap
- Kawasan

### REQ-PROP-003 Pagination

Parameter:
- `page`
- `per_page` dengan nilai 25, 50, 100

Default `per_page = 50`.

### REQ-PROP-004 Sort

Parameter:
- `sort_by`: `nama_property`, `price`, `created_at`, `status`
- `sort_dir`: `asc`, `desc`

### REQ-PROP-005 Search

Parameter:
- `q`

Search mencakup:
- `nama_property`
- `group`
- `kawasan`

### REQ-PROP-006 Filters

Parameter filter:

| Parameter | Type | Description |
|---|---|---|
| `kawasan` | array/string csv | Multi-select kawasan |
| `lebar_min` | number | Lebar minimum |
| `hadap` | array/string csv | Multi-select hadap |
| `price_max` | integer | Harga maksimum |
| `tipe` | enum | `ruko`, `villa`, atau kosong untuk semua |
| `status` | enum | `in_stock`, `sold_out`, atau kosong untuk semua |
| `siap` | array/string csv | Multi-select siap |
| `carport` | boolean/string | `true`, `false`, atau kosong untuk semua |

### REQ-PROP-007 Debounce

Frontend menerapkan debounce 300ms sebelum request filter/search.

### REQ-PROP-008 URL Query Params

Semua filter, search, sort, dan pagination harus tersimpan di query params.

### REQ-PROP-009 Active Filter Chips

Frontend menampilkan chip filter aktif dan mendukung remove individual.

### REQ-PROP-010 Reset Filter

Tombol reset membersihkan semua query params filter ke default state.

---

## 6.7 Property Detail

### REQ-DETAIL-001 View Detail

User Admin dan Superadmin dapat melihat seluruh field properti.

### REQ-DETAIL-002 Maps Link

Jika `maps_link` ada, sistem menampilkan tombol `Buka di Google Maps` dan membuka link di tab baru.

### REQ-DETAIL-003 Action Visibility

- Superadmin melihat tombol Edit dan Hapus.
- Admin tidak melihat tombol Edit dan Hapus.

---

## 6.8 Property Create

### REQ-CREATE-001 Access

Hanya Superadmin dapat membuka dan submit create property.

### REQ-CREATE-002 Form Layout

- Desktop: grid 2 kolom.
- Mobile: 1 kolom.

### REQ-CREATE-003 Client and Server Validation

Validasi wajib dilakukan di client-side untuk feedback cepat dan server-side untuk keamanan.

### REQ-CREATE-004 Success Behavior

Setelah sukses:
- Tampilkan toast.
- Redirect ke listing.
- Highlight entry baru.

### REQ-CREATE-005 Optional Save and Add Again

Sistem boleh menyediakan tombol `Simpan & Tambah Lagi`.

---

## 6.9 Property Update

### REQ-UPD-001 Access

Hanya Superadmin dapat update property.

### REQ-UPD-002 Prefill

Form edit harus prefill data existing.

### REQ-UPD-003 Dirty State

Field yang berubah ditandai dengan dirty state indicator.

### REQ-UPD-004 Cancel

Tombol `Batal` kembali ke halaman detail tanpa menyimpan.

### REQ-UPD-005 Audit Log

Setiap update mencatat previous values dan new values di audit log.

---

## 6.10 Property Delete

### REQ-DEL-001 Access

Hanya Superadmin dapat delete property.

### REQ-DEL-002 Confirmation Modal

Modal konfirmasi wajib menampilkan teks:

```text
Yakin hapus properti [nama]? Tindakan ini tidak dapat dibatalkan.
```

### REQ-DEL-003 Soft Delete

Delete mengisi `deleted_at`, bukan hard delete.

### REQ-DEL-004 Visibility

Property yang terhapus tidak muncul di:
- Landing featured properties.
- Internal default listing.

### REQ-DEL-005 Audit Log

Delete dicatat di audit log.

---

## 6.11 Property Validation Rules

```ts
const propertyValidationRules = {
  nama_property: 'required|min:3|max:100',
  group: 'nullable|max:100',
  lebar: 'required|number|gt:0|maxDecimal:2',
  panjang: 'required|number|gt:0|maxDecimal:2',
  hadap: 'required|array|min:1|in:utara,selatan,timur,barat',
  tipe: 'required|in:ruko,villa',
  tingkat: 'required|number|min:1|max:10|maxDecimal:1',
  price: 'required|integer|gt:0',
  carport: 'required|boolean',
  status: 'required|in:in_stock,sold_out',
  siap: 'required|in:siap_huni,siap_kosong,siap_huni_renovasi',
  maps_link: 'nullable|url|contains:google.com/maps',
  kawasan: 'required|array|min:1',
  unit: 'nullable|max:100',
};
```

---

## 6.12 Admin Management

### REQ-ADM-001 List Admins

Superadmin dapat melihat daftar admin.

### REQ-ADM-002 Create Admin

Superadmin dapat membuat akun admin baru.

Required fields:
- Name
- Email
- Temporary password atau generated password
- Role default `admin`

### REQ-ADM-003 Enable/Disable Admin

Superadmin dapat mengubah `is_active` akun admin.

### REQ-ADM-004 Reset Password

Superadmin dapat reset password admin.

### REQ-ADM-005 Audit Log

Create admin, enable/disable, dan reset password dicatat di audit log.

---

## 6.13 Audit Log

### REQ-AUD-001 Access

Audit log hanya dapat diakses oleh Superadmin.

### REQ-AUD-002 Fields

Audit log menampilkan:
- Tanggal/waktu WIB.
- Actor.
- Role.
- Action.
- Entity.
- Ringkasan perubahan.

### REQ-AUD-003 Detail

Superadmin dapat membuka detail log untuk melihat previous values dan new values.

---

## 7. API Specification Recommendation

## 7.1 Auth

### POST `/api/agent/login`

Request:

```json
{
  "email": "superadmin@example.com",
  "password": "password"
}
```

Success:

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "Superadmin Demo",
    "email": "superadmin@example.com",
    "role": "superadmin"
  }
}
```

Errors:
- 400 invalid payload
- 401 invalid credential
- 423 account locked
- 429 auth rate limit

### POST `/api/agent/logout`

Success:

```json
{
  "success": true
}
```

---

## 7.2 Properties

### GET `/api/agent/properties`

Query:

```text
?page=1&per_page=50&q=aston&kawasan=Krakatau,Pancing&lebar_min=4&hadap=Utara,Timur&price_max=1500000000&tipe=ruko&status=in_stock&siap=siap_huni&carport=true&sort_by=price&sort_dir=asc
```

Response:

```json
{
  "data": [
    {
      "id": "uuid",
      "nama_property": "Aston Villas",
      "group": "Mentari",
      "lebar": 4.5,
      "panjang": 21.5,
      "hadap": ["Utara", "Timur"],
      "tipe": "ruko",
      "tingkat": 2,
      "price": 1350000000,
      "carport": true,
      "status": "in_stock",
      "siap": "siap_huni",
      "kawasan": ["Krakatau"]
    }
  ],
  "meta": {
    "page": 1,
    "per_page": 50,
    "total": 120,
    "total_pages": 3
  }
}
```

### GET `/api/agent/properties/:id`

Returns full property detail.

### POST `/api/agent/properties`

Access: Superadmin only.

### PATCH `/api/agent/properties/:id`

Access: Superadmin only.

### DELETE `/api/agent/properties/:id`

Access: Superadmin only. Performs soft delete.

---

## 7.3 Contact

### POST `/api/contact`

Request:

```json
{
  "name": "Budi",
  "email": "budi@example.com",
  "phone": "081234567890",
  "message": "Saya tertarik dengan properti Prime Property."
}
```

Success:

```json
{
  "success": true,
  "message": "Pesan terkirim, tim kami akan menghubungi Anda."
}
```

Errors:
- 400 validation error
- 429 rate limited
- 500 email/server error

---

## 7.4 Admin Management

### GET `/api/agent/admins`

Access: Superadmin only.

### POST `/api/agent/admins`

Access: Superadmin only.

### PATCH `/api/agent/admins/:id/status`

Access: Superadmin only.

### POST `/api/agent/admins/:id/reset-password`

Access: Superadmin only.

---

## 7.5 Audit Logs

### GET `/api/agent/audit-logs`

Access: Superadmin only.

Query:
- `page`
- `per_page`
- `entity_type`
- `action`
- `actor_user_id`
- `date_from`
- `date_to`

---

## 8. Security Requirements

### SEC-001 Authentication Middleware

Semua route `/agent/*` kecuali `/agent/login` wajib dilindungi auth middleware.

### SEC-002 Authorization Middleware

Semua endpoint mutasi wajib mengecek role Superadmin di backend.

### SEC-003 CSRF

Semua mutasi wajib menggunakan CSRF protection.

### SEC-004 Rate Limit

| Endpoint | Limit |
|---|---:|
| Global | 100 request/menit/IP |
| Auth | 10 request/menit/IP |
| Contact form | 3 submit/IP/jam |

### SEC-005 Password Hash

Password di-hash bcrypt cost factor ≥ 10.

### SEC-006 Secure Cookies

Production cookie:
- httpOnly
- Secure
- SameSite=Lax
- Expires 30 hari

### SEC-007 Input Sanitization

- Escape output HTML.
- Sanitize rich input jika ada.
- Gunakan ORM/query binding.
- Validasi semua payload server-side.

### SEC-008 403 Test Case

Sistem harus lolos test bahwa Admin tidak dapat melakukan direct request:

```http
POST /api/agent/properties
PATCH /api/agent/properties/:id
DELETE /api/agent/properties/:id
```

Expected response:

```http
403 Forbidden
```

---

## 9. Performance Requirements

### PERF-001 Landing Page FCP

FCP landing page < 1.5s di koneksi 4G.

### PERF-002 Filter Search

Filter dan search response < 500ms untuk dataset hingga 1000 properti.

### PERF-003 Lighthouse

Landing page harus memiliki Lighthouse Performance Score ≥ 85.

### PERF-004 Optimization

Rekomendasi:
- Server-side pagination.
- Database indexes untuk filter/search.
- Debounce 300ms.
- Avoid heavy client bundle.
- Static rendering untuk halaman publik jika memungkinkan.
- Cache featured properties jika tidak sering berubah.

---

## 10. Localization Requirements

### LOC-001 Language

Seluruh UI Bahasa Indonesia.

### LOC-002 Currency Format

Format rupiah:

```text
Rp 1.350.000.000
```

### LOC-003 Date Format

Format tanggal:

```text
24 Mei 2026
```

atau

```text
24/05/2026
```

### LOC-004 Timezone

Semua timestamp display menggunakan Asia/Jakarta/WIB.

---

## 11. Browser Compatibility

| Browser | Supported |
|---|---|
| Chrome | 2 tahun terakhir |
| Edge | 2 tahun terakhir |
| Firefox | 2 tahun terakhir |
| Safari | 2 tahun terakhir |
| Mobile Safari | iOS 14+ |
| Chrome Android | Supported |

---

## 12. Testing Requirements

## 12.1 Functional Test Cases

| ID | Scenario | Expected |
|---|---|---|
| TC-001 | Visitor membuka landing page | Hero, CTA, featured properties, value proposition, footer tampil |
| TC-002 | Visitor submit form kontak valid | Email terkirim, data tersimpan, toast sukses tampil |
| TC-003 | Visitor submit form kontak invalid | Inline error tampil |
| TC-004 | Submit form kontak >3 kali/IP/jam | Response 429 |
| TC-005 | Agent login valid | Redirect ke dashboard |
| TC-006 | Login gagal 5 kali dalam 30 menit | Akun lockout 15 menit |
| TC-007 | Admin membuka listing | Tabel tampil |
| TC-008 | Admin melakukan filter/search | Data terfilter, query params berubah |
| TC-009 | Admin buka detail | Detail tampil tanpa tombol Edit/Hapus |
| TC-010 | Admin POST create property via API | 403 Forbidden |
| TC-011 | Superadmin membuka listing | Tabel tampil dengan tombol Tambah Properti |
| TC-012 | Superadmin create property valid | Data tersimpan, redirect, toast, highlight |
| TC-013 | Superadmin update property | Data berubah dan audit log tercatat |
| TC-014 | Superadmin delete property | Modal muncul, soft delete berhasil |
| TC-015 | Deleted property di default listing | Tidak tampil |
| TC-016 | Superadmin create admin | Admin baru dibuat |
| TC-017 | Superadmin disable admin | Admin tidak bisa login |
| TC-018 | Superadmin reset password admin | Password berubah |
| TC-019 | Superadmin lihat audit log | Audit log tampil |

## 12.2 Responsive Test Cases

| ID | Viewport | Expected |
|---|---|---|
| RT-001 | ≤640px | Public pages single column, table usable horizontally/stacked |
| RT-002 | ≤1024px | Layout tablet rapi, filter tetap dapat digunakan |
| RT-003 | ≥1024px | Full desktop layout aktif |

## 12.3 Performance Test Cases

| ID | Scenario | Expected |
|---|---|---|
| PT-001 | Lighthouse landing page | Score ≥ 85 |
| PT-002 | Search 1000 properties | Response < 500ms |
| PT-003 | Filter combined 1000 properties | Response < 500ms |

## 12.4 Security Test Cases

| ID | Scenario | Expected |
|---|---|---|
| ST-001 | Access `/agent/properties` tanpa session | Redirect/login required |
| ST-002 | Admin direct API create property | 403 |
| ST-003 | Admin direct API update property | 403 |
| ST-004 | Admin direct API delete property | 403 |
| ST-005 | CSRF missing on mutation | Request rejected |
| ST-006 | XSS payload di form contact | Payload escaped/sanitized |
| ST-007 | SQL injection di search query | Tidak memengaruhi query/database |

---

## 13. Acceptance Traceability Matrix

| Acceptance Criteria | Covered By |
|---|---|
| AC-1.1 Color Palette | REQ-PUB-001, UI requirements, get-design.md |
| AC-1.2 Layout Principles | UI-003, responsive requirements |
| AC-2.1 Hero Section | REQ-PUB-001 |
| AC-2.2 Section Konten | REQ-PUB-002, REQ-PUB-003, REQ-PUB-004 |
| AC-2.3 Navigasi Header | UI-001 |
| AC-3.1 About Us | REQ-ABOUT-001, REQ-ABOUT-002 |
| AC-4.1 Contact Info | REQ-CON-001 |
| AC-4.2 Contact Form | REQ-CON-002 to REQ-CON-005 |
| AC-5.1 Login | REQ-AUTH-001 to REQ-AUTH-005 |
| AC-5.2 Role & Authorization | REQ-RBAC-001 to REQ-RBAC-004 |
| AC-5.3 Logout | REQ-AUTH-006 |
| AC-6.1 Property Schema | Data Requirements, REQ-PROP |
| AC-7.1 Table Listing | REQ-PROP-001 to REQ-PROP-004 |
| AC-7.2 Filter & Search | REQ-PROP-005 to REQ-PROP-010 |
| AC-7.3 Detail Properti | REQ-DETAIL-001 to REQ-DETAIL-003 |
| AC-8.1 Create | REQ-CREATE |
| AC-8.2 Update | REQ-UPD |
| AC-8.3 Delete | REQ-DEL |
| AC-8.4 Validasi | Property Validation Rules |
| AC-9.1 Performance | Performance Requirements |
| AC-9.2 Security | Security Requirements |
| AC-9.3 Bahasa & Lokalisasi | Localization Requirements |
| AC-9.4 Browser Support | Browser Compatibility |
| AC-10.1 Definition of Done | Test requirements and final DoD |

---

## 14. Deployment Requirements

Submission wajib menyediakan:

1. Live URL working deploy.
2. README dengan:
   - Cara setup local.
   - Environment variables.
   - Demo credential Admin.
   - Demo credential Superadmin.
   - Cara menjalankan seed dummy data.
   - Penjelasan singkat fitur Superadmin.
3. Public GitHub repo saat dipilih sebagai winner.

---

## 15. Definition of Done

Sistem dianggap selesai jika:

1. Semua acceptance criteria terpenuhi.
2. Tidak ada bug High/Critical terbuka.
3. UI sesuai brand guidelines.
4. Responsive mobile, tablet, desktop.
5. Backend authorization terverifikasi.
6. Admin tidak dapat CRUD.
7. Search dan filter berjalan dengan minimal 50 dummy data.
8. Dokumentasi Superadmin tersedia.
9. Live URL dan demo credentials tersedia.

