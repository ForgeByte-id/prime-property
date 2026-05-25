export const metadata = {
  title: "Tambah Properti",
};

export default function NewPropertyPage(): React.ReactElement {
  return (
    <section className="border border-border-default bg-surface-card p-lg">
      <p className="text-caption font-semibold uppercase text-accent-gold">
        Superadmin
      </p>
      <h1 className="text-display-md">Tambah Properti</h1>
      <p className="mt-sm text-body-sm text-text-secondary">
        Form ini disiapkan untuk integrasi lanjutan dengan schema validasi properti.
      </p>
    </section>
  );
}
