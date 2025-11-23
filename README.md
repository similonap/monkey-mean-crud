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
