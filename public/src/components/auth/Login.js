import Component from '../Component.js';

export class Login extends Component {

    onRender() {
        //empty
    }

    renderHTML() {
        return /*html*/`
            <div class="login container row offset-top hide">
                <div class="auth-form col s10 offset-s1">
                    <form id="login" action="#">
                        <h5 class="centered">Sign In</h5>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">email</i>
                            <input id="icon_prefix" type="text" name="email-address" placeholder="email" class="validate">
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">lock</i>
                            <input id="icon_prefix" type="text" name="email-address" placeholder="password" class="validate">
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
