Functionaliteit: Geregistreerd partnerschap
Scenario: Ik wil een geregistreerd partnerschap plannen
Gegeven dat ik ben op de "trouw opties" pagina 
    En ik zie de heading "Trouwen of geregistreerd partnerschap"
    //En ik ben op step "0" 
    En ik kan een "Geregistreerd partnerschap plannen" button zien
Wanneer ik op de "Geregistreerd partnerschap plannen" button klik
Dan word ik naar de "trouw opties geregistreerd partnerschap" pagina gestuurd 
    En ik ben op step "2"
#Hypothetisch geval waarin ik vanaf het allereerste begin het 
#type bruiloft kan kiezen dat ik wil. 
#In dit geval, een Geregistreerd Partnerschap


# language: nl

## step "0" 
Functionaliteit: Gratis Geregistreerd Partnerschap 
Scenario: Ik wil een geregistreerd partnerschap plannen proces beginnen
Gegeven dat ik ben op de "utrecht huwelijksplanner" pagina 
    En ik zie de heading "Regel je huwelijk of geregistreerd partnerschap" 
    //En ik ben op step "0" 
    En ik kan een "Start" button zien
Wanneer ik op de "Start" button klik
Dan word ik naar de "trouw opties" pagina gestuurd 
    En ik ben op step "1"

## step "1"
Scenario: Ik wil een geregistreerd partnerschap als trouw optie kiezen
Gegeven ik ben op de "trouw opties" pagina 
    En ik zie de heading "Trouwen of geregistreerd partnerschap"
    En ik ben op step "1"  
    En ik kan een "Geregistreerd partnerschap plannen" button zien
Wanneer ik op de "Geregistreerd partnerschap plannen" button klik
Dan word ik naar de "trouw opties geregistreerd partnerschap" pagina gestuurd 
    En ik ben op step "2" 