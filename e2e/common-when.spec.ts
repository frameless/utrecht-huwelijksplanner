import { When as Wanneer } from '@badeball/cypress-cucumber-preprocessor';

Wanneer('ik op de {string} link klik', (text: string) => {
  cy.findByRole('link', { name: text }).click();
});
