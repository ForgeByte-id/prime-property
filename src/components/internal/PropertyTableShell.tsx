"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { formatRupiah } from "@/lib/utils/formatting";

const demoProperties = [
  ["demo-1", "Cluster Nusa Dua Premium", "Prime Bali", "Nusa Dua", "Villa", 3850000000n],
  ["demo-2", "Rumah Renon Strategis", "Prime Bali", "Renon", "Rumah", 2150000000n],
  ["demo-3", "Tanah Komersial Canggu", "Prime Bali", "Canggu", "Tanah", 6300000000n],
] as const;

export function PropertyTableShell(): React.ReactElement {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () =>
      demoProperties.filter((property) =>
        property.slice(1, 5).join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="space-y-md">
      <div className="border border-border-default bg-surface-card p-md">
        <label className="field-label" htmlFor="search">
          Cari nama, group, atau kawasan
        </label>
        <input
          className="field-input"
          id="search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Contoh: Canggu"
          value={query}
        />
        <p className="mt-xs text-caption-muted text-text-muted">
          Implementasi API menggunakan debounce 300ms dan URL query params.
        </p>
      </div>
      <div className="overflow-x-auto border border-border-default bg-surface-card">
        <table className="min-w-[900px] w-full">
          <thead className="bg-surface-muted text-left text-table-head uppercase text-text-secondary">
            <tr>
              <th className="px-md py-sm">Nama</th>
              <th className="px-md py-sm">Group</th>
              <th className="px-md py-sm">Kawasan</th>
              <th className="px-md py-sm">Tipe</th>
              <th className="px-md py-sm">Harga</th>
              <th className="px-md py-sm">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-table-cell">
            {filtered.map(([id, name, group, kawasan, tipe, price]) => (
              <tr className="border-t border-border-default" key={id}>
                <td className="px-md py-sm font-semibold">{name}</td>
                <td className="px-md py-sm">{group}</td>
                <td className="px-md py-sm">{kawasan}</td>
                <td className="px-md py-sm">{tipe}</td>
                <td className="px-md py-sm">{formatRupiah(price)}</td>
                <td className="px-md py-sm">
                  <Link className="text-button-md text-prime-black underline" href={`/agent/properties/${id}`}>
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
