import Component from '../Component.js';

export class Register extends Component {

    onRender(dom) {
        const onRegister = this.props.onRegister;

        const form = dom.querySelector('form#register');
        form.addEventListener('submit', event => {
            event.preventDefault();

            const formData = new FormData(form);
            const credentials = {
                name: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password'),
            };

            onRegister(credentials);
        });
    }

    renderHTML() {
        return /*html*/`
            <div class="register container row offset-top ">
                <div class="auth-form col s10 offset-s1">
                    <form id="register" action="#">
                        <h5 class="centered">Register</h5>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">person</i>
                            <input id="icon_prefix" type="text" name="name" placeholder="name" class="validate">
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">email</i>
                            <input id="icon_prefix" type="text" name="email" placeholder="email" class="validate">
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock</i>
                            <input id="icon_prefix" type="text" name="password" placeholder="password" class="validate">
                        </div>
                        <div class="input-field col s12">
                            <button type="submit" class="waves-effect waves-light btn-large">Sign Up</button>
                        </div>
                    </form>
                </div>
                <div class="col s10 offset-s1 auth-switch">
                    <a id="switch-to-login" href="#">Have an account? <b>Login Here</b></a>
                </div>
            </div>
        `;
    }
}
