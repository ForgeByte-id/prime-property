export const HADAP_OPTIONS = ["Utara", "Selatan", "Timur", "Barat"] as const;
export const PROPERTY_TYPE_OPTIONS = ["Rumah", "Villa", "Tanah", "Ruko", "Apartemen"] as const;
export const PROPERTY_STATUS_OPTIONS = ["in_stock", "sold_out", "reserved"] as const;
export const SIAP_OPTIONS = ["Siap Huni", "Indent", "Renovasi"] as const;

export type Hadap = (typeof HADAP_OPTIONS)[number];
export type PropertyType = (typeof PROPERTY_TYPE_OPTIONS)[number];
export type PropertyStatus = (typeof PROPERTY_STATUS_OPTIONS)[number];
export type SiapStatus = (typeof SIAP_OPTIONS)[number];

export interface Property {
  id: string;
  namaProperty: string;
  group: string;
  lebarMeter: number;
  panjangMeter: number;
  hadap: Hadap[];
  tipe: PropertyType;
  tingkat: number;
  priceRupiah: bigint;
  carport: number;
  status: PropertyStatus;
  siap: SiapStatus;
  mapsLink: string | null;
  kawasan: string;
  unit: string;
  isFeatured: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PropertyFilter {
  search?: string;
  kawasan?: string[];
  lebarMin?: number;
  hadap?: Hadap[];
  hargaMax?: bigint;
  tipe?: PropertyType[];
  status?: PropertyStatus[];
  siap?: SiapStatus[];
  carportMin?: number;
  page?: number;
  perPage?: 10 | 20 | 50 | 100;
}
