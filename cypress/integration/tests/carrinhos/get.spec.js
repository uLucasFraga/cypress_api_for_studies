/// <reference types="cypress" />

// GET - CARRINHOS//

import faker from 'faker'
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

    it('/GET - Listar carrinhos cadastrados por um _id inválido', () => {
        cy.consultCarsById(faker.random.alphaNumeric(10))
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.message).to.eq('Carrinho não encontrado')
            })
    })

    it('/GET - Listar carrinhos cadastrados pelo id do usuário', () => {
        cy.consultCars({}, {}, dataCars.carrinhos[0].idUsuario)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.carrinhos[0]._id).to.eq(dataCars.carrinhos[0]._id)
            })
    })

    it('/GET - Listar carrinhos cadastrados pelo id do usuário inválido', () => {
        cy.consultCars({}, {}, faker.random.alphaNumeric(10))
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.quantidade).to.eq(0)
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

    it('/GET - Listar carrinhos cadastrados pelo preço total inválido', () => {
        cy.consultCars(faker.commerce.price(1000), {}, {})
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.quantidade).to.eq(0)
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

    it('/GET - Listar carrinhos cadastrados pela quantidade total inválido', () => {
        cy.consultCars({}, faker.datatype.number(100))
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.quantidade).to.eq(0)
            })
    })

    it('/GET - Listar carrinhos com uma busca correta de: id do usuário e preço total válido', () => {
        cy.consultCars(dataCars.carrinhos[0].precoTotal, {}, dataCars.carrinhos[0].idUsuario)
            .then((response) => {
                totalPrice = response.body.carrinhos[0].precoTotal
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.carrinhos[0].precoTotal).to.eq(totalPrice)
                expect(response.body.carrinhos[0].idUsuario).to.eq(dataCars.carrinhos[0].idUsuario)
            })
    })

    it('/GET - Listar carrinhos com uma busca correta de: id do usuário e quantidade total válida', () => {
        cy.consultCars({}, dataCars.carrinhos[0].quantidadeTotal, dataCars.carrinhos[0].idUsuario)
            .then((response) => {
                totalQtd = response.body.carrinhos[0].quantidadeTotal
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.carrinhos[0].quantidadeTotal).to.eq(totalQtd)
                expect(response.body.carrinhos[0].idUsuario).to.eq(dataCars.carrinhos[0].idUsuario)
            })
    })

    it('/GET - Listar carrinhos com uma busca incorreta de: id do usuário válido e preço total inválido', () => {
        cy.consultCars(dataCars.carrinhos[1].precoTotal, {}, dataCars.carrinhos[0].idUsuario)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.quantidade).to.eq(0)
            })
    })

    it('/GET - Listar carrinhos com uma busca incorreta de: id do usuário válido e quantidade total inválida', () => {
        cy.consultCars({}, dataCars.carrinhos[1].quantidadeTotal, {}, dataCars.carrinhos[0].idUsuario)
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.OK)
                expect(response.body.quantidade).to.eq(0)
            })
    })

    it('/GET - Listar carrinhos com uma busca inválida', () => {
        cy.consultCars(faker.random.alpha(5), faker.random.alpha(5))
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.precoTotal).to.eq('precoTotal deve ser um número')
                expect(response.body.quantidadeTotal).to.eq('quantidadeTotal deve ser um número')
            })
    })

    it('/GET - Listar carrinhos com uma busca em branco', () => {
        cy.consultCars('', '')
            .then((response) => {
                expect(response.status).to.eq(httpStatus.StatusCodes.BAD_REQUEST)
                expect(response.body.precoTotal).to.eq('precoTotal deve ser um número positivo')
                expect(response.body.quantidadeTotal).to.eq('quantidadeTotal deve ser um número positivo')
            })
    })
})