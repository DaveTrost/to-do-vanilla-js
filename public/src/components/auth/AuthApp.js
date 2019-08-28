import Component from '../Component.js';
import { Header } from '../app/Header.js';
import { Login } from './Login.js';
import { Register } from './Register.js';
import { userLogin, userRegister } from '../../services/tasks-api.js';

export class AuthApp extends Component {

    onRender(dom) {
        const background = new Background();
        dom.prepend(background.renderDOM());
        const header = new Header();
        dom.prepend(header.renderDOM());
        
        const login = new Login({
            onLogin: credentials => {
                userLogin(credentials)
                    .then(user => {
                        console.log('success', user);
                    })
                    .catch(err => {
                        console.log('error', err);
                        // errors.textContent = err;
                    });
            }
        });
        dom.appendChild(login.renderDOM());

        const register = new Register({
            onRegister: credentials => {
                credentials.name = credentials.name || credentials.email;
                userRegister(credentials);
            }
        });
        dom.appendChild(register.renderDOM());

        const loginContainer = dom.querySelector('.login.container');
        const switchToLogin = dom.querySelector('#switch-to-login');
        const registerContainer = dom.querySelector('.register.container');
        const switchToRegister = dom.querySelector('#switch-to-register');
        switchToLogin.addEventListener('click', () => {
            loginContainer.classList.remove('hide');
            registerContainer.classList.add('hide');
        });
        switchToRegister.addEventListener('click', () => {
            registerContainer.classList.remove('hide');
            loginContainer.classList.add('hide');
        });
        


        // // Listen for new task additions. Callback function updates the task list
        // newTodo.addEventListener('submit', event => {
        //     event.preventDefault();

        //     const taskObj = { task: newTask.value };
        //     addTask(taskObj)
        //         .then(taskResponse => {
        //             this.state.tasks.push(taskResponse[0]);
        //             list.update(this.state.tasks);
        //             newTodo.reset();
        //             newTask.focus();
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        //         .finally(() => {
        //         });
        // });

    }


    renderHTML() {
        return /*html*/`
            <main></main>
        `;
    }
}

class Background extends Component {
    renderHTML() {
        return /*html*/`
            <div class="background"></div>
        `;
    }
}