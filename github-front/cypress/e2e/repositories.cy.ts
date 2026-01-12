describe('Repositories API (Cypress)', () => {

  it('Should check if the server is running', () => {
    cy.request('http://localhost:3000').should((response) => {
      expect(response.status).to.eq(200);
    });
  });
  

  it('GET /repositories - default query', () => {
    cy.request('http://localhost:3000/repositories')
      .then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.have.property('total_count');
        expect(response.body.items).to.be.an('array');

        expect(response.body.items[0]).to.have.property('name');
      });
  });

  it('GET /repositories with query params', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:3000/repositories',
      qs: {
        name: 'angular',
        page: 2,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.items).to.be.an('array');
    });
  });

});
