function renderPokemonFrontTemplate(id) {
    return `<div class="pokemon-card">
            <h2 class="pokemon-name">${myPokedex[id].name}</h2>
             <img class="pokemon-image" src="${myPokedex[id].image}" alt="${myPokedex[id].name}">
             <p class="pokemon-types">${myPokedex[id].types.join(', ')}</p>
             </div>`}; 
