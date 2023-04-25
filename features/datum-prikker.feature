# language: nl

# Functionaliteit: Datum Prikker 

Scenario: Ik wil een "Site is down" bericht zien als de JavaScript van de datum prikker niet worden geladen kan
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat de JavaScript van de datum prikker niet worden geladen kan
Dan zie ik den "Site is down" bericht

Scenario: De datum prikker toont actieve en inactieve datums
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
Dan zie ik datums dat niet beschikbare zijn als inactief
Dan zie ik datums dat beschikbaar zijn als actief

Scenario: De datum opent op de eerste beschikbare datum ten opzichte van vandaag
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
Dan zie ik dat de eerste beschikbare trouwdatum over drie weken ten opzichte van vandaag geselecteerd op de datum prikker is
    En zie ik tussen de pijltje buttons in de datum prikker een header met de maand en jaar voor de huidig geselecteerde datum


Scenario: Ik wil zien dat de datumprikker zichtbaar is als ik op een datum klikt
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
Wanneer ik op een actief trouwdatum button klik 
Dan zie ik dat de geklikte trouwdatum button geselecteerd is

Scenario: De geselecteerde trouwdatum op de datumprikker wordt zichtbaar gefocuseerd
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Dan zie ik dat de geselecteerde trouwdatum gefocust is
    En zie ik dat de contrast ratio van de trouwdatum hoger dan bij de andere datums in de datum prikker is

Scenario: De geselecteerde trouwdatum verandert niet wanneer ik buiten de datum prikker klikt
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een geselecteerde trouwdatum gefocuseerd zie
Wanneer ik buiten de datum prikker klikt 
Dan zie ik dat de geselecteerde trouwdatum niet verandert heeft
    En zie ik dat de tijdsloten voor de geselecteerde trouwdatum niet verandert hebben


Scenario: Ik kan beschikbare tijdsloten voor de geselecteerde trouwdatum zien
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Wanneer ik een trouwdatum selecteerd
Dan zie ik beschikbare tijdsloten als radio buttons onder de datum prikker voor de geselecteerde trouwdatum
    En zie ik dat de beschikbare tijdsloten door het soort bruiloft georganiseerd zijn
    En zie ik naast elk tijdslot de geselecteerde trouwdatum in een geldig formaat

Scenario: Ik kan beschikbare tijdsloten voor de geselecteerde trouwdatum kiezen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een geselecteerde trouwdatum gefocuseerd zie
    En dat ik beschikbare tijdsloten als radio buttons onder de datum prikker zie
Wanneer ik op een van de beschikbare tijdsloten als radio buttons onder de datum prikker klikt
Dan zie ik dat die radio button wordt geselecteerd
    En zie ik dat alle andere radio buttons niet geselecteerd zijn
    En zie ik een "Ja, dit wil ik" button onder de tijdsloten opties


Scenario: Ik kan door de datum prikker bladeren door de pijltje buttons te gebruiken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
    En dat ik een geselecteerde trouwdatum gefocuseerd zie
Wanneer ik een van pijltje buttons klikt 
Dan zie ik dat de datum prikker naar de passend maand ga

Scenario: Ik kan door de datum prikker bladeren door trouwdatums van andere maanden te selecteren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
    En dat ik een geselecteerde trouwdatum gefocuseerd zie
Wanneer ik oop een trouwdatum die bij de vorige of volgende maand als het momenteel getoonde maand hoort klikt
Dan zie ik dat de datum prikker naar de vorige of volgende maand als het momenteel getoonde maand ga
    En zie ik dat op de datum prikker de geklikte dag wordt geselecteerd


#Hoe noem je active en inactieve datums? -> actief, inactief
#Hoeveel in het verleden en toekomst kan de user scrollen? krijgt man een alert als man verzoek vroeger of verder te scrollen? )momenteel niet) -> over een jaar in de toekomst. Man krijgt geen bericht, man kan gewoon niet verder scrollen
#tijdsloten opeens niet zichtbar! -> run from main branch
#datum format bij elk tijdslot ->
#blijv de collectie tijdsloten georganisserd bij huwelijksoort?? -> Ja

1) Als de JavaScript van de datum prikker niet kan worden gedownload, wat voor bericht zou de user in plaats van de datum prikker zien?
b.v. "Site is down", "Momenteel niet beschikbaar voor onderhoud", etc.

2) Is het belangrijk dat de datum prikker datums van vorige en toekomstige maanden toont tijdens de huidige maand?
b.v. April 2023 toont 27-31 Maart en 1-7 mai

Zou het niet beter zijn om alleen de dagen te laten zien die bij de huidige maand horen?

3) Zou het datumformaat veranderen volgens de taalversie van de website of zal het altijd het Nederlandse formaat tonen?
b.v. 
NL = dag, maand, jaar 
US-EN = maand, dag, jaar




##Current date picker scenarios from the eenvoudig-huwelijk.feature file

# Scenario: Ik wil zien dat ik op de trouw-opties/huwelijk pagina ben
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
# Dan zie ik de heading "Wanneer en hoe"
#   En ben ik op stap "2"
#   En is er een "Trouwdatum" datum prikker op de pagina
#   En kan ik een "Ja, dit wil ik!" button zien


# Scenario: Ik wil zien op welk datum ik kan trouwen door op de datum prikker te klikken
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
# Wanneer ik op de "Trouwdatum" datum prikker klik
# Dan kan ik de beschikbare trouwdatums zien


# # Scenario: Ik wil zien op welk datum ik kan trouwen door een datum in te vullen
# # Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
# # Wanneer ik het "Trouwdatum" datum prikker gefocust heb
# # Dan kan ik de beschikbare trouwdatums zien
# #   En kan ik een datum handmatig in de "Trouwdatum" datum prikker invullen
# #   En kan ik de beschikbare tijdsloten radio button opties voor de ingevulde datum zien


# Scenario: Ik wil een trouwdatum selecteren door op de datum prikker te klikken
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
#   En dat er is een "Trouwdatum" datum prikker op de pagina
#   En dat ik heb de datum prikker geopend
# Wanneer ik een beschikbare dag selecteer
# Dan wordt de datum op de datum prikker gezet
#   En kan ik de beschikbare tijdsloten radio button opties voor de geselecteerde datum zien


# Scenario: Ik kan een niet beschikbare dag niet selecteren
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
#   En dat er is een "Trouwdatum" datum prikker op de pagina
#   En dat ik heb de datum prikker geopend
# Wanneer ik probeer een niet beschikbare dag te selecteren
# Dan zie ik dat ik dat dag niet selecteren kan


# Scenario: Ik wil in over een jaar trouwen
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
#   En dat er is een "Trouwdatum" datum prikker op de pagina
#   En dat ik heb de datum prikker geopend
# Wanneer ik probeer een datum over een jaar te selecteren
# Dan krijg ik een melding om een datum maximaal tussen een jaar te selecteren

# Scenario: Ik wil in binnen 3 weken trouwen
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
#   En dat er is een "Trouwdatum" datum prikker op de pagina
#   En dat ik heb de datum prikker geopend
# Wanneer ik probeer een datum binnen 3 weken van te voren te selecteren
# Dan krijg ik een melding om een datum minimaal 3 weken van te voren te selecteren


# Scenario: Ik wil een tijdslot selecteren
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
#   En dat ik heb een beschikbare datum geselecteerd
# Wanneer ik op de gewenste tijdslot radio button klik
# Dan zie ik dat de tijdslot radio button wordt geselecteerd


# Abstract Scenario: Ik wil mijn gewenste tijd en datum bevestigen
#   Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
#     En dat ik heb de "<datum>" geselecteerd
#     En dat ik heb een beschikbare "<tijd>" geselecteerd voor een "<type>" huwelijk
#   Wanneer ik op de "Ja, dit wil ik!" button klik
#   Dan word ik naar de "voorgenomen-huwelijk" pagina gestuurd 
#     En ben ik op stap "3"
#     En zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie
#   Voorbeelden: 
#     | datum         | tijd           | type          |
#     | 2021-04-14    | 12:00 – 12:15  | Eenvoudig     |
#     | 2021-04-14    | 13:30 – 13:45  | Eenvoudig     | 
#     | 2021-04-14    | 12:00 – 12:15  | Uitgebreid    |  

