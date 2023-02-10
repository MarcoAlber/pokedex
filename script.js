let currentPokemon;
let showStatsPokemon;

async function showPokemon() {
    for (i = 1; i < 1009; i++) {
        let urlPokemon = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
        let responsePokemon = await fetch(urlPokemon);
        currentPokemon = await responsePokemon.json();
        let pokemonName = currentPokemon['pokemon']['name'];
        let urlPokemonWithStats = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let responsePokemonWithStats = await fetch(urlPokemonWithStats);
        showStatsPokemon = await responsePokemonWithStats.json();
        let showPokemonNumber = showStatsPokemon['id'];
        let pokemonNameBigLetter = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        let showPokemonImage = showStatsPokemon['sprites']['other']['official-artwork']['front_default'];
        let pokemonType = showStatsPokemon['types']['0']['type']['name'];
        let pokemonTypeGrass = pokemonType.includes("grass");
        let pokemonTypeFire = pokemonType.includes("fire");
        let pokemonTypeWater = pokemonType.includes("water");
        let pokemonTypeBug = pokemonType.includes("bug");
        let pokemonTypeNormal = pokemonType.includes("normal");
        let pokemonTypePoison = pokemonType.includes("poison");
        let pokemonTypeElectric = pokemonType.includes("electric");
        let pokemonTypeGround = pokemonType.includes("ground");
        let pokemonTypeFairy = pokemonType.includes("fairy");
        let pokemonTypeFighting = pokemonType.includes("fighting");
        let pokemonTypePsychic = pokemonType.includes("psychic");
        let pokemonTypeRock = pokemonType.includes("rock");
        let pokemonTypeGhost = pokemonType.includes("ghost");
        let pokemonTypeIce = pokemonType.includes("ice");
        let pokemonTypeDragon = pokemonType.includes("dragon");
        let pokemonTypeDark = pokemonType.includes("dark");
        let pokemonTypeSteel = pokemonType.includes("steel");
        let pokemonTypeFlying = pokemonType.includes("flying");

        document.getElementById('containerWithPokemon').innerHTML += `
        <div id="pokemonCard${i}" class="pokemonCard">
                <span class="pokemonNumber"><b>${showPokemonNumber}</b></span>
                <h1 id="pokemonNames">${pokemonNameBigLetter}</h1>
                <img loading="lazy" id="pokemonImage" src= "${showPokemonImage}">
                <span class="pokemonType">${pokemonType}</span>
                </div>
            `;

        if (pokemonTypeGrass) { document.getElementById(`pokemonCard${i}`).classList.add('bg-grass') }
        else if (pokemonTypeFire) { document.getElementById(`pokemonCard${i}`).classList.add('bg-fire') }
        else if (pokemonTypeWater) { document.getElementById(`pokemonCard${i}`).classList.add('bg-water') }
        else if (pokemonTypeBug) { document.getElementById(`pokemonCard${i}`).classList.add('bg-bug') }
        else if (pokemonTypeNormal) { document.getElementById(`pokemonCard${i}`).classList.add('bg-normal') }
        else if (pokemonTypePoison) { document.getElementById(`pokemonCard${i}`).classList.add('bg-poison') }
        else if (pokemonTypeElectric) { document.getElementById(`pokemonCard${i}`).classList.add('bg-electric') }
        else if (pokemonTypeGround) { document.getElementById(`pokemonCard${i}`).classList.add('bg-ground') }
        else if (pokemonTypeFairy) { document.getElementById(`pokemonCard${i}`).classList.add('bg-fairy') }
        else if (pokemonTypeFighting) { document.getElementById(`pokemonCard${i}`).classList.add('bg-fighting') }
        else if (pokemonTypePsychic) { document.getElementById(`pokemonCard${i}`).classList.add('bg-psychic') }
        else if (pokemonTypeRock) { document.getElementById(`pokemonCard${i}`).classList.add('bg-rock') }
        else if (pokemonTypeGhost) { document.getElementById(`pokemonCard${i}`).classList.add('bg-ghost') }
        else if (pokemonTypeIce) { document.getElementById(`pokemonCard${i}`).classList.add('bg-ice') }
        else if (pokemonTypeDragon) { document.getElementById(`pokemonCard${i}`).classList.add('bg-dragon') }
        else if (pokemonTypeDark) { document.getElementById(`pokemonCard${i}`).classList.add('bg-dark') }
        else if (pokemonTypeSteel) { document.getElementById(`pokemonCard${i}`).classList.add('bg-steel') }
        else if (pokemonTypeFlying) { document.getElementById(`pokemonCard${i}`).classList.add('bg-flying') }
    }
}