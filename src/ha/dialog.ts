// Renders an ha-dialog (the Web Awesome one of Home Assistant 2026.10+: `headerTitle`, one
// `footer` slot for the buttons, `preventScrimClose`, a `closed` event), so the dialogs themselves
// never name a slot or property of HA's dialog. Buttons carry `data-action` for tests.
import { html, nothing, type TemplateResult } from "lit";

export interface DialogAction {
  label: string;
  onClick: () => void;
  primary?: boolean;
  disabled?: boolean;
  danger?: boolean;
}

export interface DialogOptions {
  heading: string;
  content: TemplateResult | typeof nothing;
  actions: DialogAction[];
  onClosed: (e: Event) => void;
  /** Keep the dialog open on scrim click (forms with unsaved input). */
  sticky?: boolean;
}

export function renderDialog(o: DialogOptions): TemplateResult {
  return html`
    <ha-dialog open .headerTitle=${o.heading} .preventScrimClose=${!!o.sticky} @closed=${o.onClosed}>
      ${o.content}
      ${o.actions.map(
        (a) => html`
          <ha-button
            slot="footer"
            data-action=${a.primary ? "primary" : "secondary"}
            appearance=${a.primary ? "accent" : "plain"}
            variant=${a.danger ? "danger" : nothing}
            .disabled=${a.disabled ?? false}
            @click=${a.onClick}
          >
            ${a.label}
          </ha-button>
        `,
      )}
    </ha-dialog>
  `;
}
