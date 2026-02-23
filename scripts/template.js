function renderPokemonFrontTemplate(id) {
    return `<a class="pokemon-card" href="./details.html?id=${id}">
                <div class="pokemon-card-header">
                    <div class="pokemon-id">#${id}</div>
                    <h2 class="pokemon-name">${myPokedex[id].name}</h2>
                </div>    
                <div class="pokemon-image" style="background-image: url('${myPokedex[id].image}')"></div>
                <p class="pokemon-types">${myPokedex[id].types.join(', ')}</p>
            </a>`}; 
