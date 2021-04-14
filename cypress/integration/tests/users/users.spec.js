/// <reference types="cypress" />

const httpStatus = require("http-status-codes");

describe("[INTEGRATION] :: Testes de API para o ServRest - Usuários", () => {
    let qtd;

    it("/GET - Listar usuários cadastrados", () => {
        cy.consultUser()
            .then((response) => {
                qtd = response.body.quantidade;
                expect(response.status).to.eq(httpStatus.StatusCodes.OK);
                expect(response.body.quantidade).to.eq(qtd);
            });
    });
});
