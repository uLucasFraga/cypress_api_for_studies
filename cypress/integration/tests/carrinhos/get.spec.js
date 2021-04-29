/// <reference types="cypress" />

// GET - CARRINHOS//

import faker from 'faker'
import dataCars from '../../../fixtures/carrinhos.json'
const httpStatus = require('http-status-codes')

describe('[INTEGRATION] :: Listar Carrinhos', () => {
  let qtd
  let totalPrice
  let totalQtd

  it('/GET - Listar todos os carrinhos cadastrados', () => {
    cy.consultCar()
      .then((response) => {
        qtd = response.body.quantidade
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(qtd)
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo _id', () => {
    cy.consultCarById(dataCars.carrinhos[0]._id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.idUsuario).to.eq(dataCars.carrinhos[0].idUsuario)
      })
  })

  it('/GET - Listar carrinhos cadastrados por um _id inválido', () => {
    cy.consultCarById(faker.random.alphaNumeric(10))
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Carrinho não encontrado')
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo id do usuário', () => {
    cy.consultCar({}, {}, dataCars.carrinhos[0].idUsuario)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0]._id).to.eq(dataCars.carrinhos[0]._id)
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo id do usuário inválido', () => {
    cy.consultCar({}, {}, faker.random.alphaNumeric(10))
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo preço total', () => {
    cy.consultCar(dataCars.carrinhos[0].precoTotal, {}, {})
      .then((response) => {
        totalPrice = response.body.carrinhos[0].precoTotal
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0].precoTotal).to.eq(totalPrice)
      })
  })

  it('/GET - Listar carrinhos cadastrados pelo preço total inválido', () => {
    cy.consultCar(faker.commerce.price(500000), {}, {})
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos cadastrados pela quantidade total', () => {
    cy.consultCar({}, dataCars.carrinhos[0].quantidadeTotal)
      .then((response) => {
        totalQtd = response.body.carrinhos[0].quantidadeTotal
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0].quantidadeTotal).to.eq(totalQtd)
      })
  })

  it('/GET - Listar carrinhos cadastrados pela quantidade total inválido', () => {
    cy.consultCar({}, faker.datatype.number(100))
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos com uma busca correta de: id do usuário e preço total válido', () => {
    cy.consultCar(dataCars.carrinhos[0].precoTotal, {}, dataCars.carrinhos[0].idUsuario)
      .then((response) => {
        totalPrice = response.body.carrinhos[0].precoTotal
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0].precoTotal).to.eq(totalPrice)
        expect(response.body.carrinhos[0].idUsuario).to.eq(dataCars.carrinhos[0].idUsuario)
      })
  })

  it('/GET - Listar carrinhos com uma busca correta de: id do usuário e quantidade total válida', () => {
    cy.consultCar({}, dataCars.carrinhos[0].quantidadeTotal, dataCars.carrinhos[0].idUsuario)
      .then((response) => {
        totalQtd = response.body.carrinhos[0].quantidadeTotal
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.carrinhos[0].quantidadeTotal).to.eq(totalQtd)
        expect(response.body.carrinhos[0].idUsuario).to.eq(dataCars.carrinhos[0].idUsuario)
      })
  })

  it('/GET - Listar carrinhos com uma busca incorreta de: id do usuário válido e preço total inválido', () => {
    cy.consultCar(dataCars.carrinhos[1].precoTotal, {}, dataCars.carrinhos[0].idUsuario)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos com uma busca incorreta de: id do usuário válido e quantidade total inválida', () => {
    cy.consultCar({}, faker.datatype.number(100), {}, dataCars.carrinhos[0].idUsuario)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      })
  })

  it('/GET - Listar carrinhos com uma busca inválida', () => {
    cy.consultCar(faker.random.alpha(5), faker.random.alpha(5))
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.precoTotal).to.eq('precoTotal deve ser um número')
        expect(response.body.quantidadeTotal).to.eq('quantidadeTotal deve ser um número')
      })
  })

  it('/GET - Listar carrinhos com uma busca em branco', () => {
    cy.consultCar('', '')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.precoTotal).to.eq('precoTotal deve ser um número positivo')
        expect(response.body.quantidadeTotal).to.eq('quantidadeTotal deve ser um número positivo')
      })
  })
})
