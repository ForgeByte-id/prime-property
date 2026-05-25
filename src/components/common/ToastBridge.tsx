"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Info, Loader2, X } from "lucide-react";

const toastMessages: Record<string, string> = {
  login_success: "Login berhasil.",
  logout_success: "Logout berhasil.",
  property_created: "Properti berhasil dibuat.",
  property_updated: "Properti berhasil diperbarui.",
  property_deleted: "Properti berhasil dihapus.",
  auth_required: "Silakan login untuk melanjutkan.",
};

interface ToastState {
  message: string;
  title?: string;
  tone: "success" | "error" | "info" | "loading";
}

export function ToastBridge(): React.ReactElement | null {
  const [toast, setToast] = useState<ToastState | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const toastKey = searchParams.get("toast");
    if (!toastKey) return;

    window.queueMicrotask(() => {
      setToast({ message: toastMessages[toastKey] ?? toastKey, tone: "success" });
    });

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("toast");
    const nextUrl = nextParams.toString() ? `${pathname}?${nextParams.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  useEffect(() => {
    function handleToast(event: Event): void {
      const detail = (event as CustomEvent<ToastState>).detail;
      setToast(detail);
    }

    window.addEventListener("prime:toast", handleToast);
    return () => window.removeEventListener("prime:toast", handleToast);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), toast.tone === "loading" ? 1600 : 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  const Icon = toast.tone === "error" ? AlertCircle : toast.tone === "loading" ? Loader2 : toast.tone === "info" ? Info : CheckCircle2;

  return (
    <div className="fixed bottom-5 right-5 z-[80] w-[min(360px,calc(100vw-32px))] overflow-hidden rounded-lg border border-prime-black/10 bg-white text-prime-black shadow-2xl">
      <div className="flex items-start gap-sm p-md">
        <span className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${toast.tone === "error" ? "bg-red-50 text-accent-red" : toast.tone === "loading" ? "bg-soft-gray text-prime-black" : "bg-green-50 text-status-success"}`}>
          <Icon aria-hidden="true" className={toast.tone === "loading" ? "animate-spin" : ""} size={19} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-body-sm font-bold">{toast.title ?? toastTitle(toast.tone)}</p>
          <p className="mt-xxs text-caption text-text-secondary">{toast.message}</p>
        </div>
        <button className="rounded p-xxs text-text-muted transition hover:bg-soft-gray hover:text-prime-black" onClick={() => setToast(null)} type="button">
          <X aria-hidden="true" size={16} />
        </button>
      </div>
      <div className={toast.tone === "error" ? "h-1 bg-accent-red" : toast.tone === "loading" ? "h-1 bg-accent-gold" : "h-1 bg-status-success"} />
    </div>
  );
}

function toastTitle(tone: ToastState["tone"]): string {
  if (tone === "error") return "Gagal";
  if (tone === "loading") return "Memuat";
  if (tone === "info") return "Info";
  return "Berhasil";
}

export function showToast(message: string, tone: ToastState["tone"] = "success", title?: string): void {
  window.dispatchEvent(new CustomEvent("prime:toast", { detail: { message, tone, title } }));
}
