const fs = require('fs');
const Mustache = require('mustache');
const { MdlUser } = require('../models');

class User {

    async login(req, res) {
        const nickname = req.body.nickname;
        const result = await MdlUser.login(req);
        if (result.statusCode === 200) {
            const profile = await MdlUser.getProfile(nickname, result.body.token);
            res.cookie('token', result.body.token);
            res.cookie('nickname', nickname);
            res.cookie('admin', profile.body.data.admin);
            res.cookie('id', profile.body.data.id);
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
            res.clearCookie('admin');
            res.clearCookie('id');
            res.redirect('/');
        } else {
            res.status(409).send(result);
        }
    }

    async register(req, res) {
        const nickname = req.body.nickname;
        const result = await MdlUser.register(req);
        if (result.statusCode === 200) {
            res.cookie('token', result.body.token);
            res.cookie('nickname', nickname);
            res.redirect('/profile');
        } else {
            res.status(result.statusCode);
            res.send(result);
        }
    }

    async profilePage(req, res) {
        const template = fs.readFileSync('public/views/profile.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const friends = fs.readFileSync('public/partials/friend_list.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const profile = await MdlUser.getProfile(req.cookies.nickname, req.cookies.token);
        const data = {
            nickname: profile.body.data.nickname,
            email: profile.body.data.email,
            score: profile.body.data.score,
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
        const listEmails = await MdlUser.getEmails(req.cookies.nickname, req.cookies.token);
        const data = {
            nickname: req.cookies.nickname,
            emails: listEmails.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, footer, email_list });
        res.send(html);
    }

    async addEmail(req, res) {
        const result = await MdlUser.addEmails(req.cookies.nickname, req.body.email, req.cookies.token);
        if (result.statusCode === 200) {
            const template = fs.readFileSync('public/partials/email_list.mst').toString();
            const data = {
                emails: [result.body.data],
            };
            const html = Mustache.to_html(template, data).toString();
            console.log(result.body.data);
            res.send({ body: html });
        } else {
            res.status(result.statusCode).send(result);
        }
    }

    async removeEmail(req, res) {
        const result = await MdlUser.removeEmails(req.cookies.nickname, req.body.email, req.cookies.token);
        res.status(result.statusCode).send(result);

    }

    async getUsers(req, res) {
        const template = fs.readFileSync('public/views/users/index.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menuadmin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const data = {
        };
        const html = Mustache.to_html(template, data, { menu, menuadmin, footer });
        res.send(html);
    }

    async indexPage(req, res) {
        const template = fs.readFileSync('public/views/users/index.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menu_admin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let page = 1;
        if (req.query !== undefined && req.query.page !== undefined) {
            page = req.query.page;
        }
        const result = await MdlUser.getAll(req.cookies.token, page);
        if (result.statusCode !== 200) {
            res.status(result.statusCode);
            res.send(result);
        }
        const data = {
            nickname: req.cookies.nickname,
            items: result.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, menu_admin, footer });
        res.send(html);
    }

    async showPage(req, res) {
        const template = fs.readFileSync('public/views/users/show.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menu_admin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const delete_modal = fs.readFileSync('public/partials/delete_modal.mst').toString();
        const profile = await MdlUser.getProfile(req.params.nickname, req.cookies.token);
        const data = {
            nickname: profile.body.data.nickname,
            email: profile.body.data.email,
            score: profile.body.data.score,
            personal: true,
            route: 'users',
            emails: [
                {
                    email: 'Asasdas1@asdad.com',
                },
                {
                    email: 'Asasdas2@asdad.com',
                },
                {
                    email: 'Asasdas3@asdad.com',
                },
            ]
        };
        const html = Mustache.to_html(template, data, { menu, menu_admin, footer, delete_modal });
        res.send(html);
    }

    async editPage(req, res) {
        const template = fs.readFileSync('public/views/users/edit.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menu_admin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const profile = await MdlUser.getProfile(req.params.nickname, req.cookies.token);
        const data = {
            nickname: profile.body.data.nickname,
            email: profile.body.data.email,
            score: profile.body.data.score,
            personal: true,
        };
        const html = Mustache.to_html(template, data, { menu, menu_admin, footer });
        res.send(html);
    }

    async editUser(req, res) {
        const nickname = req.body.nickname;
        const result = await MdlUser.editUser(req);
        if (result.statusCode !== 200) {
            res.status(result.statusCode);
            res.send(result);
        }
    }

    async deleteUser(req, res) {
        const result = await MdlUser.login(req);
        if (result.statusCode === 200) {
            const profile = await MdlUser.deleteUser(nickname, result.body.token);
            res.redirect('/users');
        } else if (result.statusCode === 409) {
            res.status(409).send(result);
        }
    }
}

module.exports = new User();
