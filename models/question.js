const API = require('./api');

class Question {
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
