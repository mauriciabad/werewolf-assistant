export function byTestId<T extends string>(testId: T): `[data-test-id="${T}"]` {
  return `[data-test-id="${testId}"]`
}

export function getInputByLabel(label: string) {
  return cy
    .contains(label)
    .invoke('attr', 'for')
    .then((id) => {
      cy.get(`#${id}`)
    })
}

export function urlShouldEqual(path: string) {
  return cy.url().should('eq', `http://localhost:4173${path}`)
}

export function imageShouldLoad(selector: string) {
  return cy
    .get(selector)
    .should('be.visible')
    .and(($img) => {
      expect(($img[0] as HTMLImageElement).naturalWidth).to.be.greaterThan(0)
    })
}
