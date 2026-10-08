import { readFileSync } from "node:fs";
import * as esbuild from "esbuild";

const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
const watch = process.argv.includes("--watch");

// The panel is served by the integration itself from custom_components/pro_budget/frontend/.
const options: esbuild.BuildOptions = {
  entryPoints: ["src/index.ts"],
  outfile: "custom_components/pro_budget/frontend/pro-budget.js",
  bundle: true,
  format: "esm",
  target: "es2022",
  minify: true,
  sourcemap: false,
  legalComments: "none",
  define: { __VERSION__: JSON.stringify(version) },
  banner: { js: `/* pro-budget v${version} | MIT | https://github.com/malte-wessel/pro-budget */` },
  logLevel: "info",
};

if (watch) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
} else {
  await esbuild.build(options);
}
