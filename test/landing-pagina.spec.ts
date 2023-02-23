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

test('Scenario: Ik wil een huwelijk of geregistreerd partnerschap plannen', async ({ page }) => {
  // Gegeven dat ik ben op de "utrecht huwelijksplanner" pagina
  await page.goto('http://localhost:3000/');

  // En ik zie de heading "Regel je huwelijk of geregistreerd partnerschap"
  const heading = await page
    .getByRole('heading', {
      name: 'Regel je huwelijk of geregistreerd partnerschap',
      exact: true,
    })
    .innerText();
  expect(heading).toBeDefined();
  console.log(heading);
  // En ik kan een "Start" button zien

  // En "Start" button gedraagt zich als een link
  const startButton = await page.getByRole('link', { name: /Start/i });
  expect(startButton).toBeDefined();

  // Wanneer ik op de "Start" button klik
  await startButton.click();

  // Dan word ik naar de "trouw opties" pagina gestuurd
  await expect(page).toHaveURL(/.*\/trouw-opties/);

  // En ik ben op step "1"
  const step1 = await page.getByRole('paragraph', { name: /Stap 1 van [0-9]/i });
  expect(step1).toBeDefined();
});
