export const metadata = {
  title: "Audit Log",
};

export default function AuditLogsPage(): React.ReactElement {
  return (
    <section className="border border-border-default bg-surface-card p-lg">
      <p className="text-caption font-semibold uppercase text-accent-gold">
        Superadmin
      </p>
      <h1 className="text-display-md">Audit Log</h1>
      <p className="mt-sm text-body-sm text-text-secondary">
        Perubahan data properti dan akun internal ditampilkan dalam zona waktu Asia/Jakarta.
      </p>
    </section>
  );
}
