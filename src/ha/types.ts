// The slice of the Home Assistant frontend surface the panel uses. There are no published types;
// keep this file the single place that names HA internals (verified against HA 2026.10).
import type { Connection, HassConfig, HassUser } from "home-assistant-js-websocket";
import type { TemplateResult } from "lit";

export interface HomeAssistant {
  connection: Connection;
  config: HassConfig;
  user?: HassUser;
  language: string;
  locale: { language: string; number_format: string; time_format: string };
  localize: (key: string, ...args: unknown[]) => string;
  callWS<T>(message: { type: string } & Record<string, unknown>): Promise<T>;
}

export interface PanelInfo {
  title: string | null;
  icon: string | null;
  url_path: string;
  config: Record<string, unknown> | null;
}

export interface Route {
  prefix: string;
  path: string;
}

/** An entry of the `tabs` of hass-tabs-subpage. */
export interface PageNavigation {
  path: string;
  name: string;
  iconPath: string;
}

// ----- ha-form -----

export interface HaFormSchema {
  name: string;
  selector?: Record<string, unknown>;
  type?: string;
  schema?: HaFormSchema[];
  title?: string;
  required?: boolean;
  flatten?: boolean;
  expanded?: boolean;
  column_min_width?: string;
}

// ----- ha-data-table (through hass-tabs-subpage-data-table) -----

export interface DataTableColumn<R> {
  title: string;
  /** The column shown on narrow screens; `extraTemplate` adds a second line under it. */
  main?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  direction?: "asc" | "desc";
  type?: "icon" | "icon-button" | "overflow-menu" | "numeric" | "flex";
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  flex?: number;
  showNarrow?: boolean;
  defaultHidden?: boolean;
  hidden?: boolean;
  moveable?: boolean;
  template?: (row: R) => TemplateResult | string;
  extraTemplate?: (row: R) => TemplateResult | string;
}

/** ha-form's `error`: a message per field name. */
export type HaFormErrors = Record<string, string>;

export type DataTableColumns<R> = Record<string, DataTableColumn<R>>;

export interface DataTableSorting {
  column: string;
  direction: "asc" | "desc" | null;
}

/** An entry of ha-icon-overflow-menu's `items`. */
export interface OverflowMenuItem {
  path: string;
  label: string;
  action: () => void;
  warning?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

declare global {
  interface HTMLElementEventMap {
    "value-changed": CustomEvent<{ value: Record<string, unknown> }>;
    "row-click": CustomEvent<{ id: string }>;
    "user-changed": CustomEvent<{ userId: string }>;
  }
}
