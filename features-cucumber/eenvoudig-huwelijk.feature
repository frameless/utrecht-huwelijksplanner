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

# FIXME: De bug zorgt dat we niet kan werken https://github.com/frameless/utrecht-huwelijksplanner/issues/147
# Dan word ik naar de "/trouw-opties/huwelijk" pagina gestuurd 
# En ben ik op stap "2"

## stap "2" 
@e2e
Scenario: Ik wil zien dat ik op de trouw-opties/huwelijk pagina ben
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Dan zie ik de heading "Wanneer en hoe"
Dan ben ik op stap "2"
Dan is er een "Trouwdatum" datum prikker op de pagina

@e2e
Scenario: Ik wil zien op welk datum ik kan trouwen door op de kalendericoon te klikken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Wanneer ik op de "Trouwdatum" datum prikker klik
#FIXME: DIT KUNNEN WE TESTEN ALS DE CUSTOM DATUM PRIKKER HEBBEN/ZIEN
Dan kan ik de beschikbare trouwdatums zien