import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { getSessionFromCookie } from "@/lib/auth/session";

const superadminLinks = [
  { href: "/agent/properties/new", label: "Tambah Properti" },
  { href: "/agent/admins", label: "Admin" },
  { href: "/agent/audit-logs", label: "Audit" },
];

export async function InternalShell({
  children,
}: Readonly<{ children: ReactNode }>): Promise<React.ReactElement> {
  const cookieStore = await cookies();
  const user = await getSessionFromCookie(cookieStore.get("pp_session")?.value);

  return (
    <div className="min-h-screen bg-soft-gray">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-prime-black text-on-dark">
        <div className="mx-auto flex h-[64px] max-w-wide items-center justify-between px-lg">
          <Link className="flex items-center gap-sm" href="/agent/dashboard">
            <Image src="/logo.png" alt="Prime Property" width={128} height={40} priority />
          </Link>
          <div className="flex items-center gap-md">
            <span className="hidden text-caption text-zinc-300 sm:inline">
              {user?.email ?? "Agent"}
            </span>
            <span className="badge-gold">{user?.role ?? "admin"}</span>
            <form action="/api/auth/logout" method="post">
              <button className="btn-outline-gold h-10" type="submit">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-wide gap-lg px-lg py-lg lg:grid-cols-[240px_1fr]">
        <aside className="border border-border-default bg-surface-card p-md">
          <nav className="flex flex-col gap-xs text-body-sm">
            <Link className="sidebar-link" href="/agent/dashboard">
              Listing Properti
            </Link>
            {user?.role === "superadmin"
              ? superadminLinks.map((item) => (
                  <Link className="sidebar-link" href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))
              : null}
          </nav>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
