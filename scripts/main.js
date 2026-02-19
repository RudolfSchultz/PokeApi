const myPokedex = {};
const GenList = [];
let pokemon;


const selectElement1 = document.getElementById('gen-options');


async function init() {
    onPageLoad();
        getPokemonGen();
        

    for (let i = 1; i <= 25; i++) {
        await getPokemon(i);
    }
    // console.table(myPokedex);
    renderPokemon();
}

async function getPokemonGen() {
    let url = `https://pokeapi.co/api/v2/generation`;
    let response = await fetch(url);
    let data = await response.json();

    Object.keys(data.results).forEach(key => {
        GenList.push(data.results[key].name);
    });
    // console.log(GenList);


    //Dropdown befüllen
        GenList.forEach((gen, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = gen;
            selectElement1.appendChild(option);
        });
};

    selectElement1.addEventListener('change', (event) => {
  const selectedValue = event.target.value;
  localStorage.setItem('selectedGen', selectedValue);
});

function onPageLoad() {
  // Prüfen, ob schon mal was ausgewählt wurde
  const savedGen = localStorage.getItem('selectedGen');
  if (savedGen) {
    // Wenn ja: Dropdown auf diesen Wert setzen und Bilder laden
    selectElement1.value = savedGen;
  } else {
    // Wenn nein: Standardwert (z.B. Gen 1) laden
    selectElement1.value = 6;
  }
}


async function getPokemon(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
     pokemon = await response.json();

    Object.defineProperty(myPokedex, id, {
        value: {
            name: pokemon.name,
            image: pokemon.sprites.versions['generation-vi']['omegaruby-alphasapphire'].front_default,
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

