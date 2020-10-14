const alertText = 'Usuario y/o password no válidos';
const helperText = 'Debe informar el campo';

describe('login test', () => {
  it('should visit the login page', () => {
    cy.visit('/');
  });
  it('name input should have focus when clicked', () => {
    cy.get('input[name = "user"]').as('userInput');
    cy.visit('/');
    cy.get('@userInput').click();
    cy.get('@userInput').should('have.focus');
  });
  it('password input should have focus when clicked', () => {
    cy.get('input[name = "password"]').as('passwordInput');
    cy.visit('/');
    cy.get('@passwordInput').click();
    cy.get('@passwordInput').should('have.focus');
  });
  it('should show an alert error message when incorrect credentials are supplied', () => {
    cy.get('input[name = "user"]').as('userInput');
    cy.get('input[name = "password"]').as('passwordInput');
    const user = 'test';
    const password = 'incorrect';
    cy.visit('/');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();
    cy.findByText(alertText).should('be.visible');
  });
  it('should show helper text on the input when credentials are not supplied for user', () => {
    cy.get('input[name = "user"]').as('userInput');
    cy.get('input[name = "password"]').as('passwordInput');
    const user = 'admin';
    cy.visit('/');
    cy.get('@userInput').type(user);
    cy.findByRole('button').click();
    cy.findByText(helperText).should('be.visible');
  });
  it('should show helper text on the input when credentials are not supplied for password', () => {
    cy.get('input[name = "user"]').as('userInput');
    cy.get('input[name = "password"]').as('passwordInput');
    const password = 'test';
    cy.visit('/');
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();
    cy.findByText(helperText).should('be.visible');
  });
  it('should navigate to next url when credentials are correct', () => {
    cy.get('input[name = "user"]').as('userInput');
    cy.get('input[name = "password"]').as('passwordInput');
    const user = 'admin';
    const password = 'test';
    cy.visit('/');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();
    cy.url().should('eq', 'http://localhost:8080/#/submodule-list');
  });
});
