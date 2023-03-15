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

#FIXME: Fixen als de datumprikker gemaakt is
# @e2e
# Scenario: Ik wil zien op welk datum ik kan trouwen door op de kalendericoon te klikken
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
# Wanneer ik op de "Trouwdatum" datum prikker klik
# #FIXME: DIT KUNNEN WE TESTEN ALS DE CUSTOM DATUM PRIKKER HEBBEN/ZIEN
# Dan kan ik de beschikbare trouwdatums zien

# ## stap "2" 
# Scenario: Ik wil zien op welk datum ik kan trouwen door op de kalendericoon te klikken
# Gegeven ik ben op de "trouw opties huwelijk" pagina  
#     En ik zie de heading "Wanneer en Hoe"
#     En ik ben op stap "2"
#     En er is een "Trouwdatum" datum prikker op de pagina
# Wanneer ik op de kalender icon klik
# Dan kan ik de beschikbare trouwdatums zien

# Scenario: Ik wil zien op welk datum ik kan trouwen door een datum in te vullen
# Gegeven ik ben op de "trouw opties huwelijk" pagina 
#     En ik zie de heading "Wanneer en Hoe"
#     En ik ben op stap "2"
#     En er is een "Trouwdatum" datum prikker op de pagina
# Wanneer ik het "Trouwdatum" datum prikker gefocust heb
# Dan kan ik een datum handmatig invullen in de "Trouwdatum" datum prikker
#     En ik kan de beschikbare tijdsloten voor de ingevulde datum zien

# Scenario: Ik kan mijn gekozen trouwdatum niet selecteren
# Gegeven ik ben op de "trouw opties huwelijk" pagina  
#     En ik zie de heading "Wanneer en Hoe"
#     En ik ben op stap "2"
#     En er is een "Trouwdatum" datum prikker op de pagina
#     En ik wil binnen de komende twee weken trouwen
#     En ik de kalender icon heb geklik
#     En ik kan de beschikbare trouwdatums zien
# Wanneer ik probeer een niet beschikbare dag te selecteren
# Dan zie ik dat ik dat dag niet selecteren kan

# Scenario: Ik kan tijdsloten voor mijn gekozen trouwdatum niet selecteren
# Gegeven ik ben op de "trouw opties huwelijk" pagina  
#     En ik zie de heading "Wanneer en Hoe"
#     En ik ben op stap "2"
#     En er is een "Trouwdatum" datum prikker op de pagina
#     En ik wil binnen de komende twee weken trouwen
#     En ik heb de datum prikker geopend
# Wanneer ik probeer een niet beschikbare dag in te vullen
# Dan zie ik dat er geen tijdsloten checkbox opties op de pagina verschijnen

# Scenario: Ik wil een trouwdatum selecteren
# Gegeven ik ben op de "trouw opties huwelijk" pagina  
#     En ik zie de heading "Wanneer en Hoe"
#     En ik ben op stap "2"
#     En er is een "Trouwdatum" datum prikker op de pagina
#     En er zijn beschikbare data voor trouwen
# Wanneer ik een beschikbare dag selecteer
# Dan wordt de datum op de datum prikker gezet

@e2e
Scenario: Ik wil een tijdslots zien voor de geselecteerde dag
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Wanneer ik een beschikbare "Trouwdatum" heb geselecteerd
Dan ik zie tijdslot checkbox opties voor trouwen op de geselecteerde dag

# Scenario: Ik wil een tijdslot selecteren
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
#     En ik heb een beschikbare dag geselecteerd
# Wanneer ik op de gewenste tijdslot checkbox klik
# Dan de tijdslot checkbox wordt geselecteerd

# Scenario: Ik wil mijn gewenste tijd en datum bevestigen
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
#     En ik heb een beschikbare dag geselecteerd
#     En ik heb een beschikbare tijdslot geselecteerd
#     En ik kan een "Ja, dit wil ik!" button zien
# Wanneer ik op de "Ja, dit wil ik!" button klik
# Dan word ik naar de "voorgenomen huwelijk" pagina gestuurd 
#     En ik ben op stap "3"