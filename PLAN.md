# Pro Budget – implementation plan

A Home Assistant custom integration (HACS, category _integration_) for planning a household budget:
recurring earnings, expenses and savings per user, a payment calendar, and the household's key numbers
as entities. Ported from the `household-2026` proof of concept; quality bar is `pro-cards`.

## Decisions

| Topic             | Decision                                                                                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend           | Python custom integration `custom_components/pro_budget`. All budget math lives here (entities need it server side).                                                  |
| Frontend          | TypeScript, Lit (bundled, ~16 kB; HA's own framework), `ha-*` elements for chrome, forms, dialogs and tables. Own rendering for calendar grid and charts.             |
| Members           | Home Assistant users. Items store `user_id`; names resolved from the auth store. Options flow picks which users are household members.                                |
| Storage           | `homeassistant.helpers.storage.Store`, key `pro_budget`, versioned with migrations. No SQLite.                                                                        |
| Install           | HACS integration. Panel JS served by the integration itself; Lovelace resource registered on setup. One install, one restart.                                         |
| Currency / locale | From `hass.config.currency` and `hass.config.language`; optional currency override per item for the rare case.                                                        |
| Translations      | Backend `strings.json` + `translations/{en,de}.json`. Frontend `src/i18n/{en,de}.ts`, English source. German is the second language from day one (the POC is German). |
| Minimum HA        | 2026.10 (decided 2026-10-08; was 2025.3, then 2026.1); the dev HA runs the same version.                                                                              |
| Permissions       | Everyone who can open the panel edits everything. Admin-only settings stay in the options flow.                                                                       |
| Python tooling    | uv (lockfile), ruff `ALL` with documented ignores, mypy strict, pytest-homeassistant-custom-component (pins HA and `home-assistant-frontend`).                        |
| Name / domain     | Pro Budget, domain `pro_budget`.                                                                                                                                      |

## Data model (storage v1)

```jsonc
{
  "version": 1,
  "data": {
    "categories": [{ "id": "…", "name": "Wohnen", "icon": "mdi:home", "order": 0 }],
    "items": [
      {
        "id": "…",
        "title": "Miete",
        "type": "expense",            // earning | expense | saving
        "amount": 123456,             // minor units (cents), always positive
        "currency": null,             // null = HA currency
        "category_id": "…",
        "recurrence": "monthly",      // daily | weekly | biweekly | monthly | quarterly | semi_annually | annually
        "due_day": 1,                 // weekday 1-7 for weekly/biweekly, day of month otherwise, null for daily
        "due_month": null,            // 1-12 for quarterly and longer
        "payment_method": "direct_debit", // direct_debit | standing_order | manual | credit_card | paypal | null
        "cost_kind": "fixed",         // fixed | variable
        "shared": true,
        "user_id": "…",               // HA user id (payer / receiver)
        "start": null,                // ISO date or null
        "end": null,
        "created": "2026-10-08T09:00:00+00:00",
        "updated": "…"
      }
    ],
    "paid": { "<item_id>": ["2026-10-01", "…"] }   // occurrences marked paid (manual items, todo)
  }
}
```

Config entry options: `members` (list of user ids), `currency` (override, optional), `lead_days` (for
"next due" and todo creation, default 3), `calendar_per_user` (bool).

## Backend modules

| File                    | Responsibility                                                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `__init__.py`           | Setup/unload, registers panel + static path + Lovelace resource, creates the store and model.                 |
| `config_flow.py`        | Single instance; options flow with user multi-select, currency, lead days.                                    |
| `const.py`              | Domain, enums, defaults.                                                                                      |
| `store.py`              | `Store` wrapper, schema version, migrations, CRUD with validation (voluptuous), change signal via dispatcher. |
| `budget/recurrence.py`  | Port of `recurrence.ts`: monthly factors, due months, active-in-month, due cents in month.                    |
| `budget/occurrences.py` | Port of `occurrences.ts`: concrete dates in a range, grouping by day, unscheduled items.                      |
| `budget/stats.py`       | Port of `stats.ts`: per-user month stats, household totals, fairness, category breakdown.                     |
| `budget/insights.py`    | Port of `insights.ts`: per-user groups, ratios, top expenses, 12-month calendar, peak/low month.              |
| `model.py`              | Facade: loads store, resolves users, exposes computed views, notifies entities on change.                     |
| `websocket.py`          | WS commands (below).                                                                                          |
| `services.py`           | HA services with `services.yaml` selectors.                                                                   |
| `sensor.py`             | Household and per-user sensors.                                                                               |
| `calendar.py`           | Household calendar and optional per-user calendars.                                                           |
| `todo.py`               | Manual payments to-do list.                                                                                   |
| `panel.py`              | Panel registration, static path, resource.                                                                    |
| `frontend/`             | Built bundle `pro-budget.js` (committed, CI checks it matches the build).                                     |

### Websocket commands

`pro_budget/subscribe` (pushes the full state on every change), `pro_budget/users`, `pro_budget/categories/{create,update,delete}`,
`pro_budget/items/{create,update,delete}`, `pro_budget/paid/{set,clear}`, `pro_budget/stats` (month, user filter),
`pro_budget/insights` (user, year), `pro_budget/occurrences` (range, user filter). Admin not required; a
non-admin may only edit items whose `user_id` is their own (option to relax).

### Services

`pro_budget.add_item`, `update_item`, `remove_item`, `mark_paid`, `unmark_paid`. Fields use selectors so
the automation editor renders them.

### Entities

All sensors carry the breakdown as attributes and belong to one device "Pro Budget".

| Entity                                  | State                                                                     |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `sensor.pro_budget_income`              | household monthly-equivalent income                                       |
| `sensor.pro_budget_expenses`            | … expenses (attrs: fixed, variable, shared)                               |
| `sensor.pro_budget_savings`             | … savings                                                                 |
| `sensor.pro_budget_remaining`           | income − expenses − savings                                               |
| `sensor.pro_budget_savings_rate`        | %                                                                         |
| `sensor.pro_budget_fixed_cost_rate`     | %                                                                         |
| `sensor.pro_budget_due_this_month`      | actual outflow due in the current month                                   |
| `sensor.pro_budget_next_payment`        | date; attrs title, amount, user                                           |
| `sensor.pro_budget_<user>_balance`      | per member; attrs earnings, expenses, savings, shared share, income share |
| `sensor.pro_budget_<user>_next_payment` | per member                                                                |
| `calendar.pro_budget`                   | every occurrence as an event (amount in description)                      |
| `calendar.pro_budget_<user>`            | optional, per member                                                      |
| `todo.pro_budget_manual_payments`       | manual items due within `lead_days`; completing marks paid                |

Entities update on store changes and once a day at midnight (dates move).

## Frontend (panel)

Lit elements, one file per view, shared `api.ts` (typed WS client), `i18n`, `format` (money via
`Intl.NumberFormat` with HA locale and currency).

| View       | Content                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Overview   | Month dashboard: free to spend, progress, income split, categories, members, year outlook, up next, settlement. Month switcher, user filter. |
| Items      | `ha-data-table` with filters (type, user, category); item dialog on `ha-form` schema.                                                        |
| Calendar   | Agenda (next 8 weeks) and month grid; mark paid inline.                                                                                      |
| Insights   | Per member: ratios, top expenses, groups, 12-month payment chart, unscheduled items.                                                         |
| Categories | List with inline rename, icon picker, delete guard when in use.                                                                              |
| Settings   | Link to the options flow; export / import JSON.                                                                                              |

Boot: `loadCardHelpers()` and create a throwaway card so `ha-form`, `ha-dialog`, `ha-data-table` are
defined before first render. All HA element usage goes through `src/ha/elements.ts` so renames touch one file.

Dashboard cards (phase 6, same bundle): `pro-budget-overview-card`, `pro-budget-agenda-card`,
`pro-budget-fairness-card`. They read the sensors and calendar so they work without the panel.

## Repository layout

```
custom_components/pro_budget/      backend + frontend/pro-budget.js (built, committed)
src/                               TypeScript panel source
tests/python/                      pytest (pytest-homeassistant-custom-component)
tests/fixtures/*.json              shared cases: recurrence, occurrences, stats, insights
tests/unit/                        vitest for frontend helpers
tests/e2e/                         Playwright against the real HA (official image via npm run ha)
docs/                              VitePress site (guide, panel, entities, automations, changelog)
test/ha/                           dev HA config with a seeded demo household
scripts/                           ha.sh, build.ts, validate.ts
.github/workflows/                 validate (hassfest, hacs, ruff, mypy, pytest, prettier, eslint, tsc, build diff, e2e), docs, release
```

Tooling: `uv` + ruff + mypy (strict) for Python; npm + esbuild + Prettier + ESLint + vitest + Playwright
for TypeScript; husky + lint-staged pre-commit; `npm run check` runs everything.

## Phases

Each phase ends green on `npm run check` and with a changelog line; nothing ships before 1.0.0.

1. **Skeleton and tooling.** ✅ done 2026-10-08. Repo layout, manifest, hacs.json, empty config flow that creates an
   entry, Python and TS toolchains, CI workflows, devcontainer running HA with the integration mounted.
   Done when HA loads the integration and CI is green.
2. **Domain port.** ✅ done 2026-10-08 (1,113 fixture cases from the POC, all agree; day-group sort order made explicit: earnings, expenses, savings). Port the four TS modules to Python. Export the POC's vitest cases as JSON fixtures
   and run them from pytest; same fixtures also test the TS formatting helpers. Done when all POC cases pass.
3. **Store, model, websocket, services.** ✅ done 2026-10-08 (verified on HA 2025.3.4 and 2026.10; schema library via `validation.py`: probatio on new HA, voluptuous on old). Validated CRUD, migrations scaffold, subscribe command, user
   resolution, services with selectors. Done when the developer tools can add an item and read it back.
4. **Entities.** ✅ done 2026-10-08 (coordinator refreshes on every change and at midnight; to-do window bounded by item creation; per-member entities go unavailable when a user leaves the household). Sensors, calendar, todo; midnight refresh; device registration. Done when the HA
   calendar card shows payments and a calendar trigger automation fires in the dev HA.
5. **Panel.** ✅ done 2026-10-08 (Lit + HA elements; overview, items with dialog, calendar agenda/month with paid toggle, insights, categories; en/de; Playwright e2e against the real HA 2025.3.4 in Docker). Boot, items + dialog, overview, calendar, insights, categories, settings, i18n en/de.
   Playwright e2e on the real HA. Done when the full POC workflow runs inside HA.
6. **Cards, docs, release.** Three dashboard cards, VitePress docs with a WS shim for live examples,
   release workflow, README, 1.0.0.

## Open questions (to settle during phase 1–3, defaults in brackets)

- Keep `currency` per item at all [yes, hidden behind "advanced" in the form].
- Should earnings create calendar events [yes, as all-day events with a different icon].
- Actuals for variable items [not in 1.0; design the store so a `actuals` map can be added in v2].
