import { faker as fakerJs } from '@faker-js/faker';
import fakerBr from 'faker-br';

Cypress.Commands.add('generateUserData', () => {
  return {
    nome: fakerJs.name.firstName(),
    sobrenome: fakerJs.name.lastName(),
    email: `${fakerJs.random.alphaNumeric(7)}@${Cypress.env('MAILOSAUR_SERVER_ID')}.mailosaur.net`,
    senha: fakerJs.internet.password({ length: 10 }),
    dia: fakerJs.number.bigInt({ min: 10, max: 31 }).toString(),
    ano: fakerJs.date.birthdate({ min: 1903, max: 2002,  mode: 'year'}).getFullYear().toString(),
    cpf: fakerBr.br.cpf(),
    rua: fakerJs.location.street(),
    numero: fakerJs.number.bigInt({ min: 10, max: 31 }),
    telefone: fakerJs.phone.imei(),
  };
});

Cypress.Commands.add('fillRegistrationForm', (userData) => {
  cy.intercept('GET', '**/auth/register/zipcode/44444444/address').as("zipGet")
  cy.get('#name').type(userData.nome);
  cy.get('#lastName').type(userData.sobrenome);
  cy.get('label[for="male"]').click();
  cy.get('#dayOfBirth').select(userData.dia);
  cy.get('#monthOfBirth').select('Abril');
  cy.get('#yearOfBirth').select(userData.ano);
  cy.get('#cpf').type(userData.cpf);
  cy.get('#homePhone').type(userData.telefone);
  cy.get('#zipCode').type('44444444');
  cy.wait('@zipGet')
  cy.get('#streetNumber').type(userData.numero.toString());
  cy.get('#password').type(userData.senha);
  cy.get(':nth-child(7) > .column > .checkbox > .checkbox__label > .checkbox__input').check();
});

Cypress.Commands.add('registerUser', (userData) => {
  cy.visit('auth/login');
  cy.wait('@GetList')
  cy.wait('@POSTcollect')
  cy.wait('@PostReload')
  cy.get('#email').type(userData.email);
  cy.get(':nth-child(2) > .column > .form-group > [data-testid="submitButton"]').click();
  // cy.get('.bGGcZJZR7IsEsQjTbspD-html-close-button').click()
  cy.fillRegistrationForm(userData);
  cy.get('button[qa-auto="gift-wrapping-select-button"]').click();  
  cy.get('[data-testid="actionEmailButton"]').click()
  cy.wait('@PostReload')
});

Cypress.Commands.add('enterConfirmationCode', (email) => {
  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), { sentTo: email }).then((message) => {
    const [confirmationCode00, confirmationCode01] = message.html.codes.map(code => code.value);
    cy.get(':nth-child(1) > .otp-input').type(confirmationCode00);
    cy.get(':nth-child(4) > .otp-input').type(confirmationCode01);
  });
});

Cypress.Commands.add('Interceptation', () => {
  cy.intercept('POST', 'https://www.google.com/recaptcha/api2/reload?**').as('PostReload')
  cy.intercept('POST', 'https://www.google-analytics.com/j/collect?**').as('POSTcollect')
  cy.intercept('GET', 'https://static.netshoes.com.br/ff-webstore-web-analytics/4.0.4/wasm/release.wasm').as("GetList")
  cy.intercept("POST", "https://api.pn.vg/api/v1/pushonsite/**").as("registrationRequest");
  cy.intercept('POST', 'https://apm.netshoes.com.br/intake/v2/rum/events', {
    prevent: true 
  });
})