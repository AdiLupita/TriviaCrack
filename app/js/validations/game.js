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