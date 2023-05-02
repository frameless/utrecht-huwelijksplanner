#error flow (unhappy for the system)
#getuigen invulllen, geen goeie connectie met server
# link geen connectie

Scenario: Ik wil een "Site is down" bericht zien als de JavaScript van de datum prikker niet worden geladen kan
Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
    En dat de JavaScript van de datum prikker niet worden geladen kan
Dan zie ik de "Site is down" bericht