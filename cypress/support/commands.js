Cypress.Commands.add('preencherCamposObrigatorios', function(dados) {
    cy.get('#firstName').type(dados.nome)
    cy.get('#lastName').type(dados.sobrenome)
    cy.get('#email').type(dados.email)
    cy.get('#open-text-area').type(dados.comentario, {delay:0})
})