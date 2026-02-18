
let pokemon1;




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
    getPokemonStats(pokemon.stats);
}

async function getPokemonImage(pokemonUrl) {
    let url = pokemonUrl;
    let response = await fetch(url);
     pokemon1 = await response.json();
        // console.log(pokemon1);
        let PokemonImage = pokemon1.sprites.front_default;


        // console.log(PokemonImage);
        document.getElementById("Pokemon").src = PokemonImage;
}

async function getPokemonStats(stats) {
    let stats1 = stats;
    // console.log(stats1);
    document.getElementById("HP").innerText = "HP: " + stats1[0].base_stat;
    document.getElementById("Attack").innerText = "Attack: " + stats1[1].base_stat;
    document.getElementById("Defense").innerText = "Defense: " + stats1[2].base_stat;
    document.getElementById("SpecialAttack").innerText = "Special Attack: " + stats1[3].base_stat;
    document.getElementById("SpecialDefense").innerText = "Special Defense: " + stats1[4].base_stat;
    document.getElementById("Speed").innerText = "Speed: " + stats1[5].base_stat;
}