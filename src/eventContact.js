import { formSubmit } from "./componentes/contacto.js";

window.addEventListener('load', () => {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', formSubmit);
});