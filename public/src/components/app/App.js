import Component from '../Component.js';
import { TodoList } from './TodoList.js';
import { getTasks, addTask } from '../../services/tasks-api.js';

export class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const list = new TodoList({ tasks: [] });
        dom.querySelector('main').prepend(list.renderDOM());

        const newTodo = dom.querySelector('#new-todo');
        const newTask = dom.querySelector('#new-task');
        newTodo.addEventListener('submit', event => {
            event.preventDefault();

            const taskObj = {
                task: newTask.value
            };

            addTask(taskObj)
                .then(taskResponse => {
                    this.state.tasks.push(taskResponse[0]);
                    list.update(this.state.tasks);
                    newTodo.reset();
                    newTask.focus();
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    //loading.update({ loading: false });
                });

        });


        



        getTasks()
            .then(data => {
                this.state.tasks = data;
                list.update({ tasks: data });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                //loading.update({ loading: false });
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
                                <input id="new-task" type="text" name="new-task" placeholder="New Task" class="validate" required>
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
