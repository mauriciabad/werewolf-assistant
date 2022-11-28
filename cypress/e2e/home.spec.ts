import { getInputByLabel, urlShouldEqual } from '../support/helpers'

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('asks your role', () => {
    cy.contains('What are you?').should('be.visible')
  })

  it('changing languages', () => {
    // Text is in english by default
    cy.contains('What are you?').should('be.visible')

    getInputByLabel('English').select('Español')

    // Text is in spanish
    cy.contains('¿Qué eres?').should('be.visible')

    getInputByLabel('Español').select('Català')

    // Text is in catalan
    cy.contains('Què ets?').should('be.visible')
  })

  it('clicking player shows explanation page', () => {
    cy.contains('Player').click()

    urlShouldEqual('/player')
  })

  it("clicking storyteller goes to new game if there's no previous data", () => {
    cy.contains('Storyteller').click()

    urlShouldEqual('/new-game')
  })

  it.skip('clicking storyteller goes to current game if there is previous data', () => {
    cy.contains('Storyteller').click()

    // TODO: load game data

    urlShouldEqual('/storyteller')
  })
})
