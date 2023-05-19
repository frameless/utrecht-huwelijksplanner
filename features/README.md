# Richtlijnen voor het schrijven van feature files van de huwelijksplanner

## Bronnen waarop de scenarios zijn gebaseerd

[Utrecht Huwelijksplanner Frameless](https://utrecht-huwelijksplanner.frameless.io/)

[Huwelijksplanner gemeente Utrecht (MVP)](https://github.com/frameless/wiki/wiki/Huwelijksplanner-gemeente-Utrecht)

## Voorbeeld Scenario

```
## stap "1"
Scenario: Ik wil zien dat ik op de trouw-opties pagina ben
Gegeven dat ik op de "/trouw-opties" pagina ben
Dan zie ik de heading "Trouwen of geregistreerd partnerschap"
  En ben ik op stap "1"
  En zie ik een "Trouwen plannen" button

```

## Richtlijnen

### Gherkin Keywords

1. De Gherkin keywords Functionaliteit en Scenario worden altijd gevolgd door een `:`.
2. Het eerste woord na elke Functionaliteit en Scenario Gherkin keyword krijgt een hoofdletter.
3. Het eerste woord na elk andere Gherkin keywoord krijgt een kleine letter.

### Web pagina's

1. De woorden waaruit de naam van de pagina bestaat, zijn afkomstig van de url van dezelfde pagina, na de `/` symbool.
2. De woorden waaruit de naam van de pagina bestaat, worden zonder `-` geschreven met een spatie ertussen.
3. De namen van de paginas worden in kleine letters geschreven.
4. De namen van de paginas worden altijd geschreven tussen `" "`.
5. De namen van de paginas tussen dubbele aanhalingstekens worden altijd gevolgd door het woord `pagina` met een spatie ertussen.

#### Voorbeeld

```
https://utrecht-huwelijksplanner.frameless.io/trouw-opties

Gegeven dat ik ben op de "trouw opties" pagina
```

### Headings

1. De woorden waaruit de naam van de heading bestaat, zijn afkomstig van de heading van dezelfde pagina.
2. De woorden waaruit de naam van de heading bestaat, zijn geschreven zoals ze op de website verschijnen met inachtneming van spaties, symbolen en hoofdletters.
3. De naam van de heading is altijd geschreven tussen `" "`.
4. Voor de naam van de heading tussen dubbele aanhalingstekens komt altijd het woord `heading` met een spatie ertussen.

#### Voorbeeld

```
<h1>Trouwen of geregistreerd partnerschap</h1>

En ik zie de heading "Trouwen of geregistreerd partnerschap"
```

### Steps

1. De scenarios zijn gegroepeerd per stap van de huwelijksplanner.
2. Elke stap groep is aangegeven met een comment Voorbeeld: `## stap "1" `.
3. Als de stap verandert binnen een scenario staat dat binnen het `Dan` codeblock met het keywoord `En`.
4. Het nummer van elke stap wordt als cijfer gegeven tussen `" "`.
5. Het nummer van elke stap wordt altijd voorafgegaan door het woord `step` met een spatie ertussen.

#### Voorbeeld

```
Dan word ik naar de "trouw opties huwelijk" pagina gestuurd
    En ik ben op step "2"
```

### Buttons

1. Een button wordt aangegeven met de tekst zoals deze op de button staat.
2. De button tekst in het scenario is precies hetzelfde als op de website. Dus inclusief hoofdletters, kleine letters, spaties en symbolen.
3. De namen van een buttons worden altijd geschreven tussen `" "`.
4. De namen van een button tussen haakjes wordt altijd gevolgd door het woord `button` met een spatie ertussen.

#### Voorbeeld

```
<button>Trouwen plannen</button>

En ik kan een "Trouwen plannen" button zien
Wanneer ik op de "Trouwen plannen" button klik
```

### Links

1. Een link wordt aangegeven met de tekst zoals deze op de link staat.
2. De link tekst in het scenario is precies hetzelfde als op de website. Dus inclusief hoofdletters, kleine letters, spaties en symbolen.
3. De namen van de links worden altijd geschreven tussen `" "`.
4. De namen van de links tussen dubbele aanhalingstekens worden altijd gevolgd door het woord `link` met een spatie ertussen.

#### Voorbeeld

```
<a href="url">Neem contact op met de gemeente</a>

En ik zie een "Neem contact op met de gemeente" link
```

## Extra Rules

1. Het document wordt in het Nederlands geschreven.
2. De feature files zijn in Gherkin geschreven.
3. De scenario's zijn standaard vanuit het perspectief van `Partner 1` geschreven. Wanneer het scenario vanuit een ander perspectief is, staat dat in het `Gegeven` codeblock.
