/**
 * @type {import("stylelint").Config}
 */
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-sass-guidelines',
    'stylelint-config-idiomatic-order',
    'stylelint-config-standard-vue',
    'stylelint-config-prettier-scss',
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
    'selector-no-qualifying-type': [true, { ignore: ['attribute'] }],
    'order/properties-alphabetical-order': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'function-no-unknown': null,
    'scss/function-no-unknown': true,
  },

  ignoreFiles: ['dist/**/*'],
}
