document.addEventListener("DOMContentLoaded", () => {
    const subscribeForm = document.getElementById("subscribeForm");
    const emailInput = document.getElementById("email");

    if (subscribeForm) {
        subscribeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            localStorage.setItem("emailTemp", emailInput.value);
            window.location.href = "/pages/registro.html";
        });
    }
});