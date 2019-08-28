import Component from '../Component.js';
import { Header } from '../app/Header.js';
import { Login } from './Login.js';
import { Register } from './Register.js';
import { userLogin, userRegister } from '../../services/tasks-api.js';
import store from '../../services/store.js';

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
                        openApp(user);
                    })
                    .catch(err => {
                        alert(err);
                    });
            }
        });
        dom.appendChild(login.renderDOM());

        const register = new Register({
            onRegister: credentials => {
                credentials.name = credentials.name || credentials.email;
                userRegister(credentials)
                    .then(user => {
                        openApp(user);
                    })
                    .catch(err => {
                        alert(err);
                    });
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

function openApp(user) {
    store.setToken(user.token);
    // const searchParams = new URLSearchParams(location.search);
    // location = searchParams.get('redirect') || './cat-list.html';
    location = './index.html';
}

