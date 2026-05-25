import type { Metadata } from "next";

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

  return (
    <section className="border border-border-default bg-surface-card p-lg">
      <p className="text-caption font-semibold uppercase text-accent-gold">
        Superadmin
      </p>
      <h1 className="text-display-md">Edit Properti {id}</h1>
      <p className="mt-sm text-body-sm text-text-secondary">
        Akses halaman ini dibatasi untuk Superadmin melalui middleware.
      </p>
    </section>
  );
}
