import { describe, expect, it } from "vitest";
import { language, t } from "../../src/i18n.ts";
import { de } from "../../src/i18n/de.ts";
import { en } from "../../src/i18n/en.ts";

const hass = (lang: string) => ({
  language: lang,
  locale: { language: lang, number_format: "language", time_format: "language" },
});

describe("i18n", () => {
  it("reduces the locale to its base language", () => {
    expect(language(hass("de-CH"))).toBe("de");
    expect(language(undefined)).toBe("en");
  });

  it("translates and falls back to English", () => {
    expect(t(hass("de"), "nav.items")).toBe("Posten");
    expect(t(hass("fr"), "nav.items")).toBe("Items");
  });

  it("fills placeholders", () => {
    expect(t(hass("en"), "categories.items", { count: 3 })).toBe("3 items");
  });

  it("German only uses keys that exist in English", () => {
    for (const key of Object.keys(de)) expect(key in en, key).toBe(true);
  });
});
