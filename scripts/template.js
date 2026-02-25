function renderPokemonFrontTemplate(id) {
    return `<a class="pokemon-card" onclick="openDialog(${id})">
                <div class="pokemon-card-header">
                    <div class="pokemon-id">#${id}</div>
                    <h2 class="pokemon-name">${myPokedex[id].name}</h2>
                </div>    
                <div class="pokemon-image" style="background-image: url('${myPokedex[id].image}')"></div>
                <div class="pokemon-types">${renderPokemonType(...myPokedex[id].types).map(img => `<img src="${img}" alt="type-icon" class="type-icon">`).join('')}</div>
            </a>`}; 

function renderPokemonDetailsTemplate(id) {
    return `<div class="pokemon-details">
                <div class="pokemon-details-header">
                    <div class="pokemon-id">#${id}</div>
                    <h2 class="pokemon-name">${myPokedex[id].name}</h2>
                </div>
                <div class="pokemon-image" style="background-image: url('${myPokedex[id].image}')"></div>
                <div class="pokemon-details-options">
                `}; 



                // main // stats // evo chain
                // main -> height, weight, base experience, abilities
                // stats -> hp, attack, defense, sp. attack, sp. defense, speed
                // evo chain -> images of the evolution chain

                