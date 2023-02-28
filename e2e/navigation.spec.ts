import { Given as Gegeven, Then as Dan } from '@badeball/cypress-cucumber-preprocessor';

Gegeven('dat ik een broodkruimel menu zie', () => {
  cy.findByRole('navigation', { name: 'Kruimelpad' }).should('have.class', 'utrecht-breadcrumb');
});

Dan('word ik naar de homepagina van de gemeente Utrecht gestuurd', () => {
  cy.intercept('https://utrecht.nl/', 'success').as('homepage');
  cy.wait('@homepage').should('have.been.calledOnce');
});
