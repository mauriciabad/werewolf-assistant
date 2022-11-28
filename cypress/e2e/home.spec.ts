import { getInputByLabel } from '../support/helpers'

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('asks your role', () => {
    cy.contains('What are you?').should('be.visible')
  })

  it('changing languages', () => {
    cy.contains('What are you?').should(
      'be.visible',
      'Text is in english by default'
    )

    getInputByLabel('English').select('Español')

    cy.contains('¿Qué eres?').should('be.visible', 'Text is in spanish')

    getInputByLabel('Español').select('Català')

    cy.contains('Què ets?').should('be.visible', 'Text is in catalan')
  })
})
