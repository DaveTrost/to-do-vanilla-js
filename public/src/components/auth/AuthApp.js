import Component from '../Component.js';
import { Header } from '../app/Header.js';
import { Login } from './Login.js';
import { Register } from './Register.js';

export class AuthApp extends Component {

    onRender(dom) {
        const background = new Background();
        dom.prepend(background.renderDOM());

        const header = new Header();
        dom.prepend(header.renderDOM());
        
        const login = new Login();
        dom.appendChild(login.renderDOM());

        const register = new Register();
        dom.appendChild(register.renderDOM());

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