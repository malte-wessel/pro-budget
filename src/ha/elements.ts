// Home Assistant lazy-loads most of its elements with the panels that use them. Before the
// first render we pull in the ones the panel needs by asking the card helpers for an editor,
// which imports ha-form, ha-dialog, ha-select, ha-icon-picker and friends.
//
// Every HA element the panel touches is named here, so a rename in HA touches one file.

export const HA_ELEMENTS = {
  topBar: "ha-top-app-bar-fixed",
  menuButton: "ha-menu-button",
  iconButton: "ha-icon-button",
  card: "ha-card",
  icon: "ha-icon",
  form: "ha-form",
  dialog: "ha-dialog",
  dialogHeader: "ha-dialog-header",
  button: "ha-button",
  alert: "ha-alert",
  circularProgress: "ha-spinner",
  ripple: "ha-ripple",
  subpage: "hass-tabs-subpage",
  subpageDataTable: "hass-tabs-subpage-data-table",
  overflowMenu: "ha-icon-overflow-menu",
  svgIcon: "ha-svg-icon",
} as const;

declare global {
  interface Window {
    loadCardHelpers?: () => Promise<{
      createCardElement: (config: Record<string, unknown>) => HTMLElement & {
        constructor: { getConfigElement?: () => Promise<unknown> };
      };
    }>;
  }
}

let loading: Promise<void> | undefined;

export function loadHaElements(): Promise<void> {
  loading ??= (async () => {
    try {
      const helpers = await window.loadCardHelpers?.();
      const card = helpers?.createCardElement({ type: "entities", entities: [] });
      await card?.constructor.getConfigElement?.();
    } catch {
      // Without the helpers the elements may still be defined; fall through to the wait.
    }
    await Promise.all(
      [HA_ELEMENTS.form, HA_ELEMENTS.dialog, HA_ELEMENTS.subpage, HA_ELEMENTS.subpageDataTable].map(
        (tag) =>
          Promise.race([customElements.whenDefined(tag), new Promise((r) => setTimeout(r, 4000))]),
      ),
    );
  })();
  return loading;
}
