import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { api } from "../api.ts";
import type { ProBudgetCategoryDialog } from "../dialogs/category-dialog.ts";
import type { ProBudgetConfirm } from "../dialogs/confirm.ts";
import type { HomeAssistant } from "../ha/types.ts";
import { t } from "../i18n.ts";
import { sharedStyles } from "../styles.ts";
import { renderTable, tableStyles, type Column } from "../table.ts";
import type { BudgetState, Category } from "../types.ts";

@customElement("pro-budget-categories")
export class ProBudgetCategories extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @state() private _search = "";
  @query("pro-budget-category-dialog") private _dialog!: ProBudgetCategoryDialog;
  @query("pro-budget-confirm") private _confirm!: ProBudgetConfirm;

  static styles = [sharedStyles, tableStyles];

  private _count(c: Category): number {
    return this.budget?.items.filter((i) => i.category_id === c.id).length ?? 0;
  }

  private async _delete(c: Category) {
    if (!(await this._confirm.open(t(this.hass, "categories.delete_confirm", { name: c.name }))))
      return;
    await api.deleteCategory(this.hass!, c.id);
  }

  render() {
    if (!this.budget) return nothing;
    const h = this.hass;
    const q = this._search.trim().toLowerCase();
    const rows = this.budget.categories.filter((c) => !q || c.name.toLowerCase().includes(q));
    const columns: Column<Category>[] = [
      {
        key: "icon",
        title: "",
        render: (c) => (c.icon ? html`<ha-icon .icon=${c.icon}></ha-icon>` : nothing),
      },
      { key: "name", title: t(h, "categories.name"), render: (c) => c.name },
      {
        key: "items",
        title: t(h, "nav.items"),
        numeric: true,
        render: (c) => String(this._count(c)),
      },
    ];
    return html`
      <div class="toolbar">
        <label class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="search"
            placeholder=${t(h, "categories.search", { count: this.budget.categories.length })}
            .value=${this._search}
            @input=${(e: Event) => (this._search = (e.target as HTMLInputElement).value)}
          />
        </label>
        <span class="spacer"></span>
        <ha-button @click=${() => this._dialog.open()}>
          <ha-icon slot="icon" icon="mdi:plus"></ha-icon>${t(h, "categories.add")}
        </ha-button>
      </div>
      ${renderTable<Category>({
        columns,
        groups: [{ key: "all", title: "", rows }],
        rowKey: (c) => c.id,
        onRowClick: (c) => this._dialog.open(c),
        menu: [
          { label: t(h, "common.edit"), icon: "mdi:pencil", onSelect: (c) => this._dialog.open(c) },
          {
            label: t(h, "common.delete"),
            icon: "mdi:delete",
            danger: true,
            disabled: (c) => this._count(c) > 0,
            onSelect: (c) => this._delete(c),
          },
        ],
        collapsed: new Set(),
        onToggleGroup: () => undefined,
        emptyText: t(h, "items.empty"),
      })}
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
