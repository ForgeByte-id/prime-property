import { createSupabaseAdminClient } from "@/lib/db/supabase";
import type { PropertyCreateInput, PropertyQueryInput } from "@/lib/validation";
import type { Property } from "@/types/property";
import type { SessionUser } from "@/types/user";

interface PropertyRow {
  id: string;
  nama_property: string;
  property_group: string;
  lebar_meter: number;
  panjang_meter: number;
  hadap: string[];
  tipe: Property["tipe"];
  tingkat: number;
  price_rupiah: number | string;
  carport: number;
  status: Property["status"];
  siap: Property["siap"];
  maps_link: string | null;
  kawasan: string;
  unit: string;
  is_featured: boolean;
  created_by: string;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface PaginatedProperties {
  data: Property[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

const PROPERTY_COLUMNS = [
  "id",
  "nama_property",
  "property_group",
  "lebar_meter",
  "panjang_meter",
  "hadap",
  "tipe",
  "tingkat",
  "price_rupiah",
  "carport",
  "status",
  "siap",
  "maps_link",
  "kawasan",
  "unit",
  "is_featured",
  "created_by",
  "updated_by",
  "created_at",
  "updated_at",
  "deleted_at",
].join(",");

function csv(value: string | undefined): string[] {
  return value
    ? value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];
}

function sanitizeSearch(value: string): string {
  return value.replaceAll("%", "\\%").replaceAll("_", "\\_").replaceAll(",", " ");
}

function toProperty(row: PropertyRow): Property {
  return {
    id: row.id,
    namaProperty: row.nama_property,
    group: row.property_group,
    lebarMeter: Number(row.lebar_meter),
    panjangMeter: Number(row.panjang_meter),
    hadap: row.hadap as Property["hadap"],
    tipe: row.tipe,
    tingkat: row.tingkat,
    priceRupiah: BigInt(row.price_rupiah),
    carport: row.carport,
    status: row.status,
    siap: row.siap,
    mapsLink: row.maps_link,
    kawasan: row.kawasan,
    unit: row.unit,
    isFeatured: row.is_featured,
    createdBy: row.created_by,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    deletedAt: row.deleted_at,
  };
}

export function serializeProperty(property: Property): Record<string, unknown> {
  return {
    ...property,
    priceRupiah: property.priceRupiah.toString(),
  };
}

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
    updated_by: user.id,
  };
}

export async function listProperties(filters: PropertyQueryInput): Promise<PaginatedProperties> {
  const supabase = createSupabaseAdminClient();
  const perPage = filters.per_page ?? filters.perPage;
  const page = filters.page;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  const sortColumn =
    filters.sort_by === "price" ? "price_rupiah" : (filters.sort_by ?? filters.sortBy);
  const sortDir = filters.sort_dir ?? filters.sortDir;

  let query = supabase
    .from("properties")
    .select(PROPERTY_COLUMNS, { count: "exact" })
    .is("deleted_at", null);

  const search = filters.search ?? filters.q;
  if (search) {
    const term = sanitizeSearch(search);
    query = query.or(
      `nama_property.ilike.%${term}%,property_group.ilike.%${term}%,kawasan.ilike.%${term}%`,
    );
  }

  const kawasan = csv(filters.kawasan);
  if (kawasan.length > 0) query = query.in("kawasan", kawasan);

  const tipe = csv(filters.tipe);
  if (tipe.length > 0) query = query.in("tipe", tipe);

  const status = csv(filters.status);
  if (status.length > 0) query = query.in("status", status);

  const siap = csv(filters.siap);
  if (siap.length > 0) query = query.in("siap", siap);

  const hadap = csv(filters.hadap);
  if (hadap.length > 0) query = query.contains("hadap", hadap);

  const lebarMin = filters.lebarMin ?? filters.lebar_min;
  if (lebarMin !== undefined) query = query.gte("lebar_meter", lebarMin);

  const hargaMax = filters.hargaMax ?? filters.price_max;
  if (hargaMax !== undefined) query = query.lte("price_rupiah", hargaMax.toString());

  if (filters.carport !== undefined) {
    query = query.eq("carport", filters.carport);
  } else if (filters.carportMin !== undefined) {
    query = query.gte("carport", filters.carportMin);
  }

  const { data, error, count } = await query
    .order(sortColumn, { ascending: sortDir === "asc" })
    .range(from, to)
    .returns<PropertyRow[]>();

  if (error) throw new Error(error.message);

  const total = count ?? 0;
  return {
    data: (data ?? []).map(toProperty),
    meta: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
  };
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("properties")
    .select(PROPERTY_COLUMNS)
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle<PropertyRow>();

  if (error) throw new Error(error.message);
  return data ? toProperty(data) : null;
}

export async function createProperty(input: PropertyCreateInput, user: SessionUser): Promise<Property> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("properties")
    .insert({ ...toPropertyRow(input, user), created_by: user.id })
    .select(PROPERTY_COLUMNS)
    .single<PropertyRow>();

  if (error || !data) {
    throw new Error(error?.message ?? "Gagal membuat properti.");
  }

  return toProperty(data);
}

export async function updateProperty(id: string, input: PropertyCreateInput, user: SessionUser): Promise<Property> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("properties")
    .update(toPropertyRow(input, user))
    .eq("id", id)
    .is("deleted_at", null)
    .select(PROPERTY_COLUMNS)
    .single<PropertyRow>();

  if (error || !data) {
    throw new Error(error?.message ?? "Gagal mengubah properti.");
  }

  return toProperty(data);
}

export async function softDeleteProperty(id: string, user: SessionUser): Promise<Property | null> {
  const existing = await getPropertyById(id);
  if (!existing) return null;

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase
    .from("properties")
    .update({ deleted_at: new Date().toISOString(), updated_by: user.id })
    .eq("id", id)
    .is("deleted_at", null);

  if (error) {
    throw new Error(error.message);
  }

  return existing;
}
