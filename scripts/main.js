





async function init() {
    for (let i = 11; i <= 11; i++) {
         await getPokemon(i);
    }
}

async function getPokemon(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    let pokemon = await response.json();
    let keys = Object.keys(pokemon);
    console.log(pokemon);
    // console.log(pokemon);
    // console.log(keys);
    // console.log(pokemon.id);
    // console.log(pokemon.name);
        document.getElementById("PokemonName").innerText = pokemon.name;
    // console.log(pokemon.forms[0].url);
    let PokemonImage = pokemon.forms[0].url;
    getPokemonImage(PokemonImage);
}

async function getPokemonImage(pokemonUrl) {
    let url = pokemonUrl;
    let response = await fetch(url);
    let pokemon = await response.json();
    // console.log(pokemon);
        let PokemonImage = pokemon.sprites.front_default;
        // console.log(PokemonImage);
        document.getElementById("Pokemon").src = PokemonImage;
}

