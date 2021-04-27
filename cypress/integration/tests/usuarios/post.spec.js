/// <reference types="cypress" />

// POST - USUÁRIOS//

import faker from 'faker'
const httpStatus = require('http-status-codes')

const userFaker = {
  BODY: {
    nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    pass: faker.internet.password(),
    admin: faker.datatype.boolean().toString()
  }
}

describe('[INTEGRATION] :: Cadastrar Usuários', () => {
  it('/POST - Cadastrar um usuário válido', () => {
    cy.registerUser(userFaker.BODY.nome, userFaker.BODY.email, userFaker.BODY.pass, userFaker.BODY.admin)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      })
  })

  it('/POST - Cadastrar um usuário sem nome', () => {
    cy.registerUser('', userFaker.BODY.email, userFaker.BODY.pass, userFaker.BODY.admin)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.nome).to.eq('nome não pode ficar em branco')
      })
  })

  it('/POST - Cadastrar um usuário sem email', () => {
    cy.registerUser(userFaker.BODY.nome, '', userFaker.BODY.pass, userFaker.BODY.admin)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email não pode ficar em branco')
      })
  })

  it('/POST - Cadastrar um usuário sem password', () => {
    cy.registerUser(userFaker.BODY.nome, userFaker.BODY.email, '', userFaker.BODY.admin)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.password).to.eq('password não pode ficar em branco')
      })
  })

  it('/POST - Cadastrar um usuário sem a flag de admin', () => {
    cy.registerUser(userFaker.BODY.nome, userFaker.BODY.email, userFaker.BODY.pass, '')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'")
      })
  })

  it('/POST - Cadastrar um usuário sem nenhuma informação preenchida', () => {
    cy.registerUser('', '', '', '')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.nome).to.eq('nome não pode ficar em branco')
        expect(response.body.email).to.eq('email não pode ficar em branco')
        expect(response.body.password).to.eq('password não pode ficar em branco')
        expect(response.body.administrador).to.eq("administrador deve ser 'true' ou 'false'")
      })
  })

  it('/POST - Cadastrar um usuário já cadastrado', () => {
    cy.registerUser(userFaker.BODY.nome, userFaker.BODY.email, userFaker.BODY.pass, userFaker.BODY.admin)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Este email já está sendo usado')
      })
  })
})
