
window.addEventListener('load',loadingMenuAdmin);

function loadingMenuAdmin(){
    try {
        document.getElementById('hide-filter').addEventListener('click', hideMenu);
    } catch (e) {}
}

function hideMenu() {
    try {
        const filter = document.getElementById('filter');
        const content = document.getElementById('content');
        filter.classList.toggle('hide-item');
        content.classList.toggle('col-9');
        content.classList.toggle('col-12');
    }
    catch(e) {}
}
