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

Cypress.Commands.add('consultUser', (name, email, _id) => {
  cy.request({
    method: 'GET',
    url: '/usuarios',
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    qs: {
      nome: name,
      email: email,
      _id: _id
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

Cypress.Commands.add('modifyUser', (_id, newName, newEmail, newPass) => {
  cy.request({
    method: 'PUT',
    url: `/usuarios/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    body: {
      nome: newName,
      email: newEmail,
      password: newPass,
      administrador: 'true'
    }
  });
});

Cypress.Commands.add('deleteUser', (_id) => {
  cy.request({
    method: 'DELETE',
    url: `/usuarios/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false
  });
});
