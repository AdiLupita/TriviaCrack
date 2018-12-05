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
        const path = new RegExp('https:\/\/s3\.amazonaws\.com')
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/users/${nickname}`;
        const response = await API.getMethod(url, header)
            .catch((err) => { });
        if(response.body.data.avatar === 'default.png'){
            response.body.data.avatar = `/img/default.png`;
        } else if(!path.test(response.body.data.avatar)){
            response.body.data.avatar = `${process.env.HOST}/uploads/${response.body.data.avatar}`;
        }
        return response;
    }

    async getEmails(nickname, token, params) {
        const header = {
            token: token,
          };
          const url = `${process.env.HOST}/users/${nickname}/emails`;
        const response = await API.getMethod(url, header, params)
            .catch((err) => { });
        return response;
    }

    async removeEmails(nickname, email, token) {
        const header = {
            token: token,
        };
        const body = {
            email,
        };
        const url = `${process.env.HOST}/users/${nickname}/emails`;
        const response = await API.delMethod(url, body, header)
            .catch((err) => { });
        return response;
    }

    async addEmails(nickname, email, token) {
        const header = {
            token: token,
        };
        const body = {
            email,
        };
        const url = `${process.env.HOST}/users/${nickname}/emails`;
        const response = await API.postMethod(url, body, header)
            .catch((err) => { });
        return response;
    }

    async getAll(token, page) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/users?page=${page}`;
        const response = await API.getMethod(url, header)
            .catch((err) => { });
        return response;
    }

    async editUser(nickname, token,  req) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/users/${nickname}`;
        const response = await API.patchMethod(url, req.body, header)
            .catch((err) => { });
        return response;
    }

    async deleteUser(nickname, token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/users/${nickname}`;
        const response = await API.deleteMethod(url, {}, header)
            .catch((err) => { });
        return response;
    }

}

module.exports = new User();
