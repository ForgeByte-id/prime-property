import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { NextRequest } from "next/server";
import type { SessionUser, UserRole } from "@/types/user";

const SESSION_COOKIE_NAME = "pp_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const textEncoder = new TextEncoder();

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlToBytes(value: string): Uint8Array<ArrayBuffer> {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function base64UrlEncode(value: string): string {
  return bytesToBase64Url(textEncoder.encode(value));
}

function base64UrlDecode(value: string): string {
  return new TextDecoder().decode(base64UrlToBytes(value));
}

async function getSigningKey(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must contain at least 32 characters.");
  }

  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signPayload(payload: string): Promise<string> {
  const signature = await crypto.subtle.sign("HMAC", await getSigningKey(), textEncoder.encode(payload));
  return bytesToBase64Url(new Uint8Array(signature));
}

async function verifyPayload(payload: string, signature: string): Promise<boolean> {
  return crypto.subtle.verify(
    "HMAC",
    await getSigningKey(),
    base64UrlToBytes(signature),
    textEncoder.encode(payload),
  );
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}

export function getSessionMaxAgeSeconds(): number {
  return SESSION_MAX_AGE_SECONDS;
}

export async function createSessionToken(user: {
  id: string;
  email: string;
  role: UserRole;
}): Promise<string> {
  const payload = base64UrlEncode(
    JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
    } satisfies SessionUser),
  );
  const signature = await signPayload(payload);
  return `${payload}.${signature}`;
}

export async function getSessionFromCookie(
  token: string | undefined,
): Promise<SessionUser | null> {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  if (!(await verifyPayload(payload, signature))) return null;

  const session = JSON.parse(base64UrlDecode(payload)) as SessionUser;
  if (session.exp <= Math.floor(Date.now() / 1000)) return null;
  return session;
}

export async function getSessionUserFromRequest(request: NextRequest): Promise<SessionUser | null> {
  return getSessionFromCookie(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

export async function getSessionUserFromCookies(cookies: ReadonlyRequestCookies): Promise<SessionUser | null> {
  return getSessionFromCookie(cookies.get(SESSION_COOKIE_NAME)?.value);
}
