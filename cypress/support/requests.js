// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/// <reference types="cypress" />

import credentials from './credentials'

Cypress.Commands.add('doLogin', (email, pass) => {
  cy.request({
    method: 'POST',
    url: '/login',
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      email: email,
      password: pass
    }
  })
})

Cypress.Commands.add('consultUser', (name, email, id) => {
  cy.request({
    method: 'GET',
    url: '/usuarios',
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    qs: {
      nome: name,
      email: email,
      _id: id
    }
  })
})

Cypress.Commands.add('modifyUser', (_id, name, nameChange) => {
  cy.request({
    method: 'PUT',
    url: `/usuarios/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      nome: `${name} ${nameChange}`
    }
  })
})

Cypress.Commands.add('deleteUser', (_id) => {
  cy.request({
    method: 'DELETE',
    url: `/usuarios/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
  })
})