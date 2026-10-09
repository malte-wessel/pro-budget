# Pro Budget

[![Validate](https://github.com/malte-wessel/pro-budget/actions/workflows/validate.yml/badge.svg)](https://github.com/malte-wessel/pro-budget/actions/workflows/validate.yml)
[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz/)
[![License](https://img.shields.io/github/license/malte-wessel/pro-budget)](LICENSE)

Household budget planning inside Home Assistant.

Pro Budget keeps the recurring earnings, expenses and savings of everyone in the household, turns them
into a payment calendar and exposes the key numbers as entities. Budget data lives in Home Assistant,
so automations can remind you before the rent is due, the dashboard can show how much of this month's
income is already spoken for, and every household member sees their own share.

> **Status:** pre-release. Panel, entities and services work; dashboard cards and the docs site
> follow before 1.0.0. See [PLAN.md](PLAN.md).

## What it will do

- **Items** per Home Assistant user: earnings, expenses and savings with a recurrence (daily to annually),
  a due day, fixed or variable, shared with the household or with some members only, optional start and end dates.
- **Sidebar panel** with an overview dashboard (free to spend, month progress, where the income goes, categories, members, the year's outflows, what is due next, the settlement), the items, a payment calendar, per-member insights and a settings page (categories with Home Assistant's icons and named colours, household members, currency, lead days) (savings rate, fixed cost rate, top expenses, the 12-month payment curve).
- **Settlement**: who pays whom how much so the shared costs are split fairly, proportionally to income or equally (configurable), on the overview and as a sensor.
- **Entities**: household and per-member sensors (income, expenses, savings, remaining, next payment, settlement),
  a `calendar` of every payment and a `todo` list of manual payments to tick off.
- **Services** to add, update, remove and mark items paid from automations and voice assistants.

## Installation

### HACS (recommended)

1. HACS → three-dot menu → **Custom repositories**.
2. Add `https://github.com/malte-wessel/pro-budget` with category **Integration**.
3. Install **Pro Budget** and restart Home Assistant.
4. Settings → Devices & services → **Add integration** → Pro Budget.

### Manual

Copy `custom_components/pro_budget` into your `config/custom_components/` folder, restart Home Assistant
and add the integration under Settings → Devices & services.

Requires Home Assistant 2026.10 or newer.

## Development

```sh
npm install        # frontend toolchain + husky hooks
uv sync            # Python venv with Home Assistant and the test harness
npm run watch      # rebuild the panel bundle on change
npm run ha         # a real Home Assistant (official image, version from test/ha/.env) with the integration mounted: http://localhost:8123, dev / dev
npm run check      # everything CI runs: Prettier, ESLint, tsc, build, unit tests, ruff, mypy, pytest
npm run test:e2e   # Playwright against the running dev Home Assistant
```

[AGENTS.md](AGENTS.md) describes the layout and the rules, [CONTRIBUTING.md](CONTRIBUTING.md) the workflow.

## License

[MIT](LICENSE)
