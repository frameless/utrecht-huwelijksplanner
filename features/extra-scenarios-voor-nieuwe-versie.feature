# landing-pagina.feature

#Op de Meer informatie aside - zou het niet goed zijn hier een link naar “hoe krijg je een DigiD” bij te zetten?
#	Ja. Gaan we toevoegen.

Scenario: Ik wil zien wat ik van de huwelijksplanner van Utrecht kan verwachten
Gegeven dat ik op de "utrecht-huwelijksplanner" pagina ben
Dan zie ik de heading "Regel je huwelijk of geregistreerd partnerschap"
    En zie ik de heading "Welke stappen kun je verwachten?"
    En zie ik een lijst "Welke stappen kun je verwachten?" met verwachte stappen voor al de trouwopties
    En zie ik een aside "Meer informatie" 
    En zie ik een link "uitleg over DigiD" 
    En zie ik een "Start" button die zich gedraagd als link


#tekort-getuigen-eenvoudig-huwelijk.feature

#We streven ernaar om 3 weken vantevoren alles rond te hebben, dus een laatste reminder 4 weken vantevoren? En dan misschien nog eentje 6 weken vantevoren?
#Ik (en Constantijn) denken dat we nooit automatisch iets zouden moeten annuleren, maar het altijd een actie van de medewerker is om dit te doen. Aangezien de medewerker altijd nog het dossier controleert, zouden zij dit ook tijdig moeten kunnen signaleren. Ze kunnen dan ook geen akte uitdraaien, dus ze gaan dan sowieso bellen met het echtpaar.

@validate-flow
Abstract Scenario: De datumgrens voor het toevoegen van getuigen nadert
  Gegeven dat het trouwdatum binnen de komende "<weken>" zal zijn
  Dan krijg "<partner>" een herinnering email waarin staat dat het minimum aantal getuigen is nog niet bereikt
  Voorbeelden: 
    | weken | partner    | 
    | 6     | Partner 1  | 
    | 6     | Partner 2  | 
    | 4     | Partner 1  | 
    | 4     | Partner 2  | 
    | 3     | Partner 1  | 
    | 3     | Partner 2  | 

@validate-flow
Scenario: De datumgrens voor het toevoegen van getuigen is verlopen
Gegeven dat het trouwdatum binnen de komende 3 werkdagen zal zijn
Dan wordt Partner 1 opgebeld door een medewerker 



