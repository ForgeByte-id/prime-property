const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const jakartaDateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export function formatRupiah(value: bigint | number | string): string {
  return rupiahFormatter.format(Number(value));
}

export function formatJakartaDateTime(value: string | Date): string {
  return `${jakartaDateFormatter.format(new Date(value))} WIB`;
}
