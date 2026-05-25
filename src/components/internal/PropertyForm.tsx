"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { CSRF_HEADER_NAME } from "@/lib/security/csrf";
import { getClientCsrfToken } from "@/lib/security/client-csrf";

export interface EditableProperty {
  id?: string;
  namaProperty: string;
  group: string;
  lebarMeter: number;
  panjangMeter: number;
  hadap: string[];
  tipe: string;
  tingkat: number;
  priceRupiah: string;
  carport: number;
  status: string;
  siap: string;
  mapsLink: string | null;
  kawasan: string;
  unit: string;
  isFeatured: boolean;
}

interface PropertyFormProps {
  initialProperty?: EditableProperty;
}

const defaultProperty: EditableProperty = {
  namaProperty: "",
  group: "",
  lebarMeter: 0,
  panjangMeter: 0,
  hadap: ["Utara"],
  tipe: "Ruko",
  tingkat: 1,
  priceRupiah: "",
  carport: 0,
  status: "in_stock",
  siap: "Siap Huni",
  mapsLink: "",
  kawasan: "",
  unit: "",
  isFeatured: false,
};

export function PropertyForm({ initialProperty }: PropertyFormProps): React.ReactElement {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const property = initialProperty ?? defaultProperty;
  const isEdit = Boolean(initialProperty?.id);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      namaProperty: formData.get("namaProperty"),
      group: formData.get("group"),
      lebarMeter: formData.get("lebarMeter"),
      panjangMeter: formData.get("panjangMeter"),
      hadap: formData.getAll("hadap"),
      tipe: formData.get("tipe"),
      tingkat: formData.get("tingkat"),
      priceRupiah: formData.get("priceRupiah"),
      carport: formData.get("carport"),
      status: formData.get("status"),
      siap: formData.get("siap"),
      mapsLink: formData.get("mapsLink") || null,
      kawasan: formData.get("kawasan"),
      unit: formData.get("unit"),
      isFeatured: formData.get("isFeatured") === "on",
    };

    const response = await fetch(isEdit ? `/api/properties/${initialProperty?.id}` : "/api/properties", {
      method: isEdit ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        [CSRF_HEADER_NAME]: getClientCsrfToken(),
      },
      body: JSON.stringify(payload),
    });

    setIsSubmitting(false);
    if (!response.ok) {
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      setError(result.error ?? "Gagal menyimpan properti.");
      return;
    }

    const result = (await response.json()) as { id?: string; data?: { id: string } };
    router.push(
      `/agent/properties/${result.data?.id ?? result.id ?? initialProperty?.id}?toast=${
        isEdit ? "property_updated" : "property_created"
      }`,
    );
    router.refresh();
  }

  return (
    <form className="dashboard-surface p-md sm:p-lg" onSubmit={handleSubmit}>
      <div className="mb-lg border-b border-prime-black/5 pb-md">
        <h2 className="text-title-md">{isEdit ? "Form Edit Properti" : "Form Tambah Properti"}</h2>
        <p className="mt-xs text-caption text-text-muted">Pastikan data wajib terisi sebelum menyimpan.</p>
      </div>

      <div className="grid gap-md lg:grid-cols-2">
        <TextInput defaultValue={property.namaProperty} label="Nama Properti" name="namaProperty" required />
        <TextInput defaultValue={property.group} label="Group" name="group" required />
        <NumberInput defaultValue={property.lebarMeter} label="Lebar" name="lebarMeter" required step="0.01" />
        <NumberInput defaultValue={property.panjangMeter} label="Panjang" name="panjangMeter" required step="0.01" />
        <SelectInput defaultValue={property.tipe} label="Tipe" name="tipe" options={["Rumah", "Villa", "Tanah", "Ruko", "Apartemen"]} />
        <NumberInput defaultValue={property.tingkat} label="Tingkat" name="tingkat" required />
        <NumberInput defaultValue={property.priceRupiah} label="Harga Rupiah" name="priceRupiah" required />
        <NumberInput defaultValue={property.carport} label="Carport" name="carport" required />
        <SelectInput defaultValue={property.status} label="Status" name="status" options={["in_stock", "sold_out", "reserved"]} />
        <SelectInput defaultValue={property.siap} label="Siap" name="siap" options={["Siap Huni", "Indent", "Renovasi"]} />
        <TextInput defaultValue={property.kawasan} label="Kawasan" name="kawasan" required />
        <TextInput defaultValue={property.unit} label="Unit" name="unit" required />
        <TextInput defaultValue={property.mapsLink ?? ""} label="Google Maps Link" name="mapsLink" />
      </div>

      <fieldset className="mt-lg rounded-lg border border-prime-black/5 bg-soft-gray/50 p-md">
        <legend className="field-label">Hadap</legend>
        <div className="mt-xs flex flex-wrap gap-md text-body-sm">
          {["Utara", "Selatan", "Timur", "Barat"].map((option) => (
            <label className="inline-flex items-center gap-xs" key={option}>
              <input defaultChecked={property.hadap.includes(option)} name="hadap" type="checkbox" value={option} />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-md inline-flex items-center gap-xs text-body-sm">
        <input defaultChecked={property.isFeatured} name="isFeatured" type="checkbox" />
        Featured di landing
      </label>

      {error ? <p className="mt-md text-body-sm text-accent-red">{error}</p> : null}

      <div className="mt-lg flex justify-end border-t border-prime-black/5 pt-md">
        <button className="btn-primary gap-xs" disabled={isSubmitting} type="submit">
          <Save aria-hidden="true" size={17} />
          {isSubmitting ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}

function TextInput({
  defaultValue,
  label,
  name,
  required = false,
}: {
  defaultValue: string;
  label: string;
  name: string;
  required?: boolean;
}): React.ReactElement {
  return (
    <label>
      <span className="field-label">{label}</span>
      <input className="field-input" defaultValue={defaultValue} name={name} required={required} />
    </label>
  );
}

function NumberInput({
  defaultValue,
  label,
  name,
  required = false,
  step = "1",
}: {
  defaultValue: number | string;
  label: string;
  name: string;
  required?: boolean;
  step?: string;
}): React.ReactElement {
  return (
    <label>
      <span className="field-label">{label}</span>
      <input className="field-input" defaultValue={String(defaultValue)} min="0" name={name} required={required} step={step} type="number" />
    </label>
  );
}

function SelectInput({
  defaultValue,
  label,
  name,
  options,
}: {
  defaultValue: string;
  label: string;
  name: string;
  options: string[];
}): React.ReactElement {
  return (
    <label>
      <span className="field-label">{label}</span>
      <select className="field-input" defaultValue={defaultValue} name={name}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
