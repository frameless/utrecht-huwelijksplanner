# language: nl
Functionaliteit: Datum Prikker

    Achtergrond:
        Gegeven dat ik op de "trouw-opties/huwelijk" pagina ben
        En dat ik een "trouwdatum" datumprikker zie
        En dat de datum prikker opent op de huidige maand

    Scenario: De datum prikker heeft een navigatie header
        Dan zie ik boven de datums een navigatie header
        En in de navigatie header een "Vorig Jaar" button
        En na de "Vorig Jaar" button een "Vorige Maand" button
        En na de "Vorige Maand" button de datum met maand en jaar van de huidige maand
        En na de datum een "Volgende Maand" button
        En na de "Volgende Maand" button een "Volgend Jaar" button

    Scenario: De datum prikker toont actieve en inactieve datums
        Dan zie ik datums die niet beschikbaar zijn als inactief
        En zie ik datums die beschikbaar zijn als actief

    Scenario: De datum prikker selecteerd niet standaard een datum
        Dan zie ik dat geen datum geselecteerd is

    Scenario: De datum prikker toont de huidige datum anders dan een geselecteerde datum
        Dan zie ik dat vandaag gemarkeerd is

        Gegeven dat ik een dag selecteer
        Dan is de markering van vandaag anders dan de markering van de geselecteerde datum

    Scenario: De actieve datum waarover met de muis wordt gegaan ziet er anders uit
        Wanneer ik over een actieve trouwdatum button met de muisaanwijzer heen beweeg
        Dan zie ik dat de datum waarover ik heen beweeg er anders uit ziet

    Scenario: De actieve datumwordt die met het toetsenbord wordt gefocussed ziet er anders uit
        Gegeven dat ik een trouwdatum heb geselecteerd

        Wanneer ik met mijn toetsenbord een actieve trouwdatum button focus
        Dan zie ik dat die trouwdatum button focus heeft

    Scenario: Ik wil zien dat de datumprikker zichtbaar is als ik een trouwdatum selecteer
        Wanneer ik op een actieve trouwdatum button klik
        Dan zie ik dat de geklikte trouwdatum button geselecteerd is
        En zie ik beschikbare tijdvakken als radio buttons onder de datum prikker
        En zie ik dat de beschikbare tijdvakken per type bruiloft gegroepeerd zijn
        En zie ik naast elke radio button het label met de trouwdatum en tijdslot
        En wordt het label getoond als dag met letters, dag met nummers maand jaar, begin van tijdslot - eind van tijdslot

    Scenario: De geselecteerde trouwdatum die met het toetsenbord wordt gefocussed ziet er anders uit
        Gegeven dat ik een trouwdatum heb geselecteerd

        Wanneer ik met mijn toetsenbord de geselecteerde trouwdatum focus
        Dan zie ik dat die trouwdatum focus heeft
        En zie ik dat die geselecteerde button er anders uit ziet dan een actieve button met focus

    Scenario: De geselecteerde trouwdatum verandert niet wanneer ik buiten de datum prikker klik
        Gegeven dat ik een trouwdatum heb geselecteerd

        Wanneer ik buiten de datum prikker klik
        Dan zie ik dat de geselecteerde trouwdatum geselecteerd blijft
        En zie ik dat de tijdvakken voor de geselecteerde trouwdatum hetzelfde blijven

    Scenario: Ik kan een niet beschikbare dag niet selecteren
        Gegeven dat ik een inactieve trouwdatum button zie

        Wanneer ik probeer die inactieve trouwdatum te selecteren
        Dan zie ik dat ik die dag niet kan selecteren
        En zie ik geen tijdvakken voor die inactieve datum

    Scenario: De geselecteerde datum blijft geselecteerd na klikken op een inactieve button
        Gegeven dat ik een trouwdatum heb geselecteerd
        En dat ik een inactieve trouwdatum button zie

        Wanneer ik probeer die inactieve trouwdatum te selecteren
        Dan zie ik dat ik die dag niet kan selecteren
        En is de eerder geselecteerde trouwdatum nog steeds geselecteerd
        En zie ik nog steeds de tijdvakken voor de eerder geselecteerde trouwdatum

    Scenario: Ik kan beschikbare tijdvakken voor de geselecteerde trouwdatum kiezen
        Gegeven dat ik een trouwdatum heb geselecteerd
        En dat ik beschikbare tijdvakken als radio buttons onder de datum prikker zie

        Wanneer ik op een van de beschikbare tijdvakken onder de datum prikker klik
        Dan zie ik dat die radio button wordt geselecteerd
        En zie ik dat alle andere radio buttons niet geselecteerd zijn
        En zie ik een "Ja, dit wil ik!" button

    Scenario: Ik kan door de datum prikker naar de volgende maand navigeren
        Wanneer ik de "Volgende Maand" button klik
        Dan zie ik dat de datum prikker "1" maanden vanaf vandaag toont

    @validate-flow
    Scenario: Ik kan tot maximaal een jaar vooruit naar de volgende maand navigeren
        Gegeven dat ik "10" maanden vooruit ben genavigeert

        Wanneer ik de "Volgende Maand" button klik
        Dan zie ik dat de datum prikker "11" maanden vanaf vandaag toont
        En zie ik dat de "Volgende Maand" button inactief is
        En zie ik een melding dat ik alleen een trouwdatum kan kiezen tussen 3 weken vanaf vandaag en een jaar vooruit

    @validate-flow
    Scenario: Ik wil in binnen 3 weken trouwen
        Dan zie ik dat er geen datums actief zijn in de komende 3 weken

        Wanneer ik probeer een datum binnen 3 weken te selecteren
        Dan zie ik een melding dat ik alleen een trouwdatum kan kiezen tussen 3 weken vanaf vandaag en een jaar vooruit

    @validate-flow
    Scenario: Ik kan door de datum prikker naar het volgende jaar navigeren
        Wanneer ik de "Volgend Jaar" button klik
        Dan zie ik dat de datum prikker een jaar vanaf vandaag toont

    @validate-flow
    Scenario: Ik kan geen trouwdatum selecteren verder dan een jaar trouwdatum vooruit
        Gegeven dat ik "12" maanden vooruit ben genavigeert
        Dan zie ik alleen inactieve trouwdatum buttons
        En zie ik een melding dat ik alleen een trouwdatum kan kiezen tussen 3 weken vanaf vandaag en een jaar vooruit

    @validate-flow
    Scenario: Ik kan geen jaar in de toekomst navigeren
        Dan zie ik dat de "Volgend Jaar" button inactief is
        En zie ik een melding dat ik alleen een trouwdatum kan kiezen tussen 3 weken vanaf vandaag en een jaar vooruit

    @validate-flow
    Scenario: Ik kan niet in het verleden navigeren
        Dan zie ik dat de "Vorige Maand" button inactief is
        En zie ik dat de "Vorig Jaar" button inactief is

    Scenario: Ik kan door de datum prikker naar de vorige maand navigeren
        Gegeven dat ik "1" maanden vooruit ben genavigeert

        Wanneer ik de "Vorige Maand" button klik
        Dan zie ik dat de datum prikker de huidige maand toont

    @validate-flow
    Scenario: Ik kan door de datum prikker niet naar het vorige jaar navigeren
        Gegeven dan zie ik dat de "Vorig Jaar" button inactief is

        Wanneer ik "11" maanden vooruit navigeer
        Dan zie ik dat de "Vorig Jaar" button nog steeds inactief is
