import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { api } from "../api.ts";
import { categoryIcon } from "../color.ts";
import type { ProBudgetCategoryDialog } from "../dialogs/category-dialog.ts";
import type { ProBudgetConfirm } from "../dialogs/confirm.ts";
import { fieldStyles, textField } from "../dialogs/fields.ts";
import { errorText } from "../dialogs/item-dialog.ts";
import type { HomeAssistant, OverflowMenuItem, Route } from "../ha/types.ts";
import { t } from "../i18n.ts";
import { tabs } from "../nav.ts";
import { sharedStyles } from "../styles.ts";
import type { BudgetState, Category } from "../types.ts";

/**
 * Settings, in the layout of Home Assistant's settings pages (a centred column of cards with a
 * title, content and an actions footer): categories, household members, household options.
 */
@customElement("pro-budget-settings")
export class ProBudgetSettings extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) budget?: BudgetState;
  @property({ attribute: false }) route?: Route;
  @property({ type: Boolean }) narrow = false;
  @property() version = "";
  @state() private _members?: Set<string>;
  @state() private _currency?: string;
  @state() private _leadDays?: string;
  @state() private _touched = new Set<string>();
  @state() private _saving = "";
  @state() private _message = "";
  @state() private _error = "";
  @query("pro-budget-category-dialog") private _dialog!: ProBudgetCategoryDialog;
  @query("pro-budget-confirm") private _confirm!: ProBudgetConfirm;

  static styles = [
    sharedStyles,
    unsafeCSS(fieldStyles),
    css`
      :host {
        display: block;
        height: 100%;
      }
      /* As ha-config pages: a centred column of cards. */
      .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 28px 20px 28px;
        box-sizing: border-box;
      }
      ha-card {
        margin-bottom: 24px;
        padding: 0;
      }
      .card-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      ha-md-list {
        padding: 0;
      }
      .hint {
        color: var(--secondary-text-color);
        margin: 0 0 16px;
      }
      ha-alert {
        display: block;
        margin-bottom: 16px;
      }
    `,
  ];

  // --- categories ---

  private _count(c: Category): number {
    return this.budget?.items.filter((i) => i.category_id === c.id).length ?? 0;
  }

  private _menu(c: Category): OverflowMenuItem[] {
    const n = this._count(c);
    return [
      { path: mdiPencil, label: t(this.hass, "common.edit"), action: () => this._dialog.open(c) },
      {
        path: mdiDelete,
        label: n ? t(this.hass, "categories.in_use", { count: n }) : t(this.hass, "common.delete"),
        warning: true,
        disabled: n > 0,
        action: () => void this._delete(c),
      },
    ];
  }

  private async _delete(c: Category) {
    if (!(await this._confirm.open(t(this.hass, "categories.delete_confirm", { name: c.name }))))
      return;
    await api.deleteCategory(this.hass!, c.id);
  }

  private _renderCategories() {
    const h = this.hass;
    const b = this.budget!;
    return html`
      <ha-card>
        <h1 class="card-header">${t(h, "settings.categories")}</h1>
        <div class="card-content">
          <p class="hint">${t(h, "settings.categories_hint")}</p>
          <ha-md-list>
            ${b.categories.map(
              (c) => html`
                <ha-md-list-item type="button" @click=${() => this._dialog.open(c)}>
                  <span slot="start">${categoryIcon(c)}</span>
                  <span slot="headline">${c.name}</span>
                  <span slot="supporting-text">${t(h, "categories.items", { count: this._count(c) })}</span>
                  <span slot="end" @click=${(e: Event) => e.stopPropagation()}>
                    <ha-icon-overflow-menu .hass=${h} narrow .items=${this._menu(c)}></ha-icon-overflow-menu>
                  </span>
                </ha-md-list-item>
              `,
            )}
          </ha-md-list>
        </div>
        <div class="card-actions">
          <ha-button appearance="plain" @click=${() => this._dialog.open()}>
            <ha-svg-icon slot="start" .path=${mdiPlus}></ha-svg-icon>${t(h, "categories.add")}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  // --- members ---

  private get _isAdmin(): boolean {
    return !!this.hass?.user?.is_admin;
  }

  private get _memberSet(): Set<string> {
    return this._members ?? new Set(this.budget!.config.members);
  }

  private _toggleMember(id: string, checked: boolean) {
    const next = new Set(this._memberSet);
    if (checked) next.add(id);
    else next.delete(id);
    this._members = next;
  }

  private get _membersChanged(): boolean {
    const current = [...this.budget!.config.members].sort().join(",");
    return [...this._memberSet].sort().join(",") !== current;
  }

  private async _saveMembers() {
    await this._save("members", { members: [...this._memberSet] });
    this._members = undefined;
  }

  private _renderMembers() {
    const h = this.hass;
    const b = this.budget!;
    const selected = this._memberSet;
    const everyone = selected.size === 0;
    return html`
      <ha-card>
        <h1 class="card-header">${t(h, "settings.members")}</h1>
        <div class="card-content">
          <p class="hint">${t(h, "settings.members_hint")}</p>
          ${this._isAdmin ? nothing : html`<ha-alert alert-type="info">${t(h, "settings.members_admin")}</ha-alert>`}
          <ha-md-list>
            ${b.all_users.map(
              (u) => html`
                <ha-md-list-item>
                  <ha-checkbox
                    slot="start"
                    .checked=${everyone || selected.has(u.id)}
                    .disabled=${!this._isAdmin}
                    @change=${(e: Event) => this._toggleMember(u.id, (e.target as HTMLInputElement).checked)}
                  ></ha-checkbox>
                  <span slot="headline">${u.name}</span>
                </ha-md-list-item>
              `,
            )}
          </ha-md-list>
        </div>
        <div class="card-actions">
          <ha-button
            .disabled=${!this._isAdmin || !this._membersChanged || this._saving === "members"}
            @click=${() => this._saveMembers()}
          >
            ${t(h, "common.save")}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  // --- household ---

  private get _currencyValue(): string {
    return this._currency ?? this.budget!.config.currency_override ?? "";
  }

  private get _leadDaysValue(): string {
    return this._leadDays ?? String(this.budget!.config.lead_days);
  }

  private get _currencyError(): string | undefined {
    const v = this._currencyValue.trim();
    return v === "" || /^[A-Za-z]{3}$/.test(v) ? undefined : t(this.hass, "validation.currency");
  }

  private get _leadDaysError(): string | undefined {
    const n = Number(this._leadDaysValue);
    return this._leadDaysValue.trim() !== "" && Number.isInteger(n) && n >= 0 && n <= 60
      ? undefined
      : t(this.hass, "validation.lead_days");
  }

  private get _householdChanged(): boolean {
    const b = this.budget!;
    return (
      this._currencyValue.trim().toUpperCase() !== (b.config.currency_override ?? "") ||
      Number(this._leadDaysValue) !== b.config.lead_days
    );
  }

  private async _saveHousehold() {
    await this._save("household", {
      currency: this._currencyValue.trim().toUpperCase() || null,
      lead_days: Number(this._leadDaysValue),
    });
    this._currency = undefined;
    this._leadDays = undefined;
  }

  private _renderHousehold() {
    const h = this.hass;
    const touched = (k: string) => this._touched.has(k);
    return html`
      <ha-card>
        <h1 class="card-header">${t(h, "settings.household")}</h1>
        <div class="card-content">
          ${this._isAdmin ? nothing : html`<ha-alert alert-type="info">${t(h, "settings.members_admin")}</ha-alert>`}
          <div class="fields">
            <div>
              ${textField(h, {
                label: t(h, "settings.currency"),
                value: this._currencyValue,
                error: this._currencyError,
                touched: touched("currency"),
                onChange: (v) => {
                  this._touched = new Set([...this._touched, "currency"]);
                  this._currency = v;
                },
              })}
              <p class="hint small" style="margin: 4px 0 0">
                ${t(h, "settings.currency_hint", { currency: this.hass?.config.currency ?? "" })}
              </p>
            </div>
            <div>
              ${textField(h, {
                label: t(h, "settings.lead_days"),
                value: this._leadDaysValue,
                type: "number",
                min: 0,
                max: 60,
                required: true,
                error: this._leadDaysError,
                touched: touched("lead_days"),
                onChange: (v) => {
                  this._touched = new Set([...this._touched, "lead_days"]);
                  this._leadDays = v;
                },
              })}
              <p class="hint small" style="margin: 4px 0 0">${t(h, "settings.lead_days_hint")}</p>
            </div>
          </div>
        </div>
        <div class="card-actions">
          <ha-button
            .disabled=${
              !this._isAdmin ||
              !this._householdChanged ||
              !!this._currencyError ||
              !!this._leadDaysError ||
              this._saving === "household"
            }
            @click=${() => this._saveHousehold()}
          >
            ${t(h, "common.save")}
          </ha-button>
        </div>
      </ha-card>
    `;
  }

  private async _save(what: string, fields: Parameters<typeof api.updateConfig>[1]) {
    this._saving = what;
    this._error = "";
    this._message = "";
    try {
      await api.updateConfig(this.hass!, fields);
      this._message = t(this.hass, "settings.saved");
    } catch (err) {
      this._error = errorText(this.hass, err);
    } finally {
      this._saving = "";
    }
  }

  render() {
    if (!this.budget) return nothing;
    const h = this.hass;
    return html`
      <hass-tabs-subpage .hass=${h} .narrow=${this.narrow} .route=${this.route} .tabs=${tabs(h, this.route)} main-page>
        <div class="content">
          ${this._error ? html`<ha-alert alert-type="error">${this._error}</ha-alert>` : nothing}
          ${this._message ? html`<ha-alert alert-type="success">${this._message}</ha-alert>` : nothing}
          ${this._renderMembers()} ${this._renderHousehold()} ${this._renderCategories()}
          <ha-card>
            <h1 class="card-header">${t(h, "settings.about")}</h1>
            <div class="card-content">${t(h, "settings.version", { version: this.version })}</div>
          </ha-card>
        </div>
      </hass-tabs-subpage>
      <pro-budget-category-dialog .hass=${h}></pro-budget-category-dialog>
      <pro-budget-confirm .hass=${h}></pro-budget-confirm>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "pro-budget-settings": ProBudgetSettings;
  }
}
