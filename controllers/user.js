const fs = require('fs');
const Mustache = require('mustache');
const { MdlUser } = require('../models');

class User {

    async login(req, res) {
        const nickname = req.body.nickname;
        const result = await MdlUser.login(req);
        if (result.statusCode === 200) {
            res.cookie('token', result.body.token);
            res.cookie('nickname', nickname);
            res.redirect('/profile');
        } else if (result.statusCode === 409) {
            res.status(409).send(result);
        }
    }

    async logout(req, res) {
        const result = await MdlUser.logout(req);
        if (result.statusCode === 200) {
            res.clearCookie('token');
            res.clearCookie('nickname');
            res.redirect('/');
        } else {
            res.status(409).send(result);
        }
    }

    async profilePage(req, res) {
        const template = fs.readFileSync('public/views/profile.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const friends = fs.readFileSync('public/partials/friend_list.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const data = {
            nickname: req.cookies.nickname,
            email: 'asas@gmail.com',
            score: 123456789,
            personal: true,
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

    async profileEditPage(req, res) {
        const template = fs.readFileSync('public/views/profile_edit.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const data = {
            nickname: req.cookies.nickname,
            email: 'asas@gmail.com',
            password: 'asasdasd',
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async addEmailsPage(req, res) {
        const template = fs.readFileSync('public/views/add_emails.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const email_list = fs.readFileSync('public/partials/email_list.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const data = {
            nickname: req.cookies.nickname,
            email: 'asas@gmail.com',
            emails: [
                { email: 'asas@gmail.com' },
                { email: 'qweqwe@gmail.com' },
                { email: '123232asd@gmail.com' },
            ]
        };
        const html = Mustache.to_html(template, data, { menu, footer, email_list });
        res.send(html);
    }

    async indexPage(req, res) {
        const template = fs.readFileSync('public/views/users/index.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menu_admin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const data = {
            nickname: req.cookies.nickname,
        };
        const html = Mustache.to_html(template, data, { menu, menu_admin, footer });
        res.send(html);
    }
}

module.exports = new User();
