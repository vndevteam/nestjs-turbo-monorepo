import baseConfig from "./eslint-base.config.mjs";
import next from "@next/eslint-plugin-next";
import { fixupConfigRules } from "@eslint/compat";
import flatCompat from "./compat.mjs";
import tsEslint from "typescript-eslint";

const tsConfig = (
  tsEslint.configs.strict
);

const nextConfig = (
  fixupConfigRules(
    (flatCompat.config(next.configs["core-web-vitals"])),
  )
);

export default [
  ...baseConfig,
  ...tsConfig,
  ...nextConfig,
  {
    languageOptions: {
      globals: {
        React: true,
        JSX: true,
      },
    },
    rules: {
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-empty-function": "off",
    },
  },
];
