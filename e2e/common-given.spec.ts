import { Given as Gegeven } from '@badeball/cypress-cucumber-preprocessor';

Gegeven('dat ik op de {string} pagina ben', (path: string) => {
  if (path === 'utrecht huwelijksplanner') {
    cy.visit('/');
  } else {
    cy.visit(path);
  }
});
