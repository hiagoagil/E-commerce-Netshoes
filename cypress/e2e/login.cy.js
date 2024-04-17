import { faker as fakerJs } from '@faker-js/faker';
import fakerBr from 'faker-br';



describe('Cadastro de usuário', () => {
  
  const cadastro = {
    nome: fakerJs.person.firstName(),
    sobrenome: fakerJs.person.lastName(),
    email: `${fakerJs.string.alpha(7)}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`,
    senha: fakerJs.internet.password({ length: 10 }),
    dia: fakerJs.string.numeric({ min: 1, max: 31 }),
    mes: fakerJs.date.month(),
    ano: fakerJs.string.numeric({ min: 1903, max: 2024 }),
    rua: fakerJs.location.street(),
    
  }
  



  it('Realizando cadastro', () => {
    const cpf = fakerBr.br.cpf();

    cy.visit('auth/login')
    cy.get('#email').type(cadastro.email)
    cy.get(':nth-child(2) > .column > .form-group > [data-testid="submitButton"]').click()
    cy.get('#name').type(cadastro.nome)
    cy.get('#lastName').type(cadastro.sobrenome)
    cy.get(':nth-child(1) > .radio > .radio__label').click()
    cy.get(':nth-child(2) > .radio > .radio__label').click()
    cy.get('#dayOfBirth').select('20')
    cy.get('#monthOfBirth').select('Setembro')
    cy.get('#yearOfBirth').select('1995')
    cy.get('#cpf').type(cpf)
    cy.get('#homePhone').type('61986213252')
    cy.get('#zipCode').type('77720000')
    cy.get('#streetType').select('Avenida')
    cy.get('#streetName').type(cadastro.rua)
    cy.get('#streetNumber').type(cadastro.dia)
    cy.get('#streetType').select('Avenida')
    cy.get('#neighborhood').type('Centro')
    cy.get('#password').type(cadastro.senha)
    cy.get('#emailNewsletter').uncheck()
    cy.get(':nth-child(7) > .column > .checkbox > .checkbox__label > .checkbox__input').check()
    cy.get('[qa-auto="gift-wrapping-select-button"]').click()
    cy.get('[data-testid="actionEmailButton"]').click()
    cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
      sentTo: cadastro.email
    }).then(message => {
      const confirmationCode = message.html.codes[0].value
      cy.get(':nth-child(1) > .otp-input').type(confirmationCode)
    })
    
    
  })
})