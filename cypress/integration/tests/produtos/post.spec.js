/// <reference types="cypress" />

// POST - PRODUTOS //

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

describe('[PRODUTOS] :: Cadastrar Produtos sem Token de autorização', () => {
  it('/POST - Cadastrar um produto válido sem utilização de token', () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
      })
  })
})

describe('[PRODUTOS] :: Cadastrar Produtos com Token de autorização', () => {
  beforeEach(() => {
    cy.getToken()
  })

  it('/POST - Cadastrar um produto válido com utilização de token', () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      })
  })

  it('/POST - Cadastrar um produto com o mesmo nome', () => {
    cy.registerProduct(
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

  it('/POST - Cadastrar um produto com o campo Nome não sendo uma string', () => {
    cy.registerProduct(
      {},
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.nome).to.eq('nome deve ser uma string')
      })
  })

  it('/POST - Cadastrar um produto com o campo Preço não sendo um number', () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      {},
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.preco).to.eq('preco deve ser um número')
      })
  })

  it('/POST - Cadastrar um produto com o campo Descrição não sendo uma string', () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      {},
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.descricao).to.eq('descricao deve ser uma string')
      })
  })

  it('/POST - Cadastrar um produto com o campo Quantidade não sendo um number', () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      {}
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.quantidade).to.eq('quantidade deve ser um número')
      })
  })

  it('/POST - Cadastrar um produto sem preencher o campo Nome', () => {
    cy.registerProduct(
      '',
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.nome).to.eq('nome não pode ficar em branco')
      })
  })

  it('/POST - Cadastrar um produto sem preencher o campo Preco', () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      '',
      productFaker.BODY.descricao,
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.preco).to.eq('preco deve ser um número')
      })
  })

  it('/POST - Cadastrar um produto sem preencher o campo Descrição', () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      '',
      productFaker.BODY.quantidade
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.descricao).to.eq('descricao não pode ficar em branco')
      })
  })

  it('/POST - Cadastrar um produto sem preencher o campo Quantidade', () => {
    cy.registerProduct(
      productFaker.BODY.nome,
      productFaker.BODY.preco,
      productFaker.BODY.descricao,
      ''
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.quantidade).to.eq('quantidade deve ser um número')
      })
  })

  it('/POST - Cadastrar um produto sem preencher nenhum campo', () => {
    cy.registerProduct()
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.nome).to.eq('nome é obrigatório')
        expect(response.body.preco).to.eq('preco é obrigatório')
        expect(response.body.descricao).to.eq('descricao é obrigatório')
        expect(response.body.quantidade).to.eq('quantidade é obrigatório')
      })
  })
})
