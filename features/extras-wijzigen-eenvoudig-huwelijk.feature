@validate-flow
Scenario: We willen extras voor het huwelijk na het betaling toevoegen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
    En dat ik de link "Extras aanpassen" zie
Wanneer ik op de "Extras aanpassen" link klik
Dan word ik naar de "extra-laat" pagina gestuurd




@validate-flow
Scenario: We willen zien dat we op de "extra-laat" pagina zijn 
Gegeven dat ik op de "extra-laat" pagina ben
Dan zie ik de heading  "Kies je extra’s"
  En zie ik een "trouwboekjes" image
  En zie ik een type radio radio group met 5 items




@validate-flow
Scenario: We willen naar het overzicht zonder extras voor het huwelijk aan te passen
Gegeven dat ik op de "extra-laat" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd


@validate-flow
Abstract Scenario: We willen verklaren dat wij "<trouwboekje>" aanpassen willen
   Gegeven dat ik op de "extra-laat" pagina ben
  Wanneer ik op de radio button "<trouwboekje>" klik  
   Dan wordt de radio button "<option>" ingevuld
  Voorbeelden: 
   | trouwboekje      | option    | 
   | geen trouwboekje | option 1  | 
   | Wit              | option 2  | 
   | Donkerblauw      | option 3  | 
   | Rood             | option 4  | 
   | Naturel          | option 5  | 
   En zie ik een "Deze wil ik hebben" button


@validate-flow
Scenario: We willen een van de trouwboekje opties als aanpassing kiezen 
Gegeven dat ik op de "extra-laat" pagina ben
Wanneer ik op één van de radio buttons klik
Dan wordt alleen dat radio button ingevuld
  En zie ik een "Deze wil ik hebben" button


@validate-flow
Scenario: We willen onze trouwboekje keuze hebben 
Gegeven dat ik op de "extra-laat" pagina ben
  En dat een van de radio buttons input fields is ingevuld
Wanneer ik op "Deze wil ik hebben" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/extra" pagina gestuurd


@validate-flow
Scenario: We willen voor de extras betalen 
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/extra" pagina ben
  En dat ik een "Betaal met iDeal" button zie 
Wanneer ik op de "Betaal met iDeal" button klik 
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd


@validate-flow
Scenario: We willen onze trouwboekje keuze bevestigen
Gegeven dat ik voor de extras heb betaald
    En dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En zie ik de gekozen extras
    En krijg een bevestiging dat een email met de aangepaste extras naar mij wordt gestuurd
    En krijg een bevestiging dat een email met de aangepaste extras naar Partner 2 wordt gestuurd

