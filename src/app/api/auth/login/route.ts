import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, getSessionCookieName, getSessionMaxAgeSeconds } from "@/lib/auth/session";
import { authenticateUser } from "@/lib/services/auth.service";
import { LoginSchema } from "@/lib/validation";
import { handleApiError } from "@/lib/utils/http";

export const runtime = "nodejs";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const credentials = LoginSchema.parse(body);
    const result = await authenticateUser(credentials.email, credentials.password);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    const token = await createSessionToken(result.user);
    const response = NextResponse.json({ success: true });
    response.cookies.set(getSessionCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: getSessionMaxAgeSeconds(),
    });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
