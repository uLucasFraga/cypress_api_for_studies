/// <reference types="cypress" />

// PUT - USUÁRIOS//

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

describe('[INTEGRATION] :: Editar Usuários', () => {
  let _id

  before(() => {
    cy.registerUser(
      userFaker.BODY.nome,
      userFaker.BODY.email,
      userFaker.BODY.pass,
      userFaker.BODY.admin
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        _id = response.body._id
      })
  })

  it('/PUT - Editar nome, email e senha de um usuário válido', () => {
    cy.modifyUser(
      _id,
      `${faker.name.firstName()} ${faker.name.lastName()}`,
      faker.internet.email(),
      faker.internet.password()
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro alterado com sucesso')
      })
  })

  it('/PUT - Editar um usuário que não existe na base', () => {
    cy.modifyUser(
      faker.random.alphaNumeric(10),
      `${faker.name.firstName()} ${faker.name.lastName()}`,
      faker.internet.email(),
      faker.internet.password()
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      })
  })

  it('/PUT - Editar nome de um usuário válido', () => {
    cy.modifyUser(
      _id,
      `${faker.name.firstName()} ${faker.name.lastName()}`,
      userFaker.BODY.email,
      userFaker.BODY.pass
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro alterado com sucesso')
      })
  })

  it('/PUT - Editar email de um usuário válido', () => {
    cy.modifyUser(
      _id,
      userFaker.BODY.nome,
      faker.internet.email(),
      userFaker.BODY.pass
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro alterado com sucesso')
      })
  })

  it('/PUT - Editar password de um usuário válido', () => {
    cy.modifyUser(
      _id,
      userFaker.BODY.nome,
      userFaker.BODY.email,
      faker.internet.password()
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro alterado com sucesso')
      })
  })

  it('/PUT - Editar sem alterar o email', () => {
    cy.modifyUser(
      _id,
      userFaker.BODY.nome,
      'fulano@qa.com',
      userFaker.BODY.pass
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Este email já está sendo usado')
      })
  })

  it('/PUT - Editar com um email inválido', () => {
    cy.modifyUser(
      _id,
      userFaker.BODY.nome,
      'com.br@nao.valido',
      userFaker.BODY.pass
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email deve ser um email válido')
      })
  })

  it('/PUT - Editar sem preencher o nome', () => {
    cy.modifyUser(
      _id,
      '',
      userFaker.BODY.email,
      userFaker.BODY.pass
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.nome).to.eq('nome não pode ficar em branco')
      })
  })

  it('/PUT - Editar sem preencher o email', () => {
    cy.modifyUser(
      _id,
      userFaker.BODY.nome,
      '',
      userFaker.BODY.pass
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email não pode ficar em branco')
      })
  })

  it('/PUT - Editar sem preencher o password', () => {
    cy.modifyUser(
      _id,
      userFaker.BODY.nome,
      userFaker.BODY.email,
      ''
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.password).to.eq('password não pode ficar em branco')
      })
  })

  it('/PUT - Editar sem preencher o nome, email e password', () => {
    cy.modifyUser(
      _id,
      '',
      '',
      ''
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.nome).to.eq('nome não pode ficar em branco')
        expect(response.body.email).to.eq('email não pode ficar em branco')
        expect(response.body.password).to.eq('password não pode ficar em branco')
      })
  })
})
