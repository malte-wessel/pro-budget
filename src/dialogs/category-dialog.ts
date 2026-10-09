import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { renderDialog } from "../ha/dialog.ts";
import type { HaFormSchema, HomeAssistant } from "../ha/types.ts";
import { t } from "../i18n.ts";
import { sharedStyles } from "../styles.ts";
import type { Category } from "../types.ts";
import { errorText } from "./item-dialog.ts";

const SCHEMA: HaFormSchema[] = [
  { name: "name", required: true, selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  // HA's own colour picker: the named theme colours, stored by name.
  { name: "color", selector: { ui_color: {} } },
];

@customElement("pro-budget-category-dialog")
export class ProBudgetCategoryDialog extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _category?: Category;
  @state() private _open = false;
  @state() private _data: Record<string, unknown> = {};
  @state() private _error = "";

  static styles = [
    sharedStyles,
    css`
      ha-alert {
        display: block;
        margin-bottom: 12px;
      }
    `,
  ];

  open(category?: Category) {
    this._category = category;
    this._data = category
      ? {
          name: category.name,
          icon: category.icon ?? undefined,
          color: category.color ?? undefined,
        }
      : {};
    this._error = "";
    this._open = true;
  }

  private _close() {
    this._open = false;
  }

  private async _save() {
    const fields = {
      name: String(this._data.name ?? ""),
      icon: (this._data.icon as string) || null,
      color: (this._data.color as string) || null,
    };
    try {
      if (this._category) await api.updateCategory(this.hass!, this._category.id, fields);
      else await api.createCategory(this.hass!, fields);
      this._close();
    } catch (err) {
      this._error = errorText(this.hass, err);
    }
  }

  // ha-dialog fires `closed` asynchronously, also from an element that was already removed
  // on close. When the dialog was reopened in between, that stale event must not close it.
  private _onClosed = (e: Event) => {
    if (e.target !== this.renderRoot.querySelector("ha-dialog")) return;
    this._close();
  };

  render() {
    if (!this._open) return nothing;
    return renderDialog({
      heading: t(this.hass, this._category ? "categories.edit" : "categories.new"),
      onClosed: this._onClosed,
      content: html`
        ${this._error ? html`<ha-alert alert-type="error">${this._error}</ha-alert>` : nothing}
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${SCHEMA}
          .computeLabel=${(s: HaFormSchema) => t(this.hass, `categories.${s.name}` as never)}
          @value-changed=${(e: CustomEvent<{ value: Record<string, unknown> }>) =>
            (this._data = e.detail.value)}
        ></ha-form>
      `,
      actions: [
        { label: t(this.hass, "common.cancel"), onClick: () => this._close() },
        { label: t(this.hass, "common.save"), primary: true, onClick: () => this._save() },
      ],
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-category-dialog": ProBudgetCategoryDialog;
  }
}
