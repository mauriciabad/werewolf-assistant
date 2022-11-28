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
