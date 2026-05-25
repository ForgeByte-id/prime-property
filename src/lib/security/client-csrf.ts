import { CSRF_COOKIE_NAME } from "@/lib/security/csrf";

export function getClientCsrfToken(): string {
  const token = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(`${CSRF_COOKIE_NAME}=`))
    ?.split("=")[1];

  return token ? decodeURIComponent(token) : "";
}
