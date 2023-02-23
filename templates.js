function typeIsOneTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType) {
    return `<div onclick="openStatsPokemon(${i})" id="pokemonCard${i}" class="pokemonCard">
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
    return `<div onclick="openStatsPokemon(${i})" id="pokemonCard${i}" class="pokemonCard">
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

function changeBackgroundColor(pokemonType) {
    if (pokemonType.includes("grass")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-grass') }
    else if (pokemonType.includes("fire")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-fire') }
    else if (pokemonType.includes("water")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-water') }
    else if (pokemonType.includes("bug")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-bug') }
    else if (pokemonType.includes("normal")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-normal') }
    else if (pokemonType.includes("poison")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-poison') }
    else if (pokemonType.includes("electric")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-electric') }
    else if (pokemonType.includes("ground")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-ground') }
    else if (pokemonType.includes("fairy")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-fairy') }
    else if (pokemonType.includes("fighting")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-fighting') }
    else if (pokemonType.includes("psychic")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-psychic') }
    else if (pokemonType.includes("rock")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-rock') }
    else if (pokemonType.includes("ghost")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-ghost') }
    else if (pokemonType.includes("ice")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-ice') }
    else if (pokemonType.includes("dragon")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-dragon') }
    else if (pokemonType.includes("dark")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-darkPokemon') }
    else if (pokemonType.includes("steel")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-steel') }
    else if (pokemonType.includes("flying")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-flying') }
}

function changeBackgroundColorStats(pokemonTypeStats) {
    if (pokemonTypeStats.includes("grass")) { document.getElementById('currentPokemonStats').classList.add('bg-grass') }
    else if (pokemonTypeStats.includes("fire")) { document.getElementById('currentPokemonStats').classList.add('bg-fire') }
    else if (pokemonTypeStats.includes("water")) { document.getElementById('currentPokemonStats').classList.add('bg-water') }
    else if (pokemonTypeStats.includes("bug")) { document.getElementById('currentPokemonStats').classList.add('bg-bug') }
    else if (pokemonTypeStats.includes("normal")) { document.getElementById('currentPokemonStats').classList.add('bg-normal') }
    else if (pokemonTypeStats.includes("poison")) { document.getElementById('currentPokemonStats').classList.add('bg-poison') }
    else if (pokemonTypeStats.includes("electric")) { document.getElementById('currentPokemonStats').classList.add('bg-electric') }
    else if (pokemonTypeStats.includes("ground")) { document.getElementById('currentPokemonStats').classList.add('bg-ground') }
    else if (pokemonTypeStats.includes("fairy")) { document.getElementById('currentPokemonStats').classList.add('bg-fairy') }
    else if (pokemonTypeStats.includes("fighting")) { document.getElementById('currentPokemonStats').classList.add('bg-fighting') }
    else if (pokemonTypeStats.includes("psychic")) { document.getElementById('currentPokemonStats').classList.add('bg-psychic') }
    else if (pokemonTypeStats.includes("rock")) { document.getElementById('currentPokemonStats').classList.add('bg-rock') }
    else if (pokemonTypeStats.includes("ghost")) { document.getElementById('currentPokemonStats').classList.add('bg-ghost') }
    else if (pokemonTypeStats.includes("ice")) { document.getElementById('currentPokemonStats').classList.add('bg-ice') }
    else if (pokemonTypeStats.includes("dragon")) { document.getElementById('currentPokemonStats').classList.add('bg-dragon') }
    else if (pokemonTypeStats.includes("dark")) { document.getElementById('currentPokemonStats').classList.add('bg-darkPokemon') }
    else if (pokemonTypeStats.includes("steel")) { document.getElementById('currentPokemonStats').classList.add('bg-steel') }
    else if (pokemonTypeStats.includes("flying")) { document.getElementById('currentPokemonStats').classList.add('bg-flying') }
}

function changeBackgroundColorAbout(typeAbout, l) {
    if (typeAbout.includes("grass")) { document.getElementById(`types-bg${l}`).classList.add('bg-grass') }
    else if (typeAbout.includes("fire")) { document.getElementById(`types-bg${l}`).classList.add('bg-fire') }
    else if (typeAbout.includes("water")) { document.getElementById(`types-bg${l}`).classList.add('bg-water') }
    else if (typeAbout.includes("bug")) { document.getElementById(`types-bg${l}`).classList.add('bg-bug') }
    else if (typeAbout.includes("normal")) { document.getElementById(`types-bg${l}`).classList.add('bg-normal') }
    else if (typeAbout.includes("poison")) { document.getElementById(`types-bg${l}`).classList.add('bg-poison') }
    else if (typeAbout.includes("electric")) { document.getElementById(`types-bg${l}`).classList.add('bg-electric') }
    else if (typeAbout.includes("ground")) { document.getElementById(`types-bg${l}`).classList.add('bg-ground') }
    else if (typeAbout.includes("fairy")) { document.getElementById(`types-bg${l}`).classList.add('bg-fairy') }
    else if (typeAbout.includes("fighting")) { document.getElementById(`types-bg${l}`).classList.add('bg-fighting') }
    else if (typeAbout.includes("psychic")) { document.getElementById(`types-bg${l}`).classList.add('bg-psychic') }
    else if (typeAbout.includes("rock")) { document.getElementById(`types-bg${l}`).classList.add('bg-rock') }
    else if (typeAbout.includes("ghost")) { document.getElementById(`types-bg${l}`).classList.add('bg-ghost') }
    else if (typeAbout.includes("ice")) { document.getElementById(`types-bg${l}`).classList.add('bg-ice') }
    else if (typeAbout.includes("dragon")) { document.getElementById(`types-bg${l}`).classList.add('bg-dragon') }
    else if (typeAbout.includes("dark")) { document.getElementById(`types-bg${l}`).classList.add('bg-darkPokemon') }
    else if (typeAbout.includes("steel")) { document.getElementById(`types-bg${l}`).classList.add('bg-steel') }
    else if (typeAbout.includes("flying")) { document.getElementById(`types-bg${l}`).classList.add('bg-flying') }
}