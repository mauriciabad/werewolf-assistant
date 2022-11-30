import { getInputByLabel, imageShouldLoad } from '../support/helpers'

describe('Player view', () => {
  describe('without scanning a qr code', () => {
    beforeEach(() => {
      cy.visit('/player')
    })

    it('explain player what to do', () => {
      cy.contains('Scan the QR code')
    })

    it('shows locale selector', () => {
      getInputByLabel('English')
    })
  })
  describe('scanning a qr code', () => {
    beforeEach(() => {
      cy.visit(
        '/player?player=Mauri&character=c%3Awerewolf&abilities=a%3Amajor&creationDate=2022-11-28T10%3A07%3A25.189Z'
      )
    })

    it('displays information', () => {
      // Name
      cy.contains('Mauri')

      // Character name
      cy.contains('Werewolf')
      // Character description
      cy.contains('During the night')
      // Character image
      imageShouldLoad('.ilustration--character')

      // Ability name
      cy.contains('Major')
      // Ability description
      cy.contains('your vote defines the result')
      // Ability image
      imageShouldLoad('.ilustration--ability')

      // Start date and time
      // It's a reggex because the locale can be different in the CI and the dev laptop
      cy.contains(/((11\/28\/2022)|(28\/11\/2022))/)
      cy.contains('07:25')
    })

    it('shows locale selector and formats date', () => {
      getInputByLabel('English')
    })

    it('Detail popup', (done) => {
      cy.get('.ilustration--character').click()

      // Hides other characters or abilities
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.contains('Major').shouldNotBeActionable(done)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      cy.get('.ilustration--ability').shouldNotBeActionable(done)

      cy.contains('Close').click()
      cy.get('.ilustration--ability').click()
    })
  })
})
