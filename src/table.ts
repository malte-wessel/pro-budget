// A data table in the look of Home Assistant's settings pages (full width, 56px rows, group
// headers, a row menu), rendered from column definitions. Theme tokens only.
import { css, html, nothing, type TemplateResult } from "lit";
import { classMap } from "lit/directives/class-map.js";

export interface Column<R> {
  key: string;
  title: string;
  /** Cell content; a string is rendered as text. */
  render: (row: R) => TemplateResult | string | typeof nothing;
  /** Right-aligned, tabular numbers. */
  numeric?: boolean;
  /** Hidden below 870px. */
  optional?: boolean;
  /** Fixed width (CSS); the icon column is 56px. */
  width?: string;
  /** Sort key; undefined means not sortable. */
  sort?: (row: R) => string | number;
}

export interface MenuEntry<R> {
  label: string;
  icon: string;
  danger?: boolean;
  disabled?: (row: R) => boolean;
  onSelect: (row: R) => void;
}

export interface Group<R> {
  key: string;
  title: string;
  rows: R[];
}

export interface TableOptions<R> {
  columns: Column<R>[];
  groups: Group<R>[];
  rowKey: (row: R) => string;
  onRowClick?: (row: R) => void;
  menu?: MenuEntry<R>[];
  collapsed: Set<string>;
  onToggleGroup: (key: string) => void;
  sortKey?: string;
  sortDesc?: boolean;
  onSort?: (key: string) => void;
  emptyText: string;
}

export const tableStyles = css`
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  .table th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--card-background-color);
    color: var(--primary-text-color);
    font-weight: 500;
    text-align: left;
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid var(--divider-color);
    white-space: nowrap;
    user-select: none;
  }
  .table th.sortable {
    cursor: pointer;
  }
  .table th ha-icon {
    --mdc-icon-size: 18px;
    vertical-align: middle;
    margin-right: 4px;
    opacity: 0.7;
  }
  .table td {
    height: 56px;
    padding: 0 16px;
    border-bottom: 1px solid var(--divider-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 0;
  }
  .table td.icon,
  .table th.icon {
    width: 56px;
    max-width: 56px;
    padding-right: 0;
    color: var(--secondary-text-color);
  }
  .table td.icon ha-icon {
    --mdc-icon-size: 24px;
  }
  .table td.num,
  .table th.num {
    text-align: right;
    font-variant-numeric: tabular-nums;
    width: 1%;
    max-width: none;
  }
  .table td.menu,
  .table th.menu {
    width: 56px;
    max-width: 56px;
    padding: 0 8px 0 0;
    text-align: right;
    overflow: visible;
  }
  .table tr.row {
    display: table-row;
    cursor: pointer;
  }
  .table tr.row:hover td {
    background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.04);
  }
  .table tr.group td {
    height: 48px;
    background: var(--secondary-background-color);
    font-weight: 500;
    cursor: pointer;
    overflow: visible;
    max-width: none;
  }
  .table tr.group ha-icon {
    --mdc-icon-size: 20px;
    vertical-align: middle;
    margin: 0 20px 0 0;
    transition: transform 120ms;
  }
  .table tr.group.collapsed ha-icon {
    transform: rotate(180deg);
  }
  .table .secondary {
    display: block;
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 16px;
  }
  .table .empty {
    text-align: center;
    color: var(--secondary-text-color);
    height: 120px;
  }
  @media (max-width: 870px) {
    .table .optional {
      display: none;
    }
  }
  /* row menu */
  .rowmenu {
    position: relative;
    display: inline-block;
  }
  .rowmenu ha-icon-button {
    --mdc-icon-button-size: 40px;
    color: var(--secondary-text-color);
  }
  .rowmenu .items {
    display: none;
    position: absolute;
    right: 0;
    top: 40px;
    z-index: 5;
    min-width: 160px;
    padding: 8px 0;
    background: var(--card-background-color);
    border-radius: 8px;
    box-shadow:
      0 5px 5px -3px rgba(0, 0, 0, 0.2),
      0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12);
  }
  .rowmenu[open] .items {
    display: block;
  }
  .rowmenu .items button {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border: 0;
    background: none;
    color: var(--primary-text-color);
    font: inherit;
    cursor: pointer;
    text-align: left;
    white-space: nowrap;
  }
  .rowmenu .items button:hover:not(:disabled) {
    background: rgba(var(--rgb-primary-text-color, 0, 0, 0), 0.04);
  }
  .rowmenu .items button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .rowmenu .items button.danger {
    color: var(--error-color);
  }
  .rowmenu .items ha-icon {
    --mdc-icon-size: 20px;
  }
`;

let openMenu: HTMLElement | null = null;
document.addEventListener("click", () => {
  openMenu?.removeAttribute("open");
  openMenu = null;
});

function toggleMenu(e: Event) {
  e.stopPropagation();
  const host = (e.currentTarget as HTMLElement).closest(".rowmenu") as HTMLElement;
  const wasOpen = host.hasAttribute("open");
  openMenu?.removeAttribute("open");
  openMenu = null;
  if (!wasOpen) {
    host.setAttribute("open", "");
    openMenu = host;
  }
}

function renderMenu<R>(row: R, entries: MenuEntry<R>[]) {
  return html`
    <div class="rowmenu" @click=${(e: Event) => e.stopPropagation()}>
      <ha-icon-button @click=${toggleMenu}><ha-icon icon="mdi:dots-vertical"></ha-icon></ha-icon-button>
      <div class="items">
        ${entries.map(
          (m) => html`
            <button
              class=${classMap({ danger: !!m.danger })}
              ?disabled=${m.disabled?.(row) ?? false}
              @click=${(e: Event) => {
                e.stopPropagation();
                openMenu?.removeAttribute("open");
                openMenu = null;
                m.onSelect(row);
              }}
            >
              <ha-icon .icon=${m.icon}></ha-icon>${m.label}
            </button>
          `,
        )}
      </div>
    </div>
  `;
}

export function renderTable<R>(o: TableOptions<R>): TemplateResult {
  const cls = (c: Column<R>) =>
    classMap({
      num: !!c.numeric,
      optional: !!c.optional,
      icon: c.key === "icon",
      sortable: !!c.sort,
    });
  const total = o.groups.reduce((n, g) => n + g.rows.length, 0);
  const colspan = o.columns.length + (o.menu ? 1 : 0);
  return html`
    <table class="table">
      <thead>
        <tr>
          ${o.columns.map(
            (c) => html`
              <th class=${cls(c)} style=${c.width ? `width:${c.width}` : nothing} @click=${c.sort && o.onSort ? () => o.onSort!(c.key) : nothing}>
                ${o.sortKey === c.key ? html`<ha-icon icon=${o.sortDesc ? "mdi:arrow-down" : "mdi:arrow-up"}></ha-icon>` : nothing}${c.title}
              </th>
            `,
          )}
          ${o.menu ? html`<th class="menu"></th>` : nothing}
        </tr>
      </thead>
      <tbody>
        ${total === 0 ? html`<tr><td class="empty" colspan=${colspan}>${o.emptyText}</td></tr>` : nothing}
        ${o.groups.map((g) => {
          const collapsed = o.collapsed.has(g.key);
          return html`
            ${
              g.title
                ? html`
                  <tr class=${classMap({ group: true, collapsed })} @click=${() => o.onToggleGroup(g.key)}>
                    <td colspan=${colspan}><ha-icon icon="mdi:chevron-up"></ha-icon>${g.title}</td>
                  </tr>
                `
                : nothing
            }
            ${
              collapsed
                ? nothing
                : g.rows.map(
                    (r) => html`
                    <tr class="row" data-key=${o.rowKey(r)} @click=${() => o.onRowClick?.(r)}>
                      ${o.columns.map((c) => html`<td class=${cls(c)}>${c.render(r)}</td>`)}
                      ${o.menu ? html`<td class="menu">${renderMenu(r, o.menu)}</td>` : nothing}
                    </tr>
                  `,
                  )
            }
          `;
        })}
      </tbody>
    </table>
  `;
}

export function sortRows<R>(rows: R[], column: Column<R> | undefined, desc: boolean): R[] {
  if (!column?.sort) return rows;
  const key = column.sort;
  return [...rows].sort((a, b) => {
    const x = key(a);
    const y = key(b);
    const c =
      typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
    return desc ? -c : c;
  });
}
