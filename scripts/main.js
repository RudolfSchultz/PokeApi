const myPokedex = {};
const GenList = [];
let pokemon;
let alltypes;
const generationURL = `https://pokeapi.co/api/v2/generation`;
const pokemonURL = `https://pokeapi.co/api/v2/pokemon/`;
const typeURL = `https://pokeapi.co/api/v2/type/`;


const selectElementGen = document.getElementById('gen-options');
const selectElementGenkeys = [];



async function init() {
    await getPokemonGen();
    getLocalStorage();
    viewGeneration();

    for (let i = 7; i <= 12; i++) {
        await getPokemon(i);
    }
    ;

    // console.table(myPokedex);        
    renderPokemon();
}

async function getPokemonGen() {
    let url = generationURL;
    let response = await fetch(url);
    let data = await response.json();

    Object.keys(data.results).forEach(key => {
        GenList.push(data.results[key].name);
    });
    fillDropdown();
};



function fillDropdown() {
    GenList.forEach((gen, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = gen;
        selectElementGen.appendChild(option);
    })
};

function getLocalStorage() {
    const savedGen = localStorage.getItem('selectedGen');
    if (savedGen) {
        selectElementGen.value = savedGen;
    } else {
        selectElementGen.value = 1;
    }
}

async function getPokemonURL(id) {
    let url = `${pokemonURL}${id}`;
    let response = await fetch(url);
    pokemon = await response.json();
}

async function getPokemon(id) {
    await getPokemonURL(id);
    const genText = selectElementGen.selectedOptions[0].textContent;
    const gameKey = selectElementGenkeys[0];

    Object.defineProperty(myPokedex, id, {
        value: {
            name: pokemon.name,
            image: pokemon.sprites.versions[`${genText}`]?.[gameKey]?.front_default || pokemon.sprites.front_default,
            types: pokemon.types.map(type => type.type.name),
            height: pokemon.height,
            weight: pokemon.weight,
            experience: pokemon.base_experience,
            abilities: pokemon.abilities.map(ability => ability.ability.name),
            stats: getPokemonStats(pokemon),
        },
    });
}

function getPokemonStats(pokemon) {
    return {
        HP: pokemon.stats[0].base_stat,
        Attack: pokemon.stats[1].base_stat,
        Defense: pokemon.stats[2].base_stat,
        SpecialAttack: pokemon.stats[3].base_stat,
        SpecialDefense: pokemon.stats[4].base_stat,
        Speed: pokemon.stats[5].base_stat
    }
};


function renderPokemon() {
    const data = Object.getOwnPropertyNames(myPokedex);
    let html = '';
    let listContainer = document.getElementById('pokedex-container');

    data.forEach(id => {
        html += renderPokemonFrontTemplate(id);
    });

    listContainer.innerHTML = html;
}

function viewGeneration() {
    getPokemonURL(1).then(() => {
        const selectedGen = selectElementGen.selectedOptions[0].textContent;
        console.log(`Ausgewählte Generation: ${selectedGen}`);
        // Hier kannst du die Logik hinzufügen, um die Pokémon der ausgewählten Generation anzuzeigen

        getPokemonByGeneration(selectedGen);
    });


    // return pokemon.spites.versions[selectedGen][key].front_default;

}

function getPokemonByGeneration(selectedGen) {
    Object.keys(pokemon.sprites.versions[`${selectedGen}`])
        .forEach(key => {
            if (pokemon.sprites.versions[`${selectedGen}`][`${key}`].front_default) {
                selectElementGenkeys.push(key);
            }
        });
    // console.log(selectElementGenkeys);
    // return selectElementGenkeys;
}

async function getPokemonTypeURL() {
    let url = typeURL;
    let response = await fetch(url);
    let types = await response.json();
    alltypes = types.results;
}

async function getPokemonTypeIMG() {
    await getPokemonTypeURL();
        alltypes.forEach(type => {
            let url = type.url;
                                            console.log(url)
        let response = fetch(url);
        response.then(res => res.json())
            .then(data => {
                                            console.log(data)

            })
        
        
        ;
    });
}



selectElementGen.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    localStorage.setItem('selectedGen', selectedValue);
});
