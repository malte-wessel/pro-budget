import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, ApiError } from "../api.ts";
import { amountInput, monthName, parseAmount, weekdayName } from "../format.ts";
import { renderDialog } from "../ha/dialog.ts";
import type { HaFormErrors, HomeAssistant } from "../ha/types.ts";
import { t, type I18nKey } from "../i18n.ts";
import { sharedStyles } from "../styles.ts";
import {
  COST_KINDS,
  ITEM_TYPES,
  LONG_RECURRENCES,
  PAYMENT_METHODS,
  RECURRENCES,
  type BudgetState,
  type Item,
  type ItemFields,
} from "../types.ts";
import { fieldStyles, selectField, selectorField, textField } from "./fields.ts";

type FormData = Record<string, unknown>;

function toForm(item: Item | undefined, state: BudgetState, userId: string | undefined): FormData {
  if (!item) {
    return {
      type: "expense",
      recurrence: "monthly",
      due_day: 1,
      cost_kind: "fixed",
      shared: false,
      category_id: state.categories[0]?.id,
      user_id: userId ?? state.users[0]?.id,
      amount: "",
    };
  }
  return {
    title: item.title,
    type: item.type,
    amount: amountInput(item.amount),
    currency: item.currency ?? "",
    category_id: item.category_id,
    user_id: item.user_id,
    recurrence: item.recurrence,
    due_day: item.due_day ?? undefined,
    due_month: item.due_month ?? undefined,
    cost_kind: item.cost_kind,
    shared: item.shared,
    payment_method: item.payment_method ?? "",
    start: item.start ?? undefined,
    end: item.end ?? undefined,
  };
}

@customElement("pro-budget-item-dialog")
export class ProBudgetItemDialog extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @state() private _item?: Item;
  @state() private _open = false;
  @state() private _data: FormData = {};
  @state() private _error = "";
  @state() private _saving = false;
  @state() private _touched = new Set<string>();

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

  open(item?: Item) {
    if (!this.budget) return;
    this._item = item;
    this._data = toForm(item, this.budget, this.hass?.user?.id);
    this._error = "";
    this._touched = new Set();
    this._open = true;
  }

  private _close() {
    this._open = false;
  }

  // ha-dialog fires `closed` asynchronously, also from an element that was already removed
  // on close. When the dialog was reopened in between, that stale event must not close it.
  private _onClosed = (e: Event) => {
    if (e.target !== this.renderRoot.querySelector("ha-dialog")) return;
    this._close();
  };

  private _set(key: string, value: unknown) {
    this._touched = new Set([...this._touched, key]);
    this._data = { ...this._data, [key]: value };
  }

  /** Every field's problem, by field name; empty when the form can be saved. */
  private get _errors(): HaFormErrors {
    const d = this._data;
    const h = this.hass;
    const errors: HaFormErrors = {};
    if (!String(d.title ?? "").trim()) errors.title = t(h, "validation.required");
    if (parseAmount(String(d.amount ?? "")) === null) errors.amount = t(h, "validation.amount");
    if (!d.category_id) errors.category_id = t(h, "validation.required");
    if (!d.user_id) errors.user_id = t(h, "validation.required");
    const rec = String(d.recurrence ?? "");
    if (rec !== "daily") {
      const day = Number(d.due_day);
      const max = rec === "weekly" || rec === "biweekly" ? 7 : 31;
      if (d.due_day == null || d.due_day === "" || !Number.isInteger(day) || day < 1 || day > max) {
        errors.due_day = t(h, "validation.due_day", { max });
      }
    }
    if (LONG_RECURRENCES.includes(rec as never) && !d.due_month) {
      errors.due_month = t(h, "validation.required");
    }
    if (d.start && d.end && String(d.start) > String(d.end))
      errors.end = t(h, "validation.end_before_start");
    return errors;
  }

  private _fields(): ItemFields {
    const d = this._data;
    const rec = d.recurrence as ItemFields["recurrence"];
    const long = LONG_RECURRENCES.includes(rec);
    return {
      title: String(d.title ?? "").trim(),
      type: d.type as ItemFields["type"],
      amount: parseAmount(String(d.amount ?? "")) ?? 0,
      currency: d.currency ? String(d.currency).toUpperCase() : null,
      category_id: String(d.category_id ?? ""),
      user_id: String(d.user_id ?? ""),
      recurrence: rec,
      due_day:
        rec === "daily" ? null : d.due_day == null || d.due_day === "" ? null : Number(d.due_day),
      due_month: long && d.due_month ? Number(d.due_month) : null,
      cost_kind: (d.cost_kind as ItemFields["cost_kind"]) ?? "fixed",
      shared: Boolean(d.shared),
      payment_method: d.payment_method ? (d.payment_method as ItemFields["payment_method"]) : null,
      start: d.start ? String(d.start) : null,
      end: d.end ? String(d.end) : null,
    };
  }

  private async _save() {
    if (Object.keys(this._errors).length) return;
    this._saving = true;
    this._error = "";
    try {
      if (this._item) await api.updateItem(this.hass!, this._item.id, this._fields());
      else await api.createItem(this.hass!, this._fields());
      this._close();
    } catch (err) {
      this._error = errorText(this.hass, err);
    } finally {
      this._saving = false;
    }
  }

  private _renderFields() {
    const h = this.hass;
    const b = this.budget!;
    const d = this._data;
    const errors = this._errors;
    const touched = (k: string) => this._touched.has(k);
    const opt = (values: readonly string[], prefix: string) =>
      values.map((value) => ({ value, label: t(h, `${prefix}.${value}` as I18nKey) }));
    const rec = String(d.recurrence ?? "");
    const weekly = rec === "weekly" || rec === "biweekly";
    const long = LONG_RECURRENCES.includes(rec as never);
    return html`
      <div class="fields">
        ${textField(h, {
          label: t(h, "item.title"),
          value: d.title,
          required: true,
          autofocus: true,
          error: errors.title,
          touched: touched("title"),
          onChange: (v) => this._set("title", v),
        })}
        ${selectField(h, {
          label: t(h, "item.type"),
          value: d.type,
          required: true,
          options: opt(ITEM_TYPES, "type"),
          onChange: (v) => this._set("type", v),
        })}
        ${textField(h, {
          label: t(h, "item.amount"),
          value: d.amount,
          required: true,
          suffix: b.config.currency,
          error: errors.amount,
          touched: touched("amount"),
          onChange: (v) => this._set("amount", v),
        })}
        ${selectField(h, {
          label: t(h, "item.cost_kind"),
          value: d.cost_kind,
          options: opt(COST_KINDS, "cost_kind"),
          onChange: (v) => this._set("cost_kind", v),
        })}
        ${selectField(h, {
          label: t(h, "item.category"),
          value: d.category_id,
          required: true,
          options: b.categories.map((c) => ({ value: c.id, label: c.name })),
          onChange: (v) => this._set("category_id", v),
        })}
        ${selectField(h, {
          label: t(h, d.type === "earning" ? "item.user_earning" : "item.user"),
          value: d.user_id,
          required: true,
          options: b.users.map((u) => ({ value: u.id, label: u.name })),
          onChange: (v) => this._set("user_id", v),
        })}
        ${selectField(h, {
          label: t(h, "item.recurrence"),
          value: d.recurrence,
          required: true,
          options: opt(RECURRENCES, "recurrence"),
          onChange: (v) => this._set("recurrence", v),
        })}
        ${
          weekly
            ? selectField(h, {
                label: t(h, "item.due_weekday"),
                value: d.due_day,
                required: true,
                options: [1, 2, 3, 4, 5, 6, 7].map((n) => ({
                  value: String(n),
                  label: weekdayName(h, n),
                })),
                onChange: (v) => this._set("due_day", v),
              })
            : rec === "daily"
              ? nothing
              : textField(h, {
                  label: t(h, "item.due_day"),
                  value: d.due_day,
                  required: true,
                  type: "number",
                  min: 1,
                  max: 31,
                  error: errors.due_day,
                  touched: touched("due_day"),
                  onChange: (v) => this._set("due_day", v),
                })
        }
        ${
          long
            ? selectField(h, {
                label: t(h, "item.due_month"),
                value: d.due_month,
                required: true,
                options: Array.from({ length: 12 }, (_, i) => ({
                  value: String(i + 1),
                  label: monthName(h, i + 1),
                })),
                onChange: (v) => this._set("due_month", v),
              })
            : nothing
        }
        ${selectorField(h, {
          label: t(h, "item.shared"),
          value: Boolean(d.shared),
          selector: { boolean: {} },
          onChange: (v) => this._set("shared", Boolean(v)),
        })}
        <ha-expansion-panel outlined .header=${t(h, "item.advanced")}>
          <div class="fields">
            ${selectField(h, {
              label: t(h, "item.payment_method"),
              value: d.payment_method || "",
              options: [
                { value: "", label: t(h, "common.none") },
                ...opt(PAYMENT_METHODS, "payment"),
              ],
              onChange: (v) => this._set("payment_method", v),
            })}
            ${textField(h, {
              label: t(h, "item.currency"),
              value: d.currency,
              onChange: (v) => this._set("currency", v),
            })}
            ${selectorField(h, {
              label: t(h, "item.start"),
              value: d.start,
              selector: { date: {} },
              onChange: (v) => this._set("start", v),
            })}
            ${selectorField(h, {
              label: t(h, "item.end"),
              value: d.end,
              selector: { date: {} },
              onChange: (v) => this._set("end", v),
            })}
            ${
              errors.end && touched("end")
                ? html`<ha-alert alert-type="error">${errors.end}</ha-alert>`
                : nothing
            }
          </div>
        </ha-expansion-panel>
      </div>
    `;
  }

  render() {
    if (!this._open || !this.budget) return nothing;
    return renderDialog({
      heading: t(this.hass, this._item ? "item.edit" : "item.new"),
      sticky: true,
      onClosed: this._onClosed,
      content: html`
        ${this._error ? html`<ha-alert alert-type="error">${this._error}</ha-alert>` : nothing}
        ${this._renderFields()}
      `,
      actions: [
        { label: t(this.hass, "common.cancel"), onClick: () => this._close() },
        {
          label: t(this.hass, "common.save"),
          primary: true,
          disabled: this._saving || Object.keys(this._errors).length > 0,
          onClick: () => this._save(),
        },
      ],
    });
  }
}

export function errorText(hass: HomeAssistant | undefined, err: unknown): string {
  if (err instanceof ApiError) {
    if (err.code === "not_found") return t(hass, "errors.not_found");
    if (err.code === "in_use") return t(hass, "errors.in_use");
    if (err.code === "invalid") return t(hass, "errors.invalid", { message: err.message });
  }
  return t(hass, "common.error", { error: String((err as Error)?.message ?? err) });
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-item-dialog": ProBudgetItemDialog;
  }
}
