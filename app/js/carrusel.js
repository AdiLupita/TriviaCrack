let slideIndex = 0;
const TIME_SLIDE = 5000;
let length = 0;

window.addEventListener('load',loadingCarrusel);

function loadingCarrusel(){
    showSlides();
    pagesEvent();
}

function pagesEvent() {
    const pages = document.getElementsByClassName('owl-page');
    for (let i = 0; i < pages.length; i+=1) {
        pages[i].addEventListener('click', function() { changePages(i) });
    }
}

function changePages(pos) {
    slideIndex = pos;
    const pages = document.getElementsByClassName('owl-page');
    const slides = document.getElementsByClassName('slides');
    length = pages.length;
    if (length > slides.length) {
        length = slides.length;
    }
    for (let i = 0; i < length; i += 1) {
        if (i === pos) {
            pages[i].classList.add('active');
            slides[i].classList.add('visible');
        }
        else {
            pages[i].classList.remove('active');
            slides[i].classList.remove('visible');
        }
    }
}

function showSlides() {
    changePages(slideIndex);
    slideIndex++;
    if(slideIndex > length-1) {
        slideIndex = 0;
    }
    setTimeout(showSlides,TIME_SLIDE);
}
