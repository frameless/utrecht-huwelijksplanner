# moet man de huwelijk annuleren om naar het begin te gaan een een nieuwe datum te krijgen?
# Ja je kunt in deze MVP nog niet een datum aanpassen in een bestaand huwelijk, dus men moet annuleren en dan opnieuw starten
# moet man met de browser teruggan tot de eerste stap waarin man een trouwdatum kiezt? En wat gebeurt met de betaling en de al uitgenodigd getuigen en Partner 2?
# is de beste oplossing de gemeente te bellen? 
# Die gaat dus nu nog niet werken, een datum aanpassen kan in de MVP nog niet.
# Je kunt dus 2 dingen doen, weglaten of een losse feature file dit als feature zien en uitwerken voor de toekomst.
# Als je dat gaat uitwerken denk ik dat je een aanpassen knopje naast de datum in het overzicht krijgt en dan naar de eerste stap met datum gaat. Daar kun je dan een nieuwe datum en tijd kiezen en dan krijgen de getuigen en partner 2 een mail met de wijziging?


Scenario: We willen de trouwdatum voor de huwelijk wijzigen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik de button "Trouwdatum aanpassen" zie
Wanneer ik op de "Trouwdatum aanpassen" button klik
Dan word ik naar de "trouw-opties/huwelijk" pagina gestuurd

Scenario: We willen de trouwdatum voor de huwelijk aanpassen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik de heading "Wanneer en hoe" zie
    En dat ik de datum prikker "Trouwdatum" op de pagina zie
    En dat ik de disabled button "Ja, dit wil ik!" zie
    En dat ik de link "Terug naar het huwelijksoverzicht"
Wanneer ik op de "Trouwdatum" datum prikker klik
Dan kan ik de beschikbare trouwdatums zien
# the button is disabled because the page sees i already compmleted everything else

Scenario: We willen naar het overzicht zonder de trouwdatum voor de huwelijk aan te passen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd

Scenario: We willen de trouwdatum aanpassen door op de datum prikker te klikken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
  En dat er is een "Trouwdatum" datum prikker op de pagina
  En dat ik heb de datum prikker geopend
Wanneer ik een beschikbare dag selecteer
Dan wordt de datum op de datum prikker gezet
  En kan ik de beschikbare tijdsloten radio button opties voor de geselecteerde datum zien

Scenario: We kunnen een niet beschikbare dag niet selecteren als aanpassing
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
  En dat ik heb de datum prikker geopend
Wanneer ik probeer een niet beschikbare dag te selecteren
Dan zie ik dat ik dat dag niet selecteren kan
#the last 2 scenarios are minimally, just in name modified so the name is not the same as in the happy flow. Is this the right way to do it or can i repeat the scenario name because it's a different feature file???

Scenario: We willen een tijdslot voor de aangepasste trouwdatum selecteren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
  En dat ik heb een beschikbare datum geselecteerd
Wanneer ik op de gewenste tijdslot radio button klik
Dan zie ik dat de tijdslot radio button wordt geselecteerd

Scenario: We willen met de aangepaste trouwdatum terug naar het huwelijksoverzicht
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
  En dat ik heb een beschikbare datum geselecteerd
  En dat ik een tijdslot heb geselecteerd
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd