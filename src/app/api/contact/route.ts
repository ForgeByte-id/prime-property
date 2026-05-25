import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/db/supabase";
import { ContactMessageSchema } from "@/lib/validation";
import { getClientIp, handleApiError } from "@/lib/utils/http";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const input = ContactMessageSchema.parse(await request.json());
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      ip_address: getClientIp(request.headers),
      user_agent: request.headers.get("user-agent") ?? "unknown",
    });

    if (error) throw new Error(error.message);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
