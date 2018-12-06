const API = require('./api');

class Game {
    async createGame(player1, player2, token) {
        const header = {
            token: token,
        };
        const body = {
            player1,
            player2,
        };
        const url = `${process.env.HOST}/games`;
        const response = await API.postMethod(url, body, header);
        return response;
    }

    async getAll(token, params) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/games`;
        const response = await API.getMethod(url, header, params)
            .catch((err) => { });
        return response;
    }

    async getGame(id, token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/games/${id}`;
        const response = await API.getMethod(url, header)
            .catch((err) => { });
        return response;
    }

    async updateGame(id, body, token) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/games/${id}`;
        const response = await API.patchMethod(url, body, header)
            .catch((err) => { });
        return response;
    }
}

module.exports = new Game();
