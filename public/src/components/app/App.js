import Component from '../Component.js';
import { TodoList } from './TodoList.js';

export class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const list = new TodoList();
        dom.querySelector('main').prepend(list.renderDOM());

        const newTodo = dom.querySelector('#new-todo');
        newTodo.addEventListener('submit', event => {
            event.preventDefault();
            console.log('submit');
        });
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main class="container">
                    <!-- todo list goes here -->
                    <form action="#" id="new-todo" class="fixed-bottom">
                        <div class="row">
                            <div class="input-field col s10">
                                <i class="material-icons prefix">playlist_add</i>
                                <input id="icon_prefix" type="text" name="new-task" placeholder="New Task" class="validate" required>
                            </div>
                            <div class="input-field col s2">
                                <button type="submit" class="btn-floating cyan pulse"><i class="material-icons">add</i></button>
                            </div>
                        </div>
                    </form>
                </main>        
            </div>
        `;
    }
}

class Header extends Component {
    renderHTML() {
        return /*html*/`
            <nav class="nav-wrapper">
                <p class="brand-logo center">To-Do List</p>
            </nav>
        `;
    }
}
