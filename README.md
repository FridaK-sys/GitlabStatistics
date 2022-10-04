# Gitlab statistics

## React-oppsett
Nettsiden er delt inn i flere sidekomponenter. Vi har en navigasjonsbar på toppen av siden som alltid vises. I denne er det mulig å legge til hvilket repository, med tilhørende token, som man ønsker hente informasjon fra. Dersom brukeren trykker på `Get repository` lagres verdiene for repoet og token i localstorage slik at det både kan huskes i formet og samtidig brukes ellers på nettsiden. Ved å trykke på `Clear selection` fjernes informasjonen fra localstorage.

- Navigasjonsbaren gir også brukeren mulighet til å navigere mellom de resterende fem sideelementene på nettstedet. Disse er funksjonelle komponenter som linkes til vha. routing i App.tsx. Innholdet til disse er som følger:
- Hovedsiden viser overordnede data om repoet. Her får brukeren informasjon om commits, issues, branches og tidligere viste repositories.
- Issues viser alle issues i prosjektet. Her kan brukeren filtrere mellom å vise åpne, lukkede eller alle issues. Dette gjøres ved velge “closed”, “not closed” eller “all” fra en rullegardinmeny øverst på siden. Valget fra brukeren resulterer i at issuesene som vises oppdateres vha. useState. Hvert valg har et spesifikt nummer som blir lagret i sessionstorage dersom det er valgt. På denne måten kan brukeren gå inn og ut av siden uten at valget blir mistet.
- Commits viser alle commits i branchen main i prosjektet.
- Chart viser en graf som gir brukeren en oversikt over antall commits per dag. Her kan brukeren filtrere på hvilken branch ønsker data om. Filtreringen er utført på samme måte som i issues.
- Settings gir brukeren mulighet til å endre mellom “dark” og “light”-mode på nettsiden.

For å lagre og endre tilstand til komponentene har vi bruke states og props. States er brukt i  issues-, commits- og homepage-komponentene for å lagre informasjon om det som vises. Verdiene i disse oppdateres ettersom brukeren filtrerer/endrer hvilket repo data hentes fra.
Props er brukt i Graph filen vår. Hensikten med props er å levere data mellom React komponenter. CommitsToGraph-komponenten sender dataen (commits per dag) til chart-komponenten ved hjelp av props.

## Henting av data
For å kunne vise dataen vi ønsker, så henter vi informasjon om prosjektet ved å bruke prosjekt-iden. Dersom brukeren skriver inn noe annet enn en prosjekt-id vil siden kræsje og siden det siste brukeren skrev inn i feltene blir lagret i localstorage vil den kræsje hver gang man åpner siden. Dette kan fikses ved å å slette form-keyen i localstorage og åpne siden på nytt.  Vi så på REST-apiet til gitlab og fant ut at det har endepunkter for å hente mye informasjon om issues og commits. Vi tenkte dette er bra informasjon å hente fordi det er enkelt å vise frem informasjon om disse, i tillegg til at det er informasjon mange vil ha fordi det er elementer fra gitlab som ofte brukes. For å hente ut dataen fra gitlab-serveren har vi brukt AJAX og funksjonen fetch(). Api kallet returnerer JSON objekter med verdier som vi har definert i filen types.ts. Typene er tilsvarende endepunktene til REST-apiet til Gitlab. 

## Testing med Jest
Gruppen har brukt jest for å teste ulike komponenter i appen. Vi har testet at knappene på navigeringsbaren fungerer. Gruppen valgte å teste knappene da det er essensielt at knappene fungerer for at et repo skal kunne hentes ut. I tillegg har vi brukt en snapshottest for Settings-komponenten. Snapshottest sikrer at brukergrensesnittet ikke endrer seg uventet. Når denne testen kjøres, blir det laget en snapshot fil. Hvis det allerede eksisterer en snapshot fil tilhørende en test, vil denne overskrives. Man kan finne alle snapshot filene i mappen `__snapshots__`. 

## Fleksibel layout
Vi har implementert fleksibel layout på nettsiden. I Homepage er det benyttet viewport og en media-query for å definere om listen med nylig brukte repoer er en kolonne på høyre side (typisk ved fullskjerm på en laptop), eller om denne listen skal havne under annen informasjon på Homepage. I Issues og Commits benyttes rammeverket antdesign for å definere hvor mange kolonner med kort som vises ved forskjellige skjermstørrelser. 

## Context API
Gruppen har brukt Context APIet til å bytte mellom light og dark mode på nettstedet. I ThemeContext lager vi et context med verdien theme og funksjonen toggleTheme. Disse blir definert i ThemeProvider og sendes videre til og kan brukes av alle komponenter som routes til i App.tsx. I settingsfilen kan brukeren skifte mellom dark eller light mode. Dette gjør at alle komponenter som bruker theme til å velge farge forandrer fargen.

## Testing av brukergrensesnitt og responsivt design
Gruppen har i tillegg testet at websiden funker på ulike skjermstørrelser. Vi har testet på mobil med vertikal og horisontal orientering, samt en ordinær pc skjerm. Siden fungerer godt på de ulike skjermene, sideelementene skalerer og kommer under hverandre dersom det ikke er plass og alt vises innenfor skjermen. I tillegg fungerer det å bytte mellom light og dark mode på alle skjermene.



