const fs = require('fs');
const Mustache = require('mustache');
const { MdlUser, MdlGame } = require('../models');

class Game {
    async selectAdversaryPage(req, res) {
        const template = fs.readFileSync('public/views/select_adversary.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const friends = fs.readFileSync('public/partials/friend_list.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const friendsList = await MdlUser.getFriends(req.cookies.nickname, req.cookies.token);
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            adversary: true,
            friends: friendsList.body.data,
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

    async createGame(req, res) {
        const player1 = req.cookies.nickname;
        const player2 = req.body.player2;
        const token = req.cookies.token;
        const result = await MdlGame.createGame(player1, player2, token);
        if(result.statusCode === 200){
            res.cookie('idgame', result.body.data.id);
            res.redirect('roulette');
        }else{
            res.status(result.statusCode).send(result);
        }
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
