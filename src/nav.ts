// The panel's views as Home Assistant page navigation entries (the `tabs` of hass-tabs-subpage).
import {
  mdiCalendarMonthOutline,
  mdiChartBoxOutline,
  mdiFormatListBulleted,
  mdiShapeOutline,
  mdiViewDashboardOutline,
} from "@mdi/js";
import type { HomeAssistant, PageNavigation, Route } from "./ha/types.ts";
import { t, type I18nKey } from "./i18n.ts";

export const VIEWS = [
  { id: "overview", iconPath: mdiViewDashboardOutline },
  { id: "items", iconPath: mdiFormatListBulleted },
  { id: "calendar", iconPath: mdiCalendarMonthOutline },
  { id: "insights", iconPath: mdiChartBoxOutline },
  { id: "categories", iconPath: mdiShapeOutline },
] as const;
export type View = (typeof VIEWS)[number]["id"];

export const DEFAULT_PREFIX = "/pro-budget";

export function currentView(route: Route | undefined): View {
  const path = route?.path?.replace(/^\//, "").split("/")[0] ?? "";
  return VIEWS.some((v) => v.id === path) ? (path as View) : "overview";
}

export function tabs(hass: HomeAssistant | undefined, route: Route | undefined): PageNavigation[] {
  const prefix = route?.prefix ?? DEFAULT_PREFIX;
  return VIEWS.map((v) => ({
    path: `${prefix}/${v.id}`,
    name: t(hass, `nav.${v.id}` as I18nKey),
    iconPath: v.iconPath,
  }));
}
