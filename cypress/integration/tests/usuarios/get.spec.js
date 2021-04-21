/// <reference types="cypress" />

import dataUsers from '../../../fixtures/usuarios.json'
const httpStatus = require('http-status-codes')

describe('[INTEGRATION] :: Testes de API para o ServRest - Usuários', () => {
  let qtd;

  it('/GET - Listar todos os usuários cadastrados', () => {
    cy.consultUser()
      .then((response) => {
        qtd = response.body.quantidade
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(qtd)
      });
  });

  it('/GET - Listar usuários cadastrados pelo nome', () => {
    cy.consultUser(dataUsers.nome)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.usuarios[0].nome).to.deep.eq(dataUsers.nome)
      });
  });

  it('/GET - Listar usuários cadastrados pelo email', () => {
    cy.consultUser({}, dataUsers.email)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.usuarios[0].email).to.deep.eq(dataUsers.email)
      });
  });

  it('/GET - Listar usuários cadastrados pelo _id', () => {
    cy.consultUser({}, {}, dataUsers._id)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.usuarios[0]._id).to.deep.eq(dataUsers._id)
      });
  });

  it('/GET - Listar usuários com uma busca correta de: nome válido e email válido', () => {
    cy.consultUser(dataUsers.nome, dataUsers.email)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.usuarios[0].nome).to.deep.eq(dataUsers.nome)
        expect(response.body.usuarios[0].email).to.deep.eq(dataUsers.email)
      });
  });

  it('/GET - Listar usuários com uma busca incorreta de: nome válido e email inválido', () => {
    cy.consultUser(dataUsers.nome, 'email@incorreto.com')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      });
  });

  it('/GET - Listar usuários com uma busca incorreta de: nome inválido e email válido', () => {
    cy.consultUser('Nome Incorreto', dataUsers.email)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      });
  });

  it('/GET - Listar usuários com uma busca incorreta de: nome sem parâmetro e email válido', () => {
    cy.consultUser('', dataUsers.email)
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.OK)
        expect(response.body.quantidade).to.eq(0)
      });
  });

  it('/GET - Listar usuários com uma busca incorreta de: nome e email sem parâmetro', () => {
    cy.consultUser('', '')
      .then((response) => {
        expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
        expect(response.body.email).to.eq('email deve ser uma string')
      });
  });
});
