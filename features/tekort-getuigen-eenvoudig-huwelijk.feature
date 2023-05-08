@validate-flow
Scenario Outline: De datumgrens voor het toevoegen van getuigen nadert
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
  En dat er nog niet genoeg getuigens zijn uitgenodigd
Dan wordt een medeweker gewaarschuwd over de nog steeds onvoltooid getuigenuitnodigingsproces
  En wordt Partner 1 opgebeld door een medewerker 




