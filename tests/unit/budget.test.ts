// The display helpers must agree with the Python maths: same fixtures as tests/python/budget/.
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { dueLabel, dueMonthsInYear, isActiveInMonth, monthlyEquivalent } from "../../src/budget.ts";
import type { Recurrence } from "../../src/types.ts";

const F = JSON.parse(
  readFileSync(path.join(process.cwd(), "tests/fixtures/recurrence.json"), "utf8"),
);
const en = {
  language: "en",
  locale: { language: "en", number_format: "language", time_format: "language" },
};
const de = {
  language: "de",
  locale: { language: "de", number_format: "language", time_format: "language" },
};

describe("budget helpers against the shared fixtures", () => {
  it("monthly equivalents", () => {
    for (const c of F.monthly_equivalent) {
      expect(monthlyEquivalent(c.amount, c.recurrence as Recurrence), JSON.stringify(c)).toBe(
        c.expected,
      );
    }
  });

  it("due months in a year", () => {
    for (const c of F.due_months_in_year) {
      expect(dueMonthsInYear(c.recurrence as Recurrence, c.due_month), JSON.stringify(c)).toEqual(
        c.expected,
      );
    }
  });

  it("active in month", () => {
    for (const c of F.active_in_month) {
      expect(
        isActiveInMonth({ start: c.start, end: c.end }, c.year, c.month),
        JSON.stringify(c),
      ).toBe(c.expected);
    }
  });
});

describe("dueLabel", () => {
  it("describes when an item is due", () => {
    expect(dueLabel(en, { recurrence: "monthly", due_day: 4, due_month: null })).toBe("on the 4.");
    expect(dueLabel(en, { recurrence: "weekly", due_day: 1, due_month: null })).toBe("Monday");
    expect(dueLabel(de, { recurrence: "weekly", due_day: 1, due_month: null })).toBe("Montag");
    expect(dueLabel(en, { recurrence: "annually", due_day: 15, due_month: 3 })).toBe(
      "on the 15. of March",
    );
    expect(dueLabel(en, { recurrence: "quarterly", due_day: 1, due_month: 3 })).toBe(
      "on the 1. (Mar, Jun, Sep, Dec)",
    );
    expect(dueLabel(en, { recurrence: "semi_annually", due_day: 20, due_month: 11 })).toBe(
      "on the 20. (May, Nov)",
    );
    expect(dueLabel(en, { recurrence: "annually", due_day: 1, due_month: null })).toBe("on the 1.");
    expect(dueLabel(en, { recurrence: "daily", due_day: null, due_month: null })).toBe("—");
  });
});
