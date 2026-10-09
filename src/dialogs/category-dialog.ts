import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { renderDialog } from "../ha/dialog.ts";
import type { HomeAssistant } from "../ha/types.ts";
import { t } from "../i18n.ts";
import { sharedStyles } from "../styles.ts";
import type { Category } from "../types.ts";
import { fieldStyles, selectorField, textField } from "./fields.ts";
import { errorText } from "./item-dialog.ts";

@customElement("pro-budget-category-dialog")
export class ProBudgetCategoryDialog extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _category?: Category;
  @state() private _open = false;
  @state() private _data: Record<string, unknown> = {};
  @state() private _error = "";
  @state() private _touched = false;

  static styles = [
    sharedStyles,
    unsafeCSS(fieldStyles),
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
    this._touched = false;
    this._open = true;
  }

  private _close() {
    this._open = false;
  }

  private _onClosed = (e: Event) => {
    if (e.target !== this.renderRoot.querySelector("ha-dialog")) return;
    this._close();
  };

  private get _nameError(): string | undefined {
    return String(this._data.name ?? "").trim() ? undefined : t(this.hass, "validation.required");
  }

  private async _save() {
    if (this._nameError) return;
    const fields = {
      name: String(this._data.name ?? "").trim(),
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

  render() {
    if (!this._open) return nothing;
    const h = this.hass;
    return renderDialog({
      heading: t(h, this._category ? "categories.edit" : "categories.new"),
      onClosed: this._onClosed,
      content: html`
        ${this._error ? html`<ha-alert alert-type="error">${this._error}</ha-alert>` : nothing}
        <div class="fields">
          ${textField(h, {
            label: t(h, "categories.name"),
            value: this._data.name,
            required: true,
            autofocus: true,
            error: this._nameError,
            touched: this._touched,
            onChange: (v) => {
              this._touched = true;
              this._data = { ...this._data, name: v };
            },
          })}
          ${selectorField(h, {
            label: t(h, "categories.icon"),
            value: this._data.icon,
            selector: { icon: {} },
            onChange: (v) => (this._data = { ...this._data, icon: v }),
          })}
          ${selectorField(h, {
            label: t(h, "categories.color"),
            value: this._data.color,
            selector: { ui_color: {} },
            onChange: (v) => (this._data = { ...this._data, color: v }),
          })}
        </div>
      `,
      actions: [
        { label: t(h, "common.cancel"), onClick: () => this._close() },
        {
          label: t(h, "common.save"),
          primary: true,
          disabled: !!this._nameError,
          onClick: () => this._save(),
        },
      ],
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-category-dialog": ProBudgetCategoryDialog;
  }
}
