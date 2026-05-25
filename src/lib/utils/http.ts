import { NextResponse } from "next/server";
import { ZodError } from "zod";

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

  console.error("[API_ERROR]", error);
  return NextResponse.json({ error: "Terjadi kesalahan server." }, { status: 500 });
}
