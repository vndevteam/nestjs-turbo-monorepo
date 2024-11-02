import baseConfig from './eslint-base.config.mjs';
import tsEslint from 'typescript-eslint';

const tsConfig = tsEslint.configs.strict;

export default [
  ...baseConfig,
  ...tsConfig,
  {
    languageOptions: {
      globals: {
        React: true,
        JSX: true,
      },
    },
  },
];
