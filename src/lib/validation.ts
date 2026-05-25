import { z } from "zod";
import {
  HADAP_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  SIAP_OPTIONS,
} from "@/types/property";

const bigintRupiahSchema = z
  .union([z.string(), z.number(), z.bigint()])
  .transform((value, context) => {
    try {
      const parsed = BigInt(value);
      if (parsed <= 0n) {
        context.addIssue({ code: z.ZodIssueCode.custom, message: "Harga harus lebih dari 0" });
        return z.NEVER;
      }
      return parsed;
    } catch {
      context.addIssue({ code: z.ZodIssueCode.custom, message: "Harga harus berupa integer Rupiah" });
      return z.NEVER;
    }
  });

export const LoginSchema = z.object({
  email: z.string().email("Email tidak valid").max(255, "Email terlalu panjang"),
  password: z.string().min(6, "Password minimal 6 karakter").max(128, "Password terlalu panjang"),
});

export const ContactMessageSchema = z.object({
  name: z.string().trim().min(3, "Nama minimal 3 karakter").max(120, "Nama terlalu panjang"),
  email: z.string().trim().email("Email tidak valid").max(255, "Email terlalu panjang"),
  phone: z.string().trim().min(8, "Nomor HP minimal 8 karakter").max(30, "Nomor HP terlalu panjang"),
  message: z.string().trim().min(10, "Pesan minimal 10 karakter").max(2000, "Pesan terlalu panjang"),
});

export const PropertyCreateSchema = z.object({
  namaProperty: z.string().trim().min(3, "Nama properti minimal 3 karakter").max(140, "Nama properti terlalu panjang"),
  group: z.string().trim().min(2, "Group minimal 2 karakter").max(80, "Group terlalu panjang"),
  lebarMeter: z.coerce.number().positive("Lebar harus lebih dari 0").multipleOf(0.01, "Lebar maksimal 2 desimal"),
  panjangMeter: z.coerce.number().positive("Panjang harus lebih dari 0").multipleOf(0.01, "Panjang maksimal 2 desimal"),
  hadap: z.array(z.enum(HADAP_OPTIONS)).min(1, "Pilih minimal satu arah hadap"),
  tipe: z.enum(PROPERTY_TYPE_OPTIONS),
  tingkat: z.coerce.number().int("Tingkat harus integer").min(0, "Tingkat minimal 0").max(100, "Tingkat terlalu besar"),
  priceRupiah: bigintRupiahSchema,
  carport: z.coerce.number().int("Carport harus integer").min(0, "Carport minimal 0").max(100, "Carport terlalu besar"),
  status: z.enum(PROPERTY_STATUS_OPTIONS),
  siap: z.enum(SIAP_OPTIONS),
  mapsLink: z.string().trim().url("Link maps tidak valid").max(1000, "Link maps terlalu panjang").nullable().optional(),
  kawasan: z.string().trim().min(2, "Kawasan minimal 2 karakter").max(100, "Kawasan terlalu panjang"),
  unit: z.string().trim().min(1, "Unit wajib diisi").max(80, "Unit terlalu panjang"),
  isFeatured: z.boolean().default(false),
});

export const PropertyQuerySchema = z.object({
  search: z.string().trim().max(120).optional(),
  kawasan: z.string().trim().optional(),
  hadap: z.string().trim().optional(),
  hargaMax: bigintRupiahSchema.optional(),
  tipe: z.string().trim().optional(),
  status: z.string().trim().optional(),
  siap: z.string().trim().optional(),
  carportMin: z.coerce.number().int().min(0).optional(),
  page: z.coerce.number().int().min(1).default(1),
  perPage: z.coerce.number().int().refine((value) => [25, 50, 100].includes(value), "Per page harus 25, 50, atau 100").default(50),
});

export type PropertyCreateInput = z.infer<typeof PropertyCreateSchema>;
