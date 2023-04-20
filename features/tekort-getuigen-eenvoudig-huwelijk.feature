@validate-flow
Abstract Scenario: De datumgrens voor het toevoegen van getuigen nadert
  Gegeven dat het trouwdatum binnen de komende "<dagen>" werkdagen zal zijn
  Dan krijg "<partner>" een herinnering email waarin staat dat het minimum aantal getuigen is nog niet bereikt
  Voorbeelden: 
    | dagen | partner    | 
    | 10    | Partner 1  | 
    | 10    | Partner 2  | 
    | 05    | Partner 1  | 
    | 05    | Partner 2  | 



Scenario: De datumgrens voor het toevoegen van getuigen is verlopen
Gegeven dat het trouwdatum binnen de komende 3 werkdagen zal zijn
Dan krijg Partner 1 een email bevestiging dat de bruiloft is geannuleerd omdat er niet op tijd genoeg getuigen waren aangegeven
    En krijg Partner 2 een email bevestiging dat de bruiloft is geannuleerd omdat er niet op tijd genoeg getuigen waren aangegeven



