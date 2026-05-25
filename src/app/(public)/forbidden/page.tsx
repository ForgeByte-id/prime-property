import Link from "next/link";

export const metadata = {
  title: "Akses Ditolak",
};

export default function ForbiddenPage(): React.ReactElement {
  return (
    <section className="grid min-h-[70vh] place-items-center px-lg py-section">
      <div className="max-w-lg border border-border-default bg-surface-card p-xl text-center">
        <p className="text-caption font-semibold uppercase text-accent-red">403 Forbidden</p>
        <h1 className="mt-sm text-display-md">Akses tidak diizinkan.</h1>
        <p className="mt-sm text-body-sm text-text-secondary">
          Role akun Anda tidak memiliki izin untuk membuka halaman atau menjalankan aksi ini.
        </p>
        <Link className="btn-primary mt-lg inline-flex" href="/agent/dashboard">
          Kembali ke Dashboard
        </Link>
      </div>
    </section>
  );
}
