/**
 * @type {import("stylelint").Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-idiomatic-order',
    'stylelint-config-prettier-scss',
    'stylelint-config-standard-vue',
  ],
  plugins: ['stylelint-order'],

  rules: {
    'block-no-empty': null,
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 3,
    'selector-class-pattern': [
      '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$',
      {
        message: 'Class names must follow BEM convention',
      },
    ],
    'declaration-block-no-duplicate-properties': true,
    'string-quotes': 'single',
  },
}
