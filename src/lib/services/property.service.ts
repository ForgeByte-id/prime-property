import { createSupabaseAdminClient } from "@/lib/db/supabase";
import type { PropertyCreateInput } from "@/lib/validation";
import type { SessionUser } from "@/types/user";

function toPropertyRow(input: PropertyCreateInput, user: SessionUser): Record<string, unknown> {
  return {
    nama_property: input.namaProperty,
    property_group: input.group,
    lebar_meter: input.lebarMeter,
    panjang_meter: input.panjangMeter,
    hadap: input.hadap,
    tipe: input.tipe,
    tingkat: input.tingkat,
    price_rupiah: input.priceRupiah.toString(),
    carport: input.carport,
    status: input.status,
    siap: input.siap,
    maps_link: input.mapsLink ?? null,
    kawasan: input.kawasan,
    unit: input.unit,
    is_featured: input.isFeatured,
    created_by: user.id,
  };
}

export async function createProperty(input: PropertyCreateInput, user: SessionUser): Promise<{ id: string }> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("properties")
    .insert(toPropertyRow(input, user))
    .select("id")
    .single<{ id: string }>();

  if (error || !data) {
    throw new Error(error?.message ?? "Gagal membuat properti.");
  }

  return data;
}

export async function softDeleteProperty(id: string, user: SessionUser): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("properties")
    .update({ deleted_at: new Date().toISOString(), updated_by: user.id })
    .eq("id", id)
    .is("deleted_at", null);

  if (error) {
    throw new Error(error.message);
  }
}
