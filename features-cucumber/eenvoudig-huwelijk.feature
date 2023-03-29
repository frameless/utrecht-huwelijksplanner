# language: nl

Functionaliteit: Eenvoudig huwelijk


## stap "1" 
Scenario: Ik wil zien dat ik op de trouw-opties pagina ben
Gegeven dat ik op de "/trouw-opties" pagina ben
Dan zie ik de heading "Trouwen of geregistreerd partnerschap"
  En ben ik op stap "1" 
  En zie ik een "Trouwen plannen" button 


Scenario: Ik wil een huwelijk als trouw optie kiezen 
Gegeven dat ik op de "/trouw-opties" pagina ben
Wanneer ik op de "Trouwen plannen" button klik
Dan word ik naar de "trouw-opties/huwelijk" pagina gestuurd

## stap "2" 
Scenario: Ik wil zien dat ik op de trouw-opties/huwelijk pagina ben
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Dan zie ik de heading "Wanneer en hoe"
  En ben ik op stap "2"
  En is er een "Trouwdatum" datum prikker op de pagina
  En kan ik een "Ja, dit wil ik!" button zien


Scenario: Ik wil zien op welk datum ik kan trouwen door op de datum prikker te klikken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Wanneer ik op de "Trouwdatum" datum prikker klik
Dan kan ik de beschikbare trouwdatums zien


Scenario: Ik wil zien op welk datum ik kan trouwen door een datum in te vullen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Wanneer ik het "Trouwdatum" datum prikker gefocust heb
Dan kan ik de beschikbare trouwdatums zien
  En kan ik een datum handmatig in de "Trouwdatum" datum prikker invullen
  En kan ik de beschikbare tijdsloten radio button opties voor de ingevulde datum zien


Scenario: Ik wil een trouwdatum selecteren door op de datum prikker te klikken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
  En dat er is een "Trouwdatum" datum prikker op de pagina
  En dat ik heb de datum prikker geopend
Wanneer ik een beschikbare dag selecteer
Dan wordt de datum op de datum prikker gezet
  En kan ik de beschikbare tijdsloten radio button opties voor de geselecteerde datum zien


Scenario: Ik kan een niet beschikbare dag niet selecteren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
  En dat ik heb de datum prikker geopend
Wanneer ik probeer een niet beschikbare dag te selecteren
Dan zie ik dat ik dat dag niet selecteren kan


Scenario: Ik wil in over een jaar trouwen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
  En dat ik heb de datum prikker geopend
Wanneer ik probeer een datum over een jaar te selecteren
Dan krijg ik een melding om een datum maximaal tussen een jaar te selecteren

Scenario: Ik wil in binnen 3 weken trouwen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
  En dat ik heb de datum prikker geopend
Wanneer ik probeer een datum binnen 3 weken van te voren te selecteren
Dan krijg ik een melding om een datum minimaal 3 weken van te voren te selecteren


Scenario: Ik wil een tijdslot selecteren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
  En dat ik heb een beschikbare datum geselecteerd
Wanneer ik op de gewenste tijdslot radio button klik
Dan zie ik dat de tijdslot radio button wordt geselecteerd


Abstract Scenario: Ik wil mijn gewenste tijd en datum bevestigen
  Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik heb de "<datum>" geselecteerd
    En dat ik heb een beschikbare "<tijd>" geselecteerd voor een "<type>" huwelijk
  Wanneer ik op de "Ja, dit wil ik!" button klik
  Dan word ik naar de "voorgenomen-huwelijk" pagina gestuurd 
    En ben ik op stap "3"
    En zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie
  Voorbeelden: 
    | datum         | tijd           | type          |
    | 2021-04-14    | 12:00 – 12:15  | Eenvoudig     |
    | 2021-04-14    | 13:30 – 13:45  | Eenvoudig     | 
    | 2021-04-14    | 12:00 – 12:15  | Uitgebreid    |  



## stap "3"  
Scenario: Ik wil zien dat ik op de voorgenomen-huwelijk pagina ben
Gegeven dat ik op de "voorgenomen-huwelijk" pagina ben
Dan zie ik de heading "Eenvoudig trouwen"
  En ben ik op stap "3"
  En kan ik een "Inloggen met DigiD" link op de pagina zien


Scenario: Ik wil naar de DigID login pagina
Gegeven dat ik op de "voorgenomen-huwelijk" pagina ben
Wanneer ik op de "Inloggen met DigiD" link klik
Dan word ik naar de "login" pagina gestuurd


# Scenario: Ik wil zien dat ik op de DigiD login pagina ben
# Gegeven dat ik op de "login" pagina ben
# Dan zie ik de heading "Inloggen bij Gemeente utrecht - Digitaal Loket"
# Dan kan ik een "Met de DigiD app" button op de pagina zien


Scenario: Ik Partner 1 wil met DigID inloggen
Gegeven dat ik op de "login" pagina ben 
  En dat ik DigID heb 
Wanneer ik op een van de inloggen opties klik
Dan word ik ingelogd door DigID
  En word ik naar de "persoonsgegevens" van mij pagina gestuurd


Scenario: Ik Partner 1 wil mijn basisgegevens bevestigen
Gegeven dat ik op de "persoonsgegevens" pagina ben 
Dan zie ik de heading "Melding Voorgenomen Huwelijk"
  En zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie 
  En zie ik dat mijn persoonsgegevens juist zijn
  En zie ik dat mijn adresgegevens juist zijn 

Scenario: Ik Partner 1 wil mijn telefoonnummer invullen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type tel input field zie
Wanneer ik in de tel type input field mijn telefoonnummer invul
Dan wordt het ingevulde nummer gecontroleerd voor geldigheid

Scenario: Ik Partner 1 wil mijn email invullen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type email input field zie 
Wanneer ik in de type email input field mijn email invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid

Scenario: Ik Partner 1 wil verklaren dat ik niet getrouwd ben
Gegeven dat ik op de Persoonsgegevens pagina ben
  En dat ik een type checkbox input field voor de alleenstaand verklaring van mij zie
Wanneer ik op de checkbox klik
Dan wordt het checkbox ingevuld
-------