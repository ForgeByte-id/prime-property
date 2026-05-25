---
version: alpha
name: Prime-Property-design-analysis
description: A compact, premium property-agency interface anchored on deep Prime Black (#1A1A1A), warm Accent Gold (#C9A961), and precise tabular clarity. The visual language should feel trustworthy, executive, and operational rather than lifestyle-heavy: strong black headers, gold CTAs, white content surfaces, soft gray cards, and minimal red only for destructive or urgent states. Typography runs Inter or Geist with bold headings and regular body copy. Listing pages are deliberately data-first with no upload/image gallery flow; the core product surface is a fast, compact, filterable property table with badges, chips, drawer/detail views, and strong role-based UI separation between Admin and Superadmin.

colors:
  primary-black: "#1A1A1A"
  primary-black-soft: "#242424"
  primary-black-muted: "#333333"
  accent-gold: "#C9A961"
  accent-gold-hover: "#B9984F"
  accent-gold-soft: "#F3E8C8"
  accent-red: "#B33A3A"
  accent-red-hover: "#9F3030"
  accent-red-soft: "#F7E4E4"
  neutral-white: "#FFFFFF"
  soft-gray: "#F5F5F5"
  surface-card: "#FFFFFF"
  surface-muted: "#FAFAFA"
  border: "#E5E5E5"
  border-strong: "#D4D4D4"
  text-primary: "#1A1A1A"
  text-secondary: "#525252"
  text-muted: "#737373"
  text-disabled: "#A3A3A3"
  on-dark: "#FFFFFF"
  on-gold: "#1A1A1A"
  success: "#2F855A"
  success-soft: "#E6F4EC"
  warning: "#C9A961"
  warning-soft: "#F3E8C8"
  purple: "#7C3AED"
  purple-soft: "#EFE7FF"
  info: "#2563EB"
  info-soft: "#E8F0FF"
  scrim: "#000000"

typography:
  display-xl:
    fontFamily: "Inter, Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.8px
  display-lg:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.5px
  display-md:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.25px
  title-lg:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  title-md:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  title-sm:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  body-lg:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body-md:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  caption:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: 0
  caption-muted:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: 0
  micro:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0
  badge:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0
  table-head:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: 0.24px
    textTransform: uppercase
  table-cell:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  button-md:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  button-lg:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0
  nav-link:
    fontFamily: "Inter, Geist, sans-serif"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0

rounded:
  none: 0px
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 64px

shadows:
  none: none
  sm: "0 1px 2px rgba(0,0,0,0.06)"
  md: "0 8px 24px rgba(0,0,0,0.08)"
  lg: "0 16px 40px rgba(0,0,0,0.12)"
  focus-gold: "0 0 0 3px rgba(201,169,97,0.28)"

components:
  public-header:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.primary-black}"
    typography: "{typography.nav-link}"
    height: 72px
    borderBottom: "1px solid {colors.border}"
    position: sticky
  internal-header:
    backgroundColor: "{colors.primary-black}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    height: 64px
    borderBottom: "1px solid rgba(255,255,255,0.08)"
  logo-lockup:
    backgroundColor: transparent
    textColor: "{colors.primary-black}"
    typography: "{typography.title-md}"
    height: 40px
  hero-section:
    backgroundColor: "{colors.primary-black}"
    textColor: "{colors.on-dark}"
    typography: "{typography.display-xl}"
    padding: "64px 24px"
  button-primary:
    backgroundColor: "{colors.accent-gold}"
    textColor: "{colors.on-gold}"
    typography: "{typography.button-lg}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    height: 48px
  button-primary-hover:
    backgroundColor: "{colors.accent-gold-hover}"
    textColor: "{colors.on-gold}"
  button-outline-gold:
    backgroundColor: transparent
    textColor: "{colors.accent-gold}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.accent-gold}"
    padding: "9px 16px"
    height: 40px
  button-secondary:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.primary-black}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border-strong}"
    padding: "9px 16px"
    height: 40px
  button-danger:
    backgroundColor: "{colors.accent-red}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "9px 16px"
    height: 40px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.text-secondary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  featured-property-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    shadow: "{shadows.sm}"
    padding: "20px"
  value-prop-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    padding: "24px"
  contact-card:
    backgroundColor: "{colors.soft-gray}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: "24px"
  auth-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    shadow: "{shadows.md}"
    padding: "32px"
  dashboard-shell:
    backgroundColor: "{colors.soft-gray}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
  sidebar-nav:
    backgroundColor: "{colors.primary-black}"
    textColor: "{colors.on-dark}"
    typography: "{typography.nav-link}"
    width: 248px
  sidebar-nav-active:
    backgroundColor: "rgba(201,169,97,0.16)"
    textColor: "{colors.accent-gold}"
    rounded: "{rounded.md}"
  table-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.table-cell}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    shadow: "{shadows.sm}"
  table-header:
    backgroundColor: "{colors.primary-black}"
    textColor: "{colors.on-dark}"
    typography: "{typography.table-head}"
    height: 44px
  table-row:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.table-cell}"
    height: 48px
    borderBottom: "1px solid {colors.border}"
  table-row-hover:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-primary}"
  filter-panel:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    padding: "16px"
  filter-chip:
    backgroundColor: "{colors.accent-gold-soft}"
    textColor: "{colors.primary-black}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "6px 10px"
  search-input:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border-strong}"
    padding: "10px 12px"
    height: 44px
  text-input:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border-strong}"
    padding: "10px 12px"
    height: 44px
  textarea:
    backgroundColor: "{colors.neutral-white}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border-strong}"
    padding: "10px 12px"
    minHeight: 120px
  input-focus:
    border: "1px solid {colors.accent-gold}"
    shadow: "{shadows.focus-gold}"
  input-error:
    border: "1px solid {colors.accent-red}"
    textColor: "{colors.accent-red}"
  status-badge-in-stock:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
  status-badge-sold-out:
    backgroundColor: "{colors.accent-red-soft}"
    textColor: "{colors.accent-red}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
  status-badge-siap-huni:
    backgroundColor: "{colors.warning-soft}"
    textColor: "{colors.primary-black}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
  status-badge-siap-kosong:
    backgroundColor: "{colors.purple-soft}"
    textColor: "{colors.purple}"
    typography: "{typography.badge}"
    rounded: "{rounded.full}"
    padding: "4px 8px"
  detail-drawer:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
    width: 440px
    shadow: "{shadows.lg}"
    padding: "24px"
  detail-field-label:
    backgroundColor: transparent
    textColor: "{colors.text-muted}"
    typography: "{typography.caption}"
  detail-field-value:
    backgroundColor: transparent
    textColor: "{colors.text-primary}"
    typography: "{typography.body-sm}"
  modal:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    shadow: "{shadows.lg}"
    padding: "24px"
  toast-success:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    shadow: "{shadows.md}"
  toast-error:
    backgroundColor: "{colors.accent-red}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    shadow: "{shadows.md}"
  public-footer:
    backgroundColor: "{colors.primary-black}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
    padding: "40px 24px"
---

# Overview

Prime Property should feel like a premium local property agency with an operationally efficient internal back office. The design is not a photo-heavy real-estate marketplace. The acceptance criteria explicitly states there is no image upload feature for property listings, so the design system should prioritize **compact data density**, **readable tables**, **quick scanning**, and **clear role separation**.

The brand foundation is a high-contrast triad: **Prime Black** (`#1A1A1A`) for authority, **Accent Gold** (`#C9A961`) for premium CTAs and highlights, and **Neutral White** (`#FFFFFF`) for clean reading surfaces. **Accent Red** (`#B33A3A`) is reserved for destructive actions, sold-out status, urgent states, hover danger, and validation errors. **Soft Gray** (`#F5F5F5`) creates the dashboard background and secondary card fills.

The public website should be elegant and minimal: black hero, gold CTA, logo-forward navigation, short value proposition cards, and clean contact paths. The internal portal should feel like a professional inventory tracker: sticky dark header, optional dark sidebar, filter panel, compact property table, status badges, drawer details, and strong Superadmin-only action controls.

**Key Characteristics:**

- Brand-first public surfaces: black hero (`{colors.primary-black}`), gold CTA (`{colors.accent-gold}`), white content sections, and logo placement in every public and internal header.
- Data-first internal UI: compact table, 48px row height, black table header, clear badges, and fast filter/search controls.
- Typography uses Inter or Geist. Headings are bold/semibold; body is regular. There is no decorative serif or luxury script — Prime Property reads as modern, reliable, and practical.
- UI density is intentionally compact. Spacing follows 4 / 8 / 16 / 24 / 32px rules.
- Rounded corners are professional, not playful: 8px for inputs/buttons, 12px for cards, 16px for modals/auth cards.
- Gold is used sparingly for primary actions, focus rings, active nav, and highlight chips. Overusing gold will make the app feel noisy.
- Red is semantic, not decorative: destructive actions, sold-out state, validation, and critical warnings.
- Public and internal layouts are responsive across mobile ≤640px, tablet ≤1024px, and desktop ≥1024px.

# Colors

## Brand Core

- **Primary Black** (`{colors.primary-black}` — `#1A1A1A`): Main authority color. Use for hero background, dashboard header/sidebar, table header, primary text, and brand-heavy sections.
- **Accent Gold** (`{colors.accent-gold}` — `#C9A961`): Main premium accent. Use for CTAs, active nav states, focus ring, highlight badges, and important chips.
- **Accent Red** (`{colors.accent-red}` — `#B33A3A`): Error/danger/sold-out color. Use for delete button, sold-out badge, inline error, and urgent states.
- **Neutral White** (`{colors.neutral-white}` — `#FFFFFF`): Main page and card surface.
- **Soft Gray** (`{colors.soft-gray}` — `#F5F5F5`): Secondary background, dashboard canvas, and subtle cards.

## Supporting Surface Tokens

- **Surface Card** (`{colors.surface-card}` — `#FFFFFF`): Cards, forms, tables, modals.
- **Surface Muted** (`{colors.surface-muted}` — `#FAFAFA`): Table hover row, subtle empty states, read-only sections.
- **Border** (`{colors.border}` — `#E5E5E5`): Standard 1px divider.
- **Border Strong** (`{colors.border-strong}` — `#D4D4D4`): Inputs and more visible card outlines.

## Text Tokens

- **Text Primary** (`{colors.text-primary}` — `#1A1A1A`): Headings, main table values, key property data.
- **Text Secondary** (`{colors.text-secondary}` — `#525252`): Body copy, card descriptions.
- **Text Muted** (`{colors.text-muted}` — `#737373`): Labels, helper text, metadata.
- **Text Disabled** (`{colors.text-disabled}` — `#A3A3A3`): Disabled controls.
- **On Dark** (`{colors.on-dark}` — `#FFFFFF`): Text over black and red.
- **On Gold** (`{colors.on-gold}` — `#1A1A1A`): Text over gold.

## Semantic Tokens

- **Success** (`{colors.success}` — `#2F855A`): In stock text and positive states.
- **Success Soft** (`{colors.success-soft}` — `#E6F4EC`): In stock badge background.
- **Warning Soft** (`{colors.warning-soft}` — `#F3E8C8`): Siap huni badge background.
- **Purple Soft** (`{colors.purple-soft}` — `#EFE7FF`): Siap kosong badge background.
- **Info Soft** (`{colors.info-soft}` — `#E8F0FF`): Optional informational alerts.

# Typography

## Font Family

Use **Inter** or **Geist** across the entire product. Both are modern sans-serif families and match the acceptance criteria. Recommended stack:

```css
font-family: Inter, Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Use Inter if the priority is maximum readability in tables. Use Geist if the implementation uses Vercel/Next.js and wants a more native Next.js aesthetic.

## Scale

| Token | Size | Weight | Use |
|---|---:|---:|---|
| `{typography.display-xl}` | 40px | 700 | Landing hero heading |
| `{typography.display-lg}` | 32px | 700 | Page-level public section heading |
| `{typography.display-md}` | 24px | 700 | Dashboard page title |
| `{typography.title-lg}` | 20px | 700 | Card section title |
| `{typography.title-md}` | 18px | 600 | Detail title, form group title |
| `{typography.title-sm}` | 16px | 600 | Small card title, drawer title |
| `{typography.body-lg}` | 18px | 400 | Hero subtitle |
| `{typography.body-md}` | 16px | 400 | Public body copy |
| `{typography.body-sm}` | 14px | 400 | Dashboard default body |
| `{typography.caption}` | 13px | 500 | Field label, small metadata |
| `{typography.micro}` | 12px | 500 | Helper text |
| `{typography.badge}` | 12px | 600 | Status badges and chips |
| `{typography.table-head}` | 12px | 700 | Table headers, uppercase |
| `{typography.table-cell}` | 14px | 400 | Property table cells |
| `{typography.button-md}` | 14px | 600 | Standard button |
| `{typography.button-lg}` | 16px | 600 | Hero CTA |
| `{typography.nav-link}` | 14px | 600 | Header/sidebar nav |

## Typography Principles

- Public pages can use larger type, but dashboard should stay compact.
- Table headers should use uppercase 12px bold with slight letter spacing for scanability.
- Property names should be semibold to help rows scan quickly.
- Currency values should align right in tables where possible.
- Avoid overly large headings in the internal portal; the product value is speed and clarity.

# Layout

## Spacing System

Prime Property follows a compact 4 / 8 / 16 / 24 / 32px rhythm.

- 4px: micro gaps inside badges/icons.
- 8px: tight form label spacing, chip gaps.
- 16px: default card/table/filter panel inner spacing.
- 24px: section/card padding and dashboard content gutter.
- 32px: large public section spacing.
- 64px: public major section vertical spacing.

## Breakpoints

| Name | Width | Behavior |
|---|---:|---|
| Mobile | ≤640px | Single-column public layout; dashboard table scrolls horizontally or converts to compact row cards; filters collapse into sheet. |
| Tablet | ≤1024px | Public two-column blocks may collapse; dashboard sidebar can collapse; table remains horizontally scrollable. |
| Desktop | ≥1024px | Full public header, dashboard sidebar/header, filter panel, table, and drawer detail are visible. |

## Public Layout

- Header: sticky, white background, logo left, nav center/left, CTA right.
- Hero: black background with gold CTA and restrained premium visual.
- Featured properties: max 6 cards, data-focused, no image upload assumption.
- Value props: 3–4 cards with gold-accent icons.
- Footer: black background with logo and contact links.

## Internal Layout

- Header: black, compact 64px height.
- Sidebar: optional but recommended for desktop, black with gold active state.
- Content background: soft gray.
- Main content: max-width fluid, 24px padding desktop, 16px mobile.
- Table card: white surface with rounded corners and border.
- Detail drawer: right-side drawer on desktop, full page or bottom sheet on mobile.

# Components

## Public Header

`{components.public-header}` is sticky across public pages. It should contain:

1. Logo.
2. Beranda.
3. Tentang Kami.
4. Kontak.
5. Login Agent button depending on final interpretation of acceptance criteria.

Use a white background to keep the logo readable. Add a subtle 1px border to separate it from content.

## Hero Section

`{components.hero-section}` uses Prime Black as the full background. The CTA should use `{components.button-primary}` and must be gold with black text.

Content hierarchy:

1. Small gold eyebrow text, optional.
2. Main tagline.
3. Short supporting copy.
4. Primary CTA.

## Featured Property Card

`{components.featured-property-card}` is data-first. It may include:

- Nama property.
- Kawasan.
- Lebar × Panjang.
- Tipe.
- Tingkat.
- Harga.
- Status badge.

No image upload should be introduced. If a decorative placeholder is needed, use a minimal black/gold geometric block, not a property photo uploader.

## Value Proposition Card

`{components.value-prop-card}` uses a gold icon on white card. Keep each description short and readable.

## Contact Card and Contact Form

Contact page should split into:

- Contact information card.
- Contact form card.

On mobile, stack both cards.

Form controls use `{components.text-input}` and `{components.textarea}`. Focus uses gold focus ring. Error uses red border and inline red helper text.

## Auth Card

`{components.auth-card}` appears on `/agent/login` with logo above or inside the card.

Recommended fields:

- Email.
- Password.
- Submit button.

Show lockout and invalid credential messages carefully without revealing whether email exists.

## Dashboard Shell

`{components.dashboard-shell}` should use soft gray background to distinguish internal tool from public website. Header/sidebar should use black to preserve brand authority.

## Property Table

`{components.table-card}` is the main internal component.

Columns:

1. Nama
2. Group
3. Lebar × Panjang
4. Hadap
5. Tipe
6. Tingkat
7. Harga
8. Carport
9. Status
10. Siap
11. Kawasan

Behavior:

- Header black with white uppercase labels.
- Rows 48px height.
- Hover row soft gray.
- Click row opens drawer/detail.
- Use compact badges for status and ready state.
- Price should display in Indonesian format, e.g. `Rp 1.350.000.000`.

## Filter Panel

`{components.filter-panel}` sits above the table.

Controls:

- Search bar.
- Kawasan multi-select.
- Lebar min input.
- Hadap multi-select.
- Harga max rupiah input.
- Tipe radio.
- Status radio.
- Siap multi-select.
- Carport toggle.
- Reset filter button.

Active filters appear as `{components.filter-chip}` above or below the filter panel.

## Status Badges

- In Stock: `{components.status-badge-in-stock}`.
- Sold Out: `{components.status-badge-sold-out}`.
- Siap Huni: `{components.status-badge-siap-huni}`.
- Siap Kosong: `{components.status-badge-siap-kosong}`.
- Siap Huni Renovasi: use gold soft or info soft depending on visual balance.

## Detail Drawer

`{components.detail-drawer}` opens from the right on desktop. It should show all property fields in a compact 2-column definition layout.

Actions:

- Superadmin: Edit and Hapus visible in top-right.
- Admin: no Edit/Hapus actions.

If `maps_link` exists, show `Buka di Google Maps` as a secondary or outline button.

## Create/Edit Form

Form layout:

- Desktop: 2 columns.
- Mobile: 1 column.

Important behavior:

- Client-side validation for instant feedback.
- Server-side validation for security.
- Dirty state indicator in edit mode.
- Submit button uses gold.
- Delete button uses red only where needed.

## Delete Confirmation Modal

`{components.modal}` should show the exact message:

> Yakin hapus properti [nama]? Tindakan ini tidak dapat dibatalkan.

Buttons:

- Batal: secondary.
- Hapus: danger red.

## Toast

Use green/success for successful actions and red for errors. Contact form success message must be:

> Pesan terkirim, tim kami akan menghubungi Anda.

# Public Page Design Guidance

## Landing Page

Recommended section order:

1. Sticky header.
2. Hero with black background and gold CTA.
3. Properti Unggulan, max 6.
4. Mengapa Prime Property, 3–4 value proposition cards.
5. Footer with logo and contact.

The landing page should feel premium but still lightweight. Avoid large decorative animations that could hurt FCP < 1.5s.

## About Us

Desktop layout should be two columns:

- Left: profile, vision, mission.
- Right: quote or brand card with gold accent line.

Mobile collapses into one column.

## Contact Us

Recommended desktop layout:

- Left: contact info and optional maps.
- Right: contact form.

Validation should be immediate and simple.

# Internal Portal Design Guidance

## Login

The login route is separate at `/agent/login`. The screen should be minimal:

- Centered auth card.
- Logo visible.
- Email and password fields.
- Gold submit button.
- Error message in red.

## Listing Dashboard

Recommended desktop layout:

1. Black internal header.
2. Optional sidebar.
3. Page title: `Listing Properti`.
4. Filter panel.
5. Active filter chips.
6. Table card.
7. Pagination control.
8. Detail drawer on row click.

For Admin, hide mutation actions. For Superadmin, show:

- `+ Tambah Properti` button.
- Edit button on detail.
- Hapus button on detail.

## Admin Management

Superadmin-only page. Use the same table style. Include status badge for active/disabled admin.

## Audit Log

Superadmin-only page. Use compact table:

- Time.
- Actor.
- Action.
- Entity.
- Summary.

Use drawer/modal to inspect previous and new values.

# Responsive Behavior

## Mobile ≤640px

- Header collapses to logo + menu button.
- Public pages single-column.
- Featured property cards 1-up.
- Contact info and form stack vertically.
- Dashboard filters collapse into a button/sheet.
- Property table can use horizontal scroll or row-card layout.
- Detail drawer becomes full-screen route or bottom sheet.

## Tablet ≤1024px

- Public two-column layouts may collapse if cramped.
- Dashboard sidebar may collapse.
- Table remains compact with horizontal overflow.
- Filter controls wrap into 2 columns.

## Desktop ≥1024px

- Full public nav visible.
- Dashboard can use sidebar + main content.
- Filter panel supports multi-column layout.
- Detail drawer opens on the right.

# Accessibility

- Minimum touch target: 40px, recommended 44–48px.
- Gold on white should not be used for small text; use gold for fill/background or larger emphasis.
- CTA gold with black text provides stronger contrast than white text on gold.
- Error states must not rely only on color; include helper text.
- Table rows should be keyboard-focusable if click opens detail.
- Form labels must remain visible, not placeholder-only.
- Modal focus should be trapped.

# Motion

Keep motion subtle:

- Drawer slide: 180–220ms ease-out.
- Toast enter/exit: 160ms.
- Button hover: background-color transition 120ms.
- No heavy hero animation because performance target is strict.

# Known Design Decisions

1. **No listing image upload.** Any design that introduces image upload is out of scope.
2. **Table is the core product component.** Design effort should prioritize filters, badges, pagination, and detail readability.
3. **Gold is premium accent, not background filler.** Use it sparingly.
4. **Backend authorization must be reflected in UI but not replaced by UI.** Hide Superadmin actions from Admin, but still enforce server-side.
5. **Public Login Agent navigation has a requirement conflict.** AC-2.3 asks for Login Agent button in public header, while AC-5.1 states `/agent/login` has no link from public navigation. Decide and document before final submission.

# Implementation Notes for Tailwind

Recommended CSS variables:

```css
:root {
  --prime-black: #1A1A1A;
  --prime-gold: #C9A961;
  --prime-red: #B33A3A;
  --prime-white: #FFFFFF;
  --prime-gray: #F5F5F5;
}
```

Recommended Tailwind extension:

```ts
colors: {
  prime: {
    black: '#1A1A1A',
    gold: '#C9A961',
    red: '#B33A3A',
    white: '#FFFFFF',
    gray: '#F5F5F5',
  }
}
```

Recommended utility patterns:

- Public CTA: `bg-prime-gold text-prime-black hover:bg-[#B9984F] rounded-md`.
- Internal header: `bg-prime-black text-white`.
- Table header: `bg-prime-black text-white uppercase text-xs font-bold`.
- Error text: `text-prime-red text-sm`.
- Input focus: `focus:ring-2 focus:ring-prime-gold/30 focus:border-prime-gold`.

# QA Design Checklist

- Logo visible on all public pages and internal dashboard.
- Landing hero uses black background and gold CTA.
- Public header sticky.
- About page 2 columns desktop and 1 column mobile.
- Contact form validates inline and uses red error states.
- Dashboard table columns match acceptance criteria.
- Badges use correct semantic colors.
- Admin does not see Create/Edit/Delete.
- Superadmin sees Create/Edit/Delete.
- Mobile layout does not break table/filter usability.
- No image upload UI exists for property listing.
