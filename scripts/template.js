function renderPokemonFrontTemplate(id) {
    return `<div class="pokemon-card" id="card-${id}" onclick="openDialog(${id})">
                <div class="pokemon-card-header">
                    <h2 class="pokemon-name">${myPokedex[id].name}</h2>
                    <div class="pokemon-id">#${id}</div>
                </div>    
                <div class="pokemon-image-background">
                <div class="pokemon-image ${myPokedex[id].types[0]}" style="background-image: url('${myPokedex[id].image}')" loading="lazy"></div>
                </div>
                <div class="pokemon-types">${renderPokemonType(...myPokedex[id].types).map(img => `<img src="${img}" alt="type-icon" class="type-icon">`).join('')}</div>
            </div>`};

function renderLoadingSpinner(){
    return `<img class="loading-spinner" src="./assets/LoadingSpinner/pokemon.gif" alt="Lädt...">`
}

function renderPokemonDetailsTemplate(id) {
    return `<div class="pokemon-details">
                <div class="pokemon-details-header">
                    <div class="pokemon-details-id">#${id}</div>
                    <h2 class="pokemon-details-name">${myPokedex[id].name}</h2>
                </div>
                <div class="${myPokedex[id].types[0]} pokemon-details-image-background">
                <div class="pokemon-image-view" style="background-image: url('${myPokedex[id].image}')"></div>
                </div>
                <div class="pokemon-types">${renderPokemonType(...myPokedex[id].types).map(img => `<img src="${img}" alt="type-icon" class="type-icon">`).join('')}</div>
                <div class="pokemon-details-option-buttons">
                    <button onclick="decisionOptions('main', ${id})">Main</button>
                    <button onclick="decisionOptions('stats', ${id})">Stats</button>
                    <button onclick="decisionOptions('evo', ${id})">Evo</button>
                </div>
                <div class="pokemon-decision-options" id="decision-option-content"></div>
                </div>
            <button class="navigaten-button left" onclick="navigate(-1)">◀</button>
            <button class="navigaten-button right" onclick="navigate(1)">▶</button>
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
    return `<table>
                <tr>
                    <td>HP:</td>
                    <td><progress class="statbar" max="180" value="${myPokedex[id].stats.HP}"</progress></td>
                </tr>
                <tr>
                    <td>Attack:</td>
                    <td><progress class="statbar"max="180" value="${myPokedex[id].stats.Attack}"</progress></td>
                </tr>
                <tr>                    
                    <td>Defense:</td>
                    <td><progress class="statbar"max="180" value="${myPokedex[id].stats.Defense}"</progress></td>
                </tr>
                <tr>
                    <td>Special Attack:</td>
                    <td><progress class="statbar"max="180" value="${myPokedex[id].stats.SpecialAttack}"</progress></td>
                </tr>
                <tr>
                    <td>Special Defense:</td>
                    <td><progress class="statbar"max="180" value="${myPokedex[id].stats.SpecialDefense}"</progress></td>
                </tr>
                <tr>
                    <td>Speed:</td>
                    <td><progress class="statbar"max="180" value="${myPokedex[id].stats.Speed}"</progress></td>
                </tr>
            </table>`;
}

function renderOptionevo(thing) {
    return `<div class="pokemon-evo-view">
            <img class="pokemon-evo-image" src="${thing.image}" alt="${thing.name}">
            <p>${thing.name}</p>
            </div>`
}

function renderLoadingSpinner() {
    return `<img class="loading-spinner-view" src="./assets/LoadingSpinner/pokemon.gif" alt="Lädt...">`
}