import { NextRequest, NextResponse } from "next/server";
import { getSessionUserFromRequest } from "@/lib/auth/session";
import { canMutateProperty } from "@/lib/auth/rbac";
import { createProperty } from "@/lib/services/property.service";
import { recordAuditLog } from "@/lib/services/audit.service";
import { PropertyCreateSchema, PropertyQuerySchema } from "@/lib/validation";
import { getClientIp, handleApiError } from "@/lib/utils/http";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const user = await getSessionUserFromRequest(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const filters = PropertyQuerySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
  return NextResponse.json({
    data: [],
    meta: {
      filters,
      page: filters.page,
      perPage: filters.perPage,
      total: 0,
      debounceMs: 300,
    },
  });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const user = await getSessionUserFromRequest(request);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (!canMutateProperty(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const input = PropertyCreateSchema.parse(await request.json());
    const created = await createProperty(input, user);
    await recordAuditLog({
      actorUserId: user.id,
      entityType: "property",
      entityId: created.id,
      action: "create",
      newValues: { ...input, priceRupiah: input.priceRupiah.toString() },
      ipAddress: getClientIp(request.headers),
      userAgent: request.headers.get("user-agent") ?? "unknown",
    });

    return NextResponse.json({ success: true, id: created.id }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
