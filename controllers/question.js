const fs = require('fs');
const Mustache = require('mustache');
const { MdlQuestion, MdlCategory } = require('../models');

class Question {
    async questionPage(req, res) {
        const template = fs.readFileSync('public/views/question.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const question = await MdlQuestion.getRand(req.cookies.token, { random: true, category: req.cookies.category });
        var random = Math.floor(Math.random() * 3);
        var opc1, opc2, opc3;
        if (random == 1) {
            opc1 = question.body.data.option1;
            opc2 = question.body.data.option2;
            opc3 = question.body.data.optioncorrect;
        } else if (random == 2) {
            opc2 = question.body.data.option1;
            opc3 = question.body.data.option2;
            opc1 = question.body.data.optioncorrect;
        } else {
            opc3 = question.body.data.option1;
            opc2 = question.body.data.option2;
            opc1 = question.body.data.optioncorrect;
        }
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
            img: `/img/${question.body.data.category}.png`,
            category: question.body.data.category,
            question: question.body.data.question,
            opc1,
            opc2,
            opc3,
        };
        res.cookie('question', question.body.data.id);
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async answerQuestion(req, res) {
        const game = req.cookies.idgame;
        const question = req.cookies.question;
        const option = req.body.option;
        const token = req.cookies.token;
        const result = await MdlQuestion.addAnswer(game, question, option, token);
        res.send(result);
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
        const tfoot = fs.readFileSync('public/partials/tfoot.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const result = await MdlQuestion.getAll(req.cookies.token, req.query);
        const categories = await MdlCategory.getCategories(req.cookies.token);
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
            items: result.body.data,            
            categories: categories.body.data,
            actual: page,
        };
        const html = Mustache.to_html(template, data, { menu, footer, tfoot });
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
