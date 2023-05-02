Scenario: We willen de trouwdatum voor het huwelijk wijzigen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik de button "Trouwdatum aanpassen" zie
Wanneer ik op de "Trouwdatum aanpassen" button klik
Dan word ik naar de "trouw-opties/huwelijk" pagina gestuurd


Scenario: We willen de trouwdatum voor het huwelijk aanpassen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
Dan kan ik de heading "Wanneer en hoe" zien
    En kan ik de datum prikker "Trouwdatum" op de pagina zien
    En kan ik de link "Terug naar het huwelijksoverzicht" zien
    En kan ik de beschikbare trouwdatums zien


Scenario: We willen naar het overzicht zonder de trouwdatum voor het huwelijk aan te passen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd


Scenario: We willen de trouwdatum aanpassen door op de datum prikker te klikken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
  En dat er is een "Trouwdatum" datum prikker op de pagina
  En dat er beschikbare dagen zijn
Wanneer ik een beschikbare dag selecteer
Dan wordt de datum op de datum prikker gezet
  En kan ik de beschikbare tijdsloten radio button opties voor de geselecteerde datum zien


Scenario: We kunnen een niet beschikbare dag niet selecteren als aanpassing
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik probeer een niet beschikbare dag te selecteren
Dan zie ik dat ik dat dag niet selecteren kan


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

Scenario: We willen de aangepaste trouwdatum in het huwelijksoverzicht zien
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
  En dat ik heb een beschikbare datum aangepast
  En dat ik een tijdslot heb aangepast
Dan zie ik de aangepaste datum en tijdslot
    En krijg ik een bevestiging dat de trouwdatum was aangepast
    En krijg ik een bevestiging dat een email met de aangepaste trouwdatum naar mij wordt gestuurd
    En krijg ik een bevestiging dat een email met de aangepaste trouwdatum naar Partner 2 wordt gestuurd
    En krijg ik een bevestiging dat een email met de aangepaste trouwdatum naar elk getuig wordt gestuurd



