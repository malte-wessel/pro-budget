import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { categoryIcon } from "../color.ts";
import { dueLabel } from "../budget.ts";
import { money, monthName, percent } from "../format.ts";
import type { HomeAssistant, Route } from "../ha/types.ts";
import { renderMemberChips } from "../members.ts";
import { tabs } from "../nav.ts";
import { t } from "../i18n.ts";
import { sharedStyles } from "../styles.ts";
import type { BudgetState, InsightGroup, Insights, Item } from "../types.ts";

@customElement("pro-budget-insights")
export class ProBudgetInsights extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property() userId = "";
  @property({ attribute: false }) route?: Route;
  @property({ type: Boolean }) narrow = false;
  @state() private _year = new Date().getFullYear();
  @state() private _insights?: Insights;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .months {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 6px;
        align-items: end;
        height: 160px;
      }
      .month {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
        gap: 4px;
      }
      .month .col {
        width: 100%;
        background: var(--primary-color);
        border-radius: 4px 4px 0 0;
        min-height: 2px;
      }
      .month.max .col {
        background: var(--error-color, #db4437);
      }
      .month.min .col {
        background: var(--success-color, #43a047);
      }
      .month .name {
        font-size: 0.75em;
        color: var(--secondary-text-color);
      }
      .month .total {
        font-size: 0.7em;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      @media (max-width: 700px) {
        .month .total {
          display: none;
        }
      }
    `,
  ];

  protected updated(changed: Map<string, unknown>) {
    if (["budget", "userId", "_year"].some((k) => changed.has(k))) void this._load();
  }

  private get _effectiveUser(): string {
    return this.userId || this.hass?.user?.id || this.budget?.users[0]?.id || "";
  }

  private async _load() {
    if (!this.hass || !this.budget || !this._effectiveUser) return;
    this._insights = await api.insights(this.hass, this._effectiveUser, this._year);
  }

  private _item(id: string): Item | undefined {
    return this.budget?.items.find((i) => i.id === id);
  }

  private _categoryIcon(categoryId: string | undefined) {
    const c = this.budget?.categories.find((c) => c.id === categoryId);
    return categoryIcon(c, "s");
  }

  private _frame(content: unknown) {
    const chips = renderMemberChips(
      this.hass,
      this.budget!,
      this.userId,
      { all: false },
      (userId) =>
        this.dispatchEvent(
          new CustomEvent("user-changed", { detail: { userId }, bubbles: true, composed: true }),
        ),
    );
    return html`
      <hass-tabs-subpage .hass=${this.hass} .narrow=${this.narrow} .route=${this.route} .tabs=${tabs(this.hass, this.route)} main-page>
        ${chips} ${content}
      </hass-tabs-subpage>
    `;
  }

  render() {
    if (!this.budget) return nothing;
    const h = this.hass;
    const i = this._insights;
    const cur = this.budget.config.currency;
    const m = (c: number) => money(h, c, cur);
    const user = this.budget.users.find((u) => u.id === this._effectiveUser);
    if (!user)
      return this._frame(
        html`<div class="cards"><ha-card><div class="empty">${t(h, "insights.no_member")}</div></ha-card></div>`,
      );
    return this._frame(html`
      <div class="toolbar">
        <strong>${user.name}</strong>
        <span class="spacer"></span>
        <select class="select" .value=${String(this._year)} @change=${(e: Event) => (this._year = Number((e.target as HTMLSelectElement).value))}>
          ${[-1, 0, 1].map((d) => {
            const y = new Date().getFullYear() + d;
            return html`<option value=${y} ?selected=${y === this._year}>${y}</option>`;
          })}
        </select>
      </div>
      ${
        !i
          ? html`<ha-card><div class="empty">${t(h, "common.loading")}</div></ha-card>`
          : html`
            <div class="grid">
              ${[
                ["insights.savings_rate", percent(h, i.savings_rate)],
                ["insights.fixed_cost_rate", percent(h, i.fixed_cost_rate)],
                ["insights.avg_month", m(i.avg_month)],
                [
                  "insights.max_month",
                  i.max_month ? monthName(h, i.max_month) : t(h, "common.none"),
                ],
              ].map(
                ([k, v]) => html`
                  <ha-card>
                    <div class="stat"><span class="label">${t(h, k as never)}</span><span class="value">${v}</span></div>
                  </ha-card>
                `,
              )}
            </div>
            <ha-card style="margin-top:16px">
              <h2>${t(h, "insights.payment_calendar", { year: this._year })}</h2>
              <p class="muted small">${t(h, "insights.payment_calendar_hint")}</p>
              ${this._renderMonths(i)}
              ${
                i.unscheduled.length
                  ? html`<p class="muted small">${t(h, "insights.unscheduled")} ${i.unscheduled.map((id) => this._item(id)?.title).join(", ")}</p>`
                  : nothing
              }
            </ha-card>
            <div class="grid" style="margin-top:16px">
              ${this._group(t(h, "insights.top_expenses"), { items: i.expenses.items.slice(0, 5), total: 0 }, cur, false)}
              ${this._group(t(h, "type.earning.plural"), i.earnings, cur)}
              ${this._group(t(h, "type.expense.plural"), i.expenses, cur)}
              ${this._group(t(h, "type.saving.plural"), i.savings, cur)}
            </div>
          `
      }
    `);
  }

  private _renderMonths(i: Insights) {
    const max = Math.max(1, ...i.calendar.map((c) => c.total));
    return html`
      <div class="months">
        ${i.calendar.map(
          (c) => html`
            <div class="month ${c.month === i.max_month ? "max" : c.month === i.min_month ? "min" : ""}" title=${money(this.hass, c.total, this.budget!.config.currency)}>
              <span class="total">${c.total ? money(this.hass, c.total, this.budget!.config.currency) : ""}</span>
              <div class="col" style="height:${Math.round((c.total / max) * 100)}%"></div>
              <span class="name">${monthName(this.hass, c.month, "short")}</span>
            </div>
          `,
        )}
      </div>
    `;
  }

  private _group(title: string, g: InsightGroup, cur: string, showTotal = true) {
    const h = this.hass;
    return html`
      <ha-card>
        <h2>${title}</h2>
        ${
          g.items.length === 0
            ? html`<div class="empty">${t(h, "common.none")}</div>`
            : html`
              <table class="plain">
                <tbody>
                  ${g.items.map((e) => {
                    const item = this._item(e.item_id);
                    return html`
                      <tr>
                        <td>${this._categoryIcon(item?.category_id)} ${item?.title ?? e.item_id}<br /><span class="muted small">${item ? `${t(h, `recurrence.${item.recurrence}` as never)} · ${dueLabel(h, item)}` : ""}</span></td>
                        <td class="num">${money(h, e.monthly, cur)}<span class="muted small"> ${t(h, "common.per_month")}</span></td>
                      </tr>
                    `;
                  })}
                  ${
                    showTotal
                      ? html`<tr><td><strong>Σ</strong></td><td class="num"><strong>${money(h, g.total, cur)}</strong></td></tr>`
                      : nothing
                  }
                </tbody>
              </table>
            `
        }
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-insights": ProBudgetInsights;
  }
}
