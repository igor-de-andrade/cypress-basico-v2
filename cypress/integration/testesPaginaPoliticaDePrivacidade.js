/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() {

    this.beforeEach(function() {
        cy.visit('./src/privacy.html')
    })

    it.only('Deve validar a tela de política de privacidade de forma independente', function() {
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })
})