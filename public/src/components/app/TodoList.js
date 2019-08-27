import Component from '../Component.js';

export class TodoList extends Component {

    onRender(dom) {
        const item = new TodoItem();
        dom.appendChild(item.renderDOM());        
        dom.appendChild(item.renderDOM());        
        dom.appendChild(item.renderDOM());        
        dom.appendChild(item.renderDOM());        
        dom.appendChild(item.renderDOM());        
        dom.appendChild(item.renderDOM());        
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
                    <span>get groceries get groceries get groceries get groceries</span>
                </label>
                <i class="material-icons red-text">delete</i>
            </li>
        `;
    }
}