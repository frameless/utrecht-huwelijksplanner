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
  En zie ik een type checkbox input field voor de indicatie dat wij een trouwboekje willen
  En zie ik een "Nee, ik wil terug naar het overzicht" link
  
@validate-flow
Scenario: We willen de annulering reservering voor de huwelijk bevestigen
Gegeven dat ik op de "huwelijksplanner-cancel" pagina ben
    En dat ik de heading "Annuleer huwelijksreservering" zie
    En dat ik de button "Annuleer reservering" zie
Wanneer ik op de "Annuleer reservering" button klik
Dan word ik naar de "huwelijksplanner-cancel/succes" pagina gestuurd
    En krijg ik een bevestiging dat de reservering voor de huwelijk geannuleerd is
    En krijg ik een bevestiging dat een email wordt gestuurd naar elke Partner en Getuigen om over de annuleering te laten weten
#--ga ik naar een nieuwe pagina of krijg ik gewoon een melding?
# Weet ik ook niet zeker, anders kies je wat. jij als eindgebruiker het meest logisch zou vinden en voeg je @validate-flow toe en een comment.
#krijgen de getuigen en Partner 2 (als een invitation naar hun gestuurd was) een melding dat de reservering voor de huwelijk geannuleerd is??
# Goeie, vind ik wel logisch eigenlijk. Ik zou hem toevoegen en dan @validate-flow weer om even te dubbelchecken of Utrecht dat ook logisch vindt

@validate-flow
Scenario: We willen terug naar het huwelijksoverzicht 
Gegeven dat ik op de "huwelijksplanner-cancel" pagina ben
    En dat ik de heading "Annuleer huwelijksreservering" zie
    En dat ik de link "Nee, ik wil terug naar het overzicht" zie
Wanneer ik op de "Nee, ik wil terug naar het overzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd
#-- is teruggan naar het begin van het process de correcte weg?
# eigenlijk hetzelfde als hierboven. Ik zou denken dat je hier teruggaat naar de overzichtspagina van je huwelijk waar de cancel knop staat en niet naar de landingspagina. Maar daar @validate-flow aan toevoegen


