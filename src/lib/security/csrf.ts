import { NextRequest, NextResponse } from "next/server";

export const CSRF_COOKIE_NAME = "pp_csrf";
export const CSRF_HEADER_NAME = "x-csrf-token";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function generateCsrfToken(): string {
  return crypto.randomUUID();
}

export function ensureCsrfCookie(response: NextResponse, request: NextRequest): NextResponse {
  if (request.cookies.get(CSRF_COOKIE_NAME)?.value) return response;

  response.cookies.set(CSRF_COOKIE_NAME, generateCsrfToken(), {
    httpOnly: false,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return response;
}

export function isSafeMethod(method: string): boolean {
  return SAFE_METHODS.has(method);
}

export async function validateCsrfToken(request: NextRequest): Promise<boolean> {
  if (isSafeMethod(request.method)) return true;

  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);
  if (cookieToken && headerToken && cookieToken === headerToken) return true;

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/x-www-form-urlencoded") && !contentType.includes("multipart/form-data")) {
    return false;
  }

  const formData = await request.clone().formData();
  return cookieToken === formData.get("csrfToken");
}
