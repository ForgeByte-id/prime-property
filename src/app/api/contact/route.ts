import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/db/supabase";
import { assertRateLimit } from "@/lib/security/rate-limit";
import { sendContactNotification } from "@/lib/services/email.service";
import { ContactMessageSchema } from "@/lib/validation";
import { getClientIp, handleApiError } from "@/lib/utils/http";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const input = ContactMessageSchema.parse(await request.json());
    const ipAddress = getClientIp(request.headers);
    assertRateLimit({
      key: `contact:${ipAddress}`,
      limit: 3,
      windowMs: 60 * 60 * 1000,
    });
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
      ip_address: ipAddress,
      user_agent: request.headers.get("user-agent") ?? "unknown",
    });

    if (error) throw new Error(error.message);
    await sendContactNotification(input);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
