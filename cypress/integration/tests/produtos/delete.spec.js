/// <reference types="cypress" />

// DELETE - PRODUTOS//

import faker from 'faker'
import dataProduct from '../../../fixtures/produtos.json'
const httpStatus = require('http-status-codes')

const productFaker = {
  BODY: {
    nome: faker.commerce.productName(),
    preco: faker.commerce.price(),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.datatype.number(100, 1)
  }
}

describe('[INTEGRATION] :: Deletar Produtos sem Token de autorização', () => {
  it('/DELETE - Deletar um produto válido sem utilização de token', () => {
    cy.deleteProduct(dataProduct.produtos[0]._id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })
})

describe('[INTEGRATION] :: Deletar Produtos', () => {
  let _id

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

  it('/DELETE - Deletar um produto válido', () => {
    cy.deleteProduct(_id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
  })

  it('/DELETE - Deletar um produto que não existe', () => {
    cy.deleteProduct(faker.datatype.uuid())
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Nenhum registro excluído')
      })
  })

  it('/DELETE - Deletar um produto com _id em branco', () => {
    cy.deleteProduct('')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.METHOD_NOT_ALLOWED)
      })
  })

  it('/DELETE - Deletar um produto que contenha um carrinho', () => {
    cy.deleteProduct(dataProduct.produtos[0]._id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Não é permitido excluir produto que faz parte de carrinho')
      })
  })
})
