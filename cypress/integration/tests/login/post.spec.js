/// <reference types="cypress" />

// LOGIN //

const httpStatus = require('http-status-codes')

describe('[INTEGRATION] :: Login', () => {
  it('/POST - Realizar login com sucesso', () => {
    cy.doLogin(
      Cypress.env('EMAIL'),
      Cypress.env('PASSWORD')
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.message).to.eq('Login realizado com sucesso')
      })
  })

  it('/POST - Realizar login com tipo de email inválido', () => {
    cy.doLogin(
      'email_invalido',
      Cypress.env('PASSWORD')
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email deve ser um email válido')
      })
  })

  it('/POST - Realizar login com email inexistente', () => {
    cy.doLogin(
      'email_nao@existe.com',
      Cypress.env('PASSWORD')
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Email e/ou senha inválidos')
      })
  })

  it('/POST - Realizar login sem preencher o email do usuário', () => {
    cy.doLogin(
      '',
      Cypress.env('PASSWORD')
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email não pode ficar em branco')
      })
  })

  it('/POST - Realizar login com senha inválida', () => {
    cy.doLogin(
      Cypress.env('EMAIL'),
      'senha_invalida'
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED)
        expect(response.body.message).to.eq('Email e/ou senha inválidos')
      })
  })

  it('/POST - Realizar login sem preencher a senha', () => {
    cy.doLogin(
      Cypress.env('EMAIL'),
      ''
    )
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.password).to.eq('password não pode ficar em branco')
      })
  })

  it('/POST - Realizar login sem preencher o email e a senha', () => {
    cy.doLogin('', '')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email não pode ficar em branco')
        expect(response.body.password).to.eq('password não pode ficar em branco')
      })
  })
})
