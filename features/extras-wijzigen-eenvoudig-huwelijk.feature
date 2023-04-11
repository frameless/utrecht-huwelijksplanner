@validate-flow
Scenario: We willen extras voor de huwelijk na het betaling toevoegen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
    En dat ik de link "Extras aanpassen" zie
Wanneer ik op de "Extras aanpassen" link klik
Dan word ik naar de "extra-laat" pagina gestuurd


@validate-flow
Scenario: We willen zien dat we op de "extra-laat" pagina zijn 
Gegeven dat ik op de "extra-laat" pagina ben
Dan zie ik de heading  "Kies je extra’s"
  En zie ik een "trouwboekjes" image
  En zie ik een type checkbox input field voor de indicatie dat wij een trouwboekje willen
  En zie ik een vier type radio button input fields 
  En zie ik een "Deze wil ik hebben" button


@validate-flow
Scenario: We willen naar het overzicht zonder extras voor de huwelijk aan te passen
Gegeven dat ik op de "extra-laat" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd


@validate-flow
Scenario: We willen verklaren dat wij een trouwboekje aanpassen willen
Gegeven dat ik op de "extra-laat" pagina ben
  En dat ik een type checkbox input field voor de bevestiging dat een trouwboekje is gewild zie
Wanneer ik op de checkbox klik
Dan wordt het checkbox ingevuld


@validate-flow
Scenario: We willen een van de trouwboekje opties als aanpassing kiezen 
Gegeven dat ik op de "extra-laat" pagina ben
Wanneer ik op één van de radio buttons klik
Dan wordt alleen dat radio button ingevuld


@validate-flow
Scenario: We willen onze trouwboekje keuze hebben 
Gegeven dat ik op de "extra-laat" pagina ben
Wanneer ik op "Deze wil ik hebben" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/extra" pagina gestuurd


@validate-flow
Scenario: We willen voor de extras betalen 
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/extra" pagina ben
Wanneer ik op betaal
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd


@validate-flow
Scenario: We willen onze trouwboekje keuze bevestigen
Gegeven dat ik voor de extras heb betaald
    En dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En zie ik de gekozen extras
    En krijg een bevestiging dat een email met de aangepaste extras naar mij wordt gestuurd
    En krijg een bevestiging dat een email met de aangepaste extras naar Partner 2 wordt gestuurd

