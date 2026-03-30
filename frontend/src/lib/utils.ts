import type { ClassValue } from "clsx";
import type { Ref } from "vue";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function valueUpdater<T extends any>(updaterOrValue: T, ref: Ref) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

// Bookings

// format currency
export function formatCurrency(value: number) {
  return `$${value.toLocaleString()}`;
}

// format tanggal (biar lebih clean)
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// warna status (tailwind class)
export function statusColor(status: string) {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-600";
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "completed":
      return "bg-blue-100 text-blue-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

// label status biar lebih proper (capitalize)
export function formatStatus(status: string) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
