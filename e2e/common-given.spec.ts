import { Given as Gegeven } from '@badeball/cypress-cucumber-preprocessor';

Gegeven('dat ik op de {string} pagina ben', (path: string) => {
  if (path === 'utrecht huwelijksplanner') {
    cy.visit('/');
  } else {
    cy.visit(path);
  }
});

Gegeven('ik zie de heading {string}', (headingtitle: string) => {
  cy.findByRole('heading', { name: headingtitle }).should('be.visible');
  expect(cy.findByRole('heading', { name: headingtitle })).to.be.visible();
});

Gegeven('ik ben op stap {string}', (step: string) => {
  //cy.findByRole('paragraph', { name: /Stap 1 van [0-9]/i }).should('be.visible');
  //expect(cy.findByText(/Stap [0-9] van [0-9]/i)).to.be.visible();
  expect(cy.findByText(new RegExp(`Stap ${step} van [0-9]`, 'i'))).to.be.visible();
});
//Playwright equivalent
//const step1 = await page.getByRole('paragraph', { name: /Stap 1 van [0-9]/i });
//expect(step1).toBeDefined();

//!!!Empty tests written just so Cypress doesn't complain
Gegeven('ik heb een beschikbare dag geselecteerd', () => {
  cy.log('TODO');
  //cy.pause();
  //datum prikker selecteren input type date
  //waarde invullen 14/04/2021
});

Gegeven('ik heb een beschikbare tijdslot geselecteerd', () => {
  // cy.log('TODO');
  cy.get('[type="radio"]').first().check();
  // return 'pending';
  // cy.pause();
});

Gegeven('ik kan een {string} button zien', (string) => {
  cy.log('TODO');
  // cy.pause();
  // return 'pending';
});
