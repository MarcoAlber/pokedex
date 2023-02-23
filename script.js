let loadedPokemon = [''];
let load = 20;
let currentPokemon = 1;
let isLoading = false;

async function loadPokemon() {
    for (i = currentPokemon; i < load; i++) {
        document.body.classList.add('stop-scrolling');
        document.getElementById('containerWithPokemon').style.opacity = "0.2";
        document.getElementById('loadingImage').classList.remove('dp-none');
        document.getElementById('loadingBg').classList.remove('dp-none');
        currentPokemon++;
        let urlPokemon = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
        let responsePokemon = await fetch(urlPokemon);
        let currentPokemonJSON = await responsePokemon.json();
        let pokemonName = currentPokemonJSON['pokemon']['name'];
        let urlPokemonWithStats = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let responsePokemonWithStats = await fetch(urlPokemonWithStats);
        let showStatsPokemon = await responsePokemonWithStats.json();
        loadedPokemon.push(showStatsPokemon);
        document.body.classList.remove('stop-scrolling');
        document.getElementById('containerWithPokemon').style.opacity = "1";
        document.getElementById('loadingImage').classList.add('dp-none');
        document.getElementById('loadingBg').classList.add('dp-none');
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

window.onscroll = function () {
    if ((window.innerHeight + window.scrollY + 200) >= document.body.offsetHeight && !isLoading) {
        isLoading = true;

        if (load < 975) {
            load = load + 30;
        }
        else if (load < 1009) {
            load = load + 1;
        }

        loadPokemon();

        setTimeout(() => {
            isLoading = false;
        }, 500)
    }
};

window.onclick = function (event) {
    var myBox = document.getElementById('containerWithPokemonStats');

    if (event.target.contains(myBox) && event.target !== myBox) {
        for (let j = 1; j < load; j++) {
            document.getElementById('containerWithPokemonStats').innerHTML = '';
            document.getElementById(`pokemonCard${j}`).style.opacity = "1";
            document.getElementById(`background-image-Card${j}`).style.opacity = "1";
            document.getElementById(`pokemonImage${j}`).style.opacity = "1";
            document.body.classList.remove("stop-scrolling");
            document.getElementById(`pokemonCard${j}`).style.pointerEvents = 'auto';
        }
    }
}

function showAbout(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = `
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
    `;
    document.getElementById('showMoves').style.textDecoration = "none";
    document.getElementById('showStats').style.textDecoration = "none";
    document.getElementById('showAbout').style.color = "rgb(33,37,41)";
    document.getElementById('showStats').style.color = "gray";
    document.getElementById('showMoves').style.color = "gray";
    document.getElementById('showAbout').style.textDecoration = "underline solid 3px";

    for (let l = 0; l < loadedPokemon[i]['types'].length; l++) {
        let typeAbout = loadedPokemon[i]['types'][`${l}`]['type']['name'];

        document.getElementById('typesAbout').innerHTML += `
     <p class="types-bg" id="types-bg${l}">${loadedPokemon[i]['types'][`${l}`]['type']['name']}</p>
`
        changeBackgroundColorAbout(typeAbout, l);
    }
    for (let k = 0; k < loadedPokemon[i]['abilities'].length; k++) {
        document.getElementById(`abilities${i}`).innerHTML += `
     <p class="abilities-bg">${loadedPokemon[i]['abilities'][`${k}`]['ability']['name']}</p>
`
    }
}

function showMoves(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = `
    <div class="containerMoves" id="containerMoves${i}">
    </div>
    `
    document.getElementById('showAbout').style.textDecoration = "none";
    document.getElementById('showStats').style.textDecoration = "none";
    document.getElementById('showMoves').style.color = "rgb(33,37,41)";
    document.getElementById('showAbout').style.color = "gray";
    document.getElementById('showStats').style.color = "gray";
    document.getElementById('showMoves').style.textDecoration = "underline solid 3px";

    for (let m = 0; m < loadedPokemon[i]['moves'].length; m++) {
        document.getElementById(`containerMoves${i}`).innerHTML += `
       <div id="move${m}" class="move">
       ${loadedPokemon[i]['moves'][`${m}`]['move']['name']}
       </div>
       `
    }
}

function buttonNextPokemon(i) {
    loadedPokemon[i++];

    openStatsPokemon(i);
    if (i > 1007) {
        document.getElementById(`arrowRight${i}`).style.display = "none";
    }
    if (i == load - 1) {
        if (load < 975) {
            load = load + 30;
            showAbout(i);
        }
        else if (load < 1009) {
            load = load + 1;
            showAbout(i);
        }
        loadPokemon();
    }
}

function buttonBeforePokemon(i) {
    loadedPokemon[i--];
    openStatsPokemon(i);
    if (i < 2) {
        document.getElementById(`arrowLeft${i}`).style.display = "none";
    }
}

function closeStats() {
    for (let j = 1; j < load; j++) {
        document.getElementById('containerWithPokemonStats').innerHTML = '';
        document.getElementById(`pokemonCard${j}`).style.opacity = "1";
        document.getElementById(`background-image-Card${j}`).style.opacity = "1";
        document.getElementById(`pokemonImage${j}`).style.opacity = "1";
        document.body.classList.remove("stop-scrolling");
        document.getElementById(`pokemonCard${j}`).style.pointerEvents = 'auto';
    }
}