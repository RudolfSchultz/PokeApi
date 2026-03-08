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
                    <button onclick="decisionOptions('main', ${id})">Main</button>
                    <button onclick="decisionOptions('stats', ${id})">Stats</button>
                    <button onclick="decisionOptions('evo', ${id})">Evo</button>
                </div>
                <div class="pokemon-decision-options">
                                <div id="decision-option-content"></div>
                </div>
                `};


function renderOptionmain(id) {
    return `<div class="pokemon-main">
                <p>Height: ${myPokedex[id].height}</p>
                <p>Weight: ${myPokedex[id].weight}</p>
                <p>Base Experience: ${myPokedex[id].base_experience}</p>
                <p>Abilities: ${myPokedex[id].abilities.join(', ')}</p>
            </div>`;
}

function renderOptionstats(id) {
    const stats = myPokedex[id].stats;
    return `<div class="pokemon-stats">
                <p>HP: ${stats.HP}</p>
                <p>Attack: ${stats.Attack}</p>
                <p>Defense: ${stats.Defense}</p>
                <p>Special Attack: ${stats.SpecialAttack}</p>
                <p>Special Defense: ${stats.SpecialDefense}</p>
                <p>Speed: ${stats.Speed}</p>
            </div>`;
}

// function renderOptionevo(id) {
//     return `<div class="pokemon-evo">
//                 <p id="evo-chain">Evo Chain ${id}</p>
//             </div>`;
// }

function renderOptionevo(id) {
    return `<div class="pokemon-evo"> 
                <img src="${myPokedex[[evolutionCache[id][0].id]].image}" alt="${evolutionCache[id][0].name}">
                <img src="${myPokedex[[evolutionCache[id][1].id]].image}" alt="${evolutionCache[id][1].name}">
                <img src="${myPokedex[[evolutionCache[id][2].id]].image}" alt="${evolutionCache[id][2].name}">
            </div>`}
// main // stats // evo chain
// main -> height, weight, base experience, abilities
// stats -> hp, attack, defense, sp. attack, sp. defense, speed
// evo chain -> images of the evolution chain

