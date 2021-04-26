/// <reference types="cypress" />

describe('[INTEGRATION] :: Editar Produtos sem Token de autorização', () => {
  it('/POST - Editar um produto válido', () => {
    // implementar PUT
  })
})

describe('[INTEGRATION] :: Editar Produtos com Token de autorização', () => {
  beforeEach(() => {
    cy.getToken()
  })

  it('/POST - Editar um produto válido', () => {
    // implementar PUT
  })
})
