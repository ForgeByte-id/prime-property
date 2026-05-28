"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { CSRF_HEADER_NAME } from "@/lib/security/csrf";
import { getClientCsrfToken } from "@/lib/security/client-csrf";

export function ContactForm(): React.ReactElement {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [CSRF_HEADER_NAME]: getClientCsrfToken(),
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    setStatus(response.ok ? "success" : "error");
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form className="contact-form-card self-start" onSubmit={handleSubmit}>
      <div className="mb-lg border-b border-border-default pb-md">
        <p className="text-caption font-semibold text-text-primary">Form Konsultasi</p>
        <h2 className="mt-xs text-title-lg text-text-primary">Kirim kebutuhan awal.</h2>
      </div>
      <div className="grid gap-md sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="name">
            Nama
          </label>
          <input className="field-input" id="name" name="name" required minLength={3} />
        </div>
        <div>
          <label className="field-label" htmlFor="phone">
            Nomor HP
          </label>
          <input className="field-input" id="phone" name="phone" required />
        </div>
      </div>
      <div className="mt-md">
        <label className="field-label" htmlFor="email">
          Email
        </label>
        <input className="field-input" id="email" name="email" required type="email" />
      </div>
      <div className="mt-md">
        <label className="field-label" htmlFor="message">
          Pesan
        </label>
        <textarea className="field-input min-h-32" id="message" name="message" required minLength={10} />
      </div>
      {status === "success" ? (
        <p className="mt-md text-body-sm text-status-success">Pesan berhasil dikirim.</p>
      ) : null}
      {status === "error" ? (
        <p className="mt-md text-body-sm text-accent-red">Pesan gagal dikirim. Periksa input Anda.</p>
      ) : null}
      <button className="btn-primary mt-lg w-full gap-xs sm:w-auto" type="submit">
        <Send aria-hidden="true" size={17} />
        <span>Kirim Pesan</span>
      </button>
    </form>
  );
}
