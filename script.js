let currentPokemon;
let showStatsPokemon;

async function showPokemon() {
    for (i = 1; i < 1009; i++) {
        let urlPokemon = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
        let responsePokemon = await fetch(urlPokemon);
        currentPokemon = await responsePokemon.json();
        let currentPokemonName = currentPokemon['pokemon']['name'];
        let urlPokemonWithStats = `https://pokeapi.co/api/v2/pokemon/${currentPokemonName}`;
        let responsePokemonWithStats = await fetch(urlPokemonWithStats);
        showStatsPokemon = await responsePokemonWithStats.json();
        let pokemonName = showStatsPokemon['name'];
        let pokemonNameBigLetter = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        
        document.getElementById('containerWithPokemon').innerHTML += `
            <div id="pokemonCard">
                <span class="pokemonNumber"><b>${showStatsPokemon['id']}</b></span>
                <h1 id="pokemonNames">${pokemonNameBigLetter}</h1>
                <img loading="lazy" id="pokemonImage" src= "${showStatsPokemon['sprites']['other']['official-artwork']['front_default']}">
                <span class="pokemonType">${showStatsPokemon['types']['0']['type']['name']}</span>
            </div>`
    }
}