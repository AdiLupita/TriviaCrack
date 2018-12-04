const ITME_HIDE_HEADER = 3000;

function show() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hide');
}

let hideHead;
function headerScroll() {
    try {
        document.getElementById('header').classList.remove('no-visible');
        window.clearTimeout(hideHead);
        const header = document.getElementsByTagName('header');
        const logo = document.getElementById('logo');
        const options = document.getElementById('drop-menu');
        const menu = document.getElementById('menu');
        if (window.scrollY <= 100) {
            clearTimeout(hideHead);
            header[0].classList.remove('scroller');
            options.classList.remove('scroller');
            menu.classList.remove('scroller');
            menu.parentNode.classList.add('menu');
            itemMenuScroll(false);
        }
        else {
            header[0].classList.add('scroller');
            options.classList.add('scroller');
            menu.classList.add('scroller');
            menu.parentNode.classList.remove('menu');
            itemMenuScroll(true);
            hideHead = setTimeout(hideHeader, ITME_HIDE_HEADER);
        }
    } catch (error) {

    }
}

function hideHeader() {
    document.getElementById('header').classList.add('no-visible');
}

function itemMenuScroll(add) {
    const items = document.getElementsByTagName('a');
    for (let i of items) {
        if (i.parentNode.parentNode.id === 'menu') {
            if (add) {
                i.classList.add('scroller');
            }
            else {
                i.classList.remove('scroller');
            }
        }
    }
}

function changePictureWelcome() {
    const picture = document.getElementById('welcome');
    if (window.screen.width > 450) {
        picture.src = "img/welcome.png";
    }
    else {
        picture.src = "img/logo.png";
    }
}

function loadingPrincipal() {
    try {
        const btn = document.getElementById('drop-menu');
        btn.addEventListener('click', show);
        changePictureWelcome();
    } catch (error) {

    }
}


window.addEventListener('scroll', headerScroll);
window.addEventListener('load', loadingPrincipal);
