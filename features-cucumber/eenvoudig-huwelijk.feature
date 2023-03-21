# language: nl

Functionaliteit: Eenvoudig huwelijk/partnerschap

@e2e
## stap "1" 
Scenario: Ik wil zien dat ik op de trouw-opties pagina ben
Gegeven dat ik op de "/trouw-opties" pagina ben
Dan zie ik de heading "Trouwen of geregistreerd partnerschap"
Dan ben ik op stap "1" 
Dan zie ik een "Trouwen plannen" button 

#@wip
@e2e
Scenario: Ik wil een huwelijk als trouw optie kiezen 
Gegeven dat ik op de "/trouw-opties" pagina ben
Wanneer ik op de "Trouwen plannen" button klik
Dan word ik naar de "trouw-opties/huwelijk" pagina gestuurd
# Dan ben ik op stap "2"
# Soms krijg ik "trouw-opties/undefined" 
# FIXME: De bug zorgt dat we niet kan werken https://github.com/frameless/utrecht-huwelijksplanner/issues/147

## stap "2" 
@e2e
Scenario: Ik wil zien dat ik op de trouw-opties/huwelijk pagina ben
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Dan zie ik de heading "Wanneer en hoe"
Dan ben ik op stap "2"
Dan is er een "Trouwdatum" datum prikker op de pagina
#FIXME: Fixen als de datumprikker gemaakt is

@e2e
Scenario: Ik wil zien op welk datum ik kan trouwen door op de kalendericoon te klikken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Wanneer ik op de "Trouwdatum" datum prikker klik
Dan kan ik de beschikbare trouwdatums zien
#FIXME: DIT KUNNEN WE TESTEN ALS DE CUSTOM DATUM PRIKKER HEBBEN/ZIEN

@e2e
Scenario: Ik wil zien op welk datum ik kan trouwen door een datum in te vullen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Wanneer ik het "Trouwdatum" datum prikker gefocust heb
Dan kan ik de beschikbare trouwdatums zien
# Dan kan ik een datum handmatig invullen in de "Trouwdatum" datum prikker
# Dan ik kan de beschikbare tijdsloten voor de ingevulde datum zien
#FIXME: DIT KUNNEN WE TESTEN ALS DE CUSTOM DATUM PRIKKER HEBBEN/ZIEN

# Scenario: Ik kan mijn gekozen trouwdatum niet selecteren
# Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
# Wanneer ik probeer een niet beschikbare dag te selecteren
# Dan zie ik dat ik dat dag niet selecteren kan

# Scenario: Ik kan tijdsloten voor mijn gekozen trouwdatum niet selecteren
# Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
#     En ik zie de heading "Wanneer en Hoe"
#     En ik ben op stap "2"
#     En er is een "Trouwdatum" datum prikker op de pagina
#     En ik wil binnen de komende twee weken trouwen
#     En ik heb de datum prikker geopend
# Wanneer ik probeer een niet beschikbare dag in te vullen
# Dan zie ik dat er geen tijdsloten checkbox opties op de pagina verschijnen

# Scenario: Ik wil een trouwdatum selecteren
# Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
#     En ik zie de heading "Wanneer en Hoe"
#     En ik ben op stap "2"
#     En er is een "Trouwdatum" datum prikker op de pagina
#     En er zijn beschikbare data voor trouwen
# Wanneer ik een beschikbare dag selecteer
# Dan wordt de datum op de datum prikker gezet

@e2e
Scenario: Ik wil een tijdslot zien voor de geselecteerde dag
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Wanneer ik een beschikbare "Trouwdatum" heb geselecteerd
Dan zie ik tijdslot checkbox opties voor trouwen op de geselecteerde dag
#FIXME: DIT KUNNEN WE TESTEN ALS DE CUSTOM DATUM PRIKKER HEBBEN/ZIEN

# @e2e 
# Scenario: Ik wil een tijdslot selecteren
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
#     En ik heb een beschikbare dag geselecteerd
# Wanneer ik op de gewenste tijdslot checkbox klik
# Dan de tijdslot checkbox wordt geselecteerd
# #the dan confirms the 1st radio button has been clicked  

# @e2e
# Scenario: Ik wil mijn gewenste tijd en datum bevestigen
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
#     En ik heb een beschikbare tijdslot geselecteerd
# Wanneer ik op de "Ja, dit wil ik!" button klik
# Dan word ik naar de "voorgenomen-huwelijk" pagina gestuurd 
# Dan ben ik op stap "3"
# Dan zie ik de correcte vroeger geselecteerde "tijd en datum" combinatie

@e2e @wip 
Abstract Scenario: Ik wil mijn gewenste tijd en datum bevestigen
  Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En ik heb de "<datum>" geselecteerd
    En ik heb een beschikbare "<tijd>" geselecteerd voor een "<typeHuwelijk>" huwelijk
  Wanneer ik op de "Ja, dit wil ik!" button klik
  Dan word ik naar de "voorgenomen-huwelijk" pagina gestuurd 
  Dan ben ik op stap "3"
  Dan zie ik de correcte vroeger geselecteerde "<datum>" en "<tijd>" combinatie
  Voorbeelden: 
    | datum         | tijd              | typeHuwelijk    |
    | 2021-04-14    | 12:00 – 12:15 uur | Eenvoudig     |
    # | '2021-04-14'    | '13:30 – 13:45 uur' | 'Eenvoudig'     | 
    # | '2021-04-14'    | '12:00 – 12:15 uur' | 'Uitgebreid'    |  


# Scenario: Ik wil over een jaar trouwen
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
#     En er is een "Trouwdatum" datum prikker op de pagina
#     En ik kan de beschikbare trouwdata zien 
# Wanneer ik probeer een datum over een jaar te selecteren
# Dan kan ik geen datum selecteren
#     En ik krijg een melding om een datum tussen een jaar te selecteren

# ## stap "3" 
# Scenario: Ik wil de bruiloft overzicht zien
# Gegeven dat ik op de "voorgenomen-huwelijk" pagina ben
#     En ik heb een beschikbare tijdslot geselecteerd
# Dan zie ik de correcte vroeger geselecteerde "tijd en datum" combinatie
# Dan zie ik een Inloggen met DigID button

# Scenario: Ik wil naar de DigID login pagina
# Gegeven dat ik op de "voorgenomen-huwelijk" pagina ben
# Wanneer ik op de button klik
# Dan ik word naar de DigID login pagina doorgestuurd 
# # stap " " 3