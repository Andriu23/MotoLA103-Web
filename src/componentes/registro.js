document.addEventListener("DOMContentLoaded", () => {
    const emailRegistro = document.getElementById("email_registro");

    // Recuperar correo desde LocalStorage
    const email = localStorage.getItem("emailTemp");

    if (email) {
        emailRegistro.value = email;

        // Borrar después de usar (opcional)
        localStorage.removeItem("emailTemp");
    }
});