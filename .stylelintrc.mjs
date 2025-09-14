export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    'selector-class-pattern': '^[a-z][a-zA-Z0-9_]+$',
    '@stylistic/block-opening-brace-space-before': 'always',
    '@stylistic/indentation': 2,
    '@stylistic/number-leading-zero': 'always',
    '@stylistic/no-missing-end-of-source-newline': true,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'selector-pseudo-element-colon-notation': null,
    'custom-property-empty-line-before': null,
    'comment-empty-line-before': null,
    '@stylistic/string-quotes': 'single',
    '@stylistic/color-hex-case': 'lower',
    '@stylistic/no-extra-semicolons': true,
    '@stylistic/no-eol-whitespace': true,
    'color-hex-length': null,
    'color-function-alias-notation': null
  },
  ignoreFiles: ['node_modules/**', '.next/**', 'dist/**', '**/*.min.css', '**/*.js', '**/*.jsx']
};
