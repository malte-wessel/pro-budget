// The slice of the Home Assistant frontend surface the panel uses. There are no published types;
// keep this file the single place that names HA internals.
import type { Connection, HassConfig, HassUser } from "home-assistant-js-websocket";

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

/** Fired by the panel's views to open a dialog or navigate. */
export interface PanelEvents {
  "pro-budget-navigate": CustomEvent<{ view: string }>;
}

declare global {
  interface HTMLElementEventMap {
    "value-changed": CustomEvent<{ value: Record<string, unknown> }>;
  }
}
