##timeline 1 waarin je kan al de getuigendata in een keer aanpassen

Scenario: We willen de getuigensgegevens voor het huwelijk wijzigen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik een link "Anpassen" in de getuigen sectie zie
Wanneer ik op een van de "Anpassen" link klik
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


Scenario: We willen de gegevens van Getuige 3 aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik in de derde text input field de naam van Getuige 3 heb ingevuld 
Wanneer ik in de derde type email input field de email van Getuige 3 invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid


Scenario: We willen de gegevens van Getuige 4 aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik in de vierte text input field de naam van Getuige 4 heb ingevuld 
Wanneer ik in de vierde type email input field de email van Getuige 4 invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid


Scenario: We willen de aangepaste uitnodigingen naar de getuigen sturen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik ten minste een set van text en email input fields heb ingevuld
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd
    En krijg een bevestiging dat een email uitnodiging naar elk van de getuigen wordt gestuurd



##timeline 2 waarin je aanpast elk de getuigendata individuel
#See also the gegevens-individueel-aanpassen-eenvoudig-huwelijk.feature

Scenario: We willen de getuigensgegevens voor het huwelijk wijzigen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik een link "Anpassen" na elk getuigengegeven zie
Wanneer ik op een van de "Anpassen" links klik
Dan word ik naar de "voorgenomen-huwelijk/getuigen/anpassen" pagina gestuurd
    En word ik op de input field waarvan het accessibility label hetzelfde is met dat van de eerder geselecteerde "Anpassen" link beland


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


Scenario: We willen de gegevens van Getuige 3 aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik in de derde text input field de naam van Getuige 3 heb ingevuld 
Wanneer ik in de derde type email input field de email van Getuige 3 invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid


Scenario: We willen de gegevens van Getuige 4 aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik in de vierte text input field de naam van Getuige 4 heb ingevuld 
Wanneer ik in de vierde type email input field de email van Getuige 4 invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid


Scenario: We willen de aangepaste uitnodigingen naar de getuigen sturen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik ten minste een set van text en email input fields heb ingevuld
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd
    En krijg een bevestiging dat een email uitnodiging naar elk van de getuigen wordt gestuurd