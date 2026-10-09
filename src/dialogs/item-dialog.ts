import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { api, ApiError } from "../api.ts";
import { amountInput, parseAmount } from "../format.ts";
import { renderDialog } from "../ha/dialog.ts";
import type { HaFormErrors, HaFormSchema, HomeAssistant } from "../ha/types.ts";
import { t } from "../i18n.ts";
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
import { monthName, weekdayName } from "../format.ts";

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
  @state() private _submitted = false;

  static styles = [
    sharedStyles,
    css`
      ha-dialog {
        --mdc-dialog-min-width: min(560px, 95vw);
      }
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
    this._submitted = false;
    this._open = true;
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

  /** Errors shown: only for fields the user touched, or all after a save attempt (as HA's dialogs). */
  private get _visibleErrors(): HaFormErrors {
    const all = this._errors;
    if (this._submitted) return all;
    return Object.fromEntries(Object.entries(all).filter(([k]) => this._touched.has(k)));
  }

  private _valueChanged(e: CustomEvent<{ value: FormData }>) {
    const next = e.detail.value;
    const touched = new Set(this._touched);
    for (const key of new Set([...Object.keys(next), ...Object.keys(this._data)])) {
      if (next[key] !== this._data[key]) touched.add(key);
    }
    this._touched = touched;
    this._data = next;
  }

  private _close() {
    this._open = false;
  }

  private get _schema(): HaFormSchema[] {
    const b = this.budget!;
    const rec = this._data.recurrence as string;
    const weekly = rec === "weekly" || rec === "biweekly";
    const long = LONG_RECURRENCES.includes(rec as never);
    const opt = (values: string[], label: (v: string) => string) =>
      values.map((value) => ({ value, label: label(value) }));
    const schema: HaFormSchema[] = [
      { name: "title", required: true, selector: { text: {} } },
      {
        name: "type",
        required: true,
        selector: {
          select: {
            mode: "dropdown",
            options: opt(ITEM_TYPES, (v) => t(this.hass, `type.${v}` as never)),
          },
        },
      },
      {
        name: "cost_kind",
        selector: {
          select: {
            mode: "dropdown",
            options: opt(COST_KINDS, (v) => t(this.hass, `cost_kind.${v}` as never)),
          },
        },
      },
      {
        name: "amount",
        required: true,
        selector: { text: { type: "text", suffix: b.config.currency } },
      },
      {
        name: "category_id",
        required: true,
        selector: {
          select: {
            mode: "dropdown",
            options: b.categories.map((c) => ({ value: c.id, label: c.name })),
          },
        },
      },
      {
        name: "user_id",
        required: true,
        selector: {
          select: {
            mode: "dropdown",
            options: b.users.map((u) => ({ value: u.id, label: u.name })),
          },
        },
      },
      {
        name: "recurrence",
        required: true,
        selector: {
          select: {
            mode: "dropdown",
            options: opt(RECURRENCES, (v) => t(this.hass, `recurrence.${v}` as never)),
          },
        },
      },
    ];
    const due: HaFormSchema[] = [];
    if (weekly) {
      due.push({
        name: "due_day",
        required: true,
        selector: {
          select: {
            mode: "dropdown",
            options: [1, 2, 3, 4, 5, 6, 7].map((d) => ({
              value: String(d),
              label: weekdayName(this.hass, d),
            })),
          },
        },
      });
    } else if (rec !== "daily") {
      due.push({
        name: "due_day",
        required: true,
        selector: { number: { min: 1, max: 31, mode: "box" } },
      });
    }
    if (long) {
      due.push({
        name: "due_month",
        required: true,
        selector: {
          select: {
            mode: "dropdown",
            options: Array.from({ length: 12 }, (_, i) => ({
              value: String(i + 1),
              label: monthName(this.hass, i + 1),
            })),
          },
        },
      });
    }
    schema.push(...due);
    schema.push({ name: "shared", selector: { boolean: {} } });
    schema.push({
      name: "advanced",
      type: "expandable",
      schema: [
        {
          name: "payment_method",
          selector: {
            select: {
              mode: "dropdown",
              options: [
                { value: "", label: t(this.hass, "common.none") },
                ...opt(PAYMENT_METHODS, (v) => t(this.hass, `payment.${v}` as never)),
              ],
            },
          },
        },
        { name: "currency", selector: { text: {} } },
        { name: "start", selector: { date: {} } },
        { name: "end", selector: { date: {} } },
      ],
    });
    return schema;
  }

  private _label = (s: HaFormSchema): string => {
    if (s.name === "user_id") {
      return t(this.hass, this._data.type === "earning" ? "item.user_earning" : "item.user");
    }
    if (s.name === "due_day") {
      const rec = this._data.recurrence;
      return t(
        this.hass,
        rec === "weekly" || rec === "biweekly" ? "item.due_weekday" : "item.due_day",
      );
    }
    if (s.name === "category_id") return t(this.hass, "item.category");
    return t(this.hass, `item.${s.name}` as never);
  };

  private _fields(): ItemFields | string {
    const d = this._data;
    const amount = parseAmount(String(d.amount ?? ""));
    if (amount === null) return t(this.hass, "item.amount_invalid");
    const rec = d.recurrence as ItemFields["recurrence"];
    const long = LONG_RECURRENCES.includes(rec);
    return {
      title: String(d.title ?? ""),
      type: d.type as ItemFields["type"],
      amount,
      currency: d.currency ? String(d.currency).toUpperCase() : null,
      category_id: String(d.category_id ?? ""),
      user_id: String(d.user_id ?? ""),
      recurrence: rec,
      due_day: rec === "daily" ? null : d.due_day == null ? null : Number(d.due_day),
      due_month: long && d.due_month != null ? Number(d.due_month) : null,
      cost_kind: (d.cost_kind as ItemFields["cost_kind"]) ?? "fixed",
      shared: Boolean(d.shared),
      payment_method: d.payment_method ? (d.payment_method as ItemFields["payment_method"]) : null,
      start: d.start ? String(d.start) : null,
      end: d.end ? String(d.end) : null,
    };
  }

  private async _save() {
    this._submitted = true;
    if (Object.keys(this._errors).length) return;
    const fields = this._fields();
    if (typeof fields === "string") {
      this._error = fields;
      return;
    }
    this._saving = true;
    this._error = "";
    try {
      if (this._item) await api.updateItem(this.hass!, this._item.id, fields);
      else await api.createItem(this.hass!, fields);
      this._close();
    } catch (err) {
      this._error = errorText(this.hass, err);
    } finally {
      this._saving = false;
    }
  }

  // ha-dialog fires `closed` asynchronously, also from an element that was already removed
  // on close. When the dialog was reopened in between, that stale event must not close it.
  private _onClosed = (e: Event) => {
    if (e.target !== this.renderRoot.querySelector("ha-dialog")) return;
    this._close();
  };

  render() {
    if (!this._open || !this.budget) return nothing;
    return renderDialog({
      heading: t(this.hass, this._item ? "item.edit" : "item.new"),
      sticky: true,
      onClosed: this._onClosed,
      content: html`
        ${this._error ? html`<ha-alert alert-type="error">${this._error}</ha-alert>` : nothing}
        <ha-form
          .hass=${this.hass}
          .data=${this._data}
          .schema=${this._schema}
          .computeLabel=${this._label}
          .error=${this._visibleErrors}
          .computeError=${(error: string) => error}
          @value-changed=${this._valueChanged}
        ></ha-form>
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
