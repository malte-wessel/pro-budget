# Pro Budget – guide for coding agents

A Home Assistant custom integration (HACS category _integration_) for household budget planning: a
Python backend that owns the data and the maths, and a TypeScript sidebar panel built with Lit and
Home Assistant's own elements. Read this file first; `PLAN.md` holds the design and the phases.

## Map

| Path                                                | What it is                                                                                                                                                                                                                                                    |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `custom_components/pro_budget/`                     | The integration. **Source of truth for data and maths.** `manifest.json` carries the version.                                                                                                                                                                 |
| `custom_components/pro_budget/panel.py`             | Serves `frontend/` as static files and registers the sidebar panel (`pro-budget-panel`).                                                                                                                                                                      |
| `custom_components/pro_budget/frontend/`            | Built panel bundle `pro-budget.js`, **committed**. CI fails if it differs from `npm run build`.                                                                                                                                                               |
| `custom_components/pro_budget/strings.json`         | Backend strings (config flow, entities, services); `translations/{en,de}.json` are the shipped copies.                                                                                                                                                        |
| `src/`                                              | Panel source. `index.ts` is the bundle entry, `panel.ts` the panel element, `ha/types.ts` the HA surface we use.                                                                                                                                              |
| `src/i18n/`                                         | One file per language; `en.ts` is the source and the key type. `src/i18n.ts` picks by `hass.locale.language`.                                                                                                                                                 |
| `tests/python/`                                     | pytest with `pytest-homeassistant-custom-component`: a real HA core, no browser.                                                                                                                                                                              |
| `tests/unit/`                                       | Vitest (happy-dom) for the panel's pure helpers.                                                                                                                                                                                                              |
| `tests/fixtures/`                                   | JSON cases shared by Python and TypeScript tests (recurrence, occurrences, stats), from phase 2 on.                                                                                                                                                           |
| `test/ha/`, `scripts/ha.sh`, `scripts/ha-setup.mjs` | A real Home Assistant (official image, `HA_VERSION` in `test/ha/.env`) with the integration mounted: `npm run ha`. The setup script finishes onboarding with the dev user and adds the config entry over REST. `scripts/ha.sh reset` wipes its config volume. |
| `build.ts`, `pyproject.toml`                        | esbuild for the panel; uv + ruff + mypy + pytest for Python.                                                                                                                                                                                                  |

## Rules that are not obvious from the code

1. **Edit `src/`, then `npm run build`.** Never edit `frontend/pro-budget.js` by hand. The bundle is an ES module loaded by `module_url` with the manifest version as cache buster.
2. **Budget maths lives in Python.** Entities are computed server side; the panel only renders what the websocket API returns. Never duplicate a calculation in TypeScript; shared JSON fixtures keep both sides honest where the panel must format the same numbers.
3. **Home Assistant internals go through one file each.** `src/ha/types.ts` names the `hass` surface; HA elements (`ha-card`, `ha-form`, `ha-dialog`, …) are used in templates but any element that needs loading or wrapping goes through `src/ha/elements.ts` (phase 5). Renames in HA then touch one file.
4. **Strings go through `t(hass, key)`** on the panel and `strings.json` on the backend. Never a rendered literal. Users' own words (titles, category names) are never translated. Log messages and config errors stay English.
5. **Versions agree.** `manifest.json`, `package.json` and `pyproject.toml` carry the same version; the release workflow checks the tag against the first two. Until 1.0.0 ships, `CHANGELOG.md` stays "Initial release".
6. **Python style is ruff `ALL`** with the ignores in `pyproject.toml` (HA style: runtime imports, no copyright headers) and mypy strict. **TypeScript is `strict`**, imports carry `.ts` extensions, Prettier formats, ESLint runs the recommended rules. The pre-commit hook (husky + lint-staged) formats and lints staged files on both sides.
7. **Tests describe behaviour.** Python tests drive the real config entry (`MockConfigEntry`, `hass.config_entries.async_setup`) and assert on HA state (`hass.data["frontend_panels"]`, entity states), not on internals.
8. **Schemas use probatio** (`import probatio as vol`), Home Assistant's validation library since 2026.10 (API-compatible with voluptuous, which it replaced). Websocket decorators come from `homeassistant.components.websocket_api.decorators` (the package re-exports are not explicit for mypy).
9. **Dialogs render through `renderDialog` (`src/ha/dialog.ts`)**, never a hand-written `<ha-dialog>`, so HA's dialog properties and slots (`headerTitle`, the `footer` slot, `preventScrimClose`) are named in one file. Buttons carry `data-action="primary|secondary"` for tests. Buttons carry `data-action="primary|secondary"` for tests. **Dialogs ignore stale `closed` events.** `ha-dialog` fires `closed` asynchronously, also from an element already removed on close; a reopen in between would be closed by it. Every dialog's handler checks `e.target` against the currently rendered `ha-dialog` (see `_onClosed`). Playwright asserts on a dialog's content (`ha-form`), never on the `ha-dialog` host, which has no box of its own.
10. **The layout mirrors `hass-tabs-subpage`** (measured on HA's integrations page, 2026.10): `panel.ts` paints a header of `--header-height` in the sidebar colours with the tabs centred in it (14px, 32px side padding, 24px icon, 2px underline in the primary colour); on narrow screens the host is pinned to the viewport and the tabs become a bottom bar (icon above a 12px label). List views put a toolbar (search, filters, add button) under the header and a full-width table from `table.ts`; only overview, calendar and insights use cards inside `.cards`. HA's own `hass-tabs-subpage-data-table` is not used: it loads only with the config panel's chunk and its API changes between releases. `ha-button` icons go in `slot="start"`.
11. **E2E tests run with the service worker removed** (`tests/e2e/util.ts`): HA registers one on first load and reloads the page when it takes control, which lands mid-test in a fresh browser context. The dev user's profile language decides the panel's labels, so specs select by `href`, slots and structure, never by text.
12. **Minimum HA is 2026.10** (`hacs.json`). Dev and tests run against the version pinned by `pytest-homeassistant-custom-component`, which also pins `home-assistant-frontend` (the `frontend` dependency needs it in tests). The Docker dev HA (`npm run ha`) runs the version pinned in `test/ha/.env`, the same one pytest uses; `HA_VERSION=<version> npm run ha` (after `scripts/ha.sh reset`) runs another version, e.g. a beta. Before using an HA API, check it existed in 2026.10 or raise the minimum in `hacs.json` with a changelog note.

## Definition of done

```sh
npm run check   # prettier check + eslint + tsc + build + vitest + ruff + mypy + pytest
```

Then update `CHANGELOG.md` and, for panel changes, check the result in the real HA (`npm run ha`).

## Conventions

- English for docs, comments and commit messages. Commit messages: imperative subject, body explains why.
- Amounts are integers in minor units (cents) everywhere; formatting happens once, in the panel, with the HA locale and currency.
- Dates are ISO strings (`YYYY-MM-DD`) in storage and over the websocket.
- Entity states and attributes carry money in major units (`entity.money`), everything else in cents.
- Options changes reload the entry: members decide which per-member entities exist. A member's entities stay registered and go unavailable when the user leaves the household, so history survives.
- Service data is compared by value, never identity: Home Assistant hands enums as plain strings (`status == TodoItemStatus.COMPLETED`, not `is`).
