// The member filter chips of the card views (overview, calendar).
import { html, nothing, type TemplateResult } from "lit";
import { avatar, memberColor } from "./color.ts";
import type { HomeAssistant } from "./ha/types.ts";
import { t } from "./i18n.ts";
import type { BudgetState } from "./types.ts";

/** The theme colour of a household member, by their position in the member list. */
export function colorOf(budget: BudgetState, userId: string): string {
  return memberColor(
    Math.max(
      0,
      budget.users.findIndex((u) => u.id === userId),
    ),
  );
}

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
  const chip = (id: string, label: string, color: string, on: boolean) => html`
    <button class="chip" aria-pressed=${on} style="--chip-color: ${color}" @click=${() => onSelect(id)}>
      ${avatar(id ? label : "Σ", color, 24, on)}
      <span>${label}</span>
    </button>
  `;
  return html`
    <div class="members chips">
      ${
        options.all
          ? chip("", t(hass, "common.all"), "var(--primary-color)", userId === "")
          : nothing
      }
      ${budget.users.map((u) => chip(u.id, u.name, colorOf(budget, u.id), active(u.id)))}
    </div>
  `;
}
