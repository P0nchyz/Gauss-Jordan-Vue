import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,vue}"] },
	{ ignores: ["dist/*", "public/gauss_jordan.js"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...pluginVue.configs["flat/essential"],
];
