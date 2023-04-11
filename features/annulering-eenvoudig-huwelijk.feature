Scenario: We willen de reservering voor de huwelijk annuleren
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik de link "Annuleer huwelijk" zie
Wanneer ik op de "Annuleer huwelijk" link klik
Dan word ik naar de "huwelijksplanner-cancel" pagina gestuurd


Scenario: We willen zien dat we op de "huwelijksplanner-cancel" pagina zijn 
Gegeven dat ik op de "huwelijksplanner-cancel" pagina ben
Dan zie ik de heading  "Annuleer huwelijksreservering"
  En zie ik een "Annuleer reservering" button
  En zie ik een "Nee, ik wil terug naar het overzicht" link
  

@validate-flow
Scenario: We willen de annulering reservering voor de huwelijk bevestigen
Gegeven dat ik op de "huwelijksplanner-cancel" pagina ben
    En dat ik de heading "Annuleer huwelijksreservering" zie
    En dat ik de button "Annuleer reservering" zie
Wanneer ik op de "Annuleer reservering" button klik
Dan word ik naar de "huwelijksplanner-cancel/succes" pagina gestuurd
    En krijg ik een bevestiging dat de reservering voor de huwelijk geannuleerd is
    En krijg ik een bevestiging dat een email wordt gestuurd naar Partner 2
    En krijg ik een bevestiging dat een email wordt gestuurd naar elk getuigen 


@validate-flow
Scenario: We willen terug naar het huwelijksoverzicht 
Gegeven dat ik op de "huwelijksplanner-cancel" pagina ben
    En dat ik de heading "Annuleer huwelijksreservering" zie
    En dat ik de link "Nee, ik wil terug naar het overzicht" zie
Wanneer ik op de "Nee, ik wil terug naar het overzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd



