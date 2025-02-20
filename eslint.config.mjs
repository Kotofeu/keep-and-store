import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    extends: ['next', 'prettier'],
    plugins: ['prettier'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'max-len': ['error', { code: 120 }],
      'no-multi-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-console': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-unused-vars': [
        'error',
        {
          args: 'none',
          vars: 'all',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_'
        }
      ],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
      'prefer-const': 'error',
      'react/display-name': 'off',
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'ignore'
        }
      ],
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: true,
          allowNew: false,
          allowLiteral: false,
          allowObject: true
        }
      ],
      'import/named': 'error',
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Используйте Link из @/shared/config/i18n вместо next/link.'
        },
        {
          name: 'next/router',
          message: 'Используйте функции, доступные в @/shared/config/i18n.'
        }
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index'],
          'newlines-between': 'always'
        }
      ],
      'prettier/prettier': 'error',
      'linebreak-style': ['error', 'windows']
    },
    settings: {
      'import/resolver': {
        node: {
          paths: ['src']
        }
      }
    },
    ignorePatterns: ['/node_modules', '/.next', '/public', 'README.md', 'package-lock.json']
  })
];

export default eslintConfig;
