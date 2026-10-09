// The panel's views as Home Assistant page navigation entries (the `tabs` of hass-tabs-subpage).
import {
  mdiCalendarMonthOutline,
  mdiChartBoxOutline,
  mdiFormatListBulleted,
  mdiCog,
  mdiViewDashboardOutline,
} from "@mdi/js";
import type { HomeAssistant, PageNavigation, Route } from "./ha/types.ts";
import { t, type I18nKey } from "./i18n.ts";

export const VIEWS = [
  { id: "overview", iconPath: mdiViewDashboardOutline },
  { id: "items", iconPath: mdiFormatListBulleted },
  { id: "calendar", iconPath: mdiCalendarMonthOutline },
  { id: "insights", iconPath: mdiChartBoxOutline },
  { id: "settings", iconPath: mdiCog },
] as const;
export type View = (typeof VIEWS)[number]["id"];

export const DEFAULT_PREFIX = "/pro-budget";

export function currentView(route: Route | undefined): View {
  let path = route?.path?.replace(/^\//, "").split("/")[0] ?? "";
  if (path === "categories") path = "settings"; // the old tab, now a card in settings
  return VIEWS.some((v) => v.id === path) ? (path as View) : "overview";
}

/** Go to a view of the panel the way HA does (no page load). */
export function navigate(route: Route | undefined, view: View): void {
  navigateTo(viewPath(route, view));
}

/** Go to any Home Assistant path without a page load. */
export function navigateTo(path: string): void {
  history.pushState(null, "", path);
  window.dispatchEvent(new CustomEvent("location-changed"));
}

export function viewPath(route: Route | undefined, view: View): string {
  return `${route?.prefix ?? DEFAULT_PREFIX}/${view}`;
}

export function tabs(hass: HomeAssistant | undefined, route: Route | undefined): PageNavigation[] {
  const prefix = route?.prefix ?? DEFAULT_PREFIX;
  return VIEWS.map((v) => ({
    path: `${prefix}/${v.id}`,
    name: t(hass, `nav.${v.id}` as I18nKey),
    iconPath: v.iconPath,
  }));
}
