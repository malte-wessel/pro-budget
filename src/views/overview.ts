import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { money, percent } from "../format.ts";
import type { HomeAssistant } from "../ha/types.ts";
import { t } from "../i18n.ts";
import { sharedStyles } from "../styles.ts";
import type { BudgetState, MonthStats } from "../types.ts";

@customElement("pro-budget-overview")
export class ProBudgetOverview extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property() userId = "";
  @state() private _stats: MonthStats[] = [];

  static styles = sharedStyles;

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("budget") || changed.has("userId")) void this._load();
  }

  private async _load() {
    if (!this.hass || !this.budget) return;
    const now = new Date();
    this._stats = await api.stats(
      this.hass,
      now.getFullYear(),
      now.getMonth() + 1,
      this.userId || undefined,
    );
  }

  private _user(id: string): string {
    return this.budget?.users.find((u) => u.id === id)?.name ?? t(this.hass, "common.unknown_user");
  }

  private _category(id: string): string {
    return this.budget?.categories.find((c) => c.id === id)?.name ?? id;
  }

  render() {
    if (!this.budget) return nothing;
    if (this.budget.items.length === 0) {
      return html`<div class="cards"><ha-card><div class="empty">${t(this.hass, "overview.empty")}</div></ha-card></div>`;
    }
    return html`
      <div class="cards">
        <p class="muted small" style="margin:0 0 12px">${t(this.hass, "common.monthly_hint")}</p>
        ${this._stats.map((s, i) => this._renderCurrency(s, i > 0))}
      </div>
    `;
  }

  private _renderCurrency(s: MonthStats, other: boolean) {
    const h = this.hass;
    const m = (c: number) => money(h, c, s.currency);
    const totals = [
      ["overview.income", s.totals.income, "earning"],
      ["overview.expenses", s.totals.expenses, "expense"],
      ["overview.savings", s.totals.savings, "saving"],
      ["overview.remaining", s.totals.remaining, s.totals.remaining < 0 ? "expense" : ""],
    ] as const;
    return html`
      ${other ? html`<p class="muted small">${t(h, "overview.other_currencies")} (${s.currency})</p>` : nothing}
      <div class="grid">
        ${totals.map(
          ([key, value, cls]) => html`
            <ha-card>
              <div class="stat">
                <span class="label">${t(h, key)}</span>
                <span class="value ${cls}">${m(value)}</span>
              </div>
            </ha-card>
          `,
        )}
      </div>
      <ha-card style="margin-top:16px">
        <h2>${t(h, "overview.members")}</h2>
        <div class="scroll">
          <table class="plain">
            <thead>
              <tr>
                <th>${t(h, "overview.member")}</th>
                <th class="num">${t(h, "overview.income")}</th>
                <th class="num">${t(h, "overview.expenses")}</th>
                <th class="num">${t(h, "overview.shared")}</th>
                <th class="num">${t(h, "overview.fixed")}</th>
                <th class="num">${t(h, "overview.savings")}</th>
                <th class="num">${t(h, "overview.balance")}</th>
              </tr>
            </thead>
            <tbody>
              ${s.members.map(
                (r) => html`
                  <tr>
                    <td>${this._user(r.user_id)}</td>
                    <td class="num earning">${m(r.earnings)}</td>
                    <td class="num expense">${m(r.expenses.total)}</td>
                    <td class="num">${m(r.expenses.shared)}</td>
                    <td class="num">${m(r.expenses.fixed)}</td>
                    <td class="num saving">${m(r.savings)}</td>
                    <td class="num ${r.balance < 0 ? "expense" : ""}">${m(r.balance)}</td>
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </div>
      </ha-card>
      <div class="grid" style="margin-top:16px">
        <ha-card>
          <h2>${t(h, "overview.fairness")}</h2>
          <p class="muted small">${t(h, "overview.fairness_hint")}</p>
          <table class="plain">
            <thead>
              <tr>
                <th>${t(h, "overview.member")}</th>
                <th class="num">${t(h, "overview.shared_costs_paid")}</th>
                <th class="num">${t(h, "overview.shared_cost_share")}</th>
                <th class="num">${t(h, "overview.income_share")}</th>
              </tr>
            </thead>
            <tbody>
              ${s.fairness.map(
                (f) => html`
                  <tr>
                    <td>${this._user(f.user_id)}</td>
                    <td class="num">${m(f.shared_costs_paid)}</td>
                    <td class="num">${percent(h, f.shared_cost_share)}</td>
                    <td class="num">${percent(h, f.income_share)}</td>
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </ha-card>
        <ha-card>
          <h2>${t(h, "overview.categories")}</h2>
          <table class="plain">
            <thead>
              <tr>
                <th>${t(h, "overview.category")}</th>
                <th class="num">${t(h, "overview.expenses")}</th>
                <th class="num">${t(h, "overview.savings")}</th>
                <th class="num">${t(h, "overview.income")}</th>
              </tr>
            </thead>
            <tbody>
              ${s.categories.map(
                (c) => html`
                  <tr>
                    <td>${this._category(c.category_id)}</td>
                    <td class="num">${c.expenses ? m(c.expenses) : ""}</td>
                    <td class="num">${c.savings ? m(c.savings) : ""}</td>
                    <td class="num">${c.earnings ? m(c.earnings) : ""}</td>
                  </tr>
                `,
              )}
            </tbody>
          </table>
        </ha-card>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-overview": ProBudgetOverview;
  }
}
