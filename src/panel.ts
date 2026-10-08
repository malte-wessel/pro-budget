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

  // Mirrors hass-tabs-subpage and ha-tab of Home Assistant 2026.10 (measured on the integrations
  // page): a header of --header-height in the sidebar colours with the tabs centred in it, and on
  // narrow screens a bottom bar with the icon above a small label.
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
      /* As hass-tabs-subpage: pinned to the viewport, so the bottom bar stays visible. */
      :host([narrow]) {
        position: fixed;
        inset: 0;
        width: 100%;
      }
      header {
        flex: 0 0 auto;
        box-sizing: border-box;
        height: calc(var(--header-height, 56px) + var(--safe-area-inset-top, 0px));
        padding-top: var(--safe-area-inset-top, 0px);
        background-color: var(--sidebar-background-color);
        color: var(--sidebar-text-color);
        font-size: var(--ha-font-size-xl, 20px);
        font-weight: var(--ha-font-weight-normal, 400);
        border-bottom: 1px solid var(--divider-color);
      }
      .toolbar-content {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 8px 12px;
        box-sizing: border-box;
      }
      :host([narrow]) .toolbar-content {
        padding: 4px;
      }
      ha-menu-button {
        color: var(--sidebar-icon-color);
        flex-shrink: 0;
        display: flex;
        margin-right: 24px;
        margin-inline-end: 24px;
        margin-inline-start: initial;
      }
      :host([narrow]) ha-menu-button {
        margin-right: 0;
        margin-inline-end: 0;
      }
      .main-title {
        flex: 1;
        min-width: 0;
        line-height: var(--ha-line-height-normal, 1.5);
        margin-inline-start: var(--main-title-margin, var(--ha-space-2, 8px));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      nav {
        display: flex;
        flex: 1;
        justify-content: center;
        overflow: hidden;
        font-size: var(--ha-font-size-m, 14px);
        height: 100%;
      }
      nav a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--ha-space-2, 8px);
        box-sizing: border-box;
        height: var(--header-height, 56px);
        max-width: 45%;
        min-width: 0;
        overflow: hidden;
        padding: 0 32px;
        color: var(--sidebar-text-color);
        text-decoration: none;
        white-space: nowrap;
        cursor: pointer;
        outline: none;
        position: relative;
      }
      nav a .name {
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
      }
      nav a ha-icon {
        --mdc-icon-size: 24px;
        flex-shrink: 0;
      }
      nav a[aria-current="page"] {
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
      }
      /* Hover and press feedback is HA's ripple (secondary text colour at 8 % / 12 %). */
      nav a ha-ripple {
        --ha-ripple-color: var(--secondary-text-color);
      }
      nav a:focus-visible::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: var(--secondary-text-color);
        opacity: 0.08;
      }
      /* Narrow: the tabs become a bottom bar. */
      :host([narrow]) nav {
        flex: 0 0 auto;
        height: auto;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 0 calc(16px + var(--safe-area-inset-right, 0px)) var(--safe-area-inset-bottom, 0px)
          calc(16px + var(--safe-area-inset-left, 0px));
        background-color: var(--sidebar-background-color);
        border-top: 1px solid var(--divider-color);
        font-size: var(--ha-font-size-s, 12px);
        z-index: 2;
      }
      :host([narrow]) nav a {
        flex: 1;
        max-width: none;
        min-width: 0;
        flex-direction: column;
        gap: 0;
        padding: 0 4px;
      }
      :host([narrow]) nav a ha-icon {
        margin-bottom: var(--ha-space-1, 4px);
      }
      :host([narrow]) nav a[aria-current="page"] {
        border-bottom: none;
      }
      main {
        flex: 1;
        overflow: auto;
        min-height: 0;
        position: relative;
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
              <ha-icon .icon=${v.icon}></ha-icon
              ><span class="name">${t(this.hass, `nav.${v.id}` as I18nKey)}</span>
              <ha-ripple></ha-ripple>
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
        <div class="toolbar-content">
          <ha-menu-button .hass=${h} .narrow=${this.narrow}></ha-menu-button>
          ${this.narrow ? html`<div class="main-title">${t(h, "panel.title")}</div>` : this._tabs()}
        </div>
      </header>
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
      ${this.narrow ? this._tabs() : nothing}
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
