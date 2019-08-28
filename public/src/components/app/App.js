import Component from '../Component.js';
import { Header } from './Header.js';
import { TodoList } from './TodoList.js';
import { getTasks, addTask, updateTask, removeTask } from '../../services/tasks-api.js';
import store from '../../services/store.js';

export class App extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const newTodo = dom.querySelector('#new-todo');
        const newTask = dom.querySelector('#new-task');

        // Create the task list and append to DOM. Provide callbacks for updating task completion or task deletion
        const list = new TodoList({ 
            tasks: [],
            onUpdate: task => {
                updateTask(task)
                    .then(newTaskData => {
                        const positionToUpdate = this.state.tasks.indexOf(task);
                        this.state.tasks.splice(positionToUpdate, 1, newTaskData[0]);
                        list.update(this.state.tasks);
                    })
                    .finally(() => {
                    });
            },
            onRemove: task => {
                removeTask(task)
                    .then(() => {
                        const positionToRemove = this.state.tasks.indexOf(task);
                        this.state.tasks.splice(positionToRemove, 1);
                        list.update(this.state.tasks);
                    })
                    .finally(() => {
                    });
            },
        });
        dom.querySelector('main').prepend(list.renderDOM());

        // Listen for new task additions. Callback function updates the task list
        newTodo.addEventListener('submit', event => {
            event.preventDefault();

            const taskObj = { task: newTask.value };
            addTask(taskObj, store.getId())
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
                });
        });

        // Update the task list from server data
        getTasks(store.getId())
            .then(data => {
                this.state.tasks = data;
                list.update({ tasks: data });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
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
                                <input id="new-task" type="text" name="new-task" placeholder="New Task" class="validate" required autofocus>
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

