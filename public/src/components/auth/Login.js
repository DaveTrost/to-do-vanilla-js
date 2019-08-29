import Component from '../Component.js';

export class Login extends Component {

    onRender(dom) {
        const onLogin = this.props.onLogin;

        const form = dom.querySelector('form#login');
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);
            const credentials = {
                email: formData.get('email'),
                password: formData.get('password'),
            };

            onLogin(credentials);
        });
    }

    renderHTML() {
        return /*html*/`
            <div class="login container row offset-top">
                <div class="auth-form col s10 offset-s1">
                    <form id="login" action="#">
                        <h5 class="centered">Sign In</h5>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">email</i>
                            <input type="email" name="email" placeholder="email" class="validate" required>
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock</i>
                            <input type="password" name="password" placeholder="password" class="validate" required>
                        </div>
                        <div class="input-field col s12">
                            <button type="submit" class="waves-effect waves-light btn-large">Login</button>
                        </div>
                    </form>
                </div>
                <div class="col s10 offset-s1 auth-switch">
                    <a id="switch-to-register" href="#">Need an account? <b>Sign up!</b></a>
                </div>
            </div>
        `;
    }
}
