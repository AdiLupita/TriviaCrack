const API = require('./api');

class Category {
    async getCategories(token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/categories`;
        const response = await API.getMethod(url, header)
            .catch((err) => { });
        return response;
    }

    async getQuestion(id, token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/questions/${id}`;
        const response = await API.getMethod(url, header)
            .catch((err) => { });
        return response;
    }

    async editQuestion(id, token,  req) {
        const header = {
            token: token,
          };
        const url = `${process.env.HOST}/questions/${id}`;
        const response = await API.patchMethod(url, req.body, header)
            .catch((err) => { });
        return response;
    }

    async deleteQuestion(id, token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/questions/${id}`;
        const response = await API.deleteMethod(url, {}, header)
            .catch((err) => { });
        return response;
    }
}

module.exports = new Category();
