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
    console.log('update task', task.id);
    const url = `${URL}/tasks/${task.id}`;
    const putObj = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    };
    return fetchWithError(url, putObj);
}

