# language: nl

## Step 0
Functionaliteit: Gratis Huwelijk/geregistreerd partnerschap
Scenario: Ik wil een huwelijk of geregistreerd partnerschap plannen
Gegeven Ik ben op de utrecht huwelijksplanner pagina #Regel je huwelijk of geregistreerd partnerschap Step 0 
    En Ik kan een Start button zien
Wanneer Ik klik op Start
Dan Ga ik naar de Trouw Opties pagina #step 1

## Step 1
Scenario: Ik wil een huwelijk plannen
Gegeven Ik ben op de Trouw Opties pagina #Trouwen of geregistreerd partnerschap Step 1
    En Ik kan een Trouwen plannen button zien
Wanneer Ik klik op de Trouwen plannen button
Dan Ga ik naar de Trouw Opties Huwelijk pagina #step 2

Scenario: Ik wil een geregistreerd partnerschap plannen
Gegeven Ik ben op de Trouw Opties pagina #Trouwen of geregistreerd partnerschap Step 1 
    En Ik kan een Geregistreerd partnerschap plannen button zien
Wanneer Ik klik op de Geregistreerd partnerschap plannen button
Dan Ga ik naar de Trouw Opties Geregistreerd partnerschap pagina  #Step 2

## Step 2
Scenario: Ik wil zien op welk datum ik kan trouwen
Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
    En Er is een Trouwdatum input field date op de pagina
Wanneer Ik de kalender icon klikt 
Dan Ik kan de beschikbare trouwdatums zien

Scenario: Ik wil zien op welk datum ik kan trouwen
Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
    En Er is een Trouwdatum input field op de pagina
Wanneer Ik het Trouwdatum input field gefocussed heb
Dan Ik kan de datum handmatig invoeren in de Trouwdatum input field
    En De beschikbare tijdslots voor de ingevoerd datum zien

Scenario: Ik kan mijn gekozen trouwdatum niet selecteren
Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
    En Ik wil binnen de komende twee weken trouwen
    En Er is een Trouwdatum input field op de pagina
Wanneer Ik probeer een niet beschikbaar dag te selecteeren
Dan Zie ik dat ik dat dag niet selecteren kan

Scenario: Ik kan mijn gekozen trouwdatum niet selecteren
Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
    En Ik wil binnen de komende twee weken trouwen
    En Er is een Trouwdatum input field op de pagina
Wanneer Ik probeer een niet beschikbare dag intevullen
Dan Zie ik dat er geen tijdslots checkboxes op de pagina verschijnen

Scenario: Ik wil een trouwdatum selecteren
Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
    En Ik wil niet binnen de komende twee weken trouwen
    En Er is een Trouwdatum input field op de pagina
    En Er zijn beschikbare data voor trouwen
Wanneer Ik een beschikbare dag selecteer
Dan De datum wordt op de input field gezet

Scenario: Ik wil een tijdslot selecteren
Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
    En Ik heb een beschikbare dag gekozen
    En Ik zie tijdslot checkbox opties voor trouwen op de geselecteerde dag
Wanneer Ik kan de gewenste tijdslot checkbox klikken
Dan De tijdslot checkbox wordt geselecteerd

Scenario: Ik wil mijn gewenste tijd een datum bevestigen
Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
    En Ik heb een beschikbare dag en tijdslot geselecteerd
    En Ik zie een Ja, dit wil ik! button
Wanneer Ik op de button klikt
Dan Ga ik naar de Voorgenomen Huwelijk pagina #Step 3

Scenario: Ik wil in over een jaar trouwen
Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
Wanneer Ik probeer een datum over een jaar te selecteren
Dan Ik kan geen datum selecteren
    En Ik krijg een melding om een datum tussen een jaar te selecteren

#Scenario: Er is geen gewenste tijd een datum die bij me passen
#Gegeven Ik ben op de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
#    En Ik heb de beschikbare dagen en tijdsloten gezien 
#Wanneer Ik op cancel klik (Geen van de data mij passen)***
#Dan Ik verlaat de website 

## Step 3
Scenario: Ik wil naar de DigID login pagina
Gegeven Ik ben op de Voorgenomen Huwelijk pagina #Eenvoudig trouwen Step 3
    En Ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En Ik zie een Inloggen met DigID button
Wanneer Ik op de button klikt
Dan Ik word naar de DigID login pagina doorgestuurd #Step 3

Scenario: Ik wil Partner 1 met DigID inloggen
Gegeven Ik ben op de DigID Login pagina #Inloggen bij DigID Step 3
    En Partner 1 heeft een DigID konto
    En Ik zie de DigID Inloggen interface 
    En Ik zie de DigID inloggen opties buttons   #<---Meer info TBD
Wanneer Ik klik op een van de inloggen opties
Dan Partner 1 wordt ingeloggd met DigID
    En Ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd

Scenario: Ik wil de DigID inloggen annuleren
Gegeven Ik ben op de DigID login pagina #Inloggen bij DigID Step 3
    En Ik zie de DigID Inloggen interface 
    En Ik zie een Annuleren button
Wanneer Ik klik op de Annuleren button
Dan Ik word teruggestuurd naar de Voorgenomen Huwelijk pagina

Scenario: Ik wil een DigID konto hebben
Gegeven Ik ben op de DigID Login pagina #Inloggen bij DigID Step 3
    En Ik heb geen DigID konto
    En Ik zie de  Nog geen DigID? Vraag uw DigiD aan link op de pagina
Wanneer Ik klik op de link
Dan Ik ga naar een pagina waarin ik een DigID kan krijgen

Scenario: Ik wil de basisgegevens van Partner 1 bevestigen
Gegeven Ik ben op de Persoonsgegevens voor Partner 1 pagina # Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En De persoonsgegevens van Partner 1 zijn juist
    En De adresgegevens van Partner 1 zijn juist

Scenario: De basis gegevens van Partner 1 kloppen niet
Gegeven Ik ben op de Persoonsgegevens voor Partner 1 pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En De basisgegevens van Partner 1 zijn niet juist
    En Ik zie een Neem contact op met de gemeente link
Wanneer Ik op de Neem contact op met de gemeente link klikt
Dan Ik ga naar de Persoonsgegevens opvragen of aanpassen (BRP) pagina 

Scenario: Ik wil het telefoonnummer van Partner 1 invullen
Gegeven Ik ben op de Persoonsgegevens voor Partner 1 pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie een input field voor het telefoonnummer van Partner 1
Wanneer Ik in de input field het telefoonnummer van Partner 1 invullt
Dan Wordt het getypte nummer gecontroleerd voor geldigheid

Scenario: Ik wil het telefoonnummer van Partner 1 bewerken
Gegeven Ik ben op de Persoonsgegevens voor Partner 1 pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie een input field voor het telefoonnummer van Partner 1
    En Ik heb al een nummer in de input field getypt
Wanneer Ik in de input field klikt 
Dan Kan ik het getypte nummer bewerken 
    En Wordt het getypte nummer gecontroleerd voor geldigheid

Scenario: Ik wil de email van Partner 1 invullen
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een input field voor de email van Partner 1
Wanneer Ik in de input field de email van Partner 1 invullt
Dan Wordt het getypte email gecontroleerd voor geldigheid

Scenario: Ik wil de email van Partner 1 bewerken
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een input field voor de email van Partner 1
    En Ik heb al een email in de input field getypt
Wanneer Ik in de input field klikt
Dan Kan ik het getypte email bewerken  
    En Wordt het getypte email gecontroleerd voor geldigheid

Scenario: Ik Partner 1 wil verklaren dat ik niet getrouwd ben
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een checkbox voor de alleenstaand verklaring van Partner 1
Wanneer Ik op de checkbox klikt
Dan Wordt het checkbox ingevuld

Scenario: Ik Partner 1 wil mijn alleenstaand verklaring terugnemen
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een getikte checkbox voor de alleenstaand verklaring van Partner 1
Wanneer Ik op de checkbox klikt
Dan Wordt het checkbox leeg

Scenario: Ik Partner 1 wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie een checkbox voor de niet familie trouwen verklaring voor Partner 1
Wanneer Ik op de checkbox klikt
Dan Wordt het checkbox ingevuld

Scenario: Ik Partner 1 wil mijn verklaring dat ik niet binnen mijn familie ga trouwen terugnemen
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een getikte checkbox voor de niet familie trouwen verklaring  van Partner 1
Wanneer Ik op de checkbox klikt
Dan Wordt het checkbox leeg

Scenario: Ik Partner 1 wil iemand in mijn familie trouwen
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een checkbox voor de niet familie trouwen verklaring van Partner 1
    En Ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer Ik op de Bel 14 030 link klikt
Dan Ik neem contact met de gemeente zodat ik Partner 1 een familieleden kan trouwen

Scenario: Ik Partner 1 wil iemand in mijn familie trouwen
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een checkbox voor de niet familie trouwen verklaring van Partner 1
    En Ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer Ik op de Chat met ons link klikt
Dan Ik neem contact met de gemeente zodat ik Partner 1 een familieleden kan trouwen

Scenario: Ik Partner 1 wil al de gegevens in het formulier bevestigen
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een checkbox voor de gegevensbevestiging van Partner 1 
    En Al de ingevulde gegevens in het formulier kloppen
Wanneer Ik op de gegevensbevestiging checkbox klikt
Dan Wordt het checkbox ingevuld

Scenario: Ik Partner 1 wil mijn bevestiging dat al de gegevens in het formulier kloppen terugnemen
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie een ingevulde checkbox voor de gegevensbevestiging van Partner 1 
Wanneer Ik op de checkbox klikt
Dan Wordt de checkbox leeg

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    #En Ik heb al mijn contactgegevens ingevuld
    En Ik heb al de verklaring checkboxes ingevuld
    En Ik heb de gegevensbevestiging checkbox ingevuld
    En Ik zie een Contactgegevens opslaan button
Wanneer Ik op de Contactgegevens opslaan button klikt
Dan Ik word naar de Voorgenomen Huwelijk Partner pagina gestuurd

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    #En Ik heb al mijn contactgegevens ingevuld
    En Ik zie de verklaring en bevestiging checkboxes op de pagina
    En Ik heb nog niet de allenstand verklaring checkbox ingevuld
    En Ik zie een Contactgegevens opslaan button
Wanneer Ik op de Contactgegevens opslaan button klikt
Dan Ik krijg een Please tick this box if you want to proceed popup #Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    #En Ik heb al mijn contactgegevens ingevuld
    En Ik zie de verklaring en bevestiging checkboxes op de pagina
    En Ik heb nog niet de allenstand verklaring checkbox ingevuld
    En Ik zie een Contactgegevens opslaan button
    En Ik heb de Contactgegevens opslaan button geklikt
    En Ik heb een Please tick this box if you want to proceed popup gekgregen
Wanneer Ik op de allenstand verklaring checkbox klikt
Dan Wordt de alleenstaand verklaring checkbox ingevuld #Wat is de naam van dit in het Nederlands?


Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    #En Ik heb al mijn contactgegevens ingevuld
    En Ik zie de verklaring en bevestiging checkboxes op de pagina
    En Ik heb nog niet de verklaring dat ik niet binnen mijn familie ga trouwen checkbox ingevuld
    En Ik zie een Contactgegevens opslaan button
Wanneer Ik op de Contactgegevens opslaan button klikt
Dan Ik krijg een Please tick this box if you want to proceed popup #Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    #En Ik heb al mijn contactgegevens ingevuld
    En Ik zie de verklaring en bevestiging checkboxes op de pagina
    En Ik heb nog niet de verklaring dat ik niet binnen mijn familie ga trouwen checkbox ingevuld
    En Ik zie een Contactgegevens opslaan button
    En Ik heb de Contacgegevens opslaan button geklikt
    En Ik heb een Please tick this box if you want to proceed popup gekgregen
Wanneer Ik op de verklaring dat ik niet binnen mijn familie ga trouwen verklaring checkbox klikt
Dan Wordt de verklaring dat ik niet binnen mijn familie ga trouwen checkbox ingevuld #Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    #En Ik heb al mijn contactgegevens ingevuld
    En Ik zie de verklaring en bevestiging checkboxes op de pagina
    En Ik heb nog niet de bevestiging dat al de gegevens in het formulier kloppen checkbox ingevuld
    En Ik zie een Contactgegevens opslaan button
Wanneer Ik op de Contactgegevens opslaan button klikt
Dan Ik krijg een Please tick this box if you want to proceed popup #Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    #En Ik heb al mijn contactgegevens ingevuld
    En Ik zie de verklaring en bevestiging checkboxes op de pagina
    En Ik heb nog niet de bevestiging dat al de gegevens in het formulier kloppen checkbox ingevuld
    En Ik zie een Contactgegevens opslaan button
    En Ik heb de Contacgegevens opslaan button geklikt
    En Ik heb een Please tick this box if you want to proceed popup gekgregen
Wanneer Ik op de bevestiging dat al de gegevens in het formulier kloppen checkbox klikt
Dan Wordt de bevestiging dat al de gegevens in het formulier kloppen checkbox ingevuld #Wat is de naam van dit in het Nederlands?

Scenario: Ik wil Partner 2 voor de huwelijk melden
Gegeven Ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een Partner inloggen met DigID button 
Wanneer Ik op de button klikt
Dan Ik word naar de DigIDlogin pagina doorgestuurd #Step 3
-----
Scenario: Ik wil Partner 2 met DigID inloggen
Gegeven Ik ben op de DigID login pagina #Inloggen bij DigID Step 3
Wanneer Ik login met een DigID konto
    En Het is een ander login als dat van partner 1
Dan Mijn partner wordt ingeloggd met DigID
!!!
Scenario: Ik wil Partner 1 met DigID inloggen
Gegeven Ik ben op de DigID Login pagina #Inloggen bij DigID Step 3
    En Partner 1 heeft een DigID konto
    En Ik zie de DigID Inloggen interface 
    En Ik zie de DigID inloggen opties buttons   #<---Meer info TBD
Wanneer Ik klik op een van de inloggen opties
Dan Partner 1 wordt ingeloggd met DigID
    En Ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd

Scenario: Ik wil mijn partner voor de huwelijk melden!!!
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een  mail een uitnodiging aan je partner link
Wanneer Ik op de link klikt
Dan Ik word naar de Partner Uitnodigen pagina doorgestuurd #Step 3

Scenario: Ik wil mijn partners gegevens invullen voor een DigID login uitnodiging 
Gegeven Ik ben op de Partner Uitnodigen pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een  name input field
    En Ik zie een email input field
    En Ik zie een Verstuur uitnodiging button
Wanneer Ik de input fields invul
Dan Word de ingevulde informatie laten zien op de input fields #Step 3

Scenario: Ik wil mijn partner een uitnodiging voor een DigID login sturen
Gegeven Ik ben op de Partner Uitnodigen pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik heb de partner gegevens input fields ingevuld
Wanneer Ik op de Verstuur uitnodiging button klikt
Dan Word een uitnodiging voor en DigID login email naar mijn partner gestuurd
    En Ik word naar de Partner Success pagina gestuurd #Step 3

Scenario: Ik wil mijn email bekijken
Gegeven Ik ben op de Partner Success pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een text waarin staat we wachten voor de login van partner 2
    En Ik zie een button Bekijk e-mail voor aanvrager
Wanneer Ik op de button klikt
Dan Ik word naar de Aanvrager email pagina gestuurd #Step 3

Scenario: Ik wil met de huwelijksaanvraag doorgaan
Gegeven Ik ben op de Aanvrager email pagina #Eenvoudig trouwen Step 3
    En Ik zie de correcte naam van partner 1
    En Ik zie een button Doorgaan huwelijksaanvraag
Wanneer Ik op de button klikt
Dan Ik word naar de Getuigen pagina gestuurd#Step 3
    
Scenario: Ik wil de email van mijn partner bekijken
Gegeven Ik ben op de Partner Success pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een text waarin staat we wachten voor de login van partner 2
    En Ik zie een button Bekijk e-mail voor partner
Wanneer Ik op de button klikt
Dan Ik word naar de Invitation Email Partner pagina gestuurd #Step 3

Scenario: Partner 2 met DigID inloggen
Gegeven Ik ben op de Invitation Email Partner pagina #Eenvoudig trouwen Step 3
    En Ik zie de correcte naam van partner 2
    En Ik zie een button Inloggen met DigID
Wanneer Ik op de button klikt
Dan Ik word naar de DigIDlogin pagina doorgestuurd #Step 3

Scenario: Ik wil een DigID inloggen uitnodiging per email naar partner 2 stuuren
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik zie een name input field 
    En Ik zie een email input field
Wanneer Ik vul in de gegevens van partner 2 
Dan Wordt het getypte email gecontroleerd voor geldigheid #Step 3
    En Ik krijg een bevestiging dat de e-mail is verzonden

!!!!!
Scenario: Ik, Partner 2, wil mijn basisgegevens bevestigen***
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2  #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Mijn persoonsgegevens zijn juist
    En Mijn adresgegevens zijn juist

Scenario: Ik, Partner 2, wil mijn gegevens bevestigen
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Mijn gegevens zijn niet juist
Wanneer Ik op Neem contact op met de gemeente klikt
Dan Ik ga naar een pagina waarin ik mijn gegevens kan laten bekend zijn

Scenario: Ik, Partner 2, wil mijn telefoonnummer invullen
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik zie een input field voor mijn telefoonnummer
Wanneer Ik in een input field mijn telefoonnummer typt
Dan Wordt het getypte nummer gecontroleerd voor geldigheid

Scenario: Ik, Partner 2, wil mijn email invullen
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik zie een input field voor mijn email
Wanneer Ik in een input field mijn email typt
Dan Wordt het getypte email gecontroleerd voor geldigheid

Scenario: Ik, Partner 2, wil verklaren dat ik niet getrouwd ben
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik zie een checkbox voor de alleenstaEn verklaring
Wanneer Ik op de checkbox tikt
Dan Wordt het checkbox ingevuld

Scenario: Ik, Partner 2, wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik zie een checkbox voor de niet familie trouwen verklaring
Wanneer Ik op de checkbox tikt
Dan Wordt het checkbox ingevuld

Scenario: Ik, Partner 2, wil iemand in mijn familie trouwen
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2#Eenvoudig trouwen Step 3
    En Ik zie een checkbox voor de niet familie trouwen verklaring
    En Ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer Ik op een van de contactmogelijkehen links klikt
Dan Ik neem contact met de gemeente om mijn familieleden te kunnen trouwen

Scenario: Ik, Partner 2, wil al de gegevens in het formulier bevestigen
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Al de ingevulde gegevens in het formulier kloppen
Wanneer Ik op de gegevensbevestiging checkbox tikt
Dan Wordt het checkbox ingevuld

Scenario: Ik, Partner 2, wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik heb al mijn contactgegevens ingevuld
    En Ik heb al de verklering checkboxes getikt
Wanneer Ik op de Contactgegevens opslaan button klikt
Dan Ik ga naar een pagina waarin ik kan bevestigen de gegevens van Partner 2 zijn gekoppeld met die van Partner 1

Scenario: Gekoppeling van gegevens bevestigen
Gegeven Ik ben op de Persoonsgegevens Succes pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie een text waar het staat de gegevens van de twee partners aijn gekoppeld


Scenario: Ik, wil getuigen uitnodigen
Gegeven Ik ben op de Persoonsgegevens Succes pagina voor Partner 2 #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie een text waar het staat de gegevens van de twee partners aijn gekoppeld
Wanneer Ik op de Nodig getuigen uit button klikt
Dan Ik word naar de Getuigen pagina gestuurd#Step 3

Scenario: Getuigen gegevens invullen
Gegeven Ik ben op de Getuigen pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie tussen 2 en 4 input field sets voor de namen en emails van de getuigen 
Wanneer Ik in een input field klikt
Dan Kan ik de input fields met de gegevens van de getuigen invullen #Step 3

Scenario: Getuigens email controlleren
Gegeven Ik ben op de Getuigen pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie tussen 2 en 4 input field sets voor de namen en emails van de getuigen 
Wanneer Ik in een input field klikt
Dan Kan ik de gegevens van de getuigen invullen #Step 3
    En Wordt de getypte email gecontroleerd voor geldigheid

Scenario: Verzenden van getuigen uitnodigingen
Gegeven Ik ben op de Getuigen pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik heb tenminste 1 paar van input fields ingevuld 
    En De ingevulde email is geldig 
Wanneer Ik op de Verstuur uitnodiging button klikt
Dan Ik word naar de Getuigen Succes pagina gestuurd #Step 3
    
Scenario: Ik wil de gemeente laten mijn huwelijks verzoek checken
Gegeven Ik ben op de Getuigen Succespagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
Wanneer Ik op de Laat de gemeente checken en ga betalen button klikt
Dan Ik word naar de Voorgenomen Huwelijk Checken pagina gestuurd #Step 3
#Hoelang moet man wachten? Ga ik direct naar de volgende pagina zoals bij de draft website? Wat gebeurt als er iets mis is (email, phonecall, anders)? 

Scenario: Ik wil voor mij huwelijk betalen
Gegeven Ik ben op de Voorgenomen Huwelijk Checken pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
Wanneer Ik op de Ga betalen button klikt
Dan Ik word naar de Voorgenomen Huwelijk Betalen pagina gestuurd #Step 3

Scenario: Ik wil met iDEAL voor mij huwelijk betalen
Gegeven Ik ben op de Voorgenomen Huwelijk Betalen pagina #Eenvoudig trouwen Step 3
    En Ik zie Gemeente Utrecht als de korrekte begunstigde
    En Ik zie de kosten voor de huwelijk
Wanneer Ik op de icoon van mijn bank X klikt
Dan Ik word naar de X bank betaling pagina gestuurd #Step 3

Scenario: Ik wil mijn betaling with bank X voltooien
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 3
    En X
    En X
Wanneer X
Dan Ik word naar de X bank betaling pagina gestuurd #Step 3

Scenario: Ik wil mijn huwelijk betaling ontvangen bevestigen
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen   

Scenario: Ik wil informatie over het Stadskantoor Utrecht locatie
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen 
Wanneer Ik op de link Stadskantoor Utrecht link klikt
Dan Ik word naar de Contact Stadskantoor pagina gestuurd #Step 5

Scenario: Ik wil de huwelijk annuleeren
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen 
Wanneer Ik op de Annuleer huwelijk link klikt
Dan Ik word naar de Huwelijksplanner Cancel pagina gestuurd #Step 5

Scenario: Ik wil de huwelijksreservering annuleeren
Gegeven Ik ben op de Huwelijksplanner Cancel pagina #Eenvoudig trouwen Step 5 
Wanneer Ik op de Annuleer reservering button klikt
Dan Ik word naar de "Annuleer reservering bevestiging" pagina gestuurd #Step 5

Scenario: Ik wil de huwelijksreservering annuleeren
Gegeven Ik ben op de Huwelijksplanner Cancel pagina #Eenvoudig trouwen Step 5 
Wanneer Ik op de Nee, ik wil terug naar het overzicht button klikt
Dan Ik word naar de Betalen Succes pagina gestuurd #Step 5

Scenario: Ik wil de gegevens van Partner 1 aanpassen 
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen 
Wanneer Ik op een van de Aanpassen links van de contactgegevens van Partner 1 klikt
Dan Ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd # Step 3

Scenario: Ik wil terug gaan naar de Melding Voorgenomen Huwelijk pagina gaan  
Gegeven Ik ben op de Persoonsgegevens voor Partner 1 pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik heb voor de huwelijk al betaald
    En Ik zie een link Ga terug naar de Melding Voorgenomen Huwelijk pagina 
Wanneer Ik op de Ga terug naar de Melding Voorgenomen Huwelijk pagina klikt
Dan Ik word naar de Betalen Succes pagina gestuurd # Step 5

Scenario: Ik wil de gegevens van Partner 2 aanpassen 
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen 
Wanneer Ik op een van de Aanpassen links van de contactgegevens van Partner 2 klikt
Dan Ik word naar de Persoonsgegevens voor Partner 2 pagina gestuurd # Step 3

Scenario: Ik wil terug gaan naar de Melding Voorgenomen Huwelijk pagina gaan  
Gegeven Ik ben op de Persoonsgegevens voor Partner 2 pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik heb voor de huwelijk al betaald
    En Ik zie een link Ga terug naar de Melding Voorgenomen Huwelijk pagina 
Wanneer Ik op de Ga terug naar de Melding Voorgenomen Huwelijk pagina klikt
Dan Ik word naar de Betalen Succes pagina gestuurd # Step 5

Scenario: Ik wil de gegevens van getuige 1 aanpassen 
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen 
Wanneer Ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klikt
Dan Ik word naar de Getuigen pagina gestuurd # Step 3
    En De gegeven van getuig 1 verwezen door de geklikte link woordt gefocuseerd

Scenario: Ik wil de gegevens van getuige 2 aanpassen 
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen 
Wanneer Ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klikt
Dan Ik word naar de Getuigen pagina gestuurd # Step 3
    En De gegeven van getuig 2 verwezen door de geklikte link woordt gefocuseerd
                    
Scenario: Ik wil de gegevens van getuige 3 aanpassen 
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen 
    En Er zijn contactgegevens voorhanden voor Getuig 3
Wanneer Ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klikt
Dan Ik word naar de Getuigen pagina gestuurd # Step 3
    En De gegeven van getuig 3 verwezen door de geklikte link woordt gefocuseerd

Scenario: Ik wil de gegevens van getuige 4 aanpassen 
Gegeven Ik ben op de Betalen Succes pagina #Eenvoudig trouwen Step 5
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie als text GELUKT Betaling ontvangen 
    En Er zijn contactgegevens voorhanden voor Getuig 4
Wanneer Ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klikt
Dan Ik word naar de Getuigen pagina gestuurd # Step 3
    En De gegeven van getuig 3 verwezen door de geklikte link woordt gefocuseerd

*Should there be a version of this for partner 1 and another for Partner 2??
line 235 partner 2 
* is the getuig uitnodiging pagina voor elk partner anders? IT'S THE SAME
* witnesses webpage does not allow input
--
* If I right click open a button, will my data still be there in the new window? ScenarioGUERKIN ANNOTATIONS POSSIBLE ??
* line 340 ?? missing part is automatic part is "manual 1 pag succes one page niet succes page wait pagina"
cancel extra boekje goedkopere huwelijk voor elk los ding scenario
* line X hoe kan ik mijn betaling cancellen?
* line 377 english version says Cancel de ceremony, dutch version says Annuleer huwelijk :/
* line 382 shouldn't it say " Annuleer huwelijk reservering" instead? like in the next scenario WEIRD  INFO STILL THERE DATE COMES LATER 
* line 391 links 404
* back to wedding extras...
write as i would it expect it to be 
aanpassen links to specif related page linked
#not real sites between ""
*line 395 zou dit linken aan de vorige pagina van step 3? want dan moet man nog een keer al de andere stapen doorlopen PLUS, man komt terug naar de betaling pagina, maar mat heeft al betaald
* line 427 getuigen wat als de user de gegevens voor getuigens 1 en 3 of 3 en 4 invuuld (not in order)? mag dat? worden de getuigen geregistreerd als 3 en 4 of worden ze gemaakt naar 1 en 2?
* line 18 andere feature file for geregistreerde partnerschap???