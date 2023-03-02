import { Then as Dan, Given as Gegeven } from '@badeball/cypress-cucumber-preprocessor';

Gegeven('dat ik een broodkruimel menu zie', () => {
  cy.findByRole('navigation', { name: 'Kruimelpad' }).should('have.class', 'utrecht-breadcrumb');
});

Dan('word ik naar de homepagina van de gemeente Utrecht gestuurd', () => {
  cy.get('@clicked-external-link').should('match', /https?:\/\/utrecht\.nl\/$/);
});
