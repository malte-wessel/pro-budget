// Category colours are Home Assistant colour token names (as pro-cards): rendered through the
// theme, never as hex, so custom themes recolour them.

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
