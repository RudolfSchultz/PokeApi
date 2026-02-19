function renderPokemonFrontTemplate(id) {
    return `<a class="pokemon-card" href="./details.html?id=${id}">
            <div class="pokemon-id">#${id} <h2 class="pokemon-name">${myPokedex[id].name}</h2> </div>
             <img class="pokemon-image" src="${myPokedex[id].image}" alt="${myPokedex[id].name}">
             <p class="pokemon-types">${myPokedex[id].types.join(', ')}</p>
             </a>`}; 
