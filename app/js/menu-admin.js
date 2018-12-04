
window.addEventListener('load',loadingMenuAdmin);

function loadingMenuAdmin(){
    try {
        document.getElementById('hide-menu-1').addEventListener('click', hide);
        document.getElementById('hide-menu-2').addEventListener('click', hide);
    } catch (error) {
    }
}

function hideMenu() {
    const menuAdmin = document.getElementById('menu-admin');
    if (menuAdmin.classList.contains('hide-menu')){
        menuAdmin.classList.remove('hide-menu');
    }
    else {
        menuAdmin.classList.add('hide-menu');
    }
}
