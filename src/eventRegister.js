import { formRegister } from "./componentes/cliente.js";

window.addEventListener('load', () => {
    const registro = document.getElementById('registerForm');
    registro.addEventListener('submit', formRegister);
});