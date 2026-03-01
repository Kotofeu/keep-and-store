const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  plugins: [],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'config', 'screen', 'theme']
      }
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme', 'screen']
      }
    ],
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message: 'Class names should be in camelCase'
      }
    ],
    'max-nesting-depth': 3,
    'no-duplicate-selectors': true,
    'selector-max-id': 0,
    'color-named': null,
    'selector-no-qualifying-type': null,
    'no-descending-specificity': null
  },
  ignoreFiles: [
    '**/node_modules/**',
    '**/.next/**',
    '**/out/**',
    '**/public/**',
    '**/dist/**',
    '**/coverage/**',
    '**/certificates/**',
    '**/*.lock.yaml',
    '**/*.lock.json',
    '**/README.md',
    '**/.env',
    '**/.env.*'
  ]
};

export default config;
