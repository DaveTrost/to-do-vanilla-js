
const TOKEN_KEY = 'token';

export default {
    getToken() {
        return JSON.parse(localStorage.getItem(TOKEN_KEY) || {}).token;
    },
    getId() {
        return JSON.parse(localStorage.getItem(TOKEN_KEY) || {}).id;
    },
    setToken(tokenObj) {
        return localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenObj));
    },
    hasToken() {
        return this.getToken() !== null;
    },
    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    },
};