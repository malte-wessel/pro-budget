import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { api } from "../api.ts";
import { categoryIcon } from "../color.ts";
import type { ProBudgetCategoryDialog } from "../dialogs/category-dialog.ts";
import type { ProBudgetConfirm } from "../dialogs/confirm.ts";
import type { DataTableColumns, HomeAssistant, OverflowMenuItem, Route } from "../ha/types.ts";
import { t } from "../i18n.ts";
import { tabs } from "../nav.ts";
import { sharedStyles } from "../styles.ts";
import type { BudgetState, Category } from "../types.ts";

interface Row {
  id: string;
  category: Category;
  icon: string | null;
  name: string;
  items: number;
}

@customElement("pro-budget-categories")
export class ProBudgetCategories extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property({ attribute: false }) route?: Route;
  @property({ type: Boolean }) narrow = false;
  @query("pro-budget-category-dialog") private _dialog!: ProBudgetCategoryDialog;
  @query("pro-budget-confirm") private _confirm!: ProBudgetConfirm;

  // HA's data table sizes its rows to the header's scroll width only in its own update cycle,
  // so after a resize the row backgrounds stop short of overflowing columns until something
  // re-renders it. A new columns object per render is enough; request one on resize.
  private _resize = new ResizeObserver(() => this.requestUpdate());

  connectedCallback() {
    super.connectedCallback();
    this._resize.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resize.disconnect();
  }

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        height: 100%;
      }
    `,
  ];

  private get _rows(): Row[] {
    const b = this.budget!;
    return b.categories.map((category) => ({
      id: category.id,
      category,
      icon: category.icon,
      name: category.name,
      items: b.items.filter((i) => i.category_id === category.id).length,
    }));
  }

  private get _columns(): DataTableColumns<Row> {
    const h = this.hass;
    return {
      icon: {
        title: "",
        type: "icon",
        showNarrow: true,
        moveable: false,
        template: (r) => categoryIcon(r.category),
      },
      name: {
        title: t(h, "categories.name"),
        main: true,
        sortable: true,
        filterable: true,
        direction: "asc",
        flex: 2,
      },
      items: { title: t(h, "nav.items"), type: "numeric", sortable: true, minWidth: "100px" },
      actions: {
        title: "",
        type: "overflow-menu",
        showNarrow: true,
        moveable: false,
        template: (r) => html`
          <ha-icon-overflow-menu .hass=${h} .narrow=${this.narrow} .items=${this._menu(r)}></ha-icon-overflow-menu>
        `,
      },
    };
  }

  private _menu(r: Row): OverflowMenuItem[] {
    return [
      {
        path: mdiPencil,
        label: t(this.hass, "common.edit"),
        action: () => this._dialog.open(r.category),
      },
      {
        path: mdiDelete,
        label: r.items
          ? t(this.hass, "categories.in_use", { count: r.items })
          : t(this.hass, "common.delete"),
        warning: true,
        disabled: r.items > 0,
        action: () => void this._delete(r.category),
      },
    ];
  }

  private async _delete(c: Category) {
    if (!(await this._confirm.open(t(this.hass, "categories.delete_confirm", { name: c.name }))))
      return;
    await api.deleteCategory(this.hass!, c.id);
  }

  private _rowClicked(e: CustomEvent<{ id: string }>) {
    const category = this.budget?.categories.find((c) => c.id === e.detail.id);
    if (category) this._dialog.open(category);
  }

  render() {
    if (!this.budget) return nothing;
    const h = this.hass;
    return html`
      <hass-tabs-subpage-data-table
        .hass=${h}
        .narrow=${this.narrow}
        .route=${this.route}
        .tabs=${tabs(h, this.route)}
        main-page
        has-fab
        clickable
        id="id"
        .columns=${this._columns}
        .data=${this._rows}
        .searchLabel=${t(h, "categories.search", { count: this.budget.categories.length })}
        .noDataText=${t(h, "items.empty")}
        @row-click=${this._rowClicked}
      >
        <ha-button slot="fab" size="l" variant="brand" appearance="accent" @click=${() => this._dialog.open()}>
          <ha-svg-icon slot="start" .path=${mdiPlus}></ha-svg-icon>
          ${t(h, "categories.add")}
        </ha-button>
      </hass-tabs-subpage-data-table>
      <pro-budget-category-dialog .hass=${h}></pro-budget-category-dialog>
      <pro-budget-confirm .hass=${h}></pro-budget-confirm>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-categories": ProBudgetCategories;
  }
}
