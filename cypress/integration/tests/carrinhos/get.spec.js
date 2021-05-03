/// <reference types="cypress" />

// GET - CARRINHOS //

import faker from 'faker'
import dataCarts from '../../../fixtures/carrinhos.json'
const httpStatus = require('http-status-codes')

describe('[INTEGRATION] :: Listar Carrinhos', () => {
  let qtd
  let totalPrice
  let totalQtd

  it('/GET - Listar todos os carrinhos cadastrados', () => {
    cy.consultCart()
      .then((response) => {
        qtd = response.body.quantidade
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(qtd)
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo _id', () => {
    cy.consultCartById(dataCarts.carrinhos[0]._id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.idUsuario).to.eq(dataCarts.carrinhos[0].idUsuario)
      })
  })

  it('/GET - Listar carrinhos cadastrados por um _id inválido', () => {
    cy.consultCartById(faker.random.alphaNumeric(10))
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Carrinho não encontrado')
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo id do usuário', () => {
    cy.consultCart({}, {}, dataCarts.carrinhos[0].idUsuario)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0]._id).to.eq(dataCarts.carrinhos[0]._id)
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo id do usuário inválido', () => {
    cy.consultCart({}, {}, faker.random.alphaNumeric(10))
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo preço total', () => {
    cy.consultCart(dataCarts.carrinhos[0].precoTotal, {}, {})
      .then((response) => {
        totalPrice = response.body.carrinhos[0].precoTotal
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0].precoTotal).to.eq(totalPrice)
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo preço total inválido', () => {
    cy.consultCart(faker.commerce.price(500000), {}, {})
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos cadastrados pela quantidade total', () => {
    cy.consultCart({}, dataCarts.carrinhos[0].quantidadeTotal)
      .then((response) => {
        totalQtd = response.body.carrinhos[0].quantidadeTotal
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0].quantidadeTotal).to.eq(totalQtd)
      })
  })

  it('/GET - Listar carrinhos cadastrados pela quantidade total inválido', () => {
    cy.consultCart({}, faker.datatype.number(100))
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos com uma busca correta de: id do usuário e preço total válido', () => {
    cy.consultCart(dataCarts.carrinhos[0].precoTotal, {}, dataCarts.carrinhos[0].idUsuario)
      .then((response) => {
        totalPrice = response.body.carrinhos[0].precoTotal
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0].precoTotal).to.eq(totalPrice)
        expect(response.body.carrinhos[0].idUsuario).to.eq(dataCarts.carrinhos[0].idUsuario)
      })
  })

  it('/GET - Listar carrinhos com uma busca correta de: id do usuário e quantidade total válida', () => {
    cy.consultCart({}, dataCarts.carrinhos[0].quantidadeTotal, dataCarts.carrinhos[0].idUsuario)
      .then((response) => {
        totalQtd = response.body.carrinhos[0].quantidadeTotal
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0].quantidadeTotal).to.eq(totalQtd)
        expect(response.body.carrinhos[0].idUsuario).to.eq(dataCarts.carrinhos[0].idUsuario)
      })
  })

  it('/GET - Listar carrinhos com uma busca incorreta de: id do usuário válido e preço total inválido', () => {
    cy.consultCart(dataCarts.carrinhos[1].precoTotal, {}, dataCarts.carrinhos[0].idUsuario)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos com uma busca incorreta de: id do usuário válido e quantidade total inválida', () => {
    cy.consultCart({}, faker.datatype.number(100), {}, dataCarts.carrinhos[0].idUsuario)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos com uma busca inválida', () => {
    cy.consultCart(faker.random.alpha(5), faker.random.alpha(5))
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.precoTotal).to.eq('precoTotal deve ser um número')
        expect(response.body.quantidadeTotal).to.eq('quantidadeTotal deve ser um número')
      })
  })

  it('/GET - Listar carrinhos com uma busca em branco', () => {
    cy.consultCart('', '')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.precoTotal).to.eq('precoTotal deve ser um número positivo')
        expect(response.body.quantidadeTotal).to.eq('quantidadeTotal deve ser um número positivo')
      })
  })
})
