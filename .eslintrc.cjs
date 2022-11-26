require('@rushstack/eslint-patch/modern-module-resolution')

/**
 * @type {import('eslint").Linter.Config}
 */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@intlify/vue-i18n/recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    'prefer-template': 'warn',
    'vue/block-lang': ['error', { script: { lang: 'ts' } }],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/no-empty-component-block': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/prefer-separate-static-class': 'error',
    'vue/prefer-true-attribute-shorthand': 'error',
    'vue/v-for-delimiter-style': 'error',
    'vue/v-on-function-call': 'error',
    'vue/no-undef-components': 'error',
    'vue/component-tags-order': [
      'error',
      { order: ['script', 'template', 'style'] },
    ],
    '@intlify/vue-i18n/key-format-style': 'error',
    '@intlify/vue-i18n/no-duplicate-keys-in-locale': 'error',
    '@intlify/vue-i18n/no-dynamic-keys': 'error',
    '@intlify/vue-i18n/no-missing-keys-in-other-locales': 'error',
    '@intlify/vue-i18n/no-unknown-locale': 'error',
    '@intlify/vue-i18n/no-unused-keys': 'error',
    '@intlify/vue-i18n/prefer-sfc-lang-attr': 'error',
    '@intlify/vue-i18n/prefer-linked-key-with-paren': 'error',
    '@intlify/vue-i18n/sfc-locale-attr': 'error',
    '@intlify/vue-i18n/no-raw-text': [
      'error',
      {
        ignorePattern: '^\\s*[-#:|()&]+\\s*$',
      },
    ],
  },
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    warnOnUnsupportedTypeScriptVersion: false,
  },
}
