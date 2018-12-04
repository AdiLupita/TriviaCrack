const fs = require('fs');
const Mustache = require('mustache');

class Game {
    async selectAdversaryPage(req, res) {
        const template = fs.readFileSync('public/views/select_adversary.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const friends = fs.readFileSync('public/partials/friend_list.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const data = {
            nickname: req.cookies.nickname,
            adversary: true,
            friends: [
                {
                    img: 'https://www.enriquedans.com/wp-content/uploads/2018/06/GitHub-Octocat.jpg',
                    nickname: 'Asasdas_asdad',
                },
                {
                    img: 'https://www.enriquedans.com/wp-content/uploads/2018/06/GitHub-Octocat.jpg',
                    nickname: 'Asasdas_asdad',
                },
                {
                    img: 'https://www.enriquedans.com/wp-content/uploads/2018/06/GitHub-Octocat.jpg',
                    nickname: 'Asasdas_asdad',
                }
            ]
        
        };
        const html = Mustache.to_html(template, data, { menu, footer, friends });
        res.send(html);
    }

    async roulettePage(req, res) {
        const template = fs.readFileSync('public/views/roulette.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const data = {
            nickname: req.cookies.nickname,
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }
}

module.exports = new Game();
