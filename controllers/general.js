const fs = require('fs');
const Mustache = require('mustache');

class General {
    async indexPage(req, res) {
        const template = fs.readFileSync('public/index.mst').toString();
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

    async notFoundPage(req, res) {
        const template = fs.readFileSync('public/views/404.mst').toString();
        const menu = fs.readFileSync('public/partials/menu.mst').toString();
        const footer = fs.readFileSync('public/partials/footer.mst').toString();
        let manage;
        if (req.cookies.admin == 'true') {
            manage = true;
        }
        const data = {
            nickname: req.cookies.nickname,
            admin: manage,
        }
        const html = Mustache.to_html(template, data, { menu, footer });
        res.send(html);
    }
}

module.exports = new General();
