// Display-only helpers that mirror custom_components/pro_budget/budget/. The backend is the
// source of truth; these exist so lists can show monthly equivalents and due labels without a
// round trip. Checked against the same JSON fixtures as the Python code (tests/unit/budget.test.ts).
import { t } from "./i18n.ts";
import { monthName, weekdayName } from "./format.ts";
import type { HomeAssistant } from "./ha/types.ts";
import type { Item, Recurrence } from "./types.ts";

const MONTHLY_FACTORS: Record<Recurrence, number> = {
  daily: 365 / 12,
  weekly: 52 / 12,
  biweekly: 26 / 12,
  monthly: 1,
  quarterly: 1 / 3,
  semi_annually: 1 / 6,
  annually: 1 / 12,
};

const MONTH_INTERVALS: Partial<Record<Recurrence, number>> = {
  quarterly: 3,
  semi_annually: 6,
  annually: 12,
};

export function monthlyEquivalent(amount: number, recurrence: Recurrence): number {
  return Math.round(amount * MONTHLY_FACTORS[recurrence]);
}

export function dueMonthsInYear(recurrence: Recurrence, dueMonth: number): number[] {
  const interval = MONTH_INTERVALS[recurrence];
  if (!interval) return [];
  const months: number[] = [];
  for (let m = (dueMonth - 1) % interval; m < 12; m += interval) months.push(m + 1);
  return months;
}

export function isActiveInMonth(
  item: Pick<Item, "start" | "end">,
  year: number,
  month: number,
): boolean {
  const last = new Date(year, month, 0).getDate();
  const monthStart = `${year}-${String(month).padStart(2, "0")}-01`;
  const monthEnd = `${year}-${String(month).padStart(2, "0")}-${String(last).padStart(2, "0")}`;
  if (item.start && item.start > monthEnd) return false;
  if (item.end && item.end < monthStart) return false;
  return true;
}

type L = Pick<HomeAssistant, "locale" | "language"> | undefined;

/** "on the 15." / "Monday" / "on the 15. of March" / "on the 1. (Mar, Jun, Sep, Dec)". */
export function dueLabel(
  hass: L,
  item: Pick<Item, "recurrence" | "due_day" | "due_month">,
): string {
  if (item.recurrence === "daily" || item.due_day === null) return t(hass, "common.none");
  if (item.recurrence === "weekly" || item.recurrence === "biweekly") {
    return weekdayName(hass, item.due_day);
  }
  if (item.due_month === null) return t(hass, "due.on_day", { day: item.due_day });
  if (item.recurrence === "annually") {
    return t(hass, "due.on_day_month", {
      day: item.due_day,
      month: monthName(hass, item.due_month),
    });
  }
  const months = dueMonthsInYear(item.recurrence, item.due_month);
  if (months.length === 0) return t(hass, "due.on_day", { day: item.due_day });
  return t(hass, "due.months", {
    day: item.due_day,
    months: months.map((m) => monthName(hass, m, "short")).join(", "),
  });
}
