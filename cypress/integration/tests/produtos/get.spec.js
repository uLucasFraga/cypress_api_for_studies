/// <reference types="cypress" />

// GET - PRODUTOS //

import dataProducts from '../../../fixtures/produtos.json'
const httpStatus = require('http-status-codes')

describe('[INTEGRATION] :: Listar Produtos', () => {
  let qtd

  it('/GET - Listar todos os produtos cadastrados', () => {
    cy.consultProduct()
      .then((response) => {
        qtd = response.body.quantidade
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(qtd)
      })
  })

  it('/GET - Listar produtos cadastrados pelo _id', () => {
    cy.consultProduct(dataProducts.produtos[0]._id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.produtos[0]._id).to.deep.eq(dataProducts.produtos[0]._id)
      })
  })

  it('/GET - Listar produtos cadastrados pelo nome', () => {
    cy.consultProduct({}, dataProducts.produtos[0].nome)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.produtos[0].nome).to.deep.eq(dataProducts.produtos[0].nome)
      })
  })

  it('/GET - Listar produtos cadastrados pela descrição', () => {
    cy.consultProduct({}, {}, dataProducts.produtos[0].descricao)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.produtos[0].descricao).to.deep.eq(dataProducts.produtos[0].descricao)
      })
  })

  it('/GET - Listar produtos que não estão cadastrados pelo _id', () => {
    cy.consultProduct('ID_NAO_EXISTE', {}, {})
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.deep.eq(0)
      })
  })

  it('/GET - Listar produtos que não estão cadastrados pelo nome', () => {
    cy.consultProduct({}, 'Produto que não existe')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.deep.eq(0)
      })
  })

  it('/GET - Listar produtos que não estão cadastrados pela descrição', () => {
    cy.consultProduct({}, {}, 'Descrição que não existe')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.deep.eq(0)
      })
  })

  it('/GET - Listar produtos pelo _id na URL válido', () => {
    cy.consultProductById(dataProducts.produtos[0]._id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body._id).to.deep.eq(dataProducts.produtos[0]._id)
      })
  })

  it('/GET - Listar produtos pelo _id na URL que não existe', () => {
    cy.consultProductById('ID_QUE_NAO_EXISTE')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.deep.eq('Produto não encontrado')
      })
  })
})
