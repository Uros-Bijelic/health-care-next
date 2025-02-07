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
    extends: ['next/core-web-vitals', 'next/typescript'],
    plugins: ['prettier', 'eslint-plugin-prettier'],
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          parser: 'typescript',
          avoidEscape: true,
          trailingComma: 'es5',
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  }),
];

export default eslintConfig;
