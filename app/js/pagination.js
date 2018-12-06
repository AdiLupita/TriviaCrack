
window.addEventListener('load', loadingPagination);
let route = "";

function loadingPagination() {
    try {
        const title = document.getElementById('title');
        if (title.firstChild.textContent == "Questions") {
            route = "questions";
        }
        else if(title.firstChild.textContent == "Games"){
            route = "games";
        }
        else if(title.firstChild.textContent == "Users"){
            route = "users";
        }
    } catch (e) { }
    try {
    document.getElementById('before').addEventListener('click', beforePage);
    document.getElementById('next').addEventListener('click', nextPage)
        const pagination = document.getElementById('pagination');
        const pages = pagination.getElementsByTagName('button');
        for (let page of pages) {
            if(pages[0] !== page && pages[pages.length-1] !== page) {
                page.addEventListener('click', changePage);
              }
        }
    } catch (error) {
    }
}

function beforePage() {
    let page = 1;
    if(this.value > 1) {
        page = Number(this.value) - 1;
    }
    location.href = `/${route}?page=${page}`;
}

function nextPage() {
    let page = Number(this.value) + 1;
    location.href = `/${route}?page=${page}`;
}

function changePage() {
    window.location = `/${route}?page=${this.value}`;
}
