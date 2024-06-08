/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', function() {

    this.beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it('Deve validar o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 

    it('Deve enviar um formulário com sucesso', function() {
        const dados = {
            nome: 'Igor',
            sobrenome: 'de Andrade',
            email: "teste@gmail.com",
            comentario: "Aulas muito produtivas!"
        }
        cy.clock()

        cy.preencherCamposObrigatorios(dados)
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible').and('contains.text', 'Mensagem enviada com sucesso.')
        
        // Validar que a mensagem some após 3 segundos
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })

    it('Deve verififcar se a mensagem de erro é emitida ao informar um e-mail inválido', function() {
        const dados = {
            nome: 'Igor',
            sobrenome: 'de Andrade',
            email: "teste@gmail,com",
            comentario: "Aulas muito produtivas!"
        }
        cy.preencherCamposObrigatorios(dados)
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible').should('contains.text', 'Valide os campos obrigatórios!')
    })

    it('Deve verificar se a mensagem de erro está sendo exibida ao marcar telefone como '
    + 'contato principal e não preenche-lo', function() {
        const dados = {
            nome: 'Igor',
            sobrenome: 'de Andrade',
            email: "teste@gmail,com",
            comentario: "Aulas muito produtivas!"
        }
        cy.preencherCamposObrigatorios(dados)
        cy.get('#phone-checkbox').check()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible').should('contains.text', 'Valide os campos obrigatórios!')
    })

    it('Deve verififcar se o campo telefone não está permitindo inserir caracteres não-numéricos', function() {
        cy.get('#phone').type('abc123abc45').should('have.value', '12345')
    })

    it('Deve emitir a mensagem de erro ao clicar em enviar sem preencher nenhum campo obrigatório', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible').should('contains.text', 'Valide os campos obrigatórios!')
    })

    it('Deve marcar todos os tipos de feedback', function() {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function(radio) {
            cy.wrap(radio).check()
            cy.wrap(radio).should('be.checked')
        })
    })

    it('Deve efetuar o upload de um arquivo', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Deve efetuar o upload de um arquivo usando o drag-and-drop', function() {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function(input) {
            expect(input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Deve verificar que a política de privacidade abre em outra aba do navegador', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    
    it('Deve acessar a página de política de privacidade removendo '
        + 'a funcionalidade de abrir em outra aba', function() {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })

    it('Deve efetuar uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                const {status, statusText, body} = response
                expect(status).to.equal(200)
                expect(statusText).to.equal('OK')
                expect(body).to.include('CAC TAT')
            })
    })
    
})