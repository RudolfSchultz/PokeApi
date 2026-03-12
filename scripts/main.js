const myPokedex = {};
const GenList = [];
let pokemon;
let alltypes;
const generationURL = `https://pokeapi.co/api/v2/generation`;
const pokemonURL = `https://pokeapi.co/api/v2/pokemon/`;
const pokemonEvolutionURL = `https://pokeapi.co/api/v2/evolution-chain/`;
const typeURL = `https://pokeapi.co/api/v2/type/`;
const SpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/`;
const dialog = document.getElementById('pokemon-view');
const dialogElement = document.querySelector("dialog");
const selectElementGen = document.getElementById('gen-options');
const selectElementCount = document.getElementById('count-options');
const selectElementGenkeys = [];
const pokemontypes = [];
const evolutionCache = {};
const PokemonList = {};
let range;
const CountLimits = {
  1: [0, 151],
  2: [151, 251],
  3: [251, 386],
  4: [386, 493],
  5: [493, 649],
  6: [649, 721],
  7: [721, 809],
  8: [809, 905],
  9: [905, 1025]
};

async function init() {
    await getPokemonGen();
    fillCounterDropDown();
    getLocalStorage();
    viewGeneration();
    await getPokemonTypeIMG();
    for (let i = range[0]; i <= range[1]; i++) {
        await getPokemon(i);
    };
    renderPokemon();
}

function whichCount() {
    const selectedCount = selectElementCount.selectedOptions[0].value;
    range = CountLimits[selectedCount];
}

async function getAllPokemon() {

    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
    let data = await response.json();
    data.results.forEach(pokemon => {
        PokemonList[pokemon.name] = pokemon.url;
    });
    console.log(PokemonList);
}

async function FetchURLToJason(URL) {
    let response = await fetch(URL);
    return await response.json();
}

async function getPokemonGen() {
    const data = await FetchURLToJason(generationURL);
    data.results.forEach(result => {
        GenList.push(result.name);
    });
    fillDropdown();
}

function fillDropdown() {
    GenList.forEach((gen, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = gen;
        selectElementGen.appendChild(option);
    })
}

function getLocalStorage() {
    const savedGen = localStorage.getItem('selectedGen');
    range = JSON.parse(localStorage.getItem('selectedCount'));
    if (savedGen) {
        selectElementGen.value = savedGen;
    } else {
        selectElementGen.value = 5;
    }
    if (range) {
        selectElementCount.Value = range;
    } else {
        selectElementCount.value = 4;
    }
}

async function getPokemonURL(id) {
    const URL = `${pokemonURL}${id}`;
    pokemon = await FetchURLToJason(URL);
}

async function getPokemon(id) {
    await getPokemonURL(id);
    const genText = selectElementGen.selectedOptions[0].textContent;
    const gameKey = selectElementGenkeys[0];
    PokemonDefineProperties(id, genText, gameKey)
}

function PokemonDefineProperties(id, genText, gameKey) {
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
        getPokemonByGeneration(selectedGen);
    });
}

function getPokemonByGeneration(selectedGen) {
    Object.keys(pokemon.sprites.versions[`${selectedGen}`])
        .forEach(key => {
            if (pokemon.sprites.versions[`${selectedGen}`][`${key}`].front_default) {
                selectElementGenkeys.push(key);
            }
        });
}

async function getPokemonTypeURL() {
    let URL = typeURL;
    let types = await FetchURLToJason(URL)
    alltypes = types.results;
}

function getTypeImage(data, generation) {
    try {
        const genSprites = data.sprites[generation];
        if (!genSprites) return null;
        for (let key in genSprites) {
            const image = genSprites[key]?.name_icon;
            if (image) return image;
        }
    } catch (e) {
        console.log('Error:', e);
    }
    return null;
}

async function getPokemonTypeIMG() {
    await getPokemonTypeURL();
    const generation = selectElementGen.selectedOptions[0].textContent;
    for (const type of alltypes) {
        const data = await FetchURLToJason(type.url);
        const image = getTypeImage(data, generation);
        if (image) {
            pokemontypes.push({
                name: data.name,
                image: image
            });
        }
    }
}

function renderPokemonType(...types) {
    const images = [];
    types.forEach(type => {
        const foundType = pokemontypes.find(t => t.name === type.toLowerCase());
        if (foundType) {
            images.push(foundType.image);
        }
    });
    return images;
}

selectElementCount.addEventListener('change', (event) => {
    const selectedCount = event.target.value;
    localStorage.setItem('selectedCount', selectedCount);
    location.reload();
});

selectElementGen.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    localStorage.setItem('selectedGen', selectedValue);
    location.reload();
});

function openDialog(id) {
    let dialogBody = document.getElementById('pokemon-view');
    dialogBody.innerHTML = renderPokemonDetailsTemplate(id);
    let content = document.getElementById('decision-option-content');
    content.innerHTML = renderOptionmain(id);
    dialog.showModal();
}

function closeDialog() {
    dialog.close();
}

dialogElement.addEventListener('click', (event) => {
    if (event.target === dialogElement) {
        closeDialog();
    }
});

document.getElementById('pokemon-view').addEventListener('click', (event) => {
    event.stopPropagation();
});



function decisionOptions(option, id) {
    let content = document.getElementById('decision-option-content');
    content.innerHTML = '';
    switch (option) {
        case 'main':
            content.innerHTML = renderOptionmain(id);
            break;
        case 'stats':
            content.innerHTML = renderOptionstats(id);
            break;
        case 'evo':
            renderEvolutionImages(id).then(html => {
                content.innerHTML = html;
            });
            break;
    }
}

async function getEvolutionChainImage(id) {
    if (evolutionCache[id]) {
        return evolutionCache[id];
    }
    let SpeciesData = await FetchURLToJason(`${SpeciesURL}${id}`);
    let chainUrl = SpeciesData.evolution_chain.url;
    let evolutionData = await FetchURLToJason(chainUrl);
    const flatChain = flattenEvolutionChain(evolutionData.chain);
    flatChain.forEach(p => {
        evolutionCache[p.id] = flatChain;
    });
    return flatChain;
}

function flattenEvolutionChain(chainNode) {
    let results = [];
    const speciesName = chainNode.species.name;
    const speciesId = chainNode.species.url.split('/').filter(Boolean).pop();
    results.push({
        name: speciesName,
        id: parseInt(speciesId)
    });
    if (chainNode.evolves_to && chainNode.evolves_to.length > 0) {
        chainNode.evolves_to.forEach(evolution => {
            results = results.concat(flattenEvolutionChain(evolution));
        });
    }
    return results;
}

async function renderEvolutionImages(id) {
    await getEvolutionChainImage(id);
    return renderPokemonfindaname(id);
}

function renderPokemonfindaname(id) {
    const placeholder = '<div class="Evolution-Placeholder">>></div>';
    let assembleEvoHTML = '';
    evolutionCache[id].forEach((thing) => {
        assembleEvoHTML += renderOptionevo(thing);
        assembleEvoHTML += placeholder;
    });
    if (assembleEvoHTML.endsWith(placeholder)) {
        assembleEvoHTML = assembleEvoHTML.slice(0, -placeholder.length);
    }
    return assembleEvoHTML;
}




function fillCounterDropDown() {
    Object.values(CountLimits).forEach((range, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = range ? `${range[0] + 1} - ${range[1]}` : 'All';
        selectElementCount.appendChild(option);
    })
}


