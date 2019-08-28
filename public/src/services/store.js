
const TOKEN_KEY = 'token';

export default {
    getToken() {
        const item = localStorage.getItem(TOKEN_KEY);
        return item ? (JSON.parse(item).token) : null;
    },
    getId() {
        const item = localStorage.getItem(TOKEN_KEY);
        return item ? (JSON.parse(item).id) : null;
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