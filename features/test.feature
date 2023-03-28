# language: nl

Functionaliteit: Gratis Huwelijk 
@e2e
## stap "0" 
Scenario: Ik wil een huwelijk plannen proces beginnen
Gegeven dat ik ben op de "utrecht huwelijksplanner" pagina 
    En ik zie de heading "Regel je huwelijk of geregistreerd partnerschap" 
    //En ik ben op stap "0" 
    En ik kan een "Start" button zien
Wanneer ik op de "Start" button klik
Dan word ik naar de "trouw opties" pagina gestuurd 
    En ik ben op stap 1 
    #add quotation marks around the "1"

## stap "1" 
Scenario: Ik wil een huwelijk als trouw optie kiezen 
Gegeven dat ik ben op de "/trouw-opties" pagina 
    En ik zie de heading "Trouwen of geregistreerd partnerschap"
    En ik ben op stap "1" 
    En ik kan een "Trouwen plannen" button zien
Wanneer ik op de "Trouwen plannen" button klik
Dan word ik naar de "trouw opties huwelijk" pagina gestuurd 
    En ik ben op stap "2"

## stap "2" 
Scenario: Ik wil zien op welk datum ik kan trouwen door op de kalendericoon te klikken
Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik op de kalender icon klik
Dan kan ik de beschikbare trouwdatums zien

Scenario: Ik wil zien op welk datum ik kan trouwen door een datum in te vullen
Gegeven dat ik ben op de "trouw opties huwelijk" pagina 
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik het "Trouwdatum" datum prikker gefocussed heb
Dan kan ik een datum handmatig invullen in de "Trouwdatum" datum prikker
    En ik kan de beschikbare tijdslots voor de ingevulde datum zien

Scenario: Ik kan mijn gekozen trouwdatum niet selecteren
Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik wil binnen de komende twee weken trouwen
    En ik de kalender icon heb geklikt
    En ik kan de beschikbare trouwdatums zien
Wanneer ik probeer een niet beschikbaar dag te selecteeren
Dan zie ik dat ik dat dag niet selecteren kan

Scenario: Ik kan tijdslots voor mijn gekozen trouwdatum niet selecteren
Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik wil binnen de komende twee weken trouwen
    En ik heb het datum prikker gefocuseerd
Wanneer ik probeer een niet beschikbare dag intevullen
Dan zie ik dat er geen tijdslots checkbox opties op de pagina verschijnen

Scenario: Ik wil een trouwdatum selecteren
Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En er zijn beschikbare data voor trouwen
Wanneer ik een beschikbare dag selecteer
Dan wordt de datum op de datum prikker gezet

Scenario: Ik wil een tijdslot selecteren
Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik heb een beschikbare dag geselecteerd
    En ik zie tijdslot checkbox opties voor trouwen op de geselecteerde dag
Wanneer ik op de gewenste tijdslot checkbox klik
Dan de tijdslot checkbox wordt geselecteerd

Scenario: Ik wil mijn gewenste tijd een datum bevestigen
Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik heb een beschikbare dag geselecteerd
    En ik heb een beschikbare tijdslot geselecteerd
    En ik kan een "Ja, dit wil ik!" button zien
Wanneer ik op de "Ja, dit wil ik!" button klik
Dan word ik naar de "voorgenomen huwelijk" pagina gestuurd 
    En ik ben op stap "3" 

Scenario: Ik wil in over een jaar trouwen
Gegeven dat ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik kan de beschikbare trouwdatums zien 
Wanneer ik probeer een datum over een jaar te selecteren
Dan kan ik geen datum selecteren
    En ik krijg een melding om een datum tussen een jaar te selecteren

## stap "3" 
Scenario: Ik wil naar de DigID login pagina
Gegeven dat ik ben op de Voorgenomen Huwelijk pagina #Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie een Inloggen met DigID button
Wanneer ik op de button klikt
Dan ik word naar de DigID login pagina doorgestuurd #stap " " 3

Scenario: Ik wil Partner 1 met DigID inloggen
Gegeven dat ik ben op de DigID Login pagina #Inloggen bij DigID stap " " 3
    En Partner 1 heeft een DigID konto
    En ik zie de DigID Inloggen interface 
    En ik zie de DigID inloggen opties buttons   #<---Meer info TBD
Wanneer ik klik op een van de inloggen opties
Dan Partner 1 word ingeloggd met DigID
    En ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd

Scenario: Ik wil de DigID inloggen annuleren
Gegeven dat ik ben op de DigID login pagina #Inloggen bij DigID stap " " 3
    En ik zie de DigID Inloggen interface 
    En ik zie een Annuleren button
Wanneer ik klik op de Annuleren button
Dan ik word teruggestuurd naar de Voorgenomen Huwelijk pagina

Scenario: Ik wil een DigID konto hebben
Gegeven dat ik ben op de DigID Login pagina #Inloggen bij DigID stap " " 3
    En ik heb geen DigID konto
    En ik zie de  Nog geen DigID? Vraag uw DigiD aan link op de pagina
Wanneer ik klik op de link
Dan ik word naar een pagina waarin ik een DigID kan krijgen gestuurd

Scenario: Ik wil de basisgegevens van Partner 1 bevestigen
Gegeven dat ik ben op de Persoonsgegevens voor Partner 1 pagina # stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En De persoonsgegevens van Partner 1 zijn juist
    En De adresgegevens van Partner 1 zijn juist

Scenario: De basis gegevens van Partner 1 kloppen niet
Gegeven dat ik ben op de Persoonsgegevens voor Partner 1 pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En De basisgegevens van Partner 1 zijn niet juist
    En ik zie een Neem contact op met de gemeente link
Wanneer ik op de Neem contact op met de gemeente link klikt
Dan ik word naar de Persoonsgegevens opvragen of aanpassen (BRP) pagina gestuurd

Scenario: Ik wil het telefoonnummer van Partner 1 invullen
Gegeven dat ik ben op de Persoonsgegevens voor Partner 1 pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie een input field voor het telefoonnummer van Partner 1
Wanneer ik in de input field het telefoonnummer van Partner 1 invullt
Dan Het ingevulde nummer wordt gecontroleerd voor geldigheid

Scenario: Ik wil het telefoonnummer van Partner 1 bewerken
Gegeven dat ik ben op de Persoonsgegevens voor Partner 1 pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie een input field voor het telefoonnummer van Partner 1
    En ik heb al een nummer in de input field ingevuld
Wanneer ik in de input field klik 
Dan Kan ik het ingevulde nummer bewerken 
    En Het ingevulde nummer wordt gecontroleerd voor geldigheid

Scenario: Ik wil de email van Partner 1 invullen
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een input field voor de email van Partner 1
Wanneer ik in de input field de email van Partner 1 invullt
Dan Het ingevulde email wordt gecontroleerd voor geldigheid

Scenario: Ik wil de email van Partner 1 bewerken
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een input field voor de email van Partner 1
    En ik heb al een email in de input field ingevuld
Wanneer ik in de input field klik
Dan Kan ik het ingevulde email bewerken  
    En Het ingevulde email wordt gecontroleerd voor geldigheid

Scenario: Ik Partner 1 wil verklaren dat ik niet getrouwd ben
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een checkbox voor de alleenstaand verklaring van Partner 1
Wanneer ik op de checkbox klikt
Dan Het checkbox wordt ingevuld

Scenario: Ik Partner 1 wil mijn alleenstaand verklaring terugnemen
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een getikte checkbox voor de alleenstaand verklaring van Partner 1
Wanneer ik op de checkbox klikt
Dan Het checkbox wordt leeg

Scenario: Ik Partner 1 wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie een checkbox voor de niet familie trouwen verklaring voor Partner 1
Wanneer ik op de checkbox klikt
Dan Het checkbox wordt ingevuld

Scenario: Ik Partner 1 wil mijn verklaring dat ik niet binnen mijn familie ga trouwen terugnemen
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een getikte checkbox voor de niet familie trouwen verklaring  van Partner 1
Wanneer ik op de checkbox klikt
Dan Het checkbox wordtleeg

Scenario: Ik Partner 1 wil iemand in mijn familie trouwen
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een checkbox voor de niet familie trouwen verklaring van Partner 1
    En ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer ik op de Bel 14 030 link klikt
Dan ik neem contact met de gemeente zodat ik Partner 1 een familieleden kan trouwen

Scenario: Ik Partner 1 wil iemand in mijn familie trouwen
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een checkbox voor de niet familie trouwen verklaring van Partner 1
    En ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer ik op de Chat met ons link klikt
Dan ik neem contact met de gemeente zodat ik Partner 1 een familieleden kan trouwen

Scenario: Ik Partner 1 wil al de gegevens in het formulier bevestigen
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een checkbox voor de gegevensbevestiging van Partner 1 
    En Al de ingevulde gegevens in het formulier kloppen
Wanneer ik op de gegevensbevestiging checkbox klikt
Dan Het checkbox wordt ingevuld

Scenario: Ik Partner 1 wil mijn bevestiging dat al de gegevens in het formulier kloppen terugnemen
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie een ingevulde checkbox voor de gegevensbevestiging van Partner 1 
Wanneer ik op de checkbox klikt
Dan De checkbox wordt leeg

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik heb al de verklaring checkboxes ingevuld
    En ik heb de gegevensbevestiging checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
Wanneer ik op de Contactgegevens opslaan button klikt
Dan ik word naar de Voorgenomen Huwelijk Partner pagina gestuurd

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de allenstand verklaring checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
Wanneer ik op de Contactgegevens opslaan button klikt
Dan ik krijg een Please tick this box if you want to proceed popup #Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de allenstand verklaring checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
    En ik heb de Contactgegevens opslaan button geklikt
    En ik heb een Please tick this box if you want to proceed popup gekgregen
Wanneer ik op de allenstand verklaring checkbox klikt
Dan De alleenstaand verklaring checkbox wordt ingevuld #Wat is de naam van dit in het Nederlands?


Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de verklaring dat ik niet binnen mijn familie ga trouwen checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
Wanneer ik op de Contactgegevens opslaan button klikt
Dan ik krijg een Please tick this box if you want to proceed popup #Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de verklaring dat ik niet binnen mijn familie ga trouwen checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
    En ik heb de Contacgegevens opslaan button geklikt
    En ik heb een Please tick this box if you want to proceed popup gekgregen
Wanneer ik op de verklaring dat ik niet binnen mijn familie ga trouwen verklaring checkbox klikt
Dan De verklaring dat ik niet binnen mijn familie ga trouwen checkbox wordt ingevuld #Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de bevestiging dat al de gegevens in het formulier kloppen checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
Wanneer ik op de Contactgegevens opslaan button klikt
Dan ik krijg een Please tick this box if you want to proceed popup #Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de bevestiging dat al de gegevens in het formulier kloppen checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
    En ik heb de Contacgegevens opslaan button geklikt
    En ik heb een Please tick this box if you want to proceed popup gekgregen
Wanneer ik op de bevestiging dat al de gegevens in het formulier kloppen checkbox klikt
Dan De bevestiging dat al de gegevens in het formulier kloppen checkbox wordt ingevuld #Wat is de naam van dit in het Nederlands?

Scenario: Ik wil Partner 2 voor de huwelijk melden
Gegeven dat ik ben op de Persoonsgegevens pagina #Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een Partner inloggen met DigID button 
Wanneer ik op de Partner inloggen met DigID button klikt
Dan ik word naar de DigIDlogin pagina doorgestuurd #stap " " 3
#-----!!!
Scenario: Ik wil Partner 2 met DigID inloggen
Gegeven dat ik ben op de DigID login pagina #Inloggen bij DigID stap " " 3
Wanneer ik login met een DigID konto
    En Het is een ander login als dat van partner 1
Dan Mijn partner wordt ingeloggd met DigID
!!!
Scenario: Ik wil Partner 1 met DigID inloggen
Gegeven dat ik ben op de DigID Login pagina #Inloggen bij DigID stap " " 3
    En Partner 1 heeft een DigID konto
    En ik zie de DigID Inloggen interface 
    En ik zie de DigID inloggen opties buttons   #<---Meer info TBD
Wanneer ik klik op een van de inloggen opties
Dan Partner 1 word ingeloggd met DigID
    En ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd

Scenario: Ik wil mijn partner voor de huwelijk melden!!!
Gegeven dat ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een  mail een uitnodiging aan je partner link
Wanneer ik op de link klikt
Dan ik word naar de Partner Uitnodigen pagina doorgestuurd #stap " " 3

Scenario: Ik wil mijn partners gegevens invullen voor een DigID login uitnodiging 
Gegeven dat ik ben op de Partner Uitnodigen pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een  name input field
    En ik zie een email input field
    En ik zie een Verstuur uitnodiging button
Wanneer ik de input fields invul
Dan Word de ingevulde informatie laten zien op de input fields #stap " " 3

Scenario: Ik wil mijn partner een uitnodiging voor een DigID login sturen
Gegeven dat ik ben op de Partner Uitnodigen pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik heb de partner gegevens input fields ingevuld
Wanneer ik op de Verstuur uitnodiging button klik
Dan Word een uitnodiging voor en DigID login email naar mijn partner gestuurd
    En ik word naar de Partner Success pagina gestuurd #stap " " 3

Scenario: Ik wil mijn email bekijken
Gegeven dat ik ben op de Partner Success pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een text waarin staat we wachten voor de login van partner 2
    En ik zie een button Bekijk e-mail voor aanvrager
Wanneer ik op de button klikt
Dan ik word naar de Aanvrager email pagina gestuurd #stap " " 3

Scenario: Ik wil met de huwelijksaanvraag doorgaan
Gegeven dat ik ben op de Aanvrager email pagina #Eenvoudig trouwen stap " " 3
    En ik zie de correcte naam van partner 1
    En ik zie een button Doorgaan huwelijksaanvraag
Wanneer ik op de button klikt
Dan ik word naar de Getuigen pagina gestuurd#stap " " 3
    
Scenario: Ik wil de email van mijn partner bekijken
Gegeven dat ik ben op de Partner Success pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En ik zie een text waarin staat we wachten voor de login van partner 2
    En ik zie een button Bekijk e-mail voor partner
Wanneer ik op de button klikt
Dan ik word naar de Invitation Email Partner pagina gestuurd #stap " " 3

Scenario: Partner 2 met DigID inloggen
Gegeven dat ik ben op de Invitation Email Partner pagina #Eenvoudig trouwen stap " " 3
    En ik zie de correcte naam van partner 2
    En ik zie een button Inloggen met DigID
Wanneer ik op de button klikt
Dan ik word naar de DigIDlogin pagina doorgestuurd #stap " " 3

Scenario: Ik wil een DigID inloggen uitnodiging per email naar partner 2 stuuren
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik zie een name input field 
    En ik zie een email input field
Wanneer ik de gegevens van partner 2 invul
Dan Het getypte email wordt gecontroleerd voor geldigheid #stap " " 3
    En ik krijg een bevestiging dat de e-mail is verzonden

!!!!!
Scenario: Ik, Partner 2, wil mijn basisgegevens bevestigen***
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2  #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Mijn persoonsgegevens zijn juist
    En Mijn adresgegevens zijn juist

Scenario: Ik, Partner 2, wil mijn gegevens bevestigen
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Mijn gegevens zijn niet juist
Wanneer ik op Neem contact op met de gemeente klikt
Dan ik word naar een pagina waarin ik mijn gegevens kan laten bekend zijn gestuurd

Scenario: Ik, Partner 2, wil mijn telefoonnummer invullen
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik zie een input field voor mijn telefoonnummer
Wanneer ik in een input field mijn telefoonnummer invul
Dan Het getypte nummer wordt gecontroleerd voor geldigheid

Scenario: Ik, Partner 2, wil mijn email invullen
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik zie een input field voor mijn email
Wanneer ik in een input field mijn email invul
Dan De getypte email wordt gecontroleerd voor geldigheid

Scenario: Ik, Partner 2, wil verklaren dat ik niet getrouwd ben
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik zie een checkbox voor de alleenstaEn verklaring
Wanneer ik op de checkbox tikt
Dan Het checkbox wordt ingevuld

Scenario: Ik, Partner 2, wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik zie een checkbox voor de niet familie trouwen verklaring
Wanneer ik op de checkbox tikt
Dan Het checkbox wordt ingevuld

Scenario: Ik, Partner 2, wil iemand in mijn familie trouwen
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2#Eenvoudig trouwen stap " " 3
    En ik zie een checkbox voor de niet familie trouwen verklaring
    En ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer ik op een van de contactmogelijkehen links klikt
Dan ik neem contact met de gemeente om mijn familieleden te kunnen trouwen

Scenario: Ik, Partner 2, wil al de gegevens in het formulier bevestigen
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En Al de ingevulde gegevens in het formulier kloppen
Wanneer ik op de gegevensbevestiging checkbox tikt
Dan Het checkbox wordt ingevuld

Scenario: Ik, Partner 2, wil mijn contactgegevens opslaan
Gegeven dat ik ben op de Persoonsgegevens pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik heb al mijn contactgegevens ingevuld
    En ik heb al de verklering checkboxes getikt
Wanneer ik op de Contactgegevens opslaan button klikt
Dan ik word naar een pagina waarin ik kan bevestigen de gegevens van Partner 2 zijn gekoppeld met die van Partner 1 gestuurd

Scenario: Gekoppeling van gegevens bevestigen
Gegeven dat ik ben op de Persoonsgegevens Succes pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie een text waar het staat de gegevens van de twee partners aijn gekoppeld


Scenario: Ik, wil getuigen uitnodigen
Gegeven dat ik ben op de Persoonsgegevens Succes pagina voor Partner 2 #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie een text waar het staat de gegevens van de twee partners aijn gekoppeld
Wanneer ik op de Nodig getuigen uit button klikt
Dan ik word naar de Getuigen pagina gestuurd#stap " " 3

Scenario: Getuigen gegevens invullen
Gegeven dat ik ben op de Getuigen pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie tussen 2 en 4 input field sets voor de namen en emails van de getuigen 
Wanneer ik in een input field klik
Dan Kan ik de input fields met de gegevens van de getuigen invullen #stap " " 3

Scenario: Getuigens email controlleren
Gegeven dat ik ben op de Getuigen pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie tussen 2 en 4 input field sets voor de namen en emails van de getuigen 
Wanneer ik in een input field klik
Dan Kan ik de gegevens van de getuigen invullen #stap " " 3
    En De getypte email wordt gecontroleerd voor geldigheid

Scenario: Verzenden van getuigen uitnodigingen
Gegeven dat ik ben op de Getuigen pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik heb tenminste 1 paar van input fields ingevuld 
    En De ingevulde email is geldig 
Wanneer ik op de Verstuur uitnodiging button klikt
Dan ik word naar de Getuigen Succes pagina gestuurd #stap " " 3
    
Scenario: Ik wil de gemeente laten mijn huwelijks verzoek checken
Gegeven dat ik ben op de Getuigen Succes pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
Wanneer ik op de Laat de gemeente checken en ga betalen button klikt
Dan ik word naar de Voorgenomen Huwelijk Checken pagina gestuurd #stap " " 3
#Hoelang moet man wachten? Ga ik direct naar de volgende pagina zoals bij de draft website? Wat gebeurt als er iets mis is (email, phonecall, anders)? 
#-----!!!
Scenario: Ik wil voor mij huwelijk betalen
Gegeven dat ik ben op de Voorgenomen Huwelijk Checken pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
Wanneer ik op de Ga betalen button klikt
Dan ik word naar de Voorgenomen Huwelijk Betalen pagina gestuurd #stap " " 3

Scenario: Ik wil met iDEAL voor mij huwelijk betalen
Gegeven dat ik ben op de Voorgenomen Huwelijk Betalen pagina #Eenvoudig trouwen stap " " 3
    En ik zie Gemeente Utrecht als de korrekte begunstigde
    En ik zie de kosten voor de huwelijk
Wanneer ik op de icoon van mijn bank X klikt
Dan ik word naar de X bank betaling pagina gestuurd #stap " " 3

Scenario: Ik wil mijn betaling with bank X voltooien
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 3
    En X
    En X
Wanneer X
Dan ik word naar de X bank betaling pagina gestuurd #stap " " 3

Scenario: Ik wil mijn huwelijk betaling ontvangen bevestigen
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen   

Scenario: Ik wil informatie over het Stadskantoor Utrecht locatie
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen 
Wanneer ik op de link Stadskantoor Utrecht link klikt
Dan ik word naar de Contact Stadskantoor pagina gestuurd #stap " " 5

Scenario: Ik wil de huwelijk annuleeren
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen 
Wanneer ik op de Annuleer huwelijk link klikt
Dan ik word naar de Huwelijksplanner Cancel pagina gestuurd #stap " " 5

Scenario: Ik wil de huwelijksreservering annuleeren
Gegeven dat ik ben op de Huwelijksplanner Cancel pagina #Eenvoudig trouwen stap " " 5 
Wanneer ik op de Annuleer reservering button klikt
Dan ik word naar de "Annuleer reservering bevestiging" pagina gestuurd #stap " " 5

Scenario: Ik wil de huwelijksreservering annuleeren
Gegeven dat ik ben op de Huwelijksplanner Cancel pagina #Eenvoudig trouwen stap " " 5 
Wanneer ik op de Nee, ik wil terug naar het overzicht button klikt
Dan ik word naar de Betalen Succes pagina gestuurd #stap " " 5

Scenario: Ik wil de gegevens van Partner 1 aanpassen 
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen 
Wanneer ik op een van de Aanpassen links van de contactgegevens van Partner 1 klikt
Dan ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd # stap " " 3

Scenario: Ik wil terug gaan naar de Melding Voorgenomen Huwelijk pagina gaan  
Gegeven dat ik ben op de Persoonsgegevens voor Partner 1 pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik heb voor de huwelijk al betaald
    En ik zie een link Ga terug naar de Melding Voorgenomen Huwelijk pagina 
Wanneer ik op de Ga terug naar de Melding Voorgenomen Huwelijk pagina klikt
Dan ik word naar de Betalen Succes pagina gestuurd # stap " " 5

Scenario: Ik wil de gegevens van Partner 2 aanpassen 
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen 
Wanneer ik op een van de Aanpassen links van de contactgegevens van Partner 2 klikt
Dan ik word naar de Persoonsgegevens voor Partner 2 pagina gestuurd # stap " " 3

Scenario: Ik wil terug gaan naar de Melding Voorgenomen Huwelijk pagina gaan  
Gegeven dat ik ben op de Persoonsgegevens voor Partner 2 pagina #Eenvoudig trouwen stap " " 3
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik heb voor de huwelijk al betaald
    En ik zie een link Ga terug naar de Melding Voorgenomen Huwelijk pagina 
Wanneer ik op de Ga terug naar de Melding Voorgenomen Huwelijk pagina klikt
Dan ik word naar de Betalen Succes pagina gestuurd # stap " " 5

Scenario: Ik wil de gegevens van getuige 1 aanpassen 
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen 
Wanneer ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klikt
Dan ik word naar de Getuigen pagina gestuurd # stap " " 3
    En De gegeven van getuig 1 verwezen door de geklikte link wordt gefocuseerd

Scenario: Ik wil de gegevens van getuige 2 aanpassen 
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen 
Wanneer ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klikt
Dan ik word naar de Getuigen pagina gestuurd # stap " " 3
    En De gegeven van getuig 2 verwezen door de geklikte link wordt gefocuseerd
                    
Scenario: Ik wil de gegevens van getuige 3 aanpassen 
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen 
    En Er zijn contactgegevens voorhanden voor Getuig 3
Wanneer ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klikt
Dan ik word naar de Getuigen pagina gestuurd # stap " " 3
    En De gegeven van getuig 3 verwezen door de geklikte link wordt gefocuseerd

Scenario: Ik wil de gegevens van getuige 4 aanpassen 
Gegeven dat ik ben op de Betalen Succes pagina #Eenvoudig trouwen stap " " 5
    En ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En ik zie de kosten voor de huwelijk
    En ik zie als text GELUKT Betaling ontvangen 
    En Er zijn contactgegevens voorhanden voor Getuig 4
Wanneer ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klikt
Dan ik word naar de Getuigen pagina gestuurd # stap " " 3
    En De gegeven van getuig 3 verwezen door de geklikte link wordt gefocuseerd

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
*line 395 zou dit linken aan de vorige pagina van stap 3? want dan moet man nog een keer al de andere stapen doorlopen PLUS, man komt terug naar de betaling pagina, maar mat heeft al betaald
* line 427 getuigen wat als de user de gegevens voor getuigens 1 en 3 of 3 en 4 invuuld (not in order)? mag dat? worden de getuigen geregistreerd als 3 en 4 of worden ze gemaakt naar 1 en 2?
* line 18 andere feature file for geregistreerde partnerschap???