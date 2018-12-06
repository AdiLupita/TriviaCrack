const fs = require('fs');
const Mustache = require('mustache');
const { MdlUser, MdlGame, MdlCategory } = require('../models');

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

    async gameFinishPage(req, res) {
        const template = fs.readFileSync('public/views/finish_game.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const user = await MdlUser.getProfile(req.cookies.nickname, req.cookies.token);
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            score: user.body.data.score,
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async selectGameMode(req, res) {
        const template = fs.readFileSync('public/views/game_mode.mst').toString();
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
        if (result.statusCode === 200) {
            res.cookie('idgame', result.body.data.id);
            res.redirect('roulette');
        } else {
            res.status(result.statusCode).send(result);
        }
    }

    async createGameRandom(req, res) {
        const player1 = req.cookies.nickname;
        const token = req.cookies.token;
        const usrRan = await MdlUser.getAll(token, { random: true });
        const player2 = usrRan.body.data.nickname;
        const result = await MdlGame.createGame(player1, player2, token);
        if (result.statusCode === 200) {
            res.cookie('idgame', result.body.data.id);
            res.redirect('roulette');
        } else {
            res.status(result.statusCode).send(result);
        }
    }

    async getRandomCategory(req, res) {
        const token = req.cookies.token;
        const qs = { random: true };
        const result = await MdlCategory.getCategories(token, qs);
        if (result.statusCode === 200) {
            res.cookie('category', result.body.data.name);
        }
        res.redirect('/question');
    }

    async indexPage(req, res) {
        const template = fs.readFileSync('public/views/games/index.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const tfoot = fs.readFileSync('public/partials/tfoot.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const result = await MdlGame.getAll(req.cookies.token, req.query);
        if (result.body.pages == undefined) {
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
            pages: [{ page: page }],
            actual: page,
            items: result.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, footer, tfoot });
        res.send(html);
    }

    async showPage(req, res) {
        const template = fs.readFileSync('public/views/games/show.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const delete_modal = fs.readFileSync('public/partials/delete_modal.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const result = await MdlGame.getGame(req.params.id, req.cookies.token);
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            route: 'games',
            data: result.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, footer, delete_modal });
        res.send(html);
    }
}

module.exports = new Game();
