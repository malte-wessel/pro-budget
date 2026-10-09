// Formatting with the user's HA locale. Amounts are cents everywhere until they are shown.
import type { HomeAssistant } from "./ha/types.ts";

type L = Pick<HomeAssistant, "locale" | "language"> | undefined;

export function locale(hass: L): string {
  return hass?.locale?.language ?? hass?.language ?? "en";
}

const moneyFormatters = new Map<string, Intl.NumberFormat>();

export function money(hass: L, cents: number, currency: string): string {
  const key = `${locale(hass)}|${currency}`;
  let f = moneyFormatters.get(key);
  if (!f) {
    try {
      f = new Intl.NumberFormat(locale(hass), { style: "currency", currency });
    } catch {
      f = new Intl.NumberFormat(locale(hass), { minimumFractionDigits: 2 });
    }
    moneyFormatters.set(key, f);
  }
  return f.format(cents / 100);
}

export function signedMoney(hass: L, cents: number, currency: string, negative: boolean): string {
  const s = money(hass, Math.abs(cents), currency);
  return negative ? `−${s}` : `+${s}`;
}

/** A compact signed amount for tight spaces: "+2.1k", "−1,250", no currency symbol. */
export function compactMoney(hass: L, cents: number): string {
  const value = Math.abs(cents) / 100;
  const text =
    value >= 10_000
      ? new Intl.NumberFormat(locale(hass), {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(value)
      : new Intl.NumberFormat(locale(hass), { maximumFractionDigits: 0 }).format(value);
  return (cents < 0 ? "−" : "+") + text;
}

export function percent(hass: L, ratio: number | null): string {
  if (ratio === null) return "—";
  return new Intl.NumberFormat(locale(hass), { style: "percent", maximumFractionDigits: 1 }).format(
    ratio,
  );
}

export function toIso(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseIso(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(hass: L, iso: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(locale(hass), options).format(parseIso(iso));
}

export function monthName(hass: L, month: number, style: "long" | "short" = "long"): string {
  return new Intl.DateTimeFormat(locale(hass), { month: style }).format(
    new Date(2026, month - 1, 1),
  );
}

export function weekdayName(hass: L, isoWeekday: number, style: "long" | "short" = "long"): string {
  // 2026-06-01 is a Monday.
  return new Intl.DateTimeFormat(locale(hass), { weekday: style }).format(
    new Date(2026, 5, isoWeekday),
  );
}

/** Parse what a user typed as an amount ("1.234,56", "12.5", "1200") into cents, or null. */
export function parseAmount(input: string): number | null {
  const trimmed = input.trim().replace(/\s/g, "");
  if (!trimmed) return null;
  // Decide the decimal separator by the last separator in the string.
  const lastComma = trimmed.lastIndexOf(",");
  const lastDot = trimmed.lastIndexOf(".");
  let normalized: string;
  if (lastComma > lastDot) normalized = trimmed.replace(/\./g, "").replace(",", ".");
  else if (lastDot > lastComma) normalized = trimmed.replace(/,/g, "");
  else normalized = trimmed;
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  return Math.round(Number(normalized) * 100);
}

export function amountInput(cents: number): string {
  return (cents / 100).toFixed(2);
}
