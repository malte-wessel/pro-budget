import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { dueLabel, isActiveInMonth, monthlyEquivalent } from "../budget.ts";
import type { ProBudgetConfirm } from "../dialogs/confirm.ts";
import type { ProBudgetItemDialog } from "../dialogs/item-dialog.ts";
import { money } from "../format.ts";
import type { HomeAssistant } from "../ha/types.ts";
import { t, type I18nKey } from "../i18n.ts";
import { sharedStyles } from "../styles.ts";
import { renderTable, sortRows, tableStyles, type Column, type Group } from "../table.ts";
import { ITEM_TYPES, type BudgetState, type Item } from "../types.ts";

const TYPE_ICONS: Record<Item["type"], string> = {
  earning: "mdi:cash-plus",
  expense: "mdi:cash-minus",
  saving: "mdi:piggy-bank-outline",
};
const GROUPINGS = ["category", "user", "type", "none"] as const;
type Grouping = (typeof GROUPINGS)[number];

@customElement("pro-budget-items")
export class ProBudgetItems extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property({ type: Boolean }) narrow = false;
  @state() private _search = "";
  @state() private _type = "";
  @state() private _user = "";
  @state() private _grouping: Grouping = "category";
  @state() private _sortKey = "monthly";
  @state() private _sortDesc = true;
  @state() private _collapsed = new Set<string>();
  @query("pro-budget-item-dialog") private _dialog!: ProBudgetItemDialog;
  @query("pro-budget-confirm") private _confirm!: ProBudgetConfirm;

  static styles = [sharedStyles, tableStyles];

  private _name(id: string): string {
    return this.budget?.users.find((u) => u.id === id)?.name ?? t(this.hass, "common.unknown_user");
  }

  private _category(id: string) {
    return this.budget?.categories.find((c) => c.id === id);
  }

  private get _columns(): Column<Item>[] {
    const h = this.hass;
    const b = this.budget!;
    const now = new Date();
    const cur = (i: Item) => i.currency ?? b.config.currency;
    return [
      {
        key: "icon",
        title: "",
        render: (i) =>
          html`<ha-icon .icon=${this._category(i.category_id)?.icon ?? TYPE_ICONS[i.type]}></ha-icon>`,
      },
      {
        key: "title",
        title: t(h, "items.col_title"),
        width: "40%",
        sort: (i) => i.title.toLowerCase(),
        render: (i) => html`
          ${i.title}
          ${i.shared ? html`<span class="pill">${t(h, "overview.shared")}</span>` : nothing}
          ${i.cost_kind === "variable" ? html`<span class="pill">${t(h, "cost_kind.variable")}</span>` : nothing}
          ${isActiveInMonth(i, now.getFullYear(), now.getMonth() + 1) ? nothing : html`<span class="pill">${t(h, "items.inactive")}</span>`}
          <span class="secondary">${t(h, `type.${i.type}` as I18nKey)} · ${t(h, `recurrence.${i.recurrence}` as I18nKey)} · ${dueLabel(h, i)}</span>
        `,
      },
      {
        key: "amount",
        title: t(h, "items.col_amount"),
        numeric: true,
        sort: (i) => i.amount,
        render: (i) => money(h, i.amount, cur(i)),
      },
      {
        key: "monthly",
        title: t(h, "items.col_monthly"),
        numeric: true,
        sort: (i) => monthlyEquivalent(i.amount, i.recurrence),
        render: (i) =>
          html`<span class=${i.type}>${money(h, monthlyEquivalent(i.amount, i.recurrence), cur(i))}</span>`,
      },
      {
        key: "category",
        title: t(h, "items.col_category"),
        optional: true,
        sort: (i) => this._category(i.category_id)?.name ?? "",
        render: (i) => this._category(i.category_id)?.name ?? "",
      },
      {
        key: "user",
        title: t(h, "items.col_user"),
        optional: true,
        sort: (i) => this._name(i.user_id),
        render: (i) => this._name(i.user_id),
      },
    ];
  }

  private get _groups(): Group<Item>[] {
    const b = this.budget!;
    const q = this._search.trim().toLowerCase();
    const rows = b.items
      .filter((i) => !this._type || i.type === this._type)
      .filter((i) => !this._user || i.user_id === this._user)
      .filter((i) => !q || i.title.toLowerCase().includes(q));
    const column = this._columns.find((c) => c.key === this._sortKey);
    const sorted = sortRows(rows, column, this._sortDesc);
    if (this._grouping === "none") return [{ key: "all", title: "", rows: sorted }];
    const keyOf = (i: Item) =>
      this._grouping === "category"
        ? i.category_id
        : this._grouping === "user"
          ? i.user_id
          : i.type;
    const titleOf = (key: string) =>
      this._grouping === "category"
        ? (this._category(key)?.name ?? key)
        : this._grouping === "user"
          ? this._name(key)
          : t(this.hass, `type.${key}.plural` as I18nKey);
    const order =
      this._grouping === "category"
        ? b.categories.map((c) => c.id)
        : this._grouping === "user"
          ? b.users.map((u) => u.id)
          : [...ITEM_TYPES];
    const map = new Map<string, Item[]>();
    for (const i of sorted) map.set(keyOf(i), [...(map.get(keyOf(i)) ?? []), i]);
    const keys = [
      ...order.filter((k) => map.has(k)),
      ...[...map.keys()].filter((k) => !order.includes(k)),
    ];
    return keys.map((key) => ({ key, title: titleOf(key), rows: map.get(key)! }));
  }

  private _sort(key: string) {
    if (this._sortKey === key) this._sortDesc = !this._sortDesc;
    else {
      this._sortKey = key;
      this._sortDesc = key === "amount" || key === "monthly";
    }
  }

  private _toggleGroup(key: string) {
    const next = new Set(this._collapsed);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    this._collapsed = next;
  }

  private async _delete(item: Item) {
    if (!(await this._confirm.open(t(this.hass, "item.delete_confirm", { title: item.title }))))
      return;
    await api.deleteItem(this.hass!, item.id);
  }

  render() {
    if (!this.budget) return nothing;
    const h = this.hass;
    const b = this.budget;
    return html`
      <div class="toolbar">
        <label class="search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input
            type="search"
            placeholder=${t(h, "items.search", { count: b.items.length })}
            .value=${this._search}
            @input=${(e: Event) => (this._search = (e.target as HTMLInputElement).value)}
          />
        </label>
        <select class="select" @change=${(e: Event) => (this._type = (e.target as HTMLSelectElement).value)}>
          <option value="">${t(h, "items.filter_type")}: ${t(h, "common.all")}</option>
          ${ITEM_TYPES.map((v) => html`<option value=${v} ?selected=${v === this._type}>${t(h, `type.${v}.plural` as I18nKey)}</option>`)}
        </select>
        ${
          b.users.length > 1
            ? html`
              <select class="select" @change=${(e: Event) => (this._user = (e.target as HTMLSelectElement).value)}>
                <option value="">${t(h, "items.filter_user")}: ${t(h, "common.all")}</option>
                ${b.users.map((u) => html`<option value=${u.id} ?selected=${u.id === this._user}>${u.name}</option>`)}
              </select>
            `
            : nothing
        }
        <select class="select" @change=${(e: Event) => (this._grouping = (e.target as HTMLSelectElement).value as Grouping)}>
          ${GROUPINGS.map((g) => html`<option value=${g} ?selected=${g === this._grouping}>${t(h, "items.group_by")}: ${t(h, `items.group.${g}` as I18nKey)}</option>`)}
        </select>
        <span class="spacer"></span>
        <ha-button @click=${() => this._dialog.open()}>
          <ha-icon slot="icon" icon="mdi:plus"></ha-icon>${this.narrow ? nothing : t(h, "items.add")}
        </ha-button>
      </div>
      ${renderTable<Item>({
        columns: this._columns,
        groups: this._groups,
        rowKey: (i) => i.id,
        onRowClick: (i) => this._dialog.open(i),
        menu: [
          { label: t(h, "common.edit"), icon: "mdi:pencil", onSelect: (i) => this._dialog.open(i) },
          {
            label: t(h, "common.delete"),
            icon: "mdi:delete",
            danger: true,
            onSelect: (i) => this._delete(i),
          },
        ],
        collapsed: this._collapsed,
        onToggleGroup: (k) => this._toggleGroup(k),
        sortKey: this._sortKey,
        sortDesc: this._sortDesc,
        onSort: (k) => this._sort(k),
        emptyText: t(h, "items.empty"),
      })}
      <pro-budget-item-dialog .hass=${h} .budget=${b}></pro-budget-item-dialog>
      <pro-budget-confirm .hass=${h}></pro-budget-confirm>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-items": ProBudgetItems;
  }
}
