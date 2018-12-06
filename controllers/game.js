const fs = require('fs');
const Mustache = require('mustache');
const { MdlUser } = require('../models');

class Game {
    async selectAdversaryPage(req, res) {
        const template = fs.readFileSync('public/views/select_adversary.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const friends = fs.readFileSync('public/partials/friend_list.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const friendsList = await MdlUser.getFriends(req.cookies.nickname, req.cookies.token);
        console.log(friendsList);
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
}

module.exports = new Game();
