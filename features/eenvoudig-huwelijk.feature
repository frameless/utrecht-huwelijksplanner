#na de getuigenunitnodigingen, kan man betalen of extras toevoegen, dan betalen, dan als geen extras waren toegevoegd, kan man ze nu toevoegen en dan voor ze betalen

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



Scenario: Ik wil een trouwdatum selecteren door op de datum prikker te klikken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
  En dat er is een "Trouwdatum" datum prikker op de pagina
  En dat ik de beschikbare trouwdatums kan zien
Wanneer ik een beschikbare dag selecteer
Dan wordt de datum op de datum prikker gezet
  En kan ik de beschikbare tijdsloten radio button opties voor de geselecteerde datum zien


Scenario: Ik kan een niet beschikbare dag niet selecteren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik probeer een niet beschikbare dag te selecteren
Dan zie ik dat ik dat dag niet selecteren kan


# Scenario: Ik wil in over een jaar trouwen
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
#   En dat er is een "Trouwdatum" datum prikker op de pagina
# Wanneer ik probeer een datum over een jaar te selecteren
# Dan krijg ik een melding om een datum maximaal tussen een jaar te selecteren

# Scenario: Ik wil in binnen 3 weken trouwen
# Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
#   En dat er is een "Trouwdatum" datum prikker op de pagina
# Wanneer ik probeer een datum binnen 3 weken van te voren te selecteren
# Dan krijg ik een melding om een datum minimaal 3 weken van te voren te selecteren


Scenario: Ik wil een tijdslot selecteren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
  En dat ik heb een beschikbare datum geselecteerd
Wanneer ik op de gewenste tijdslot radio button klik
Dan zie ik dat de tijdslot radio button wordt geselecteerd
  En kan ik een "Ja, dit wil ik!" button zien


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


Scenario: Ik Partner 1 wil met DigID inloggen **Optioneel**
Gegeven dat ik op de "login" pagina ben 
  En dat ik DigID heb 
Wanneer ik op een van de inloggen opties klik
Dan word ik ingelogd door DigID
  En word ik naar de "persoonsgegevens" van mij pagina gestuurd

Scenario: Ik wil de DigID inloggen annuleren **Optioneel**
Gegeven dat ik op de "login" pagina ben 
    En dat ik de DigID Inloggen interface zie
    En dat ik zie een Annuleren button zie
Wanneer ik op de Annuleren button klik
Dan word ik teruggestuurd naar de "voorgenomen-huwelijk" pagina

Scenario: Ik wil een DigID hebben
Gegeven dat ik op de "login" pagina ben 
    En dat ik geen DigID heb
    En dat ik de "Nog geen DigID? Vraag uw DigiD aan" link op de pagina zie
Wanneer ik op de link klik
Dan word ik naar een pagina waarin ik een DigID kan krijgen gestuurd

Scenario: Ik Partner 1 wil mijn basisgegevens bevestigen
Gegeven dat ik op de "persoonsgegevens" pagina ben 
Dan zie ik de heading "Melding Voorgenomen Huwelijk"
  En zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie 
  En zie ik dat mijn persoonsgegevens juist zijn
  En zie ik dat mijn adresgegevens juist zijn
  Voorbeelden: 
    | datum         | tijd           | type          |
    | 2021-04-14    | 12:00 – 12:15  | Eenvoudig     |
    | 2021-04-14    | 13:30 – 13:45  | Eenvoudig     | 
    | 2021-04-14    | 12:00 – 12:15  | Uitgebreid    |     
  

Scenario: Ik Partner 1 wil mijn telefoonnummer invullen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type tel input field zie
Wanneer ik in de tel type input field mijn telefoonnummer invul
Dan wordt het ingevulde nummer gecontroleerd voor geldigheid

Scenario: Ik Partner 1 wil mijn telefoonnummer vals invullen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type tel input field zie
Wanneer ik in de tel type input field andere karakteren dan nummers typ
Dan zie ik dat de niet nummers niet de tel type input field invullen

Scenario: Ik Partner 1 wil mijn email invullen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type email input field zie 
Wanneer ik in de type email input field mijn email invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid

Scenario: Ik Partner 1 wil verklaren dat ik niet getrouwd ben
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type checkbox input field met label "burgerlijke-staat" zie
Wanneer ik op de checkbox klik
Dan wordt het checkbox ingevuld

Scenario: Ik Partner 1 wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een checkbox input field met label "incest-check"
Wanneer ik op de checkbox klik
Dan wordt het checkbox ingevuld

Scenario: Ik Partner 1 wil al de gegevens in het formulier bevestigen
Gegeven dat ik op de "persoonsgegevens" pagina ben
    En dat ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie zie
    En dat al de ingevulde gegevens in het formulier kloppen
Wanneer ik op de checkbox met label "gegevensbevestiging" klik
Dan wordt het checkbox ingevuld
  Voorbeelden: 
    | datum         | tijd           | type          |
    | 2021-04-14    | 12:00 – 12:15  | Eenvoudig     |
    | 2021-04-14    | 13:30 – 13:45  | Eenvoudig     | 
    | 2021-04-14    | 12:00 – 12:15  | Uitgebreid    | 

Scenario: Ik Partner 1 heb al de gegevens checkboxes ingevuld
Gegeven dat ik op de "persoonsgegevens" pagina ben
    En dat ik al de checkbox met label "persoonsgegevens" ingevuld heb 
    En dat ik al de checkbox met label "incest-check" ingevuld heb 
    En dat ik al de checkbox met label "gegevensbevestiging" ingevuld heb
Dan zie ik een "Contactgegevens opslaan" button
    

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven dat ik op de "persoonsgegevens" pagina ben
    En dat ik al de checkbox met label "persoonsgegevens" ingevuld heb 
    En dat ik al de checkbox met label "incest-check" ingevuld heb 
    En dat ik al de checkbox met label "gegevensbevestiging" ingevuld heb 
    En dat ik een "Contactgegevens opslaan" button zie 
Wanneer ik op de "Contactgegevens opslaan" button klik
Dan word ik naar de "voorgenomen-huwelijk/partner" pagina gestuurd

Scenario: Ik Partner 1 wil zien dat ik op de voorgenomen-huwelijk/partner pagina ben
Gegeven dat ik op de "voorgenomen-huwelijk/partner" pagina ben
Dan zie ik de heading "Melding Voorgenomen Huwelijk"
  En is er een "Partner inloggen met DigiD" button op de pagina
  En is er een "mail een uitnodiging aan je partner" link zien

Scenario: Ik Partner 1 wil een DigID inloggen uitnodiging naar partner 2 stuuren **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner" pagina ben
    En dat ik een "mail een uitnodiging aan je partner" link zie
Wanneer ik de "mail een uitnodiging aan je partner" link klik
Dan word ik naar de "voorgenomen-huwelijk/partner/uitnodigen" pagina gestuurd

Scenario: Ik Partner 1 wil zien dat ik op de "voorgenomen-huwelijk/partner/uitnodigen" pagina ben **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner/uitnodigen" pagina ben
Dan zie ik een type text input field met label "partner2-naam"
Dan zie ik een type email input field met label "partner2-email"


Scenario: Ik Partner 1 wil de naam van Partner 2 voor een DigID inloggen uitnodiging per e-mail invullen **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner/uitnodigen" pagina ben
  En dat ik de naam van Partner 2 in de type text input field met label "partner2-naam" heb ingevuld
Wanneer ik de email van Partner 2 in de input field met label "partner2-email" invul
Dan wordt het getypte e-mail gecontroleerd voor geldigheid 
  En zie ik een  "Verstuur uitnodiging" button 


Scenario: Ik Partner 1 wil een DigID inloggen uitnodiging per e-mail naar Partner 2 stuuren **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner/uitnodigen" pagina ben
    En dat ik de type text input field met label "partner2-naam" ingevult hebt
    En dat ik de type email input field met label "partner2-email" ingevult hebt
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan wordt ik naar de "voorgenomen-huwelijk/partner/succes" pagina gestuurd
  En krijg ik een bevestiging dat de e-mail verzonden is


Scenario: Ik Partner 1 wil zien dat ik op de "voorgenomen-huwelijk/partner/succes" pagina ben **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner/succes" pagina ben
Dan zie ik een "Bekijk e-mail voor aanvrager" button 
  En zie ik een "Bekijk e-mail voor partner" button 
  En zie ik een type text input field
  En zie ik een type email input field
  En zie ik een "Verstuur uitnodiging" button


Scenario: Ik Partner 1 wil mijn email bekijken **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner/succes" pagina ben
Wanneer ik op de "Bekijk e-mail voor aanvrager" button klik
Dan wordt ik naar de "voorgenomen-huwelijk/partner/aanvrager-email" pagina gestuurd
  En krijg ik een bevestiging dat de e-mail verzonden is
  En zie ik een "Doorgaan huwelijksaanvraag" button

Scenario: Ik Partner 1 wil doorgaan met het huwelijksaanvraag **Optioneel**
Gegeven Gegeven dat ik op de "voorgenomen-huwelijk/partner/aanvrager-email" pagina ben
Wanneer ik op de "Doorgaan huwelijksaanvraag" button klik
Dan wordt ik naar de "voorgenomen-huwelijk/getuigen" pagina gestuurd

Scenario: Ik Partner 1 wil de email voor mijn partner bekijken **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner/succes" pagina ben
Wanneer ik op de "Bekijk e-mail voor partner" button klik
Dan wordt ik naar de "voorgenomen-huwelijk/partner/invitation-email-partner" pagina gestuurd
  En krijg ik een bevestiging dat de e-mail verzonden is
  En zie ik een "Inloggen met DigiD" button

Scenario: Ik Partner 1 wil de uitnodiging voor mijn partner versturen **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner/succes" pagina ben
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan wordt ik naar de "voorgenomen-huwelijk/partner/invitation-email-partner" pagina gestuurd
  En krijg ik een bevestiging dat de e-mail verzonden is
  En zie ik een "Inloggen met DigiD" button


Scenario: Ik Partner 2 wil voor het huwelijk via email inloggen **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner/invitation-email-partner" pagina ben
Wanneer ik op de "Inloggen met DigiD" button klik
Dan word ik naar de "login" pagina gestuurd


Scenario: Ik partner 2 wil voor het huwelijk via de website inloggen **Optioneel**
Gegeven dat ik op de "voorgenomen-huwelijk/partner" pagina ben
Wanneer ik op de "Partner inloggen met DigiD" button klik
Dan word ik naar de "login" pagina gestuurd


Scenario: Ik Partner 2 wil met DigID inloggen
Gegeven dat ik op de "login" pagina ben 
  En dat Partner 2 DigID heb 
Wanneer ik op een van de inloggen opties klik
Dan word ik ingelogd door DigID
  En word ik naar de "persoonsgegevens" van mij pagina gestuurd


Scenario: Ik Partner 2 wil mijn basisgegevens bevestigen
Gegeven dat ik op de "persoonsgegevens" pagina ben 
Dan zie ik de heading "Melding Voorgenomen Huwelijk"
  En zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie 
  En zie ik dat mijn persoonsgegevens juist zijn
  En zie ik dat mijn adresgegevens juist zijn 
  Voorbeelden: 
    | datum         | tijd           | type          |
    | 2021-04-14    | 12:00 – 12:15  | Eenvoudig     |
    | 2021-04-14    | 13:30 – 13:45  | Eenvoudig     | 
    | 2021-04-14    | 12:00 – 12:15  | Uitgebreid    | 

Scenario: Ik Partner 2 wil mijn telefoonnummer  invullen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type tel input field zie
Wanneer ik in de tel type input field mijn telefoonnummer invul
Dan wordt het ingevulde nummer gecontroleerd voor geldigheid

Scenario: Ik Partner 2 wil mijn telefoonnummer vals invullen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type tel input field zie
Wanneer ik in de tel type input field andere karakteren dan nummers typ
Dan zie ik dat de niet nummers niet de tel type input field invullen

Scenario: Ik Partner 2 wil mijn email invullen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type email input field zie 
Wanneer ik in de type email input field mijn email invul
Dan wordt het ingevulde email gecontroleerd voor geldigheid

Scenario: Ik Partner 2 wil verklaren dat ik niet getrouwd ben
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een type checkbox input field met label "burgerlijke-staat" zie
Wanneer ik op de checkbox klik
Dan wordt het checkbox ingevuld

Scenario: Ik Partner 2 wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven dat ik op de "persoonsgegevens" pagina ben
  En dat ik een checkbox input field met label "incest-check"
Wanneer ik op de checkbox klik
Dan wordt het checkbox ingevuld

Scenario: Ik Partner 2 wil al de gegevens in het formulier bevestigen
Gegeven dat ik op de "persoonsgegevens" pagina ben
    En dat ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie zie
    En dat al de ingevulde gegevens in het formulier kloppen
Wanneer ik op de checkbox met label "gegevensbevestiging" klik
Dan wordt het checkbox ingevuld
  Voorbeelden: 
    | datum         | tijd           | type          |
    | 2021-04-14    | 12:00 – 12:15  | Eenvoudig     |
    | 2021-04-14    | 13:30 – 13:45  | Eenvoudig     | 
    | 2021-04-14    | 12:00 – 12:15  | Uitgebreid    | 

Scenario: Ik Partner 2 heb al de gegevens checkboxes ingevuld
Gegeven dat ik op de "persoonsgegevens" pagina ben
    En dat ik al de checkbox met label "persoonsgegevens" ingevuld heb 
    En dat ik al de checkbox met label "incest-check" ingevuld heb 
    En dat ik al de checkbox met label "gegevensbevestiging" ingevuld heb
Dan zie ik een "Contactgegevens opslaan" button

Scenario: Ik Partner 2 wil mijn contactgegevens opslaan
Gegeven dat ik op de "persoonsgegevens" pagina ben
    En dat ik al de checkbox met label "persoonsgegevens" ingevuld heb 
    En dat ik al de checkbox met label "incest-check" ingevuld heb 
    En dat ik al de checkbox met label "gegevensbevestiging" ingevuld heb 
    En dat ik een actief "Contactgegevens opslaan" button zie 
Wanneer ik op de "Contactgegevens opslaan" button klik
Dan word ik naar de "persoonsgegevens/succes" pagina gestuurd

Scenario: Gekoppeling van gegevens bevestigen
Gegeven dat ik op de "persoonsgegevens/succes" pagina ben
Dan zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie
    En zie ik de kosten voor het huwelijk 
    En zie ik de heading "Gelukt"
    En zie ik een "Nodig getuigen uit" button
    Voorbeelden: 
    | datum         | tijd           | type          |
    | 2021-04-14    | 12:00 – 12:15  | Eenvoudig     |
    | 2021-04-14    | 13:30 – 13:45  | Eenvoudig     | 
    | 2021-04-14    | 12:00 – 12:15  | Uitgebreid    | 


Scenario: We willen getuigen uitnodigen
Gegeven dat ik op de "persoonsgegevens/succes" pagina ben
Wanneer ik op de "Nodig getuigen uit" button klik
Dan word ik naar de "voorgenomen-huwelijk/getuigen" pagina gestuurd

Scenario: We willen zien dat we op de "voorgenomen-huwelijk/getuigen" pagina zijn 
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen" pagina ben
Dan zie ik de heading  "Nodig alvast getuigen uit"
  En zie ik een "Bekijk e-mail voor partner" button 
  En zie ik vier type text input fields
  En zie ik vier type email input fields
  En zie ik een "Verstuur uitnodiging" button


Abstract Scenario: We willen de email van "<getuige>" invullen
  Gegeven dat ik op de "voorgenomen-huwelijk/getuigen" pagina ben
    En dat ik in de "<text>" input field de naam van "<getuige>"  heb ingevuld
  Dan wordt het ingevulde "<email>" gecontroleerd voor geldigheid
  Voorbeelden: 
    | text    | getuige    | email             |
    | eerste  | Getuige 1  | jip@gmail.com     |
    | tweede  | Getuige 2  | janneke@gmail.com |


Scenario: We willen de uitnodigingen naar de getuigen sturen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen" pagina ben
  En dat ik twee sets van text en email input fields heb ingevuld
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan word ik naar de "voorgenomen-huwelijk/getuigen/succes" pagina gestuurd

Scenario: We willen zien dat we op de "voorgenomen-huwelijk/getuigen/succes" pagina zijn 
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/succes" pagina ben
Dan zie ik de heading  "Gelukt!"
  En zie ik een "Laat de gemeente checken en ga betalen" link
  En zie ik een "Vul aan met extra's" link

Scenario: We willen de gemeente laten checken en ga betalen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/succes" pagina ben
Wanneer ik op de "Laat de gemeente checken en ga betalen" link klik
Dan word ik naar de "voorgenomen-huwelijk/checken" pagina gestuurd

Scenario: We willen zien dat we op de "voorgenomen-huwelijk/checken" pagina zijn 
Gegeven dat ik op de "voorgenomen-huwelijk/checken" pagina ben
Dan zie ik de heading  "Gelukt!"
  En zie ik een "Ga betalen" link

Scenario: We willen betalen voor de huwelijk
Gegeven dat ik op de "voorgenomen-huwelijk/checken" pagina ben
Wanneer ik op de "Ga betalen" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen" pagina gestuurd

Scenario: We willen zien dat we op de "voorgenomen-huwelijk/betalen/succes" pagina zijn 
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
Dan zie ik de heading  "Betaling ontvangen"
  En zie ik de heading "Dit hebben jullie doorgegeven" 
  En zie ik de heading "Deze pagina is automatisch bewaard" 

Scenario: We willen extras aanvullen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/succes" pagina ben
Wanneer ik op de "Vul aan met extra's" link klik
Dan word ik naar de "extra" pagina gestuurd

# oude versie van de extras met een checkbox een radio buttons 
Scenario: We willen zien dat we op de "extra" pagina zijn 
Gegeven dat ik op de "extra" pagina ben
Dan zie ik de heading  "Kies je extra’s"
  En zie ik een "trouwboekjes" image
  En zie ik een type checkbox input field met label "trouwboek"
  En zie ik een vier type radio button input fields 
  En zie ik een inactief "Deze wil ik hebben" button

Scenario: We willen verklaren dat wij een trouwboekje willen
Gegeven dat ik op de "extra" pagina ben
  En dat ik de type checkbox input field met label "trouwboek" zie
Wanneer ik op de checkbox klik
Dan wordt het checkbox ingevuld

Scenario: We willen een van de trouwboekje opties kiezen 
Gegeven dat ik op de "extra" pagina ben
  En dat ik het checkbox heb ingevuld
Wanneer ik op één van de radio buttons klik
Dan wordt alleen dat radio button ingevuld
  En word de button "Deze wil ik hebben" actief

Scenario: We willen onze trouwboekje keuze hebben 
Gegeven dat ik op de "extra" pagina ben
  En dat de "Deze wil ik hebben" button actief is
Wanneer ik op "Deze wil ik hebben" button klik
Dan word ik naar de "voorgenomen-huwelijk/checken" pagina gestuurd