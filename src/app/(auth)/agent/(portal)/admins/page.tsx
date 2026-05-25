export const metadata = {
  title: "Manajemen Admin",
};

export default function AdminsPage(): React.ReactElement {
  return (
    <section className="border border-border-default bg-surface-card p-lg">
      <p className="text-caption font-semibold uppercase text-accent-gold">
        Superadmin
      </p>
      <h1 className="text-display-md">Manajemen Admin</h1>
      <p className="mt-sm text-body-sm text-text-secondary">
        Halaman dasar untuk membuat, mengaktifkan, menonaktifkan, dan reset password admin.
      </p>
    </section>
  );
}
