import { describe, expect, it } from "vitest";
import { cssColor } from "../../src/color.ts";

describe("cssColor", () => {
  it("renders Home Assistant colour tokens through the theme", () => {
    expect(cssColor("orange")).toBe("var(--orange-color)");
    expect(cssColor("blue-grey")).toBe("var(--blue-grey-color)");
    expect(cssColor("primary")).toBe("var(--primary-color)");
    expect(cssColor("accent")).toBe("var(--accent-color)");
  });

  it("falls back for categories without a colour", () => {
    expect(cssColor(null)).toBe("var(--secondary-text-color)");
    expect(cssColor(undefined, "inherit")).toBe("inherit");
  });
});
