# language: nl

# Functionaliteit: Datum Prikker 


Scenario: De datum prikker toont actieve en inactieve datums
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een "Trouwdatum" datumprikker zie
Dan zie ik datums dat niet beschikbare zijn als inactief
    En zie ik datums dat beschikbaar zijn als actief



Scenario: De datum prikker opent op de huidige maand
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
Dan zie ik dat de datum prikker opent op de huidige maand
    En zie ik dat vandaag gemarkeerd is 
    En zie ik tussen de "Vorige Maand" en "Volgende Maand" buttons in de datum prikker een header met de maand en jaar voor de huidig geselecteerde datum
    En zie ik een "Volgend Jaar" button rechts van de "Volgende Maand" button
    En zie ik dat geen trouwdatum geselecteerd is


Scenario: De datum waarop de muisaanwijzer is geplaatst wordt highlighted
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
    En dat vandaag gemarkeerd is
Wanneer ik over een actief datum met de muisaanwijzer hover      
Dan zie ik dat de datum prikker highlighted wordt



Scenario: Ik wil zien dat de datumprikker zichtbaar is als ik op een trouwdatum selecteer
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
Wanneer ik op een actief trouwdatum button klik 
Dan zie ik dat de geklikte trouwdatum button geselecteerd is
    En zie ik beschikbare tijdsloten als radio buttons onder de datum prikker voor de geselecteerde trouwdatum
    En zie ik dat de beschikbare tijdsloten door het soort bruiloft georganiseerd zijn
    En zie ik naast elk radiobutton de trouwdatum en tijdslot in een formaat van "dag met letters, dag met nummers maand jaar, begin van tijdslot-eind van tijdslot"


Scenario: De geselecteerde trouwdatum op de datumprikker wordt zichtbaar gefocuseerd
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een trouwdatum heb geselecteerd
Dan zie ik dat de geselecteerde trouwdatum gefocust is
    En zie ik dat de contrast ratio van de geselecteerde trouwdatum hoger dan bij alle andere datums in de datum prikker is
    En zie ik dat de contrast ratio van de huidige dag hoger dan bij de inactieve datums in de datum prikker is

Scenario: De geselecteerde trouwdatum verandert niet wanneer ik buiten de datum prikker klikt
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een geselecteerde trouwdatum gefocuseerd zie
Wanneer ik buiten de datum prikker klikt 
Dan zie ik dat de geselecteerde trouwdatum niet verandert heeft
    En zie ik dat de tijdsloten voor de geselecteerde trouwdatum niet verandert hebben

Scenario: Ik kan een niet beschikbare dag niet selecteren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik probeer een inactief trouwdatum te selecteren
Dan zie ik dat ik dat dag niet selecteren kan

Scenario: Ik kan beschikbare tijdsloten voor de geselecteerde trouwdatum kiezen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een geselecteerde trouwdatum gefocuseerd zie
    En dat ik beschikbare tijdsloten als radio buttons onder de datum prikker zie
Wanneer ik op een van de beschikbare tijdsloten als radio buttons onder de datum prikker klikt
Dan zie ik dat die radio button wordt geselecteerd
    En zie ik dat alle andere radio buttons niet geselecteerd zijn
    En zie ik een "Ja, dit wil ik!" button



Scenario: Ik kan door de datum prikker naar toekomstige maanden bladeren door de "Volgende Maand" button te gebruiken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
    En dat datum prikker een maand toont die maximaal een jaar in de toekomst verwijderd is van de huidige maand 
Wanneer ik de "Volgende Maand" button klikt 
Dan zie ik dat de datum prikker naar de volgende maand ga

Scenario: Ik kan door de datum prikker naar toekomstige jaar bladeren door de "Volgend Jaar" button te gebruiken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
    En dat datum prikker de huidige maand toont
Wanneer ik de "Volgend Jaar" button klikt 
Dan zie ik dat de datum prikker naar de volgend jaar ga

Scenario: Ik kan niet met de "Volgend Jaar" button in de datum prikker over een jaar in de toekomst doorbladeren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
    En dat datum prikker een maand na de huidige maand toont
Wanneer ik de "Volgend Jaar" button klikt 
Dan zie ik dat de datum prikker de huidige maand toont
    En zie ik het bericht "Kan datums meer dan een jaar vanaf vandaag niet weergeven"

Scenario: Ik wil in over een jaar trouwdatum selecteren
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik probeer een datum over een jaar te selecteren
Dan krijg ik een melding om een datum maximaal tussen een jaar te selecteren

Scenario: Ik wil in binnen 3 weken trouwen
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben 
  En dat er is een "Trouwdatum" datum prikker op de pagina
Wanneer ik probeer een datum binnen 3 weken van te voren te selecteren
Dan krijg ik een melding om een datum minimaal 3 weken van te voren te selecteren

Scenario: Ik kan door de datum prikker naar vorige maanden bladeren door de "Vorige Maand" button te gebruiken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
    En dat datum prikker een maand toont die na de huidige maand komt
Wanneer ik de "Vorige Maand" button klikt 
Dan zie ik dat de datum prikker naar de vorige maand ga

Scenario: Ik kan door de datum prikker niet naar vorige maanden dan de huidige bladeren door de "Vorige Maand" button te gebruiken
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat ik een datumprikker zie
    En dat datum prikker de huidige maand toont
Wanneer ik de "Vorige Maand" button klikt 
Dan zie ik dat de datum prikker de huidige maand toont
    En zie ik het bericht "Kan geen datums eerder dan vandaag selecteren"


