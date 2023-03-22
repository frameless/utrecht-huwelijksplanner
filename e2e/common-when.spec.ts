import { When as Wanneer } from '@badeball/cypress-cucumber-preprocessor';

Wanneer('ik op de {string} button klik', (text: string) => {
  cy.findByRole('button', { name: text }).click();
});

Wanneer('ik op de {string} datum prikker klik', (text: string) => {
  cy.findByLabelText(text).click();
  cy.log('TODO FIXME: DIT KUNNEN WE TESTEN ALS DE CUSTOM DATUM PRIKKER HEBBEN/ZIEN');
});

Wanneer('ik het {string} datum prikker gefocust heb', (text: string) => {
  cy.findByLabelText(text).focus();
  // cy.focused().click();
  cy.log('TODO FIXME: DIT KUNNEN WE TESTEN ALS DE CUSTOM DATUM PRIKKER HEBBEN/ZIEN');
});

Wanneer('ik een beschikbare {string} heb geselecteerd', (text: string) => {
  cy.findByLabelText(text).type('2021-04-14');
  //This passes because it says Trouwdatum next to the datum prikker
});

Wanneer('ik op de gewenste tijdslot checkbox klik', () => {
  cy.get('[type="radio"]').first().check();
  // return 'pending';
  // cy.pause();
});

//////The button is actually a link but somehow the code below doesn't select it nor click anything
Wanneer('ik op de {string} link klik', (text: string) => {
  cy.log(text);
  // cy.findByRole('link', { name: text }).click();
  cy.get('utrecht-digid-button a').findByText(text).click();
  //cy.findByText(text).click();
});
// //////suggested test from cypress, doesn't work either
// Dan('word ik naar de DigID {string} pagina gestuurd', function (string) {
//   return 'pending';
// });

Wanneer('ik op de externe {string} link klik', (text: string) => {
  cy.findByRole('link', { name: text }).invoke('attr', 'href').as('clicked-external-link');
});

Wanneer('ik probeer een datum over een jaar te selecteren', () => {
  cy.log('TODO');
});
