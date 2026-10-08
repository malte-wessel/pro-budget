import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { formatDate, money, monthName, parseIso, signedMoney, toIso } from "../format.ts";
import type { HomeAssistant } from "../ha/types.ts";
import { t } from "../i18n.ts";
import { sharedStyles } from "../styles.ts";
import type { BudgetState, Item, OccurrenceDay } from "../types.ts";

const AGENDA_WEEKS = 8;

@customElement("pro-budget-calendar")
export class ProBudgetCalendar extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property() userId = "";
  @state() private _view: "agenda" | "month" = "agenda";
  @state() private _month = toIso(new Date()).slice(0, 7);
  @state() private _days: OccurrenceDay[] = [];

  static styles = [
    sharedStyles,
    css`
      .day {
        display: flex;
        gap: 16px;
        padding: 10px 0;
        border-bottom: 1px solid var(--divider-color);
      }
      .day:last-child {
        border-bottom: none;
      }
      .date {
        flex: 0 0 140px;
        font-weight: 500;
      }
      .date.today {
        color: var(--primary-color);
      }
      .entries {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .entry {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .entry .amount {
        min-width: 110px;
        text-align: right;
        font-variant-numeric: tabular-nums;
      }
      .entry.paid {
        opacity: 0.55;
      }
      .entry.paid .title {
        text-decoration: line-through;
      }
      .month-grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 4px;
      }
      .month-grid .head {
        text-align: center;
        font-size: 0.8em;
        color: var(--secondary-text-color);
        padding: 4px 0;
      }
      .cell {
        min-height: 72px;
        border: 1px solid var(--divider-color);
        border-radius: 6px;
        padding: 4px;
        font-size: 0.8em;
        overflow: hidden;
      }
      .cell.outside {
        opacity: 0.4;
      }
      .cell.today {
        border-color: var(--primary-color);
      }
      .cell .num {
        text-align: right;
        color: var(--secondary-text-color);
      }
      .cell .sum {
        font-weight: 500;
        white-space: nowrap;
      }
      .cell .item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      ha-icon-button {
        --mdc-icon-button-size: 32px;
      }
      @media (max-width: 600px) {
        .date {
          flex-basis: 90px;
        }
        .cell {
          min-height: 48px;
        }
        .cell .item {
          display: none;
        }
      }
    `,
  ];

  protected updated(changed: Map<string, unknown>) {
    if (["budget", "userId", "_view", "_month"].some((k) => changed.has(k))) void this._load();
  }

  private _range(): [string, string] {
    if (this._view === "agenda") {
      const start = new Date();
      const end = new Date();
      end.setDate(end.getDate() + AGENDA_WEEKS * 7 - 1);
      return [toIso(start), toIso(end)];
    }
    const [y, m] = this._month.split("-").map(Number);
    return [toIso(new Date(y, m - 1, 1)), toIso(new Date(y, m, 0))];
  }

  private async _load() {
    if (!this.hass || !this.budget) return;
    const [start, end] = this._range();
    this._days = await api.occurrences(this.hass, start, end, this.userId || undefined);
  }

  private _item(id: string): Item | undefined {
    return this.budget?.items.find((i) => i.id === id);
  }

  private _shift(delta: number) {
    const [y, m] = this._month.split("-").map(Number);
    this._month = toIso(new Date(y, m - 1 + delta, 1)).slice(0, 7);
  }

  private async _togglePaid(itemId: string, date: string, paid: boolean) {
    await api.setPaid(this.hass!, itemId, date, !paid);
    await this._load();
  }

  render() {
    if (!this.budget) return nothing;
    const h = this.hass;
    return html`
      <div class="toolbar">
        <div class="chips">
          <button class="chip" aria-pressed=${this._view === "agenda"} @click=${() => (this._view = "agenda")}>
            ${t(h, "calendar.agenda")}
          </button>
          <button class="chip" aria-pressed=${this._view === "month"} @click=${() => (this._view = "month")}>
            ${t(h, "calendar.month")}
          </button>
        </div>
        <span class="grow"></span>
        ${
          this._view === "month"
            ? html`
              <ha-icon-button .label=${t(h, "calendar.previous")} @click=${() => this._shift(-1)}>
                <ha-icon icon="mdi:chevron-left"></ha-icon>
              </ha-icon-button>
              <strong>${formatDate(h, `${this._month}-01`, { month: "long", year: "numeric" })}</strong>
              <ha-icon-button .label=${t(h, "calendar.next")} @click=${() => this._shift(1)}>
                <ha-icon icon="mdi:chevron-right"></ha-icon>
              </ha-icon-button>
            `
            : html`<span class="muted small">${t(h, "calendar.weeks", { weeks: AGENDA_WEEKS })}</span>`
        }
      </div>
      <div class="cards">
        <ha-card>${this._view === "agenda" ? this._renderAgenda() : this._renderMonth()}</ha-card>
      </div>
    `;
  }

  private _entry(e: { item_id: string; paid: boolean }, date: string) {
    const item = this._item(e.item_id);
    if (!item) return nothing;
    const cur = item.currency ?? this.budget!.config.currency;
    const outflow = item.type !== "earning";
    return html`
      <div class="entry ${e.paid ? "paid" : ""}">
        <span class="amount ${item.type}">${signedMoney(this.hass, item.amount, cur, outflow)}</span>
        <span class="title grow">${item.title}</span>
        ${
          outflow
            ? html`
              <ha-icon-button
                .label=${t(this.hass, e.paid ? "calendar.mark_unpaid" : "calendar.mark_paid")}
                @click=${() => this._togglePaid(item.id, date, e.paid)}
              >
                <ha-icon icon=${e.paid ? "mdi:check-circle" : "mdi:checkbox-blank-circle-outline"}></ha-icon>
              </ha-icon-button>
            `
            : nothing
        }
      </div>
    `;
  }

  private _renderAgenda() {
    const h = this.hass;
    const today = toIso(new Date());
    const scheduled = this._days.filter((d) => d.date !== null);
    const unscheduled = this._days.find((d) => d.date === null);
    if (scheduled.length === 0 && !unscheduled) {
      return html`<div class="empty">${t(h, "calendar.empty")}</div>`;
    }
    return html`
      ${scheduled.map(
        (d) => html`
          <div class="day">
            <div class="date ${d.date === today ? "today" : ""}">
              ${formatDate(h, d.date!, { weekday: "short", day: "numeric", month: "short" })}
            </div>
            <div class="entries">${d.entries.map((e) => this._entry(e, d.date!))}</div>
          </div>
        `,
      )}
      ${
        unscheduled
          ? html`
            <div class="day">
              <div class="date muted">${t(h, "calendar.unscheduled")}</div>
              <div class="entries">
                ${unscheduled.entries.map((e) => html`<div class="entry"><span class="title">${this._item(e.item_id)?.title}</span></div>`)}
              </div>
            </div>
          `
          : nothing
      }
    `;
  }

  private _renderMonth() {
    const h = this.hass;
    const [y, m] = this._month.split("-").map(Number);
    const first = new Date(y, m - 1, 1);
    const lead = (first.getDay() + 6) % 7; // Monday first
    const daysInMonth = new Date(y, m, 0).getDate();
    const cells: (string | null)[] = [...Array(lead).fill(null)];
    for (let d = 1; d <= daysInMonth; d++) cells.push(toIso(new Date(y, m - 1, d)));
    while (cells.length % 7) cells.push(null);
    const byDate = new Map(this._days.filter((d) => d.date).map((d) => [d.date!, d.entries]));
    const today = toIso(new Date());
    const cur = this.budget!.config.currency;
    const heads = [1, 2, 3, 4, 5, 6, 7].map((d) =>
      new Intl.DateTimeFormat(h?.locale?.language ?? "en", { weekday: "short" }).format(
        new Date(2026, 5, d),
      ),
    );
    return html`
      <div class="month-grid">
        ${heads.map((w) => html`<div class="head">${w}</div>`)}
        ${cells.map((iso) => {
          if (!iso) return html`<div class="cell outside"></div>`;
          const entries = byDate.get(iso) ?? [];
          let sum = 0;
          for (const e of entries) {
            const item = this._item(e.item_id);
            if (item) sum += item.type === "earning" ? item.amount : -item.amount;
          }
          return html`
            <div class="cell ${iso === today ? "today" : ""}">
              <div class="num">${parseIso(iso).getDate()}</div>
              ${
                entries.length
                  ? html`
                    <div class="sum ${sum < 0 ? "expense" : "earning"}">${money(h, sum, cur)}</div>
                    ${entries.slice(0, 3).map((e) => html`<div class="item">${this._item(e.item_id)?.title}</div>`)}
                    ${entries.length > 3 ? html`<div class="item muted">+${entries.length - 3}</div>` : nothing}
                  `
                  : nothing
              }
            </div>
          `;
        })}
      </div>
      <p class="muted small" style="margin:8px 0 0">${monthName(h, m)} ${y}</p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-calendar": ProBudgetCalendar;
  }
}
