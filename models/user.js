const API = require('./api');

class User {
    async login(req) {
        const header = {
            "Content-Type": "application/x-www-form-urlencoded",
        }
        const url = `${process.env.HOST}/login`;
        const response = await API.postMethod(url, req.body, header)
            .catch((err) => { });
        return response;
    }

    async register(req) {
        const url = `${process.env.HOST}/register`;
        const response = await API.postMethod(url, req.body)
            .catch((err) => { });
        return response;
    }

    async logout(req) {
        const header = {
            token: req.cookies.token,
        };
        const url = `${process.env.HOST}/logout`;
        const response = await API.getMethod(url, header)
            .catch((err) => { });
        return response;
    }

    async getProfile(nickname, token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/users/${nickname}`;
        const response = await API.getMethod(url, header)
            .catch((err) => { });
        return response;
    }
}

module.exports = new User();
