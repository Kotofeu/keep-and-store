import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json'
        },
        node: {
          paths: ['src'],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: 'next',
              group: 'external',
              position: 'before'
            }
          ],
          pathGroupsExcludedImportTypes: ['react'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
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
      'import/no-unresolved': 'error',
      'import/named': 'error'
    }
  },
  {
    plugins: {
      prettier: prettier
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'none',
          printWidth: 120,
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'auto'
        }
      ]
    }
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'prefer-const': 'error',
      'react/display-name': 'off',
      'no-unused-expressions': 'error',
      'no-duplicate-imports': 'error',
      'object-shorthand': ['error', 'always']
    }
  },

  globalIgnores([
    '.next/**',
    'node_modules',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/**',
    'dist/**',
    'coverage/**',
    '.vercel/**',
    '.husky/**',
    '**/*.d.ts',
    'README.md',
    'package-lock.json',
    'pnpm-lock.yaml'
  ])
]);
