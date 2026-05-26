import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

test("AC-10.1 requires core public and internal pages to exist", () => {
  [
    "src/app/(public)/page.tsx",
    "src/app/(public)/about/page.tsx",
    "src/app/(public)/contact/page.tsx",
    "src/app/(auth)/agent/login/page.tsx",
    "src/app/(auth)/agent/(portal)/dashboard/page.tsx",
    "src/app/(auth)/agent/(portal)/properties/new/page.tsx",
    "src/app/(auth)/agent/(portal)/properties/[id]/page.tsx",
    "src/app/(auth)/agent/(portal)/properties/[id]/edit/page.tsx",
    "src/app/(auth)/agent/(portal)/admins/page.tsx",
    "src/app/(auth)/agent/(portal)/audit-logs/page.tsx",
  ].forEach((path) => assert.equal(existsSync(join(root, path)), true, `${path} must exist`));
});

test("AC-10.1 verifies backend authorization blocks admin CRUD", () => {
  const propertiesRoute = read("src/app/api/properties/route.ts");
  const propertyByIdRoute = read("src/app/api/properties/[id]/route.ts");
  const middleware = read("src/middleware.ts");
  const rbac = read("src/lib/auth/rbac.ts");

  assert.match(rbac, /mutationRoles.*superadmin/s);
  assert.match(propertiesRoute, /canMutateProperty\(user\).*403/s);
  assert.match(propertyByIdRoute, /canMutateProperty\(user\).*403/s);
  assert.match(propertyByIdRoute, /export async function PATCH/);
  assert.match(propertyByIdRoute, /export async function DELETE/);
  assert.match(middleware, /unsafeMethods/);
  assert.match(middleware, /status:\s*403/);
});

test("AC-10.1 verifies security controls for mutation endpoints", () => {
  const middleware = read("src/middleware.ts");
  const csrf = read("src/lib/security/csrf.ts");
  const rateLimit = read("src/lib/security/rate-limit.ts");
  const loginRoute = read("src/app/api/auth/login/route.ts");
  const contactRoute = read("src/app/api/contact/route.ts");

  assert.match(csrf, /CSRF_HEADER_NAME/);
  assert.match(middleware, /validateCsrfToken/);
  assert.match(rateLimit, /RateLimitError/);
  assert.match(loginRoute, /assertRateLimit/);
  assert.match(contactRoute, /assertRateLimit/);
});

test("AC-10.1 verifies seed contains demo users and at least 50 dummy properties", () => {
  const seed = read("supabase/seeders/seed.sql");
  const propertyTupleCount = (seed.match(/\(\n\s*'[0-9a-f-]{36}',\n\s*'[^']+',\n\s*'[^']+',\n\s*[0-9]/g) ?? []).length;

  assert.match(seed, /superadmin@primeproperty\.test/);
  assert.match(seed, /admin@primeproperty\.test/);
  assert.match(seed, /crypt\('Prime@2026', gen_salt\('bf', 10\)\)/);
  assert.ok(propertyTupleCount >= 50, `expected at least 50 property tuples, got ${propertyTupleCount}`);
});

test("AC-10.1 verifies search, filters, pagination, sorting, and datatable UI exist", () => {
  const table = read("src/components/internal/PropertyTableShell.tsx");
  const validation = read("src/lib/validation.ts");
  const service = read("src/lib/services/property.service.ts");

  assert.match(table, /Search/);
  assert.match(table, /perPage/);
  assert.match(table, /getPaginationPages/);
  assert.match(table, /sortOptions/);
  assert.match(table, /Pencarian Cepat/);
  assert.match(table, /Wilayah \/ Kawasan/);
  assert.match(table, /Harga Max/);
  assert.match(validation, /q:/);
  assert.match(validation, /per_page/);
  assert.match(service, /ilike/);
  assert.match(service, /\.range\(from, to\)/);
  assert.match(service, /\.order\(sortColumn/);
});

test("AC-10.1 verifies brand guidelines and responsive dashboard layout", () => {
  const globals = read("src/app/globals.css");
  const shell = read("src/components/internal/InternalShell.tsx");

  assert.match(globals, /--prime-black:\s*#1a1a1a/i);
  assert.match(globals, /--accent-gold:\s*#c9a961/i);
  assert.match(globals, /--accent-red:\s*#b33a3a/i);
  assert.match(shell, /logo-without-text-no-bg\.png/);
  assert.match(shell, /md:pl-64/);
  assert.match(shell, /md:hidden/);
  assert.match(shell, /md:flex/);
});

test("AC-10.1 verifies superadmin documentation and demo credentials exist", () => {
  const readme = read("README.md");

  assert.match(readme, /Demo Credentials/);
  assert.match(readme, /superadmin@primeproperty\.test/);
  assert.match(readme, /admin@primeproperty\.test/);
  assert.match(readme, /Prime@2026/);
  assert.match(readme, /Superadmin/i);
});
