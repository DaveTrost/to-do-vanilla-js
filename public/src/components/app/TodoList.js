import Component from '../Component.js';

export class TodoList extends Component {

    onRender(dom) {
        this.props.tasks.forEach(taskObj => {
            const item = new TodoItem({ 
                task: taskObj,
                onUpdate: this.props.onUpdate,
                onRemove: this.props.onRemove,
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
            this.props.task.isComplete = !this.props.task.isComplete;
            this.props.onUpdate(this.props.task);
        });
        
        const deleteTask = dom.querySelector('label + i');
        deleteTask.addEventListener('click', () => {
            dom.classList.add('fadeOutRight', 'animated', 'fast');
            setTimeout(() => {
                this.props.onRemove(this.props.task);
            }, 500);
        });
    }

    renderHTML() {
        return /*html*/`
            <li class="collection-item todo-item">
                <label>
                    <input type="checkbox" ${this.props.task.isComplete ? 'checked' : ''}/>
                    <span>${this.props.task.task}</span>
                </label>
                <i class="material-icons red-text">delete</i>
            </li>
        `;
    }
}