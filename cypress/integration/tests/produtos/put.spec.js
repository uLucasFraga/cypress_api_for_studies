/// <reference types="cypress" />

// PUT - PRODUTOS//

import faker from 'faker'
import dataProducts from '../../../fixtures/produtos.json'
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
  it('/PUT - Editar um produto válido', () => {
    cy.modifyProduct(
      dataProducts.produtos[0]._id,
      faker.commerce.productName(),
      faker.commerce.price(),
      faker.commerce.productDescription(),
      faker.datatype.number(100, 1)
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })
})

describe('[INTEGRATION] :: Editar Produtos com Token de autorização', () => {
  let _id
  let newId

  beforeEach(() => {
    cy.getToken()

    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    )
      .then((response) => {
        _id = response.body._id
      })
  })

  it('/PUT - Editar um produto válido', () => {
    cy.modifyProduct(
      _id,
      faker.commerce.productName(),
      faker.commerce.price(),
      faker.commerce.productDescription(),
      faker.datatype.number(100, 1)
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro alterado com sucesso')
        newId = response.body._id
      })
  })

  it('/PUT - Editar um produto já existente', () => {
    cy.modifyProduct(
      newId,
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Já existe produto com esse nome')
      })
  })

  it('/PUT - Editar um produto não existente', () => {
    cy.modifyProduct(
      faker.datatype.uuid(),
      faker.commerce.productName(),
      faker.commerce.price(),
      faker.commerce.productDescription(),
      faker.datatype.number(100, 1)
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      })
  })
})
