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
                    <div class="pokemon-details-id">#${id}</div>
                    <h2 class="pokemon-details-name">${myPokedex[id].name}</h2>
                </div>
                <div class="pokemon-image" style="background-image: url('${myPokedex[id].image}')"></div>
                <div class="pokemon-details-option-buttons">
                    <button onclick="decisionOptions('main', ${id})">Main</button>
                    <button onclick="decisionOptions('stats', ${id})">Stats</button>
                    <button onclick="decisionOptions('evo', ${id})">Evo</button>
                </div>
                <div class="pokemon-decision-options">
                                <div id="decision-option-content"></div>
                </div>
                `};


function renderOptionmain(id) {
    return `<table>
                <tr>
                    <td>Height:</td>
                    <td>${myPokedex[id].height}</td>
                </tr>
                <tr>
                    <td>Weight:</td>
                    <td>${myPokedex[id].weight}</td>
                </tr>
                <tr>
                    <td>Base Experience:</td>
                    <td>${myPokedex[id].experience}</td>
                </tr>
                <tr>
                    <td>Abilities:</td>
                    <td>${myPokedex[id].abilities.join(', ')}</td>
                </tr>
            </table>`;
}

function renderOptionstats(id) {
    return `<div class="pokemon-stats">
                <p>HP: ${myPokedex[id].stats.HP}</p>
                <p>Attack: ${myPokedex[id].stats.Attack}</p>
                <p>Defense: ${myPokedex[id].stats.Defense}</p>
                <p>Special Attack: ${myPokedex[id].stats.SpecialAttack}</p>
                <p>Special Defense: ${myPokedex[id].stats.SpecialDefense}</p>
                <p>Speed: ${myPokedex[id].stats.Speed}</p>
            </div>`;
}

function renderOptionevo(thing) {
    return `<img class="pokemon-evo-image" src="${myPokedex[thing.id].image}" alt="${thing.name}">`
}
