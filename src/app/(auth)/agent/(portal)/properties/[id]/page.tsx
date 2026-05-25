import type { Metadata } from "next";

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

  return (
    <section className="border border-border-default bg-surface-card p-lg">
      <p className="text-caption font-semibold uppercase text-accent-gold">
        Detail Properti
      </p>
      <h1 className="text-display-md">Properti {id}</h1>
      <p className="mt-sm text-body-sm text-text-secondary">
        Halaman detail siap membaca data dari endpoint properti berdasarkan ID.
      </p>
    </section>
  );
}
