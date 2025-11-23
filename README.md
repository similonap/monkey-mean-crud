# Monkeys CRUD App

## Data importeren en referenties aanpassen

We hebben twee bestanden `monkeys.json` en `species.json` die we willen importeren in onze MongoDB database. Er zit een referentie tussen de twee collecties: elke aap heeft een `speciesId` die verwijst naar een document in de `species` collectie. Hoewel de data in json al wel een id heeft, willen we deze niet gebruiken als de `_id` in MongoDB. MongoDB genereert namelijk automatisch een unieke `_id` voor elk document, en we willen deze functionaliteit behouden. 

Dit betekent dat we tijdens het importeren de referenties moeten bijwerken zodat ze verwijzen naar de nieuwe `_id` waarden die MongoDB genereert.

We kunnen dit op de volgende manier doen:

```sh
mongoimport \
  --db=monkey-db \
  --collection=species \
  --file=species.json \
  --jsonArray

mongoimport \
  --db=monkey-db \
  --collection=monkeys_raw \
  --file=monkeys.json \
  --jsonArray
```

Dit importeert de `species` collectie en de `monkeys_raw` collectie. We importeren de apen eerst in een tijdelijke collectie `monkeys_raw` zodat we de referenties kunnen bijwerken.

Kijk goed hoe de data eruit ziet in `monkeys_raw` en `species` vooraleer je verder gaat. Zorg zeker goed dat je begrijpt waarom we dit doen.

Gebruik nu een `mongo` shell of `compass` om de referenties bij te werken en de data over te zetten naar de uiteindelijke `monkeys` collectie:

```js
use monkey-db;  

const speciesMap = {};
db.species.find().forEach(s => {
  speciesMap[s.id] = s._id;
});

db.monkeys_raw.find().forEach(m => {
  db.monkeys.insertOne({
    ...m,
    species: speciesMap[m.species_id], // the real reference
  });
});

db.monkeys.updateMany({}, { $unset: { species_id: "" } });
```

Kijk nu in de `monkeys` collectie om te zien of alles correct is overgezet.

## De nestjs backend 

### Referentie tussen Monkey en Species modellen

Er is een NestJS backend voorzien waar al controllers, modules en services voor de `species` en `monkeys` zijn aangemaakt. Belangrijk is dat er een referentie bestaat tussen de `Monkey` en `Species` modellen. Elke monkey heeft namelijk een `species` veld dat verwijst naar een `Species` document.

De referentie is nog niet volledig geïmplementeerd. Je moet een aanpassing doen aan het `monkey.schema.ts` bestand om deze referentie correct te maken.

Voeg de volgende regel toe aan het `Monkey` schema in `monkey.schema.ts`:

```ts
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: Species.name })
species: Species;
```

Dit zorgt ervoor dat het `species` veld in het `Monkey` schema een referentie is naar een document in de `Species` collectie.

### Swagger toevoegen

Om de API documentatie te verbeteren, willen we Swagger integreren in onze NestJS applicatie. Swagger biedt een interactieve interface om de API endpoints te verkennen en te testen.

Je kan swagger toevoegen door de volgende stappen te volgen:

1. Installeer de benodigde Swagger pakketten:

```bash
npm install --save @nestjs/swagger
```

2. Configureer Swagger in de `main.ts` file van je NestJS applicatie:

```ts
  const config = new DocumentBuilder()
    .setTitle('Monkeys example')
    .setDescription('The Monkeys API description')
    .setVersion('1.0')
    .addTag('monkeys')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
```

3. Voeg de nodige decorators toe aan je DTO's en controllers om de Swagger documentatie te verrijken. Bijvoorbeeld, in je DTO's kan je `@ApiProperty()` gebruiken om velden te beschrijven. Je kan ook gebruik maken van `PartialType`, `PickType`, en `OmitType` om variaties van je DTO's te maken voor verschillende doeleinden (zoals updates). Deze worden automatisch herkend door Swagger. Pas de DTO's aan zoals hieronder:

```ts
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateMonkeyDTO {
    name!: string;
    @ApiProperty()
    description!: string;
    @ApiProperty()
    country!: string;
    @ApiProperty()
    gender!: string;
    @ApiProperty()
    weight!: number;
    @ApiProperty()
    height!: number;
    @ApiProperty()
    year!: number;
    @ApiProperty()
    likes!: number;
    @ApiProperty()
    personality_trait!: string;
    @ApiProperty()
    image!: string;
    @ApiProperty()
    species_id!: number;
}

export class UpdateMonkeyDTO extends PartialType(CreateMonkeyDTO) {
    species_id?: number;
}

export class MonkeyQueryDTO {
    @ApiProperty({ required: false })
    q?: string;

    @ApiProperty({ required: false, default: 'id' })
    sortField?: string;

    @ApiProperty({ required: false, default: 'asc', enum: ['asc', 'desc'] })
    sortOrder?: 'asc' | 'desc';
}
```

en 

```ts
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class GroupToleranceDTO {
    @ApiProperty()
    minGroupSize!: number;
    @ApiProperty()
    maxGroupSize!: number;
}

export class CreateSpeciesDTO {
    @ApiProperty()
    name!: string;
    @ApiProperty()
    habitatType!: string;
    @ApiProperty()
    diet!: string[];
    @ApiProperty()
    endangermentStatus!: string;
    @ApiProperty()
    groupTolerance!: GroupToleranceDTO;
}

export class UpdateSpeciesDTO extends PartialType(CreateSpeciesDTO) {}

export class SpeciesQueryDTO {
    @ApiProperty({ required: false })
    q?: string;

    @ApiProperty({ required: false, default: 'id' })
    sortField?: string;

    @ApiProperty({ required: false, default: 'asc', enum: ['asc', 'desc'] })
    sortOrder?: 'asc' | 'desc';
}
```

4. Start je NestJS applicatie opnieuw op en navigeer naar `http://localhost:3000/api` om de Swagger UI te bekijken. Je zou nu een interactieve documentatie van je API moeten zien, inclusief de endpoints voor `monkeys` en `species`. Test de endpoints direct vanuit de Swagger UI om te verifiëren dat alles correct werkt.

## Angular Frontend

Bouw een angular frontend applicatie met de volgende routes. Gedeeltelijk zijn de routes al aangemaakt en de services om met de backend te communiceren zijn ook al voorzien.

### Route: `/monkeys`

Toont een tabel met alle monkeys. De tabel moet sorteerbaar zijn op alle kolommen. Elke rij in de tabel is klikbaar en leidt naar de detailpagina van de betreffende monkey. De volgende informatie moet getoond worden in de tabel:

- Image (niet sorteerbaar)
- ID (sorteerbaar)
- Name (sorteerbaar)
- Species (niet sorteerbaar)
- Country (sorteerbaar)
- Gender (sorteerbaar)
- Weight (sorteerbaar)
- Height (sorteerbaar)
- Year (sorteerbaar)
- Likes (sorteerbaar)
- Personality (sorteerbaar)
 
Als je op de header van een kolom klikt, moet de tabel gesorteerd worden op die kolom. Een tweede klik op dezelfde header moet de sorteervolgorde omkeren.

Naast de tabel moet er ook een zoekveld zijn waarmee je kan filteren op naam van de monkey. De filtering moet gebeuren terwijl je typt.

### Route: `/monkeys/:id`

Toont de detailpagina van een specifieke monkey. Alle informatie over de monkey moet getoond worden, inclusief een afbeelding. Daarnaast moet ook de naam van de species getoond worden waar de monkey toe behoort.

Naast de informatie over de monkey moet er ook de volgende functionaliteit zijn:
- Zorg voor een link naar een pagina waarmee je de monkey kan bewerken.
- Zorg voor een knop om de monkey te verwijderen. Na het verwijderen moet je terugkeren naar de lijst met monkeys.
- Zorg voor een link om terug te keren naar de lijst met monkeys.

### Route: `/monkeys/:id/edit`

Maak een pagina waar je de gegevens van een bestaande monkey kan bewerken. Alle velden behalve de ID moeten bewerkbaar zijn. Na het opslaan van de wijzigingen moet je terugkeren naar de detailpagina van de monkey. 

Zorg voor een preview van de afbeelding terwijl je een nieuwe URL invoert. 

### Route: `/monkeys/new`

Maak een pagina waar je een nieuwe monkey kan aanmaken. Alle velden behalve de ID moeten ingevuld kunnen worden. Na het aanmaken van de nieuwe monkey moet je terugkeren naar de detailpagina van de nieuw aangemaakte monkey. 

Je kan eventueel gebruik maken van een gemeenschappelijke component voor het formulier dat zowel in de `edit` als in de `new` pagina gebruikt wordt.

### Route: `/species`

Toont een lijst van alle species. Voor elke species moet de volgende informatie getoond worden:

- ID
- Name
- Habitat Type
- Diet (als een komma-gescheiden lijst)
- Endangerment Status
- Group Tolerance (als "min - max")

In deze lijst moet je niet kunnen sorteren of filteren. Als je op een species klikt, moet je naar de detailpagina van die species gaan.

### Route: `/species/:id`

Toont de detailpagina van een specifieke species. Alle informatie over de species moet getoond worden, inclusief een lijst van alle monkeys die tot deze species behoren. Je moet dezelfde informatie tonen als in de `/monkeys` lijst, maar dan enkel voor de monkeys van deze species (hier moet dus geen sortering of filtering zijn).

