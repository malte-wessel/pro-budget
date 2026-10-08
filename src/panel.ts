import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api } from "./api.ts";
import { loadHaElements } from "./ha/elements.ts";
import type { HomeAssistant, PanelInfo, Route } from "./ha/types.ts";
import { t } from "./i18n.ts";
import { currentView, DEFAULT_PREFIX } from "./nav.ts";
import type { BudgetState } from "./types.ts";
import "./dialogs/category-dialog.ts";
import "./dialogs/confirm.ts";
import "./dialogs/item-dialog.ts";
import "./views/calendar.ts";
import "./views/categories.ts";
import "./views/insights.ts";
import "./views/items.ts";
import "./views/overview.ts";

declare const __VERSION__: string;

/**
 * The panel: subscribes to the budget and shows the view for the route. Each view renders its own
 * Home Assistant page frame (hass-tabs-subpage or hass-tabs-subpage-data-table), as HA's own
 * settings pages do, so the header, the tabs and the tables are HA's.
 */
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

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .loading,
    ha-alert {
      display: block;
      padding: 16px;
    }
  `;

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
    if (changed.has("route")) this._redirectToView();
  }

  /** `/pro-budget` → `/pro-budget/overview`, so HA's tabs can mark the active one by path. */
  private _redirectToView() {
    const route = this.route;
    if (!route || route.path.replace(/\//g, "") !== "") return;
    history.replaceState(null, "", `${route.prefix ?? DEFAULT_PREFIX}/${currentView(route)}`);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: true } }));
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

  render() {
    const h = this.hass;
    const b = this._budget;
    if (this._error) return html`<ha-alert alert-type="error">${this._error}</ha-alert>`;
    if (!this._ready || !b) return html`<div class="loading">${t(h, "common.loading")}</div>`;
    const common = {
      hass: h,
      narrow: this.narrow,
      route: this.route,
      budget: b,
      version: __VERSION__,
    };
    const onUser = (e: CustomEvent<{ userId: string }>) => (this._userId = e.detail.userId);
    switch (currentView(this.route)) {
      case "items":
        return html`<pro-budget-items .hass=${common.hass} .narrow=${common.narrow} .route=${common.route} .budget=${b}></pro-budget-items>`;
      case "calendar":
        return html`<pro-budget-calendar .hass=${common.hass} .narrow=${common.narrow} .route=${common.route} .budget=${b} .userId=${this._userId} @user-changed=${onUser}></pro-budget-calendar>`;
      case "insights":
        return html`<pro-budget-insights .hass=${common.hass} .narrow=${common.narrow} .route=${common.route} .budget=${b} .userId=${this._userId} @user-changed=${onUser}></pro-budget-insights>`;
      case "categories":
        return html`<pro-budget-categories .hass=${common.hass} .narrow=${common.narrow} .route=${common.route} .budget=${b}></pro-budget-categories>`;
      default:
        return html`<pro-budget-overview .hass=${common.hass} .narrow=${common.narrow} .route=${common.route} .budget=${b} .userId=${this._userId} .version=${common.version} @user-changed=${onUser}></pro-budget-overview>`;
    }
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-panel": ProBudgetPanel;
  }
}
