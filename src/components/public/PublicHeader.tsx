"use client";

import Image from "next/image";
import Link from "next/link";
import { LogIn, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/public/ThemeToggle";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicHeader(): React.ReactElement {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAgentLoginActive = pathname === "/agent/login";

  function closeMobileMenu(): void {
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu(): void {
    setIsMobileMenuOpen((currentValue) => !currentValue);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-surface-card/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-[72px] max-w-container items-center justify-between px-md sm:px-lg">
        <Link
          className="flex items-center gap-sm rounded-lg bg-logo-surface px-xs py-xs text-title-md"
          href="/"
          onClick={closeMobileMenu}
        >
          <Image
            className="h-auto w-[132px]"
            src="/logo-wordmark-640.png"
            alt="Prime Property"
            width={264}
            height={88}
            loading="eager"
            sizes="132px"
            unoptimized
          />
        </Link>

        <nav className="hidden items-center gap-sm md:flex">
          {navItems.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={[
                  "group relative inline-flex min-h-10 items-center rounded-lg px-md py-xs text-nav-link transition-all duration-200",
                  isActive
                    ? "bg-accent-gold/15 text-text-primary"
                    : "text-text-secondary hover:bg-surface-muted hover:text-text-primary",
                ].join(" ")}
                href={item.href}
                key={item.href}
              >
                <span className="relative z-10">{item.label}</span>

                <span
                  className={[
                    "absolute bottom-[7px] left-md right-md h-[2px] rounded-full bg-accent-gold transition-all duration-300 ease-out",
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-70",
                  ].join(" ")}
                />

                <span
                  className={[
                    "absolute right-xs top-xs h-1.5 w-1.5 rounded-full bg-accent-gold transition-all duration-300 ease-out",
                    isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-sm">
          <ThemeToggle />

          <Link
            aria-current={isAgentLoginActive ? "page" : undefined}
            className={[
              "hidden min-h-10 items-center gap-xs rounded-lg border px-md py-xs text-button-md transition-all duration-200 sm:inline-flex",
              isAgentLoginActive
                ? "border-accent-gold bg-accent-gold text-prime-black shadow-sm"
                : "border-accent-gold text-text-primary hover:bg-accent-gold hover:text-prime-black",
            ].join(" ")}
            href="/agent/login"
          >
            <LogIn aria-hidden="true" size={16} />
            <span>Login Agent</span>
          </Link>

          <button
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
            className={[
              "inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-default text-text-primary transition-all duration-200 md:hidden",
              isMobileMenuOpen
                ? "bg-accent-gold text-prime-black"
                : "bg-transparent hover:bg-surface-muted",
            ].join(" ")}
            onClick={toggleMobileMenu}
            type="button"
          >
            <span className="relative h-[18px] w-[18px]">
              <Menu
                aria-hidden="true"
                className={[
                  "absolute inset-0 transition-all duration-200 ease-out",
                  isMobileMenuOpen
                    ? "rotate-90 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100",
                ].join(" ")}
                size={18}
              />

              <X
                aria-hidden="true"
                className={[
                  "absolute inset-0 transition-all duration-200 ease-out",
                  isMobileMenuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0",
                ].join(" ")}
                size={18}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={[
          "overflow-hidden bg-surface-card shadow-lg transition-all duration-300 ease-out md:hidden",
          isMobileMenuOpen
            ? "max-h-[360px] border-t border-border-default opacity-100"
            : "max-h-0 border-t-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div
          className={[
            "px-lg py-md transition-all duration-300 ease-out",
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-3",
          ].join(" ")}
        >
          <nav className="flex flex-col gap-xs">
            {navItems.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative overflow-hidden rounded-lg border px-md py-sm text-body-sm font-semibold transition-all duration-200",
                    isActive
                      ? "border-accent-gold bg-accent-gold text-prime-black shadow-sm"
                      : "border-transparent text-text-primary hover:border-border-default hover:bg-surface-muted",
                  ].join(" ")}
                  href={item.href}
                  key={item.href}
                  onClick={closeMobileMenu}
                >
                  <span
                    className={[
                      "absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-prime-black transition-all duration-300 ease-out",
                      isActive ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                    ].join(" ")}
                  />

                  <span className="relative flex items-center justify-between gap-sm">
                    <span>{item.label}</span>

                    <span
                      className={[
                        "h-2 w-2 rounded-full bg-prime-black transition-all duration-300 ease-out",
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      ].join(" ")}
                    />
                  </span>
                </Link>
              );
            })}

            <Link
              aria-current={isAgentLoginActive ? "page" : undefined}
              className={[
                "mt-sm inline-flex min-h-11 items-center justify-center gap-xs rounded-lg border px-md py-sm text-body-sm font-semibold transition-all duration-200",
                isAgentLoginActive
                  ? "border-accent-gold bg-accent-gold text-prime-black shadow-sm"
                  : "border-accent-gold text-text-primary hover:bg-accent-gold hover:text-prime-black",
              ].join(" ")}
              href="/agent/login"
              onClick={closeMobileMenu}
            >
              <LogIn aria-hidden="true" size={16} />
              <span>Login Agent</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
