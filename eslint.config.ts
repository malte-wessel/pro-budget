// ESLint: the recommended JS and TypeScript rules only; types are checked by `npm run typecheck`.
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "custom_components/pro_budget/frontend/",
      "node_modules/",
      ".venv/",
      "coverage/",
      "test-results/",
      "playwright-report/",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", caughtErrors: "none" },
      ],
    },
  },
  {
    // browser code: the panel
    files: ["src/**/*.ts"],
    languageOptions: { globals: { ...globals.browser, __VERSION__: "readonly" } },
  },
  {
    // node code: build, scripts and unit tests
    files: [
      "*.ts",
      "scripts/**/*.ts",
      "scripts/**/*.mjs",
      "tests/unit/**/*.ts",
      "tests/e2e/**/*.ts",
    ],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
);
