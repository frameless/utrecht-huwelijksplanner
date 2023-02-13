# language: nl

## Step 0
Functionaliteit: Gratis Huwelijk/geregistreerd partnerschap
Scenario: Ik wil een huwelijk of geregistreerd partnerschap plannen
Gegeven Ik ben op de utrecht huwelijksplanner pagina #Regel je huwelijk of geregistreerd partnerschap Step 0 
    En Ik kan een Start button zien
Wanneer Ik klik op Start
Dan Ga ik naar de "Trouwen of geregistreerd partnerschap" pagina #step 1

## Step 1
Scenario: Ik wil een huwelijk plannen
Gegeven Ik ben op de trouwopties pagina #Trouwen of geregistreerd partnerschap Step 1
    En Ik kan een Trouwen plannen button zien
Wanneer Ik klik op de Trouwen plannen button
Dan Ga ik naar de pagina "Wanneer en Hoe" sectie voor huwelijken #step 2

Scenario: Ik wil een geregistreerd partnerschap plannen
Gegeven Ik ben op de trouwopties pagina #Trouwen of geregistreerd partnerschap Step 1 
    En Ik kan een Geregistreerd Partnerschap plannen button zien
Wanneer Ik kies een geregistreerd partnerschap button
Dan Ga ik naar de pagina "Wanneer en Hoe" sectie voor geregistreerd partnerschap #step 2

## Step 2
Scenario: Ik wil zien wanneer ik kan trouwen
Gegeven Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    En Er is een input field date op de pagina
Wanneer Ik de kalender icon klikt 
Dan Ik kan de beschikbare data zien

Scenario: Ik wil zien wanneer ik kan trouwen
Gegeven Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    En Er is een input field date op de pagina
Wanneer Ik het input field gefocussed heb
Dan Ik kan de datum handmatig invoeren
    En De beschikbare data voor de ingevoerd datum zien

Scenario: Ik wil een trouwdatum selecteren
Gegeven Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    En Ik wil in de komende twee weken trouwen
Wanneer Ik probeer de beschikbare dag te selecteeren
Dan Zie ik dat ik dat niet kan

Scenario: Ik wil een trouwdatum selecteren
Gegeven Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    En Ik wil niet in de komende twee weken trouwen
    En Er zijn beschikbare data voor trouwen
Wanneer Ik kan de beschikbare dag selecteeren
Dan De datum wordt op de input field gezet

Scenario: Ik wil een tijdslot selecteren
Gegeven Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    En Ik heb een beschikbare dag geselecteerd
Wanneer Ik kan het gewenste tijdslot klikken
Dan Het tijdslot wordt geselecteerd

Scenario: Ik wil mijn gewenste tijd een datum bevestigen
Gegeven Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    En Ik heb een beschikbare dag en tijdslot geselecteerd
    En Ik zie een bevestiging button
Wanneer Ik mijn keuze bevestig
Dan Ga ik naar de "Eenvoudig trouwen" pagina #Step 3

Scenario: Ik wil pas over een jaar trouwen
Gegeven Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
Wanneer Ik probeer een datum over een jaar te selecteren
Dan Ik kan geen datum selecteren

Scenario: Er is geen gewenste tijd een datum die bij me passen
Gegeven Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    En Ik heb de beschikbare dagen en tijdsloten gezien 
Wanneer Ik op cancel klik (Geen van de data mij passen)***
Dan Ik verlaat de website 

## Step 3
Scenario: Ik wil naar de DigID login pagina
Gegeven Ik ben op de voorgenomen-huwelijk pagina #Eenvoudig trouwen Step 3
    En Ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    En Ik zie een Inloggen met DigID button
Wanneer Ik klik op de button
Dan Ik word naar de DigIDlogin pagina doorgestuurd #Step 3

Scenario: Ik wil met DigID inloggen
Gegeven Ik ben op de DigID login pagina #Eenvoudig trouwen Step 3
    En Ik heb een DigID konto
    En Ik zie de inloggen opties #Meer info TBD
Wanneer Ik klik op een van de opties
Dan Ik word ingeloggd met DigID

Scenario: Ik wil de DigID inloggen annuleren
Gegeven Ik ben op de DigID login pagina #Eenvoudig trouwen Step 3
Wanneer Ik klik op annuleren
Dan Word ik teruggestuurd naar de voorgenomen-huwelijk pagina

Scenario: Ik wil een DigID konto hebben
Gegeven Ik ben op de DigID login pagina #Eenvoudig trouwen Step 3
    En Ik heb geen DigID konto
    En Ik zie een link "Nog geen DigID? Vraag uw DigiD aan" in de pagina
Wanneer Ik klik op de link
Dan Ik ga naar een pagina waarin ik mijn DigID kan krijgen
 
Scenario: Ik wil mijn basisgegevens bevestigen***
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Mijn persoonsgegevens zijn juist
    En Mijn adresgegevens zijn juist

Scenario: Ik wil mijn gegevens bevestigen
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Mijn gegevens zijn niet juist
Wanneer Ik op Neem contact op met de gemeente klikt
Dan Ik ga naar een pagina waarin ik mijn gegevens kan laten bekend zijn

Scenario: Ik wil mijn telefoonnummer invullen
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie een input field voor mijn telefoonnummer
Wanneer Ik in een input field mijn telefoonnummer typt
Dan Wordt het getypte nummer gecontroleerd voor geldigheid

Scenario: Ik wil mijn email invullen
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie een input field voor mijn email
Wanneer Ik in een input field mijn email typt
Dan Wordt het getypte email gecontroleerd voor geldigheid

Scenario: Ik wil verklaren dat ik niet getrouwd ben
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie een checkbox voor de alleenstaEn verklaring
Wanneer Ik op de checkbox tikt
Dan Wordt het checkbox ingevuld

Scenario: Ik wil verklaren dat ik niet binnen mijn familie ga trouwen
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie een checkbox voor de niet familie trouwen verklaring
Wanneer Ik op de checkbox tikt
Dan Wordt het checkbox ingevuld

Scenario: Ik wil iemand in mijn familie trouwen
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie een checkbox voor de niet familie trouwen verklaring
    En Ik zie een Meer Informatie sectie met contactmogelijkheden links
Wanneer Ik op een van de contactmogelijkehen links klikt
Dan Ik neem contact met de gemeente om mijn familieleden te kunnen trouwen

Scenario: Ik wil al de gegevens in het formulier bevestigen
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Al de ingevulde gegevens in het formulier kloppen
Wanneer Ik op de gegevensbevestiging checkbox tikt
Dan Wordt het checkbox ingevuld

Scenario: Ik wil mijn contactgegevens opslaan
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik heb al mijn contactgegevens ingevuld
    En Ik heb al de verklering checkboxes getikt
Wanneer Ik op de Contactgegevens opslaan button klikt
Dan Ik ga naar een pagina waarin ik mijn partner voor de huwelijk kan melden
voorgenomen-huwelijk/partner

Scenario: Ik wil mijn partner voor de huwelijk melden
Gegeven Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie
    En Ik zie een Partner inloggen met DigID button 
Wanneer Ik op de button klikt
Dan Ik word naar de DigIDlogin pagina doorgestuurd #Step 3

Scenario: Ik wil mijn partner met DigID inloggen
Gegeven Ik ben op de DigID login pagina #Eenvoudig trouwen Step 3
Wanneer Ik login met een DigID konto
    En Het is een ander login als dat van partner 1
Dan Mijn partner wordt ingeloggd met DigID

Scenario: Ik wil mijn partner voor de huwelijk melden
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
Gegeven Ik ben op de Getuigen #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie tussen 2 en 4 input field sets voor de namen en emails van de getuigen 
Wanneer Ik in een input field klikt
Dan Kan ik de input fields met de gegevens van de getuigen invullen #Step 3

Scenario: Getuigens email controlleren
Gegeven Ik ben op de Getuigen #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik zie tussen 2 en 4 input field sets voor de namen en emails van de getuigen 
Wanneer Ik in een input field klikt
Dan Kan ik de gegevens van de getuigen invullen #Step 3
    En Wordt de getypte email gecontroleerd voor geldigheid

Scenario: Verzenden van getuigen uitnodigingen
Gegeven Ik ben op de Getuigen #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
    En Ik heb tenminste 1 paar van input fields ingevuld 
    En De ingevulde email is geldig 
Wanneer Ik op de Verstuur uitnodiging button klikt
Dan Ik word naar de Getuigen Succes pagina gestuurd #Step 3
    
Scenario: 
Gegeven Ik ben op de Getuigen Succes #Eenvoudig trouwen Step 3
    En Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    En Ik zie de kosten voor de huwelijk
Wanneer Ik op de Laat de gemeente checken en ga betalen button klikt
Dan Ik word naar de  pagina gestuurd #Step 3


*Should there be a version of this for partner 1 and another for Partner 2??
line 235 partner 2 
* is the getuig uitnodiging pagina voor elk partner anders? IT'S THE SAME
* witnesses webpage does not allow input