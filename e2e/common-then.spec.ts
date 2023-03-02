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
  //cy.url().should('contain', path);
  expect(cy.url()).to.include(path);
});

Dan('ben ik op stap {string}', (stepNumber: string) => {
  //cy.findByText(/Stap [0-9] van [0-9]/i).should('include.text', `Stap ${stepNumber}`);
  cy.findByText(new RegExp(`Stap ${stepNumber} van [0-9]+`, 'i')).should('be.visible');
});
