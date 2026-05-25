import Image from "next/image";
import Link from "next/link";
import { LogIn, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/public/ThemeToggle";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
];

export function PublicHeader(): React.ReactElement {
  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-surface-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-container items-center justify-between px-lg">
        <Link className="flex items-center gap-sm rounded-xl bg-logo-surface px-sm py-xs text-title-md" href="/">
          <Image
            className="h-auto w-[132px]"
            src="/logo.png"
            alt="Prime Property"
            width={264}
            height={88}
            priority
          />
        </Link>
        <nav className="hidden items-center gap-lg md:flex">
          {navItems.map((item) => (
            <Link
              className="nav-link-animated text-nav-link text-text-secondary"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-sm">
          <ThemeToggle />
          <Link className="btn-outline-dark hidden gap-xs rounded-xl sm:inline-flex" href="/agent/login">
            <LogIn aria-hidden="true" size={16} />
            <span>Login Agent</span>
          </Link>
          <button
            aria-label="Buka navigasi"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border-default text-text-primary sm:hidden"
            type="button"
          >
            <Menu aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
