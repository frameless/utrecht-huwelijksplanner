import { Given as Gegeven } from '@badeball/cypress-cucumber-preprocessor';

Gegeven('dat ik op de {string} pagina ben', (path: string) => {
  if (path === 'utrecht huwelijksplanner') {
    cy.visit('/');
  } else {
    cy.visit(path);
  }
});

//this was giving an error
Gegeven('ik zie de heading {string}', (headingtitle: string) => {
  cy.findByRole('heading', { name: headingtitle }).should('be.visible');
  //cy.findByRole('heading', { name: text }).as('heading').should('be.visible');
  //expect(cy.findByRole('heading', { name: headingtitle })).to.be.visible();
});

// this was giving an error
Gegeven('ik ben op stap {string}', (stepNumber: string) => {
  //cy.findByRole('paragraph', { name: /Stap 1 van [0-9]/i }).should('be.visible');
  //expect(cy.findByText(/Stap [0-9] van [0-9]/i)).to.be.visible();
  //expect(cy.findByText(new RegExp(`Stap ${step} van [0-9]`, 'i'))).to.be.visible();
  cy.findByText(new RegExp(`Stap ${stepNumber} van [0-9]+`, 'i')).should('be.visible');
});
//Playwright equivalent
//const step1 = await page.getByRole('paragraph', { name: /Stap 1 van [0-9]/i });
//expect(step1).toBeDefined();

//!!!Empty tests written just so Cypress doesn't complain
Gegeven('ik heb de {string} geselecteerd', (datum: string) => {
  cy.log('TODO: FIXME: wachten op een datumprikker');
  cy.log(datum);
  //cy.pause();
  //datum prikker selecteren input type date
  //waarde invullen 14/04/2021
});

// Gegeven('ik heb een beschikbare tijdslot geselecteerd', () => {
//   if (cy.get('[type="radio"]').first().check()) {
//     return true;
//   }
//   cy.should('be.true');
//   // radio value true? should be visible??
//   // return 'pending';
//   // cy.pause();
// });

Gegeven(
  'ik heb een beschikbare {string} geselecteerd voor een {string} huwelijk',
  (tijd: string, typeHuwelijk: string) => {
    cy.log(tijd);
    cy.log(typeHuwelijk);

    if (typeHuwelijk === 'Eenvoudig') {
      // look for an element with the text
      // 'Flits/balie-huwelijk — Stadskantoor', save it as @pimplemees
      cy.findByText('Flits/balie-huwelijk — Stadskantoor').as('pimplemees');

      // get the @pimplemees element
      // find it's siblings (two divs containing 2 children each: an input and a label)
      // then look inside those siblings for a label with the "tijd".
      cy.get('@pimplemees')
        .siblings()
        .children()
        .contains(tijd) // finds a label with 'tijd' (12:00 - 12:15)
        .as('timeSlot');

      // then click that label to check the checkbox
      cy.get('@timeSlot').click();
    } else if (typeHuwelijk === 'Uitgebreid') {
      cy.findByText('Flits/balie-huwelijk — Stadskantoor').as('uitgebreid');
      cy.get('@uitgebreid')
        .siblings()
        .children()
        .contains(tijd) // finds a label with 'tijd' (12:00 - 12:15)
        .as('timeSlot');
      cy.get('@timeSlot').click();
    }
  },
);

Gegeven('ik kan een {string} button zien', (text: string) => {
  cy.findByRole('button', { name: text }).should('be.visible');
});

Gegeven('er is een {string} datum prikker op de pagina', (datumType: string) => {
  cy.log('TODO: FIXME: wachten op een datumprikker');
  cy.log(datumType);
  // cy.findByLabelText(datumType).as('datePicker').should('be.visible');
  // cy.get('@datePicker').should(`have.attr`, `type`, `date`);
});

Gegeven('ik kan de beschikbare trouwdata zien', () => {
  cy.log('TODO: FIXME: wachten op een datumprikker');
  // return 'pending';
  // cy.pause();
});
