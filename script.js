let loadedPokemon = [''];
let load = 30;
let pokemonLoaded = 1;

async function loadPokemon() {
    for (i = pokemonLoaded; i < load; i++) {
        pokemonLoaded++;
        let urlPokemon = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
        let responsePokemon = await fetch(urlPokemon);
        let currentPokemon = await responsePokemon.json();
        let pokemonName = currentPokemon['pokemon']['name'];
        let urlPokemonWithStats = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let responsePokemonWithStats = await fetch(urlPokemonWithStats);
        let showStatsPokemon = await responsePokemonWithStats.json();
        loadedPokemon.push(showStatsPokemon);
        showPokemon(i);
    }
}

function showPokemon(i) {
    let showPokemonNumber = loadedPokemon[i]['id'];
    let pokemonNameBigLetter = loadedPokemon[i]['name'].charAt(0).toUpperCase() + loadedPokemon[i]['name'].slice(1);
    let showPokemonImage = loadedPokemon[i]['sprites']['other']['official-artwork']['front_default'];
    let pokemonType = loadedPokemon[i]['types']['0']['type']['name'];

    if (loadedPokemon[i]['types'].length > 1) {
        document.getElementById('containerWithPokemon').innerHTML += typeIsTwoTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType);
    }
    else {
        document.getElementById('containerWithPokemon').innerHTML += typeIsOneTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType);
    }
    changeBackgroundColor(pokemonType);
}

function typeIsOneTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType) {
    return `<div id="pokemonCard${i}" class="pokemonCard">
                <span class="pokemonNumber"><b>${showPokemonNumber}</b></span>
                <h1 id="pokemonNames">${pokemonNameBigLetter}</h1>
                <img loading="lazy" id="pokemonImage" src= "${showPokemonImage}">
                <div id="pokemonTypeContainer" class="pokemonTypeContainer">
                    <span class="pokemonType">${pokemonType}</span>
                </div>
                <div class="background-image-Card">
                </div>
            </div>`
}

function typeIsTwoTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType) {
    return `<div id="pokemonCard${i}" class="pokemonCard">
                <span class="pokemonNumber"><b>${showPokemonNumber}</b></span>
                <h1 id="pokemonNames">${pokemonNameBigLetter}</h1>
                <img loading="lazy" id="pokemonImage" src= "${showPokemonImage}">
                <div id="pokemonTypeContainer" class="pokemonTypeContainer">
                    <span class="pokemonType">${pokemonType}</span>
                    <span class="pokemonType">${loadedPokemon[i]['types']['1']['type']['name']}</span>
                </div>
                <div class="background-image-Card">
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
    else if (pokemonType.includes("dark")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-dark') }
    else if (pokemonType.includes("steel")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-steel') }
    else if (pokemonType.includes("flying")) { document.getElementById(`pokemonCard${i}`).classList.add('bg-flying') }
}

function loadMore() {
    load = load + 30;
    loadPokemon();
}