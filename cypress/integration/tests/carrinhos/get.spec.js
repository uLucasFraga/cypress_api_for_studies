/// <reference types="cypress" />

// GET - CARRINHOS//

import dataCars from '../../../fixtures/carrinhos.json'
const httpStatus = require('http-status-codes')

describe('[INTEGRATION] :: Listar Carrinhos', () => {
    let qtd
    let totalPrice
    let totalQtd

    it('/GET - Listar todos os carrinhos cadastrados', () => {
        cy.consultCars()
            .then((response) => {
                qtd = response.body.quantidade
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.quantidade).to.eq(qtd)
            })
    })

    it('/GET - Listar carrinhos cadastrados pelo _id', () => {
        cy.consultCarsById(dataCars.carrinhos[0]._id)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.idUsuario).to.eq(dataCars.carrinhos[0].idUsuario)
            })
    })

    it('/GET - Listar carrinhos cadastrados pelo id do usuário', () => {
        cy.consultCars({}, {}, dataCars.carrinhos[0].idUsuario)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.carrinhos[0]._id).to.eq(dataCars.carrinhos[0]._id)
            })
    })

    it('/GET - Listar carrinhos cadastrados pelo preço total', () => {
        cy.consultCars(dataCars.carrinhos[0].precoTotal, {}, {})
            .then((response) => {
                totalPrice = response.body.carrinhos[0].precoTotal
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.carrinhos[0].precoTotal).to.eq(totalPrice)
            })
    })

    it('/GET - Listar carrinhos cadastrados pela quantidade total', () => {
        cy.consultCars({}, dataCars.carrinhos[0].quantidadeTotal)
            .then((response) => {
                totalQtd = response.body.carrinhos[0].quantidadeTotal
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.carrinhos[0].quantidadeTotal).to.eq(totalQtd)
            })
    })
})