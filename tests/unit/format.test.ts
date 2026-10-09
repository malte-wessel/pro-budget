import { describe, expect, it } from "vitest";
import {
  amountInput,
  compactMoney,
  money,
  parseAmount,
  percent,
  signedMoney,
} from "../../src/format.ts";

const de = {
  language: "de",
  locale: { language: "de", number_format: "language", time_format: "language" },
};
const en = {
  language: "en",
  locale: { language: "en", number_format: "language", time_format: "language" },
};

describe("money", () => {
  it("formats cents in the user's locale", () => {
    expect(money(de, 123456, "EUR").replaceAll(String.fromCharCode(160), " ")).toBe("1.234,56 €");
    expect(money(en, 123456, "EUR")).toBe("€1,234.56");
  });

  it("signs amounts", () => {
    expect(signedMoney(en, 500, "EUR", true)).toBe("−€5.00");
    expect(signedMoney(en, 500, "EUR", false)).toBe("+€5.00");
  });

  it("compacts amounts for calendar cells", () => {
    expect(compactMoney(en, -125000)).toBe("−1,250");
    expect(compactMoney(en, 1234567)).toBe("+12.3K");
    expect(compactMoney(de, 210000)).toBe("+2.100");
  });

  it("formats ratios as percentages", () => {
    expect(percent(en, 0.1667)).toBe("16.7%");
    expect(percent(en, null)).toBe("—");
  });
});

describe("parseAmount", () => {
  it.each([
    ["1.234,56", 123456],
    ["1,234.56", 123456],
    ["12,5", 1250],
    ["12.5", 1250],
    ["1200", 120000],
    ["0.01", 1],
    [" 7 ", 700],
  ])("parses %s", (input, cents) => {
    expect(parseAmount(input)).toBe(cents);
  });

  it.each(["", "abc", "1.2.3", "12,345", "-5"])("rejects %s", (input) => {
    expect(parseAmount(input)).toBeNull();
  });

  it("round-trips through the input text", () => {
    expect(parseAmount(amountInput(123456))).toBe(123456);
  });
});
