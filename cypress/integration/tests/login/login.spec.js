/// <reference types="cypress" />

import credentials from '../../../support/session'
const httpStatus = require("http-status-codes");

describe("[INTEGRATION] :: Testes de API para o ServRest - Login", () => {
    let token;

    it("/POST - Realizar login com sucesso", () => {
        cy.doLogin(Cypress.env('email'), Cypress.env('password'))
            .then((response) => {
                token = response.body.authorization;
                expect(response.status).to.eq(httpStatus.StatusCodes.OK);
                expect(response.body.message).to.eq('Login realizado com sucesso');
                expect(response.body.authorization).to.eq(token);
            });
    });

    it("/POST - Realizar login com tipo de email inválido", () => {
        cy.doLogin('email_invalido', Cypress.env('password'))
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.email).to.eq('email deve ser um email válido');
            });
    });

    it("/POST - Realizar login com email inexistente", () => {
        cy.doLogin('email_nao@existe.com', Cypress.env('password'))
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED);
                expect(response.body.message).to.eq('Email e/ou senha inválidos');
            });
    });

    it("/POST - Realizar login sem preencher o email do usuário", () => {
        cy.doLogin('', Cypress.env('password'))
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.email).to.eq('email não pode ficar em branco');
            });
    });


    it("/POST - Realizar login com senha inválida", () => {
        cy.doLogin(Cypress.env('email'), 'senha_invalida')
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED);
                expect(response.body.message).to.eq('Email e/ou senha inválidos');
            });
    });

    it("/POST - Realizar login sem preencher a senha", () => {
        cy.doLogin(Cypress.env('email'), '')
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.password).to.eq('password não pode ficar em branco');
            });
    });

    it("/POST - Realizar login sem preencher o email e a senha", () => {
        cy.doLogin('', '')
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.email).to.eq('email não pode ficar em branco');
                expect(response.body.password).to.eq('password não pode ficar em branco');
            });
    });
});
