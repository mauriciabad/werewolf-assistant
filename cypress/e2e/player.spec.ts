import { getInputByLabel } from '../support/helpers'

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
})
