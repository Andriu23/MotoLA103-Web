export const formSubmit = async (event) => {
    event.preventDefault();
    try {
        const name = document.getElementById('nombre').value;
        const email = document.getElementById('email-contacto').value;
        const telefono = document.getElementById('telefono').value;
        const categoria = document.getElementById('categoria').value;
        const medio = document.getElementById('medio').value;
        const texto = document.getElementById('texto').value;
        
        const contacto = Number(telefono);

        if (name === '' || email === '' || contacto === '' || categoria === '' || medio === '' || texto === '') {
            alert('Por favor rellene los campos');
        } else {
            const mensajeCompleto = {
                name,
                email,
                contacto,
                categoria,
                medio,
                texto
            };
            console.log(mensajeCompleto);
            await fetch('http://localhost:3000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mensajeCompleto),
            });
            alert('Su mensaje se ha enviado con éxito');
        }
    } catch (error) {
        console.error(error);
    }
};