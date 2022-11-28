describe('Home view', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('when it is first visit', () => {
    it('asks your role', () => {
      cy.contains('What are you?').should('be.visible')
    })
  })
})
