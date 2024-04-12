describe('Cadastro de usuário', () => {
  beforeEach(() => {
    cy.Interceptation()
  });
  it('Realizando cadastro', () => {
    cy.generateUserData().then((userData) => {
      cy.registerUser(userData);
      cy.enterConfirmationCode(userData.email);
      cy.get('.status__title').invoke('text').then((text) => {
        const textoSemEspacos = text.trim();
        expect(textoSemEspacos).to.eq('Sua conta foi cadastrada!');
      });
    });
  });
});
