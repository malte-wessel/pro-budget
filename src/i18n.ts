import type { HomeAssistant } from "./ha/types.ts";
import { de } from "./i18n/de.ts";
import { en, type I18nKey } from "./i18n/en.ts";

const LANGUAGES: Record<string, Partial<Record<I18nKey, string>>> = { en, de };

/** Language of the HA user, reduced to its base ("de-CH" → "de"). */
export function language(hass: Pick<HomeAssistant, "locale" | "language"> | undefined): string {
  const tag = hass?.locale?.language ?? hass?.language ?? "en";
  return tag.toLowerCase().split("-")[0];
}

/** Translate `key` for the user's language, falling back to English; `{name}` placeholders. */
export function t(
  hass: Pick<HomeAssistant, "locale" | "language"> | undefined,
  key: I18nKey,
  params?: Record<string, string | number>,
): string {
  let text = LANGUAGES[language(hass)]?.[key] ?? en[key];
  if (params) {
    for (const [k, v] of Object.entries(params)) text = text.replaceAll(`{${k}}`, String(v));
  }
  return text;
}

export type { I18nKey };
