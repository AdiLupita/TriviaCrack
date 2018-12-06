const fs = require('fs');
const Mustache = require('mustache');
const { MdlGame } = require('../models');

class Game {
    async selectAdversaryPage(req, res) {
        const template = fs.readFileSync('public/views/select_adversary.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const friends = fs.readFileSync('public/partials/friend_list.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
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
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async indexPage(req, res) {
        const template = fs.readFileSync('public/views/games/index.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menu_admin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const tfoot = fs.readFileSync('public/partials/tfoot.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const result = await MdlGame.getAll(req.cookies.token, req.query);
        if(result.body.pages == undefined){
            res.redirect('/users');
        }
        if (result.statusCode !== 200) {
            res.status(result.statusCode);
            res.send(result);
        }
        let page = 1;
        if (req.query.page) {
            page = req.query.page;
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            pages: [{ page: page}],
            actual: page,
            items: result.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, menu_admin, footer, tfoot });
        res.send(html);
    }
}

module.exports = new Game();
