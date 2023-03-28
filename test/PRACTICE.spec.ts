import { expect, test } from '@playwright/test';

/*
test('Scenario: ...', async ({ page }) => {
  // Gegeven: ...
  await page.goto('http://localhost:3000/');

  // Wanneer ...
  await page.getByRole('link', { name: 'Start' }).click();

  // Dan ...
  await expect(page).toHaveURL(/.*\/trouw-opties/);

  // En ...
});
*/

// Functionaliteit: Overzicht van huwelijksmogelijkheden
// Scenario: Ik wil een huwelijk of geregistreerd partnerschap plannen
// Gegeven dat ik ben op de "utrecht huwelijksplanner" pagina
//     En ik zie de heading "Regel je huwelijk of geregistreerd partnerschap"
//     En ik kan een "Start" button zien
// Wanneer ik op de "Start" button klik
// Dan word ik naar de "trouw opties" pagina gestuurd
//     En ik ben op step "1"

//Step 0
test('Scenario: Ik wil een huwelijk plannen proces beginnen', async ({ page }) => {
  // Gegeven dat ik ben op de "utrecht huwelijksplanner" pagina
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Regel je huwelijk/); //Regel je huwelijk of geregistreerd partnerschap - Gemeente

  // En ik zie de heading "Regel je huwelijk of geregistreerd partnerschap"
  const heading = await page
    .getByRole('heading', {
      name: 'Regel je huwelijk of geregistreerd partnerschap',
      exact: true,
    })
    .innerText();

  expect(heading).toBeDefined(); //this is the test
  expect(heading).toBe('Regel je huwelijk of geregistreerd partnerschap');
  // console.log(heading);

  // En ik kan een "Start" button zien
  // En "Start" button gedraagt zich als een link
  const startButton = await page.getByRole('link', { name: /Start/i });
  expect(startButton).toBeDefined(); //this is the test

  // Wanneer ik op de "Start" button klik
  await startButton.click();

  // Dan word ik naar de "trouw opties" pagina gestuurd
  await expect(page).toHaveURL(/.*\/trouw-opties/);

  // En ik ben op step "1"
  const step1 = await page.getByRole('paragraph', { name: /Stap 1 van [0-9]/i });
  expect(step1).toBeDefined();
});

// Scenario: Ik wil een huwelijk als trouw optie kiezen
// Gegeven dat ik ben op de "trouw opties" pagina
//     En ik zie de heading "Trouwen of geregistreerd partnerschap"
//     En ik ben op step "1"
//     En ik kan een "Trouwen plannen" button zien
// Wanneer ik op de "Trouwen plannen" button klik
// Dan word ik naar de "trouw opties huwelijk" pagina gestuurd
//     En ik ben op step "2"
//Step 1
test('Scenario: Ik wil een huwelijk als trouw optie kiezen', async ({ page }) => {
  // Gegeven dat ik ben op de "trouw opties" pagina
  await page.goto('http://localhost:3000/trouw-opties');
  await expect(page).toHaveTitle(/Stap 1: Trouwen of geregistreerd partnerschap - Gemeente Utrecht/); //It could also just be "Step 1"

  // En ik zie de heading "Regel je huwelijk of geregistreerd partnerschap"
  const heading = await page
    .getByRole('heading', {
      name: 'Trouwen of geregistreerd partnerschap',
      exact: true,
    })
    .innerText();

  expect(heading).toBeDefined(); //this is the test
  expect(heading).toBe('Trouwen of geregistreerd partnerschap');

  const stepnumber = await page
    // .getByRole('paragraph', {
    //   name: 'Trouwen of geregistreerd partnerschap',
    //   exact: true,
    // })
    .getByText(/Stap [0-9] van [0-9]/i)
    .innerText();

  expect(stepnumber).toBeDefined(); //this is the test
  expect(stepnumber).toContain('Stap 1'); //we could have also used getByRole in here

  // En ik kan een "Trouwen plannen" button zien
  // En "Start" button gedraagt zich als een link
  const trouwenPlannen = await page.getByRole('button', { name: /Trouwen plannen/i });
  expect(trouwenPlannen).toBeDefined(); //this is the test

  // Wanneer ik op de "Start" button klik
  await trouwenPlannen.click();

  // Dan word ik naar de "trouw opties" pagina gestuurd
  await expect(page).toHaveURL(/.*\/trouw-opties\/huwelijk/);

  // En ik ben op step "1"
  const step2 = await page.getByRole('paragraph', { name: /Stap 2 van [0-9]/i });
  expect(step2).toBeDefined(); //we could have used getbytext as well
});
