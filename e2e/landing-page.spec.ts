import { Then as Dan } from '@badeball/cypress-cucumber-preprocessor';

Dan('zie ik een lijst met verwachte stappen voor al de trouwopties', () => {
  cy.get('@heading').parent().findByRole('list').should('be.visible');
});
