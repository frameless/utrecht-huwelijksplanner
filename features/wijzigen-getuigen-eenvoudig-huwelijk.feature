##timeline 1 waarin je kan al de getuigendata in een keer aanpassen

Abstract Scenario: We willen de getuigensgegevens voor het huwelijk wijzigen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik een "<actie>" link met label "<getuige>" in de getuigen sectie zie
Wanneer ik op een van deze "<actie>" links klik
Dan word ik naar de "voorgenomen-huwelijk/getuigen/anpassen" pagina gestuurd
Voorbeelden: 
    | actie      | getuige   | 
    | Anpassen   | Getuige 1 | 
    | Anpassen   | Getuige 2 | 
    | Anpassen   | Getuige 3 | 
    | Anpassen   | Getuige 4 | 


Scenario: We willen zien dat we op de "voorgenomen-huwelijk/getuigen" pagina zijn 
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
Dan zie ik de heading  "Uitnodiging voor aangepaste getuigen"
  En zie ik vier type text input fields
  En zie ik vier type email input fields
  En zie ik een "Verstuur uitnodiging" button
  En zie ik een "Terug naar het huwelijksoverzicht" link


Scenario: We willen naar het overzicht zonder de getuigen aan te passen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd

Abstract Scenario: We willen de gegevens van elke getuigen aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik de "<nummer>" text input field van "<getuige>" heb met "<name>" ingevuld
Wanneer ik de "<nummer>" email input field de email van "<getuige>" heb met "<email>" ingevuld 
Dan wordt het ingevulde "<email>" gecontroleerd voor geldigheid 
  Voorbeelden: 
    | nummer        | getuige   | name                    | email               | 
    | eerste        | Getuige 1 | Carrie Bradshaw         | carrie@gmail.com    | 
    | tweede        | Getuige 2 | Samantha Jones          | samantha@gmail.com  | 
    | derde         | Getuige 3 | Charlotte York          | charlotte@gmail.com | 
    | vierde        | Getuige 4 | Miranda Hobbes          | miranda@gmail.com   | 


# @validate-flow 
# Abstract Scenario: We willen het "<veld>" van elke partner aanpassen
# Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
#     En dat ik de heading "Betaling ontvangen" zie
#     En dat ik een link "Aanpassen" zie om het "<veld>" van partner "<partner>" aan te passen
#   Wanneer ik op de link "Aanpassen" klik
#   Dan word ik naar de "<pagina>" gestuurd
#     En focus ik op het "<veld>" input field met "<label>"
#   Voorbeelden: 
#     | veld           | partner | pagina                    | label                              |
#     | telefoonnummer | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 |
#     | telefoonnummer | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 |
#     | email          | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 |
#     | email          | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 |


# @validate-flow 
# Abstract Scenario: We willen het "<veld>" van elke partner controleren
# Gegeven dat ik op de "<pagina>" ben
#     En dat ik op het "<veld>" input field met "<label>" ben gefocust
#   Wanneer ik het "<veld>" met "<content>" invul 
#   Dan wordt het ingevulde "<veld>" gecontroleerd voor geldigheid
#   Voorbeelden: 
#     | veld           | partner | pagina                    | label                              | content        |
#     | telefoonnummer | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 | 0612345678     |
#     | telefoonnummer | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 | 0612345678     |
#     | email          | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 | jan@gmail.com  |
#     | email          | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 | jane@gmail.com |

Scenario: We willen de aangepaste uitnodigingen naar de getuigen sturen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik ten minste een set van text en email input fields heb ingevuld
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd
    En krijg ik een bevestiging dat een email uitnodiging naar elk van de getuigen wordt gestuurd



##timeline 2 waarin je aanpast elk de getuigendata individuel
#See also the gegevens-individueel-aanpassen-eenvoudig-huwelijk.feature

@validate-flow 
Abstract Scenario: We willen de getuigensgegevens voor het huwelijk wijzigen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik een "<actie>" link met label "<getuige>" in de getuigen sectie zie
Wanneer ik op een van deze "<actie>" link klik
Dan word ik naar de "voorgenomen-huwelijk/getuigen/anpassen" pagina gestuurd
  En word ik op de input field met het label "<getuige>"  beland
Voorbeelden: 
    | link       | getuige   | 
    | Anpassen   | Getuige 1 | 
    | Anpassen   | Getuige 2 | 
    | Anpassen   | Getuige 3 | 
    | Anpassen   | Getuige 4 | 


@validate-flow 
Scenario: We willen naar het overzicht zonder de getuigen aan te passen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd

@validate-flow 
Abstract Scenario: We willen de gegevens van elke getuigen aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik de "<nummer>" text input field van "<getuige>" heb met "<name>" ingevuld
Wanneer ik de "<nummer>" email input field de email van "<getuige>" heb met "<email>" ingevuld 
Dan wordt het ingevulde "<email>" gecontroleerd voor geldigheid 
  Voorbeelden: 
    | nummer        | getuige   | name                    | email               | 
    | eerste        | Getuige 1 | Carrie Bradshaw         | carrie@gmail.com    | 
    | tweede        | Getuige 2 | Samantha Jones          | samantha@gmail.com  | 
    | derde         | Getuige 3 | Charlotte York          | charlotte@gmail.com | 
    | vierde        | Getuige 4 | Miranda Hobbes          | miranda@gmail.com   | 

@validate-flow 
Scenario: We willen de aangepaste uitnodigingen naar de getuigen sturen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
  En dat ik ten minste een set van text en email input fields heb ingevuld
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd
    En krijg een bevestiging dat een email uitnodiging naar elk van de getuigen wordt gestuurd