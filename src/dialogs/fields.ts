// Form fields as HA's own dialogs build them (create area, …): ha-input with auto-validate shows
// its message in red under the field once the user has left it; selects, booleans and dates go
// through ha-selector. Inline validation state comes from the dialog's own rules.
import { html, nothing, type TemplateResult } from "lit";
import type { HomeAssistant } from "../ha/types.ts";

export interface TextFieldOptions {
  label: string;
  value: unknown;
  onChange: (value: string) => void;
  required?: boolean;
  type?: "text" | "number";
  min?: number;
  max?: number;
  /** Shown in red under the field (and marks it invalid) when set and the field was touched. */
  error?: string;
  touched?: boolean;
  suffix?: string;
  autofocus?: boolean;
}

/** HA's required-field message, as the create-area dialog shows it. */
export function requiredMessage(hass: HomeAssistant | undefined, label: string): string {
  return hass?.localize("ui.common.error_required") || `${label} is required`;
}

export function textField(hass: HomeAssistant | undefined, o: TextFieldOptions): TemplateResult {
  const invalid = !!o.error && !!o.touched;
  return html`
    <ha-input
      .label=${o.label}
      .value=${o.value == null ? "" : String(o.value)}
      .type=${o.type ?? "text"}
      .min=${o.min}
      .max=${o.max}
      ?required=${o.required}
      ?autofocus=${o.autofocus}
      auto-validate
      .invalid=${invalid}
      .validationMessage=${o.error ?? requiredMessage(hass, o.label)}
      @input=${(e: Event) => o.onChange((e.target as HTMLInputElement).value)}
      @change=${(e: Event) => o.onChange((e.target as HTMLInputElement).value)}
    >
      ${o.suffix ? html`<span slot="end">${o.suffix}</span>` : nothing}
    </ha-input>
  `;
}

export interface SelectOption {
  value: string;
  label: string;
}

export function selectField(
  hass: HomeAssistant | undefined,
  o: {
    label: string;
    value: unknown;
    options: SelectOption[];
    onChange: (v: string) => void;
    required?: boolean;
  },
): TemplateResult {
  return html`
    <ha-selector
      .hass=${hass}
      .label=${o.label}
      .required=${o.required ?? false}
      .selector=${{ select: { mode: "dropdown", options: o.options } }}
      .value=${o.value == null ? undefined : String(o.value)}
      @value-changed=${(e: CustomEvent<{ value: string }>) => o.onChange(e.detail.value)}
    ></ha-selector>
  `;
}

export function selectorField(
  hass: HomeAssistant | undefined,
  o: {
    label: string;
    value: unknown;
    selector: Record<string, unknown>;
    onChange: (v: unknown) => void;
    required?: boolean;
  },
): TemplateResult {
  return html`
    <ha-selector
      .hass=${hass}
      .label=${o.label}
      .required=${o.required ?? false}
      .selector=${o.selector}
      .value=${o.value}
      @value-changed=${(e: CustomEvent<{ value: unknown }>) => o.onChange(e.detail.value)}
    ></ha-selector>
  `;
}

/** The dialog body layout: fields stacked with HA's spacing. */
export const fieldStyles = `
  .fields { display: flex; flex-direction: column; gap: 16px; }
  ha-expansion-panel { --expansion-panel-content-padding: 0 12px 12px; }
  ha-expansion-panel .fields { padding-top: 12px; }
`;
