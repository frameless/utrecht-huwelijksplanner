# niet mogelijk de extras te wijzigen na het betaling?
# Niet in de MvP omdat ze dan moeten nadenken over terugbetalen als je minder extras wil. Misschien kun je wel extra’s toevoegen maar niet verwijderen? Zouden we voor nu aan kunnen nemen en weer @validate-flow bij toevoegen. Het verwijderen/goedkoper maken van extra’s is dan een losse feature waar terugbetaling van de gemeente bij hoort

# moet man de gemeente bellen? geen online mogelijkheden?
# Ja voor alles wat niet in de MvP zit moet je contact opnemen met de gemeente

# terugsgaan op de browser naar de extras pagina annuleert de betaling niet, of wel?
# https://utrecht-huwelijksplanner.frameless.io/en/extra
# Hmmm ik weet hiervan niet wat je bedoeld, kun je me deze morgen laten zien?

Scenario: We willen extras voor de huwelijk na het betaling toevoegen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
    En dat ik de link "Extras aanpassen" zie
Wanneer ik op de "Extras aanpassen" link klik
Dan word ik naar de "extra-laat" pagina gestuurd

Scenario: We willen zien dat we op de "extra-laat" pagina zijn 
Gegeven dat ik op de "extra-laat" pagina ben
Dan zie ik de heading  "Kies je extra’s"
  En zie ik een "trouwboekjes" image
  En zie ik een type checkbox input field voor de indicatie dat wij een trouwboekje willen
  En zie ik een vier type radio button input fields 
  En zie ik een "Deze wil ik hebben" button

Scenario: We willen naar het overzicht zonder extras voor de huwelijk aan te passen
Gegeven dat ik op de "extra-laat" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd

Scenario: We willen verklaren dat wij een trouwboekje aanpassen willen
Gegeven dat ik op de "extra-laat" pagina ben
  En dat ik een type checkbox input field voor de bevestiging dat een trouwboekje is gewild zie
Wanneer ik op de checkbox klik
Dan wordt het checkbox ingevuld
# scenario name slightly modified against the happy flow so they don't have the same name. Or can they have the same name?

Scenario: We willen een van de trouwboekje opties als aanpassing kiezen 
Gegeven dat ik op de "extra-laat" pagina ben
Wanneer ik op één van de radio buttons klik
Dan wordt alleen dat radio button ingevuld

Scenario: We willen onze trouwboekje keuze hebben 
Gegeven dat ik op de "extra-laat" pagina ben
Wanneer ik op "Deze wil ik hebben" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/extra" pagina gestuurd
