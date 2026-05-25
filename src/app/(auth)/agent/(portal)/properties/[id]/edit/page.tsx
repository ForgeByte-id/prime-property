import type { Metadata } from "next";
import { Edit3 } from "lucide-react";
import { PropertyForm, type EditableProperty } from "@/components/internal/PropertyForm";
import { getPropertyById } from "@/lib/services/property.service";

interface EditPropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: EditPropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Edit Properti ${id}` };
}

export default async function EditPropertyPage({
  params,
}: EditPropertyPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    return (
      <section className="border border-border-default bg-surface-card p-lg">
        <h1 className="text-display-md">Properti tidak ditemukan</h1>
      </section>
    );
  }
  const editableProperty: EditableProperty = {
    id: property.id,
    namaProperty: property.namaProperty,
    group: property.group,
    lebarMeter: property.lebarMeter,
    panjangMeter: property.panjangMeter,
    hadap: property.hadap,
    tipe: property.tipe,
    tingkat: property.tingkat,
    priceRupiah: property.priceRupiah.toString(),
    carport: property.carport,
    status: property.status,
    siap: property.siap,
    mapsLink: property.mapsLink,
    kawasan: property.kawasan,
    unit: property.unit,
    isFeatured: property.isFeatured,
  };

  return (
    <section className="space-y-lg">
      <div className="dashboard-surface p-md sm:p-lg">
        <div className="flex items-start gap-md">
          <span className="metric-icon mt-1">
            <Edit3 aria-hidden="true" size={18} />
          </span>
          <div>
            <p className="text-caption font-semibold uppercase text-accent-gold">Superadmin</p>
            <h1 className="text-display-md">Edit Properti</h1>
            <p className="mt-xs text-body-sm text-text-secondary">{property.namaProperty}</p>
          </div>
        </div>
      </div>
      <div>
        <PropertyForm initialProperty={editableProperty} />
      </div>
    </section>
  );
}
