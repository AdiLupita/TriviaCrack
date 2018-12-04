const fs = require('fs');
const Mustache = require('mustache');
const { MdlQuestion } = require('../models');

class Question {
    async questionPage(req, res) {
        const template = fs.readFileSync('public/views/question.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        const data = {
            nickname: req.cookies.nickname,
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
        const data = {
            nickname: req.cookies.nickname,
            categories: [
                { id: 1, category: 'IA' },
                { id: 2, category: 'DB' },
                { id: 3, category: 'Software' },
                { id: 4, category: 'Web' },
            ]
        };
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }

    async addQuestion(req, res) {
        const result = await MdlQuestion.addQuestion(req.body.category, req.body.question, req.body.option1, req.body.option2, req.body.optioncorrect, req.cookies.id, req.cookies.token);
        res.status(result.statusCode).send(result);
    }


}

module.exports = new Question();
