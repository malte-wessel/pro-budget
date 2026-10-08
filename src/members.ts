// The member filter chips of the card views (overview, calendar, insights).
import { html, nothing, type TemplateResult } from "lit";
import type { HomeAssistant } from "./ha/types.ts";
import { t } from "./i18n.ts";
import type { BudgetState } from "./types.ts";

export function renderMemberChips(
  hass: HomeAssistant | undefined,
  budget: BudgetState,
  userId: string,
  options: { all: boolean },
  onSelect: (userId: string) => void,
): TemplateResult | typeof nothing {
  if (budget.users.length < 2) return nothing;
  const active = (id: string) =>
    userId === id || (!options.all && !userId && id === hass?.user?.id);
  return html`
    <div class="members chips">
      ${
        options.all
          ? html`<button class="chip" aria-pressed=${userId === ""} @click=${() => onSelect("")}>${t(hass, "common.all")}</button>`
          : nothing
      }
      ${budget.users.map(
        (u) =>
          html`<button class="chip" aria-pressed=${active(u.id)} @click=${() => onSelect(u.id)}>${u.name}</button>`,
      )}
    </div>
  `;
}
