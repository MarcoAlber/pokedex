function typeIsOneTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType) {
    return `
            <div onclick="openStatsPokemon(${i})" id="pokemonCard${i}" class="pokemonCard">
                <span id="pokemonNumber${i}" class="pokemonNumber"><b>${showPokemonNumber}</b></span>
                <h1 id="pokemonNames${i}" class="pokemonNames">${pokemonNameBigLetter}</h1>
                <img id="pokemonImage${i}" class="pokemonImage" src= "${showPokemonImage}">
                <div id="pokemonTypeContainer${i}" class="pokemonTypeContainer">
                    <span class="pokemonType">${pokemonType}</span>
                </div>
                <div id="background-image-Card${i}" class="background-image-Card">
                </div>
            </div>`
}

function typeIsTwoTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType) {
    return `
            <div onclick="openStatsPokemon(${i})" id="pokemonCard${i}" class="pokemonCard">
                <span id="pokemonNumber${i}" class="pokemonNumber"><b>${showPokemonNumber}</b></span>
                <h1 id="pokemonNames${i}" class="pokemonNames">${pokemonNameBigLetter}</h1>
                <img id="pokemonImage${i}" class="pokemonImage" src= "${showPokemonImage}">
                <div id="pokemonTypeContainer${i}" class="pokemonTypeContainer">
                    <span class="pokemonType">${pokemonType}</span>
                    <span class="pokemonType">${loadedPokemon[i]['types']['1']['type']['name']}</span>
                </div>
                <div id="background-image-Card${i}" class="background-image-Card">
                </div>
            </div>`
}

function openStatsTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage) {
    return `
    <div class="currentPokemonStats" id="currentPokemonStats">
        <div class="contentPokemonStats">
            <div class="background-image-StyleCard">
            </div>
            <span id="pokemonNumber${i}" class="pokemonNumber"><b>${showPokemonNumber}</b></span>
            <img class="closeStats" onclick="closeStats()" id="closeStats" src="./img/close-window-64.png">
            <img class="arrowRight" onclick="buttonNextPokemon(${i})" id="arrowRight${i}" src="./img/arrow-24-64-right.png">
            <img class="arrowLeft" onclick="buttonBeforePokemon(${i})" id="arrowLeft${i}" src="./img/arrow-88-64-left.png">
            <h1 id="pokemonNamesStats">${pokemonNameBigLetter}</h1>
            <div class="containerStatsImage">
                <img class="statsImage" src="${showPokemonImage}">
            </div>
            <div class="statsWhiteBg">
                <div class="statsLinks">
                    <a id="showAbout" onclick="showAbout(${i})">About</a>
                    <a id="showStats" onclick="showStats(${i})">Stats</a>
                    <a id="showMoves" onclick="showMoves(${i})">Moves</a>
                </div>
                <div id="informationPokemon${i}" class="informationPokemon">
                    <div class="myChart">
                        <canvas id="myChart${i}"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
}

function showAboutTemplate(i) {
    return `
    <div class="aboutInformation">
        <div class="headerInformation">
            <span class="showAboutRow"><b>Type:</b></span>
            <span class="showAboutRow"><b>Height:</b></span>
            <span class="showAboutRow"><b>Weight:</b></span>
            <span class="showAboutRow"><b>Abilities:</b></span>
        </div>
        <div class="pokemonInformations">
            <span class="showAboutRow" id="typesAbout"></span>
            <span class="showAboutRow">${loadedPokemon[i]['height'] / 10}m</span>
            <span class="showAboutRow">${loadedPokemon[i]['weight'] / 10}kg</span>
            <div class="showAboutRow" id="abilities${i}"></div>
        </div>
    </div>
    `
}

function showMovesTemplate(i) {
    return `
    <div class="containerMoves" id="containerMoves${i}">
    </div>
    `
}

function showAllMovesTemplate(m, i) {
    return `
    <div id="move${m}" class="move">
        ${loadedPokemon[i]['moves'][`${m}`]['move']['name']}
    </div>
       `
}

function showStatsTemplate(i) {
    return `
    <div class="myChart">
        <canvas id="myChart${i}"></canvas>
    </div>
`
}

function showAboutTypesTemplate(l, i) {
    return `
    <p class="types-bg" id="types-bg${l}">${loadedPokemon[i]['types'][`${l}`]['type']['name']}</p>
`
}

function showAboutAbilitiesTemplate(k, i) {
    return `
    <p class="abilities-bg">${loadedPokemon[i]['abilities'][`${k}`]['ability']['name']}</p>
`
}