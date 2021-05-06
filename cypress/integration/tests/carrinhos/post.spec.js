/// <reference types="cypress" />

// POST - CARRINHOS //

import faker from 'faker'
import dataCarts from '../../../fixtures/carrinhos.json'
const httpStatus = require('http-status-codes')

const carsFaker = {
  BODY: {
    idProduto: faker.random.alphaNumeric(10),
    quantidade: faker.datatype.number({ min: 1000, max: 5000 })
  }
}

describe('[CARRINHOS] :: Cadastrar Carrinhos sem Token de autorização', () => {
  it('/POST - Cadastrar um carrinho válido sem utilização de token', () => {
    cy.registerCart(
      carsFaker.BODY.idProduto,
      carsFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })
})

describe('[CARRINHOS] :: Cadastrar Carrinhos com Token de autorização', () => {
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
      faker.datatype.number({ min: 1, max: 500 })
    )
      .then((response) => {
        _id = response.body._id
      })
  })

  it('/POST - Cadastrar um carrinho válido com utilização de token', () => {
    cy.registerCart(_id, 1)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      })
  })

  it('/POST - Cadastrar mais de um carrinho para o mesmo usuário', () => {
    cy.registerCart(_id, 1)
    cy.registerCart(_id, 1)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Não é permitido ter mais de 1 carrinho')
      })
  })

  it('/POST - Cadastrar um carrinho cujo o produto esteja duplicado', () => {
    cy.registerCart(dataCarts.carrinhos[0].produtos[0].idProduto, 1)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Não é permitido possuir produto duplicado')
      })
  })

  it('/POST - Cadastrar um carrinho cujo o _id do produto não existe', () => {
    cy.registerCart(faker.random.alphaNumeric(10), 1)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Produto não encontrado')
      })
  })

  it('/POST - Cadastrar um carrinho cujo a quantidade não seja suficiente', () => {
    cy.registerCart(_id, carsFaker.BODY.quantidade)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Produto não possui quantidade suficiente')
      })
  })
})
