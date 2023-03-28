# language: nl
Functionaliteit: Gratis Huwelijk 

## stap "0" 
@e2e
Scenario: Ik wil een huwelijk plannen proces beginnen
Gegeven dat ik op de "utrecht huwelijksplanner" pagina ben
    En ik zie de heading "Regel je huwelijk of geregistreerd partnerschap" 
    #En ik ben op stap "0" 
    En ik kan een "Start" button zien
Wanneer ik op de "Start" button klik
Dan word ik naar de "trouw opties" pagina gestuurd 
    En ik ben op stap 1 
    #add quotation marks around the "1"

## stap "1" 
Scenario: Ik wil een huwelijk als trouw optie kiezen 
Gegeven ik ben op de "/trouw-opties" pagina 
    En ik zie de heading "Trouwen of geregistreerd partnerschap"
    En ik ben op stap "1" 
    En ik kan een "Trouwen plannen" button zien
Wanneer ik op de "Trouwen plannen" button klik
Dan word ik naar de "trouw opties huwelijk" pagina gestuurd 
    En ik ben op stap "2"

## stap "2" 
Scenario: Ik wil zien op welk datum ik kan trouwen door op de kalendericoon te klikken
Gegeven ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik op de kalender icon klik
Dan kan ik de beschikbare trouwdatums zien

Scenario: Ik wil zien op welk datum ik kan trouwen door een datum in te vullen
Gegeven ik ben op de "trouw opties huwelijk" pagina 
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik het "Trouwdatum" datum prikker gefocust heb
Dan kan ik een datum handmatig invullen in de "Trouwdatum" datum prikker
    En ik kan de beschikbare tijdsloten voor de ingevulde datum zien

Scenario: Ik kan mijn gekozen trouwdatum niet selecteren
Gegeven ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik wil binnen de komende twee weken trouwen
    En ik de kalender icon heb geklik
    En ik kan de beschikbare trouwdatums zien
Wanneer ik probeer een niet beschikbare dag te selecteren
Dan zie ik dat ik dat dag niet selecteren kan

Scenario: Ik kan tijdsloten voor mijn gekozen trouwdatum niet selecteren
Gegeven ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik wil binnen de komende twee weken trouwen
    En ik heb de datum prikker geopend
Wanneer ik probeer een niet beschikbare dag in te vullen
Dan zie ik dat er geen tijdsloten checkbox opties op de pagina verschijnen

Scenario: Ik wil een trouwdatum selecteren
Gegeven ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En er zijn beschikbare data voor trouwen
Wanneer ik een beschikbare dag selecteer
Dan wordt de datum op de datum prikker gezet

Scenario: Ik wil een tijdslot selecteren
Gegeven ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik heb een beschikbare dag geselecteerd
    En ik zie tijdslot checkbox opties voor trouwen op de geselecteerde dag
Wanneer ik op de gewenste tijdslot checkbox klik
Dan de tijdslot checkbox wordt geselecteerd

Scenario: Ik wil mijn gewenste tijd en datum bevestigen
Gegeven ik ben op de "trouw opties huwelijk" pagina  
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
Gegeven ik ben op de "trouw opties huwelijk" pagina  
    En ik zie de heading "Wanneer en Hoe"
    En ik ben op stap "2"
    En er is een "Trouwdatum" datum prikker op de pagina
    En ik kan de beschikbare trouwdatums zien 
Wanneer ik probeer een datum over een jaar te selecteren
Dan kan ik geen datum selecteren
    En ik krijg een melding om een datum tussen een jaar te selecteren

## stap "3" 
Scenario: Ik wil naar de DigID login pagina
Gegeven ik ben op de Voorgenomen Huwelijk pagina #Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie een Inloggen met DigID button
Wanneer ik op de button klik
Dan ik word naar de DigID login pagina doorgestuurd 
# stap " " 3

Scenario: Ik wil Partner 1 met DigID inloggen
Gegeven ik ben op de DigID Login pagina 
# Inloggen bij DigID stap " " 3
    En Partner 1 heeft een DigID 
    En ik zie de DigID Inloggen interface 
    En ik zie de DigID inloggen opties buttons   
# <---Meer info TBD
Wanneer ik klik op een van de inloggen opties
Dan Partner 1 word ingelogd met DigID
    En ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd

Scenario: Ik wil de DigID inloggen annuleren
Gegeven ik ben op de DigID login pagina 
# Inloggen bij DigID stap " " 3
    En ik zie de DigID Inloggen interface 
    En ik zie een Annuleren button
Wanneer ik klik op de Annuleren button
Dan ik word teruggestuurd naar de Voorgenomen Huwelijk pagina

Scenario: Ik wil een DigID hebben
Gegeven ik ben op de DigID Login pagina 
# Inloggen bij DigID stap " " 3
    En ik heb geen DigID
    En ik zie de  Nog geen DigID? Vraag uw DigiD aan link op de pagina
Wanneer ik klik op de link
Dan ik word naar een pagina waarin ik een DigID kan krijgen gestuurd

Scenario: Ik wil de basisgegevens van Partner 1 bevestigen
Gegeven ik ben op de Persoonsgegevens voor Partner 1 pagina 
#  stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En De persoonsgegevens van Partner 1 zijn juist
    En De adresgegevens van Partner 1 zijn juist

Scenario: De basis gegevens van Partner 1 kloppen niet
Gegeven ik ben op de Persoonsgegevens voor Partner 1 pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En De basisgegevens van Partner 1 zijn niet juist
    En ik zie een Neem contact op met de gemeente link
Wanneer ik op de Neem contact op met de gemeente link klik
Dan ik word naar de Persoonsgegevens opvragen of aanpassen (BRP) pagina gestuurd

Scenario: Ik wil het telefoonnummer van Partner 1 invullen
Gegeven ik ben op de Persoonsgegevens voor Partner 1 pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie een input field voor het telefoonnummer van Partner 1
Wanneer ik in de input field het telefoonnummer van Partner 1 invul
Dan Het ingevulde nummer wordt gecontroleerd voor geldigheid

Scenario: Ik wil het telefoonnummer van Partner 1 bewerken
Gegeven ik ben op de Persoonsgegevens voor Partner 1 pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie een input field voor het telefoonnummer van Partner 1
    En ik heb al een nummer in de input field ingevuld
Wanneer ik in de input field klik 
Dan Kan ik het ingevulde nummer bewerken 
    En Het ingevulde nummer wordt gecontroleerd voor geldigheid

Scenario: Ik wil de e-mail van Partner 1 invullen
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een input field voor de e-mail van Partner 1
Wanneer ik in de input field de e-mail van Partner 1 invul
Dan Het ingevulde e-mail wordt gecontroleerd voor geldigheid

Scenario: Ik wil de e-mail van Partner 1 bewerken
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een input field voor de e-mail van Partner 1
    En ik heb al een e-mail in de input field ingevuld
Wanneer ik in de input field klik
Dan Kan ik het ingevulde e-mail bewerken  
    En Het ingevulde e-mail wordt gecontroleerd voor geldigheid

Scenario: Ik Partner 1 wil verklaren dat ik niet getrouwd ben
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een checkbox voor de alleenstaand verklaring van Partner 1
Wanneer ik op de checkbox klik
Dan Het checkbox wordt ingevuld

Scenario: Ik Partner 1 wil mijn alleenstaand verklaring terugnemen
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een gecheckte checkbox voor de alleenstaand verklaring van Partner 1
Wanneer ik op de checkbox klik
Dan Het checkbox wordt leeg

Scenario: Ik Partner 1 wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie een checkbox voor de niet familie trouwen verklaring voor Partner 1
Wanneer ik op de checkbox klik
Dan Het checkbox wordt ingevuld

Scenario: Ik Partner 1 wil mijn verklaring dat ik niet binnen mijn familie ga trouwen terugnemen
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een gecheckte checkbox voor de niet familie trouwen verklaring  van Partner 1
Wanneer ik op de checkbox klik
Dan Het checkbox wordt leeg

Scenario: Ik Partner 1 wil iemand in mijn familie trouwen
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een checkbox voor de niet familie trouwen verklaring van Partner 1
    En ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer ik op de Bel 14 030 link klik
Dan ik neem contact met de gemeente zodat ik Partner 1 een familieleden kan trouwen

Scenario: Ik Partner 1 wil iemand in mijn familie trouwen
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een checkbox voor de niet familie trouwen verklaring van Partner 1
    En ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer ik op de Chat met ons link klik
Dan ik neem contact met de gemeente zodat ik Partner 1 een familieleden kan trouwen

Scenario: Ik Partner 1 wil al de gegevens in het formulier bevestigen
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een checkbox voor de gegevensbevestiging van Partner 1 
    En Al de ingevulde gegevens in het formulier kloppen
Wanneer ik op de gegevensbevestiging checkbox klik
Dan Het checkbox wordt ingevuld

Scenario: Ik Partner 1 wil mijn bevestiging dat al de gegevens in het formulier kloppen terugnemen
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie een ingevulde checkbox voor de gegevensbevestiging van Partner 1 
Wanneer ik op de checkbox klik
Dan De checkbox wordt leeg

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik heb al de verklaring checkboxes ingevuld
    En ik heb de gegevensbevestiging checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
Wanneer ik op de Contactgegevens opslaan button klik
Dan ik word naar de Voorgenomen Huwelijk Partner pagina gestuurd

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de alleenstaandenverklaring checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
Wanneer ik op de Contactgegevens opslaan button klik
Dan ik krijg een Please tick this box if you want to proceed popup 
# Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de alleenstaandenverklaring checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
    En ik heb de Contactgegevens opslaan button geklik
    En ik heb een Please tick this box if you want to proceed popup gekregen
Wanneer ik op de alleenstaandenverklaring checkbox klik
Dan De alleenstaand verklaring checkbox wordt ingevuld 
# Wat is de naam van dit in het Nederlands?


Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de verklaring dat ik niet binnen mijn familie ga trouwen checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
Wanneer ik op de Contactgegevens opslaan button klik
Dan ik krijg een Please tick this box if you want to proceed popup 
# Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de verklaring dat ik niet binnen mijn familie ga trouwen checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
    En ik heb de Contactgegevens opslaan button geklik
    En ik heb een Please tick this box if you want to proceed popup gekregen
Wanneer ik op de verklaring dat ik niet binnen mijn familie ga trouwen verklaring checkbox klik
Dan De verklaring dat ik niet binnen mijn familie ga trouwen checkbox wordt ingevuld 
# Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    #En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de bevestiging dat al de gegevens in het formulier kloppen checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
Wanneer ik op de Contactgegevens opslaan button klik
Dan ik krijg een Please tick this box if you want to proceed popup 
# Wat is de naam van dit in het Nederlands?

Scenario: Ik Partner 1 wil mijn contactgegevens opslaan
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    # En ik heb al mijn contactgegevens ingevuld
    En ik zie de verklaring en bevestiging checkboxes op de pagina
    En ik heb nog niet de bevestiging dat al de gegevens in het formulier kloppen checkbox ingevuld
    En ik zie een Contactgegevens opslaan button
    En ik heb de Contactgegevens opslaan button geklik
    En ik heb een Please tick this box if you want to proceed popup gekregen
Wanneer ik op de bevestiging dat al de gegevens in het formulier kloppen checkbox klik
Dan De bevestiging dat al de gegevens in het formulier kloppen checkbox wordt ingevuld 
# Wat is de naam van dit in het Nederlands?

Scenario: Ik wil Partner 2 voor het huwelijk  melden
Gegeven ik ben op de Persoonsgegevens pagina 
# Melding Voorgenomen Huwelijk stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een Partner inloggen met DigID button 
Wanneer ik op de Partner inloggen met DigID button klik
Dan ik word naar de DigID login pagina doorgestuurd 
# stap " " 3
#-----!!!
Scenario: Ik wil Partner 2 met DigID inloggen
Gegeven ik ben op de DigID login pagina 
# Inloggen bij DigID stap " " 3
Wanneer ik login met een DigID 
    En Het is een ander login als dat van partner 1
Dan Mijn partner wordt ingelogd met DigID
#-----!!!
Scenario: Ik wil Partner 1 met DigID inloggen
Gegeven ik ben op de DigID Login pagina 
# Inloggen bij DigID stap " " 3
    En Partner 1 heeft een DigID 
    En ik zie de DigID Inloggen interface 
    En ik zie de DigID inloggen opties buttons   
# <---Meer info TBD
Wanneer ik klik op een van de inloggen opties
Dan Partner 1 word ingelogd met DigID
    En ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd

Scenario: Ik wil mijn partner voor het huwelijk  melden!!!
Gegeven ik ben op de Persoonsgegevens pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een  mail een uitnodiging aan je partner link
Wanneer ik op de link klik
Dan ik word naar de Partner Uitnodigen pagina doorgestuurd 

# stap " " 3

Scenario: Ik wil mijn partners gegevens invullen voor een DigID login uitnodiging 
Gegeven ik ben op de Partner Uitnodigen pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een  name input field
    En ik zie een e-mail input field
    En ik zie een Verstuur uitnodiging button
Wanneer ik de input fields invul
Dan Word de ingevulde informatie laten zien op de input fields 
# stap " " 3

Scenario: Ik wil mijn partner een uitnodiging voor een DigID login sturen
Gegeven ik ben op de Partner Uitnodigen pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik heb de partner gegevens input fields ingevuld
Wanneer ik op de Verstuur uitnodiging button klik
Dan Word een uitnodiging voor en DigID login e-mail naar mijn partner gestuurd
    En ik word naar de Partner Success pagina gestuurd 
# stap " " 3

Scenario: Ik wil mijn e-mail bekijken
Gegeven ik ben op de Partner Success pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een tekst waarin staat we wachten voor de login van partner 2
    En ik zie een button Bekijk e-mail voor aanvrager
Wanneer ik op de button klik
Dan ik word naar de Aanvrager e-mail pagina gestuurd 
# stap " " 3

Scenario: Ik wil met het huwelijk saanvraag doorgaan
Gegeven ik ben op de Aanvrager e-mail pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte naam van partner 1
    En ik zie een button Doorgaan huwelijksaanvraag
Wanneer ik op de button klik
Dan ik word naar de Getuigen pagina gestuurd
# stap " " 3
    
Scenario: Ik wil de e-mail van mijn partner bekijken
Gegeven ik ben op de Partner Success pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie
    En ik zie een tekst waarin staat we wachten voor de login van partner 2
    En ik zie een button Bekijk e-mail voor partner
Wanneer ik op de button klik
Dan ik word naar de Invitation Email Partner pagina gestuurd 
# stap " " 3

Scenario: Partner 2 met DigID inloggen
Gegeven ik ben op de Invitation Email Partner pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte naam van partner 2
    En ik zie een button Inloggen met DigID
Wanneer ik op de button klik
Dan ik word naar de DigID login pagina doorgestuurd 
# stap " " 3

Scenario: Ik wil een DigID inloggen uitnodiging per e-mail naar partner 2 stuuren
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik zie een name input field 
    En ik zie een e-mail input field
Wanneer ik de gegevens van partner 2 invul
Dan Het getypte e-mail wordt gecontroleerd voor geldigheid 
# stap " " 3
    En ik krijg een bevestiging dat de e-mail is verzonden

!!!!!
Scenario: Ik, Partner 2, wil mijn basisgegevens bevestigen***
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2  
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En Mijn persoonsgegevens zijn juist
    En Mijn adresgegevens zijn juist

Scenario: Ik, Partner 2, wil mijn gegevens bevestigen
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En Mijn gegevens zijn niet juist
Wanneer ik op Neem contact op met de gemeente klik
Dan ik word naar een pagina waarin ik mijn gegevens kan laten bekend zijn gestuurd

Scenario: Ik, Partner 2, wil mijn telefoonnummer invullen
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik zie een input field voor mijn telefoonnummer
Wanneer ik in een input field mijn telefoonnummer invul
Dan Het getypte nummer wordt gecontroleerd voor geldigheid

Scenario: Ik, Partner 2, wil mijn e-mail invullen
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik zie een input field voor mijn e-mail
Wanneer ik in een input field mijn e-mail invul
Dan De getypte e-mail wordt gecontroleerd voor geldigheid

Scenario: Ik, Partner 2, wil verklaren dat ik niet getrouwd ben
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik zie een checkbox voor de alleenstaEn verklaring
Wanneer ik op de checkbox tikt
Dan Het checkbox wordt ingevuld

Scenario: Ik, Partner 2, wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik zie een checkbox voor de niet familie trouwen verklaring
Wanneer ik op de checkbox tikt
Dan Het checkbox wordt ingevuld

Scenario: Ik, Partner 2, wil iemand in mijn familie trouwen
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2
#Eenvoudig trouwen stap " " 3
    En ik zie een checkbox voor de niet familie trouwen verklaring
    En ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer ik op een van de contactmogelijkehen links klik
Dan ik neem contact met de gemeente om mijn familieleden te kunnen trouwen

Scenario: Ik, Partner 2, wil al de gegevens in het formulier bevestigen
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En Al de ingevulde gegevens in het formulier kloppen
Wanneer ik op de gegevensbevestiging checkbox tikt
Dan Het checkbox wordt ingevuld

Scenario: Ik, Partner 2, wil mijn contactgegevens opslaan
Gegeven ik ben op de Persoonsgegevens pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik heb al mijn contactgegevens ingevuld
    En ik heb al de verklering checkboxes getikt
Wanneer ik op de Contactgegevens opslaan button klik
Dan ik word naar een pagina waarin ik kan bevestigen de gegevens van Partner 2 zijn gekoppeld met die van Partner 1 gestuurd

Scenario: Gekoppeling van gegevens bevestigen
Gegeven ik ben op de Persoonsgegevens Succes pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie een tekst waar het staat de gegevens van de twee partners aijn gekoppeld


Scenario: Ik, wil getuigen uitnodigen
Gegeven ik ben op de Persoonsgegevens Succes pagina voor Partner 2 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie een tekst waar het staat de gegevens van de twee partners aijn gekoppeld
Wanneer ik op de Nodig getuigen uit button klik
Dan ik word naar de Getuigen pagina gestuurd
# stap " " 3

Scenario: Getuigen gegevens invullen
Gegeven ik ben op de Getuigen pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie tussen 2 en 4 input field sets voor de namen en e-mails van de getuigen 
Wanneer ik in een input field klik
Dan Kan ik de input fields met de gegevens van de getuigen invullen 
# stap " " 3

Scenario: Getuigens e-mail controleren
Gegeven ik ben op de Getuigen pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie tussen 2 en 4 input field sets voor de namen en e-mails van de getuigen 
Wanneer ik in een input field klik
Dan Kan ik de gegevens van de getuigen invullen 
# stap " " 3
    En De getypte e-mail wordt gecontroleerd voor geldigheid

Scenario: Verzenden van getuigen uitnodigingen
Gegeven ik ben op de Getuigen pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik heb tenminste 1 paar van input fields ingevuld 
    En De ingevulde e-mail is geldig 
Wanneer ik op de Verstuur uitnodiging button klik
Dan ik word naar de Getuigen Succes pagina gestuurd 
# stap " " 3
    
Scenario: Ik wil de gemeente laten mijn huwelijks verzoek checken
Gegeven ik ben op de Getuigen Succes pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
Wanneer ik op de Laat de gemeente checken en ga betalen button klik
Dan ik word naar de Voorgenomen Huwelijk Checken pagina gestuurd 
# stap " " 3
#Hoelang moet man wachten? Ga ik direct naar de volgende pagina zoals bij de draft website? Wat gebeurt als er iets mis is (e-mail, phonecall, anders)? 
#-----!!!
Scenario: Ik wil voor mij huwelijk betalen
Gegeven ik ben op de Voorgenomen Huwelijk Checken pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
Wanneer ik op de Ga betalen button klik
Dan ik word naar de Voorgenomen Huwelijk Betalen pagina gestuurd 
# stap " " 3

Scenario: Ik wil met iDEAL voor mij huwelijk betalen
Gegeven ik ben op de Voorgenomen Huwelijk Betalen pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie Gemeente Utrecht als de correcte begunstigde
    En ik zie de kosten voor het huwelijk 
Wanneer ik op de icoon van mijn bank X klik
Dan ik word naar de X bank betaling pagina gestuurd 
# stap " " 3

Scenario: Ik wil mijn betaling with bank X voltooien
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 3
    En X
    En X
Wanneer X
Dan ik word naar de X bank betaling pagina gestuurd 
# stap " " 3

Scenario: Ik wil mijn huwelijk betaling ontvangen bevestigen
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen   

Scenario: Ik wil informatie over het Stadskantoor Utrecht locatie
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen 
Wanneer ik op de link Stadskantoor Utrecht link klik
Dan ik word naar de Contact Stadskantoor pagina gestuurd 
# stap " " 5

Scenario: Ik wil het huwelijk  annuleren
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen 
Wanneer ik op de Annuleer huwelijk link klik
Dan ik word naar de Huwelijksplanner Cancel pagina gestuurd 
# stap " " 5

Scenario: Ik wil het huwelijk sreservering annuleren
Gegeven ik ben op de Huwelijksplanner Cancel pagina 
# Eenvoudig trouwen stap " " 5 
Wanneer ik op de Annuleer reservering button klik
Dan ik word naar de "Annuleer reservering bevestiging" pagina gestuurd 
# stap " " 5

Scenario: Ik wil het huwelijk sreservering annuleren
Gegeven ik ben op de Huwelijksplanner Cancel pagina 
# Eenvoudig trouwen stap " " 5 
Wanneer ik op de Nee, ik wil terug naar het overzicht button klik
Dan ik word naar de Betalen Succes pagina gestuurd 
# stap " " 5

Scenario: Ik wil de gegevens van Partner 1 aanpassen 
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen 
Wanneer ik op een van de Aanpassen links van de contactgegevens van Partner 1 klik
Dan ik word naar de Persoonsgegevens voor Partner 1 pagina gestuurd 
#  stap " " 3

Scenario: Ik wil terug gaan naar de Melding Voorgenomen Huwelijk pagina gaan  
Gegeven ik ben op de Persoonsgegevens voor Partner 1 pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik heb voor het huwelijk  al betaald
    En ik zie een link Ga terug naar de Melding Voorgenomen Huwelijk pagina 
Wanneer ik op de Ga terug naar de Melding Voorgenomen Huwelijk pagina klik
Dan ik word naar de Betalen Succes pagina gestuurd 
#  stap " " 5

Scenario: Ik wil de gegevens van Partner 2 aanpassen 
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen 
Wanneer ik op een van de Aanpassen links van de contactgegevens van Partner 2 klik
Dan ik word naar de Persoonsgegevens voor Partner 2 pagina gestuurd 
#  stap " " 3

Scenario: Ik wil terug gaan naar de Melding Voorgenomen Huwelijk pagina gaan  
Gegeven ik ben op de Persoonsgegevens voor Partner 2 pagina 
# Eenvoudig trouwen stap " " 3
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik heb voor het huwelijk  al betaald
    En ik zie een link Ga terug naar de Melding Voorgenomen Huwelijk pagina 
Wanneer ik op de Ga terug naar de Melding Voorgenomen Huwelijk pagina klik
Dan ik word naar de Betalen Succes pagina gestuurd 
#  stap " " 5

Scenario: Ik wil de gegevens van getuige 1 aanpassen 
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen 
Wanneer ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klik
Dan ik word naar de Getuigen pagina gestuurd 
#  stap " " 3
    En De gegevens van getuige 1 verwezen door de geklikte link krijgen focus

Scenario: Ik wil de gegevens van getuige 2 aanpassen 
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen 
Wanneer ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klik
Dan ik word naar de Getuigen pagina gestuurd 
#  stap " " 3
    En De gegevens van getuige 2 verwezen door de geklikte link krijgen focus
                    
Scenario: Ik wil de gegevens van getuige 3 aanpassen 
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen 
    En Er zijn contactgegevens voorhanden voor Getuige 3
Wanneer ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klik
Dan ik word naar de Getuigen pagina gestuurd 
#  stap " " 3
    En De gegevens van getuige 3 verwezen door de geklikte link krijgen focus

Scenario: Ik wil de gegevens van getuige 4 aanpassen 
Gegeven ik ben op de Betalen Succes pagina 
# Eenvoudig trouwen stap " " 5
    En ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En ik zie de kosten voor het huwelijk 
    En ik zie als tekst GELUKT Betaling ontvangen 
    En Er zijn contactgegevens voorhanden voor Getuige 4
Wanneer ik op een van de Aanpassen links van de contactgegevens van Getuigen 1 klik
Dan ik word naar de Getuigen pagina gestuurd 
#  stap " " 3
    En De gegevens van getuige 3 verwezen door de geklikte link krijgen focus