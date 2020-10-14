const logoutText = 'Cerrar sesión';

describe('logout test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[name = "user"]').as('userInput');
    cy.get('input[name = "password"]').as('passwordInput');
    const user = 'admin';
    const password = 'test';
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();
  });
  it('should visit the submodule-list page', () => {
    cy.visit('/submodule-list');
  });
  it('should visit the submodule-list page', () => {
    cy.findByTestId('profileMenu').click();
    cy.findByText(logoutText).click();
    cy.url().should('eq', 'http://localhost:8080/#/login');
  });
});
