const fs = require('fs');
const Mustache = require('mustache');
const { MdlQuestion, MdlCategory } = require('../models');

class Question {
    async questionPage(req, res) {
        const template = fs.readFileSync('public/views/question.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            img: 'https://vignette.wikia.nocookie.net/es.pokemon/images/2/2c/Pok%C3%A9mon_Jukebox_icono.png/revision/latest?cb=20150624132304',
            category: 'IA',
            question: 'Wicht is better to program a MLP?',
            opc1: 'Python',
            opc2: 'Java',
            opc3: 'C++',
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async addQuestionPage(req, res) {
        const template = fs.readFileSync('public/views/add_question.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const categories = await MdlCategory.getCategories(req.cookies.token);
        const data = {
            nickname: req.cookies.nickname,
            categories: categories.body.data,
            admin: manage,
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async indexPage(req, res) {
        const template = fs.readFileSync('public/views/questions/index.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menu_admin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        let page = 1;
        if (req.query !== undefined && req.query.page !== undefined) {
            page = req.query.page;
        }
        const result = await MdlQuestion.getAll(req.cookies.token, page);
        if (result.statusCode !== 200) {
            res.status(result.statusCode);
            res.send(result);
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            items: result.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, menu_admin, footer });
        res.send(html);
    }

    async showPage(req, res) {
        const template = fs.readFileSync('public/views/questions/show.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menu_admin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const delete_modal = fs.readFileSync('public/partials/delete_modal.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const result = await MdlQuestion.getQuestion(req.params.id, req.cookies.token);
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            route: 'questions',
            data: result.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, menu_admin, footer, delete_modal });
        res.send(html);
    }

    async editPage(req, res) {
        const template = fs.readFileSync('public/views/questions/edit.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const menu_admin = fs.readFileSync('public/partials/menu_admin.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const result = await MdlQuestion.getQuestion(req.params.id, req.cookies.token);
        const categories = await MdlCategory.getCategories(req.cookies.token);
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            data: result.body.data,
            categories: categories.body.data,
        };
        const html = Mustache.to_html(template, data, { menu, menu_admin, footer });
        res.send(html);
    }

    async editQuestion(req, res) {
    }

    async deleteQuestion(req, res) {
    }
    async addQuestion(req, res) {
        const result = await MdlQuestion.addQuestion(req.body.category, req.body.question, req.body.option1, req.body.option2, req.body.optioncorrect, req.cookies.id, req.cookies.token);
        res.status(result.statusCode).send(result);
    }
}

module.exports = new Question();
