let loadedPokemon = [''];
let load = 20;
let currentPokemon = 1;
let isLoading = false;
let allPokemon = [''];
let searchedPokemon = [''];

/** loads and displays current loaded pokemon */
async function loadPokemon() {
    loadingScreenStart();
    renderAllPokemon();
    for (i = currentPokemon; i < load; i++) {
        currentPokemon++;
        let urlPokemon = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
        let responsePokemon = await fetch(urlPokemon);
        let currentPokemonJSON = await responsePokemon.json();
        let pokemonName = currentPokemonJSON['pokemon']['name'];
        let urlPokemonWithStats = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        let responsePokemonWithStats = await fetch(urlPokemonWithStats);
        let showStatsPokemon = await responsePokemonWithStats.json();
        loadedPokemon.push(showStatsPokemon);
        showPokemon(i);
    }
    loadingScreenEnd();
}

/** renders all pokemon from API */
async function renderAllPokemon() {
    let urlAllPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=1010&offset=0';
    let responseAllPokemon = await fetch(urlAllPokemon);
    let allPokemonJSON = await responseAllPokemon.json();
    allPokemon.push(allPokemonJSON);
}

/** starts the loading screen */
function loadingScreenStart() {
    document.body.classList.add('stop-scrolling');
    document.getElementById('containerWithPokemon').style.opacity = "0.2";
    document.getElementById('loadingImage').classList.remove('dp-none');
    document.getElementById('loadingBg').classList.remove('dp-none');
    document.getElementById('header').style.pointerEvents = 'none';
    document.getElementById('search').readOnly = true;
    document.getElementById('headerImg').style.opacity = "0.3";
    document.getElementById('search').style.opacity = "0.3";
    document.getElementById('gottaHeadline').style.opacity = "0.3";
}

/** ends the loading screen */
function loadingScreenEnd() {
    document.body.classList.remove('stop-scrolling');
    document.getElementById('containerWithPokemon').style.opacity = "1";
    document.getElementById('loadingImage').classList.add('dp-none');
    document.getElementById('loadingBg').classList.add('dp-none');
    document.getElementById('header').style.pointerEvents = 'auto';
    document.getElementById('search').readOnly = false;
    document.getElementById('headerImg').style.opacity = "1";
    document.getElementById('search').style.opacity = "1";
    document.getElementById('gottaHeadline').style.opacity = "1";
}

/**
 * displays current pokemon
 * @param {id} i = id of current pokemon 
 */
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

/**
 * if 200px above bottom of page, loads more pokemon, expect if searched for pokemon
 * @returns if search value is bigger than 0
 */
window.onscroll = function () {
    if (document.getElementById('search').value.length > 0) {
        return;
    }
    else {
        if ((window.innerHeight + window.scrollY + 200) >= document.body.offsetHeight && !isLoading) {
            loadAtBottomMorePokemon();
        }
    }
};

/** loads more pokemon if page is 200px above bottom of page */
function loadAtBottomMorePokemon() {
    isLoading = true;
    if (load < 975) {
        load = load + 30;
    }
    else if (load < 1011) {
        load = load + 1;
    }
    loadPokemon();
    setTimeout(() => {
        isLoading = false;
    }, 500)
}

/**
 * closes stats container if clicking outside stats container
 * @param {action} event = checks if clicking outside stats container or not
 */
window.onclick = function (event) {
    var myBox = document.getElementById('containerWithPokemonStats');

    if (event.target.contains(myBox) && event.target !== myBox) {
        for (let j = 1; j < load; j++) {
            if (document.getElementById(`pokemonCard${j}`) == null) {
            }
            else {
                closeStatsBgChange(j);
            }
        }
    }
};

/**
 * displays "about" information of current pokemon
 * @param {id} i = id of current pokemon 
 */
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

/**
 * displays "about" information of searched pokemon
 * @param {id} i = id of searched pokemon 
 */
function showSearchedAbout(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = showSearchedAboutTemplate(i);
    showAboutHeadlineChange();

    for (let l = 0; l < searchedPokemon[i]['types'].length; l++) {
        let typeAbout = searchedPokemon[i]['types'][`${l}`]['type']['name'];
        document.getElementById('typesAbout').innerHTML += showSearchedAboutTypesTemplate(l, i);
        changeBackgroundColorAbout(typeAbout, l);
    }
    for (let k = 0; k < searchedPokemon[i]['abilities'].length; k++) {
        document.getElementById(`abilities${i}`).innerHTML += showSearchedAboutAbilitiesTemplate(k, i)
    }
}

/** changes headline styling after clicking on "about" information */
function showAboutHeadlineChange() {
    document.getElementById('showMoves').style.textDecoration = "none";
    document.getElementById('showStats').style.textDecoration = "none";
    document.getElementById('showAbout').style.color = "rgb(33,37,41)";
    document.getElementById('showStats').style.color = "gray";
    document.getElementById('showMoves').style.color = "gray";
    document.getElementById('showAbout').style.textDecoration = "underline solid 3px";
}

/**
 * displays "moves" information of current pokemon
 * @param {id} i = id of current pokemon 
 */
function showMoves(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = showMovesTemplate(i);
    showMovesHeadlineChange();

    for (let m = 0; m < loadedPokemon[i]['moves'].length; m++) {
        document.getElementById(`containerMoves${i}`).innerHTML += showAllMovesTemplate(m, i);
    }
}

/**
 * displays "moves" information of searched pokemon
 * @param {id} i = id of searched pokemon 
 */
function showSearchedMoves(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = showMovesTemplate(i);
    showMovesHeadlineChange();

    for (let m = 0; m < searchedPokemon[i]['moves'].length; m++) {
        document.getElementById(`containerMoves${i}`).innerHTML += showSearchedAllMovesTemplate(m, i);
    }
}

/** changes headline styling after clicking on "moves" information */
function showMovesHeadlineChange() {
    document.getElementById('showAbout').style.textDecoration = "none";
    document.getElementById('showStats').style.textDecoration = "none";
    document.getElementById('showMoves').style.color = "rgb(33,37,41)";
    document.getElementById('showAbout').style.color = "gray";
    document.getElementById('showStats').style.color = "gray";
    document.getElementById('showMoves').style.textDecoration = "underline solid 3px";
}

/**
 * loads next pokemon on clicking on arrow right, expect last pokemon is showing
 * @param {id} i = id of current pokemon 
 */
function buttonNextPokemon(i) {
    loadedPokemon[i++];
    noAnimation();
    openStatsPokemon(i);
    if (i > 1009) {
        document.getElementById(`arrowRight${i}`).style.display = "none";
    }
    buttonNextIfEnd(i);
}

/**
 * loads 30 new pokemon on scrolling down, expect if 975 pokemon laoded, after this 
 * only 1 new pokemon is loading
 * @param {id} i = id of current pokemon 
 */
async function buttonNextIfEnd(i) {
    if (i == load - 1) {
        if (load < 975) {
            load = load + 30;
            showAbout(i);
        }
        else if (load < 1011) {
            load = load + 1;
            showAbout(i);
        }
        await loadPokemon();
        checkIfPokemonNullOpenStatsBgChange();
    }
}

/** returns if pokemon card couldn't load correctly */
function checkIfPokemonNullOpenStatsBgChange() {
    for (let j = 1; j < loadedPokemon.length; j++) {
        if (document.getElementById(`pokemonCard${j}`) == null) {
        }
        else {
            openStatsBgChange(j);
        }
    }
}

/** returns if searched pokemon card couldn't load correctly */
function checkIfPokemonNullOpenStatsSearchedBgChange() {
    for (let j = 1; j < searchedPokemon.length; j++) {
        if (document.getElementById(`pokemonCard${j}`) == null) {
        }
        else {
            openStatsBgChange(j);
        }
    }
}

/**
 * loads infront pokemon on clicking on arrow left, expect first pokemon is showing
 * @param {id} i = id of current pokemon
 */
function buttonBeforePokemon(i) {
    loadedPokemon[i--];
    noAnimation();
    openStatsPokemon(i);
    if (i < 2) {
        document.getElementById(`arrowLeft${i}`).style.display = "none";
    }
}

/** stops opening stats animation */
function noAnimation() {
    document.getElementById('currentPokemonStats').onclick = function () {
        document.getElementById('currentPokemonStats').style.animation = "statsSize 0s forwards";
    }
}

/** closes stats if pokemon card could load correctly */
function closeStats() {
    for (let j = 1; j < load; j++) {
        if (document.getElementById(`pokemonCard${j}`) == null) {
        }
        else {
            closeStatsBgChange(j);
        }
    }
}

/**
 * opens stats container of current pokemon
 * @param {id} i = id of current pokemon 
 */
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

/**
 * opens stats container of searched pokemon
 * @param {id} i = id of searched pokemon 
 */
function openStatsSearchedPokemon(i) {
    let showPokemonImage = searchedPokemon[i]['sprites']['other']['official-artwork']['front_default'];
    let pokemonNameBigLetter = searchedPokemon[i]['name'].charAt(0).toUpperCase() + searchedPokemon[i]['name'].slice(1);
    let pokemonTypeStats = searchedPokemon[i]['types']['0']['type']['name'];
    let showPokemonNumber = searchedPokemon[i]['id'];

    document.getElementById('containerWithPokemonStats').innerHTML = openStatsSearchedTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage);
    statsHeadlineColorChange();
    changeBackgroundColorStats(pokemonTypeStats);
    chartJSSearchedSetting(i);
    checkIfPokemonNullOpenStatsSearchedBgChange();
}

/**
 * disables arrow left or right at first or last pokemon
 * @param {id} i = id of current pokemon 
 */
function dpNoneArrowIfLessOrMore(i) {
    if (i < 2) {
        document.getElementById(`arrowLeft${i}`).style.display = "none";
    }
    else if (i > 1009) {
        document.getElementById(`arrowRight${i}`).style.display = "none";
    }
}

/** changes headline color of stats */
function statsHeadlineColorChange() {
    document.getElementById('showMoves').style.textDecoration = "none";
    document.getElementById('showAbout').style.textDecoration = "none";
    document.getElementById('showAbout').style.color = "gray";
    document.getElementById('showMoves').style.color = "gray";
    document.getElementById('showStats').style.textDecoration = "underline solid 3px";
}

/**
 * changes background behind stats after opening stats
 * @param {id} j = id of current pokemon 
 */
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

/**
 * changes background behind stats after closing stats
 * @param {id} j = id of current pokemon 
 */
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

/**
 * shows stats of current pokemon
 * @param {id} i = id of current pokemon 
 */
function showStats(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = showStatsTemplate(i);
    document.getElementById('showStats').style.color = "rgb(33,37,41)";
    statsHeadlineColorChange();
    chartJSSetting(i);
}

/**
 * shows stats of searched pokemon
 * @param {id} i = id of searched pokemon 
 */
function showSearchedStats(i) {
    document.getElementById(`informationPokemon${i}`).innerHTML = showStatsTemplate(i);
    document.getElementById('showStats').style.color = "rgb(33,37,41)";
    statsHeadlineColorChange();
    chartJSSearchedSetting(i);
}

/** filter searched pokemon */
function filterPokemon() {
    moveUp();
    searchedPokemon = [''];
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let pokemonContainer = document.getElementById('containerWithPokemon');
    pokemonContainer.innerHTML = containerWithPokemonStatsTemplate();
    filterIfLength(search);
}

/**
 * loads different amount of pokemon by input value length
 * @param {input} search = search inputfield value
 */
function filterIfLength(search) {
    if (search.length < 1) {
        for (i = 1; i < load; i++) {
            showPokemon(i);
        }
    }
    if (search.length == 1) {
        searchFirstGenPokemon(search);
    }
    if (search.length > 1) {
        searchAllPokemon(search);
    }
}

/**
 * loads the first 151 pokemon which includes inputfield value
 * @param {input} search = search inputfield value
 */
async function searchFirstGenPokemon(search) {
    loadingScreenStart();
    for (let i = 0; i < 151; i++) {
        let pokemon = allPokemon['1']['results'][i]['name'];
        let pokemonURL = allPokemon['1']['results'][i]['url'];
        if (pokemon.toLowerCase().startsWith(search)) {
            await searchAllPokemonByLetters(pokemonURL)
        }
    }
    for (let j = 1; j < searchedPokemon.length; j++) {
        showSearchedPokemon(j);
    }
    loadingScreenEnd();
}

/**
 * loads all pokemon which includes inputfield value
 * @param {input} search = search inputfield value
 */
async function searchAllPokemon(search) {
    loadingScreenStart();
    for (let i = 0; i < allPokemon['1']['results'].length; i++) {
        let pokemon = allPokemon['1']['results'][i]['name'];
        let pokemonURL = allPokemon['1']['results'][i]['url'];
        if (pokemon.toLowerCase().startsWith(search)) {
            await searchAllPokemonByLetters(pokemonURL)
        }
    }
    for (let j = 1; j < searchedPokemon.length; j++) {
        showSearchedPokemon(j);
    }
    loadingScreenEnd();
}

/**
 * loads all API's of searched pokemon
 * @param {url} pokemonURL = url of searched pokemon API
 */
async function searchAllPokemonByLetters(pokemonURL) {
    let responseSearchedPokemon = await fetch(pokemonURL);
    let currentSearchedPokemonJSON = await responseSearchedPokemon.json();
    let pokemonSearchedName = currentSearchedPokemonJSON['name'];
    let urlPokemonWithStatsSearched = `https://pokeapi.co/api/v2/pokemon/${pokemonSearchedName}`;
    let responsePokemonWithStatsSearched = await fetch(urlPokemonWithStatsSearched);
    let showStatsPokemonSearched = await responsePokemonWithStatsSearched.json();
    searchedPokemon.push(showStatsPokemonSearched);
}

/**
 * displays searched pokemon
 * @param {id} i = id of current pokemon 
 */
function showSearchedPokemon(i) {
    let showPokemonNumber = searchedPokemon[i]['id'];
    let pokemonNameBigLetter = searchedPokemon[i]['name'].charAt(0).toUpperCase() + searchedPokemon[i]['name'].slice(1);
    let showPokemonImage = searchedPokemon[i]['sprites']['other']['official-artwork']['front_default'];
    let pokemonType = searchedPokemon[i]['types']['0']['type']['name'];
    if (searchedPokemon[i]['types'].length > 1) {
        document.getElementById('containerWithPokemon').innerHTML += typeIsTwoSearchedTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType);
    }
    else {
        document.getElementById('containerWithPokemon').innerHTML += typeIsOneSearchedTemplate(i, showPokemonNumber, pokemonNameBigLetter, showPokemonImage, pokemonType);
    }
    changeBackgroundColor(pokemonType, i);
}

/** moves to top of page */
function moveUp() {
    window.scrollTo(0, 0);
}

/** scrolls up or filters pokemon depends by inputfield value  */
function scrollUpOrEmptyInput() {
    if (document.getElementById('search').value.length == 0) {
        window.scrollTo(0, 0);
    }
    else {
        document.getElementById('search').value = '';
        filterPokemon();
    }
}