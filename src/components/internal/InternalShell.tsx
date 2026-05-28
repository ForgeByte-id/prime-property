import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  BarChart3,
  Building2,
  FileClock,
  LogOut,
  Plus,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { getSessionFromCookie } from "@/lib/auth/session";
import { CSRF_COOKIE_NAME } from "@/lib/security/csrf";
import { ToastBridge } from "@/components/common/ToastBridge";

const superadminLinks = [
  { href: "/agent/properties/new", label: "Tambah Properti", icon: Plus },
  { href: "/agent/admins", label: "Admin", icon: Users },
  { href: "/agent/audit-logs", label: "Audit", icon: FileClock },
];

export async function InternalShell({
  children,
}: Readonly<{ children: ReactNode }>): Promise<React.ReactElement> {
  const cookieStore = await cookies();
  const user = await getSessionFromCookie(cookieStore.get("pp_session")?.value);
  const csrfToken = cookieStore.get(CSRF_COOKIE_NAME)?.value ?? "";

  return (
    <div className="dashboard-canvas min-h-screen text-prime-black">
      <ToastBridge />
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-accent-gold/10 bg-prime-black text-on-dark md:flex">
        <div className="flex items-center gap-sm border-b border-white/10 p-md">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-md">
            <Image
              alt="Prime Property"
              className="h-7 w-7 object-contain"
              height={28}
              src="/logo-without-text-no-bg.png"
              width={28}
              priority
            />
          </div>
          <div>
            <h2 className="text-caption font-bold tracking-[0.28em] text-on-dark">PRIME</h2>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent-gold">Property</p>
          </div>
        </div>

        <nav className="flex-1 space-y-xs overflow-y-auto px-sm py-md">
          <p className="px-sm pb-xs text-[10px] font-bold uppercase tracking-wider text-white/30">Menu Utama</p>
          <Link className="sidebar-link text-white/60" href="/agent/dashboard">
            <BarChart3 aria-hidden="true" className="text-accent-gold/70" size={16} />
            Ringkasan Analitik
          </Link>
          <Link className="sidebar-link sidebar-link-active" href="/agent/dashboard">
            <Building2 aria-hidden="true" size={16} />
            Listing Properti
          </Link>
          <span className="sidebar-link text-white/35">
            <Trash2 aria-hidden="true" className="text-accent-red/70" size={16} />
            Arsip Terhapus
          </span>

          {user?.role === "superadmin" ? (
            <>
              <p className="px-sm pb-xs pt-md text-[10px] font-bold uppercase tracking-wider text-white/30">
                Keamanan & Audit
              </p>
              {superadminLinks.map((item) => (
                <Link className="sidebar-link" href={item.href} key={item.href}>
                  <item.icon aria-hidden="true" size={16} />
                  {item.label}
                </Link>
              ))}
            </>
          ) : null}
        </nav>

        <div className="border-t border-white/10 bg-black/10 p-md">
          <div className="flex items-center justify-between gap-sm">
            <div className="flex min-w-0 items-center gap-sm">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-gold text-xs font-bold text-prime-black">
                {(user?.email ?? "A").slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="truncate text-caption font-bold text-on-dark">{user?.email ?? "Agent"}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-accent-gold">{user?.role ?? "admin"}</p>
              </div>
            </div>
            <form action="/api/auth/logout" method="post">
              <input name="csrfToken" type="hidden" value={csrfToken} />
                <button className="rounded-lg p-xs text-accent-red transition hover:bg-accent-red/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-gold" title="Logout" type="submit">
                <LogOut aria-hidden="true" size={16} />
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col md:pl-64">
        <header className="sticky top-0 z-30 border-b border-prime-black/5 bg-white px-md py-sm shadow-sm sm:px-lg">
          <div className="mb-sm flex items-center justify-between md:hidden">
            <Link className="flex items-center gap-xs" href="/agent/dashboard">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-gold text-xs font-black text-prime-black">P</span>
              <span className="text-caption font-bold tracking-[0.18em]">PRIME</span>
            </Link>
          </div>
          <nav className="mb-sm flex gap-xs overflow-x-auto md:hidden">
            <Link className="rounded-lg bg-prime-black px-sm py-xs text-xs font-semibold text-accent-gold" href="/agent/dashboard">
              Listing
            </Link>
            {user?.role === "superadmin"
              ? superadminLinks.map((item) => (
                  <Link className="rounded-lg bg-soft-gray px-sm py-xs text-xs font-semibold text-prime-black" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))
              : null}
          </nav>
          <div className="flex flex-col gap-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-xs">
              <span className="text-caption font-medium text-prime-black/45">Sistem Internal</span>
              <span className="text-caption text-prime-black/20">/</span>
              <span className="text-caption font-semibold text-prime-black">Manajemen Properti</span>
            </div>
            <div className="flex flex-wrap items-center gap-sm">
              <div className="hidden text-caption font-medium text-prime-black/50 sm:block">
                Zona Waktu: <span className="font-bold text-prime-black">Asia/Jakarta (WIB)</span>
              </div>
              <div className="flex items-center gap-sm rounded-lg border border-prime-black/10 bg-white px-sm py-xs shadow-sm">
                <ShieldCheck aria-hidden="true" className="text-prime-black" size={16} />
                <div>
                  <p className="text-caption font-bold leading-tight text-prime-black">{user?.email ?? "Agent"}</p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-prime-black/55">{user?.role ?? "admin"}</p>
                </div>
              </div>
              <form action="/api/auth/logout" method="post">
                <input name="csrfToken" type="hidden" value={csrfToken} />
                <button className="flex items-center gap-xs rounded-lg px-sm py-xs text-body-sm font-semibold text-prime-black transition hover:bg-soft-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-gold" type="submit">
                  <LogOut aria-hidden="true" size={16} />
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="min-w-0 flex-1 space-y-lg p-md sm:p-lg lg:p-xl">{children}</main>
        <footer className="border-t border-prime-black/5 bg-white py-md text-center text-caption text-prime-black/40">
          © 2026 Prime Property Internal Agent Platform v1.0.
        </footer>
      </div>
    </div>
  );
}
