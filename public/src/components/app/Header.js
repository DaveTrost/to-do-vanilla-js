import Component from '../Component.js';

export class Header extends Component {
    renderHTML() {
        return /*html*/`
            <nav class="nav-wrapper">
                <p class="brand-logo center">To-Do List</p>
            </nav>
        `;
    }
}
