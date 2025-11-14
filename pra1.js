// Actividad realizada en Github: https://github.com/mdiezcasas-uoc/20251-PR1

// 1. Declaración de la clase Pokemon, que representa a un objeto Pokemon.
class Pokemon {
    constructor({ id, name, description, height, weight, baseExperience, abilities, types, sprites, stats }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.height = height;
        this.weight = weight;
        this.baseExperience = baseExperience;
        this.abilities = abilities;
        this.types = types;
        this.sprites = sprites;
        this.stats = stats;
    }

    // === Getters y Setters ===
    get getId() {
        return this.id;
    }

    set setId(id) {
        this.id = id;
    }

    get getName() {
        return this.name;
    }

    set setName(name) {
        this.name = name;
    }

    get getDescription() {
        return this.description;
    }

    set setDescription(description) {
        this.description = description;
    }

    get getHeight() {
        return this.height;
    }

    set setHeight(height) {
        this.height = height;
    }

    get getWeight() {
        return this.weight;
    }

    set setWeight(weight) {
        this.weight = weight;
    }

    get getBaseExperience() {
        return this.baseExperience;
    }

    set setBaseExperience(baseExperience) {
        this.baseExperience = baseExperience;
    }

    get getAbilities() {
        return this.abilities;
    }

    set setAbilities(abilities) {
        this.abilities = abilities;
    }

    get getTypes() {
        return this.types;
    }

    set setTypes(types) {
        this.types = types;
    }
    
    get getSprites() {
        return this.sprites;
    }

    set setSprites(sprites) {
        this.sprites = sprites;
    }

    get getStats() {
        return this.stats;
    }

    set setStats(stats) {
        this.stats = stats;
    }
}


// 2. Declaración de la clase PokemonList.
class PokemonList {
    constructor() {
        this.pokemons = [];
    }

    // Añade un Pokémon a la lista, previniendo duplicados.
    addPokemon(pokemon) {
        if(!this.pokemons.includes(pokemon)) {
            this.pokemons = [...this.pokemons, pokemon];
        }
    }

    // Elimina un Pokémon de la lista por ID.
    removePokemon(pokemonId) {

        // Obtiene la posición del Pokémon con el ID seleccionado.
        let index = this.pokemons.map((pokemon) => pokemon.id).indexOf(pokemonId);

        // Valida si el Pokémon existe comprobando que se ha obtenido un índice válido y elimina el registro si existe.
        // En caso contrario, devuelve un mensaje indicando que el registro no se ha encontrado.
        if (index != -1) {
            this.pokemons.splice(index, 1);
        } else {
            return `No se ha encontrado ningún Pokémon con el id ${pokemonId}.`;
        }
    }

    // Devuelve un listado de pokemons únicamente incluyendo su nombre, tipo principal y la imagen. 
    showList() {
        return this.pokemons.map((pokemon) => {
            return {
                name: pokemon.name,
                mainType: pokemon.types[0],
                sprites: pokemon.sprites,
            }
        });
    }


    // 3. Funciones flecha.

    // Añade múltiples Pokémon a la vez.
    addMultiplePokemons = (...pokemons) => {

        // Previene duplicados al añadir elementos a la lista, filtrando los duplicados 
        // tanto en los atributos de entrada como en la lista principal.
        const pokemonsToAdd = pokemons.filter((pokemon, position) => {
            return pokemons.indexOf(pokemon) === position && !this.pokemons.includes(pokemon);
        });

        // Incluye los registros no duplicados en el listado.
        this.pokemons = [...this.pokemons, ...pokemonsToAdd];
    };

    // Develve los pokemons dentro del rango de peso indicado (el primer peso está incluido, el segundo no).
    getPokemonsByWeightRange = (minWeight, maxWeight) => {
        return this.pokemons.filter((pokemon) => pokemon.weight >= minWeight && pokemon.weight < maxWeight);
    };

    // Ordena Pokémons de forma descenciente (de mayor a menor) según su experienica base.
    sortPokemonsByBaseExperience = () => {
        return [...this.pokemons].sort((a, b) => b.baseExperience - a.baseExperience);
    };

    // Busca de forma recursiva un Pokémon por ID y devuelve el registro encontrado o un mensaje en caso de no haber encontrado ninguno.
    findPokemonById(id, index = 0) {

        // Controla la búsqueda de un id inexistente, en caso de no haber encontrado el registro, el índice supera la longitud del array.
        if (index > this.pokemons.length-1) return `No se ha encontrado ningún Pokémon con el id ${id}.`;

        // Devuelve el Pokémon encontrado.
        if (this.pokemons[index].id === id) return this.pokemons[index];

        // Se llama a sí misma de forma recursiva para seguir con la búsqueda, incrementando el índice.
        return this.findPokemonById(id, index += 1);
    }


    // Devuelve el tipo de Pokémon más común. En caso de no obtener un ganador claro, devuelve un mensaje indicándolo.
    getMostCommonType() {

        // Recopilación de todos los tipos en un array.
        let allTypes = [];
        this.pokemons.forEach((element) => element.types.forEach((type) => allTypes.push(type)));

        // Uso del método reduce para determinar el tipo más común.
        let result = allTypes.reduce(
            (accumulator, type) => {

                // Inicializa el contador de cada tipo encontrado y le suma uno.
                accumulator.mapping[type] = (accumulator.mapping[type] || 0) + 1;

                // Controla cuál es el mínimo, es decir, cuantas veces aparece el tipo que menos veces está repetido.
                // Se realiza este seguimiento para después poder contrastar contra la ocurrencia máxima.
                if (accumulator.min === 0 && accumulator.mapping[type] > 0) {
                    accumulator.min = accumulator.mapping[type];
                }

                // Si encuentra un tipo menos veces registrado que el mínimo actual, se guarda su valor
                // como el nuevo mínimo.
                if (accumulator.mapping[type] < accumulator.min) {
                    accumulator.min = accumulator.mapping[type];
                }

                // Si la cantidad de occurencias del tipo es el mismo que el máximo actual,
                // suma uno para saber cuántos tipos compiten por el primer puesto.
                if (accumulator.mapping[type] === accumulator.max) {
                    accumulator.maxCount += 1;
                }

                // Controla cuál es el máximo, es decir, cuantas veces aparece el tipo que más veces está repetido
                // y asigna el tipo más común.
                if (accumulator.mapping[type] > accumulator.max) {
                    accumulator.max = accumulator.mapping[type];
                    accumulator.mostCommon = type;

                    // Resetea el contador de la cantidad de registros máximos encontrados, ya que el máximo ha cambiado. 
                    if (accumulator.maxCount > 0) {
                        accumulator.maxCount = 0;
                    }

                    // Suma uno para contar el registro actual.
                    accumulator.maxCount += 1;
                }

                return accumulator;
            },
            
            // Objeto inicial del método reduce, contiene:
            //  - mapping    -> un mapeo (mapping) de los tipos y su cantidad de ocurrencias.
            //  - min        -> cuantas veces aparece el tipo menos ocurrente.
            //  - max        -> cuantas veces aparece el tipo más ocurrente.
            //  - maxCount   -> cantidad de tipos que compiten por el primer puesto.
            //  - mostCommon -> el tipo más ocurrente.
            {
                mapping: {},
                min: 0,
                max: 0,
                maxCount: 0,
                mostCommon: '',
            }
        );

        // Si la cantidad mínima y máxima de ocurrencias es la misma o hay más de un tipo que compite por el primer puesto
        // se entiende que no hay un ganador claro, porque hay más de un registro con el mismo número de ocurrencias.
        // En este caso se devuelve un mensaje indicándolo, y en caso contrario, el tipo más común.  
        return result.min === result.max || result.maxCount > 1 ? 'No hay un tipo más común.' : result.mostCommon;
    }

    // Devuelve un array con el nombre de los Pokémons que tengan un ataque mayor o igual al indicado.
    getStrongPokemons(minAttack) {
        return this.pokemons.filter((pokemon) => {
            for (let stat of pokemon.stats) {
                if (stat.name === 'attack' && stat.value >= minAttack) {
                    return pokemon;
                }
            }
        }).map((pokemon) => pokemon.name);
    }
}


/* =======================================
     DATOS DE EJEMPLO PARA LA VALIDACIÓN
   ======================================= */

const pikachu = new Pokemon({
    id: 25,
    name: "Pikachu",
    description: "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    height: 4,
    weight: 60,
    baseExperience: 112,
    abilities: ["static", "lightning-rod"],
    types: ["electric"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    stats: [
        { name: "hp", value: 35 },
        { name: "attack", value: 55 },
        { name: "defense", value: 40 },
        { name: "speed", value: 90 }
    ]
});

const bulbasaur = new Pokemon({
    id: 1,
    name: "Bulbasaur",
    description: "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    height: 7,
    weight: 69,
    baseExperience: 64,
    abilities: ["overgrow", "chlorophyll"],
    types: ["grass", "poison"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    stats: [
        { name: "hp", value: 45 },
        { name: "attack", value: 49 },
        { name: "defense", value: 49 },
        { name: "speed", value: 45 }
    ]
});

const charmander = new Pokemon({
    id: 4,
    name: "Charmander",
    description: "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    height: 6,
    weight: 85,
    baseExperience: 62,
    abilities: ["blaze", "solar-power"],
    types: ["fire"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    stats: [
        { name: "hp", value: 39 },
        { name: "attack", value: 52 },
        { name: "defense", value: 43 },
        { name: "speed", value: 65 }
    ]
});

const vulpix = new Pokemon({
    id: 37,
    name: "Vulpix",
    description: "At the time of birth, it has just one tail. The tail splits from its tip as it grows older.",
    height: 6,
    weight: 99,
    baseExperience: 60,
    abilities: ["flash-fire", "drought"],
    types: ["fire"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/37.png",
    stats: [
        { name: "hp", value: 38 },
        { name: "attack", value: 41 },
        { name: "defense", value: 40 },
        { name: "speed", value: 65 }
    ]
});

const jigglypuff  = new Pokemon({
    id: 39,
    name: "Jigglypuff",
    description: "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.",
    height: 5,
    weight: 55,
    baseExperience: 95,
    abilities: ["cute-charm", "competitive", "friend-guard"],
    types: ["normal", "fairy"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/39.png",
    stats: [
        { name: "hp", value: 115 },
        { name: "attack", value: 45 },
        { name: "defense", value: 20 },
        { name: "speed", value: 20 }
    ]
});

const abra = new Pokemon({
    id: 63,
    name: "Abra",
    description: "Using its ability to read minds, it will identify impending danger and TELEPORT to safety.",
    height: 9,
    weight: 195,
    baseExperience: 62,
    abilities: ["synchronize", "inner-focus", "magic-guard"],
    types: ["psychic"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/63.png",
    stats: [
        { name: "hp", value: 25 },
        { name: "attack", value: 20 },
        { name: "defense", value: 15 },
        { name: "speed", value: 90 }
    ]
});

const ponyta = new Pokemon({
    id: 77,
    name: "Ponyta",
    description: "Its hooves are 10 times harder than diamonds. It can trample anything completely flat in little time.",
    height: 10,
    weight: 300,
    baseExperience: 82,
    abilities: ["run-away", "flash-fire", "flame-body"],
    types: ["fire"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/77.png",
    stats: [
        { name: "hp", value: 50 },
        { name: "attack", value: 85 },
        { name: "defense", value: 55 },
        { name: "speed", value: 90 }
    ]
});

const gengar = new Pokemon({
    id: 94,
    name: "Gengar",
    description: "Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright.",
    height: 15,
    weight: 405,
    baseExperience: 225,
    abilities: ["cursed-body"],
    types: ["ghost", "poison"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94.png",
    stats: [
        { name: "hp", value: 60 },
        { name: "attack", value: 65 },
        { name: "defense", value: 60 },
        { name: "speed", value: 110 }
    ]
});

const goldeen = new Pokemon({
    id: 118,
    name: "Goldeen",
    description: "Its tail fin billows like an elegant ballroom dress, giving it the nickname of the Water Queen.",
    height: 6,
    weight: 150,
    baseExperience: 64,
    abilities: ["swift-swim", "water-veil", "lightning-rod"],
    types: ["water"],
    sprites: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/118.png",
    stats: [
        { name: "hp", value: 45 },
        { name: "attack", value: 67 },
        { name: "defense", value: 60 },
        { name: "speed", value: 63 }
    ]
});


/* ====================================
        EJEMPLOS DE USO Y VALIDACIÓN
   ==================================== */

// Crea un objeto Pokémon vacío para rellenarlo posteriormente con los setters.
const entei = new Pokemon({});

// Uso de setters para rellenar los datos del Pokémon.
entei.setId = 244;
entei.setName = "Entei";
entei.setDescription = "Volcanoes erupt when it barks. Un­able to restrain its extreme power, it races headlong around the land.";
entei.setHeight = 21;
entei.setWeight = 1980;
entei.setBaseExperience = 261;
entei.setAbilities = ["pressure", "inner-focus"];
entei.setTypes = ["fire"];
entei.setSprites = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/244.png";
entei.setStats = [
    { name: "hp", value: 115 },
    { name: "attack", value: 115 },
    { name: "defense", value: 85 },
    { name: "speed", value: 100 }
];

// Uso de getters para consultar y comprobar que todas las propiedades han sido insertadas correctamente.
console.log("Id:", entei.getId);
console.log("Name:", entei.getName);
console.log("Description:", entei.getDescription);
console.log("Height:", entei.getHeight);
console.log("Weight:", entei.getWeight);
console.log("Base Experience:", entei.getBaseExperience);
console.log("Abilities:", entei.getAbilities);
console.log("Types:", entei.getTypes);
console.log("Sprites:", entei.getSprites);
console.log("Stats:", entei.getStats);

// Crea una lista de Pokémons vacía para rellenarla posteriormente con los métodos.
const pokedex = new PokemonList();

// Ejemplo 1: Añade un Pokémon a la lista.
pokedex.addPokemon(entei);
console.log('Pokémon añadido a la Pokédex:', pokedex.pokemons);

// Ejemplo 2: Añade múltiples Pokémons a la lista de golpe.
// Se puede ver que el método evita añadir Pokémons duplicados a la lista.
pokedex.addMultiplePokemons(entei, bulbasaur, charmander, bulbasaur, pikachu, vulpix, jigglypuff, abra, ponyta, gengar, goldeen);
console.log('Múltiples Pokémons añadidos a la Pokédex:', pokedex.pokemons);

// Ejemplo 3: Elimina un Pokémon por ID.
pokedex.removePokemon(1);
console.log('Se ha eliminado el Pokémon con el id 1 de la Pokédex:', pokedex.pokemons);

// Ejemplo 4: Intenta eliminar un Pokémon con un ID inexistente.
// El Pokémon con ID 200 no existe en nuestra lista, por lo que nos sacará un mensaje por consola.
console.log(pokedex.removePokemon(200), 'Por ello, la Pokédex se queda igual:', pokedex.pokemons);

// Ejemplo 5: Muestra la lista de Pokémons.
console.log('Lista de Pokémons en la Pokédex:', pokedex.showList());

// Ejemplo 6: Obtiene una lista de Pokémons por rango de peso.
let filteredPokemonsByWeight = pokedex.getPokemonsByWeightRange(80, 200);
console.log('Lista de Pokémons que pesan entre 80 y 200 (ambos incluidos):', filteredPokemonsByWeight);

// Ejemplo 7: Ordena Pokémon por experiencia base.
console.log('Pokémons ordenados por experiencia base (descendiente):', pokedex.sortPokemonsByBaseExperience());

// Ejemplo 8: Busca un Pokémon por ID.
console.log(pokedex.findPokemonById(112));
console.log('El Pokémon con id 25 es:', pokedex.findPokemonById(25));

// Ejemplo 9: Muestra el tipo más común.
let mostCommonType = pokedex.getMostCommonType();
console.log('El Pokémon más común en la Pokédex es de tipo:', mostCommonType);

// Ejemplo 10: Obtiene y muestra los Pokémons con ataque mayor o igual a 80.
let strongestPokemons = pokedex.getStrongPokemons(80);
console.log('Lista de los pokemons más fuertes (mayor o igual a 80):', strongestPokemons);
