# Contributing

Thanks for helping with Pro Budget. The short version:

1. Fork, branch from `main`, `npm install` and `uv sync` (Node 22.18 or newer, Python 3.14, [uv](https://docs.astral.sh/uv/)).
2. Backend changes go in `custom_components/pro_budget/`, panel changes in `src/`. After a panel change run
   `npm run build` and commit the updated `custom_components/pro_budget/frontend/pro-budget.js`.
3. Add or update tests: `tests/python/` (pytest against a real Home Assistant core) and `tests/unit/` (Vitest).
4. Strings: backend in `strings.json` + `translations/`, panel in `src/i18n/`. English is the source, German second.
5. Run `npm run check` before opening the pull request, and `npm run test:e2e` against `npm run ha` for panel changes. The pre-commit hook formats and lints staged files.
6. Add a line to `CHANGELOG.md` under the next version.

Design rules: the panel uses Home Assistant's own elements and theme tokens, never hard-coded colours;
the integration keeps no runtime requirements beyond Home Assistant; storage changes bump the store
version and ship a migration.
