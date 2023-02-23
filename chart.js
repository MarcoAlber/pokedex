function openStatsPokemon(i) {
    let hp = loadedPokemon[i]['stats']['0']['base_stat'];
    let attack = loadedPokemon[i]['stats']['1']['base_stat'];
    let defense = loadedPokemon[i]['stats']['2']['base_stat'];
    let special_attack = loadedPokemon[i]['stats']['3']['base_stat'];
    let special_defense = loadedPokemon[i]['stats']['4']['base_stat'];
    let speed = loadedPokemon[i]['stats']['5']['base_stat'];
    let showPokemonImage = loadedPokemon[i]['sprites']['other']['official-artwork']['front_default'];
    let pokemonNameBigLetter = loadedPokemon[i]['name'].charAt(0).toUpperCase() + loadedPokemon[i]['name'].slice(1);
    let pokemonTypeStats = loadedPokemon[i]['types']['0']['type']['name'];
    let showPokemonNumber = loadedPokemon[i]['id'];

    for (let j = 1; j < load; j++) {
        document.getElementById(`pokemonCard${j}`).style.opacity = "0.3";
        document.getElementById(`background-image-Card${j}`).style.opacity = "0";
        document.getElementById(`pokemonImage${j}`).style.opacity = "0.5";
        document.body.classList.add("stop-scrolling");
        document.getElementById(`pokemonCard${j}`).style.pointerEvents = 'none';
    }

    document.getElementById('containerWithPokemonStats').innerHTML = `
    <div class="currentPokemonStats" id="currentPokemonStats">
        <div class="contentPokemonStats">
            <div class="background-image-StyleCard">
            </div>
            <span id="pokemonNumber${i}" class="pokemonNumber"><b>${showPokemonNumber}</b></span>
            <img class="closeStats" onclick="closeStats()" id="closeStats" src="./img/close-window-64.png">
            <img class="arrowRight" onclick="buttonNextPokemon(${i})" id="arrowRight${i}" src="./img/arrow-88-64-right.png">
            <img class="arrowLeft" onclick="buttonBeforePokemon(${i})" id="arrowLeft${i}" src="./img/arrow-88-64.png">
            <h1 id="pokemonNamesStats">${pokemonNameBigLetter}</h1>
            <div class="containerStatsImage">
                <img class="statsImage" src= "${showPokemonImage}">
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
    </div>`;
    document.getElementById('showMoves').style.textDecoration = "none";
    document.getElementById('showAbout').style.textDecoration = "none";
    document.getElementById('showAbout').style.color = "gray";
    document.getElementById('showMoves').style.color = "gray";
    document.getElementById('showStats').style.textDecoration = "underline solid 3px";

    if (i < 2) {
        document.getElementById(`arrowLeft${i}`).style.display = "none";
    }
    else if (i > 1007) {
        document.getElementById(`arrowRight${i}`).style.display = "none";
    }

    changeBackgroundColorStats(pokemonTypeStats);

    const ctx = document.getElementById(`myChart${i}`);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
            datasets: [{
                axis: 'y',
                label: '',
                data: [hp, attack, defense, special_attack, special_defense, speed],
                fill: false,
                borderRadius: 100,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(153, 102, 255, 0.9)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 159, 64)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            indexAxis: 'y',
            labels: {
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        }
    });
}

function showStats(i) {
    let hp = loadedPokemon[i]['stats']['0']['base_stat'];
    let attack = loadedPokemon[i]['stats']['1']['base_stat'];
    let defense = loadedPokemon[i]['stats']['2']['base_stat'];
    let special_attack = loadedPokemon[i]['stats']['3']['base_stat'];
    let special_defense = loadedPokemon[i]['stats']['4']['base_stat'];
    let speed = loadedPokemon[i]['stats']['5']['base_stat'];

    document.getElementById(`informationPokemon${i}`).innerHTML = `
    <div class="myChart">
                        <canvas id="myChart${i}"></canvas>
                    </div>
`;
    document.getElementById('showStats').style.color = "rgb(33,37,41)";
    document.getElementById('showMoves').style.textDecoration = "none";
    document.getElementById('showAbout').style.textDecoration = "none";
    document.getElementById('showAbout').style.color = "gray";
    document.getElementById('showMoves').style.color = "gray";
    document.getElementById('showStats').style.textDecoration = "underline solid 3px";

    const ctx = document.getElementById(`myChart${i}`);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Special-Attack', 'Special-Defense', 'Speed'],
            datasets: [{
                axis: 'y',
                label: '',
                data: [hp, attack, defense, special_attack, special_defense, speed],
                fill: false,
                borderRadius: 100,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(255, 159, 64, 0.9)',
                    'rgba(54, 162, 235, 0.9)',
                    'rgba(153, 102, 255, 0.9)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 159, 64)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            indexAxis: 'y',
            labels: {
                scales: {
                    x: {
                        beginAtZero: true
                    }
                }
            }
        }
    });
}