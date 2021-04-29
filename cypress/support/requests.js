/// <reference types="cypress" />

import credentials from './credentials'

// COMMANDS - LOGIN //

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

// COMMANDS - USUÁRIOS //

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
  })
})

Cypress.Commands.add('registerUser', (name, email, password, admin) => {
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
  })
})

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
  })
})

Cypress.Commands.add('deleteUser', (_id) => {
  cy.request({
    method: 'DELETE',
    url: `/usuarios/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false
  })
})

// COMMANDS - PRODUTOS //

Cypress.Commands.add('consultProduct', (_id, name, description) => {
  cy.request({
    method: 'GET',
    url: '/produtos',
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    qs: {
      _id: _id,
      nome: name,
      descricao: description
    }
  })
})

Cypress.Commands.add('consultProductById', (_id) => {
  cy.request({
    method: 'GET',
    url: `/produtos/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('registerProduct', (name, price, description, qtd) => {
  cy.request({
    method: 'POST',
    url: '/produtos',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false,
    body: {
      nome: name,
      preco: price,
      descricao: description,
      quantidade: qtd
    }
  })
})

Cypress.Commands.add('modifyProduct', (_id, newName, newPrice, newDescription, newQtd) => {
  cy.request({
    method: 'PUT',
    url: `/produtos/${_id}`,
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false,
    body: {
      nome: newName,
      preco: newPrice,
      descricao: newDescription,
      quantidade: newQtd
    }
  })
})

Cypress.Commands.add('deleteProduct', (_id) => {
  cy.request({
    method: 'DELETE',
    url: `/produtos/${_id}`,
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false
  })
})

// COMMANDS - CARRINHOS //

Cypress.Commands.add('consultCarById', (_id) => {
  cy.request({
    method: 'GET',
    url: `/carrinhos/${_id}`,
    headers: credentials.HEADERS,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('consultCar', (totalPrice, totalQtd, idUser) => {
  cy.request({
    method: 'GET',
    url: '/carrinhos',
    headers: credentials.HEADERS,
    failOnStatusCode: false,
    qs: {
      precoTotal: totalPrice,
      quantidadeTotal: totalQtd,
      idUsuario: idUser
    }
  })
})

Cypress.Commands.add('registerCar', (idProduct, qtd) => {
  cy.request({
    method: 'POST',
    url: '/carrinhos',
    headers: {
      Authorization: localStorage.getItem('token')
    },
    failOnStatusCode: false,
    body: {
      produtos: [
        {
          idProduto: idProduct,
          quantidade: qtd
        }
      ]
    }
  })
})

// COMMANDS - ANOTHERS //

Cypress.Commands.add('registerUserWithLogin', (name, email, pass) => {
  cy.registerUser(
    name,
    email,
    pass,
    "true"
  )
    .then((response) => {
      expect(response.body.message).to.eq('Cadastro realizado com sucesso')
    })

  cy.getTokenRandomUser(email, pass)
})
