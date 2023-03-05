let loadedPokemon = [''];
let load = 30;
let currentPokemon = 1;
let isLoading = false;

async function loadPokemon() {
    for (i = currentPokemon; i < load; i++) {
        loadingScreenStart();
        currentPokemon++;
        let urlPokemon = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
        let responsePokemon = await fetch(urlPokemon);
        let currentPokemonJSON = await responsePokemon.json();
        let pokemonName = currentPokemonJSON['pokemon']['name'];
        let urlPokemonWithStats = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let responsePokemonWithStats = await fetch(urlPokemonWithStats);
        let showStatsPokemon = await responsePokemonWithStats.json();
        loadedPokemon.push(showStatsPokemon);
        loadingScreenEnd();
        showPokemon(i);
    }
}

function loadingScreenStart() {
    document.body.classList.add('stop-scrolling');
    document.getElementById('containerWithPokemon').style.opacity = "0.2";
    document.getElementById('loadingImage').classList.remove('dp-none');
    document.getElementById('loadingBg').classList.remove('dp-none');
    document.getElementById('header').style.pointerEvents = 'none';
    document.getElementById('headerImg').style.opacity = "0.3";
    document.getElementById('search').style.opacity = "0.3";
    document.getElementById('gottaHeadline').style.opacity = "0.3";
}

function loadingScreenEnd() {
    document.body.classList.remove('stop-scrolling');
    document.getElementById('containerWithPokemon').style.opacity = "1";
    document.getElementById('loadingImage').classList.add('dp-none');
    document.getElementById('loadingBg').classList.add('dp-none');
    document.getElementById('header').style.pointerEvents = 'auto';
    document.getElementById('headerImg').style.opacity = "1";
    document.getElementById('search').style.opacity = "1";
    document.getElementById('gottaHeadline').style.opacity = "1";
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
    changeBackgroundColor(pokemonType, i);
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
            if (document.getElementById(`pokemonCard${j}`) == null) {
            }
            else {
                closeStatsBgChange(j);
                emptyInputIfSearch();
            }
        }
    }
};

function showAbout(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = showAboutTemplate(i);
    showAboutHeadlineChange();

    for (let l = 0; l < loadedPokemon[i]['types'].length; l++) {
        let typeAbout = loadedPokemon[i]['types'][`${l}`]['type']['name'];
        document.getElementById('typesAbout').innerHTML += showAboutTypesTemplate(l, i);
        changeBackgroundColorAbout(typeAbout, l);
    }
    for (let k = 0; k < loadedPokemon[i]['abilities'].length; k++) {
        document.getElementById(`abilities${i}`).innerHTML += showAboutAbilitiesTemplate(k, i)
    }
}

function showAboutHeadlineChange() {
    document.getElementById('showMoves').style.textDecoration = "none";
    document.getElementById('showStats').style.textDecoration = "none";
    document.getElementById('showAbout').style.color = "rgb(33,37,41)";
    document.getElementById('showStats').style.color = "gray";
    document.getElementById('showMoves').style.color = "gray";
    document.getElementById('showAbout').style.textDecoration = "underline solid 3px";
}

function showMoves(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = showMovesTemplate(i);
    showMovesHeadlineChange();

    for (let m = 0; m < loadedPokemon[i]['moves'].length; m++) {
        document.getElementById(`containerMoves${i}`).innerHTML += showAllMovesTemplate(m, i);
    }
}

function showMovesHeadlineChange() {
    document.getElementById('showAbout').style.textDecoration = "none";
    document.getElementById('showStats').style.textDecoration = "none";
    document.getElementById('showMoves').style.color = "rgb(33,37,41)";
    document.getElementById('showAbout').style.color = "gray";
    document.getElementById('showStats').style.color = "gray";
    document.getElementById('showMoves').style.textDecoration = "underline solid 3px";
}

function buttonNextPokemon(i) {
    loadedPokemon[i++];
    noAnimation();
    openStatsPokemon(i);
    if (i > 1007) {
        document.getElementById(`arrowRight${i}`).style.display = "none";
    }
    buttonNextIfEnd(i);
}

async function buttonNextIfEnd(i) {
    if (i == load - 1) {
        if (load < 975) {
            load = load + 30;
            showAbout(i);
        }
        else if (load < 1009) {
            load = load + 1;
            showAbout(i);
        }
        await loadPokemon();
        checkIfPokemonNullOpenStatsBgChange();
    }
}

function checkIfPokemonNullOpenStatsBgChange() {
    for (let j = 1; j < loadedPokemon.length; j++) {
        if (document.getElementById(`pokemonCard${j}`) == null) {
        }
        else {
            openStatsBgChange(j);
        }
    }
}

function buttonBeforePokemon(i) {
    loadedPokemon[i--];
    noAnimation();
    openStatsPokemon(i);
    if (i < 2) {
        document.getElementById(`arrowLeft${i}`).style.display = "none";
    }
}

function noAnimation() {
    document.getElementById('currentPokemonStats').onclick = function () {
        document.getElementById('currentPokemonStats').style.animation = "statsSize 0s forwards";
    }
}

function closeStats() {
    for (let j = 1; j < load; j++) {
        if (document.getElementById(`pokemonCard${j}`) == null) {
        }
        else {
            closeStatsBgChange(j);
            emptyInputIfSearch();
        }
    }
}

function openStatsPokemon(i) {
    let showPokemonImage = loadedPokemon[i]['sprites']['other']['official-artwork']['front_default'];
    let pokemonNameBigLetter = loadedPokemon[i]['name'].charAt(0).toUpperCase() + loadedPokemon[i]['name'].slice(1);
    let pokemonTypeStats = loadedPokemon[i]['types']['0']['type']['name'];
    let showPokemonNumber = loadedPokemon[i]['id'];

    document.getElementById('containerWithPokemonStats').innerHTML = openStatsTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage);
    statsHeadlineColorChange();
    dpNoneArrowIfLessOrMore(i);
    changeBackgroundColorStats(pokemonTypeStats);
    chartJSSetting(i);
    checkIfPokemonNullOpenStatsBgChange();
}

function dpNoneArrowIfLessOrMore(i) {
    if (i < 2) {
        document.getElementById(`arrowLeft${i}`).style.display = "none";
    }
    else if (i > 1007) {
        document.getElementById(`arrowRight${i}`).style.display = "none";
    }
}

function statsHeadlineColorChange() {
    document.getElementById('showMoves').style.textDecoration = "none";
    document.getElementById('showAbout').style.textDecoration = "none";
    document.getElementById('showAbout').style.color = "gray";
    document.getElementById('showMoves').style.color = "gray";
    document.getElementById('showStats').style.textDecoration = "underline solid 3px";
}

function openStatsBgChange(j) {
    document.getElementById(`pokemonCard${j}`).style.opacity = "0.3";
    document.getElementById(`background-image-Card${j}`).style.opacity = "0";
    document.getElementById(`pokemonImage${j}`).style.opacity = "0.5";
    document.body.classList.add("stop-scrolling");
    document.getElementById(`pokemonCard${j}`).style.pointerEvents = 'none';
    document.getElementById('header').style.pointerEvents = 'none';
    document.getElementById('headerImg').style.opacity = "0.3";
    document.getElementById('search').style.opacity = "0.3";
    document.getElementById('gottaHeadline').style.opacity = "0.3";
}

function closeStatsBgChange(j) {
    document.getElementById('containerWithPokemonStats').innerHTML = '';
    document.getElementById(`pokemonCard${j}`).style.opacity = "1";
    document.getElementById(`background-image-Card${j}`).style.opacity = "1";
    document.getElementById(`pokemonImage${j}`).style.opacity = "1";
    document.body.classList.remove("stop-scrolling");
    document.getElementById(`pokemonCard${j}`).style.pointerEvents = 'auto';
    document.getElementById('header').style.pointerEvents = 'auto';
    document.getElementById('headerImg').style.opacity = "1";
    document.getElementById('search').style.opacity = "1";
    document.getElementById('gottaHeadline').style.opacity = "1";
}

function showStats(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = showStatsTemplate(i);
    document.getElementById('showStats').style.color = "rgb(33,37,41)";
    statsHeadlineColorChange();
    chartJSSetting(i);
}

function filterPokemon() {
    moveUp();
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let pokemonContainer = document.getElementById('containerWithPokemon');
    pokemonContainer.innerHTML = '<div id="containerWithPokemonStats"></div>';

    for (let i = 1; i < loadedPokemon.length; i++) {
        let pokemon = loadedPokemon[i]['name'];
        if (pokemon.toLowerCase().includes(search)) {
            showPokemon(i);
        }
    }
}

function moveUp() {
    window.location = '#';
}

function scrollUpOrEmptyInput() {
    if (document.getElementById('search').value.length == 0) {
        window.location = '#';
    }
    else {
        document.getElementById('search').value = '';
        filterPokemon();
    }
}

function emptyInputIfSearch() {
    if (document.getElementById('search').value.length > 0) {

        document.getElementById('search').value = '';
        filterPokemon();
    }
}