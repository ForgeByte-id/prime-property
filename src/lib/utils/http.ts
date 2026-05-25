import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { RateLimitError } from "@/lib/security/rate-limit";

export function getClientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { error: "Validasi gagal.", fields: error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  if (error instanceof RateLimitError) {
    return NextResponse.json(
      { error: "Terlalu banyak request. Coba lagi nanti." },
      {
        status: 429,
        headers: { "Retry-After": String(error.retryAfterSeconds) },
      },
    );
  }

  console.error("[API_ERROR]", error);
  return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
}
