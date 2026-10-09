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

// Colours for the household members, by their index in the member list (HA users have none).
const MEMBER_COLORS = [
  "purple",
  "blue",
  "teal",
  "orange",
  "pink",
  "indigo",
  "green",
  "deep-orange",
] as const;

/** The theme colour of the member at `index` in the member list. */
export function memberColor(index: number): string {
  return cssColor(
    MEMBER_COLORS[((index % MEMBER_COLORS.length) + MEMBER_COLORS.length) % MEMBER_COLORS.length],
  );
}

/** A round avatar with the first letter of the name on a disc of the colour. */
export function avatar(label: string, color: string, size = 32, filled = false): TemplateResult {
  const fg = filled ? "var(--text-primary-color, #fff)" : color;
  const bg = filled ? color : `color-mix(in srgb, ${color} 20%, transparent)`;
  return html`
    <span
      class="avatar"
      style="display: inline-flex; align-items: center; justify-content: center; flex: none; width: ${size}px; height: ${size}px; border-radius: 50%; font-size: ${Math.round(size * 0.42)}px; font-weight: 600; line-height: 1; color: ${fg}; background: ${bg}"
      >${label.slice(0, 1).toUpperCase()}</span
    >
  `;
}

/**
 * A category icon in Home Assistant's tile style: the icon in its colour on a disc of the same
 * colour at 20 %. Inline styles, because the data table renders templates in its own shadow root.
 */
export function categoryIcon(
  category: { icon: string | null; color: string | null } | undefined,
  size: "xs" | "s" | "m" = "m",
): TemplateResult {
  if (!category?.icon) return html``;
  const color = cssColor(category.color);
  const disc = { xs: 22, s: 28, m: 36 }[size];
  const icon = { xs: 13, s: 16, m: 20 }[size];
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
