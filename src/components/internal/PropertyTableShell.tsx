"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownUp,
  Building2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { formatRupiah } from "@/lib/utils/formatting";
import { CSRF_HEADER_NAME } from "@/lib/security/csrf";
import { getClientCsrfToken } from "@/lib/security/client-csrf";
import { showToast } from "@/components/common/ToastBridge";

interface ApiProperty {
  id: string;
  namaProperty: string;
  group: string;
  kawasan: string;
  tipe: string;
  status: string;
  priceRupiah: string;
}

interface PropertyResponse {
  data: ApiProperty[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

interface PropertyTableShellProps {
  canCreate: boolean;
}

type SortBy = "created_at" | "nama_property" | "price" | "status";
type SortDir = "asc" | "desc";

const sortOptions: Array<{ label: string; value: SortBy }> = [
  { label: "Terbaru", value: "created_at" },
  { label: "Nama", value: "nama_property" },
  { label: "Harga", value: "price" },
  { label: "Status", value: "status" },
];

function statusBadgeClass(status: string): string {
  if (status === "in_stock") return "status-badge status-badge-success";
  if (status === "sold_out") return "status-badge status-badge-danger";
  if (status === "reserved") return "status-badge status-badge-warning";
  return "status-badge status-badge-muted";
}

export function PropertyTableShell({ canCreate }: PropertyTableShellProps): React.ReactElement {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState<25 | 50 | 100>(50);
  const [sortBy, setSortBy] = useState<SortBy>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [kawasan, setKawasan] = useState("");
  const [lebarMin, setLebarMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [tipe, setTipe] = useState("");
  const [status, setStatus] = useState("");
  const [carport, setCarport] = useState("");
  const [siap, setSiap] = useState("");
  const [response, setResponse] = useState<PropertyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const lastLoadedToastAt = useRef(0);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
      sort_by: sortBy,
      sort_dir: sortDir,
    });
    if (query.trim()) params.set("q", query.trim());
    if (kawasan) params.set("kawasan", kawasan);
    if (lebarMin) params.set("lebar_min", lebarMin);
    if (priceMax) params.set("price_max", priceMax);
    if (tipe) params.set("tipe", tipe);
    if (status) params.set("status", status);
    if (carport) params.set("carport", carport);
    if (siap) params.set("siap", siap);
    return params;
  }, [carport, kawasan, lebarMin, page, perPage, priceMax, query, siap, sortBy, sortDir, status, tipe]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetch(`/api/properties?${searchParams.toString()}`, {
          signal: controller.signal,
        });
        if (!result.ok) throw new Error("Gagal memuat properti.");
        const nextResponse = (await result.json()) as PropertyResponse;
        setResponse(nextResponse);

        const now = Date.now();
        if (now - lastLoadedToastAt.current > 2500) {
          showToast(`${nextResponse.data.length} data ditampilkan dari total ${nextResponse.meta.total}.`, "loading", "Data dimuat");
          lastLoadedToastAt.current = now;
        }
      } catch (fetchError) {
        if ((fetchError as Error).name !== "AbortError") {
          setError("Gagal memuat data properti.");
          showToast("Gagal memuat data properti.", "error");
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [refreshKey, searchParams]);

  async function handleDelete(id: string): Promise<void> {
    if (!window.confirm("Hapus properti ini? Data akan masuk soft delete.")) return;

    const result = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        [CSRF_HEADER_NAME]: getClientCsrfToken(),
      },
    });

    if (!result.ok) {
      setError("Gagal menghapus properti.");
      showToast("Gagal menghapus properti.", "error");
      return;
    }

    showToast("Properti berhasil dihapus.");
    setRefreshKey((current) => current + 1);
  }

  const properties = response?.data ?? [];
  const inStockCount = properties.filter((property) => property.status === "in_stock").length;
  const totalValue = properties.reduce((sum, property) => sum + BigInt(property.priceRupiah), 0n);
  const totalPages = Math.max(response?.meta.totalPages ?? 1, 1);
  const paginationPages = getPaginationPages(page, totalPages);
  const activeFilters = [
    query.trim() ? `Search: ${query.trim()}` : null,
    kawasan ? `Kawasan: ${kawasan}` : null,
    lebarMin ? `Lebar min: ${lebarMin} m` : null,
    priceMax ? `Harga max: ${priceMax}` : null,
    tipe ? `Tipe: ${tipe}` : null,
    status ? `Status: ${status}` : null,
    carport ? `Carport: ${carport === "1" ? "Tersedia" : "Tidak ada"}` : null,
    siap ? `Siap: ${siap}` : null,
  ].filter((filterLabel): filterLabel is string => Boolean(filterLabel));

  function resetFilters(): void {
    setPage(1);
    setQuery("");
    setKawasan("");
    setLebarMin("");
    setPriceMax("");
    setTipe("");
    setStatus("");
    setCarport("");
    setSiap("");
  }

  return (
    <div className="space-y-lg">
      <div className="grid gap-md md:grid-cols-3">
        <MetricCard icon={Building2} label="Total Data" value={`${response?.meta.total ?? 0}`} />
        <MetricCard icon={Home} label="In Stock di Halaman Ini" value={`${inStockCount}`} />
        <MetricCard icon={ArrowDownUp} label="Nilai Halaman Ini" value={formatRupiah(totalValue)} />
      </div>

      <section className="dashboard-surface space-y-md p-md">
        <div className="grid gap-md sm:grid-cols-2 lg:grid-cols-4">
          <label>
            <span className="field-label">Pencarian Cepat</span>
            <span className="relative block">
              <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                className="field-input !min-h-9 !rounded !bg-soft-gray/50 !py-1.5 pl-9 text-xs"
                id="search"
                onChange={(event) => {
                  setPage(1);
                  setQuery(event.target.value);
                }}
                placeholder="Ketik nama, group, kawasan..."
                value={query}
              />
            </span>
          </label>

          <label>
            <span className="field-label">Wilayah / Kawasan</span>
            <input
              className="field-input !min-h-9 !rounded !bg-soft-gray/50 !py-1.5 text-xs"
              onChange={(event) => {
                setPage(1);
                setKawasan(event.target.value);
              }}
              placeholder="Semua wilayah"
              value={kawasan}
            />
          </label>

          <label>
            <span className="field-label">Lebar Min (Meter)</span>
            <input
              className="field-input !min-h-9 !rounded !bg-soft-gray/50 !py-1.5 text-xs"
              onChange={(event) => {
                setPage(1);
                setLebarMin(event.target.value);
              }}
              placeholder="Contoh: 6"
              type="number"
              value={lebarMin}
            />
          </label>

          <label>
            <span className="field-label">Harga Max (Integer Rp)</span>
            <input
              className="field-input !min-h-9 !rounded !bg-soft-gray/50 !py-1.5 text-xs"
              onChange={(event) => {
                setPage(1);
                setPriceMax(event.target.value);
              }}
              placeholder="Contoh: 1500000000"
              type="number"
              value={priceMax}
            />
          </label>
        </div>

        <div className="grid gap-md border-t border-soft-gray pt-md sm:grid-cols-2 lg:grid-cols-4">
          <RadioGroup label="Tipe Properti" name="tipe" options={["", "Ruko", "Villa"]} value={tipe} onChange={setTipe} />
          <RadioGroup label="Status Inventaris" name="status" options={["", "in_stock", "sold_out"]} value={status} onChange={setStatus} />
          <label>
            <span className="field-label">Fasilitas Carport</span>
            <select
              className="field-input !min-h-9 !rounded !bg-soft-gray/50 !py-1.5 text-xs"
              onChange={(event) => {
                setPage(1);
                setCarport(event.target.value);
              }}
              value={carport}
            >
              <option value="">Semua Pilihan</option>
              <option value="1">Tersedia</option>
              <option value="0">Tidak Ada</option>
            </select>
          </label>
          <label>
            <span className="field-label">Kesiapan Fisik</span>
            <select
              className="field-input !min-h-9 !rounded !bg-soft-gray/50 !py-1.5 text-xs"
              onChange={(event) => {
                setPage(1);
                setSiap(event.target.value);
              }}
              value={siap}
            >
              <option value="">Semua Kondisi</option>
              <option value="Siap Huni">Siap Huni</option>
              <option value="Indent">Indent</option>
              <option value="Renovasi">Renovasi</option>
            </select>
          </label>
        </div>

          {activeFilters.length > 0 ? (
            <div className="flex flex-wrap items-center gap-xs border-t border-soft-gray pt-md">
              {activeFilters.map((filterLabel) => (
                <span className="rounded-full bg-accent-gold-soft px-sm py-1 text-xs font-semibold text-prime-black" key={filterLabel}>
                  {filterLabel}
                </span>
              ))}
              <button className="rounded-lg px-sm py-1 text-xs font-semibold text-text-muted transition hover:bg-soft-gray hover:text-prime-black" onClick={resetFilters} type="button">
                Reset Filter
              </button>
            </div>
          ) : null}

          <div className="flex flex-col gap-sm border-t border-soft-gray pt-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-sm text-xs">
            <span className="text-prime-black/50">Tampilkan Data:</span>
            <select
              className="rounded border border-prime-black/10 bg-white px-sm py-xs text-xs focus:outline-none"
              onChange={(event) => {
                setPage(1);
                setPerPage(Number(event.target.value) as 25 | 50 | 100);
              }}
              value={perPage}
            >
              <option value={25}>25 Baris</option>
              <option value={50}>50 Baris</option>
              <option value={100}>100 Baris</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-sm">
            <select
              className="rounded border border-prime-black/10 bg-white px-sm py-xs text-xs focus:outline-none"
              onChange={(event) => {
                setPage(1);
                setSortBy(event.target.value as SortBy);
              }}
              value={sortBy}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              className="btn-secondary !min-h-8 !rounded !px-sm !py-xs text-xs"
              onClick={() => {
                setPage(1);
                setSortDir((current) => (current === "asc" ? "desc" : "asc"));
              }}
              type="button"
            >
              <SlidersHorizontal aria-hidden="true" size={14} />
              {sortDir === "asc" ? "Asc" : "Desc"}
            </button>
            {canCreate ? (
              <Link className="btn-primary !min-h-8 !rounded !px-md !py-xs text-xs" href="/agent/properties/new">
                <Plus aria-hidden="true" size={14} />
                Tambah Properti Baru
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {error ? <p className="rounded-lg border border-accent-red bg-accent-red-soft px-md py-sm text-body-sm text-accent-red">{error}</p> : null}

      <section className="table-shell">
        <div className="flex flex-col gap-sm border-b border-border-default bg-white px-md py-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-title-md">Daftar Properti Utama</h2>
            <p className="text-caption text-text-muted">Kelola ruko dan villa aktif. Penambahan dan penghapusan data membutuhkan hak akses penuh.</p>
          </div>
          <span className="status-badge status-badge-warning w-fit">{isLoading ? "Memuat" : `${properties.length} baris`}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Properti</th>
                <th>Kawasan</th>
                <th>Tipe</th>
                <th className="text-right">Harga Pasaran</th>
                <th className="text-center">Status Unit</th>
                <th className="text-center">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="text-table-cell">
              {isLoading ? (
                <tr>
                  <td className="text-text-muted" colSpan={6}>
                    Memuat data properti...
                  </td>
                </tr>
              ) : null}
              {!isLoading && properties.length === 0 ? (
                <tr>
                  <td className="text-text-muted" colSpan={6}>
                    Tidak ada properti.
                  </td>
                </tr>
              ) : null}
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="font-bold text-prime-black">
                    <div className="font-semibold text-text-primary">{property.namaProperty}</div>
                    <div className="text-caption text-text-muted">{property.group}</div>
                  </td>
                  <td>{property.kawasan}</td>
                  <td className="font-medium">{property.tipe}</td>
                  <td className="text-right font-bold text-prime-black">{formatRupiah(BigInt(property.priceRupiah))}</td>
                  <td className="text-center">
                    <span className={statusBadgeClass(property.status)}>{property.status}</span>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-sm">
                      <Link className="font-bold text-prime-black hover:underline" href={`/agent/properties/${property.id}`}>
                        <Eye aria-hidden="true" className="inline" size={14} /> Detail
                      </Link>
                      {canCreate ? (
                        <>
                          <Link className="font-bold text-accent-gold hover:underline" href={`/agent/properties/${property.id}/edit`}>
                            <Pencil aria-hidden="true" className="inline" size={14} /> Edit
                          </Link>
                          <button
                            className="font-bold text-accent-red hover:underline"
                            onClick={() => void handleDelete(property.id)}
                            type="button"
                          >
                            <Trash2 aria-hidden="true" className="inline" size={14} /> Hapus
                          </button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-md border-t border-prime-black/5 bg-soft-gray px-md py-md text-xs text-prime-black/60 sm:flex-row sm:items-center sm:justify-between">
          <span>Page {page} dari {Math.max(response?.meta.totalPages ?? 1, 1)} | Total {response?.meta.total ?? 0}</span>
          <div className="flex flex-wrap items-center gap-xs">
            <button
              className="datatable-page-button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              type="button"
            >
              <ChevronLeft aria-hidden="true" size={14} />
            </button>
            {paginationPages.map((pageNumber) => (
              <button
                aria-current={pageNumber === page ? "page" : undefined}
                className={pageNumber === page ? "datatable-page-button-active" : "datatable-page-button"}
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                type="button"
              >
                {pageNumber}
              </button>
            ))}
            <button
              className="datatable-page-button"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              type="button"
            >
              <ChevronRight aria-hidden="true" size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function getPaginationPages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.max(Math.min(currentPage - 2, totalPages - 4), 1);
  return Array.from({ length: 5 }, (_, index) => start + index);
}

function RadioGroup({
  label,
  name,
  onChange,
  options,
  value,
}: {
  label: string;
  name: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}): React.ReactElement {
  return (
    <fieldset className="space-y-xs">
      <legend className="field-label">{label}</legend>
      <div className="flex h-9 items-center gap-md text-xs">
        {options.map((option) => (
          <label className="flex cursor-pointer items-center gap-xs" key={option || "all"}>
            <input
              checked={value === option}
              className="accent-accent-gold"
              name={name}
              onChange={() => onChange(option)}
              type="radio"
            />
            {option || "Semua"}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}): React.ReactElement {
  return (
    <div className="dashboard-stat p-md">
      <div className="flex items-center justify-between gap-md">
        <div>
          <p className="text-caption font-semibold uppercase text-text-muted">{label}</p>
          <p className="mt-xs text-title-md text-text-primary">{value}</p>
        </div>
        <span className="metric-icon">
          <Icon aria-hidden="true" size={18} />
        </span>
      </div>
    </div>
  );
}
