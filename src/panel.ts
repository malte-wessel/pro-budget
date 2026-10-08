import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { api } from "./api.ts";
import { loadHaElements } from "./ha/elements.ts";
import type { HomeAssistant, PanelInfo, Route } from "./ha/types.ts";
import { t, type I18nKey } from "./i18n.ts";
import { sharedStyles } from "./styles.ts";
import type { BudgetState } from "./types.ts";
import "./dialogs/category-dialog.ts";
import "./dialogs/confirm.ts";
import "./dialogs/item-dialog.ts";
import "./views/calendar.ts";
import "./views/categories.ts";
import "./views/insights.ts";
import "./views/items.ts";
import "./views/overview.ts";

const VIEWS = [
  { id: "overview", icon: "mdi:view-dashboard-outline" },
  { id: "items", icon: "mdi:format-list-bulleted" },
  { id: "calendar", icon: "mdi:calendar-month-outline" },
  { id: "insights", icon: "mdi:chart-box-outline" },
  { id: "categories", icon: "mdi:shape-outline" },
] as const;
type View = (typeof VIEWS)[number]["id"];

declare const __VERSION__: string;

/** The panel shell: Home Assistant's settings-page layout with icon tabs in the header. */
@customElement("pro-budget-panel")
export class ProBudgetPanel extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) route?: Route;
  @property({ attribute: false }) panel?: PanelInfo;
  @state() private _budget?: BudgetState;
  @state() private _ready = false;
  @state() private _error = "";
  @state() private _userId = "";
  private _unsubscribe?: () => Promise<void>;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--primary-background-color);
        color: var(--primary-text-color);
      }
      /* Header as hass-tabs-subpage: 64px, tabs centred on wide screens. */
      header {
        display: flex;
        align-items: center;
        height: 64px;
        flex: 0 0 auto;
        padding: 0 8px 0 4px;
        background: var(--app-header-background-color, var(--primary-background-color));
        color: var(--app-header-text-color, var(--primary-text-color));
        border-bottom: 1px solid var(--divider-color);
      }
      header .title {
        font-size: 20px;
        font-weight: 400;
        margin-left: 8px;
        white-space: nowrap;
      }
      header .side {
        display: flex;
        align-items: center;
        min-width: 0;
      }
      nav {
        flex: 1;
        display: flex;
        justify-content: center;
        align-self: stretch;
        gap: 4px;
        overflow-x: auto;
      }
      /* Tab colours as HA: on a light header the active tab is the primary colour; on a
         coloured header (older default theme) tabs use the header's text colour. */
      nav a {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0 20px;
        color: var(--primary-text-color);
        text-decoration: none;
        font-size: 16px;
        white-space: nowrap;
        border-bottom: 2px solid transparent;
        margin-bottom: -1px;
      }
      nav a ha-icon {
        --mdc-icon-size: 24px;
      }
      nav a[aria-current="page"] {
        color: var(--primary-color);
        border-bottom-color: var(--primary-color);
      }
      :host([colored-header]) nav a {
        color: var(--app-header-text-color, white);
        opacity: 0.75;
      }
      :host([colored-header]) nav a[aria-current="page"] {
        opacity: 1;
        border-bottom-color: var(--app-header-selection-bar-color, var(--app-header-text-color, white));
      }
      /* Narrow: title in the header, tabs as an icon row below it. */
      :host([narrow]) nav {
        justify-content: flex-start;
        border-bottom: 1px solid var(--divider-color);
        background: var(--app-header-background-color, var(--primary-background-color));
        height: 56px;
        flex: 0 0 auto;
      }
      :host([narrow]) nav a {
        flex: 1;
        justify-content: center;
        padding: 0 12px;
        gap: 8px;
      }
      :host([narrow]) nav a span {
        display: none;
      }
      main {
        flex: 1;
        overflow: auto;
        min-height: 0;
      }
      .members {
        display: flex;
        gap: 8px;
        padding: 12px 16px 0;
      }
      .version {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 12px;
      }
    `,
  ];

  connectedCallback() {
    super.connectedCallback();
    void this._start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    void this._unsubscribe?.();
    this._unsubscribe = undefined;
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("hass") && this.hass && !this._unsubscribe) void this._start();
    if (changed.has("narrow")) this.toggleAttribute("narrow", this.narrow);
    if (changed.has("hass")) this._updateHeaderMode();
  }

  /** Whether the theme paints the header in a colour (then tabs use the header text colour). */
  private _updateHeaderMode() {
    const style = getComputedStyle(this);
    const header = style.getPropertyValue("--app-header-background-color").trim();
    const page = style.getPropertyValue("--primary-background-color").trim();
    const card = style.getPropertyValue("--card-background-color").trim();
    const sidebar = style.getPropertyValue("--sidebar-background-color").trim();
    const light = !header || [page, card, sidebar].includes(header);
    this.toggleAttribute("colored-header", !light);
  }

  private async _start() {
    if (!this.hass || this._unsubscribe) return;
    try {
      await loadHaElements();
      this._unsubscribe = await api.subscribe(this.hass, (state) => (this._budget = state));
      this._ready = true;
    } catch (err) {
      this._error = String((err as Error)?.message ?? err);
    }
  }

  private get _view(): View {
    const path = this.route?.path?.replace(/^\//, "").split("/")[0] ?? "";
    return VIEWS.some((v) => v.id === path) ? (path as View) : "overview";
  }

  private _navigate(view: View, e: Event) {
    e.preventDefault();
    history.pushState(null, "", `${this.route?.prefix ?? "/pro-budget"}/${view}`);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  private _tabs() {
    const prefix = this.route?.prefix ?? "/pro-budget";
    return html`
      <nav>
        ${VIEWS.map(
          (v) => html`
            <a
              href="${prefix}/${v.id}"
              aria-current=${this._view === v.id ? "page" : nothing}
              title=${t(this.hass, `nav.${v.id}` as I18nKey)}
              @click=${(e: Event) => this._navigate(v.id, e)}
            >
              <ha-icon .icon=${v.icon}></ha-icon><span>${t(this.hass, `nav.${v.id}` as I18nKey)}</span>
            </a>
          `,
        )}
      </nav>
    `;
  }

  render() {
    const h = this.hass;
    const b = this._budget;
    return html`
      <header>
        <div class="side">
          <ha-menu-button .hass=${h} .narrow=${this.narrow}></ha-menu-button>
          ${this.narrow ? html`<div class="title">${t(h, "panel.title")}</div>` : nothing}
        </div>
        ${this.narrow ? html`<div class="grow"></div>` : this._tabs()}
      </header>
      ${this.narrow ? this._tabs() : nothing}
      <main>
        ${this._error ? html`<ha-alert alert-type="error">${this._error}</ha-alert>` : nothing}
        ${
          !this._ready || !b
            ? html`<div class="empty">${t(h, "common.loading")}</div>`
            : html`
              ${
                this._view !== "categories" && this._view !== "items" && b.users.length > 1
                  ? this._renderUserFilter(b)
                  : nothing
              }
              ${this._renderView(b)}
              <div class="version">Pro Budget v${__VERSION__}</div>
            `
        }
      </main>
    `;
  }

  private _renderUserFilter(b: BudgetState) {
    const all = this._view !== "insights";
    const active = (id: string) =>
      this._userId === id || (!all && !this._userId && id === this.hass?.user?.id);
    return html`
      <div class="members chips">
        ${
          all
            ? html`<button class=${classMap({ chip: true })} aria-pressed=${this._userId === ""} @click=${() => (this._userId = "")}>${t(this.hass, "common.all")}</button>`
            : nothing
        }
        ${b.users.map(
          (u) =>
            html`<button class="chip" aria-pressed=${active(u.id)} @click=${() => (this._userId = u.id)}>${u.name}</button>`,
        )}
      </div>
    `;
  }

  private _renderView(b: BudgetState) {
    const h = this.hass;
    switch (this._view) {
      case "items":
        return html`<pro-budget-items .hass=${h} .budget=${b} .narrow=${this.narrow}></pro-budget-items>`;
      case "calendar":
        return html`<pro-budget-calendar .hass=${h} .budget=${b} .userId=${this._userId}></pro-budget-calendar>`;
      case "insights":
        return html`<pro-budget-insights .hass=${h} .budget=${b} .userId=${this._userId}></pro-budget-insights>`;
      case "categories":
        return html`<pro-budget-categories .hass=${h} .budget=${b}></pro-budget-categories>`;
      default:
        return html`<pro-budget-overview .hass=${h} .budget=${b} .userId=${this._userId}></pro-budget-overview>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-panel": ProBudgetPanel;
  }
}
