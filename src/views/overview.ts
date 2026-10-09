import {
  mdiAccountGroupOutline,
  mdiAlertCircleOutline,
  mdiArrowRight,
  mdiCalendarClock,
  mdiCalendarStar,
  mdiChartBar,
  mdiCheckboxBlankCircleOutline,
  mdiCheckCircle,
  mdiChevronLeft,
  mdiChevronRight,
  mdiLockOutline,
  mdiPiggyBankOutline,
  mdiShapeOutline,
  mdiSwapHorizontal,
  mdiTrendingUp,
  mdiWalletOutline,
} from "@mdi/js";
import { css, html, LitElement, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { avatar, categoryIcon } from "../color.ts";
import { formatDate, money, monthName, percent, signedMoney, toIso } from "../format.ts";
import type { HomeAssistant, Route } from "../ha/types.ts";
import { colorOf, renderMemberChips } from "../members.ts";
import { navigate, tabs, type View, viewPath } from "../nav.ts";
import { t, type I18nKey } from "../i18n.ts";
import { dashboardStyles, sharedStyles } from "../styles.ts";
import type { BudgetState, Item, MonthStats, Occurrence, Overview } from "../types.ts";

const TOP_CATEGORIES = 5;
const SAVINGS_TARGET = 0.1;
const FIXED_LIMIT = 0.45;

/**
 * The overview: a dashboard of the month. Every number comes from `pro_budget/overview`; this
 * view formats them and draws bars with plain CSS. Two columns on wide screens, one below 1000px.
 */
@customElement("pro-budget-overview")
export class ProBudgetOverview extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property() userId = "";
  @property() version = "";
  @property({ attribute: false }) route?: Route;
  @property({ type: Boolean }) narrow = false;
  @state() private _year = new Date().getFullYear();
  @state() private _month = new Date().getMonth() + 1;
  @state() private _data?: Overview;

  static styles = [
    sharedStyles,
    dashboardStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }
      /* hero */
      .hero-top {
        display: flex;
        flex-wrap: wrap;
        gap: 24px 40px;
      }
      .free {
        flex: 1 1 300px;
        min-width: 0;
        display: flex;
        gap: 16px;
        align-items: flex-start;
      }
      .free .disc {
        width: 64px;
        height: 64px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--success-color);
        background: color-mix(in srgb, var(--success-color) 20%, transparent);
        --mdc-icon-size: 30px;
      }
      .free .big {
        font-size: 36px;
        line-height: 44px;
        letter-spacing: -1px;
        white-space: nowrap;
      }
      .free .big.negative {
        color: var(--error-color);
      }
      .free .pct {
        font-size: 13px;
        font-weight: 500;
        color: var(--success-color);
      }
      .progress {
        flex: 1 1 280px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 4px;
      }
      .between {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .track {
        position: relative;
        height: 8px;
        border-radius: 4px;
        background: var(--tile-background);
      }
      .track .fill {
        position: absolute;
        inset: 0 auto 0 0;
        border-radius: 4px;
        background: var(--primary-color);
      }
      .track .today {
        position: absolute;
        top: -4px;
        bottom: -4px;
        width: 2px;
        border-radius: 1px;
        background: var(--primary-text-color);
      }
      .stack {
        display: flex;
        height: 12px;
        border-radius: 6px;
        overflow: hidden;
        gap: 2px;
        background: var(--tile-background);
      }
      .stack.thin {
        height: 8px;
        border-radius: 4px;
      }
      .legend {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px 16px;
      }
      .legend .item {
        display: flex;
        gap: 8px;
        align-items: flex-start;
      }
      .legend .swatch {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        margin-top: 5px;
        flex: none;
      }
      .legend .amount {
        font-size: 15px;
        font-weight: 500;
      }
      .kpis {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        gap: 10px;
      }
      .kpi {
        border-radius: 10px;
        background: var(--tile-background);
        padding: 10px 12px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .kpi .disc {
        width: 36px;
        height: 36px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 18px;
      }
      .kpi .value {
        font-size: 16px;
        font-weight: 500;
      }
      .member-row {
        all: unset;
        cursor: pointer;
        display: flex;
        gap: 12px;
        align-items: flex-start;
        border-radius: 8px;
      }
      .member-row:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 4px;
      }
      .bar {
        height: 6px;
        border-radius: 3px;
        background: var(--tile-background);
        overflow: hidden;
      }
      .bar > div {
        height: 100%;
        border-radius: 3px;
      }
      /* year chart */
      .chart {
        display: flex;
        flex-wrap: wrap;
        gap: 20px 32px;
      }
      .bars {
        flex: 3 1 400px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .plot {
        position: relative;
        height: 120px;
        display: flex;
        align-items: flex-end;
        gap: 6px;
      }
      .avg {
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px dashed var(--secondary-text-color);
        opacity: 0.7;
      }
      .avg span {
        position: absolute;
        right: 0;
        bottom: 2px;
        font-size: 11px;
        line-height: 14px;
        color: var(--secondary-text-color);
        background: var(--card-background-color);
        padding-left: 4px;
      }
      .plot .month {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 4px;
      }
      .plot .label {
        font-size: 11px;
        line-height: 14px;
        font-weight: 500;
        white-space: nowrap;
      }
      .plot .col-bar {
        width: 100%;
        max-width: 40px;
        min-height: 2px;
        border-radius: 4px 4px 2px 2px;
        background: color-mix(in srgb, var(--primary-color) 30%, transparent);
      }
      .plot .current .col-bar {
        background: var(--primary-color);
      }
      .plot .peak .col-bar {
        background: var(--orange-color);
      }
      .names {
        display: flex;
        gap: 6px;
      }
      .names span {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .names span.current {
        color: var(--primary-text-color);
        font-weight: 600;
      }
      .notes {
        flex: 1 1 220px;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .note {
        display: flex;
        gap: 10px;
        align-items: flex-start;
      }
      .note .disc {
        width: 32px;
        height: 32px;
        flex: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        --mdc-icon-size: 16px;
      }
      .note .title {
        font-size: 13px;
        font-weight: 500;
      }
      /* settlement */
      .badge {
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        padding: 4px 10px;
        border-radius: 999px;
        background: var(--tile-background);
        color: var(--secondary-text-color);
      }
      .transfer {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 10px;
      }
      .transfer.hl {
        background: var(--tile-background);
      }
      .transfer ha-svg-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 18px;
        flex: none;
      }
      .transfer .text {
        flex: 1;
        min-width: 0;
        font-size: 13px;
      }
      .axis {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .balance {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .balance .bars2 {
        display: flex;
        height: 8px;
      }
      .balance .left,
      .balance .right {
        flex: 1;
        display: flex;
        background: var(--tile-background);
      }
      .balance .left {
        justify-content: flex-end;
        border-radius: 4px 0 0 4px;
      }
      .balance .right {
        border-radius: 0 4px 4px 0;
      }
      .balance .left > div {
        background: var(--error-color);
        border-radius: 4px 0 0 4px;
      }
      .balance .right > div {
        background: var(--success-color);
        border-radius: 0 4px 4px 0;
      }
      .balance .mid {
        width: 2px;
        background: var(--primary-text-color);
        opacity: 0.5;
      }
      .settled {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--success-color);
        margin: 0;
      }
    `,
  ];

  protected updated(changed: Map<string, unknown>) {
    if (["budget", "userId", "_year", "_month"].some((k) => changed.has(k))) void this._load();
  }

  private async _load() {
    if (!this.hass || !this.budget) return;
    this._data = await api.overview(this.hass, this._year, this._month, this.userId || undefined);
  }

  private _shift(delta: number) {
    const d = new Date(this._year, this._month - 1 + delta, 1);
    this._year = d.getFullYear();
    this._month = d.getMonth() + 1;
  }

  private get _isCurrentMonth(): boolean {
    const now = new Date();
    return now.getFullYear() === this._year && now.getMonth() + 1 === this._month;
  }

  private _select(userId: string) {
    this.dispatchEvent(
      new CustomEvent("user-changed", { detail: { userId }, bubbles: true, composed: true }),
    );
  }

  private _user(id: string): string {
    return this.budget?.users.find((u) => u.id === id)?.name ?? t(this.hass, "common.unknown_user");
  }

  private _item(id: string): Item | undefined {
    return this.budget?.items.find((i) => i.id === id);
  }

  private _category(id: string | undefined) {
    return this.budget?.categories.find((c) => c.id === id);
  }

  private _link(view: View, label: string, cls = "link") {
    return html`
      <a
        class=${cls}
        href=${viewPath(this.route, view)}
        @click=${(e: Event) => {
          e.preventDefault();
          navigate(this.route, view);
        }}
        >${label}</a
      >
    `;
  }

  private _head(path: string, title: string, right: unknown = nothing) {
    return html`
      <div class="head">
        <ha-svg-icon .path=${path}></ha-svg-icon>
        <h2>${title}</h2>
        ${right}
      </div>
    `;
  }

  private _frame(content: unknown) {
    const h = this.hass;
    const chips = renderMemberChips(h, this.budget!, this.userId, { all: true }, (id) =>
      this._select(id),
    );
    const monthLabel = formatDate(h, `${this._year}-${String(this._month).padStart(2, "0")}-01`, {
      month: "long",
      year: "numeric",
    });
    return html`
      <hass-tabs-subpage .hass=${h} .narrow=${this.narrow} .route=${this.route} .tabs=${tabs(h, this.route)} main-page>
        <div class="toolbar">
          <div class="period">
            <ha-icon-button .label=${t(h, "overview.nav_previous")} .path=${mdiChevronLeft} @click=${() => this._shift(-1)}></ha-icon-button>
            <div class="title">
              <span class="month">${monthLabel}</span>
              ${
                this._isCurrentMonth
                  ? html`<span class="small muted">${t(h, "common.today")} · ${formatDate(h, toIso(new Date()), { weekday: "short", day: "numeric", month: "short" })}</span>`
                  : nothing
              }
            </div>
            <ha-icon-button .label=${t(h, "overview.nav_next")} .path=${mdiChevronRight} @click=${() => this._shift(1)}></ha-icon-button>
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
    if (this.budget.items.length === 0) {
      return this._frame(
        html`<div class="cards"><ha-card><div class="empty">${t(h, "overview.empty")}</div></ha-card></div>`,
      );
    }
    const d = this._data;
    if (!d) {
      return this._frame(
        html`<div class="cards"><ha-card><div class="empty">${t(h, "common.loading")}</div></ha-card></div>`,
      );
    }
    const s = d.stats[0];
    return this._frame(html`
      <div class="cards">
        ${
          d.stats.length > 1
            ? html`<p class="muted small" style="margin:0 0 12px">${t(h, "overview.other_currencies")} (${d.stats
                .slice(1)
                .map((x) => x.currency)
                .join(", ")})</p>`
            : nothing
        }
        <div class="dashboard">
          <div class="col">
            ${this._hero(d, s)}
            <div class="pair">${this._categories(s)} ${this._members(d.household)}</div>
            ${this._yearOutlook(d, s.currency)}
          </div>
          <div class="col">${this._upNext(d, s.currency)} ${this._settlement(d.household)}</div>
        </div>
      </div>
    `);
  }

  // ----- hero -----

  private _hero(d: Overview, s: MonthStats) {
    const h = this.hass;
    const cur = s.currency;
    const m = (c: number) => money(h, c, cur);
    const monthLabel = monthName(h, this._month);
    const title = this.userId
      ? t(h, "overview.scope_member", { name: this._user(this.userId), month: monthLabel })
      : t(h, "overview.scope_household", { month: monthLabel });
    const remaining = s.totals.remaining;
    const p = d.progress;
    // The hero shows the actual month, not monthly equivalents: what comes in and goes out.
    const income = p.income;
    const free = income - p.due;
    const paidW = p.due > 0 ? Math.min(100, (p.paid / p.due) * 100) : 0;
    const segments = [
      { key: "overview.seg_fixed", value: p.fixed, color: "var(--orange-color)" },
      { key: "overview.seg_variable", value: p.variable, color: "var(--amber-color)" },
      { key: "overview.seg_savings", value: p.savings, color: "var(--light-blue-color)" },
      {
        key: "overview.seg_free",
        value: Math.max(0, free),
        color: "color-mix(in srgb, var(--success-color) 45%, transparent)",
      },
    ] as const;
    const share = (v: number) => (income > 0 ? v / income : 0);
    return html`
      <ha-card class="hero">
        ${this._head(mdiWalletOutline, title, html`<span class="hint">${t(h, "overview.actual_month")}</span>`)}
        <div class="hero-top">
          <div class="free">
            <span class="disc"><ha-svg-icon .path=${mdiWalletOutline}></ha-svg-icon></span>
            <div class="col-text">
              <span style="font-weight:500">${t(h, "overview.free")}</span>
              <span class="num big ${free < 0 ? "negative" : ""}">${m(free)}</span>
              ${p.income > 0 ? html`<span class="pct ${free < 0 ? "bad" : ""}">${t(h, "overview.free_pct", { pct: percent(h, free / p.income) })}</span>` : nothing}
              <span class="small muted num">${t(h, "overview.free_equivalent", { amount: m(remaining) })}</span>
            </div>
          </div>
          <div class="progress">
            <div class="between">
              <span style="font-weight:500">${t(h, "overview.outflows_in", { month: monthLabel })}</span>
              <span class="num">${t(h, "overview.paid_of", { paid: m(p.paid), due: m(p.due) })}</span>
            </div>
            <div class="track">
              <div class="fill" style="width:${paidW.toFixed(1)}%"></div>
              ${p.today_day !== null ? html`<div class="today" title=${t(h, "common.today")} style="left:${((p.today_day / p.days_in_month) * 100).toFixed(1)}%"></div>` : nothing}
            </div>
            <div class="between small muted">
              <span>${t(h, "overview.paid_pct", { pct: percent(h, p.due > 0 ? p.paid / p.due : 0) })}${p.today_day !== null ? ` · ${t(h, "overview.day_of", { day: p.today_day, days: p.days_in_month })}` : ""}</span>
              <span class="num">${t(h, "overview.still_open", { amount: m(Math.max(0, p.due - p.paid)) })}</span>
            </div>
          </div>
        </div>
        <div class="col-text" style="gap:10px">
          <div class="stack">
            ${segments.map((seg) => html`<div title=${t(h, seg.key)} style="width:${(share(seg.value) * 100).toFixed(2)}%; background:${seg.color}"></div>`)}
          </div>
          <div class="legend">
            ${segments.map(
              (seg) => html`
                <div class="item">
                  <span class="swatch" style="background:${seg.color}"></span>
                  <div class="col-text">
                    <span class="small muted">${t(h, seg.key)} · ${percent(h, share(seg.value))}</span>
                    <span class="num amount">${m(seg.value)}</span>
                  </div>
                </div>
              `,
            )}
          </div>
          <span class="small muted">${t(h, "overview.income_expenses", { income: m(income), expenses: m(p.fixed + p.variable) })}</span>
        </div>
        <div class="kpis">
          ${this._kpi(mdiPiggyBankOutline, "var(--light-blue-color)", t(h, "insights.savings_rate"), percent(h, p.savings_rate), p.savings_rate === null ? ["", ""] : p.savings_rate >= SAVINGS_TARGET ? [t(h, "overview.on_target"), "good"] : [t(h, "overview.below_target"), "warn"])}
          ${this._kpi(mdiLockOutline, "var(--orange-color)", t(h, "insights.fixed_cost_rate"), percent(h, p.fixed_cost_rate), p.fixed_cost_rate === null ? ["", ""] : p.fixed_cost_rate > FIXED_LIMIT ? [t(h, "overview.fixed_high"), "warn"] : [t(h, "overview.fixed_ok"), "good"])}
          ${this._settlementKpi(d.household)}
        </div>
      </ha-card>
    `;
  }

  private _kpi(
    path: string,
    color: string,
    label: string,
    value: string,
    note: readonly [string, string],
  ) {
    return html`
      <div class="kpi">
        <span class="disc" style="color:${color}; background: color-mix(in srgb, ${color} 20%, transparent)">
          <ha-svg-icon .path=${path}></ha-svg-icon>
        </span>
        <div class="col-text">
          <span class="small muted">${label}</span>
          <span class="num value">${value}</span>
          ${note[0] ? html`<span class="small ${note[1]}">${note[0]}</span>` : nothing}
        </div>
      </div>
    `;
  }

  private _settlementKpi(hh: MonthStats) {
    const h = this.hass;
    const m = (c: number) => money(h, c, hh.currency);
    const color = "var(--deep-purple-color)";
    if (!this.userId) {
      const total = hh.transfers.reduce((a, tr) => a + tr.amount, 0);
      return this._kpi(mdiSwapHorizontal, color, t(h, "overview.kpi_open_settlement"), m(total), [
        t(h, "overview.transfers_count", { count: hh.transfers.length }),
        "muted",
      ]);
    }
    const f = hh.fairness.find((x) => x.user_id === this.userId);
    const balance = f?.balance ?? 0;
    const pays = hh.transfers.filter((tr) => tr.from_user_id === this.userId);
    const gets = hh.transfers.filter((tr) => tr.to_user_id === this.userId);
    const note: [string, string] = pays.length
      ? [
          t(h, "overview.pays_to", {
            names: pays.map((tr) => this._user(tr.to_user_id)).join(", "),
          }),
          "bad",
        ]
      : gets.length
        ? [
            t(h, "overview.receives_from", {
              names: gets.map((tr) => this._user(tr.from_user_id)).join(", "),
            }),
            "good",
          ]
        : ["", ""];
    return this._kpi(
      mdiSwapHorizontal,
      color,
      t(h, "overview.kpi_settlement"),
      signedMoney(h, balance, hh.currency, balance < 0),
      note,
    );
  }

  // ----- categories -----

  private _categories(s: MonthStats) {
    const h = this.hass;
    const m = (c: number) => money(h, c, s.currency);
    const rows = s.categories.filter((c) => c.expenses > 0).sort((a, b) => b.expenses - a.expenses);
    const top = rows.slice(0, TOP_CATEGORIES);
    const rest = rows.slice(TOP_CATEGORIES);
    const max = top[0]?.expenses ?? 1;
    const total = s.totals.expenses || 1;
    return html`
      <ha-card>
        ${this._head(mdiShapeOutline, t(h, "overview.by_category"), html`<span class="hint">${this.userId ? this._user(this.userId) : t(h, "overview.household")}</span>`)}
        ${top.length === 0 ? html`<div class="empty">${t(h, "common.none")}</div>` : nothing}
        ${top.map((c) => {
          const cat = this._category(c.category_id);
          return html`
            <div class="row">
              ${categoryIcon(cat)}
              <div class="grow col-text" style="gap:6px">
                <div class="between">
                  <span class="name">${cat?.name ?? c.category_id}</span>
                  <span class="num">${m(c.expenses)} <span class="small muted">${percent(h, c.expenses / total)}</span></span>
                </div>
                <div class="bar"><div style="width:${((c.expenses / max) * 100).toFixed(1)}%; background:${cat?.color ? `var(--${cat.color}-color)` : "var(--primary-color)"}"></div></div>
              </div>
            </div>
          `;
        })}
        <div class="indent">
          ${
            rest.length
              ? html`<span class="small muted">${t(h, "overview.more_categories", { count: rest.length, amount: m(rest.reduce((a, c) => a + c.expenses, 0)) })} → </span>`
              : nothing
          }
          ${this._link("items", t(h, "overview.all_items"))}
        </div>
      </ha-card>
    `;
  }

  // ----- members -----

  private _members(hh: MonthStats) {
    const h = this.hass;
    const b = this.budget!;
    const m = (c: number) => money(h, c, hh.currency);
    return html`
      <ha-card>
        ${this._head(mdiAccountGroupOutline, t(h, "overview.members"), html`<span class="hint">${t(h, "overview.free_per_month")}</span>`)}
        ${hh.members.map((r) => {
          const color = colorOf(b, r.user_id);
          const income = r.earnings;
          const share = (v: number) => (income > 0 ? (v / income) * 100 : 0).toFixed(2);
          const dim = this.userId !== "" && this.userId !== r.user_id;
          return html`
            <button
              class="member-row ${dim ? "dim" : ""}"
              aria-pressed=${this.userId === r.user_id}
              @click=${() => this._select(this.userId === r.user_id ? "" : r.user_id)}
            >
              ${avatar(this._user(r.user_id), color, 40)}
              <span class="grow col-text" style="flex:1; gap:6px">
                <span class="between">
                  <span class="col-text">
                    <span class="name">${this._user(r.user_id)}</span>
                    <span class="small muted">${t(h, "overview.member_sub", { income: m(r.earnings), rate: percent(h, r.savings_rate) })}</span>
                  </span>
                  <span class="num ${r.balance < 0 ? "bad" : "good"}" style="font-weight:500">${m(r.balance)}</span>
                </span>
                <span class="stack thin">
                  <span style="width:${share(r.expenses.fixed)}%; background: var(--orange-color)"></span>
                  <span style="width:${share(r.expenses.variable)}%; background: var(--amber-color)"></span>
                  <span style="width:${share(r.savings)}%; background: var(--light-blue-color)"></span>
                  <span style="width:${share(Math.max(0, r.balance))}%; background: color-mix(in srgb, var(--success-color) 45%, transparent)"></span>
                </span>
              </span>
            </button>
          `;
        })}
        <div class="small muted indent">${t(h, "overview.bar_hint")}</div>
      </ha-card>
    `;
  }

  // ----- year outlook -----

  private _recurrence(item: Item | undefined): string {
    return item ? t(this.hass, `recurrence.${item.recurrence}` as I18nKey).toLowerCase() : "";
  }

  private _yearOutlook(d: Overview, cur: string) {
    const h = this.hass;
    const m = (c: number) => money(h, c, cur);
    const y = d.year;
    const max = Math.max(1, ...y.months.map((x) => x.total));
    const bar = (total: number) => `${((total / max) * 92).toFixed(1)}px`;
    const isCurrent = (month: number) => month === this._month && y.year === this._year;
    const notes: TemplateResult[] = [];
    if (y.max_month && y.max_entry) {
      const item = this._item(y.max_entry.item_id);
      notes.push(
        this._note(
          mdiTrendingUp,
          "var(--orange-color)",
          t(h, "overview.max_month", { month: monthName(h, y.max_month) }),
          t(h, "overview.max_month_sub", {
            amount: m(y.months[y.max_month - 1].total),
            title: item?.title ?? "",
            item_amount: m(y.max_entry.due),
            recurrence: this._recurrence(item),
          }),
        ),
      );
    }
    if (y.next_special) {
      const item = this._item(y.next_special.item_id);
      notes.push(
        this._note(
          mdiCalendarStar,
          "var(--red-color)",
          t(h, "overview.next_special"),
          t(h, "overview.next_special_sub", {
            title: item?.title ?? "",
            amount: m(item?.amount ?? 0),
            date: formatDate(h, y.next_special.date, { day: "numeric", month: "short" }),
            recurrence: this._recurrence(item),
          }),
        ),
      );
    }
    if (y.next_month) {
      const n = y.next_month;
      const kind = n.delta < 0 ? "less" : n.delta > 0 ? "more" : "same";
      notes.push(
        this._note(
          mdiAlertCircleOutline,
          "var(--light-blue-color)",
          t(h, `overview.next_month_${kind}` as I18nKey, { month: monthName(h, n.month) }),
          t(h, `overview.next_month_sub_${kind}` as I18nKey, {
            amount: m(n.total),
            delta: m(Math.abs(n.delta)),
            month: monthName(h, this._month),
          }),
        ),
      );
    }
    return html`
      <ha-card>
        ${this._head(mdiChartBar, t(h, "overview.outflows_year", { year: y.year }), this._link("insights", `${t(h, "overview.insights_link")} →`))}
        <div class="chart">
          <div class="bars">
            <div class="plot">
              <div class="avg" style="bottom:${bar(y.avg_month)}"><span class="num">${t(h, "overview.avg", { amount: m(y.avg_month) })}</span></div>
              ${y.months.map(
                (mo) => html`
                  <div class="month ${isCurrent(mo.month) ? "current" : ""} ${mo.month === y.max_month ? "peak" : ""}">
                    <span class="label num ${mo.month === y.max_month ? "warn" : ""}" style="color:${isCurrent(mo.month) && mo.month !== y.max_month ? "var(--primary-color)" : ""}">${isCurrent(mo.month) || mo.month === y.max_month ? m(mo.total) : ""}</span>
                    <div class="col-bar" title="${monthName(h, mo.month)}: ${m(mo.total)}" style="height:${bar(mo.total)}"></div>
                  </div>
                `,
              )}
            </div>
            <div class="names">${y.months.map((mo) => html`<span class=${isCurrent(mo.month) ? "current" : ""}>${monthName(h, mo.month, "short")}</span>`)}</div>
          </div>
          ${notes.length ? html`<div class="notes">${notes}</div>` : nothing}
        </div>
        ${y.unscheduled.length ? html`<p class="small muted" style="margin:0">${t(h, "insights.unscheduled")} ${y.unscheduled.map((id) => this._item(id)?.title).join(", ")}</p>` : nothing}
      </ha-card>
    `;
  }

  private _note(path: string, color: string, title: string, sub: string) {
    return html`
      <div class="note">
        <span class="disc" style="color:${color}; background: color-mix(in srgb, ${color} 20%, transparent)">
          <ha-svg-icon .path=${path}></ha-svg-icon>
        </span>
        <div class="col-text">
          <span class="title">${title}</span>
          <span class="small muted">${sub}</span>
        </div>
      </div>
    `;
  }

  // ----- up next -----

  private _when(iso: string): string {
    const h = this.hass;
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    if (iso === toIso(today)) return t(h, "common.today");
    if (iso === toIso(tomorrow)) return t(h, "overview.tomorrow");
    return formatDate(h, iso, { weekday: "short", day: "numeric", month: "short" });
  }

  private _occurrence(o: Occurrence, cur: string) {
    const h = this.hass;
    const item = this._item(o.item_id);
    if (!item) return nothing;
    const who = this.userId ? "" : ` · ${this._user(item.user_id)}`;
    return html`
      <div class="row ${o.paid ? "paid" : ""}">
        ${categoryIcon(this._category(item.category_id))}
        <div class="grow col-text">
          <span class="name">${item.title}</span>
          <span class="small muted">${this._when(o.date)}${who}</span>
        </div>
        <span class="num ${item.type}" style="font-weight:500; white-space:nowrap">${signedMoney(h, item.amount, item.currency ?? cur, item.type !== "earning")}</span>
        <ha-icon-button
          class="paid-toggle"
          .label=${t(h, o.paid ? "calendar.mark_unpaid" : "calendar.mark_paid")}
          .path=${o.paid ? mdiCheckCircle : mdiCheckboxBlankCircleOutline}
          @click=${() => this._togglePaid(o)}
        ></ha-icon-button>
      </div>
    `;
  }

  private async _togglePaid(o: Occurrence) {
    await api.setPaid(this.hass!, o.item_id, o.date, !o.paid);
    await this._load();
  }

  private _upNext(d: Overview, cur: string) {
    const h = this.hass;
    const rows = d.upcoming;
    const income = d.next_income ? this._item(d.next_income.item_id) : undefined;
    return html`
      <ha-card>
        ${this._head(mdiCalendarClock, t(h, "overview.up_next"), html`<span class="hint">${t(h, "overview.next_payments")}</span>`)}
        ${rows.length ? rows.map((o) => this._occurrence(o, cur)) : html`<div class="small muted">${t(h, "overview.nothing_due")}</div>`}
        ${
          income && d.next_income
            ? html`
              <div class="divider"></div>
              <div class="row">
                <span class="disc" style="width:36px; height:36px; flex:none; border-radius:50%; display:flex; align-items:center; justify-content:center; color: var(--success-color); background: color-mix(in srgb, var(--success-color) 20%, transparent); --mdc-icon-size: 20px">
                  <ha-svg-icon .path=${mdiTrendingUp}></ha-svg-icon>
                </span>
                <div class="grow col-text">
                  <span class="name">${t(h, "overview.next_income")}</span>
                  <span class="small muted">${income.title} · ${this._when(d.next_income.date)}${this.userId ? "" : ` · ${this._user(income.user_id)}`}</span>
                </div>
                <span class="num earning" style="font-weight:500; white-space:nowrap">${signedMoney(h, income.amount, income.currency ?? cur, false)}</span>
              </div>
            `
            : nothing
        }
        <div class="indent">${this._link("calendar", `${t(h, "overview.calendar_link")} →`)}</div>
      </ha-card>
    `;
  }

  // ----- settlement -----

  private _settlement(hh: MonthStats) {
    const h = this.hass;
    const b = this.budget!;
    const m = (c: number) => money(h, c, hh.currency);
    const rule = b.config.split_rule === "equal" ? "equal" : "income";
    const maxAbs = Math.max(1, ...hh.fairness.map((f) => Math.abs(f.balance)));
    return html`
      <ha-card>
        ${this._head(mdiSwapHorizontal, t(h, "overview.settlement"), html`<span class="badge">${t(h, `settings.split_rule.${rule}`)}</span>`)}
        ${
          hh.transfers.length === 0
            ? html`<p class="settled"><ha-icon icon="mdi:check-circle"></ha-icon> ${t(h, "overview.settled")}</p>`
            : hh.transfers.map((tr) => {
                const hl =
                  !this.userId || this.userId === tr.from_user_id || this.userId === tr.to_user_id;
                return html`
                  <div class="transfer ${hl ? "hl" : ""}">
                    ${avatar(this._user(tr.from_user_id), colorOf(b, tr.from_user_id), 32)}
                    <ha-svg-icon .path=${mdiArrowRight}></ha-svg-icon>
                    ${avatar(this._user(tr.to_user_id), colorOf(b, tr.to_user_id), 32)}
                    <span class="text"><b style="font-weight:500">${this._user(tr.from_user_id)}</b> ${t(h, "overview.pays")} <b style="font-weight:500">${this._user(tr.to_user_id)}</b></span>
                    <span class="num" style="font-weight:500; font-size:15px">${m(tr.amount)}</span>
                  </div>
                `;
              })
        }
        <div class="axis"><span>${t(h, "overview.underpaid")}</span><span>${t(h, "overview.overpaid")}</span></div>
        ${hh.fairness.map((f) => {
          const w = `${((Math.abs(f.balance) / maxAbs) * 100).toFixed(1)}%`;
          const dim = this.userId !== "" && this.userId !== f.user_id;
          return html`
            <div class="balance ${dim ? "dim" : ""}" style=${dim ? "opacity:0.45" : ""}>
              <div class="between" style="font-size:13px">
                <span style="font-weight:500">${this._user(f.user_id)}</span>
                <span class="num ${f.balance < 0 ? "bad" : f.balance > 0 ? "good" : ""}" style="font-weight:500">${signedMoney(h, f.balance, hh.currency, f.balance < 0)}</span>
              </div>
              <div class="bars2">
                <div class="left"><div style="width:${f.balance < 0 ? w : "0%"}"></div></div>
                <div class="mid"></div>
                <div class="right"><div style="width:${f.balance > 0 ? w : "0%"}"></div></div>
              </div>
              <span class="small muted">${t(h, "overview.paid_fair", { paid: m(f.shared_costs_paid), fair: m(f.fair_share) })}</span>
            </div>
          `;
        })}
        <p class="small muted" style="margin:0">
          ${t(h, rule === "equal" ? "overview.rule_equal" : "overview.rule_income")}
          ${t(h, "overview.rule_subset")}
        </p>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-overview": ProBudgetOverview;
  }
}
