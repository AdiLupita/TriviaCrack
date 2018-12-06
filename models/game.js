const API = require('./api');

class Game {
    async getAll(token, params) {
        const header = {
            token: token,
        };
        const url = `${process.env.HOST}/games`;
        const response = await API.getMethod(url, header, params)
            .catch((err) => { });
        return response;
  }
}

module.exports = new Game();
