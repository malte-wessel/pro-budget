import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
import { css, html, LitElement, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { api } from "../api.ts";
import { dueLabel, isActiveInMonth, monthlyEquivalent } from "../budget.ts";
import { categoryIcon } from "../color.ts";
import type { ProBudgetConfirm } from "../dialogs/confirm.ts";
import type { ProBudgetItemDialog } from "../dialogs/item-dialog.ts";
import { money } from "../format.ts";
import type {
  DataTableColumns,
  DataTableSorting,
  HomeAssistant,
  OverflowMenuItem,
  Route,
} from "../ha/types.ts";
import { t, type I18nKey } from "../i18n.ts";
import { tabs } from "../nav.ts";
import { sharedStyles } from "../styles.ts";
import type { BudgetState, Item } from "../types.ts";

const TYPE_ICONS: Record<Item["type"], string> = {
  earning: "mdi:cash-plus",
  expense: "mdi:cash-minus",
  saving: "mdi:piggy-bank-outline",
};

// Amount colours by item type, inline because the table renders templates in its shadow root.
const TYPE_COLORS: Record<Item["type"], string> = {
  earning: "var(--success-color, #43a047)",
  expense: "var(--error-color, #db4437)",
  saving: "var(--info-color, #4a90d9)",
};

/** A row of the data table: the item plus the values the table sorts, filters and groups by. */
interface Row {
  id: string;
  item: Item;
  category_icon: { icon: string; color: string | null };
  title: string;
  type: string;
  amount: number;
  monthly: number;
  recurrence: string;
  due: string;
  cost: string;
  shared: string;
  category: string;
  member: string;
  currency: string;
  status: string;
}

/** The items as Home Assistant's data table page: search, grouping, sorting and column settings are HA's. */
@customElement("pro-budget-items")
export class ProBudgetItems extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property({ attribute: false }) route?: Route;
  @property({ type: Boolean }) narrow = false;
  @query("pro-budget-item-dialog") private _dialog!: ProBudgetItemDialog;
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
      /* Two-line main cell on narrow screens, as HA's entities page. */
      hass-tabs-subpage-data-table {
        --data-table-row-height: 60px;
      }
    `,
  ];

  private get _rows(): Row[] {
    const b = this.budget!;
    const h = this.hass;
    const now = new Date();
    const name = (id: string) =>
      b.users.find((u) => u.id === id)?.name ?? t(h, "common.unknown_user");
    return b.items.map((item) => {
      const category = b.categories.find((c) => c.id === item.category_id);
      return {
        id: item.id,
        item,
        category_icon: {
          icon: category?.icon ?? TYPE_ICONS[item.type],
          color: category?.color ?? null,
        },
        title: item.title,
        type: t(h, `type.${item.type}` as I18nKey),
        amount: item.amount,
        monthly: monthlyEquivalent(item.amount, item.recurrence),
        category: category?.name ?? "",
        member: name(item.user_id),
        currency: item.currency ?? b.config.currency,
        recurrence: t(h, `recurrence.${item.recurrence}` as I18nKey),
        due: dueLabel(h, item),
        cost: t(h, `cost_kind.${item.cost_kind}` as I18nKey),
        shared: item.shared ? t(h, "overview.shared") : t(h, "overview.personal"),
        status: isActiveInMonth(item, now.getFullYear(), now.getMonth() + 1)
          ? t(h, "items.active")
          : t(h, "items.inactive"),
      };
    });
  }

  private get _columns(): DataTableColumns<Row> {
    const h = this.hass;
    return {
      icon: {
        title: "",
        type: "icon",
        showNarrow: true,
        moveable: false,
        template: (r) => categoryIcon(r.category_icon),
      },
      title: {
        title: t(h, "items.col_title"),
        main: true,
        sortable: true,
        filterable: true,
        direction: "asc",
        flex: 2,
        // A template drops HA's automatic second line on narrow screens, so it is rebuilt here
        // from the same values; `.secondary` is the table's own class.
        template: (r) => html`
          <div style="font-weight: var(--ha-font-weight-medium, 500)">${r.title}</div>
          ${
            this.narrow
              ? html`<div class="secondary">
                ${[money(h, r.amount, r.currency), money(h, r.monthly, r.currency), r.recurrence, r.due, r.type, r.category, r.member].join(" · ")}
              </div>`
              : nothing
          }
        `,
      },
      amount: {
        title: t(h, "items.col_amount"),
        type: "numeric",
        sortable: true,
        minWidth: "120px",
        template: (r) =>
          html`<span style="color: ${TYPE_COLORS[r.item.type]}">${money(h, r.amount, r.currency)}</span>`,
      },
      monthly: {
        title: t(h, "items.col_monthly"),
        type: "numeric",
        sortable: true,
        minWidth: "120px",
        template: (r) =>
          html`<span style="color: ${TYPE_COLORS[r.item.type]}">${money(h, r.monthly, r.currency)}</span>`,
      },
      recurrence: {
        title: t(h, "items.col_recurrence"),
        sortable: true,
        groupable: true,
        filterable: true,
        minWidth: "120px",
      },
      due: { title: t(h, "items.col_due"), filterable: true, minWidth: "120px" },
      type: {
        title: t(h, "items.filter_type"),
        sortable: true,
        groupable: true,
        filterable: true,
        minWidth: "100px",
      },
      category: {
        title: t(h, "items.col_category"),
        sortable: true,
        groupable: true,
        filterable: true,
        minWidth: "120px",
      },
      member: {
        title: t(h, "items.col_user"),
        sortable: true,
        groupable: true,
        filterable: true,
        minWidth: "120px",
      },
      status: {
        title: t(h, "items.col_status"),
        sortable: true,
        groupable: true,
        filterable: true,
        minWidth: "100px",
        defaultHidden: true,
      },
      cost: {
        title: t(h, "item.cost_kind"),
        sortable: true,
        groupable: true,
        filterable: true,
        minWidth: "100px",
        defaultHidden: true,
      },
      shared: {
        title: t(h, "item.shared"),
        sortable: true,
        groupable: true,
        filterable: true,
        minWidth: "100px",
        defaultHidden: true,
      },
      actions: {
        title: "",
        type: "overflow-menu",
        showNarrow: true,
        moveable: false,
        template: (r) => html`
          <ha-icon-overflow-menu .hass=${h} .narrow=${this.narrow} .items=${this._menu(r.item)}></ha-icon-overflow-menu>
        `,
      },
    };
  }

  private _menu(item: Item): OverflowMenuItem[] {
    return [
      {
        path: mdiPencil,
        label: t(this.hass, "common.edit"),
        action: () => this._dialog.open(item),
      },
      {
        path: mdiDelete,
        label: t(this.hass, "common.delete"),
        warning: true,
        action: () => void this._delete(item),
      },
    ];
  }

  private async _delete(item: Item) {
    if (!(await this._confirm.open(t(this.hass, "item.delete_confirm", { title: item.title }))))
      return;
    await api.deleteItem(this.hass!, item.id);
  }

  private _rowClicked(e: CustomEvent<{ id: string }>) {
    const item = this.budget?.items.find((i) => i.id === e.detail.id);
    if (item) this._dialog.open(item);
  }

  render() {
    if (!this.budget) return nothing;
    const h = this.hass;
    const sorting: DataTableSorting = { column: "monthly", direction: "desc" };
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
        .searchLabel=${t(h, "items.search", { count: this.budget.items.length })}
        .noDataText=${t(h, "items.empty")}
        .initialGroupColumn=${"category"}
        .initialSorting=${sorting}
        @row-click=${this._rowClicked}
      >
        <ha-button slot="fab" size="l" variant="brand" appearance="accent" @click=${() => this._dialog.open()}>
          <ha-svg-icon slot="start" .path=${mdiPlus}></ha-svg-icon>
          ${t(h, "items.add")}
        </ha-button>
      </hass-tabs-subpage-data-table>
      <pro-budget-item-dialog .hass=${h} .budget=${this.budget}></pro-budget-item-dialog>
      <pro-budget-confirm .hass=${h}></pro-budget-confirm>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-items": ProBudgetItems;
  }
}
