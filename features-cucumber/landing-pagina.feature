# language: nl

Functionaliteit: Landingspagina

## step "0"
Scenario: Ik wil zien wat ik van de huwelijksplanner van Utrecht kan verwachten
Gegeven dat ik op de "utrecht-huwelijksplanner" pagina ben
Dan zie ik de heading "Regel je huwelijk of geregistreerd partnerschap" 
    En zie ik de heading "Welke stappen kun je verwachten?"
    En zie ik een lijst "Welke stappen kun je verwachten?" met verwachte stappen voor al de trouwopties
    En zie ik een aside "Meer informatie" 
    En zie ik een "Start" button die zich gedraagd als link


Scenario: Ik wil de huwelijksplanner kunnen starten
Gegeven dat ik op de "utrecht-huwelijksplanner" pagina ben
Wanneer ik op de "Start" link klik
Dan word ik naar de "/trouw-opties" pagina gestuurd 
    En ben ik op stap "1"

