/// <reference types="cypress" />

// DELETE - USUÁRIOS//

import dataUsers from '../../../fixtures/usuarios.json'
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

describe('[INTEGRATION] :: Deletar Usuários', () => {
  let _id

  before(() => {
    cy.registerUser(userFaker.BODY.nome, userFaker.BODY.email, userFaker.BODY.pass, userFaker.BODY.admin)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.CREATED)
        expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        _id = response.body._id
      })
  })

  it('/DELETE - Deletar um usuário válido', () => {
    cy.deleteUser(_id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Registro excluído com sucesso')
      })
  })

  it('/DELETE - Deletar um usuário que não existe', () => {
    cy.deleteUser(_id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Nenhum registro excluído')
      })
  })

  it('/DELETE - Deletar um usuário com _id em branco', () => {
    cy.deleteUser('')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.METHOD_NOT_ALLOWED)
      })
  })

  it('/DELETE - Deletar um usuário que contenha um carrinho', () => {
    cy.deleteUser(dataUsers.idUsuario)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.message).to.eq('Não é permitido excluir usuário com carrinho cadastrado')
      })
  })
})
