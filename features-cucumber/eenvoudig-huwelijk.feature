# language: nl

Functionaliteit: Eenvoudig huwelijk/partnerschap

@e2e
## stap "1" 
Scenario: Ik wil zien dat ik op de trouw-opties pagina ben
Gegeven dat ik op de "/trouw-opties" pagina ben
Dan zie ik de heading "Trouwen of geregistreerd partnerschap"
    En ben ik op stap "1" 
    En zie ik een "Trouwen plannen" button 

@e2e
Scenario: Ik wil een huwelijk als trouw optie kiezen 
Gegeven dat ik op de "/trouw-opties" pagina ben
Wanneer ik op de "Trouwen plannen" button klik
Dan word ik naar de "/trouw-opties/huwelijk" pagina gestuurd 
    En ben ik op stap "2"