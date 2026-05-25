"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { CSRF_HEADER_NAME } from "@/lib/security/csrf";
import { getClientCsrfToken } from "@/lib/security/client-csrf";

export function LoginForm(): React.ReactElement {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [CSRF_HEADER_NAME]: getClientCsrfToken(),
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        window.location.assign("/agent/dashboard?toast=login_success");
        return;
      }

      const result = (await response.json()) as { error?: string };
      setError(result.error ?? "Login gagal.");
    } catch {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit}
    >
      <div className="mb-lg">
        <p className="section-kicker">Login Agent</p>
        <h1 className="mt-xs text-display-md text-text-primary">Masuk ke Portal</h1>
        <p className="mt-xs text-body-sm text-text-secondary">
          Gunakan email dan password akun internal.
        </p>
      </div>

      <div className="space-y-md">
        <div>
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <input
            autoComplete="email"
            className="field-input"
            id="email"
            name="email"
            placeholder="email@primeproperty.id"
            required
            type="email"
          />
        </div>

        <div>
          <label className="field-label" htmlFor="password">
            Password
          </label>
          <div className="relative mt-xs">
            <input
              autoComplete="current-password"
              className="field-input !mt-0 pr-12"
              id="password"
              name="password"
              placeholder="Masukkan password"
              required
              type={isPasswordVisible ? "text" : "password"}
            />
            <button
              aria-label={isPasswordVisible ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-soft-gray hover:text-accent-gold"
              onClick={() => setIsPasswordVisible((current) => !current)}
              type="button"
            >
              {isPasswordVisible ? (
                <EyeOff aria-hidden="true" size={18} />
              ) : (
                <Eye aria-hidden="true" size={18} />
              )}
            </button>
          </div>
        </div>
      </div>

      {error ? (
        <div className="mt-md rounded-xl border border-accent-red bg-red-50 px-md py-sm text-body-sm text-accent-red">
          {error}
        </div>
      ) : null}

      <button className="btn-primary animated-cta mt-lg w-full" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
}
