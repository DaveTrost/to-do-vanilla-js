import Component from '../Component.js';

export class TodoList extends Component {

    onRender(dom) {
        this.props.tasks.forEach(taskObj => {
            const item = new TodoItem({ task: taskObj });
            dom.appendChild(item.renderDOM());
        });
    }

    renderHTML() {
        return /*html*/`
            <ul class="collection"></ul>
        `;
    }
}

class TodoItem extends Component {
    renderHTML() {
        return /*html*/`
            <li class="collection-item todo-item">
                <label>
                    <input type="checkbox"/>
                    <span>${this.props.task.task}</span>
                </label>
                <i class="material-icons red-text">delete</i>
            </li>
        `;
    }
}