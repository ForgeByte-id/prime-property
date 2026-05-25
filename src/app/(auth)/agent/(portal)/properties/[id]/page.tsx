import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Edit3, MapPin, TableProperties } from "lucide-react";
import { getSessionFromCookie } from "@/lib/auth/session";
import { getPropertyById } from "@/lib/services/property.service";
import { formatRupiah } from "@/lib/utils/formatting";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Detail Properti ${id}` };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const cookieStore = await cookies();
  const user = await getSessionFromCookie(cookieStore.get("pp_session")?.value);
  const property = await getPropertyById(id);

  if (!property) {
    return (
      <section className="border border-border-default bg-surface-card p-lg">
        <h1 className="text-display-md">Properti tidak ditemukan</h1>
      </section>
    );
  }

  return (
    <section className="space-y-lg">
      <div className="dashboard-surface p-md sm:p-lg">
        <div className="flex flex-col gap-md md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-md">
            <span className="metric-icon mt-1">
              <TableProperties aria-hidden="true" size={18} />
            </span>
            <div>
              <p className="text-caption font-semibold uppercase text-accent-gold">Detail Properti</p>
              <h1 className="text-display-md">{property.namaProperty}</h1>
              <p className="mt-xs text-body-sm text-text-secondary">{property.group}</p>
            </div>
          </div>
          {user?.role === "superadmin" ? (
            <Link className="btn-primary gap-xs" href={`/agent/properties/${id}/edit`}>
              <Edit3 aria-hidden="true" size={17} />
              Edit
            </Link>
          ) : null}
        </div>
      </div>

      <dl className="grid gap-md sm:grid-cols-2 xl:grid-cols-3">
        {[
          ["Kawasan", property.kawasan],
          ["Unit", property.unit],
          ["Tipe", property.tipe],
          ["Status", property.status],
          ["Siap", property.siap],
          ["Hadap", property.hadap.join(", ")],
          ["Lebar x Panjang", `${property.lebarMeter} x ${property.panjangMeter}`],
          ["Tingkat", String(property.tingkat)],
          ["Carport", String(property.carport)],
          ["Harga", formatRupiah(property.priceRupiah)],
        ].map(([label, value]) => (
          <div className="dashboard-stat p-md" key={label}>
            <dt className="text-caption-muted text-text-muted">{label}</dt>
            <dd className="mt-xs text-body-md font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      {property.mapsLink ? (
        <a className="btn-secondary inline-flex w-fit" href={property.mapsLink} rel="noreferrer" target="_blank">
          <MapPin aria-hidden="true" size={16} />
          Buka di Google Maps
        </a>
      ) : null}
    </section>
  );
}
