# Huwelijk datumgrens 2 weken VS Getuigenuitnodigingen datumgrens 4 weken
#  -Wat als 5 weken geleden ik heb mijn huwelijkdatum en ook mijn getuigen geregistreerd
#   Dan 2 weken voor de huwelijk wil ik mijn huwelijkdatum laten veranderen. ik ben nog binnen de
#   datumgrens voor de huwelijk, maar niet voor de Getuigenuitnodigingen, maar ze waren al geregistreerd
#   Mag het dan?

Scenario: Huwelijksdatum wijziging na de datumgrens voor Getuigen 
Gegeven dat ik mijn huwelijksreservering heb "geannuleert/" #Annuleer huwelijksreservering Step 5
    En Ik ga terug naar de de Trouw Opties Huwelijk pagina #Wanneer en Hoe Step 2
    En Ik wil binnen de komende twee weken trouwen
    En Ik selecteer een geldig trouwdatum en tijdslot
    En Ik had twee of meer weken geleden de getuigen al uitgenodigd
    En Ik Partner 1 ben al met DigID ingelogd
    En Partner 2 is al met DigID ingelogd
    En Ik zie een Ja, dit wil ik! button
Wanneer Ik op de button klik
Dan Word ik naar de Voorgenomen Huwelijk pagina gestuurd #Step 3  <--Ik moet alle stappen weer doorlopen
of
Dan Word ik naar de Voorgenomen Huwelijk Getuigen Succes pagina gestuurd #Step 5  <--Je gaat gelijk naar het overzicht



# Huwelijk tussen de  2-3 weken
# Krijg ik een melding dat ik over de datumgrens van de getuigensuitnodigingen ben?
NEEDS CLEANING!