// Category colours are Home Assistant colour token names (as pro-cards): rendered through the
// theme, never as hex, so custom themes recolour them.
import { html, type TemplateResult } from "lit";

/** CSS for a stored colour name; `fallback` when the category has none. */
export function cssColor(
  name: string | null | undefined,
  fallback = "var(--secondary-text-color)",
): string {
  if (!name) return fallback;
  if (name === "primary") return "var(--primary-color)";
  if (name === "accent") return "var(--accent-color)";
  return `var(--${name}-color)`;
}

/**
 * A category icon in Home Assistant's tile style: the icon in its colour on a disc of the same
 * colour at 20 %. Inline styles, because the data table renders templates in its own shadow root.
 */
export function categoryIcon(
  category: { icon: string | null; color: string | null } | undefined,
  size: "s" | "m" = "m",
): TemplateResult {
  if (!category?.icon) return html``;
  const color = cssColor(category.color);
  const disc = size === "m" ? 36 : 28;
  const icon = size === "m" ? 20 : 16;
  return html`
    <span
      style="display: inline-flex; align-items: center; justify-content: center; flex: none; width: ${disc}px; height: ${disc}px; border-radius: 50%; vertical-align: middle; color: ${color}; background: color-mix(in srgb, ${color} 20%, transparent)"
    >
      <ha-icon
        .icon=${category.icon}
        style="--mdc-icon-size: ${icon}px; display: flex; line-height: 0; margin: 0; width: ${icon}px; height: ${icon}px"
      ></ha-icon>
    </span>
  `;
}
