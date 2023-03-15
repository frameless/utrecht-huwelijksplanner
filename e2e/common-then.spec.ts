import { Then as Dan } from '@badeball/cypress-cucumber-preprocessor';

Dan('zie ik de heading {string}', (text: string) => {
  cy.findByRole('heading', { name: text }).as('heading').should('be.visible');
  //expect(cy.findByRole('heading', { name: headingtitle })).to.be.visible();
});

Dan('zie ik een {string} infobox', (heading: string) => {
  cy.findByRole('heading', { name: heading })
    .parent()
    .should('match', 'aside')
    .and('have.class', 'utrecht-spotlight-section')
    .and('have.class', 'utrecht-spotlight-section--info');
});

Dan('zie ik een {string} button die zich gedraagd als link', (text: string) => {
  cy.findByRole('link', { name: text })
    .should('have.class', 'utrecht-button-link')
    .and('have.class', 'utrecht-button-link--primary-action');
});

Dan('zie ik een {string} button', (text: string) => {
  cy.findByRole('button', { name: text }).should('have.class', 'utrecht-button');
});

Dan('word ik naar de {string} pagina gestuurd', (path: string) => {
  // console.log(path);
  // cy.url().should('include', path);
  cy.location('pathname').should('include', path);
  //expect(cy.url()).to.include(path);
});

Dan('ben ik op stap {string}', (stepNumber: string) => {
  //cy.findByText(/Stap [0-9] van [0-9]/i).should('include.text', `Stap ${stepNumber}`);
  cy.findByText(new RegExp(`Stap ${stepNumber} van [0-9]+`, 'i')).should('be.visible');
});

Dan('is er een {string} datum prikker op de pagina', (datumType: string) => {
  cy.findByLabelText(datumType).as('datePicker').should('be.visible');
  // cy.get('@datePicker').its('type').should('equal', 'date');

  cy.get('@datePicker').should(`have.attr`, `type`, `date`);

  // cy.get('@datePicker').invoke('attr', 'type').should('equal', 'date');
});

Dan('kan ik de beschikbare trouwdatums zien', () => {
  cy.log('TODO FIXME: DIT KUNNEN WE TESTEN ALS DE CUSTOM DATUM PRIKKER HEBBEN/ZIEN');
});

//!!!Empty tests written just so Cypress doesn't complain
Dan('ik zie tijdslot checkbox opties voor trouwen op de geselecteerde dag', () => {
  cy.get('time').should('be.visible');
  // cy.get('[data-test-id="test-example"]').should('have.length', 6) <- for reference
});

//line 26 right line 105 left I should be sent to the right webpage voorgenomen-huwelijk
