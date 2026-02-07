import { defineConfig } from "eslint/config";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: [
      "node_modules/**/*.*",
      ".next/**/*.*",
      "dist/**/*.*",
      "build/**/*.*",
      "out/**/*.*",
      "public/**/*.*",
      "styles/**/*.*",
    ],
  },
	{
		rules: {
      "@typescript-eslint/no-explicit-any": "warn",
			"no-unused-vars": "warn",
			"no-undef": "warn",
      "semi": "warn",
		},
	},
]);
