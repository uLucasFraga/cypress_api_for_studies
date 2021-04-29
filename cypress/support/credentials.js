/// <reference types="cypress" />

const httpStatus = require('http-status-codes')

const credentials = {
  HEADERS: {
    'Content-type': 'application/json'
  }
}

Cypress.Commands.add('getTokenDefaultUser', () => {
  cy.doLogin(Cypress.env('EMAIL'), Cypress.env('PASSWORD'))
    .then(response => {
      localStorage.setItem('token', response.body.authorization)
      expect(response.status).to.eq(httpStatus.StatusCodes.OK)
      expect(localStorage.getItem('token')).not.null // eslint-disable-line
      cy.log(localStorage.getItem('token'))
    })
})

Cypress.Commands.add('getTokenRandomUser', (email, pass) => {
  cy.doLogin(email, pass)
    .then(response => {
      localStorage.setItem('token', response.body.authorization)
      expect(response.status).to.eq(httpStatus.StatusCodes.OK)
      expect(localStorage.getItem('token')).not.null // eslint-disable-line
      cy.log(localStorage.getItem('token'))
    })
})

Cypress.Commands.add('clearSession', () => {
  localStorage.removeItem('token')
})

export default credentials
