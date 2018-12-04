const API = require('./api');

class Question {
<<<<<<< HEAD
    async getAll(token, page) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/questions?page=${page}`;
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
=======

>>>>>>> 07cec99a8473c98250b2d4f98501fc0f0615c979
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
}

module.exports = new Question();
