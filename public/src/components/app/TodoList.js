import Component from '../Component.js';

export class TodoList extends Component {

    onRender(dom) {
        this.props.tasks.forEach(taskObj => {
            const item = new TodoItem({ 
                task: taskObj,
                onUpdate: this.props.onUpdate,
            });
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
    onRender(dom) {
        const checkbox = dom.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('click', () => {
            this.props.task.is_complete = !this.props.task.is_complete;
            this.props.onUpdate(this.props.task);
        });
        
        const deleteTask = dom.querySelector('label + i');
        deleteTask.addEventListener('click', () => {
            console.log('ready to delete ', this.props.task);
        });
    }

    renderHTML() {
        return /*html*/`
            <li class="collection-item todo-item">
                <label>
                    <input type="checkbox" ${this.props.task.is_complete ? 'checked' : ''}/>
                    <span>${this.props.task.task}</span>
                </label>
                <i class="material-icons red-text">delete</i>
            </li>
        `;
    }
}