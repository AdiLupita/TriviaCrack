class API {
    static post(url = '', body = {}, header = {}) {
        return fetch(url, {
            method: 'POST',
            rejectUnauthorized: false,
            headers: {
                ...header,
            },
            body,
        });
    }

    static get(url = '', header = {}) {
        return fetch(url, {
            method: 'GET',
            rejectUnauthorized: false,
            headers: {
                ...header,
            },
        });
    }

    static delete(url = '', body = {}, header = {}) {
        return fetch(url, {
            method: 'DELETE',
            rejectUnauthorized: false,
            headers: {
                ...header,
            },
            body,
        });
    }
}