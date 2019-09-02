import Component from '../Component.js';
import store from '../../services/store.js';

export class Header extends Component {
    
    onRender(dom) {
        const logout = dom.querySelector('.logout');
        if(store.hasToken()) {
            logout.classList.remove('hide');
        }
        logout.addEventListener('click', () => {
            store.removeToken();
        });
    }

    renderHTML() {
        const displayName = this.props.displayName ? this.props.displayName + '\'s ' : '';
        return /*html*/`
            <nav class="nav-wrapper">
                <p class="brand-logo center">${displayName}To-Do List</p>
                <ul class="right">
                    <li class="logout hide"><a href="auth.html">Logout</a></li>
                </ul>
            </nav>
        `;
    }
}
