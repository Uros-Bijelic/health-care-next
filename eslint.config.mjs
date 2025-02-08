import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'eslint-config-prettier'],
    plugins: ['import', 'prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          parser: 'typescript',
          avoidEscape: true,
          trailingComma: 'es5',
        },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'warn',
    },
  }),
];

export default eslintConfig;
