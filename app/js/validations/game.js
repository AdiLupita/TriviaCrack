window.addEventListener('load', getCategoryRoulette);

function apiGetRandCategory() {
    API.get('/game/rand_category')
        .then((result) => {
            window.location = result.url;
        });
}

function getCategoryRoulette() {
    try {
        document.getElementById('btn-roulette')
            .addEventListener('click', apiGetRandCategory);
    } catch (error) {

    }
}


window.addEventListener('load', playWithRandom);

function apiPlayRandom() {
    API.get('/game/rand_player')
        .then((result) => {
            window.location = result.url;
        });
}

function playWithRandom() {
    try {
        document.getElementById('btn-play-random')
            .addEventListener('click', apiPlayRandom);
    } catch (error) {

    }
}
