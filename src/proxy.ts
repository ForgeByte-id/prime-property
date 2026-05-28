import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth/session";
import {
    ensureCsrfCookie,
    isSafeMethod,
    validateCsrfToken,
} from "@/lib/security/csrf";
import { assertRateLimit, RateLimitError } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/utils/http";

const protectedAgentPaths = [
    "/agent/dashboard",
    "/agent/properties",
    "/agent/admins",
    "/agent/audit-logs",
];

const superadminPagePaths = [
    "/agent/properties/new",
    "/agent/admins",
    "/agent/audit-logs",
];

const superadminApiMutationPaths = ["/api/properties", "/api/admins"];
const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function isProtectedAgentPath(pathname: string): boolean {
    return protectedAgentPaths.some((path) => pathname.startsWith(path));
}

function isSuperadminPagePath(pathname: string): boolean {
    return superadminPagePaths.some((path) => pathname.startsWith(path));
}

function isSuperadminApiMutationPath(pathname: string): boolean {
    return superadminApiMutationPaths.some((path) => pathname.startsWith(path));
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl;
    const ipAddress = getClientIp(request.headers);

    try {
        assertRateLimit({
            key: `global:${ipAddress}`,
            limit: 100,
            windowMs: 60 * 1000,
        });
    } catch (error) {
        if (error instanceof RateLimitError) {
            return NextResponse.json(
                { error: "Terlalu banyak request. Coba lagi nanti." },
                {
                    status: 429,
                    headers: { "Retry-After": String(error.retryAfterSeconds) },
                },
            );
        }

        throw error;
    }

    if (
        pathname.startsWith("/api/") &&
        !isSafeMethod(request.method) &&
        !(await validateCsrfToken(request))
    ) {
        return NextResponse.json(
            { error: "CSRF token tidak valid." },
            { status: 403 },
        );
    }

    const user = await getSessionUserFromRequest(request);

    if (isProtectedAgentPath(pathname) && !user) {
        const loginUrl = new URL("/agent/login", request.url);
        loginUrl.searchParams.set("next", pathname);

        return ensureCsrfCookie(NextResponse.redirect(loginUrl), request);
    }

    if (isSuperadminPagePath(pathname) && user?.role !== "superadmin") {
        return ensureCsrfCookie(
            NextResponse.redirect(new URL("/forbidden", request.url)),
            request,
        );
    }

    if (
        unsafeMethods.has(request.method) &&
        isSuperadminApiMutationPath(pathname) &&
        user?.role !== "superadmin"
    ) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return ensureCsrfCookie(NextResponse.next(), request);
}

export const config = {
    matcher: ["/agent/:path*", "/contact", "/api/:path*"],
};