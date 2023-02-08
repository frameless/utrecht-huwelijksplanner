
## Step 0
Feature: Gratis Huwelijk/geregistreerd partnerschap
Scenario: Ik wil een huwelijk of geregistreerd partnerschap plannen
Given Ik ben op de utrecht huwelijksplanner pagina #Regel je huwelijk of geregistreerd partnerschap Step 0 
    And Ik kan een Start button zien
When Ik klik op Start
Then Ga ik naar de "Trouwen of geregistreerd partnerschap" pagina #step 1

## Step 1
Scenario: Ik wil een huwelijk plannen
Given Ik ben op de trouwopties pagina #Trouwen of geregistreerd partnerschap Step 1
    And Ik kan een Trouwen plannen button zien
When Ik klik op de Trouwen plannen button
Then Ga ik naar de pagina "Wanneer en Hoe" sectie voor huwelijken #step 2

Scenario: Ik wil een geregistreerd partnerschap plannen
Given Ik ben op de trouwopties pagina #Trouwen of geregistreerd partnerschap Step 1 
    And Ik kan een Geregistreerd Partnerschap plannen button zien
When Ik kies een geregistreerd partnerschap button
Then Ga ik naar de pagina "Wanneer en Hoe" sectie voor geregistreerd partnerschap #step 2

## Step 2
Scenario: Ik wil zien wanneer ik kan trouwen
Given Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    And Er is een input field date op de pagina
When Ik de kalender icon klikt 
Then Ik kan de beschikbare data zien

Scenario: Ik wil zien wanneer ik kan trouwen
Given Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    And Er is een input field date op de pagina
When Ik het input field gefocussed heb
Then Ik kan de datum handmatig invoeren
    And De beschikbare data voor de ingevoerd datum zien

Scenario: Ik wil een trouwdatum selecteren
Given Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    And Ik wil in de komende twee weken trouwen
When Ik probeer de beschikbare dag te selecteeren
Then Zie ik dat ik dat niet kan

Scenario: Ik wil een trouwdatum selecteren
Given Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    And Ik wil niet in de komende twee weken trouwen
    And Er zijn beschikbare data voor trouwen
When Ik kan de beschikbare dag selecteeren
Then De datum wordt op de input field gezet

Scenario: Ik wil een tijdslot selecteren
Given Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    And Ik heb een beschikbare dag geselecteerd
When Ik kan het gewenste tijdslot klikken
Then Het tijdslot wordt geselecteerd

Scenario: Ik wil mijn gewenste tijd een datum bevestigen
Given Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    And Ik heb een beschikbare dag en tijdslot geselecteerd
    And Ik zie een bevestiging button
When Ik mijn keuze bevestig
Then Ga ik naar de "Eenvoudig trouwen" pagina #Step 3

Scenario: Ik wil pas over een jaar trouwen
Given Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
When Ik probeer een datum over een jaar te selecteren
Then Ik kan geen datum selecteren

Scenario: Er is geen gewenste tijd een datum die bij me passen
Given Ik ben op de trouwopties huwelijk pagina #Wanneer en Hoe Step 2
    And Ik heb de beschikbare dagen en tijdsloten gezien 
When Ik op cancel klik (Geen van de data mij passen)***
Then Ik verlaat de website 

## Step 3
Scenario: Ik wil mijn gewenste tijd een datum bevestigen
Given Ik ben op de voorgenomen-huwelijk pagina #Eenvoudig trouwen Step 3
    And Ik zie de correcte vroeger geselecteerde tijd en datum combinatie 
    And Ik zie een Inloggen met DigID button
When Ik klik op de button
Then Ik word naar de DigIDlogin pagina doorgestuurd #Step 3

***2 people choose the same date, what happens?
***How long is the data available in this session?

Scenario: Ik wil met DigID inloggen
Given Ik ben op de DigID login pagina #Eenvoudig trouwen Step 3
    And Ik heb een DigID konto
    And Ik zie de inloggen opties #Meer info TBD
When Ik klik op een van de opties
Then Ik word ingeloggd met DigID

Scenario: Ik wil de DigID inloggen annuleren
Given Ik ben op de DigID login pagina #Eenvoudig trouwen Step 3
When Ik klik op annuleren
Then Word ik teruggestuurd naar de voorgenomen-huwelijk pagina
***zie ik mijn gegevens weer terug??

Scenario: Ik wil een DigID konto hebben
Given Ik ben op de DigID login pagina #Eenvoudig trouwen Step 3
    And Ik heb geen DigID konto
    And Ik zie een link "Nog geen DigID? Vraag uw DigiD aan" in de pagina
When Ik klik op de link
Then Ik ga naar en pagina waarin ik mijn DigID kan krijgen

Scenario: Ik wil mijn gegevens bevestigen
Given Ik ben op de Persoonsgegevens pagina #Eenvoudig trouwen Step 3
    And Ik zie de korrekte vroeger geselecteerde tijd een datum combinatie 
    And Mijn gegevens zijn juist
When 
Then 

Feature: Eenvoudig huwelijk/partnerschap
Scenario:

Feature: Flits- en baliehuwelijk/partnerschap, variant op eenvoudig
Scenario:

Kies tussen trouwen en geregistreerd partnerschap
Kies een datum en tijd voor de bijeenkomst
Log in met je DigiD
Je partner logt ook in met DigID
Nodig getuigen uit
Betaal met iDEAL
Je datum is geregeld
