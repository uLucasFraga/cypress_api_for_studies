/// <reference types="cypress" />

import faker from 'faker'
const httpStatus = require('http-status-codes')

const productFaker = {
  BODY: {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price(),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.datatype.number(100, 1)
  }
}

describe('[INTEGRATION] :: Editar Produtos sem Token de autorização', () => {

  it('/POST - Editar um produto válido', () => {
    //implementar PUT
  })
})

describe('[INTEGRATION] :: Editar Produtos com Token de autorização', () => {

  beforeEach(() => {
    cy.getToken()
  })

  it('/POST - Editar um produto válido', () => {
    //implementar PUT
  })
})
