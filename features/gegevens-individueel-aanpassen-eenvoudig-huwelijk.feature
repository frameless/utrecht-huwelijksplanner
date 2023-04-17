@validate-flow 
Abstract Scenario: We willen het "<veld>" van elke partner aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik een link "Aanpassen" zie om het "<veld>" van partner "<partner>" aan te passen
  Wanneer ik op de link "Aanpassen" klik
  Dan word ik naar de "<pagina>" gestuurd
    En focus ik op het "<veld>" input field met "<label>"
  Voorbeelden: 
    | veld           | partner | pagina                    | label                              |
    | telefoonnummer | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 |
    | telefoonnummer | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 |
    | email          | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 |
    | email          | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 |


@validate-flow 
Abstract Scenario: We willen het "<veld>" van elke partner controleren
Gegeven dat ik op de "<pagina>" ben
    En dat ik op het "<veld>" input field met "<label>" ben gefocust
  Wanneer ik het "<veld>" met "<content>" invul 
  Dan wordt het ingevulde "<veld>" gecontroleerd voor geldigheid
  Voorbeelden: 
    | veld           | partner | pagina                    | label                              | content        |
    | telefoonnummer | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 | 0612345678     |
    | telefoonnummer | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 | 0612345678     |
    | email          | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 | jan@gmail.com  |
    | email          | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 | jane@gmail.com |

@validate-flow 
Abstract Scenario: We willen terug naar het overzicht als we klaar met de aanpassing van de gegevens van "<partner>" zijn
Gegeven dat ik op de "<pagina>" ben
    En dat het "<veld>" veld met label "<label>" de waarde "<content>" heeft
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd
    En zie ik de "<content>" in het huwelijksoverzicht 
  Voorbeelden: 
    | veld           | partner | pagina                    | label                              | content        |
    | telefoonnummer | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 | 0612345678     |
    | telefoonnummer | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 | 0612345678     |
    | email          | 1       | persoonsgegevens/partner1 | Telefoonnummer aanpassen Partner 1 | jan@gmail.com  |
    | email          | 2       | persoonsgegevens/partner2 | Telefoonnummer aanpassen Partner 2 | jane@gmail.com |


# --
Abstract Scenario: We willen de naam van Getuige 1 aanpassen
Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
    En dat ik de heading "Betaling ontvangen" zie
    En dat ik een link "Aanpassen" zie om het "<veld>" van getuige "<getuige>" aan te passen
Wanneer ik op de link "Aanpassen" klik
Dan word ik naar de "voorgenomen-huwelijk/getuigen/aanpassen" pagina gestuurd
    En focus ik op het "<veld>" input field met "<label>"
  Voorbeelden: 
  | veld       | getuige | label                                  |
  | naam       | 1       | Telefoonnummer aanpassen Getuige 1     |
  | email      | 1       | E-mailadres aanpassen Getuige 1        |
  | naam       | 2       | Telefoonnummer aanpassen Getuige 2     |
  | email      | 2       | E-mailadres aanpassen Getuige 2        |
  | naam       | 3       | Telefoonnummer aanpassen Getuige 3     |
  | email      | 3       | E-mailadres aanpassen Getuige 3        |
  | naam       | 4       | Telefoonnummer aanpassen Getuige 4     |
  | email      | 4       | E-mailadres aanpassen Getuige 4        |

Scenario: We willen terug naar het overzicht zonder de gegevens aan te passen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/anpassen" pagina ben
    En dat ik de link "Terug naar het huwelijksoverzicht" zie
Wanneer ik op de "Terug naar het huwelijksoverzicht" link klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd

@validate-flow 
Abstract Scenario: We willen het "<veld>" van elke getuige controleren
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/aanpassen" ben
    En dat ik het "<veld>" input field met label "<label>" heb ingevuld
Wanneer ik het "<veld>" met "<content>" invul 
Dan wordt het ingevulde "<veld>" gecontroleerd voor geldigheid
Voorbeelden: 
    | veld           | getuige | label                           | content        |
    | naam           | 1       | Naam aanpassen Getuige 1        | Johan          |
    | naam           | 2       | Naam aanpassen Getuige 2        | Django         |
    | naam           | 3       | Naam aanpassen Getuige 1        | Hans           |
    | naam           | 4       | Naam aanpassen Getuige 2        | Nies           |
    | email          | 1       | E-mailadres aanpassen Getuige 3 | jan@gmail.com  |
    | email          | 2       | E-mailadres aanpassen Getuige 4 | jane@gmail.com |
    | email          | 3       | E-mailadres aanpassen Getuige 3 | jan@gmail.com  |
    | email          | 4       | E-mailadres aanpassen Getuige 4 | jane@gmail.com |

Scenario: We willen de aangepaste uitnodigingen naar de getuigen sturen
Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/aanpassen" pagina ben
  En dat ik meer dan een set van text en email input fields heb ingevuld
Wanneer ik op de "Verstuur uitnodiging" button klik
Dan word ik naar de "voorgenomen-huwelijk/betalen/succes" pagina gestuurd
    En krijg een bevestiging dat een email uitnodiging naar elk van de getuigen wordt gestuurd