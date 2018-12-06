const API = require('./api');

class Question {
    async getAll(token, params) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/questions`;
        const response = await API.getMethod(url, header, params)
            .catch((err) => { });
        return response;
    }

    async getRand(token, params){
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/questions`;
        const response = await API.getMethod(url, header, params)
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

    async updateQuestion(id, body, token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/questions/${id}`;
        const response = await API.patchMethod(url, body, header)
            .catch((err) => { });
        return response;
    }

    async removeQuestion(id, token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/questions/${id}`;
        const response = await API.deleteMethod(url, {}, header)
            .catch((err) => { });
        return response;
    }

    async addQuestion(category, question, option1, option2, optioncorrect, userid, token) {
        const header = {
            token,
        };
        const body = {
            category,
            question,
            option1,
            option2,
            optioncorrect,
            userid,
        };
        const url = `${process.env.HOST}/questions`;
        const response = await API.postMethod(url, body, header)
            .catch((err) => { });
        return response;
    }

    async addAnswer(game, question, option, token){
        const header = {
            token,
        };
        const body = {
            question,
            option
        };
        const url = `${process.env.HOST}/games/${game}/answers`;
        const response = await API.postMethod(url, body, header)
            .catch((err) => { });
        return response;
    }
}

module.exports = new Question();
