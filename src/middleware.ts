import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth/session";

const protectedAgentPaths = ["/agent/dashboard", "/agent/properties", "/agent/admins", "/agent/audit-logs"];
const superadminPagePaths = ["/agent/properties/new", "/agent/admins", "/agent/audit-logs"];
const superadminApiMutationPaths = ["/api/properties", "/api/admins"];
const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const user = await getSessionUserFromRequest(request);

  if (protectedAgentPaths.some((path) => pathname.startsWith(path)) && !user) {
    const loginUrl = new URL("/agent/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (superadminPagePaths.some((path) => pathname.startsWith(path)) && user?.role !== "superadmin") {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  if (
    unsafeMethods.has(request.method) &&
    superadminApiMutationPaths.some((path) => pathname.startsWith(path)) &&
    user?.role !== "superadmin"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/agent/:path*", "/api/properties/:path*", "/api/admins/:path*"],
};
