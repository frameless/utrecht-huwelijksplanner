import { Then as Dan } from '@badeball/cypress-cucumber-preprocessor';

Dan('zie ik de heading {string}', (text: string) => {
  cy.findByRole('heading', { name: text }).as('heading').should('be.visible');
  //expect(cy.findByRole('heading', { name: headingtitle })).to.be.visible();
});

Dan('ben ik op stap {string}', (stepNumber: string) => {
  //cy.findByText(/Stap [0-9] van [0-9]/i).should('include.text', `Stap ${stepNumber}`);
  cy.findByText(new RegExp(`Stap ${stepNumber} van [0-9]+`, 'i')).should('be.visible');
});

Dan('zie ik een {string} button', (text: string) => {
  cy.findByRole('button', { name: text }).should('have.class', 'utrecht-button');
});

Dan('word ik naar de {string} pagina gestuurd', (path: string) => {
  // console.log(cy.location('pathname'));
  // console.log(path);
  // cy.url().should('include', path);

  if (path === 'trouw-opties/huwelijk') {
    // cy.log(`TODO, FIXME: De bug zorgt dat we niet kan werken https://github.com/frameless/utrecht-huwelijksplanner/issues/147`);
    throw new Error(
      'TODO, FIXME: De bug zorgt dat we niet kan werken https://github.com/frameless/utrecht-huwelijksplanner/issues/147',
    );
  } else {
    cy.log(path);
    cy.location('pathname').should('include', path);
  }
  //expect(cy.url()).to.include(path);
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

Dan('zie ik tijdslot checkbox opties voor trouwen op de geselecteerde dag', () => {
  cy.get('time').should('be.visible');
  // cy.get('[data-test-id="test-example"]').should('have.length', 6) <- for reference
});

// Dan('de tijdslot checkbox wordt geselecteerd', () => {
//   if (cy.get('[type="radio"]').first().check()) {
//     return true;
//     cy.get('@datePicker').should(`have.attr`, `type`, `date`);
//   }
//   cy.should('be.true');
//   // radio value true? should be visible??
//   // return 'pending';
//   // cy.pause();
//REPLACEMENT SEE BELOW
// });

Dan('de tijdslot checkbox wordt geselecteerd', () => {
  cy.get('[type="radio"]').first().as('first-radio-button');

  cy.get('@first-radio-button').should('be.checked');
});

Dan(
  'zie ik het correcte {string} huwelijk met de vroeger geselecteerde {string} en {string} combinatie',
  (typeHuwelijk: string, datum: string, tijd: string) => {
    cy.log('TODO', datum, tijd, typeHuwelijk);

    cy.get('.utrecht-spotlight-section > :nth-child(1)').contains(typeHuwelijk);

    // .should('contain', typeHuwelijk);

    // datum is written like yyyy-mm-dd, but we want to look for
    // day month year
    // cy.get('.utrecht-spotlight-section > :nth-child(2)').contains(datum);

    // cy.get('[datetime]').contains(datum);
    // <time datetime="">2021-04-14</time>

    // get an element that has a datetime attribute
    // and then check it has a datetime attribute
    // with the value '2021-04-14'
    // cy.get('[datetime]').should(`have.attr`, `datetime`, datum);

    // get an element with a datetime attribute
    // whose value starts with '2021-04-14'
    cy.get(`[datetime^=${datum}]`).should('be.true');
  },
);

//
// Extra tests voor commented Scenarios
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

Dan('kan ik geen datum selecteren', () => {
  cy.log('TODO');
});

Dan('ik krijg een melding om een datum tussen een jaar te selecteren', () => {
  cy.log('TODO');
});
