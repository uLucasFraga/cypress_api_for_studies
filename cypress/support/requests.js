/// <reference types="cypress" />

import credentials from './credentials'

Cypress.Commands.add('doLogin', (email, pass) => {
  cy.log('Loggin in to servrest')
  cy.request({
    method: 'POST',
    url: '/login',
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      email: email,
      password: pass
    }
  });
});

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
  });
});

Cypress.Commands.add('registerUser', (name, email, password, admin = true) => {
  cy.request({
    method: 'POST',
    url: '/usuarios',
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      nome: name,
      email: email,
      password: password,
      administrador: admin
    }
  });
});

Cypress.Commands.add('modifyUser', (id, name, nameChange) => {
  cy.request({
    method: 'PUT',
    url: `/usuarios/${id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      nome: `${name} ${nameChange}`
    }
  });
});

Cypress.Commands.add('deleteUser', (id) => {
  cy.request({
    method: 'DELETE',
    url: `/usuarios/${id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false
  });
});
