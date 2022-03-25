/**
 * @type {import("prettier").Options}
 */
module.exports = {
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 120,
      },
    },
  ],
}
