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
  cy.log('TODO');
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
      // look for the legend with the text
      // 'Flits/balie-huwelijk — Stadskantoor'
      // or should it be
      // 'FLITS/BALIE-HUWELIJK — STADSKANTOOR'?
      cy.findByRole('legend', { name: 'Flits/balie-huwelijk — Stadskantoor' }).as('eenvoudig');

      // get the @eenvoudig legend element
      // find it's siblings (two divs containing checkboxes)
      // then look inside those siblings for a radio button with the accessible name "tijd"
      cy.get('@eenvoudig').siblings().findByRole('radio', { name: tijd }).as('timeSlot');

      // then check that checkbox
      cy.get('@timeSlot').check();

      cy.log('@timeSlot');
    } else if (typeHuwelijk === 'Uitgebreid') {
      // look for the legend with the text
      // 'Uitgebreid trouwen — Zelf de plaats bepalen'
      // save the legend in a cypress variable thingy
      // then use that variable to look for the next
      // sibling element (psst it's a div) and then
      // from that div find the input element with
      // the time

      // UITGEBREID TROUWEN — ZELF DE PLAATS BEPALEN
      cy.findByRole('legend', { name: 'Flits/balie-huwelijk — Stadskantoor' });
    }
  },
);

Gegeven('ik kan een {string} button zien', (string) => {
  cy.log('TODO', string);
  // cy.pause();
  // return 'pending';
});

Gegeven('er is een {string} datum prikker op de pagina', (datumType: string) => {
  cy.log('TODO');
  // cy.findByLabelText(datumType).as('datePicker').should('be.visible');
  // cy.get('@datePicker').should(`have.attr`, `type`, `date`);
});

Gegeven('ik kan de beschikbare trouwdata zien', () => {
  cy.log('TODO');
  // return 'pending';
  // cy.pause();
});
