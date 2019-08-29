import store from './store.js';

const URL = '/api';

const token = store.getToken();
if(!token && location.pathname !== '/auth.html') {
    // const searchParams = new URLSearchParams();
    // searchParams.set('redirect', location.pathname);
    location = 'auth.html';
}

function fetchWithError(url, options) {
    if(token) {
        options = options || {};
        options.headers = options.headers || {};
        options.headers.Authorization = token;
    }

    return fetch(url, options)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}

export function getTasks(userId) {
    const url = `${URL}/tasks/${userId}`;
    return fetchWithError(url);
}

export function addTask(task, userId) {
    const url = `${URL}/tasks/${userId}`;
    const postObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    };
    return fetchWithError(url, postObj);
}

export function updateTask(task) {
    const url = `${URL}/tasks/${task.id}`;
    const putObj = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    };
    return fetchWithError(url, putObj);
}

export function removeTask(task) {
    const url = `${URL}/tasks/${task.id}`;
    const deleteObj = {
        method: 'DELETE',
    };
    return fetchWithError(url, deleteObj);
}

export function userLogin(credentials) {
    const url = `${URL}/auth/signin`;
    const postObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    };
    return fetchWithError(url, postObj);
}

export function userRegister(credentials) {
    const url = `${URL}/auth/signup`;
    const postObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    };
    return fetchWithError(url, postObj);
}

export function userInfo(email) {
    const url = `${URL}/users/${email}`;
    return fetchWithError(url);
}
