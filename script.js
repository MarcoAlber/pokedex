let firstPokemon;
let showStatsPokemon;
let nextPokemon;
let showStatsNextPokemon;

async function loadPokemon() {
    let urlPokemon = `https://pokeapi.co/api/v2/pokemon-form/1/`;
    let responsePokemon = await fetch(urlPokemon);
    firstPokemon = await responsePokemon.json();
    let firstPokemonName = firstPokemon['pokemon']['name'];
    let urlPokemonWithStats = `https://pokeapi.co/api/v2/pokemon/${firstPokemonName}`;
    let responseFirstPokemon = await fetch(urlPokemonWithStats);
    showStatsPokemon = await responseFirstPokemon.json();

    console.log('nextPokemon', responseFirstPokemon);
    showPokemon();
}

async function showPokemon() {
    for (i = 1; i < 1009; i++) {
        let urlNextPokemon = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
        let responseNextPokemon = await fetch(urlNextPokemon);
        nextPokemon = await responseNextPokemon.json();
        let nextPokemonName = nextPokemon['pokemon']['name'];
        let urlNextPokemonWithStats = `https://pokeapi.co/api/v2/pokemon/${nextPokemonName}`;
        let responseNextPokemonWithStats = await fetch(urlNextPokemonWithStats);
        showStatsNextPokemon = await responseNextPokemonWithStats.json();
        let currentPokemonName = showStatsNextPokemon['name'];
        let currentPokemonNameBigLetter = currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1);

        document.getElementById('containerWithPokemon').innerHTML += `
            <div id="pokemonCard">
                <span class="pokemonNumber"><b>${showStatsNextPokemon['id']}</b></span>
                <h1 id="pokemonNames">${currentPokemonNameBigLetter}</h1>
                <img id="pokemonImage" src= "${showStatsNextPokemon['sprites']['other']['official-artwork']['front_default']}">
                <span class="pokemonType">${showStatsNextPokemon['types']['0']['type']['name']}</span>
            </div>`
    }
}