/// <reference types="cypress" />

Cypress.Commands.add(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  'shouldNotBeActionable',
  { prevSubject: 'element' },
  (subject, done, { position, timeout = 100, ...clickOptions } = {}) => {
    cy.once('fail', (err) => {
      expect(err.message).to.include('`cy.click()` failed because this element')
      expect(err.message).to.include('is being covered by another element')
      done()
    })

    const chainable = position
      ? cy.wrap(subject).click(position, { timeout, ...clickOptions })
      : cy.wrap(subject).click({ timeout, ...clickOptions })

    chainable.then(() =>
      done(
        new Error('Expected element NOT to be clickable, but click() succeeded')
      )
    )
  }
)
