import { formSubmit } from "./contacto.js";

window.addEventListener('load', () => {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', formSubmit);
});