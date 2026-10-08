import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { renderDialog } from "../ha/dialog.ts";
import type { HomeAssistant } from "../ha/types.ts";
import { t } from "../i18n.ts";

/** A yes / no question in an ha-dialog. `open(text)` resolves with the answer. */
@customElement("pro-budget-confirm")
export class ProBudgetConfirm extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _text = "";
  @state() private _open = false;
  private _resolve?: (ok: boolean) => void;

  static styles = css`
    ha-dialog {
      --mdc-dialog-min-width: 320px;
    }
  `;

  open(text: string): Promise<boolean> {
    this._text = text;
    this._open = true;
    return new Promise((resolve) => (this._resolve = resolve));
  }

  private _close(ok: boolean) {
    this._open = false;
    this._resolve?.(ok);
    this._resolve = undefined;
  }

  // ha-dialog fires `closed` asynchronously, also from an element that was already removed
  // on close. When the dialog was reopened in between, that stale event must not close it.
  private _onClosed = (e: Event) => {
    if (e.target !== this.renderRoot.querySelector("ha-dialog")) return;
    this._close(false);
  };

  render() {
    if (!this._open) return html``;
    return renderDialog({
      heading: this._text,
      content: html``,
      onClosed: this._onClosed,
      actions: [
        { label: t(this.hass, "common.cancel"), onClick: () => this._close(false) },
        {
          label: t(this.hass, "common.delete"),
          primary: true,
          danger: true,
          onClick: () => this._close(true),
        },
      ],
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-confirm": ProBudgetConfirm;
  }
}
