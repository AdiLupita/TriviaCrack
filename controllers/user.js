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
        } else {
            res.status(result.statusCode).send(result);
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
        const friendsList = await MdlUser.getFriends(req.cookies.nickname, req.cookies.token);
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: profile.body.data.nickname,
            email: profile.body.data.email,
            score: profile.body.data.score,
            avatar: profile.body.data.avatar,
            admin: manage,
            personal: true,
            friends: friendsList.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, footer, friends });
        res.send(html);
    }

    async addFriend(req, res) {
        const result = await MdlUser.addFriend(req.cookies.nickname, req.body.friend, req.cookies.token);
        if (result.statusCode === 200) {
            const template = fs.readFileSync('public/partials/friend.mst').toString();
            const data = {
                ...result.body.data,
                personal: true,
            };
            const html = Mustache.to_html(template, data).toString();
            res.send({
                statusCode: result.statusCode,
                body: html
            });
        } else {
            res.status(result.statusCode).send(result);
        }
    }

    async removeFriend(req, res) {
        const result = await MdlUser.removeFriend(req.cookies.nickname, req.body.friend, req.cookies.token);
        res.status(result.statusCode).send(result);
    }

    async profileEditPage(req, res) {
        const template = fs.readFileSync('public/views/profile_edit.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const profile = await MdlUser.getProfile(req.cookies.nickname, req.cookies.token);
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: profile.body.data.nickname,
            email: profile.body.data.email,
            password: 'default',
            avatar: profile.body.data.avatar,
            admin: manage,
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async profileUpdate(req, res) {
        const result = await MdlUser.updateUser(req.cookies.nickname, req.body, req.cookies.token);
        if (result.statusCode === 204) {
            res.status(204).send();
        } else {
            res.status(result.statusCode).send(result);
        }
    }

    async addEmailsPage(req, res) {
        const template = fs.readFileSync('public/views/add_emails.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const email_list = fs.readFileSync('public/partials/email_list.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const listEmails = await MdlUser.getEmails(req.cookies.nickname, req.cookies.token, req.query);
        const pages = [];
        let manage;
        if (listEmails.body.pages) {
            for (let i = 1; i <= listEmails.body.pages; i++) {
                pages.push({ page: i });
            }
        }
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: req.cookies.nickname,
            emails: listEmails.body.data,
            pages,
            admin: manage,
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
            res.send({
                statusCode: result.statusCode,
                body: html
            });
        } else {
            res.status(result.statusCode).send(result);
        }
    }

    async removeEmail(req, res) {
        const result = await MdlUser.removeEmails(req.cookies.nickname, req.body.email, req.cookies.token);
        res.status(result.statusCode).send(result);
    }

    async indexPage(req, res) {
        const template = fs.readFileSync('public/views/users/index.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const tfoot = fs.readFileSync('public/partials/tfoot.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const result = await MdlUser.getAll(req.cookies.token, req.query);
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
            items: result.body.data,
            pages: [{ page: page}],
            actual: page,
            route: 'users',
        };
        const html = Mustache.to_html(template, data, { menu, footer, tfoot });
        res.send(html);
    }

    async showPage(req, res) {
        const template = fs.readFileSync('public/views/users/show.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const email_list = fs.readFileSync('public/partials/email_list.mst').toString();
        const delete_modal = fs.readFileSync('public/partials/delete_modal.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const profile = await MdlUser.getProfile(req.params.nickname, req.cookies.token);
        const data = {
            nickname: req.cookies.nickname,
            nickname_user: profile.body.data.nickname,
            email: profile.body.data.email,
            score: profile.body.data.score,
            personal: true,
            admin: manage,
            emails: []
        };
        const html = Mustache.to_html(template, data, { menu, footer, delete_modal, email_list });
        res.send(html);
    }

    async editPage(req, res) {
        const template = fs.readFileSync('public/views/users/edit.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const profile = await MdlUser.getProfile(req.params.nickname, req.cookies.token);
        const data = {
            nickname: req.params.nickname,
            nickname_user: profile.body.data.nickname,
            email: profile.body.data.email,
            score: profile.body.data.score,
            password: 'default',
            avatar: profile.body.data.avatar,
            admin: manage,
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async editUser(req, res) {
        const result = await MdlUser.updateUser(req.params.nickname, req.body, req.cookies.token);
        if (result.statusCode === 204) {
            res.status(204).send();
        } else {
            res.status(result.statusCode).send(result);
        }
    }

    async deleteUser(req, res) {
        const result = await MdlUser.deleteUser(req.params.nickname, req.cookies.token);
        if(result.statusCode == 204) {
            res.redirect('/users');
        }
        res.status(result.statusCode).send(result);
    }
}

module.exports = new User();
