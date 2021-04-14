/// <reference types="cypress" />

import credentials from '../../../support/credentials'
const httpStatus = require("http-status-codes");

describe("[INTEGRATION] :: Testes de API para o ServRest - Login", () => {
    let token;

    it("/POST - Realizar login com sucesso", () => {
        cy.doLogin(credentials.BODY.email, credentials.BODY.password)
            .then((response) => {
                token = response.body.authorization;
                expect(response.status).to.eq(httpStatus.StatusCodes.OK);
                expect(response.body.message).to.eq('Login realizado com sucesso');
                expect(response.body.authorization).to.eq(token);
            });
    });

    it("/POST - Realizar login com usuário inválido", () => {
        cy.doLogin('usuário_inválido', credentials.BODY.password)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.email).to.eq('email deve ser um email válido');
            });
    });

    it("/POST - Realizar login com usuário inexistente", () => {
        cy.doLogin('nao_existe@qa.com', credentials.BODY.password)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED);
                expect(response.body.message).to.eq('Email e/ou senha inválidos');
            });
    });

    it("/POST - Realizar login sem preencher o usuário", () => {
        cy.doLogin('', credentials.BODY.password)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.email).to.eq('email não pode ficar em branco');
            });
    });

    it("/POST - Realizar login sem preencher o usuário", () => {
        cy.doLogin('', credentials.BODY.password)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.email).to.eq('email não pode ficar em branco');
            });
    });


    it("/POST - Realizar login com senha inválida", () => {
        cy.doLogin(credentials.BODY.email, 'senha_invalida')
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.UNAUTHORIZED);
                expect(response.body.message).to.eq('Email e/ou senha inválidos');
            });
    });

    it("/POST - Realizar login sem preencher a senha", () => {
        cy.doLogin(credentials.BODY.email, '')
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.password).to.eq('password não pode ficar em branco');
            });
    });

    it("/POST - Realizar login sem preencher o usuário e a senha", () => {
        cy.doLogin('', '')
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST);
                expect(response.body.email).to.eq('email não pode ficar em branco');
                expect(response.body.password).to.eq('password não pode ficar em branco');
            });
    });
});
