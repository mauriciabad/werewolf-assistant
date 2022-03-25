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
}
