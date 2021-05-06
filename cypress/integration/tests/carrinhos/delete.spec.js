/// <reference types="cypress" />

// DELETE - CARRINHOS - CONCLUIR COMPRA //

import faker from 'faker'
const httpStatus = require('http-status-codes')

describe('[CARRINHOS] :: Deletar Carrinhos quando "Concluir uma Compra" sem Token de autorização', () => {
  it('/DELETE - Deletar um carrinho quando "concluir uma compra" válido sem utilização de token', () => {
    cy.deleteWhenPurchaseCompleteCart()
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })
})

describe('[CARRINHOS] :: Deletar Carrinhos quando "Concluir uma Compra" Token de autorização', () => {
  let _id

  beforeEach(() => {
    cy.registerUserWithLogin(
      `${faker.name.firstName()} ${faker.name.lastName()}`,
      faker.internet.email(),
      faker.internet.password()
    )

    cy.registerProduct(
      faker.commerce.productName(),
      faker.commerce.price(),
      faker.commerce.productDescription(),
      faker.datatype.number({ min: 1000, max: 5000 })
    )
      .then((response) => {
        _id = response.body._id
      })
  })

  it('/DELETE - Deletar um carrinho quando "concluir uma compra" válido com utilização de token', () => {
    cy.registerCart(_id, 1)

    cy.deleteWhenPurchaseCompleteCart()
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
  })

  it('/DELETE - Deletar um carrinho quando "concluir uma compra" que não existe para o usuário', () => {
    cy.deleteWhenPurchaseCompleteCart()
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Não foi encontrado carrinho para esse usuário')
      })
  })
})

describe('[CARRINHOS] :: Deletar Carrinhos quando "Cancelar uma Compra" sem Token de autorização', () => {
  it('/DELETE - Deletar um carrinho quando "cancelar uma compra" válido sem utilização de token', () => {
    cy.deleteWhenCancelCart()
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })
})

describe('[CARRINHOS] :: Deletar Carrinhos quando "Cancelar uma Compra" Token de autorização', () => {
  let _id

  beforeEach(() => {
    cy.registerUserWithLogin(
      `${faker.name.firstName()} ${faker.name.lastName()}`,
      faker.internet.email(),
      faker.internet.password()
    )

    cy.registerProduct(
      faker.commerce.productName(),
      faker.commerce.price(),
      faker.commerce.productDescription(),
      faker.datatype.number({ min: 1000, max: 5000 })
    )
      .then((response) => {
        _id = response.body._id
      })
  })

  it('/DELETE - Deletar um carrinho quando "cancelar uma compra" válido com utilização de token', () => {
    cy.registerCart(_id, 1)

    cy.deleteWhenCancelCart()
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')
      })
  })

  it('/DELETE - Deletar um carrinho quando "cancelar uma compra" que não existe para o usuário', () => {
    cy.deleteWhenCancelCart()
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Não foi encontrado carrinho para esse usuário')
      })
  })
})
