import { NextRequest, NextResponse } from "next/server";
import { hasRole } from "@/lib/auth/rbac";
import { getSessionUserFromRequest } from "@/lib/auth/session";
import { createSupabaseAdminClient } from "@/lib/db/supabase";
import { handleApiError } from "@/lib/utils/http";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await getSessionUserFromRequest(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!hasRole(user, ["superadmin"])) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const page = Math.max(Number(request.nextUrl.searchParams.get("page") ?? 1), 1);
    const perPage = Math.min(Math.max(Number(request.nextUrl.searchParams.get("per_page") ?? 50), 1), 100);
    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    const { data, error, count } = await createSupabaseAdminClient()
      .from("audit_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw new Error(error.message);
    return NextResponse.json({
      data: data ?? [],
      meta: {
        page,
        perPage,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / perPage),
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
