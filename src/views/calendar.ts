import {
  mdiArrowDown,
  mdiArrowUp,
  mdiCalendarBlankOutline,
  mdiChartTimelineVariant,
  mdiCheckboxBlankCircleOutline,
  mdiCheckCircle,
  mdiChevronLeft,
  mdiChevronRight,
  mdiFormatListBulleted,
  mdiTrendingDown,
  mdiViewGridOutline,
} from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { categoryIcon } from "../color.ts";
import {
  compactMoney,
  formatDate,
  money,
  monthName,
  parseIso,
  signedMoney,
  toIso,
  weekdayName,
} from "../format.ts";
import type { HomeAssistant, Route } from "../ha/types.ts";
import { renderMemberChips } from "../members.ts";
import { navigateTo, tabs, viewTitle } from "../nav.ts";
import { t, type I18nKey } from "../i18n.ts";
import { dashboardStyles, sharedStyles } from "../styles.ts";
import type { BudgetState, CalendarMonth, Item, OccurrenceDay } from "../types.ts";

const NEXT_ROWS = 6;
const CELL_ICONS = 3;
const HEAVY_DAY = 50000; // cents out on one day that tints the cell
const FLOW_HEIGHT = 150;
const HA_CALENDAR = "calendar.pro_budget_payments";

interface Entry {
  item: Item;
  date: string;
  paid: boolean;
}

/**
 * The calendar: one month of payments. The grid, the list and the cards format what
 * `pro_budget/calendar` returns (occurrences with paid marks and the running balance).
 */
@customElement("pro-budget-calendar")
export class ProBudgetCalendar extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property() userId = "";
  @property({ attribute: false }) route?: Route;
  @property({ type: Boolean }) narrow = false;
  @state() private _year = new Date().getFullYear();
  @state() private _month = new Date().getMonth() + 1;
  @state() private _selected = toIso(new Date());
  @state() private _view: "month" | "list" = "month";
  @state() private _data?: CalendarMonth;

  static styles = [
    sharedStyles,
    dashboardStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }
      .toolbar .segment {
        display: flex;
        padding: 3px;
        border-radius: 999px;
        background: var(--tile-background, color-mix(in srgb, var(--primary-text-color) 6%, transparent));
      }
      .segment button {
        height: 30px;
        padding: 0 14px;
        border: 0;
        border-radius: 999px;
        background: transparent;
        color: var(--secondary-text-color);
        display: flex;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        font: inherit;
        font-size: 13px;
        font-weight: 500;
        --mdc-icon-size: 16px;
      }
      .segment button[aria-pressed="true"] {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
      }
      .tiles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
        margin-bottom: 16px;
      }
      .tile {
        flex-direction: row;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
      }
      .tile .disc {
        width: 44px;
        height: 44px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 22px;
      }
      .tile .value {
        font-size: 22px;
        line-height: 28px;
      }
      /* month grid */
      .weekdays,
      .grid {
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        gap: 6px;
      }
      .weekdays span {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
        text-align: center;
        padding: 4px 0;
      }
      .cell {
        all: unset;
        box-sizing: border-box;
        min-height: 96px;
        border-radius: 10px;
        padding: 6px 6px 8px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;
        overflow: hidden;
        cursor: pointer;
      }
      .cell:focus-visible {
        outline: 2px solid var(--primary-color);
      }
      .cell.outside {
        cursor: default;
        opacity: 0.4;
      }
      .cell.has {
        background: var(--tile-background);
      }
      .cell.income {
        background: color-mix(in srgb, var(--success-color) 10%, transparent);
      }
      .cell.heavy {
        background: color-mix(in srgb, var(--orange-color) 10%, transparent);
      }
      .cell.past > * {
        opacity: 0.55;
      }
      .cell[aria-pressed="true"] {
        box-shadow: inset 0 0 0 2px var(--primary-color);
      }
      .cell .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 4px;
      }
      .daynum {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 500;
        flex: none;
      }
      .daynum.today {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
      }
      .cell .net {
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cell .icons {
        display: flex;
        flex-wrap: wrap;
        gap: 3px;
        margin-top: auto;
      }
      .more {
        height: 22px;
        padding: 0 6px;
        border-radius: 11px;
        background: var(--tile-background);
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
      }
      /* list */
      .day {
        display: flex;
        gap: 16px;
        padding: 12px 0;
        border-top: 1px solid var(--divider-color);
      }
      .day:first-of-type {
        border-top: none;
      }
      .day.past {
        opacity: 0.55;
      }
      .day .when {
        width: 56px;
        flex: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 2px;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      .day .when .daynum {
        width: 36px;
        height: 36px;
        font-size: 18px;
        font-weight: 400;
        color: var(--primary-text-color);
      }
      .day .when .daynum.today {
        color: var(--text-primary-color, #fff);
      }
      .day .entries {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .entry {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 4px 0;
      }
      .entry .grow {
        min-width: 0;
      }
      .entry .title {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .entry .amount {
        font-weight: 500;
        white-space: nowrap;
      }
      .entry.paid > :not(.paid-toggle) {
        opacity: 0.55;
      }
      .entry.paid .title {
        text-decoration: line-through;
      }
      .paid-toggle {
        --ha-icon-button-size: 36px;
        --ha-icon-button-padding-inline: 0;
        margin-right: -8px;
        color: var(--secondary-text-color);
      }
      .entry.paid .paid-toggle {
        color: var(--success-color);
      }
      /* cash flow */
      .flow {
        position: relative;
        display: flex;
        gap: 2px;
        align-items: stretch;
      }
      .flow .zero {
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px solid var(--secondary-text-color);
        opacity: 0.5;
      }
      .flow button {
        all: unset;
        cursor: pointer;
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        border-radius: 3px;
      }
      .flow button:focus-visible {
        outline: 2px solid var(--primary-color);
      }
      .flow button.selected {
        background: var(--tile-background);
      }
      .flow .pos {
        display: flex;
        align-items: flex-end;
      }
      .flow .neg {
        display: flex;
        align-items: flex-start;
      }
      .flow .pos span {
        width: 100%;
        border-radius: 3px 3px 0 0;
      }
      .flow .neg span {
        width: 100%;
        border-radius: 0 0 3px 3px;
      }
      .flow .past span span {
        opacity: 0.5;
      }
      .flow .low span span {
        box-shadow: inset 0 0 0 2px var(--primary-text-color);
      }
      .flow-labels {
        display: flex;
        gap: 2px;
      }
      .flow-labels span {
        flex: 1;
        min-width: 0;
        text-align: center;
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .flow-labels span.today {
        color: var(--primary-color);
        font-weight: 600;
      }
      .note-box {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        padding: 10px 12px;
        border-radius: 10px;
        background: var(--tile-background);
      }
      .note-box .disc {
        width: 32px;
        height: 32px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--orange-color);
        background: color-mix(in srgb, var(--orange-color) 20%, transparent);
        --mdc-icon-size: 16px;
      }
      /* right column */
      .badge {
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        padding: 4px 10px;
        border-radius: 999px;
        background: color-mix(in srgb, var(--primary-color) 16%, transparent);
        color: var(--primary-color);
      }
      .total {
        display: flex;
        justify-content: space-between;
        border-top: 1px solid var(--divider-color);
        padding-top: 10px;
        font-size: 13px;
      }
      .next-row {
        all: unset;
        cursor: pointer;
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 6px 0;
        border-radius: 8px;
      }
      .next-row:focus-visible {
        outline: 2px solid var(--primary-color);
      }
      .next-row .when {
        width: 40px;
        flex: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        line-height: 14px;
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .next-row .when b {
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
        color: var(--primary-text-color);
      }
      .next-row .title {
        flex: 1;
        min-width: 0;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .empty-row {
        display: flex;
        gap: 12px;
        align-items: center;
        padding: 8px 0;
        color: var(--secondary-text-color);
      }
      .empty-row .disc {
        width: 40px;
        height: 40px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--tile-background);
      }
      @media (max-width: 600px) {
        .cell {
          min-height: 64px;
          padding: 4px;
        }
        .cell .net {
          display: none;
        }
        .day .when {
          width: 44px;
        }
      }
    `,
  ];

  protected updated(changed: Map<string, unknown>) {
    if (["budget", "userId", "_year", "_month"].some((k) => changed.has(k))) void this._load();
  }

  private async _load() {
    if (!this.hass || !this.budget) return;
    this._data = await api.calendar(this.hass, this._year, this._month, this.userId || undefined);
  }

  // ----- state helpers -----

  private _shift(delta: number) {
    const d = new Date(this._year, this._month - 1 + delta, 1);
    this._year = d.getFullYear();
    this._month = d.getMonth() + 1;
    const last = new Date(this._year, this._month, 0).getDate();
    this._selected = toIso(
      new Date(this._year, this._month - 1, Math.min(parseIso(this._selected).getDate(), last)),
    );
  }

  private _today() {
    const now = new Date();
    this._year = now.getFullYear();
    this._month = now.getMonth() + 1;
    this._selected = toIso(now);
  }

  private _iso(day: number): string {
    return toIso(new Date(this._year, this._month - 1, day));
  }

  private _item(id: string): Item | undefined {
    return this.budget?.items.find((i) => i.id === id);
  }

  private _user(id: string): string {
    return this.budget?.users.find((u) => u.id === id)?.name ?? t(this.hass, "common.unknown_user");
  }

  private _entries(day: OccurrenceDay | undefined): Entry[] {
    if (!day?.date) return [];
    return day.entries.flatMap((e) => {
      const item = this._item(e.item_id);
      return item ? [{ item, date: day.date!, paid: e.paid }] : [];
    });
  }

  private _byDate(): Map<string, Entry[]> {
    return new Map(
      (this._data?.days ?? []).filter((d) => d.date).map((d) => [d.date!, this._entries(d)]),
    );
  }

  private _signed(e: Entry): number {
    return e.item.type === "earning" ? e.item.amount : -e.item.amount;
  }

  private _net(entries: Entry[]): number {
    return entries.reduce((a, e) => a + this._signed(e), 0);
  }

  private async _togglePaid(e: Entry) {
    await api.setPaid(this.hass!, e.item.id, e.date, !e.paid);
    await this._load();
  }

  private _select(iso: string) {
    this._selected = iso;
  }

  // ----- frame -----

  private _frame(content: unknown) {
    const h = this.hass;
    const chips = renderMemberChips(h, this.budget!, this.userId, { all: true }, (userId) =>
      this.dispatchEvent(
        new CustomEvent("user-changed", { detail: { userId }, bubbles: true, composed: true }),
      ),
    );
    const views = [
      ["month", mdiViewGridOutline, "calendar.month"],
      ["list", mdiFormatListBulleted, "calendar.list"],
    ] as const;
    return html`
      <hass-tabs-subpage .hass=${h} .narrow=${this.narrow} .route=${this.route} .tabs=${tabs(h, this.route)} main-page>
        <span slot="header">${viewTitle(h, this.route)}</span>
        <div class="toolbar">
          <div class="period">
            <ha-icon-button .label=${t(h, "calendar.nav_previous")} .path=${mdiChevronLeft} @click=${() => this._shift(-1)}></ha-icon-button>
            <div class="title"><span class="month">${formatDate(h, this._iso(1), { month: "long", year: "numeric" })}</span></div>
            <ha-icon-button .label=${t(h, "calendar.nav_next")} .path=${mdiChevronRight} @click=${() => this._shift(1)}></ha-icon-button>
          </div>
          <button class="chip" @click=${() => this._today()}>${t(h, "calendar.today")}</button>
          <div class="segment" role="group">
            ${views.map(
              ([id, path, key]) => html`
                <button aria-pressed=${this._view === id} @click=${() => (this._view = id)}>
                  <ha-svg-icon .path=${path}></ha-svg-icon>${t(h, key)}
                </button>
              `,
            )}
          </div>
          ${chips}
        </div>
        ${content}
      </hass-tabs-subpage>
    `;
  }

  render() {
    if (!this.budget) return nothing;
    const h = this.hass;
    const d = this._data;
    if (!d) {
      return this._frame(
        html`<div class="cards"><ha-card><div class="empty">${t(h, "common.loading")}</div></ha-card></div>`,
      );
    }
    const byDate = this._byDate();
    const unscheduled = d.days.find((x) => x.date === null);
    return this._frame(html`
      <div class="cards">
        ${this._tiles(d)}
        <div class="dashboard">
          <div class="col">
            ${this._view === "month" ? this._grid(byDate) : this._list(byDate)}
            ${
              unscheduled
                ? html`<p class="small muted" style="margin:0">${t(h, "calendar.unscheduled")}: ${unscheduled.entries.map((e) => this._item(e.item_id)?.title).join(", ")}</p>`
                : nothing
            }
            ${this._flow(d)}
          </div>
          <div class="col">${this._selectedDay(byDate)} ${this._next(byDate)} ${this._haCard()}</div>
        </div>
      </div>
    `);
  }

  // ----- tiles -----

  private _tiles(d: CalendarMonth) {
    const h = this.hass;
    const cur = this.budget!.config.currency;
    const m = (c: number) => money(h, c, cur);
    const f = d.flow;
    const month = monthName(h, this._month);
    const tile = (
      path: string,
      color: string,
      label: string,
      value: string,
      cls: string,
      note: string,
    ) => html`
      <ha-card class="tile">
        <span class="disc" style="color:${color}; background: color-mix(in srgb, ${color} 20%, transparent)"><ha-svg-icon .path=${path}></ha-svg-icon></span>
        <div class="col-text">
          <span class="small muted" style="font-size:13px">${label}</span>
          <span class="num value ${cls}">${value}</span>
          <span class="small muted">${note}</span>
        </div>
      </ha-card>
    `;
    return html`
      <div class="tiles">
        ${tile(mdiArrowDown, "var(--orange-color)", t(h, "calendar.out_in", { month }), signedMoney(h, f.outflow, cur, true), "", t(h, "calendar.payments_note", { count: f.outflow_count, amount: m(f.first_day_outflow) }))}
        ${tile(mdiArrowUp, "var(--success-color)", t(h, "calendar.in_in", { month }), signedMoney(h, f.income, cur, false), "good", f.first_income_day ? t(h, "calendar.from_day", { day: f.first_income_day }) : t(h, "calendar.no_income"))}
        ${tile(mdiTrendingDown, "var(--deep-orange-color)", t(h, "calendar.lowest"), signedMoney(h, f.low_balance, cur, f.low_balance < 0), f.low_balance < 0 ? "warn" : "", f.low_balance < 0 ? t(h, "calendar.lowest_note", { day: f.low_day }) : t(h, "calendar.opening_note", { day: f.low_day, opening: m(f.opening) }))}
      </div>
    `;
  }

  // ----- month grid -----

  private _grid(byDate: Map<string, Entry[]>) {
    const h = this.hass;
    const today = toIso(new Date());
    const first = new Date(this._year, this._month - 1, 1);
    const lead = (first.getDay() + 6) % 7; // Monday first
    const daysInMonth = new Date(this._year, this._month, 0).getDate();
    const prevDays = new Date(this._year, this._month - 1, 0).getDate();
    const cells: { day: number; iso: string | null }[] = [];
    for (let i = lead; i > 0; i--) cells.push({ day: prevDays - i + 1, iso: null });
    for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, iso: this._iso(d) });
    for (let d = 1; cells.length % 7; d++) cells.push({ day: d, iso: null });
    return html`
      <ha-card style="padding:12px; gap:6px">
        <div class="weekdays">${[1, 2, 3, 4, 5, 6, 7].map((w) => html`<span>${weekdayName(h, w, "short")}</span>`)}</div>
        <div class="grid">
          ${cells.map((c) => {
            if (!c.iso)
              return html`<div class="cell outside"><span class="top"><span class="daynum muted">${c.day}</span></span></div>`;
            const entries = byDate.get(c.iso) ?? [];
            const net = this._net(entries);
            const income = entries.some((e) => e.item.type === "earning");
            const cls = [
              "cell",
              entries.length ? "has" : "",
              income ? "income" : net <= -HEAVY_DAY ? "heavy" : "",
              c.iso < today ? "past" : "",
            ].join(" ");
            return html`
              <button class=${cls} aria-pressed=${c.iso === this._selected} @click=${() => this._select(c.iso!)}>
                <span class="top">
                  <span class="daynum ${c.iso === today ? "today" : ""}">${c.day}</span>
                  ${entries.length ? html`<span class="num net ${net > 0 ? "good" : ""}">${compactMoney(h, net)}</span>` : nothing}
                </span>
                <span class="icons">
                  ${entries.slice(0, CELL_ICONS).map((e) => html`<span title="${e.item.title} ${signedMoney(h, e.item.amount, e.item.currency ?? this.budget!.config.currency, e.item.type !== "earning")}">${categoryIcon(this._category(e.item), "xs")}</span>`)}
                  ${entries.length > CELL_ICONS ? html`<span class="more">${t(h, "calendar.more", { count: entries.length - CELL_ICONS })}</span>` : nothing}
                </span>
              </button>
            `;
          })}
        </div>
      </ha-card>
    `;
  }

  private _category(item: Item) {
    return this.budget?.categories.find((c) => c.id === item.category_id);
  }

  // ----- list -----

  private _entry(e: Entry, size: "s" | "m" = "m") {
    const h = this.hass;
    const outflow = e.item.type !== "earning";
    const who = this.userId ? "" : `${this._user(e.item.user_id)} · `;
    return html`
      <div class="entry ${e.paid ? "paid" : ""}">
        ${categoryIcon(this._category(e.item), size)}
        <div class="grow col-text">
          <span class="title">${e.item.title}</span>
          <span class="small muted">${who}${t(h, `recurrence.${e.item.recurrence}` as I18nKey)}</span>
        </div>
        <span class="num amount ${e.item.type}">${signedMoney(h, e.item.amount, e.item.currency ?? this.budget!.config.currency, outflow)}</span>
        ${
          outflow
            ? html`
              <ha-icon-button
                class="paid-toggle"
                .label=${t(h, e.paid ? "calendar.mark_unpaid" : "calendar.mark_paid")}
                .path=${e.paid ? mdiCheckCircle : mdiCheckboxBlankCircleOutline}
                @click=${() => this._togglePaid(e)}
              ></ha-icon-button>
            `
            : nothing
        }
      </div>
    `;
  }

  private _list(byDate: Map<string, Entry[]>) {
    const h = this.hass;
    const today = toIso(new Date());
    const days = [...byDate.entries()].filter(([, entries]) => entries.length);
    if (days.length === 0) {
      return html`<ha-card><div class="empty">${t(h, "calendar.nothing_more")}</div></ha-card>`;
    }
    return html`
      <ha-card style="padding: 8px 16px; gap: 0">
        ${days.map(
          ([iso, entries]) => html`
            <div class="day ${iso < today ? "past" : ""}">
              <div class="when">
                <span class=${iso === today ? "good" : ""}>${formatDate(h, iso, { weekday: "short" })}</span>
                <span class="daynum ${iso === today ? "today" : ""}">${parseIso(iso).getDate()}</span>
              </div>
              <div class="entries">${entries.map((e) => this._entry(e, "m"))}</div>
            </div>
          `,
        )}
      </ha-card>
    `;
  }

  // ----- cash flow -----

  private _flow(d: CalendarMonth) {
    const h = this.hass;
    const cur = this.budget!.config.currency;
    const m = (c: number) => signedMoney(h, c, cur, c < 0);
    const f = d.flow;
    const today = toIso(new Date());
    const todayDay = this._iso(1).slice(0, 7) === today.slice(0, 7) ? parseIso(today).getDate() : 0;
    // Bars: the balance since the 1st, starting with what last month's income left over.
    const high = Math.max(0, ...f.days.map((x) => x.balance));
    const low = Math.min(0, ...f.days.map((x) => x.balance));
    const k = FLOW_HEIGHT / (high - low || 1);
    const posArea = `${(high * k).toFixed(1)}px`;
    const negArea = `${(-low * k).toFixed(1)}px`;
    // Shade by how much is left: green at the month's high, orange as the balance nears
    // zero, red the deeper it goes below.
    const shade = (v: number) => {
      // Full green from a quarter of the month's high upwards, orange only when it gets thin;
      // oklch keeps the hues clean in between.
      if (v >= 0) {
        const pct = Math.min(100, Math.round(high ? (v / high) * 400 : 0));
        return `color-mix(in oklch, var(--success-color) ${pct}%, var(--warning-color))`;
      }
      const pct = Math.round(40 + 60 * (low ? v / low : 0));
      return `color-mix(in oklch, var(--error-color) ${pct}%, var(--warning-color))`;
    };
    const last = f.days.length;
    // Every 5th day, the first, today, and the last unless the day before is already labelled.
    const show = (day: number) =>
      day === 1 || day % 5 === 0 || day === todayDay || (day === last && (last - 1) % 5 !== 0);
    const month = monthName(h, this._month);
    let title: string;
    let sub: string;
    if (f.low_balance < 0) {
      title = t(h, "calendar.low_title", { day: f.low_day, amount: m(f.low_balance) });
      sub = f.first_income_day
        ? t(h, "calendar.low_sub", { day: f.first_income_day, amount: m(f.end_balance) })
        : t(h, "calendar.no_income_sub");
    } else {
      title = t(h, "calendar.no_minus", { day: f.low_day, amount: m(f.low_balance) });
      sub = t(h, "calendar.no_minus_sub", { opening: m(f.opening), amount: m(f.end_balance) });
    }
    return html`
      <ha-card>
        <div class="head">
          <ha-svg-icon .path=${mdiChartTimelineVariant}></ha-svg-icon>
          <h2>${t(h, "calendar.cashflow", { month })}</h2>
          <span class="hint">${t(h, "calendar.cashflow_hint")}</span>
        </div>
        <div class="flow">
          <div class="zero" style="top:${posArea}"></div>
          ${f.days.map((x) => {
            const iso = this._iso(x.day);
            const cls = [
              x.day < todayDay ? "past" : "",
              x.day === f.low_day ? "low" : "",
              iso === this._selected ? "selected" : "",
            ].join(" ");
            return html`
              <button class=${cls} title="${x.day}.: ${m(x.balance)}" @click=${() => this._select(iso)}>
                <span class="pos" style="height:${posArea}"><span style="height:${(Math.max(0, x.balance) * k).toFixed(1)}px; background:${shade(x.balance)}"></span></span>
                <span class="neg" style="height:${negArea}"><span style="height:${(Math.max(0, -x.balance) * k).toFixed(1)}px; background:${shade(x.balance)}"></span></span>
              </button>
            `;
          })}
        </div>
        <div class="flow-labels">${f.days.map((x) => html`<span class=${x.day === todayDay ? "today" : ""}>${show(x.day) ? x.day : ""}</span>`)}</div>
        <div class="note-box">
          <span class="disc"><ha-svg-icon .path=${mdiArrowDown}></ha-svg-icon></span>
          <div class="col-text">
            <span style="font-size:13px; font-weight:500">${title}</span>
            <span class="small muted">${sub}</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  // ----- right column -----

  private _selectedDay(byDate: Map<string, Entry[]>) {
    const h = this.hass;
    const today = toIso(new Date());
    const entries = byDate.get(this._selected) ?? [];
    const net = this._net(entries);
    return html`
      <ha-card class="selected-day" style="gap:10px">
        <div class="head">
          <h2>${formatDate(h, this._selected, { weekday: "long", day: "numeric", month: "long" })}</h2>
          ${this._selected === today ? html`<span class="badge">${t(h, "calendar.today")}</span>` : nothing}
        </div>
        ${
          entries.length
            ? html`
              <div class="col-text">${entries.map((e) => this._entry(e))}</div>
              <div class="total">
                <span class="muted">${t(h, "calendar.day_total")}</span>
                <span class="num ${net > 0 ? "good" : ""}" style="font-weight:600">${signedMoney(h, net, this.budget!.config.currency, net < 0)}</span>
              </div>
            `
            : html`
              <div class="empty-row">
                <span class="disc"><ha-svg-icon .path=${mdiCalendarBlankOutline}></ha-svg-icon></span>
                <span>${t(h, "calendar.no_payments_day")}</span>
              </div>
            `
        }
      </ha-card>
    `;
  }

  private _next(byDate: Map<string, Entry[]>) {
    const h = this.hass;
    const rows = [...byDate.entries()]
      .filter(([iso]) => iso > this._selected)
      .flatMap(([, entries]) => entries)
      .slice(0, NEXT_ROWS);
    return html`
      <ha-card class="next" style="gap:4px">
        <div class="head" style="margin-bottom:6px">
          <h2>${t(h, "calendar.next")}</h2>
          <span class="hint">${t(h, "calendar.next_hint")}</span>
        </div>
        ${rows.length === 0 ? html`<span class="small muted">${t(h, "calendar.nothing_more")}</span>` : nothing}
        ${rows.map(
          (e) => html`
            <button class="next-row" @click=${() => this._select(e.date)}>
              <span class="when">${formatDate(h, e.date, { weekday: "short" })}<b>${parseIso(e.date).getDate()}</b></span>
              ${categoryIcon(this._category(e.item), "s")}
              <span class="title">${e.item.title}</span>
              <span class="num ${e.item.type}" style="font-size:13px; font-weight:500; white-space:nowrap">${signedMoney(h, e.item.amount, e.item.currency ?? this.budget!.config.currency, e.item.type !== "earning")}</span>
            </button>
          `,
        )}
      </ha-card>
    `;
  }

  private _haCard() {
    const h = this.hass;
    const text = t(h, "calendar.ha_text", { entity: "\u0000" }).split("\u0000");
    return html`
      <ha-card style="gap:12px">
        <div class="head"><h2>${t(h, "calendar.ha_title")}</h2></div>
        <span class="small muted" style="line-height:17px">${text[0]}<b style="font-weight:500; color: var(--primary-text-color)">${HA_CALENDAR}</b>${text[1]}</span>
        <a
          class="link"
          href="/calendar"
          @click=${(e: Event) => {
            e.preventDefault();
            navigateTo("/calendar");
          }}
          >${t(h, "calendar.open_ha")} →</a
        >
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-calendar": ProBudgetCalendar;
  }
}
