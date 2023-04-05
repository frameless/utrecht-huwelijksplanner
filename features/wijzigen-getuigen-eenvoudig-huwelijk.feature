Scenario: We willen de getuigensgegevens voor de huwelijk wijzigen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik een link "Anpassen" na elk getuigengegeven zie
Wanneer ik op een van de "Anpassen" links klik
Dan word ik naar de "voorgenomen-huwelijk/getuigen/anpassen" pagina gestuurd

Scenario: We willen zien dat we op de "voorgenomen-huwelijk/getuigen" pagina zijn 
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
Dan zie ik de heading  "Uitnodiging voor aangepaste getuigen"
  En zie ik vier type text input fields
  En zie ik vier type email input fields
  En zie ik een "Verstuur uitnodiging" button
  En zie ik een "Terug naar het huwelijksoverzicht" link


Scenario: We willen naar het overzicht zonder de getuigen aan te passen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd


Scenario: We willen de gegevens van Getuige 1 aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik in de eerste text input field de naam van Getuige 1 heb ingevuld 
Wanneer ik in de eerste type email input field de email van Getuige 1 invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid

Scenario: We willen de gegevens van Getuige 2 aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik in de tweede text input field de naam van Getuige 2 heb ingevuld 
Wanneer ik in de tweede type email input field de email van Getuige 2 invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid

Scenario: We willen de aangepaste uitnodigingen naar de getuigen sturen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik twee sets van text en email input fields heb ingevuld
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd
    En worden email uitnodigingen naar de getuigen gestuurd

#How does one test that the email invitations got sent correctly? Is this something to also test with Cypress?
