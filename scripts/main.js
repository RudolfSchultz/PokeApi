const myPokedex = {};
const SearchResult = {};
const GenList = [];
let pokemon;
let alltypes;
const generationURL = `https://pokeapi.co/api/v2/generation`;
const pokemonURL = `https://pokeapi.co/api/v2/pokemon/`;
const pokemonEvolutionURL = `https://pokeapi.co/api/v2/evolution-chain/`;
const typeURL = `https://pokeapi.co/api/v2/type/`;
const SpeciesURL = `https://pokeapi.co/api/v2/pokemon-species/`;
const listContainer = document.getElementById('pokedex-container');
const dialog = document.getElementById("pokemon-view");
const dialogElement = document.querySelector("dialog");
const selectElementGen = document.getElementById("gen-options");
const selectElementCount = document.getElementById("count-options");
const selectElementGenkeys = [];
const pokemontypes = [];
const evolutionCache = {};
let temporaryDex = []
const countLimits = [
    [0, 151],
    [151, 251],
    [251, 386],
    [386, 494],
    [494, 649],
    [649, 721],
    [721, 809],
    [809, 905],
    [905, 1025],
];

async function init() {
    await getPokemonGen();
    fillCounterDropDown();
    getLocalStorage();
    viewGeneration();
    await getPokemonTypeIMG();
    await getPokemonGrind();
}


async function getPokemonGrind() {
    temporaryDex.length = 0;
    const RangeStart = Number(selectElementCount.selectedOptions[0].dataset.min);
    const RangeEnd = Number(selectElementCount.selectedOptions[0].dataset.max);
    for (let i = RangeStart; i <= RangeEnd; i++) {
        if (!myPokedex[i]) {
            await getPokemon(i);
        }
        temporaryDex.push(i);
    };
    renderDecision()
}

selectElementCount.addEventListener('change', (event) => {
    localStorage.setItem('selectedCount', event.target.value);
    getPokemonGrind();
});


function fillCounterDropDown() {
    countLimits.forEach((limits, index) => {
        const option = document.createElement('option');
        const min = limits[0] + 1;
        const max = limits[1];
        option.value = index;
        option.textContent = `${min} - ${max}`;
        option.dataset.min = min;
        option.dataset.max = max;
        selectElementCount.appendChild(option);
    });
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
    if (savedGen) {
        selectElementGen.value = savedGen;
    } else {
        selectElementGen.value = 5;
    }
    const savedCount = localStorage.getItem('selectedCount');
    if (savedCount) {
        selectElementCount.value = savedCount;
    } else {
        selectElementCount.value = 0;
    }
}

async function getPokemonURL(id) {
    const URL = `${pokemonURL}${id}`;
    pokemon = await FetchURLToJason(URL);
}

async function getPokemon(id) {
    listContainer.innerHTML = renderLoadingSpinner();
    await getPokemonURL(id);
    PokemonDefineProperties(id)
}

function PokemonDefineProperties(id) {

    if (!myPokedex[id]) {
        Object.defineProperty(myPokedex, id, {
            value: {
                name: pokemon.name,
                image: PokemonSpritesDefault(),
                types: pokemon.types.map(type => type.type.name),
                height: pokemon.height,
                weight: pokemon.weight,
                experience: pokemon.base_experience,
                abilities: pokemon.abilities.map(ability => ability.ability.name),
                stats: getPokemonStats(pokemon),
            },
        });
    }
}

function PokemonSpritesDefault() {
    let genText = selectElementGen.selectedOptions[0].textContent;
    let gameKey = selectElementGenkeys[0];
    return pokemon.sprites.versions[`${genText}`]?.[gameKey]?.front_default || pokemon.sprites.front_default;
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
}

function renderDecision(limitedSelection) {
    if (!limitedSelection) {
        renderPokemon(temporaryDex)
    }
    else {
        let renderList = [];
        limitedSelection.forEach(thing => {
            renderList.push(thing.id)
        })
        renderPokemon(renderList)
    }
}

function renderPokemon(renderList) {
    let html = '';
    if (renderList) {
        renderList.forEach(id => {
            html += renderPokemonFrontTemplate(id);
        });
    }
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
    content.innerHTML = renderLoadingSpinner();
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
    const flatChain = await flattenEvolutionChain(evolutionData.chain);
    flatChain.forEach(p => {
        evolutionCache[p.id] = flatChain;
    });
    return flatChain;
}

async function flattenEvolutionChain(chainNode) {
    let results = [];
    let speciesName = chainNode.species.name;
    let speciesId = chainNode.species.url.split('/').filter(Boolean).pop();
    await getPokemonURL(speciesId);
    let speciesImage = PokemonSpritesDefault()
    results.push({
        name: speciesName,
        id: parseInt(speciesId),
        image: speciesImage
    });
    if (chainNode.evolves_to && chainNode.evolves_to.length > 0) {
        for (const evolution of chainNode.evolves_to) {
            let nextEvolution = await flattenEvolutionChain(evolution);
            results = results.concat(nextEvolution);
        };
    }
    return results;
}

async function renderEvolutionImages(id) {
    await getEvolutionChainImage(id);
    return assembleEvolutiuonView(id);
}

function assembleEvolutiuonView(id) {
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

// Suche Segment

const UpdateSearchPokemon = document.getElementById("search-input");
let SolutionPokemonSearch = []
let searchTimeout;

UpdateSearchPokemon.addEventListener('input', () => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
        await whatisgoingon();
    }
        , 500);
});


async function getAllPokemon() {
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
    let data = await response.json();
    return data;
}

async function whatisgoingon() {
    let SearchPokemon = document.getElementById("search-input").value;

    if (SearchPokemon != '') {

        getAllPokemon(1).then(value => {
            const comparison = value.results
            FilterPokemon(comparison, SearchPokemon)
        })
    }
    else {
        renderDecision()

    }
}

async function FilterPokemon(comparison, SearchPokemon) {
    const Vergleichnamen = [];
    comparison.forEach((id) => {

        let urlid = (id.url)
        let VergleichnamenID = urlid.split('/').filter(Boolean).pop();

        Vergleichnamen.push({
            name: id.name,
            id: VergleichnamenID
        });
    })

    SolutionPokemonSearch = Vergleichnamen.filter(name => name.name.includes(SearchPokemon))


    let limitedSelection = SolutionPokemonSearch.slice(0, 100)

    for (const name of limitedSelection) {
        if (!myPokedex[name.id]) {
            await getPokemon(name.id)
        }
    };
    renderDecision(limitedSelection)
}
