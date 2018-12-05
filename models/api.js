const fetch = require('node-fetch');
const request = require('request-promise');

class API {
    async getMethod(url = '', header = {}, params = {}) {
        const options = {
            method: 'GET',
            url,
            headers: { ...header },
            qs: { ...params },
            simple: false,
        };
        let result = {};
        await request(options, (error, response, body) => {
            result = { statusCode: response.statusCode, body: JSON.parse(body || '{}') };
        });
        return result;
    }

    async postMethod(url, body = {}, header = {}) {
        const options = {
            method: 'POST',
            url,
            headers: { ...header },
            form: { ...body },
            simple: false,
        };
        let result = {};
        await request(options, (error, response, body) => {
            result = { statusCode: response.statusCode, body: JSON.parse(body || '{}') };
        });
        return result;
    }

    async patchMethod(url, body = {}, headers = {}) {

    }

    async delMethod(url, body = {}, header = {}) {
        const options = {
            method: 'DELETE',
            url,
            headers: { ...header },
            form: { ...body },
            simple: false,
        };
        let result = {};
        await request(options, (error, response, body) => {
            result = { statusCode: response.statusCode, body: JSON.parse(body || '{}') };
        });
        return result;
    }
}

module.exports = new API();
