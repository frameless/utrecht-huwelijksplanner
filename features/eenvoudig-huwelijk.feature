# language: nl
Functionaliteit: Eenvoudig huwelijk

    ## stap "1"
    Scenario: Ik wil zien dat ik op de trouw-opties pagina ben
        Gegeven dat ik op de "/trouw-opties" pagina ben
        Dan zie ik de heading "Trouwen of geregistreerd partnerschap"
        En ben ik op stap "1"
        En zie ik een "Trouwen plannen" button

    Scenario: Ik wil relevante extra informatie op de trouw-opties pagina
        Gegeven dat ik op de "/trouw-opties" pagina ben
        Dan zie ik een aside "Meer informatie"
        En zie ik een link die gaat naar de juiste pagina
            | link                                                                                                 | href                                                                                                                                                                                                             |
            | Wat zijn de verschillen tussen een huwelijk, geregistreerd partnerschap en een samenlevingscontract? | https://www.rijksoverheid.nl/onderwerpen/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/vraag-en-antwoord/wat-is-het-verschil-tussen-een-huwelijk-geregistreerd-partnerschap-en-samenlevingscontract |
            | Waar moet ik aan denken als ik wil trouwen of een geregistreerd partnerschap wil sluiten?            | https://www.rijksoverheid.nl/onderwerpen/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/vraag-en-antwoord/trouwen-of-geregistreerd-partnerschap-sluiten                                              |
            | Trouwen of partnerschap registreren in Utrecht                                                       | https://pki.utrecht.nl/Loket/product/298304036ec988f0633d839dde5b588f                                                                                                                                            |

    Scenario: Ik wil een huwelijk als trouw optie kiezen
        Gegeven dat ik op de "/trouw-opties" pagina ben

        Wanneer ik op de "Trouwen plannen" button klik
        Dan word ik naar de "trouw-opties/huwelijk" pagina gestuurd

    ## stap "2"
    Scenario: Ik wil zien dat ik op de trouw-opties/huwelijk pagina ben
        Gegeven dat ik op de "/trouw-opties/huwelijk" pagina ben
        Dan zie ik de heading "Wanneer en hoe"
        En ben ik op stap "2"
        En zie ik een "Trouwdatum" datum prikker op de pagina

    Scenario: Ik wil relevante extra informatie op de trouw-opties/huwelijk pagina
        Gegeven dat ik op de "/trouw-opties/huwelijk" pagina ben
        Dan zie ik een aside "Meer informatie"
        En zie ik een link die gaat naar de juiste pagina
            | link                                           | href                                                                  |
            | Trouwen of partnerschap registreren in Utrecht | https://pki.utrecht.nl/Loket/product/298304036ec988f0633d839dde5b588f |

    Abstract Scenario: Ik zie tijdslots als ik een beschikbare trouwdatum selecteer
        Gegeven dat ik op de "/trouw-opties/huwelijk" pagina ben
        En dat ik een "Trouwdatum" datumprikker zie

        Wanneer ik de "<datum>" button aanklik
        Dan zie ik het kopje "<type>"
        En zie ik onder het kopje het tijdslot "<tijd>"

        Voorbeelden:
            | datum                | tijd          | type       |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Eenvoudig  |
            | woensdag 10 mei 2024 | 13:30 – 13:45 | Eenvoudig  |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Uitgebreid |

    Scenario: Ik kan een tijd en datum selecteren
        Gegeven dat ik op de "/trouw-opties/huwelijk" pagina ben
        En dat ik een "Trouwdatum" datumprikker zie
        En dat ik de "woensdag 10 mei 2024" button heb aangeklikt
        En dat er geen radio button geselecteerd is

        Wanneer ik de "12:00 – 12:15" radio button aanklik
        Dan zie ik dat die radio button geselecteerd is
        En dat ik een "Ja, dit wil ik!" button zie

    Abstract Scenario: Ik wil mijn gewenste tijd en datum bevestigen
        Gegeven dat ik op de "/trouw-opties/huwelijk" pagina ben
        En dat ik een "Trouwdatum" datumprikker zie
        En dat ik de "<datum>" button heb aangeklikt
        En dat ik de "<tijd>" radio button voor "<type>" heb geselecteerd
        En dat ik een "Ja, dit wil ik!" button zie

        Wanneer ik op de "Ja, dit wil ik!" button klik
        Dan word ik naar de "/voorgenomen-huwelijk" pagina gestuurd
        En ben ik op stap "3"
        En zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie

        Voorbeelden:
            | datum                | tijd          | type       |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Eenvoudig  |
            | woensdag 10 mei 2024 | 13:30 – 13:45 | Eenvoudig  |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Uitgebreid |

    ## stap "3"
    Scenario: Ik wil zien dat ik op de voorgenomen-huwelijk pagina ben
        Gegeven dat ik op de "/voorgenomen-huwelijk" pagina ben
        Dan zie ik de heading "Eenvoudig trouwen"
        En ben ik op stap "3"
        En kan ik een "Inloggen met DigiD" link op de pagina zien

    Abstract Scenario: Ik wil relevante extra informatie op de voorgenomen-huwelijk pagina
        Gegeven dat ik op de "/voorgenomen-huwelijk" pagina ben
        Dan zie ik een aside "Meer informatie"
        En zie ik een link "<link>" die gaat naar "<href>"

        Voorbeelden:
            | link            | href                       |
            | DigiD aanvragen | https://digid.nl/aanvragen |

    Scenario: Ik wil naar de DigID login pagina
        Gegeven dat ik op de "/voorgenomen-huwelijk" pagina ben

        Wanneer ik op de "Inloggen met DigiD" link klik
        Dan word ik naar de "/login" pagina gestuurd

    Abstract Scenario: Ik Partner 1 wil met DigID inloggen
        Gegeven dat ik op de "/login" pagina ben
        En dat ik DigID heb

        Wanneer ik de "<gebruikersnaam>" invul bij het gebruikersnaam invoerveld
        En ik het "<wachtwoord>" invul bij het wachtwoord invoerveld
        En ik op de "inloggen" button klik
        Dan word ik ingelogd door DigID
        En word ik naar de "/persoonsgegevens" pagina gestuurd

    @verify-flow
    Scenario: Ik wil de DigID inloggen annuleren
        Gegeven dat ik op de "/login" pagina ben
        En dat ik zie een "Annuleren" button zie

        Wanneer ik op de "Annuleren" button klik
        Dan word ik naar de "/voorgenomen-huwelijk" pagina gestuurd

    Scenario: Ik Partner 1 wil mijn gegevens bevestigen
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        Dan zie ik de heading "Melding Voorgenomen Huwelijk"
        En zie ik dat mijn persoonsgegevens juist zijn
            | bsn       | voornamen          | tussenvoegsels | achternaam | Burgerlijke staat                | geboorte datum | geboorte plaats | nationaliteit | Indicatie curateleregister |
            | 185001943 | Anne Nico Johannes |                | Deursen    | Ongehuwd en nooit gehuwd geweest | 10-06-1988     | Arnhem          | Nederlandse   |                            |
        En zie ik dat mijn adresgegevens juist zijn
            | straatnaam | huisnummer | huisletter | postcode | woonplaats |
            | Rubenslaan | 127        |            | 3582JH   | Utrecht    |
        En zie ik dat mijn contactgegevens juist zijn
            | telefoonnummer | email adres |
            |                |             |

    Scenario: Ik Partner 1 wil mijn telefoonnummer invullen
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat ik een telefoonnummer input field zie

        Wanneer ik in het telefoonnummer input field mijn telefoonnummer invul
            | telefoonnummer |
            | 06123456789    |
        En ik uit het input field ga
        Dan wordt het ingevulde nummer gecontroleerd voor geldigheid

    # foutmelding moet bedacht en aangepast worden
    @validate-flow
    Abstract Scenario: Ik Partner 1 wil weten dat iuk mijn telefoonnummer verkeerd heb ingevuld
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat ik een telefoonnummer input field zie

        Wanneer ik in het telefoonnummer input field mijn telefoonnummer "<telefoonnummer>" invul
        En ik uit het input field ga
        Dan zie ik een foutmelding dat ik "<foutmelding>" voor de telefoonnummer input

        Voorbeelden:
            | telefoonnummer | foutmelding               |
            | ab12345678     | ongeldige tekens gebruikt |
            | 06123          | telefoonnummer te kort    |

    Scenario: Ik Partner 1 wil mijn email invullen
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat ik een email input field zie

        Wanneer ik in de het email input field mijn email adres invul
            | email          |
            | iam@testing.nu |
        Dan wordt het ingevulde email adres gecontroleerd voor geldigheid

    # foutmelding moet bedacht en aangepast worden
    @validate-flow
    Scenario: Ik Partner 1 wil mijn email vals invullen
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat ik een type email input field zie

        Wanneer ik in het email input field mijn email "<email>" invul
        En ik uit het input field ga
        Dan zie ik een foutmelding dat ik "<foutmelding>" voor de email input

        Voorbeelden:
            | email | foutmelding      |
            | ab@   | email klopt niet |
            | 06123 | email klopt niet |

    Scenario: Ik Partner 1 wil verklaren dat ik niet getrouwd ben
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat ik een checkbox field met label "burgerlijke-staat" zie
        En dat die checkbox niet geselecteerd is

        Wanneer ik op de checkbox klik
        Dan wordt de checkbox geselecteerd

    Scenario: Ik Partner 1 wil verklaren dat ik niet binnen mijn familie ga trouwen
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat ik een checkbox field met label "incest-check" zie
        En dat die checkbox niet geselecteerd is

        Wanneer ik op de checkbox klik
        Dan wordt de checkbox geselecteerd

    Abstract Scenario: Ik Partner 1 wil al de gegevens in het formulier bevestigen
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie zie
        En dat al de ingevulde gegevens in het formulier kloppen

        Wanneer ik op de checkbox met label "gegevensbevestiging" klik
        Dan wordt het checkbox ingevuld

        Voorbeelden:
            | datum                | tijd          | type       |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Eenvoudig  |
            | woensdag 10 mei 2024 | 13:30 – 13:45 | Eenvoudig  |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Uitgebreid |

    # Aangenomen dat de button er wel is maar voor een validatie melding zorgt zonder dat de required stappen zijn genomen
    @validate-flow
    Scenario: Ik Partner 1 kan niet naar de volgende stap zonder alle gegevens checkboxes geselecteerd te hebben
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat de checkbox met label "persoonsgegevens" niet geselecteerd is
        En dat de checkbox met label "incest-check" niet geselecteerd is
        En dat de checkbox met label "gegevensbevestiging" niet geselecteerd is
        En ik een "Contactgegevens opslaan" button zie

        Wanneer ik op de "Contactgegevens opslaan" button klik
        Dan blijf ik op de "/persoonsgegevens" pagina
        En zie ik een foutmelding bij de "persoonsgegevens" button dat ik die moet selecteren
        En zie ik een foutmelding bij de "incest-check" button dat ik die moet selecteren
        En zie ik een foutmelding bij de "gegevensbevestiging" button dat ik die moet selecteren

    Scenario: Ik Partner 1 kan naar de volgende stap als ik alle gegevens checkboxes geselecteerd heb
        Gegeven dat ik op de "/persoonsgegevens" pagina ben
        En dat de checkbox met label "persoonsgegevens" geselecteerd is
        En dat de checkbox met label "incest-check" geselecteerd is
        En dat de checkbox met label "gegevensbevestiging" geselecteerd is

        Wanneer ik op de "Contactgegevens opslaan" button klik
        Dan word ik naar de "/voorgenomen-huwelijk/partner" pagina gestuurd

    Scenario: Ik Partner 1 wil zien dat ik op de voorgenomen-huwelijk/partner pagina ben
        Gegeven dat ik op de "/voorgenomen-huwelijk/partner" pagina ben
        Dan zie ik de heading "Melding Voorgenomen Huwelijk"
        En is er een "Partner inloggen met DigiD" button op de pagina
        En is er een "mail een uitnodiging aan je partner" link

    @optional
    Scenario: Ik Partner 1 wil een DigID inloggen uitnodiging naar partner 2 kunnen sturen
        Gegeven dat ik op de "/voorgenomen-huwelijk/partner" pagina ben
        En dat ik een "mail een uitnodiging aan je partner" link zie

        Wanneer ik de "mail een uitnodiging aan je partner" link klik
        Dan word ik naar de "/voorgenomen-huwelijk/partner/uitnodigen" pagina gestuurd

    # label moet nog aangepast worden naar het daadwerkelijk gebruikte label
    @optional
    @validate-flow
    Scenario: Ik Partner 1 wil zien dat ik op de "voorgenomen-huwelijk/partner/uitnodigen" pagina ben
        Gegeven dat ik op de "/voorgenomen-huwelijk/partner/uitnodigen" pagina ben
        Dan zie ik een type text input field met label "partner2-naam"
        Dan zie ik een type email input field met label "partner2-email"

    # label moet nog aangepast worden naar het daadwerkelijk gebruikte label
    @optional
    @validate-flow
    Scenario: Ik Partner 1 wil de naam van Partner 2 voor een uitnodiging per e-mail invullen
        Gegeven dat ik op de "/voorgenomen-huwelijk/partner/uitnodigen" pagina ben

        Wanneer ik de naam van Partner 2 in de type text input field met label "partner2-naam" invul
        Dan wordt het getypte naam gecontroleerd voor geldigheid

    # label moet nog aangepast worden naar het daadwerkelijk gebruikte label
    @optional
    @validate-flow
    Scenario: Ik Partner 1 wil de email van Partner 2 voor een DigID inloggen uitnodiging per e-mail invullen
        Gegeven dat ik op de "/voorgenomen-huwelijk/partner/uitnodigen" pagina ben
        En dat ik de naam van Partner 2 in de type email input field met label "partner2-naam" heb ingevuld

        Wanneer ik de email van Partner 2 in de input field met label "partner2-email" invul
        Dan wordt het getypte e-mail gecontroleerd voor geldigheid
        En zie ik een  "Verstuur uitnodiging" button

    # label moet nog aangepast worden naar het daadwerkelijk gebruikte label
    @optional
    @validate-flow
    Scenario: Ik Partner 1 wil een DigID inloggen uitnodiging per e-mail naar Partner 2 sturen
        Gegeven dat ik op de "voorgenomen-huwelijk/partner/uitnodigen" pagina ben
        En dat ik de type text input field met label "partner2-naam" ingevult hebt
        En dat ik de type email input field met label "partner2-email" ingevult hebt

        Wanneer ik op de "Verstuur uitnodiging" button klik
        Dan wordt ik naar de "voorgenomen-huwelijk/partner/succes" pagina gestuurd
        En krijg ik een bevestiging dat de e-mail verzonden is

    # label moet nog aangepast worden naar het daadwerkelijk gebruikte label
    @optional
    @validate-flow
    Scenario: Ik Partner 1 wil zien dat ik op de voorgenomen-huwelijk/partner/succes pagina ben
        Gegeven dat ik op de "/voorgenomen-huwelijk/partner/succes" pagina ben
        Dan zie ik een "Bekijk e-mail voor aanvrager" link
        En zie ik een "Bekijk e-mail voor partner" link
        En zie ik een type text input field "partner2-naam"
        En zie ik een type email input field met label "partner2-email"
        En zie ik een "Verstuur uitnodiging" button

    @optional
    Scenario: Ik Partner 1 wil mijn email bekijken
        Gegeven dat ik op de "voorgenomen-huwelijk/partner/succes" pagina ben

        Wanneer ik op de "Bekijk e-mail voor aanvrager" link klik
        Dan wordt ik naar de "/voorgenomen-huwelijk/partner/aanvrager-email" pagina gestuurd
        En krijg ik een bevestiging dat de e-mail verzonden is
        En zie ik een "Doorgaan huwelijksaanvraag" link

    Scenario: Ik Partner 1 wil doorgaan met het huwelijksaanvraag **Optioneel**
        Gegeven Gegeven dat ik op de "voorgenomen-huwelijk/partner/aanvrager-email" pagina ben

        Wanneer ik op de "Doorgaan huwelijksaanvraag" link klik
        Dan wordt ik naar de "voorgenomen-huwelijk/getuigen" pagina gestuurd

    Scenario: Ik Partner 1 wil de email voor mijn partner bekijken **Optioneel**
        Gegeven dat ik op de "voorgenomen-huwelijk/partner/succes" pagina ben

        Wanneer ik op de "Bekijk e-mail voor partner" link klik
        Dan wordt ik naar de "voorgenomen-huwelijk/partner/invitation-email-partner" pagina gestuurd
        En krijg ik een bevestiging dat de e-mail verzonden is
        En zie ik een "Inloggen met DigiD" link

    Scenario: Ik Partner 1 wil de uitnodiging voor mijn partner versturen **Optioneel**
        Gegeven dat ik op de "voorgenomen-huwelijk/partner/succes" pagina ben

        Wanneer ik op de "Verstuur uitnodiging" button klik
        Dan wordt ik naar de "voorgenomen-huwelijk/partner/invitation-email-partner" pagina gestuurd
        En krijg ik een bevestiging dat de e-mail verzonden is
        En zie ik een "Inloggen met DigiD" link

    Scenario: Ik Partner 2 wil voor het huwelijk via email inloggen **Optioneel**
        Gegeven dat ik op de "voorgenomen-huwelijk/partner/invitation-email-partner" pagina ben

        Wanneer ik op de "Inloggen met DigiD" link klik
        Dan word ik naar de "login" pagina gestuurd

    Scenario: Ik partner 2 wil voor het huwelijk via de website inloggen **Optioneel**
        Gegeven dat ik op de "voorgenomen-huwelijk/partner" pagina ben

        Wanneer ik op de "Partner inloggen met DigiD" link klik
        Dan word ik naar de "login" pagina gestuurd

    Scenario: Ik Partner 2 wil met DigID inloggen
        Gegeven dat ik op de "login" pagina ben
        En dat ik Partner 2 DigID heb

        Wanneer ik op een van de inloggen opties klik
        Dan word ik ingelogd door DigID
        En word ik naar de "persoonsgegevens" van mij pagina gestuurd

    Abstract Scenario: Ik Partner 2 wil mijn basisgegevens bevestigen
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        Dan zie ik de heading "Melding Voorgenomen Huwelijk"
        En zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie
        En zie ik dat mijn persoonsgegevens juist zijn
        En zie ik dat mijn adresgegevens juist zijn

        Voorbeelden:
            | datum                | tijd          | type       |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Eenvoudig  |
            | woensdag 10 mei 2024 | 13:30 – 13:45 | Eenvoudig  |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Uitgebreid |

    Scenario: Ik Partner 2 wil mijn telefoonnummer  invullen
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik een type tel input field zie

        Wanneer ik in de tel type input field mijn telefoonnummer invul
        Dan wordt het ingevulde nummer gecontroleerd voor geldigheid

    Scenario: Ik Partner 2 wil mijn telefoonnummer vals invullen
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik een type tel input field zie

        Wanneer ik in de tel type input field andere karakteren dan nummers typ
        Dan zie ik dat de niet nummers niet de tel type input field invullen

    Scenario: Ik Partner 2 wil mijn email invullen
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik een type email input field zie

        Wanneer ik in de type email input field mijn email invul
        Dan wordt het ingevulde email gecontroleerd voor geldigheid

    Scenario: Ik Partner 2 wil mijn email vals invullen
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik een type email input field zie

        Wanneer ik in de email type input field ongeldige karakteren typ
        Dan zie ik dat de ongeldige karateren de email type input field niet invullen

    Scenario: Ik Partner 2 wil verklaren dat ik niet getrouwd ben
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik een type checkbox input field met label "burgerlijke-staat" zie

        Wanneer ik op de checkbox klik
        Dan wordt het checkbox ingevuld

    Scenario: Ik Partner 2 wil verklaren dat ik niet binnen mijn familie ga trouwen
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik een checkbox input field met label "incest-check" zie

        Wanneer ik op de checkbox klik
        Dan wordt het checkbox ingevuld

    Scenario: Ik Partner 2 wil al de gegevens in het formulier bevestigen
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie zie
        En dat al de ingevulde gegevens in het formulier kloppen

        Wanneer ik op de checkbox met label "gegevensbevestiging" klik
        Dan wordt het checkbox ingevuld

        Voorbeelden:
            | datum                | tijd          | type       |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Eenvoudig  |
            | woensdag 10 mei 2024 | 13:30 – 13:45 | Eenvoudig  |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Uitgebreid |

    Scenario: Ik Partner 2 heb al de gegevens checkboxes ingevuld
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik al de checkbox met label "persoonsgegevens" ingevuld heb
        En dat ik al de checkbox met label "incest-check" ingevuld heb
        En dat ik al de checkbox met label "gegevensbevestiging" ingevuld heb
        Dan zie ik een "Contactgegevens opslaan" button

    Scenario: Ik Partner 2 wil mijn contactgegevens opslaan
        Gegeven dat ik op de "persoonsgegevens" pagina ben
        En dat ik al de checkbox met label "persoonsgegevens" ingevuld heb
        En dat ik al de checkbox met label "incest-check" ingevuld heb
        En dat ik al de checkbox met label "gegevensbevestiging" ingevuld heb
        En dat ik een "Contactgegevens opslaan" button zie

        Wanneer ik op de "Contactgegevens opslaan" button klik
        Dan word ik naar de "persoonsgegevens/succes" pagina gestuurd

    Scenario: Gekoppeling van gegevens bevestigen
        Gegeven dat ik op de "persoonsgegevens/succes" pagina ben
        Dan zie ik het correcte "<type>" huwelijk met de vroeger geselecteerde "<datum>" en "<tijd>" combinatie
        En zie ik de kosten voor het huwelijk
        En zie ik de heading "Gelukt"
        En zie ik een "Nodig getuigen uit" link

        Voorbeelden:
            | datum                | tijd          | type       |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Eenvoudig  |
            | woensdag 10 mei 2024 | 13:30 – 13:45 | Eenvoudig  |
            | woensdag 10 mei 2024 | 12:00 – 12:15 | Uitgebreid |

    Scenario: We willen getuigen uitnodigen
        Gegeven dat ik op de "persoonsgegevens/succes" pagina ben

        Wanneer ik op de "Nodig getuigen uit" link klik
        Dan word ik naar de "voorgenomen-huwelijk/getuigen" pagina gestuurd

    Scenario: We willen zien dat we op de "voorgenomen-huwelijk/getuigen" pagina zijn
        Gegeven dat ik op de "voorgenomen-huwelijk/getuigen" pagina ben
        Dan zie ik een "<type>" text input field met "<getuige>" label
        En zie ik een "<type>" email input field met "<getuige>" label

        Voorbeelden:
            | type  | getuige   |
            | text  | Getuige 1 |
            | email | Getuige 1 |
            | text  | Getuige 2 |
            | email | Getuige 2 |
            | text  | Getuige 3 |
            | email | Getuige 3 |
            | text  | Getuige 4 |
            | email | Getuige 4 |

    Abstract Scenario: We willen de email van "<getuige>" invullen
        Gegeven dat ik op de "voorgenomen-huwelijk/getuigen" pagina ben
        En dat ik in de "<text>" input field de naam van "<getuige>"  heb ingevuld
        Dan wordt het ingevulde "<email>" gecontroleerd voor geldigheid
        En zie ik een "Verstuur uitnodiging" button

        Voorbeelden:
            | text   | getuige   | email             |
            | eerste | Getuige 1 | jip@gmail.com     |
            | tweede | Getuige 2 | janneke@gmail.com |

    Scenario: We willen de uitnodigingen naar de getuigen sturen
        Gegeven dat ik op de "voorgenomen-huwelijk/getuigen" pagina ben
        En dat ik twee sets van text en email input fields heb ingevuld

        Wanneer ik op de "Verstuur uitnodiging" button klik
        Dan word ik naar de "voorgenomen-huwelijk/getuigen/succes" pagina gestuurd

    Scenario: We willen zien dat we op de "voorgenomen-huwelijk/getuigen/succes" pagina zijn
        Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/succes" pagina ben
        Dan zie ik de heading  "Gelukt!"
        En zie ik een "Vul aan met extra's" link

    Scenario: We willen extras aanvullen
        Gegeven dat ik op de "voorgenomen-huwelijk/getuigen/succes" pagina ben

        Wanneer ik op de "Vul aan met extra's" link klik
        Dan word ik naar de "extra" pagina gestuurd

    #nieuwe versie van de extras met vijf radio buttons
    Scenario: We willen zien dat we op de "extra" pagina zijn
        Gegeven dat ik op de "extra" pagina ben
        Dan zie ik de heading  "Kies je extra's"
        En zie ik een "trouwboekjes" image
        En zie ik een type radio radio group met 5 items

    Abstract Scenario: We willen verklaren dat wij "<trouwboekje>" trouwboekje willen
        Gegeven dat ik op de "extra" pagina ben

        Wanneer ik op de radio button "<trouwboekje>" klik
        Dan wordt de radio button "<option>" ingevuld
        En zie ik een "Deze wil ik hebben" button

        Voorbeelden:
            | trouwboekje      | option   |
            | geen trouwboekje | option 1 |
            | Wit              | option 2 |
            | Donkerblauw      | option 3 |
            | Rood             | option 4 |
            | Naturel          | option 5 |

    Scenario: We willen een van de trouwboekje opties kiezen
        Gegeven dat ik op de "extra" pagina ben

        Wanneer ik op één van de radio buttons klik
        Dan wordt alleen dat radio button ingevuld

    Scenario: We willen onze trouwboekje keuze hebben
        Gegeven dat ik op de "extra" pagina ben
        En dat ik een "Deze wil ik hebben" button zie

        Wanneer ik op "Deze wil ik hebben" button klik
        Dan word ik naar de "voorgenomen-huwelijk/checken" pagina gestuurd

    Scenario: We willen zien dat we op de "voorgenomen-huwelijk/checken" pagina zijn
        Gegeven dat ik op de "voorgenomen-huwelijk/checken" pagina ben
        Dan zie ik de heading  "Gelukt!"
        En zie ik een "Ga betalen" link

    Scenario: We willen betalen voor de huwelijk
        Gegeven dat ik op de "voorgenomen-huwelijk/checken" pagina ben

        Wanneer ik op de "Ga betalen" link klik
        Dan word ik naar de "voorgenomen-huwelijk/betalen" pagina gestuurd

    Scenario: We willen zien dat we op de "voorgenomen-huwelijk/betalen/succes" pagina zijn
        Gegeven dat ik op de "voorgenomen-huwelijk/betalen/succes" pagina ben
        Dan zie ik de heading  "Betaling ontvangen"
        En zie ik de heading "Dit hebben jullie doorgegeven"
        En zie ik de heading "Deze pagina is automatisch bewaard"
