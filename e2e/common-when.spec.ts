import { When as Wanneer } from '@badeball/cypress-cucumber-preprocessor';

Wanneer('ik op de {string} link klik', (text: string) => {
  cy.findByRole('link', { name: text }).click();
});

Wanneer('ik op de externe {string} link klik', (text: string) => {
  cy.findByRole('link', { name: text }).invoke('attr', 'href').as('clicked-external-link');
});

Wanneer('ik op de {string} button klik', (text: string) => {
  cy.findByRole('button', { name: text }).click();
});

Wanneer('ik op de {string} datum prikker klik', (text: string) => {
  cy.findByLabelText(text).click();
});
