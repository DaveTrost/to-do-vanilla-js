import { AuthApp } from './components/auth/AuthApp.js';

const auth = new AuthApp();
document.body.prepend(auth.renderDOM());