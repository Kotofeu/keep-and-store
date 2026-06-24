const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  plugins: [],
  ignoreFiles: ['node_modules/**', '.next/**', 'out*/**', 'public/**', 'dist/**', 'coverage*/**', 'certificates/**'],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'layer', 'config', 'screen', 'theme', 'custom-variant', 'utility']
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
    'no-descending-specificity': null,
    'no-invalid-position-declaration': [
      true,
      {
        ignoreAtRules: ['utility', 'media', 'layer', 'tailwind']
      }
    ]
  }
};

export default config;
