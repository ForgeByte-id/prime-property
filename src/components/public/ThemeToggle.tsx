"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useSyncExternalStore } from "react";

type ThemeMode = "light" | "dark";

function getThemeSnapshot(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem("prime-theme") === "dark" ? "dark" : "light";
}

function getServerThemeSnapshot(): ThemeMode {
  return "light";
}

function subscribeTheme(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("prime-theme-change", onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("prime-theme-change", onStoreChange);
  };
}

export function ThemeToggle(): React.ReactElement {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleTheme(): void {
    const nextTheme: ThemeMode = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("prime-theme", nextTheme);
    window.dispatchEvent(new Event("prime-theme-change"));
  }

  return (
    <button
      aria-label={theme === "light" ? "Aktifkan mode gelap" : "Aktifkan mode terang"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-default text-text-primary transition hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-gold"
      onClick={toggleTheme}
      type="button"
    >
      {theme === "light" ? (
        <Moon aria-hidden="true" size={17} />
      ) : (
        <Sun aria-hidden="true" size={17} />
      )}
    </button>
  );
}
