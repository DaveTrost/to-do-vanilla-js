const URL = '/api';

function fetchWithError(url, options) {
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

export function getTasks() {
    const url = `${URL}/tasks`;
    return fetchWithError(url);
}

export function addTask(task) {
    const url = `${URL}/tasks`;
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
    console.log('api login', credentials);
    const url = `${URL}/auth/signin`;
    const postObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    };
    return fetchWithError(url, postObj);
}

export function userRegister(credentials) {
    console.log('api register', credentials);
    const url = `${URL}/auth/signup`;
    const postObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    };
    return fetchWithError(url, postObj);
}
