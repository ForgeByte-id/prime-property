# PRD — Prime Property Web Platform & Internal Agent Portal

**Version:** 1.0  
**Product:** Prime Property Website + Internal Agent Portal  
**Language:** Bahasa Indonesia  
**Source of Truth:** Prime Property Acceptance Criteria v1.0, 24 Mei 2026  
**Deadline Bounty:** 15 Juni 2026, 23:59 WIB  
**Recommended Stack:** Next.js + Tailwind CSS + Supabase

---

## 1. Ringkasan Produk

Prime Property membutuhkan platform web yang terdiri dari halaman publik untuk branding dan akuisisi leads, serta portal internal agent untuk mengelola dan melihat listing properti. Produk ini harus menampilkan identitas brand Prime Property secara konsisten, menyediakan pengalaman pencarian properti yang cepat, dan memiliki role-based access yang ketat untuk membedakan akses Admin dan Superadmin.

Platform tidak berfokus pada galeri gambar properti. Sesuai acceptance criteria, listing properti dikelola dalam bentuk data tabular yang ringkas, informatif, cepat dibaca, dan mudah difilter.

---

## 2. Tujuan Produk

### 2.1 Tujuan Bisnis

1. Membangun website resmi Prime Property yang profesional, responsif, dan sesuai brand.
2. Menyediakan kanal publik untuk memperkenalkan perusahaan, menampilkan properti unggulan, dan menerima pesan calon customer.
3. Menyediakan portal internal untuk tim agent dalam melihat, mencari, dan memfilter listing properti.
4. Memberikan akses penuh kepada Superadmin untuk mengelola data properti dan akun admin.
5. Menjamin keamanan data melalui authentication, authorization backend, session cookie aman, CSRF protection, dan audit log.

### 2.2 Tujuan Pengguna

1. Visitor publik dapat memahami profil Prime Property dan menghubungi tim dengan mudah.
2. Admin internal dapat mencari listing properti secara cepat tanpa akses mutasi data.
3. Superadmin dapat melakukan CRUD properti, membuat akun admin, mengaktifkan atau menonaktifkan admin, reset password, dan melihat audit log.
4. Tim operasional dapat mengelola inventory properti berbasis data dengan format rupiah dan status yang jelas.

---

## 3. Scope Produk

### 3.1 In Scope

1. Branding dan design system Prime Property.
2. Halaman publik:
   - Landing Page
   - About Us
   - Contact Us
3. Header publik sticky dengan menu:
   - Logo
   - Beranda
   - Tentang Kami
   - Kontak
   - Login Agent
4. Form kontak dengan email notification dan anti-spam rate limit.
5. Login agent internal di `/agent/login`.
6. Session berbasis httpOnly cookie, SameSite=Lax, lifetime 30 hari.
7. Role Admin dan Superadmin.
8. Dashboard internal listing properti.
9. Filter, search, sort, pagination, active filter chips, reset filter, dan URL query params.
10. Detail properti.
11. CRUD properti hanya untuk Superadmin.
12. Soft delete properti.
13. Audit log untuk perubahan properti.
14. Manajemen akun admin oleh Superadmin.
15. Seed minimal 50 properti dummy untuk testing.
16. Dokumentasi singkat penggunaan untuk Superadmin.
17. README berisi live URL dan demo credential 1 admin + 1 superadmin.

### 3.2 Out of Scope

1. Upload gambar listing properti.
2. Self-registration agent.
3. Payment, booking, reservation, atau transaksi properti.
4. Public listing page dengan filter lengkap, kecuali properti unggulan maksimal 6 item di landing page.
5. Map-based search.
6. Multi-language UI. Seluruh UI wajib Bahasa Indonesia.
7. Arsip dan restore soft-deleted property bersifat opsional Phase 2.

---

## 4. User Personas

### 4.1 Public Visitor / Calon Customer

Calon pembeli atau penyewa yang mengunjungi website Prime Property untuk mengetahui profil perusahaan, melihat properti unggulan, dan menghubungi tim melalui form atau WhatsApp.

**Kebutuhan utama:**
- Melihat brand yang terpercaya.
- Mendapat informasi kontak dengan cepat.
- Mengirim pesan tanpa hambatan.

### 4.2 Admin / Agent Internal

User internal yang bertugas mencari dan melihat data properti untuk kebutuhan operasional atau follow-up customer.

**Kebutuhan utama:**
- Login aman.
- Melihat listing properti dalam tabel compact.
- Search dan filter cepat.
- Melihat detail properti.
- Tidak dapat mengubah data.

### 4.3 Superadmin

User internal dengan akses tertinggi untuk mengelola data properti dan akun admin.

**Kebutuhan utama:**
- Semua kemampuan Admin.
- Create, update, delete properti.
- Membuat dan mengelola akun admin.
- Melihat audit log perubahan.
- Memastikan data tetap valid dan rapi.

---

## 5. User Stories

### 5.1 Public Website

| ID | User Story | Priority |
|---|---|---|
| US-PUB-001 | Sebagai visitor, saya ingin melihat landing page Prime Property agar memahami brand dan layanan perusahaan. | Must Have |
| US-PUB-002 | Sebagai visitor, saya ingin melihat maksimal 6 properti unggulan agar mendapat gambaran inventory pilihan. | Must Have |
| US-PUB-003 | Sebagai visitor, saya ingin membaca value proposition Prime Property agar memahami alasan memilih perusahaan ini. | Must Have |
| US-PUB-004 | Sebagai visitor, saya ingin membuka halaman About Us agar mengetahui profil, visi, misi, dan nilai perusahaan. | Must Have |
| US-PUB-005 | Sebagai visitor, saya ingin membuka halaman Contact Us agar dapat melihat alamat, nomor telepon, email, WhatsApp, dan maps. | Must Have |
| US-PUB-006 | Sebagai visitor, saya ingin mengirim form kontak agar tim Prime Property dapat menghubungi saya. | Must Have |

### 5.2 Authentication & Authorization

| ID | User Story | Priority |
|---|---|---|
| US-AUTH-001 | Sebagai agent internal, saya ingin login melalui `/agent/login` agar dapat mengakses dashboard. | Must Have |
| US-AUTH-002 | Sebagai sistem, saya ingin melakukan lockout setelah 5 gagal login dalam 30 menit agar mengurangi brute force. | Must Have |
| US-AUTH-003 | Sebagai user internal, saya ingin logout dari dashboard agar session saya berakhir. | Must Have |
| US-AUTH-004 | Sebagai Admin, saya tidak boleh dapat membuat, mengubah, atau menghapus properti. | Must Have |
| US-AUTH-005 | Sebagai sistem, saya harus menolak request mutasi Admin dengan 403 Forbidden meskipun UI dimanipulasi. | Must Have |

### 5.3 Dashboard Listing

| ID | User Story | Priority |
|---|---|---|
| US-DASH-001 | Sebagai Admin/Superadmin, saya ingin melihat tabel listing properti agar dapat membaca inventory dengan cepat. | Must Have |
| US-DASH-002 | Sebagai Admin/Superadmin, saya ingin melakukan search berdasarkan nama_property, group, dan kawasan. | Must Have |
| US-DASH-003 | Sebagai Admin/Superadmin, saya ingin memfilter berdasarkan kawasan, lebar min, hadap, harga max, tipe, status, siap, dan carport. | Must Have |
| US-DASH-004 | Sebagai Admin/Superadmin, saya ingin filter tersimpan di URL query params agar link dapat dibagikan. | Must Have |
| US-DASH-005 | Sebagai Admin/Superadmin, saya ingin membuka detail properti dari klik baris tabel. | Must Have |

### 5.4 Property Management

| ID | User Story | Priority |
|---|---|---|
| US-CRUD-001 | Sebagai Superadmin, saya ingin menambah properti baru dengan semua field wajib agar inventory bertambah. | Must Have |
| US-CRUD-002 | Sebagai Superadmin, saya ingin mengedit data properti agar informasi tetap akurat. | Must Have |
| US-CRUD-003 | Sebagai Superadmin, saya ingin melihat dirty state saat mengedit agar tahu field yang berubah. | Should Have |
| US-CRUD-004 | Sebagai Superadmin, saya ingin menghapus properti dengan modal konfirmasi agar mencegah kesalahan. | Must Have |
| US-CRUD-005 | Sebagai sistem, saya ingin soft delete properti agar data tidak hilang permanen. | Must Have |
| US-CRUD-006 | Sebagai Superadmin, saya ingin melihat audit log agar semua perubahan dapat ditelusuri. | Must Have |
| US-CRUD-007 | Sebagai Superadmin, saya ingin tombol Simpan & Tambah Lagi agar input data berurutan lebih cepat. | Could Have |

### 5.5 Admin Management

| ID | User Story | Priority |
|---|---|---|
| US-ADM-001 | Sebagai Superadmin, saya ingin membuat akun admin baru agar tim internal dapat mengakses dashboard. | Must Have |
| US-ADM-002 | Sebagai Superadmin, saya ingin disable/enable akun admin agar akses dapat dikontrol. | Must Have |
| US-ADM-003 | Sebagai Superadmin, saya ingin reset password admin agar membantu admin yang lupa akses. | Must Have |

---

## 6. Functional Requirements

## 6.1 Branding & Design System

### FR-BR-001 Color Palette

Sistem wajib menggunakan palette berikut secara konsisten:

| Token | Hex | Penggunaan |
|---|---:|---|
| Primary Black | `#1A1A1A` | Header, teks utama, background hero |
| Accent Gold | `#C9A961` | CTA, highlight, badge |
| Accent Red | `#B33A3A` | Status urgent, hover, error |
| Neutral White | `#FFFFFF` | Background utama |
| Soft Gray | `#F5F5F5` | Card dan background sekunder |

### FR-BR-002 Logo

Logo Prime Property wajib tampil pada:
- Header semua halaman publik.
- Header dashboard internal.
- Footer halaman publik.
- Login page agent.

### FR-BR-003 Typography

- Font utama: Inter atau Geist.
- Heading menggunakan font-weight bold atau semibold.
- Body menggunakan font-weight regular.
- Semua teks UI menggunakan Bahasa Indonesia.

### FR-BR-004 Layout

- Desain compact, clear, dan mobile-responsive.
- Breakpoint:
  - Mobile: ≤640px
  - Tablet: ≤1024px
  - Desktop: ≥1024px
- Spacing mengikuti grid 4 / 8 / 16 / 24 / 32 px.
- Tidak ada fitur upload gambar untuk listing properti.

---

## 6.2 Landing Page

### FR-LP-001 Hero Section

Landing page harus memiliki hero section dengan:
- Logo Prime Property terlihat jelas.
- Background hitam `#1A1A1A`.
- Aksen emas `#C9A961`.
- Tagline Prime Property.
- 1 CTA primer, contoh: `Lihat Properti` atau `Hubungi Kami`.
- Tombol CTA warna emas dengan teks hitam.

### FR-LP-002 Properti Unggulan

Landing page harus menampilkan properti unggulan:
- Maksimum 6 properti.
- Read-only.
- Tanpa filter.
- Data berasal dari property yang statusnya `in_stock` dan ditandai sebagai highlight, atau fallback dari 6 property terbaru jika field highlight tidak digunakan.

### FR-LP-003 Mengapa Prime Property

Landing page harus menampilkan 3–4 value proposition:
- Ikon.
- Judul singkat.
- Deskripsi singkat.

Contoh value proposition:
- Inventory terpercaya.
- Proses cepat dan transparan.
- Lokasi strategis.
- Tim agent profesional.

### FR-LP-004 Footer

Footer harus menampilkan:
- Logo.
- Kontak singkat: telepon/WhatsApp/email.
- Link ke About Us.
- Link ke Contact Us.

---

## 6.3 Public Header Navigation

### FR-NAV-001 Header Sticky

Header publik wajib sticky di seluruh halaman publik.

### FR-NAV-002 Urutan Menu

Urutan menu dari kiri ke kanan:

1. Logo
2. Beranda
3. Tentang Kami
4. Kontak
5. Tombol `Login Agent` di kanan

### FR-NAV-003 Login Agent Button

Tombol `Login Agent` menggunakan style outline emas.

Catatan: Acceptance criteria menyebut route login agent terpisah di `/agent/login` dan tidak ada link dari navigasi publik. Untuk menghindari konflik requirement, implementasi yang direkomendasikan adalah tombol Login Agent tetap tampil sesuai AC-2.3, tetapi desain dan route harus dikonfirmasi. Bila mengikuti AC-5.1 secara ketat, tombol Login Agent tidak ditampilkan pada public navigation dan hanya tersedia melalui URL langsung `/agent/login`.

---

## 6.4 About Us Page

### FR-ABOUT-001 Konten

Halaman About Us harus menampilkan:
- Profil Prime Property.
- Visi.
- Misi.
- Nilai perusahaan.
- Seluruh konten dalam Bahasa Indonesia.

### FR-ABOUT-002 Layout

- Desktop: 2 kolom, teks + visual atau quote.
- Mobile: single column.
- Tidak ada elemen interaktif kompleks selain navigasi standar.

---

## 6.5 Contact Us Page

### FR-CONTACT-001 Informasi Kontak

Halaman Contact Us harus menampilkan:
- Alamat kantor.
- Nomor telepon.
- Email.
- Link WhatsApp menggunakan format `wa.me/...`.
- Embed Google Maps lokasi kantor bersifat opsional jika koordinat tersedia.

### FR-CONTACT-002 Form Kontak

Form kontak berisi field:
- Nama.
- Email.
- Nomor HP.
- Pesan.

### FR-CONTACT-003 Validasi Form Kontak

- Semua field wajib diisi.
- Email harus format valid.
- Nomor HP minimum 10 digit.

### FR-CONTACT-004 Submit Form Kontak

Setelah submit:
- Sistem mengirim email notifikasi ke admin Prime Property.
- Jika sukses, tampil toast: `Pesan terkirim, tim kami akan menghubungi Anda.`

### FR-CONTACT-005 Anti-Spam

Rate limit form kontak:
- Maksimum 3 submit per IP per jam.

---

## 6.6 Authentication Internal Agent

### FR-AUTH-001 Login Route

Login agent internal menggunakan route:

```text
/agent/login
```

### FR-AUTH-002 Login Method

Login menggunakan salah satu pendekatan berikut:
- Email + Password; atau
- Email + OTP 6 digit.

Rekomendasi untuk bounty: gunakan Email + Password agar lebih cepat dan jelas untuk demo credential.

### FR-AUTH-003 No Self Registration

Tidak ada self-registration. Akun dibuat manual oleh Superadmin.

### FR-AUTH-004 Session

Session disimpan di cookie dengan konfigurasi:
- `httpOnly: true`
- `SameSite=Lax`
- Masa berlaku 30 hari
- `Secure: true` di production HTTPS

### FR-AUTH-005 Login Lockout

Jika user gagal login 5 kali dalam 30 menit:
- Akun dikunci sementara selama 15 menit.
- Sistem menampilkan pesan error yang aman tanpa membocorkan detail sensitif.

### FR-AUTH-006 Logout

Dashboard internal menyediakan tombol logout di dropdown profil.

Saat logout:
- Session cookie dihapus.
- User diarahkan ke `/agent/login`.

---

## 6.7 Role & Authorization

### FR-RBAC-001 Role

Sistem wajib memiliki 2 role:
- Admin
- Superadmin

### FR-RBAC-002 Permission Admin

Admin dapat:
- View listing properti.
- Filter dan search properti.
- Lihat detail properti.

Admin tidak dapat:
- Create properti.
- Update properti.
- Delete properti.
- Create akun admin.
- Disable/enable akun admin.
- Reset password admin.
- Lihat audit log, kecuali diputuskan read-only diperbolehkan.

### FR-RBAC-003 Permission Superadmin

Superadmin dapat:
- Full CRUD properti.
- Create akun admin baru.
- Disable/enable akun admin.
- Reset password admin.
- Akses semua fitur admin.
- Lihat audit log perubahan.

### FR-RBAC-004 Backend Authorization

Authorization wajib dicek di backend untuk setiap endpoint.

Frontend hanya menyembunyikan elemen UI, bukan gate utama.

Jika Admin mencoba akses endpoint mutasi, backend wajib mengembalikan:

```http
403 Forbidden
```

---

## 6.8 Property Listing Schema

### FR-PROP-001 Field Properti

Setiap listing properti memiliki field berikut:

| Field | Tipe Data | Wajib | Keterangan / Contoh |
|---|---|---:|---|
| `nama_property` | string | Ya | `Aston Villas`, `Banyan Tree (Blok A)` |
| `group` | string nullable | Tidak | `Mentari`, `Permai 123`, `Project Ville` |
| `lebar` | decimal meter | Ya | `4.5`, `6`, `4.25` |
| `panjang` | decimal meter | Ya | `21.5`, `11`, `17.8` |
| `hadap` | enum multi | Ya | Utara, Selatan, Timur, Barat, boleh kombinasi |
| `tipe` | enum | Ya | Ruko, Villa |
| `tingkat` | decimal | Ya | `1`, `2`, `2.5`, `3.5` |
| `price` | bigint rupiah | Ya | Disimpan integer, ditampilkan `Rp 1.350.000.000` |
| `carport` | boolean | Ya | Checkbox true/false |
| `status` | enum | Ya | `in_stock`, `sold_out` |
| `siap` | enum | Ya | `siap_huni`, `siap_kosong`, `siap_huni_renovasi` |
| `maps_link` | string URL nullable | Tidak | Link Google Maps lokasi properti |
| `kawasan` | string multi-tag | Ya | `Krakatau`, `Pancing`, `Cemara Asri/Kuala` |
| `unit` | string nullable | Tidak | `Ready Siap huni`, `Gate siap`, `Lapangan`, `Rucon` |
| `created_at` | timestamp | Ya | Auto-generate saat create |
| `updated_at` | timestamp | Ya | Auto-update saat perubahan |
| `created_by` | FK User | Ya | Superadmin yang membuat entry |
| `deleted_at` | timestamp nullable | Tidak | Untuk soft delete |

### FR-PROP-002 Format Harga

Semua field harga disimpan sebagai integer rupiah penuh, tidak boleh float.

Display format:

```text
Rp 1.350.000.000
```

---

## 6.9 Dashboard Internal — View Properti

### FR-DASH-001 Tabel Listing

Default view berupa tabel compact dengan kolom:
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

### FR-DASH-002 Pagination

Pilihan pagination:
- 25 baris
- 50 baris
- 100 baris

Default: 50 baris per halaman.

### FR-DASH-003 Sort

Tabel dapat di-sort berdasarkan:
- Nama
- Harga ascending/descending
- Tanggal dibuat
- Status

### FR-DASH-004 Badge Status

Status ditampilkan dengan badge:

| Status | Warna |
|---|---|
| In Stock | Hijau muda |
| Sold Out | Merah `#B33A3A` |
| Siap Huni | Kuning/emas |
| Siap Kosong | Ungu muda |

### FR-DASH-005 Row Click

Klik baris tabel membuka:
- Panel detail di samping/drawer; atau
- Halaman detail terpisah.

Rekomendasi: gunakan drawer di desktop agar cepat, dan halaman detail di mobile jika drawer terlalu sempit.

---

## 6.10 Filter & Search

### FR-FILTER-001 Filter Kawasan

Filter kawasan menggunakan dropdown multi-select.

Contoh opsi:
- Krakatau
- Pancing
- Tembung
- Helvetia
- Cemara Asri/Kuala

### FR-FILTER-002 Filter Lebar Min

Input numeric untuk lebar minimum dalam meter.

### FR-FILTER-003 Filter Hadap

Multi-select:
- Utara
- Selatan
- Timur
- Barat

### FR-FILTER-004 Filter Harga Max

Input numeric dengan format rupiah.

Slider bersifat opsional.

### FR-FILTER-005 Filter Tipe

Radio:
- Semua
- Ruko
- Villa

### FR-FILTER-006 Filter Status

Radio:
- Semua
- In Stock
- Sold Out

### FR-FILTER-007 Filter Siap

Multi-select:
- Siap Huni
- Siap Kosong
- Siap Huni Renovasi

### FR-FILTER-008 Filter Carport

Toggle:
- Ya
- Tidak
- Semua

### FR-FILTER-009 Search Bar

Search bar berada di atas tabel dan mencari ke:
- `nama_property`
- `group`
- `kawasan`

### FR-FILTER-010 Debounce

Filter diterapkan real-time dengan debounce 300ms.

### FR-FILTER-011 Active Filter Chips

Filter aktif ditampilkan sebagai chip di atas tabel dan dapat dihapus individual.

### FR-FILTER-012 Reset Filter

Tombol `Reset Filter` mengembalikan semua filter ke state default.

### FR-FILTER-013 URL Query Params

State filter tersimpan di URL query params agar link bisa dibagikan.

Contoh:

```text
/agent/properties?kawasan=Krakatau,Pancing&status=in_stock&tipe=ruko&price_max=1500000000
```

---

## 6.11 Halaman Detail Properti

### FR-DETAIL-001 Layout

Detail properti menampilkan semua field dalam layout 2 kolom yang ringkas.

### FR-DETAIL-002 Maps Link

Jika `maps_link` tersedia:
- Tampilkan tombol `Buka di Google Maps`.
- Buka di tab baru.

### FR-DETAIL-003 Action untuk Superadmin

Untuk Superadmin, tampilkan tombol:
- Edit
- Hapus

Tombol berada di pojok kanan atas.

### FR-DETAIL-004 Action untuk Admin

Untuk Admin:
- Tombol Edit tidak tampil.
- Tombol Hapus tidak tampil.

---

## 6.12 Property Management — CRUD

### FR-CRUD-001 Create Properti

Tombol `+ Tambah Properti` hanya tampil untuk Superadmin.

Form create:
- Memiliki semua field di schema properti.
- Layout grid 2 kolom di desktop.
- Single column di mobile.
- Validasi client-side dan server-side.

Setelah submit sukses:
- Tampil toast notification.
- Redirect ke halaman listing.
- Entry baru di-highlight.

### FR-CRUD-002 Simpan & Tambah Lagi

Tombol `Simpan & Tambah Lagi` bersifat opsional untuk mempercepat input berurutan.

### FR-CRUD-003 Update Properti

Form edit:
- Layout sama dengan form create.
- Data ter-prefill.
- Field yang berubah ditandai dengan dirty state indicator.
- Tombol `Batal` kembali ke detail tanpa menyimpan.
- Setiap perubahan dicatat di audit log.

### FR-CRUD-004 Delete Properti

Tombol hapus membuka modal konfirmasi dengan teks:

```text
Yakin hapus properti [nama]? Tindakan ini tidak dapat dibatalkan.
```

Implementasi delete:
- Soft delete dengan `deleted_at` timestamp.
- Data tidak muncul di listing publik.
- Data tidak muncul di listing internal default view.

### FR-CRUD-005 Arsip Properti

Menu Arsip untuk melihat dan restore properti terhapus bersifat opsional Phase 2.

---

## 6.13 Validasi Form Properti

### FR-VAL-001 Rules

| Field | Validasi |
|---|---|
| `nama_property` | Minimum 3 karakter, maksimum 100 karakter |
| `lebar` | Harus > 0, maksimum 2 desimal |
| `panjang` | Harus > 0, maksimum 2 desimal |
| `price` | Harus > 0, integer rupiah |
| `tingkat` | 1–10, maksimum 1 desimal |
| `maps_link` | URL valid berisi domain `google.com/maps` |

### FR-VAL-002 Error Display

Error ditampilkan inline di bawah field bermasalah dengan warna `#B33A3A`.

---

## 6.14 Audit Log

### FR-AUDIT-001 Event Dicatat

Audit log mencatat:
- Create property.
- Update property.
- Delete property.
- Create admin.
- Enable admin.
- Disable admin.
- Reset password admin.

### FR-AUDIT-002 Data Audit

Setiap log minimal menyimpan:
- Actor user ID.
- Actor name/email.
- Role actor.
- Entity type.
- Entity ID.
- Action.
- Previous values.
- New values.
- Timestamp Asia/Jakarta.
- IP address.

### FR-AUDIT-003 Akses Audit

Audit log hanya dapat dilihat Superadmin.

---

## 7. Non-Functional Requirements

## 7.1 Performance

| Requirement | Target |
|---|---:|
| First Contentful Paint landing page | < 1.5s di koneksi 4G |
| Filter/search response | < 500ms untuk dataset hingga 1000 properti |
| Lighthouse Performance Score landing page | ≥ 85 |

## 7.2 Security

1. Semua endpoint internal dilindungi authentication middleware.
2. CSRF protection untuk semua mutasi `POST`, `PUT`, `PATCH`, `DELETE`.
3. Rate limiting global: 100 request/menit/IP.
4. Rate limiting auth: 10 request/menit/IP.
5. Rate limiting contact form: 3 submit/IP/jam.
6. Password di-hash menggunakan bcrypt dengan cost factor ≥ 10.
7. HTTPS-only di production.
8. Secure cookie flag aktif di production.
9. Input sanitization untuk mencegah XSS.
10. Query parameterized atau ORM safe query untuk mencegah SQL injection.
11. Authorization backend untuk semua endpoint mutasi.

## 7.3 Bahasa & Lokalisasi

1. Seluruh UI menggunakan Bahasa Indonesia.
2. Format mata uang: `Rp 1.350.000.000`.
3. Format tanggal: `24 Mei 2026` atau `24/05/2026`.
4. Timezone display: Asia/Jakarta/WIB.

## 7.4 Browser Support

1. Chrome versi 2 tahun terakhir.
2. Edge versi 2 tahun terakhir.
3. Firefox versi 2 tahun terakhir.
4. Safari versi 2 tahun terakhir.
5. Mobile Safari iOS 14+.
6. Chrome Android.

---

## 8. Recommended Information Architecture

```text
/
/about
/contact
/agent/login
/agent/dashboard
/agent/properties
/agent/properties/new              superadmin only
/agent/properties/[id]
/agent/properties/[id]/edit         superadmin only
/agent/admins                       superadmin only
/agent/audit-logs                   superadmin only
```

---

## 9. Recommended MVP Navigation

### Public

- Beranda
- Tentang Kami
- Kontak
- Login Agent / direct route decision based on AC conflict

### Internal Admin/Superadmin

- Dashboard
- Properti
- Admin Management, superadmin only
- Audit Log, superadmin only
- Logout

---

## 10. Suggested Data Model

### 10.1 users

| Column | Type | Notes |
|---|---|---|
| id | uuid / bigint | Primary key |
| name | string | Required |
| email | string | Unique, required |
| password_hash | string | Required if password login |
| role | enum | `admin`, `superadmin` |
| is_active | boolean | Default true |
| failed_login_count | integer | Default 0 |
| locked_until | timestamp nullable | Login lockout |
| created_at | timestamp | Auto |
| updated_at | timestamp | Auto |

### 10.2 properties

Mengikuti field di FR-PROP-001.

Rekomendasi teknis:
- `hadap` disimpan sebagai array/json atau relation table karena multi enum.
- `kawasan` disimpan sebagai array/json atau relation table karena multi-tag.
- `price` bigint.
- Soft delete menggunakan `deleted_at`.

### 10.3 contact_messages

| Column | Type | Notes |
|---|---|---|
| id | uuid / bigint | Primary key |
| name | string | Required |
| email | string | Required |
| phone | string | Required, min 10 digit |
| message | text | Required |
| ip_address | string | For rate limit/audit |
| user_agent | string nullable | Optional |
| created_at | timestamp | Auto |

### 10.4 audit_logs

Mengikuti FR-AUDIT-002.

---

## 11. Success Metrics

1. Semua acceptance criteria terpenuhi.
2. Admin tidak dapat melakukan mutasi data melalui UI maupun API.
3. Filter/search berjalan di bawah 500ms untuk 1000 properti.
4. Landing page Lighthouse Performance Score minimal 85.
5. UI responsif di mobile, tablet, dan desktop.
6. Dataset minimal 50 properti dummy tersedia untuk QA.
7. README lengkap dengan live URL dan credential demo.
8. Tidak ada bug High/Critical yang terbuka saat submission.

---

## 12. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Konflik requirement Login Agent tampil di header vs tidak ada link dari navigasi publik | Kebingungan implementasi | Dokumentasikan keputusan. Untuk strict AC-5.1, jangan tampilkan link publik. Untuk strict AC-2.3, tampilkan tombol outline emas. |
| Authorization hanya di frontend | Security fail | Wajib middleware/server action check di backend. Test request langsung sebagai admin. |
| Price disimpan float | Error pembulatan | Gunakan bigint integer rupiah. |
| Filter lambat | UX buruk | Index database, server-side filtering, debounce 300ms. |
| Scope melebar ke upload gambar/property marketplace publik | Deadline terganggu | Ikuti fixed scope acceptance criteria. |
| Email notification gagal di production | Contact form tidak efektif | Sediakan env SMTP, retry handling, dan fallback log. |

---

## 13. Milestone Implementasi

### Milestone 1 — Foundation

- Setup Next.js + Tailwind + Supabase.
- Theme tokens Prime Property.
- Auth schema dan role model.
- Layout public dan internal.

### Milestone 2 — Public Pages

- Landing page.
- About Us.
- Contact Us.
- Contact form + email notification + rate limit.

### Milestone 3 — Auth & RBAC

- Login `/agent/login`.
- Session cookie.
- Lockout 5 gagal login.
- Logout.
- Middleware authentication dan authorization.

### Milestone 4 — Property Dashboard

- Property schema.
- Seed 50 dummy data.
- Listing table.
- Filter/search/sort/pagination/query params.
- Detail page/drawer.

### Milestone 5 — Superadmin Features

- Create property.
- Update property.
- Delete property soft delete.
- Admin management.
- Audit log.

### Milestone 6 — QA & Submission

- Test role admin 403.
- Test responsive.
- Test performance.
- Final README.
- Deploy live URL.
- Public GitHub repo ready after winner flow.

---

## 14. Definition of Done

Fitur dianggap selesai jika:

1. Semua acceptance criteria terpenuhi dan teruji.
2. Tidak ada bug High/Critical terbuka.
3. UI sesuai brand guidelines: palette, typography, logo placement.
4. Responsive di mobile, tablet, dan desktop.
5. Backend authorization terverifikasi.
6. Admin tidak bisa CRUD walaupun melakukan direct API request.
7. Filter dan search berjalan dengan dataset minimal 50 properti dummy.
8. Dokumentasi singkat tersedia untuk Superadmin.
9. README berisi live URL dan demo credential 1 admin + 1 superadmin.

