function chartJSSetting(i) {
    let hp = loadedPokemon[i]['stats']['0']['base_stat'];
    let attack = loadedPokemon[i]['stats']['1']['base_stat'];
    let defense = loadedPokemon[i]['stats']['2']['base_stat'];
    let special_attack = loadedPokemon[i]['stats']['3']['base_stat'];
    let special_defense = loadedPokemon[i]['stats']['4']['base_stat'];
    let speed = loadedPokemon[i]['stats']['5']['base_stat'];

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