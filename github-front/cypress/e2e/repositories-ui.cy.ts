describe('Github Project e2e Tests (UI)', () => {

  it('Should search repositories', () => {
    cy.visit('http://localhost:4200');

    cy.get('input[name="search"]').type('angular{enter}');


    cy.contains('angular');
    cy.contains('angular.js');
  });

  it('Should show error when searching with no parameters', () => {
    cy.visit('http://localhost:4200');

    cy.get('input[name="search"]').type('{enter}');

    cy.contains('Erro interno no servidor');

  });

  it('Should go next page', () => {
    cy.visit('http://localhost:4200');
    cy.get('button[name="next-button"]').click();
    cy.get('span[name="page_number"]').should('have.text', '2');
  });

  it('Should check if the next button is disabled on last page', () => {
    cy.visit('http://localhost:4200');
    cy.get('button[name="last-button"]').click();
    cy.get('button[name="next-button"]').should('be.disabled');
  });

  it('Should check if first button is disabled on first page', () => {
    cy.visit('http://localhost:4200');
    cy.get('button[name="first-button"]').should('be.disabled');
  });

  it('Should check if prev button is disabled on first page', () => {
    cy.visit('http://localhost:4200');
    cy.get('button[name="prev-button"]').should('be.disabled');
  });

  it('Should go to last page', () => {
  cy.visit('http://localhost:4200');

  cy.get('button[name="last-button"]').click();

  cy.get('span[name="page_number"]')
    .invoke('text')
    .then(text => {
      const page = Number(text.trim());
      expect(page).to.be.greaterThan(1);
    });
});

it('Should go to first page', () => {
  cy.visit('http://localhost:4200');

  cy.get('button[name="next-button"]').click();
  cy.get('span[name="page_number"]').should('have.text', '2');
  cy.get('button[name="next-button"]').click();
  cy.get('span[name="page_number"]').should('have.text', '3');
  cy.get('button[name="first-button"]').click();

  cy.get('span[name="page_number"]')
    .invoke('text')
    .then(text => {
      const page = Number(text.trim());
      expect(page).to.be.equal(1);
    });
});

it('Should show loading while fetching repositories', () => {
  cy.intercept('GET', 'http://localhost:3000/repositories*', (req) => {
    req.on('response', (res) => {
      res.setDelay(1000);
    });
  }).as('getRepos');

  cy.visit('http://localhost:4200');

  cy.get('input[name="search"]').type('angular{enter}');

  cy.get('.loading-container').should('be.visible');
  cy.contains('Buscando repositórios...').should('be.visible');

  cy.wait('@getRepos');

  cy.get('.loading-container').should('not.exist');
});


});