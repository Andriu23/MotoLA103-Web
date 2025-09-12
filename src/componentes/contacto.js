const URL_API = 'https://moto-la-103-server.vercel.app';

export const formSubmit = async (event) => {
    event.preventDefault();
    try {
        const name = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email-contacto').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const categoria = document.getElementById('categoria').value;
        const medio = document.getElementById('medio').value;
        const texto = document.getElementById('texto').value.trim();

        const contacto = Number(telefono);

        if (!name || !email || !contacto || !categoria || !medio || !texto) {
            alert('Por favor rellene los campos');
        }

        const mensajeCompleto = {
            name,
            email,
            contacto,
            categoria,
            medio,
            texto,
        };
        await fetch(`${URL_API}/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mensajeCompleto),
        });
        alert('Su mensaje se ha enviado con éxito');

        // Opcional: limpiar formulario después del registro
        event.target.reset();
    } catch (error) {
        console.error("❌ Error en el contacto:", error);
        alert('Ocurrió un error al procesar el registro.');
    }
};

export const getDataContacts = async () => {
    try {
        let response = await fetch(`${URL_API}/api/contacts`);
        return await response.json();
    } catch (error) {
        console.error('Hubo un error');
    }
}